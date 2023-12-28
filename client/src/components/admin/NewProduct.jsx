import React from 'react'
import MetaData from '../layout/MetaData'
import AdminLayout from './AdminLayout'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../constants/constants'
import { useCreateProductMutation } from '../../redux/api/product'
import toast from 'react-hot-toast'

const NewProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = React.useState({
        name: "",
        description: "",
        price: "",
        category: CATEGORIES[0],
        stock: "",
        seller: "",
    })

    const [createProduct, { data, isLoading, error, isSuccess }] = useCreateProductMutation();

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const submitForm = (e) => {
        e.preventDefault();
        createProduct(product);
    }

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message || "Something went wrong");
        if (isSuccess) { toast.success(data?.message || "Product created successfully"); navigate("/admin/products"); }
    }, [error, isSuccess]);
    return (
        <AdminLayout>
            <MetaData title={"Create Product | Admin"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-10 mt-5 mt-lg-0">
                    <form className="shadow rounded bg-body" onSubmit={submitForm}>
                        <h2 className="mb-4">New Product</h2>
                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label"> Name </label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={product.name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description_field" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                name="description"
                                value={product.description}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="price_field" className="form-label"> Price </label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    name="price"
                                    value={product.price}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="stock_field" className="form-label"> Stock </label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    name="stock"
                                    value={product.stock}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="category_field" className="form-label"> Category </label>
                                <select className="form-select" id="category_field" name="category" value={product.category} onChange={onChange}>
                                    {CATEGORIES?.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="seller_field" className="form-label"> Seller Name </label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    name="seller"
                                    value={product.seller} onChange={onChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn w-100 py-2" disabled={isLoading}>{isLoading ? "Creating..." : "CREATE"}</button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default NewProduct