import React from 'react'
import AdminLayout from './AdminLayout'
import MetaData from '../layout/MetaData'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAdminUserQuery, useUpdateAdminUserMutation } from '../../redux/api/user';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("");

    const { data, isLoading, error } = useGetAdminUserQuery(params?.id);
    const [updateUser, { data: updateData, error: updateError, isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateAdminUserMutation();

    React.useEffect(() => {
        if (data) {
            setName(data?.data?.name);
            setEmail(data?.data?.email);
            setRole(data?.data?.role);
        }
        if (error) toast.error(error?.data?.message || "Something went wrong")
        if (updateError) toast.error(updateError?.data?.message || "Something went wrong")
        if (updateSuccess) { toast.success(updateData?.message || "User Updated Successfully"); navigate("/admin/users") }
    }, [error, data, updateSuccess, updateError])

    const submitForm = (e) => {
        e.preventDefault();
        updateUser({ body: { name, email, role }, id: params?.id })
    }
    return (
        <AdminLayout>
            <MetaData title={"Update User | Admin"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form className="shadow-lg" onSubmit={submitForm}>
                        <h2 className="mb-4">Update User</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="role_field" className="form-label">Role</label>
                            <select id="role_field" className="form-select" name="role" value={role} onChange={e => setRole(e.target.value)}>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

                        <button type="submit" className="btn update-btn w-100 py-2">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpdateUser