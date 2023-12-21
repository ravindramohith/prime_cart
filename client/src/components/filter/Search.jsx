import React from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = React.useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault();
            if (keyword) navigate(`/?keyword=${keyword}`);
            else navigate('/');
        }}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    aria-describedby="search_btn"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    name="keyword"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <button id="search_btn" className="btn" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    )
}

export default Search