import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const details = useLoaderData();
  console.log(details)
 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    donators_name,
    donators_email,
    donators_image,
    food_status,
  } = details || {};

  const handleRequestFood = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to request food.",
      });
      return navigate("/login");
    }

    Swal.fire({
      icon: "success",
      title: "Request Sent!",
      text: "Your food request has been submitted.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 ">

      {/* Card */}
      <div className="bg-primary/20 shadow-xl rounded-xl overflow-hidden border border-gray-200">

        {/* Image */}
        <div className="h-100 w-full overflow-hidden">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-cover p-6 rounded-2xl"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Header */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              {food_name}
            </h2>
            <p className="text-base text-green-600 font-semibold mt-1">
              Status: {food_status}
            </p>
          </div>

          {/* Grid Info */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-700 mb-1">Food Quantity:</h3>
              <p className="text-gray-800">{food_quantity}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-700 mb-1">Pickup Location:</h3>
              <p className="text-gray-800">{pickup_location}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-700 mb-1">Expire Date:</h3>
              <p className="text-gray-800">{expire_date}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-700 mb-1">Additional Notes:</h3>
              <p className="text-gray-800">{additional_notes}</p>
            </div>

          </div>

          {/* Donator Section */}
          <div className="p-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center gap-4 border">
            <img
              src={donators_image}
              alt={donators_name}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{donators_name}</h3>
              <p className="text-gray-600 text-sm">{donators_email}</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleRequestFood}
            className="w-full btn text-white py-6 rounded-lg transition"
          >
            Request Food
          </button>

        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
