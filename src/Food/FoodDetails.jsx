import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const details = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const {
    _id,
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

    if (user.email === donators_email) {
      Swal.fire({
        icon: "error",
        title: "You cannot request your own food!",
      });
      return;
    }
    setShowModal(true);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    const form = e.target;
    const location = form.location.value;
    const reason = form.reason.value;
    const contact = form.contact.value;

    const requestData = {
      foodId: _id,
      food_name,
      requester_email: user.email,
      requester_name: user.displayName,
      requester_photo: user.photoURL,
      location,
      reason,
      contact,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://plate-share-server-blue.vercel.app/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) throw new Error("Request failed");

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: "Your food request has been submitted.",
      });

      setShowModal(false);
      form.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong.",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <div className="bg-primary/20 shadow-xl rounded-xl overflow-hidden border border-gray-200">

        <div className="h-100 w-full overflow-hidden">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-cover p-6 rounded-2xl"
          />
        </div>

        <div className="p-6 space-y-6">

          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              {food_name}
            </h2>
            <p className="text-base text-green-600 font-semibold mt-1">
              Status: {food_status}
            </p>
          </div>

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

          <div className="p-5 bg-linear-to-r from-gray-100 to-gray-200 rounded-xl flex items-center gap-4 border">
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

          <button
            onClick={handleRequestFood}
            className="w-full btn text-white py-6 rounded-lg transition"
          >
            Request Food
          </button>

        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-4">Request Food</h2>

            <form onSubmit={handleSubmitRequest} className="space-y-4">

              <div>
                <label className="font-semibold">Your Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="font-semibold">Why do you need this food?</label>
                <textarea
                  name="reason"
                  required
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div>
                <label className="font-semibold">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FoodDetails;
