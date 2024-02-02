import Shimmer from "./Shimmer";
import useRestaurantMenu from "../../utils/useRestaurant";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  //adding category
  const categories =
  resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>{c.card?.card?.["@type"]==
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"})

  return (
    <div className="text-center ">
      <h1 className="font-bold my-4 text-2xl">{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordian  */}
    </div>
  );
};

export default RestaurantMenu;