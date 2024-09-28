import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {
    const { resData } = props;

    // Destructure the properties from resData safely
    const {
        cloudinaryImageId = "",
        name = "Restaurant Name",
        avgRating = "N/A",
        cuisines = [],
    } = resData?.info || {};

    return (
        <div className="res-card">
            {/* Restaurant Image */}
            <img 
                className="res-logo" 
                src={CDN_URL + cloudinaryImageId} 
                alt={`${name} Logo`} 
            />
            
            {/* Restaurant Name */}
            <h3>{name}</h3>
            
            {/* Cuisines */}
            <h4>{cuisines.join(", ")}</h4>
            
            {/* Average Rating */}
            <h4>{`Rating: ${avgRating}`}</h4>
        </div>
    );
};


export const withRatingLabel = () => {
    return (props) => {
        return (
            <div className="res-card-wrapper">
                <label className="rating-label">High Ratings</label>
                <RestaurantCard {...props}/>
            </div>
        );
    };
}

export default RestaurantCard;
