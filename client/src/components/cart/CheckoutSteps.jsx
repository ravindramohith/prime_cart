import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div class="checkout-progress d-flex justify-content-center mt-5">
            {shipping ?
                <Link to="/shipping" class="float-right">
                    <div class="triangle2-active"></div>
                    <div class="step active-step">Shipping</div>
                    <div class="triangle-active"></div>
                </Link>
                :
                <Link to="#!" class="float-right" disabled>
                    <div class="triangle2-incomplete"></div>
                    <div class="step incomplete">Shipping</div>
                    <div class="triangle-incomplete"></div>
                </Link>
            }

            {confirmOrder ?
                <Link to="/confirm_order" class="float-right">
                    <div class="triangle2-active"></div>
                    <div class="step active-step">Confirm Order</div>
                    <div class="triangle-active"></div>
                </Link>
                :
                <Link to="#!" class="float-right" disabled>
                    <div class="triangle2-incomplete"></div>
                    <div class="step incomplete">Confirm Order</div>
                    <div class="triangle-incomplete"></div>
                </Link>
            }

            {payment ?
                <Link to="/payment_method" class="float-right">
                    <div class="triangle2-active"></div>
                    <div class="step active-step">Payment</div>
                    <div class="triangle-active"></div>
                </Link>
                :
                <Link to="#!" class="float-right" disabled>
                    <div class="triangle2-incomplete"></div>
                    <div class="step incomplete">Payment</div>
                    <div class="triangle-incomplete"></div>
                </Link>
            }
        </div>
    )
}

export default CheckoutSteps