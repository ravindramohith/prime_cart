import React from 'react'
import AdminLayout from './AdminLayout'
import MetaData from '../layout/MetaData'
import toast from 'react-hot-toast';
import { useGetOrderQuery, useProcessOrderMutation } from '../../redux/api/order';
import { Link, useParams } from 'react-router-dom';
import { STATUS } from '../../constants/constants';

const ProcessOrder = () => {
    const params = useParams();

    const { data, isLoading, error } = useGetOrderQuery(params?.id);
    const [processOrder, { data: processData, error: processError, isSuccess: processSuccess, isLoading: processLoading }] = useProcessOrderMutation();

    const [status, setStatus] = React.useState(data?.order?.orderStatus);

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message || "Something went wrong")
        if (processError) toast.error(processError?.data?.message || "Something went wrong")

        if (processSuccess) toast.success(processData?.message || "Order Processed");
        if (data) setStatus(data?.order?.orderStatus);
    }, [error, processSuccess, processError, data])

    const updateOrder = (id) => {
        processOrder({ body: { orderStatus: status }, id })
    }
    return (
        <AdminLayout>
            <MetaData title={"Process Order | Admin"} />
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-8 order-details">
                    <h3 className="mt-5 mb-4">Order Details</h3>

                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{data?.order?._id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Order Status</th>
                                <td className={String(data?.order?.orderStatus).includes("Delivered") ? "greenColor" : "redColor"}>
                                    <b>{data?.order?.orderStatus}</b>
                                </td>
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
                                <td>{data?.order?.shipping?.address}, {data?.order?.shipping?.city}, {data?.order?.shipping?.country}, {data?.order?.shipping?.zipCode}</td>
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
                                    <p>Rs.{orderItem?.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{orderItem?.quantity} Piece{orderItem?.quantity > 1 ? "s" : ""}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">Status</h4>

                    <div className="mb-3">
                        <select className="form-select" name="status" value={status} onChange={e => setStatus(e.target.value)}>
                            {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <button className="btn btn-primary w-100" onClick={() => updateOrder(data?.order?._id)} disabled={processLoading}>{processLoading ? "Updating..." : "Update Status"}</button>

                    <h4 className="mt-5 mb-3">Order Invoice</h4>
                    <Link to={`/invoice/order/${data?.order?._id}`} className="btn btn-success w-100">
                        <i className="fa fa-print"></i> Generate Invoice
                    </Link>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ProcessOrder