import React from 'react'
import MetaData from '../layout/MetaData'
import { useGetOrderQuery } from '../../redux/api/order'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'

const Order = () => {
    const params = useParams();

    const { data, isLoading, error } = useGetOrderQuery(params?.id);

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message)
    }, [error])
    return (
        <>
            <MetaData title={"Order Details"} />
            {isLoading ? <Loader /> :
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-lg-9 mt-5 order-details">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mt-5 mb-4">Your Order Details</h3>
                            <a className="btn btn-success" href="/invoice/order/order-id">
                                <i className="fa fa-print"></i> Invoice
                            </a>
                        </div>
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">ID</th>
                                    <td>{data?.order?._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Status</th>
                                    <td className={String(data?.order?.orderStatus).includes("Delivered") ? "greenColor" : "redColor"}>
                                        <b>{data?.order?.orderStatus}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Date</th>
                                    <td>{new Date(data?.order?.createdAt).toLocaleString("en-IN")}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="mt-5 mb-4">Shipping Info</h3>
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{data?.order?.user?.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone No</th>
                                    <td>{data?.order?.shipping?.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{data?.order?.shipping?.address}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="mt-5 mb-4">Payment Info</h3>
                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Status</th>
                                    <td className={data?.order?.paymentInfo?.status === "paid" ? "greenColor" : "redColor"}>
                                        <b>{data?.order?.paymentInfo?.status}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Method</th>
                                    <td>{data?.order?.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Stripe ID</th>
                                    <td>{data?.order?.paymentInfo?.id || "Nil"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amount Paid</th>
                                    <td>Rs.{data?.order?.totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="mt-5 my-4">Order Items:</h3>

                        <hr />
                        <div className="cart-item my-1">
                            {data?.order?.orderItems?.map((orderItem) => (
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img
                                            src={orderItem?.image}
                                            alt="Product Name"
                                            height="45"
                                            width="65"
                                        />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link to={`/product/${orderItem?.product}`}>{orderItem?.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>Rs.{orderItem?.totalAmount}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{orderItem?.quantity} Piece{orderItem?.quantity > 1 ? "s" : ""}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                    </div>
                </div>
            }
        </>
    )
}

export default Order