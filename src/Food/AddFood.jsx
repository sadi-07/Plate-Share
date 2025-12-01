import React, { useContext, useState } from "react";
import { AuthContext } from "../Contetexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const food_quantity = form.food_quantity.value;
    const pickup_location = form.pickup_location.value;
    const expire_date = form.expire_date.value;
    const additional_notes = form.additional_notes.value;

    if (!food_image) {
      toast.error("Please enter a food image URL!");
      setLoading(false);
      return;
    }

    const foodData = {
      food_name,
      food_image,
      food_quantity,
      pickup_location,
      expire_date,
      additional_notes,
      donators_name: user?.displayName,
      donators_email: user?.email,
      donators_image: user?.photoURL,
      food_status: "Available",
      created_at: new Date(),
    };

    try {
      const res = await fetch("https://plate-share-server-blue.vercel.app/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      });

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Food Added Successfully!");
        navigate("/availableFoods");
      }
    } catch (error) {
      toast.error("Failed to add food!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-primary/20 p-8 rounded-lg shadow-md mt-6">
      <h2 className="text-4xl md:text-5xl font-extrabold mt-5 mb-10 text-primary">
        Add New Food</h2>

      <form onSubmit={handleAddFood} className="space-y-4">

        <div>
          <label className="font-semibold">Food Name</label>
          <input
            type="text"
            name="food_name"
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="font-semibold">Food Image URL</label>
          <input
            type="text"
            name="food_image"
            placeholder="Paste food image link"
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="font-semibold">Food Quantity</label>
          <input
            type="text"
            name="food_quantity"
            placeholder="e.g. Serves 2 people"
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="font-semibold">Pickup Location</label>
          <input
            type="text"
            name="pickup_location"
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="font-semibold">Expire Date</label>
          <input
            type="date"
            name="expire_date"
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea
            name="additional_notes"
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;