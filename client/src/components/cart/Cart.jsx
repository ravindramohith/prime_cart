import React from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeCartItem, setCartItem } from '../../redux/features/cartSlice'

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart)

    const setItemToCart = (item, quantity) => {
        dispatch(setCartItem({
            product: item?.product,
            name: item?.name,
            price: item?.price,
            image: item?.image ? item?.image : "/images/default_product.png",
            stock: item?.stock,
            quantity,
        }))
        // toast.success("Item added to cart")
    }

    const removeItemFromCart = (id) => {
        dispatch(removeCartItem(id));
    }

    const checkout = () => {
        navigate("/shipping")
    }

    return (
        <>
            <MetaData title="Your Cart" />
            {cartItems?.length > 0 ?
                <>
                    <h2 className="mt-5">Your Cart: <b>{cartItems?.length} item{cartItems?.length > 1 ? "s" : ""}</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems?.map((item, i) => (
                                <>
                                    <hr />
                                    <div className="cart-item" data-key="product1">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img
                                                    src={item?.image}
                                                    alt="Laptop"
                                                    height="90"
                                                    width="115"
                                                />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item?.product}`}> {item?.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">₹{item?.price * (item?.quantity || 1)}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className={`btn btn-danger minus ${item?.quantity - 1 < 1 && "disabled"}`} onClick={e => {
                                                        const newQuantity = item?.quantity - 1
                                                        if (newQuantity < 1) return
                                                        else setItemToCart(item, newQuantity);
                                                    }}> - </span>
                                                    <input
                                                        type="number"
                                                        className="form-control count d-inline"
                                                        value={item?.quantity}
                                                        readonly
                                                    />
                                                    <span className={`btn btn-primary plus ${item?.quantity + 1 > item?.stock && "disabled"}`} onClick={e => {
                                                        const newQuantity = item?.quantity + 1
                                                        if (newQuantity > item?.stock) return
                                                        else setItemToCart(item, newQuantity);
                                                    }}> + </span>
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={e => removeItemFromCart(item?.product)}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            ))}


                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">{cartItems?.reduce((acc, item) => acc + item?.quantity, 0)} (Product{cartItems?.reduce((acc, item) => acc + item?.quantity, 0) <= 1 ? "" : "s"})</span></p>
                                <p>Est. total: <span className="order-summary-values">₹{cartItems?.reduce((acc, item) => acc + item?.price * item?.quantity, 0).toFixed(2)}</span></p>
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary w-100" onClick={checkout}>
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </>
                : <h2 className='mt-5'>Your Cart is Empty</h2>
            }
        </>
    )
}

export default Cart