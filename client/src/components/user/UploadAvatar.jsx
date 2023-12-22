import React from 'react'
import UserLayout from './UserLayout'
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/user';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const UploadAvatar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    const [avatar, setAvatar] = React.useState("");
    const [avatarPreview, setAvatarPreview] = React.useState(user?.avatar ? user.avatar?.url : "/images/default_avatar.jpg");

    const [uploadAvatar, { data, isLoading, error, isSuccess }] = useUploadAvatarMutation();

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message)
        if (isSuccess) { toast.success(data?.message || "Avatar Uploaded Successfully"); navigate("/me/profile") }
    }, [error, isSuccess])

    const submitForm = (e) => {
        e.preventDefault();
        console.log({ avatar })
        uploadAvatar({ avatar })
    }

    const onChangeAvatar = (e) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setAvatarPreview(fileReader.result);
                setAvatar(fileReader.result);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }
    return (
        <UserLayout>
            <MetaData title="Upload Your Avatar" />
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitForm}
                    >
                        <h2 className="mb-4">Upload Avatar</h2>

                        <div className="mb-3">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <figure className="avatar item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <div className="input-foam">
                                    <label className="form-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="form-control"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChangeAvatar}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Uploading..." : "Upload"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default UploadAvatar