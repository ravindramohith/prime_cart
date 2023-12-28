import React from 'react'
import MetaData from '../layout/MetaData'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../redux/features/cartSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countriesList = Object.values(countries)
    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = React.useState(shippingInfo?.address || "")
    const [city, setCity] = React.useState(shippingInfo?.city || "")
    const [zipCode, setZipCode] = React.useState(shippingInfo?.zipCode || "")
    const [country, setCountry] = React.useState(shippingInfo?.country || "")
    const [phone, setPhone] = React.useState(shippingInfo?.phoneNumber || "")

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNumber: phone, zipCode, country }));
        navigate("/confirm_order")
    }

    return (
        <>
            <MetaData title={"Shipping Info"} />
            <CheckoutSteps shipping />
            <div className="row wrapper mb-5">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitForm}
                    >
                        <h2 className="mb-4">Shipping Info</h2>
                        <div className="mb-3">
                            <label htmlFor="address_field" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                name="address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_field" className="form-label">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                name="city"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_field" className="form-label">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                name="phoneNo"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="zip_code_field" className="form-label"
                            >Zip Code</label
                            >
                            <input
                                type="number"
                                id="zip_code_field"
                                className="form-control"
                                name="zipCode"
                                value={zipCode}
                                onChange={e => setZipCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country_field" className="form-label">Country</label>
                            <select
                                id="country_field"
                                className="form-select"
                                name="country"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map((c, i) =>
                                    <option key={i} value={c.name}>{c.name}</option>
                                )}
                            </select>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn w-100 py-2">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping