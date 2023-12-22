import React from 'react'
import UserLayout from './UserLayout'
import { useUpdatePasswordMutation } from '../../redux/api/user'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [updatePassword, { isLoading, isSuccess, error, data }] = useUpdatePasswordMutation();

    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message)
        if (isSuccess) { toast.success(data?.message || "Password Updated Successfully"); navigate("/me/profile") }
    }, [error, isSuccess])

    const submitForm = (e) => {
        e.preventDefault();
        updatePassword({ prevPassword: oldPassword, password: newPassword })
    }
    return (
        <UserLayout>
            <div class="row wrapper">
                <div class="col-10 col-lg-8">
                    <form class="shadow rounded bg-body" onSubmit={submitForm}>
                        <h2 class="mb-4">Update Password</h2>
                        <div class="mb-3">
                            <label for="old_password_field" class="form-label">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password_field"
                                class="form-control"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div class="mb-3">
                            <label for="new_password_field" class="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password_field"
                                class="form-control"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" class="btn update-btn w-100" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default UpdatePassword