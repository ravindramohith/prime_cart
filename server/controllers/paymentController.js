const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);

      const productId = product.metadata.productId;
      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) resolve(cartItems);
    });
  });
};

// Create stripe checkout session
exports.stripeCheckoutSession = catchAsync(async (req, res, next) => {
  const line_items = req.body.orderItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.name,
          images: [item?.image],
          metadata: { productId: item?.product },
        },
        unit_amount: item?.price * 100,
      },
      tax_rates: [process.env.STRIPE_TAX_KEY],
      quantity: item?.quantity,
    };
  });
  const shippingInfo = req.body.shipping;
  const shipping_rate =
    req.body?.itemsPrice >= 9000
      ? process.env.STRIPE_FREE_SHIPPING_KEY // free shipping
      : process.env.STRIPE_SHIPPING_CHARGE_KEY; // charged shipping
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    metadata: { ...shippingInfo, itemsPrice: req.body.itemsPrice },
    success_url: `${process.env.CLIENT_URL}/me/orders?order_success=true`,
    cancel_url: `${process.env.CLIENT_URL}`,
    customer_email: req.user.email,
    client_reference_id: req.user._id.toString(),
    shipping_options: [{ shipping_rate }],
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });
});

exports.postStripePayment = catchAsync(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = await stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const cartItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const tax = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;

      const shipping = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNumber: session.metadata.phoneNumber,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      await Order.create({
        shipping,
        orderItems: cartItems,
        itemsPrice,
        tax,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      });

      res.status(200).json({
        success: true,
        url: session.url,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
