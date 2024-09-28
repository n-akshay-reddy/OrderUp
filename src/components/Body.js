import RestaurantCard, {withRatingLabel} from "./RestaurantCard";
// import { resList } from "../utils/data";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { RESTAURANTS_API } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
    

    const Body = () => {

        const onlineStatus = useOnlineStatus();

        // Initialize state with the restaurant list
        const [listOfRestaurants, setListOfRestaurants] = useState([]);
        const [filteredRestaurants, setFiltredRestaurants] = useState([]);

        const [location, setLocation] = useState({ lat: 12.9352403, lng: 77.624532 }); // Default location

        const [searchText, setSearchText] = useState("");

        const RestaurantCardHighRating = withRatingLabel(RestaurantCard);

        useEffect(() => {
            
            fetchData(location.lat, location.lng);
        }, []);
    
        // Fetch restaurant data based on latitude and longitude
        const fetchData = async (lat, lng) => {
            const apiUrl = `${RESTAURANTS_API}?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
            const data = await fetch(apiUrl);
        
        const json = await data.json();
        

        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFiltredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        };
    


    // Function to get the user's current location and fetch restaurants based on it
    const accessLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    fetchData(latitude, longitude); // Fetch data based on the new location
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to fetch location. Using default location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Function to filter top-rated restaurants
    const filterTopRated = () => {
        const filteredList = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4.5
        );
        setFiltredRestaurants(filteredList);
    };

    // Check if the data is still loading
    if(listOfRestaurants.length===0){
        return <Shimmer/>
    }


    // Show offline message if the user is not online
    if (onlineStatus === false) {
        return (
            <div className="offline-message">
                <h1>Looks like you are offline. Check your internet connection.</h1>
            </div>
        );
    }

    return (
        <div className="body">
            <div className="filter">
            <div className="search">
                <input type="text" className="seacrh-box"  onChange={(e)=>{
                    setSearchText(e.target.value);
                    
                }}/>
                <button onClick={()=> {
                    const filteredRestaurantList = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                    setFiltredRestaurants(filteredRestaurantList)
                }}>Search</button>
                <button onClick={()=> {
                    setFiltredRestaurants(listOfRestaurants)
                }}>Reset</button>

                {/* Button to get location and fetch restaurants */}
                <button className="filter-btn" onClick={accessLocation}>
                    Access Location
                </button>

                <button className="filter-btn" onClick={filterTopRated}>
                    Top Rated Restaurants
                </button>
                
            </div>
            
            </div>
            <div className="res-container">
                {
                    
                    // Render the filtered list of restaurants
                    filteredRestaurants.map((restaurant) => {
                        return (

                       <Link key={restaurant.info.id} to={"restaurants/"+restaurant.info.id}>
                        {/* if restaurant is having high rating then add a label */
                        restaurant.info.avgRating>4.5?<RestaurantCardHighRating resData={restaurant}/>:
                        <RestaurantCard resData={restaurant} />}
                       
                        </Link>);
                        
    })
                }
            </div>
        </div>
    );
};

export default Body;



