import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceQueryParams } from '../../helpers/helpers';
import { CATEGORIES, RATINGS } from '../../constants/constants';
import StarRatings from 'react-star-ratings';

const Filters = () => {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const [min, setMin] = React.useState(searchParams.get("min"));
    const [max, setMax] = React.useState(searchParams.get("max"));

    const handlePriceFilter = (e) => {
        e.preventDefault();
        searchParams = getPriceQueryParams(searchParams, "min", min);
        searchParams = getPriceQueryParams(searchParams, "max", max);
        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);
    }

    const handleCategoryFilter = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name)
        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false
        })

        if (checkbox.checked === false) {
            //delete filter from query
            if (searchParams.has(checkbox.name)) {
                searchParams.delete(checkbox.name)
                const path = window.location.pathname + "?" + searchParams.toString()
                navigate(path);
            }
        }
        else {
            // setNew value if already there
            if (searchParams.has(checkbox.name))
                searchParams.set(checkbox.name, checkbox.value)
            else
                searchParams.append(checkbox.name, checkbox.value)

            const path = window.location.pathname + "?" + searchParams.toString()
            navigate(path);
        }
    }

    const ifSelected = (checkBoxType, checkBoxValue) => {
        const value = searchParams.get(checkBoxType);
        return value == checkBoxValue;
    }
    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <h5 className="filter-heading mb-3">Price</h5>
            <form
                id="filter_form"
                className="px-2"
                onSubmit={handlePriceFilter}
            >
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Min ($)"
                            name="min"
                            value={min}
                            onChange={e => setMin(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max ($)"
                            name="max"
                            value={max}
                            onChange={e => setMax(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">GO</button>
                    </div>
                </div>
            </form>
            <hr />
            <h5 className="mb-3">Category</h5>
            {CATEGORIES.map((category, i) => (
                <div className="form-check" key={i}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="category"
                        id="check4"
                        value={category}
                        defaultChecked={ifSelected("category", category)}
                        onClick={e => handleCategoryFilter(e.target)}
                    />
                    <label className="form-check-label" for="check4">{category}</label>
                </div>
            ))}


            <hr />
            <h5 className="mb-3">Ratings</h5>
            {RATINGS.map((rating) => (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="ratings"
                        id="check7"
                        value={rating}
                        defaultChecked={ifSelected("ratings", rating)}
                        onClick={e => handleCategoryFilter(e.target)}
                    />
                    <label className="form-check-label" for="check7">
                        <StarRatings
                            rating={rating}
                            starRatedColor="#ffb829"
                            numberOfStars={5}
                            name='rating'
                            starDimension='21px'
                            starSpacing='1px'
                        />
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Filters