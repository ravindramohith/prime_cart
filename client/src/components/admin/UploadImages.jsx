import React from 'react'
import AdminLayout from './AdminLayout'
import { useDeleteProductImageMutation, useGetProductQuery, useUploadProductImagesMutation } from '../../redux/api/product';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';

const UploadImages = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [images, setImages] = React.useState([]);
    const [imagesPreviews, setImagesPreviews] = React.useState([]);
    const [uploadedImages, setUploadedImages] = React.useState([]);
    const fileInputRef = React.useRef(null);

    const { data } = useGetProductQuery(params);
    const [uploadProductImages, { data: uploadProductImagesData, error, isLoading, isSuccess }] = useUploadProductImagesMutation();
    const [deleteProductImage, { data: deleteProductImageData, error: deleteProductImageError, isLoading: deleteProductImageIsLoading, isSuccess: deleteProductImageIsSuccess }] = useDeleteProductImageMutation();

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    setImagesPreviews((oldImages) => [...oldImages, fileReader.result])
                    setImages((oldImages) => [...oldImages, fileReader.result])
                }
            }

            fileReader.readAsDataURL(file);
        })
    }

    const deleteImagePreviews = (image) => {
        const filteredImagesPreviews = imagesPreviews.filter(img => img !== image)
        setImages(filteredImagesPreviews);
        setImagesPreviews(filteredImagesPreviews);
    }

    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const uploadImages = (e) => {
        e.preventDefault();
        uploadProductImages({ id: params?.id, body: { images } })
    }

    const deleteImage = (imageId) => {
        deleteProductImage({ id: params?.id, body: { imgId: imageId } })
    }

    React.useEffect(() => {
        if (data?.data) setUploadedImages(data?.data?.images)
        if (error) toast.error(error?.data?.message || "Something went wrong");
        if (deleteProductImageError) toast.error(deleteProductImageError?.data?.message || "Something went wrong");

        if (isSuccess) { toast.success(uploadProductImagesData?.message || "Product Images Uploaded successfully"); resetFileInput(); setImagesPreviews([]); }
        if (deleteProductImageIsSuccess) toast.success(deleteProductImageData?.message || "Product Images Deleted successfully");
    }, [data, isSuccess, error, deleteProductImageError, deleteProductImageIsSuccess])
    return (
        <AdminLayout>
            <MetaData title={"Upload Product Images | Admin"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-8 mt-5 mt-lg-0">
                    <form className="shadow rounded bg-body" enctype="multipart/form-data" onSubmit={uploadImages}>
                        <h2 className="mb-4">Upload Product Images</h2>

                        <div className="mb-3">
                            <label for="customFile" className="form-label">Choose Images</label>

                            <div className="custom-file">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="product_images"
                                    className="form-control"
                                    id="customFile"
                                    multiple
                                    onChange={onChange}
                                    onClick={resetFileInput}
                                />
                            </div>
                            {imagesPreviews?.length > 0 &&
                                <div className="new-images my-4">
                                    <p className="text-warning">New Images:</p>
                                    <div className="row mt-4">
                                        {imagesPreviews?.map((image) => (
                                            <div className="col-md-3 mt-2">
                                                <div className="card">
                                                    <img
                                                        src={image}
                                                        alt="Card"
                                                        className="card-img-top p-2"
                                                        style={{ width: "100%", height: "80px" }}
                                                    />
                                                    <button
                                                        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                                                        type="button"
                                                        className="btn btn-block btn-danger cross-button mt-1 py-0"
                                                        onClick={() => deleteImagePreviews(image)}
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {uploadedImages?.length > 0 &&
                                <div className="uploaded-images my-4">
                                    <p className="text-success">Product Uploaded Images:</p>
                                    <div className="row mt-1">
                                        {uploadedImages?.map((image) => (
                                            <div className="col-md-3 mt-2">
                                                <div className="card">
                                                    <img
                                                        src={image.url}
                                                        alt="Card"
                                                        className="card-img-top p-2"
                                                        style={{ width: "100%", height: "80px" }}
                                                    />
                                                    <button
                                                        style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                                                        className="btn btn-block btn-danger cross-button mt-1 py-0"
                                                        disabled={isLoading || deleteProductImageIsLoading}
                                                        type="button"
                                                        onClick={() => deleteImage(image.public_id)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>

                        <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading || deleteProductImageIsLoading}>
                            {isLoading ? "Uploading..." : "Upload"}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UploadImages