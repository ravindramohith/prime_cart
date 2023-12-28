import React from 'react'
import { useDeleteProductMutation, useGetProductsAdminQuery } from '../../redux/api/product'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import AdminLayout from './AdminLayout';

const AdminProducts = () => {
    const { data, isLoading, error } = useGetProductsAdminQuery();
    const [deleteProduct, { isLoading: deleteProductLoading, error: deleteProductError, isSuccess: deleteProductSuccess, data: deleteProductData }] = useDeleteProductMutation();

    const setProducts = () => {
        const products = {
            columns: [
                {
                    label: "Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Stock",
                    field: "stock",
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

        data?.data?.forEach((product) => {
            products.rows.push({
                id: product._id,
                name: `${product.name?.substring(0, 20)}...`,
                stock: product.stock,
                actions: (<>
                    <Link to={`/admin/products/${product?._id}`} className='btn btn-outline-primary'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <Link to={`/admin/products/${product?._id}/upload_images`} className='btn btn-outline-success ms-2'>
                        <i className='fa fa-image'></i>
                    </Link>
                    <button className='btn btn-outline-danger ms-2' onClick={() => deleteProduct(product?._id)} disabled={deleteProductLoading}>
                        <i className='fa fa-trash'></i>
                    </button>
                </>)
            });
        })

        return products

    }

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message || "Something went wrong")
        if (deleteProductError) toast.error(deleteProductError?.data?.message || "Something went wrong")

        if (deleteProductSuccess) toast.success(deleteProductData?.message || "Deleted Product");
    }, [error, deleteProductError, deleteProductSuccess])
    return (
        <AdminLayout>
            <MetaData title={"All Products | Admin"} />
            {isLoading ? <Loader /> :
                <>
                    <div><h1 className="my-5">{data?.data?.length} Products</h1></div>
                    <MDBDataTable data={setProducts()} className='px-3' bordered striped hover />
                </>
            }
        </AdminLayout>
    )
}

export default AdminProducts