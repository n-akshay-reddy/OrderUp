import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { MENU_ITEM_PIC } from "../utils/constant";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.card.info.price || item.card.info.defaultPrice) / 100;
    }, 0);

    return (
        <div className="cart-container">
            <div className="cart-summary">
                <h2>Cart Summary</h2>
                <p>Total Items: {cartItems.length}</p>
                <p>Total Amount: Rs {totalAmount}</p>
                <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
            </div>

            <ul className="cart-items-list">
                {cartItems.map((item) => (
                    <li key={item.card.info.id} className="cart-item">
                        <div className="cart-item-details">
                            <img className="item-photo" src={MENU_ITEM_PIC + item.card.info.imageId} alt={item.card.info.name} />
                            <div>
                                <h3>{item.card.info.name}</h3>
                                <p>Rs: {(item.card.info.price || item.card.info.defaultPrice) / 100}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {cartItems.length === 0 && <h1 className="empty-cart-message">Your cart is empty, please add items to your cart.</h1>}
        </div>
    );
};

export default Cart;
