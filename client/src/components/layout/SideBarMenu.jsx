import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBarMenu = ({ menuItems }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = React.useState(location.pathname)

    const handleMenuItemClick = (url) => {
        setActiveItem(url)
    }
    return (
        <div className="list-group mt-5 pl-4">
            {menuItems?.map((item, index) => (
                <Link
                    key={index}
                    to={item.url}
                    className={`fw-bold list-group-item list-group-item-action ${activeItem.includes(item.url) ? "active" : ""}`}
                    onClick={e => handleMenuItemClick(item.url)}
                    aria-current={activeItem.includes(item.url) ? "true" : "false"}
                >
                    <i className={`${item.icon} fa-fw pe-2`}></i> {item.name}
                </Link>
            ))}

        </div>
    )
}

export default SideBarMenu