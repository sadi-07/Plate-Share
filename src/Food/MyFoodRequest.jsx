import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contetexts/AuthProvider";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadRequests = async () => {
      try {
        const res = await fetch(
          `https://plate-share-server-blue.vercel.app/requests/user/${user.email}`
        );
        const data = await res.json();
        setMyRequests(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h2 className="text-5xl font-bold mb-10 text-primary text-center">My Food Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : myRequests.length === 0 ? (
        <p className="text-gray-600">You have not requested any foods yet.</p>
      ) : (
        <div className="overflow-x-auto bg-primary/10 shadow-md rounded-lg border">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Food</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Donator</th>
              </tr>
            </thead>

            <tbody>
              {myRequests.map((req) => (
                <tr key={req._id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={req.food_image}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{req.food_name}</p>
                      <p className="text-xs text-gray-500">{req.foodId}</p>
                    </div>
                  </td>

                  <td>{req.location}</td>
                  <td>{req.reason}</td>
                  <td>{req.contact}</td>

                  <td>
                    <div>
                      <p className="font-semibold">{req.donators_name}</p>
                      <p className="text-xs text-gray-500">{req.donators_email}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;
