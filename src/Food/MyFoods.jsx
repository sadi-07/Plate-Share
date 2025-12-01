import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contetexts/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`https://plate-share-server-blue.vercel.app/myFoods/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyFoods(data);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-blue.vercel.app/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Food item removed.", "success");
              setMyFoods(myFoods.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-xl font-semibold text-gray-600">Loading your foods...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-10">
      <h2 className="text-5xl font-bold text-primary mb-10 text-center">
        Manage My Foods
      </h2>

      {myFoods.length === 0 && (
        <p className="text-lg text-center text-gray-500">
          You haven't added any foods yet.
        </p>
      )}

      
      <div className="bg-white shadow-lg rounded-xl">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-700">Image</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Food Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Quantity</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Expire Date</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-primary/5">
              {myFoods.map((food) => (
                <tr
                  key={food._id}
                  className=" hover:bg-gray-200 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={food.food_image}
                      className="w-16 h-16 rounded-lg object-cover border"
                      alt={food.food_name}
                    />
                  </td>

                  <td className="py-3 px-4 text-gray-800 font-semibold">
                    {food.food_name}
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {food.food_quantity}
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {food.expire_date}
                  </td>

                  <td className="py-3 px-4 flex gap-3 mt-3">
                    <Link
                      to={`/updateFood/${food._id}`}
                      className="bg-primary text-white px-3 py-2 rounded-md text-base font-semibold transition"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-md text-base font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
