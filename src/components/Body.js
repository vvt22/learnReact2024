import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect,useContext} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// import resList from "../../utils/mockdata";
import useOnlineStatus from "../../utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";


const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant]=useState([]);
  const [searchText, setSearchText] = useState("");
  //using as higher order component
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
 // console.log("Body Rendered",listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // Optional Chaining
    setListOfRestraunt(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // console.log(listOfRestaurants);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );
    const { loggedInUser, setUserName } = useContext(UserContext);
  return listOfRestaurants.length === 0 ?
  (<Shimmer />)
 :(
    <div className="body">
      <div className="filter flex justify-center">
      <div className="search m-5 p-4">
          <input
            type="text"
            className="search-box border border-solid border-gray-700 rounded-md p-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="mx-1 p-2 bg-orange-400 rounded-md"
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="mx-1 px-1 flex items-center"><button
          className="p-2 bg-orange-400 rounded-md"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.0
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button></div>
        <div className="search m-4 p-4 flex items-center">
          <label>UserName : </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-around ">
        {filteredRestaurant.map((restaurant) => (
          <Link
          key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
          {/* adding condition
            {restaurant.info.promoted?<RestaurantCardPromoted resData={restaurant}/>: */}
            <RestaurantCard resData={restaurant} />  
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;