import FoodFireLogo from "../../images/FoodFireLogo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";


const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const { loggedInUser } = useContext(UserContext);
      return (
      <div className="flex justify-between bg-orange-100 shadow-md m-2">
        <div className="logo-container">
          <img className="w-28 m-3 p-4" src={FoodFireLogo} />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-3 ">
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li >
            <li className="px-4">Cart</li>
            <button 
            className="login px-4"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Header;