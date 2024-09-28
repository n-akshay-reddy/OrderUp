import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { MENU_ITEM_PIC } from "../utils/constant";

const ItemList = (prop) => {
    const { items } = prop;

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        //Dispatch an action
        dispatch(addItem(item))
    };

    return (
        
         <ul>
            {items.map((item) => (
                <li key={item.card.info.id}>
                    <div>
                    <img className="item-photo" src={MENU_ITEM_PIC + item.card.info.imageId}/>
                    <button className="add-button" onClick={() => handleAddItem(item)}>Add+</button>
                    </div>
                {item.card.info.name} - {"Rs: "}
                {(item.card.info.price || item.card.info.defaultPrice) / 100}</li>))}
                
        </ul>
    )

}

export default ItemList;