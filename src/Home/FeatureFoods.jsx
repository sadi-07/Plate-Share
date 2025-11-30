import React, { useEffect, useState, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Contetexts/AuthProvider";

const FeatureFoods = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let cancelled = false;

        const fetchFeatured = async () => {
            try {
                setLoading(true);
                setErr(null);
                const res = await fetch("http://localhost:3000/featuredFoods");
                if (!res.ok) throw new Error("Failed to fetch featured foods");
                const data = await res.json();
                if (!cancelled) setItems(data);
            } catch (e) {
                console.error(e);
                if (!cancelled) setErr(e.message || "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchFeatured();
        return () => { cancelled = true; };
    }, []);

    

    const handleViewDetails = (id) => {
    if (!user) {
        navigate("/login", { state: { from: `/foods/${id}` } });
        return;
    }
    navigate(`/foods/${id}`);
};

    

    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary">Featured Foods</h2>

                </div>

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <p className="text-gray-500">Loading featured foods…</p>
                    </div>
                )}

                {err && (
                    <div className="text-center text-red-500">
                        <p>Failed to load featured foods: {err}</p>
                    </div>
                )}

                {!loading && !err && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((food) => (
                            <article key={food._id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                                <div className="h-44 w-full overflow-hidden">
                                    <img src={food.food_image} alt={food.food_name} className="w-full h-full object-cover" />
                                </div>

                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{food.food_name}</h3>

                                    <div className="flex items-center gap-3">
                                        <img src={food.donators_image} alt={food.donators_name} className="w-9 h-9 rounded-full object-cover border" />
                                        <div>
                                            <p className="text-sm text-gray-600">By <span className="font-medium text-gray-800">{food.donators_name}</span></p>
                                            <p className="text-xs text-gray-400">{food.donators_email}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-700"><span className="font-semibold">Qty:</span> {food.food_quantity}</p>
                                    <p className="text-sm text-gray-700"><span className="font-semibold">Pickup:</span> {food.pickup_location}</p>
                                    <p className="text-sm text-gray-700"><span className="font-semibold">Expires:</span> {food.expire_date}</p>

                                    <div className="mt-3">
                                        <button
                                            onClick={() => handleViewDetails(food._id)}
                                            className="w-full btn py-2 rounded-md font-semibold"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <div className="text-center max-w-54 mx-auto">
                <Link className="btn px-6 py-6 flex items-center gap-2" to="/availableFoods">
                    Show All <FaArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default FeatureFoods;



