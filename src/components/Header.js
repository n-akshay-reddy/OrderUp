import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
// import { useContext } from "react";
// import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const online = useOnlineStatus();

    //Subscribing to the store using a Selector
    const cartItems = useSelector((store) => store.cart.items);
    // console.log(cartItems)

    // const {loggedInUser} = useContext(UserContext);


    return (
        <div className="header bg-[#f05a7e]">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} ></img>
            </div>

            <div className="nav-items">
                <ul>
                    <li>Online status: {online?"✔️":"❌"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/cart">🛒 Cart- ({cartItems.length} items)</Link></li>
                    {/* <li>{loggedInUser}</li> */}
                </ul>
            </div>
        </div>
    )
}

export default Header;