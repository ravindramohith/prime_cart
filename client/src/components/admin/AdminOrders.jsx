import React from 'react'
import { useDeleteProductMutation } from '../../redux/api/product'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import AdminLayout from './AdminLayout';
import { useGetAdminOrdersQuery } from '../../redux/api/order';

const AdminOrders = () => {
    const { data, isLoading, error } = useGetAdminOrdersQuery();
    const [deleteProduct, { isLoading: deleteProductLoading, error: deleteProductError, isSuccess: deleteProductSuccess, data: deleteProductData }] = useDeleteProductMutation();

    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: "Id",
                    field: "id",
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
                paymentStatus: order.paymentInfo.status.toUpperCase(),
                orderStatus: order.orderStatus,
                actions: (<>
                    <Link to={`/admin/orders/${order?._id}`} className='btn btn-outline-primary'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <button className='btn btn-outline-danger ms-2'
                    // onClick={() => deleteProduct(product?._id)}
                    // disabled={deleteProductLoading}
                    >
                        <i className='fa fa-trash'></i>
                    </button>
                </>)
            });
        })

        return orders

    }

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message || "Something went wrong")
        // if (deleteProductError) toast.error(deleteProductError?.data?.message || "Something went wrong")

        // if (deleteProductSuccess) toast.success(deleteProductData?.message || "Deleted Product");
    }, [error])
    return (
        <AdminLayout>
            <MetaData title={"All Orders | Admin"} />
            {isLoading ? <Loader /> :
                <>
                    <div><h1 className="my-5">{data?.orders?.length} Orders</h1></div>
                    <MDBDataTable data={setOrders()} className='px-3' bordered striped hover />
                </>
            }
        </AdminLayout>
    )
}

export default AdminOrders