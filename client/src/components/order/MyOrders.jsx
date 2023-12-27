import React from 'react'
import { useMyOrdersQuery } from '../../redux/api/order'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { data, isLoading, error } = useMyOrdersQuery();

    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: "Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Amount Paid",
                    field: "amount",
                    sort: "asc",
                },
                {
                    label: "Payment Status",
                    field: "paymentStatus",
                    sort: "asc",
                },
                {
                    label: "Order Status",
                    field: "orderStatus",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: []
        }

        data?.orders?.forEach((order) => {
            orders.rows.push({
                id: order._id,
                amount: order.totalAmount,
                orderStatus: order.orderStatus,
                paymentStatus: order.paymentInfo.status,
                actions: (<>
                    <Link to={`/me/order/${order?._id}`} className='btn btn-primary'>
                        <i className='fa fa-eye'></i>
                    </Link>
                    <Link to={`/invoice/order/${order?._id}`} className='btn btn-success ms-2'>
                        <i className='fa fa-print'></i>
                    </Link>
                </>)
            });
        })

        return orders

    }

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message)
    }, [error])
    return (
        <>
            <MetaData title={"My Orders"} />
            {isLoading ? <Loader /> :
                <div><h1 class="my-5">{data?.orders?.length} Orders</h1></div>
            }
            <MDBDataTable data={setOrders()} className='px-3' bordered striped hover />
        </>
    )
}

export default MyOrders