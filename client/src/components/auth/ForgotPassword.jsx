import React from 'react'
import { useForgotPasswordMutation } from '../../redux/api/user';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');

    const [forgotPassword, { isLoading, error, isSuccess, data }] = useForgotPasswordMutation();
    const { isAuthenticated } = useSelector(state => state.auth)

    const submitForm = (e) => {
        e.preventDefault();
        forgotPassword({ email });
    }

    React.useEffect(() => {
        if (error)
            toast.error(error?.data?.message)
        if (isAuthenticated) navigate("/");
        if (isSuccess) toast.success(data?.message)
    }, [error, isAuthenticated, isSuccess])
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitForm}
                >
                    <h2 className="mb-4">Forgot Password</h2>
                    <div className="mt-3">
                        <label htmlFor="email_field" className="form-label">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending Email..." : "Send Email"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword