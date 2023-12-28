import React from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import AdminLayout from './AdminLayout';
import { useDeleteAdminUserMutation, useGetAdminUsersQuery } from '../../redux/api/user';

const AdminUsers = () => {
    const { data, isLoading, error } = useGetAdminUsersQuery();
    const [deleteUser, { isLoading: deleteUserLoading, error: deleteUserError, isSuccess: deleteUserSuccess, data: deleteUserData }] = useDeleteAdminUserMutation();

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
                        onClick={() => deleteUser(user?._id)}
                        disabled={deleteUserLoading}
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
        if (deleteUserError) toast.error(deleteUserError?.data?.message || "Something went wrong")

        if (deleteUserSuccess) toast.success(deleteUserData?.message || "Deleted User");
    }, [error, deleteUserError, deleteUserSuccess])
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