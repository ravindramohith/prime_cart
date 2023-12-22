const catchAsync = require("../utils/catchAsync");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
      taxRates: [process.env.STRIPE_TAX_KEY],
      quantity: item?.quantity,
    };
  });
  const shipping_rate =
    req.body?.itemsPrice >= 9000
      ? process.env.STRIPE_FREE_SHIPPING_KEY // free shipping
      : process.env.STRIPE_SHIPPING_CHARGE_KEY; // charged shipping
  const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/me/orders`,
    cancel_url: `${process.env.CLIENT_URL}`,
    customer_email: req.user.email,
    client_reference_id: req.user._id.toString(),
    shipping_options: [{ shipping_rate }],
    customer_name: req.user.name,
  });

  console.log(session);

  res.status(200).json({
    success: true,
    url: session.url,
  });
});
