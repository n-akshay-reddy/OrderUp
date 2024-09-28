import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useReastaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {

    const {resId} = useParams();

    const resInfo = useReastaurantMenu(resId);

    const [showIndex,setShowIndex] = useState(0);


    if(resInfo===null){
        return <Shimmer/>
    }

    
    // If we place this, above  the condition (resInfo===null) then it will throw an error   
    const {name,cuisines,id,costForTwoMessage} = resInfo?.data?.cards[2]?.card?.card?.info    

    const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => {
        return c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    })
    console.log(categories)


    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
            <h2>Menu</h2>

            {
                categories.map((categorie,index) => {
                    //Controlled component
                return (<RestaurantCategory key={index} data={categorie.card.card}
                showItems={index===showIndex}
                settingShowIndex={() => setShowIndex(index === showIndex ? null : index)}/>)})
            }

            
            
        </div>
    )
};
export default RestaurantMenu;