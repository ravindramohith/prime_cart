import React from 'react'
import { useRegisterMutation } from '../../redux/api/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")

    const [register, { data, error, isError, isLoading }] = useRegisterMutation();
    const { isAuthenticated } = useSelector(state => state.auth)

    const submitForm = (e) => {
        e.preventDefault();
        register({ email, password, name });
    }

    React.useEffect(() => {
        if (isError)
            toast.error(error?.data?.message)
        if (isAuthenticated) navigate("/");
    }, [isError, isAuthenticated])
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitForm}
                >
                    <h2 className="mb-4">Register</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">Name</label>
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
                        <label htmlFor="email_field" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value) }}
                        />
                    </div>

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

                    <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                        {isLoading ? "Signing Up..." : "REGISTER"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register