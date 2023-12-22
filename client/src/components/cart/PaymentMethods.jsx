import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux';
import { calculateTotalOrderCost } from '../../helpers/helpers';
import { useCreateOrderMutation } from '../../redux/api/order';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
    const navigate = useNavigate();

    const [method, setMethod] = React.useState("");
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const [placeOrder, { isLoading, error, isSuccess, data }] = useCreateOrderMutation();

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
    }
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
                            <label className="form-check-label" for="codradio">
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
                            <label className="form-check-label" for="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn py-2 w-100">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaymentMethods