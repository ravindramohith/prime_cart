import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../redux/api/product';
import StarRatings from 'react-star-ratings';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../../redux/features/cartSlice';
import MetaData from '../layout/MetaData';
import Review from '../review/Review';
import Reviews from '../review/Reviews';

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { data, isLoading, error, isError } = useGetProductQuery(params);
    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);
    const product = data?.data
    React.useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    const [activeImage, setActiveImage] = React.useState("")

    React.useEffect(() => {
        setActiveImage(product?.images[0]?.url ? product?.images[0]?.url : "/images/default_product.png")
    }, [product])

    const [quantity, setQuantity] = React.useState(cartItems?.find((i) => i.product === product?._id)?.quantity || 1)
    React.useEffect(() => {
        setQuantity(cartItems?.find((i) => i.product === product?._id)?.quantity || 1);
    }, [cartItems, product])
    const addItemToCart = (message) => {
        dispatch(setCartItem({
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images[0]?.url ? product?.images[0]?.url : "/images/default_product.png",
            stock: product?.stock,
            quantity,
        }))

        toast.success(message)
    }
    return (
        isLoading ? <Loader /> :
            <>
                <MetaData title={product?.name || "Product Details"} />
                <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <div className="p-3">
                            <img
                                className="d-block w-100"
                                src={activeImage}
                                alt={product?.name}
                                width="340"
                                height="390"
                            />
                        </div>
                        <div className="row justify-content-start mt-5">
                            {product?.images?.map((image, i) => (
                                <div className="col-2 ms-4 mt-2" key={i}>
                                    <a role="button">
                                        <img
                                            className={`d-block border rounded p-3 cursor-pointer ${image?.url === activeImage ? "border-warning" : ""}`}
                                            height="100"
                                            width="100"
                                            src={image?.url}
                                            alt={image?.url}
                                            onClick={() => setActiveImage(image?.url)}
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product?.name}</h3>
                        <p id="product_id">Product # {product?.id}</p>

                        <hr />

                        <div className="d-flex">
                            <StarRatings
                                rating={product?.ratings}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='22px'
                                starSpacing='1px'
                            />
                            <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.numOfReviews} Review{product?.numOfReviews === 1 ? "" : "s"}) </span>
                        </div>
                        <hr />

                        <p id="product_price">Rs.{product?.price}</p>
                        <div className="stockCounter d-inline">
                            <span className={`btn btn-danger minus ${quantity <= 1 && "disabled"}`} onClick={e => {
                                const count = document.querySelector('.count')
                                if (count.valueAsNumber <= 1) return
                                else setQuantity(count.valueAsNumber - 1);
                            }}>-</span>
                            <input
                                type="number"
                                className="form-control count d-inline"
                                value={quantity}
                                readonly
                            />
                            <span className={`btn btn-primary plus ${quantity >= product?.stock && "disabled"}`} onClick={e => {
                                const count = document.querySelector('.count')
                                if (count.valueAsNumber >= product?.stock) return
                                else setQuantity(count.valueAsNumber + 1);
                            }}>+</span>
                        </div>
                        <button
                            type="button"
                            id="cart_btn"
                            className="btn btn-primary d-inline ms-4"
                            disabled={product?.stock <= 0 || cartItems?.find((i) => i.product === product?._id)?.quantity === quantity}
                            onClick={e => addItemToCart(cartItems?.find((i) => i.product === product?._id) ? "Item Updated in Your Cart" : "Item added to cart")}
                        >
                            {cartItems?.find((i) => i.product === product?._id) ? "Update Cart" : "Add to Cart"}
                        </button>

                        <hr />

                        <p>
                            Status: <span id="stock_status" className={product?.stock > 0 ? "greenColor" : "redColor"}>{product?.stock > 0 ? product?.stock <= 5 ? `In Stock (Only ${product?.stock} left)` : "In Stock" : "Out of Stock"}</span>
                        </p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p>
                            {product?.description}
                        </p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product?.seller}</strong></p>

                        {isAuthenticated ? <Review productId={product?._id} /> : <div className="alert alert-danger my-5" type="alert">
                            Login to post your review.
                        </div>}
                    </div>
                </div>
                {product?.reviews?.length > 0 && <Reviews reviews={product?.reviews} />}
            </>
    )
}

export default ProductDetails