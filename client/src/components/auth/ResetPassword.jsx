import React from 'react'
import { useResetPasswordMutation } from '../../redux/api/user';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [resetPassword, { isLoading, error, isSuccess, data }] = useResetPasswordMutation();
    const { isAuthenticated } = useSelector(state => state.auth)

    const submitForm = (e) => {
        e.preventDefault();
        if (confirmPassword !== password) toast.error("Passwords do not match");
        resetPassword({ token: params?.token, body: { password, confirmPassword } });
    }

    React.useEffect(() => {
        if (error)
            toast.error(error?.data?.message)
        if (isAuthenticated) navigate("/");
        if (isSuccess) { toast.success(data?.message); navigate("/login"); }
    }, [error, isAuthenticated, isSuccess])

    return (
        <>
            <MetaData title={"Reset Your Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitForm}
                    >
                        <h2 className="mb-4">New Password</h2>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm_password_field" className="form-label"
                            >Confirm Password</label
                            >
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                name="confirm_password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Updating Password..." : "Set Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword