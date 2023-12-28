import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import AdminLayout from './AdminLayout';
import { useDeleteOrderMutation } from '../../redux/api/order';
import { useGetAdminUsersQuery } from '../../redux/api/user';

const AdminUsers = () => {
    const { data, isLoading, error } = useGetAdminUsersQuery();
    const [deleteOrder, { isLoading: deleteOrderLoading, error: deleteOrderError, isSuccess: deleteOrderSuccess, data: deleteOrderData }] = useDeleteOrderMutation();

    const setUsers = () => {
        const users = {
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
                    label: "Email",
                    field: "email",
                    sort: "asc",
                },
                {
                    label: "Role",
                    field: "role",
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

        data?.data?.forEach((user) => {
            users.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: (<>
                    <Link to={`/admin/users/${user?._id}`} className='btn btn-outline-primary'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <button className='btn btn-outline-danger ms-2'
                    // onClick={() => deleteOrder(user?._id)}
                    // disabled={deleteOrderLoading}
                    >
                        <i className='fa fa-trash'></i>
                    </button>
                </>)
            });
        })

        return users

    }

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message || "Something went wrong")
        // if (deleteOrderError) toast.error(deleteOrderError?.data?.message || "Something went wrong")

        // if (deleteOrderSuccess) toast.success(deleteOrderData?.message || "Deleted Order");
    }, [error])
    return (
        <AdminLayout>
            <MetaData title={"All Users | Admin"} />
            {isLoading ? <Loader /> :
                <>
                    <div><h1 className="my-5">{data?.data?.length} Users</h1></div>
                    <MDBDataTable data={setUsers()} className='px-3' bordered striped hover />
                </>
            }
        </AdminLayout>
    )
}

export default AdminUsers