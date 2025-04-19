import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim() !== "") {
        fetchSuggestions(searchText);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.38430&lng=78.45830&str=${query}&trackingId=undefined&includeIMItem=true`
      );
      const data = await res.json();
      const allSuggestions = data?.data?.suggestions || [];
      const restaurantSuggestions = allSuggestions.filter(
        (item) => item.type === "RESTAURANT"
      );
      console.log(restaurantSuggestions)
      setSuggestions(restaurantSuggestions);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="search-page">
      <button className="go-back-btn" onClick={handleGoBack}>
        ← Go Back
      </button>

      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for restaurants and food"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText ? (
        <button onClick={() => setSearchText("")}>❌</button>
        ) : (
        <button>🔍</button>
        )}

      </div>

      {suggestions.length > 0 && (
  <div className="suggestion-box">
    {suggestions.map((item, idx) => (
      <Link
        key={idx}
        to={
          "/restaurants/" +
          (item.metadata ? JSON.parse(item.metadata)?.data?.primaryRestaurantId : "")
        }
        className="suggestion-item"
      >
        <img
          src={
            item.cloudinaryId
              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item.cloudinaryId}`
              : "https://via.placeholder.com/60"
          }
          alt={item.text}
        />
        <div>
          <div className="text">{item.text}</div>
        </div>
      </Link>
    ))}
  </div>
)}

    </div>
  );
};

export default Search;
