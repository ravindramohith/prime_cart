import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from '../../redux/api/user';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserLayout from './UserLayout';

const UpdateProfile = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");

    const { user } = useSelector(state => state.auth)
    const [updateUser, { data, isLoading, error, isSuccess }] = useUpdateUserMutation();

    React.useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
        if (error) toast.error(error.message);
        if (isSuccess) { toast.success(data?.message || "Profile Updated Successfully"); navigate("/me/profile") }
    }, [error, user, isSuccess])

    const submitForm = (e) => {
        e.preventDefault();
        updateUser({ name, email })
    }
    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitForm}
                    >
                        <h2 className="mb-4">Update Profile</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label"> Name </label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label"> Email </label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</button>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default UpdateProfile