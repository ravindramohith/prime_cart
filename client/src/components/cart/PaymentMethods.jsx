import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux';
import { calculateTotalOrderCost } from '../../helpers/helpers';
import { useCreateOrderMutation, useStripeCheckoutSessionMutation } from '../../redux/api/order';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
    const navigate = useNavigate();

    const [method, setMethod] = React.useState("");
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const [placeOrder, { error, isSuccess, data }] = useCreateOrderMutation();
    const [stripeCheckoutSession, { data: stripeCheckoutSessionData, error: stripeCheckoutSessionError, isLoading }] = useStripeCheckoutSessionMutation();

    React.useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate("/me/orders");
        };

        if (error)
            toast.error(error?.data?.message);

    }, [error, isSuccess])

    const submitForm = (e) => {
        e.preventDefault();
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotalOrderCost(cartItems);

        if (method === "Cash")
            placeOrder({
                shipping: shippingInfo,
                orderItems: cartItems,
                itemsPrice,
                shippingAmount: shippingPrice,
                tax: taxPrice,
                totalAmount: totalPrice,
                paymentInfo: { status: "Not paid" },
                paymentMethod: "Cash"
            });

        else if (method === "Card") {
            console.log(method); stripeCheckoutSession({
                shipping: shippingInfo,
                orderItems: cartItems,
                itemsPrice,
                shippingAmount: shippingPrice,
                tax: taxPrice,
                totalAmount: totalPrice,
            })
        }
    }

    React.useEffect(() => {
        if (stripeCheckoutSessionData) {
            window.location.href = stripeCheckoutSessionData?.url;
        }
    }, [stripeCheckoutSessionData])
    return (
        <>
            <MetaData title={"Payment Methods"} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitForm}
                    >
                        <h2 className="mb-4">Select Payment Method</h2>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="codradio"
                                value="Cash"
                                onChange={e => setMethod("Cash")}
                            />
                            <label className="form-check-label" htmlFor="codradio">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="cardradio"
                                value="Card"
                                onChange={e => setMethod("Card")}
                            />
                            <label className="form-check-label" htmlFor="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={isLoading}>
                            {isLoading ? "Redirecting to payment page..." : "CONTINUE"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaymentMethods