import React from 'react'
import Search from '../filter/Search'
import { useGetCurrentUserQuery } from '../../redux/api/user'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/api/auth';

const Header = () => {
  const navigate = useNavigate();
  const currentUserData = useGetCurrentUserQuery();
  const [logout, logoutData] = useLazyLogoutQuery();
  const { user } = useSelector(state => state.auth)
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src="/images/eshop_logo.png" alt="EShop Logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">0</span>
        </a>
        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar ? user.avatar.url : "../images/default_avatar.jpg"}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
              <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>

              <Link className="dropdown-item" to="/me/orders"> Orders </Link>

              <Link className="dropdown-item" to="/me/profile"> Profile </Link>

              <Link className="dropdown-item text-danger" to="/" onClick={e => { logout(); navigate(0); }}> Logout </Link>
            </div>
          </div>
        ) : !currentUserData?.isLoading && <a href="/login" className="btn ms-4" id="login_btn"> Login </a>}
      </div>
    </nav >
  )
}

export default Header