import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchFood = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://plate-share-server-blue.vercel.app/foods/${id}`);
        if (!res.ok) throw new Error("Failed to load food.");
        const data = await res.json();
        if (mounted) setFood(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load item.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFood();
    return () => { mounted = false; };
  }, [id]);

  useEffect(() => {
    if (!loading && food) {
      const ownerEmail = food.donators_email;
      if (!user || user.email !== ownerEmail) {
        Swal.fire({
          icon: "warning",
          title: "Not allowed",
          text: "You are not allowed to edit this item.",
          confirmButtonText: "Go Back",
        }).then(() => navigate("/myFoods"));
      }
    }
  }, [loading, food, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!food) return;

    if (!food.food_name || !food.food_image || !food.food_quantity || !food.pickup_location || !food.expire_date) {
      toast.error("Please fill required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`https://plate-share-server-blue.vercel.app/foods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          food_name: food.food_name,
          food_image: food.food_image,
          food_quantity: food.food_quantity,
          pickup_location: food.pickup_location,
          expire_date: food.expire_date,
          additional_notes: food.additional_notes || "",
        }),
      });

      const result = await res.json();

      if (res.ok && (result.modifiedCount === 1 || result.acknowledged)) {
        toast.success("Food updated successfully!");
        navigate("/myFoods");
      } else {
        toast.success("Food updated!");
        navigate("/myFoods");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading food details…</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-red-500">Food item not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 bg-linear-to-r from-primary/10 to-transparent">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">
            Update Food
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit the details below and click <span className="font-semibold">Save Changes</span>.
          </p>
        </div>

        <div className="p-6">

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
              <img
                src={food.food_image}
                alt={food.food_name}
                className="w-full h-40 object-cover p-2"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-800">{food.food_name}</h2>
              <p className="text-base text-gray-600 mt-1">Donator: <span className="font-medium">{food.donators_name}</span></p>
              <p className="text-base text-gray-600">{food.donators_email}</p>
              <p className="text-base text-green-600 mt-2">Status: {food.food_status}</p>
            </div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Food Name</label>
              <input
                name="food_name"
                value={food.food_name || ""}
                onChange={handleChange}
                required
                className="mt-2 w-full input input-bordered"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Food Image URL</label>
              <input
                name="food_image"
                value={food.food_image || ""}
                onChange={handleChange}
                required
                className="mt-2 w-full input input-bordered"
              />
              <p className="text-xs text-gray-400 mt-1">Paste an image link (imgbb or hosted URL)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  name="food_quantity"
                  value={food.food_quantity || ""}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full input input-bordered"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                <input
                  name="pickup_location"
                  value={food.pickup_location || ""}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full input input-bordered"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expire Date</label>
                <input
                  type="date"
                  name="expire_date"
                  value={food.expire_date ? food.expire_date.split("T")[0] : ""}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full input input-bordered"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="food_status"
                  value={food.food_status || "Available"}
                  onChange={handleChange}
                  className="mt-2 w-full input input-bordered"
                >
                  <option>Available</option>
                  <option>Claimed</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                name="additional_notes"
                value={food.additional_notes || ""}
                onChange={handleChange}
                className="mt-2 w-full textarea textarea-bordered"
                rows={4}
              />
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary px-6 py-2"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/myFoods")}
                className="btn btn-ghost bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
