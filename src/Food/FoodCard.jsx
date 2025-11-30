import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    donators_name,
    donators_image,
    _id
  } = food;

  const handleViewDetails = () => {
      navigate(`/foods/${_id}`);
  };


  return (
    <div className="bg-primary/10 shadow-lg hover:scale-103 transition rounded-lg overflow-hidden">
      {/* Image */}
      <div className="h-48 w-full p-3 overflow-hidden">
        <img
          src={food_image}
          alt={food_name}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Card Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{food_name}</h2>

        {/* Donator Info */}
        <div className="flex items-center gap-3">
          <img
            src={donators_image}
            alt={donators_name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-sm text-gray-600">By <span className="font-semibold text-lg">{donators_name}</span></p>
        </div>

        <p className="text-base">
          <span className="font-semibold">Quantity:</span> {food_quantity}
        </p>
        <p className="text-base">
          <span className="font-semibold">Pickup:</span> {pickup_location}
        </p>
        <p className="text-base">
          <span className="font-semibold">Expires:</span> {expire_date}
        </p>

        <button
          onClick={handleViewDetails}
          className="w-full mt-3 btn bg-primary py-5 rounded-md transition cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
