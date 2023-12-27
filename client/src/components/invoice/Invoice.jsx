import React from 'react'
import './invoice.css';
import MetaData from '../layout/MetaData'
import { useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../../redux/api/order';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const Invoice = () => {
    const params = useParams();

    const { data, isLoading, error } = useGetOrderQuery(params?.id);

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message)
    }, [error])
    return (
        <>
            <MetaData title={"Order Invoice"} />
            {isLoading ? <Loader /> :
                <div className="order-invoice my-5">
                    <div className="row d-flex justify-content-center mb-5">
                        <button className="btn btn-success col-md-5">
                            <i className="fa fa-print"></i> Download Invoice
                        </button>
                    </div>
                    <div id="order_invoice" className="p-3 border border-secondary">
                        <header className="clearfix">
                            <div id="logo">
                                <img src="/images/eshop_logo.png" alt="Company Logo" />
                            </div>
                            <h1>INVOICE # {data?.order?._id}</h1>
                            <div id="company" className="clearfix">
                                <div>EShop</div>
                                <div>
                                    455 Foggy Heights,
                                    <br />
                                    AZ 85004, US
                                </div>
                                <div>(602) 519-0450</div>
                                <div>
                                    <a href="mailto:info@eshop.com">info@eshop.com</a>
                                </div>
                            </div>
                            <div id="project">
                                <div><span>Name</span> {data?.order?.user?.name}</div>
                                <div><span>EMAIL</span> {data?.order?.user?.email}</div>
                                <div><span>PHONE</span> {data?.order?.shipping?.phoneNumber}</div>
                                <div>
                                    <span>ADDRESS</span> {data?.order?.shipping?.address}, {data?.order?.shipping?.city}, {data?.order?.shipping?.country}, {data?.order?.shipping?.zipCode}
                                </div>
                                <div><span>DATE</span> {new Date(data?.order?.createdAt).toLocaleString("en-IN")}</div>
                                <div><span>Status</span> {data?.order?.orderStatus}</div>
                            </div>
                        </header>
                        <main>
                            <table className="mt-5">
                                <thead>
                                    <tr>
                                        <th className="service">ID</th>
                                        <th className="desc">NAME</th>
                                        <th>PRICE</th>
                                        <th>QTY</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.order?.orderItems?.map((orderItem) => (
                                        <tr>
                                            <td className="service">{orderItem?.product}</td>
                                            <td className="desc">{orderItem?.name}</td>
                                            <td className="unit">Rs.{orderItem?.price}</td>
                                            <td className="qty">{orderItem?.quantity}</td>
                                            <td className="total">Rs.{orderItem?.price * orderItem?.quantity}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colspan="4">
                                            <b>SUBTOTAL</b>
                                        </td>
                                        <td className="total">Rs.{data?.order?.itemsPrice}</td>
                                    </tr>

                                    <tr>
                                        <td colspan="4">
                                            <b>TAX 10%(GST)</b>
                                        </td>
                                        <td className="total">Rs.{data?.order?.tax}</td>
                                    </tr>

                                    <tr>
                                        <td colspan="4">
                                            <b>SHIPPING CHARGES</b>
                                        </td>
                                        <td className="total">Rs.{data?.order?.shippingAmount}</td>
                                    </tr>

                                    <tr>
                                        <td colspan="4" className="grand total">
                                            <b>GRAND TOTAL</b>
                                        </td>
                                        <td className="grand total">Rs.{data?.order?.totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="notices">
                                <div>NOTICE:</div>
                                <div className="notice">
                                    A finance charge of 1.5% will be made on unpaid balances after 30
                                    days.
                                </div>
                            </div>
                        </main>
                        <footer>
                            Invoice was created on a computer and is valid without the signature.
                        </footer>
                    </div>
                </div>
            }
        </>
    )
}

export default Invoice