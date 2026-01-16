import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import FoodCard from "./FoodCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const AvailableFoods = () => {
    const foods = useLoaderData();

    // 🔹 States
    const [search, setSearch] = useState("");
    const [sortQty, setSortQty] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // 🔹 Search + Filter + Sort
    const processedFoods = useMemo(() => {
        let data = [...foods];

        // 🔍 Search by food name
        if (search) {
            data = data.filter(food =>
                food.food_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 📅 Expiry date range filter
        if (fromDate) {
            data = data.filter(
                food => new Date(food.expire_date) >= new Date(fromDate)
            );
        }

        if (toDate) {
            data = data.filter(
                food => new Date(food.expire_date) <= new Date(toDate)
            );
        }

        // 🔃 Sort by quantity
        if (sortQty === "asc") {
            data.sort((a, b) => a.food_quantity - b.food_quantity);
        }

        if (sortQty === "desc") {
            data.sort((a, b) => b.food_quantity - a.food_quantity);
        }

        return data;
    }, [foods, search, fromDate, toDate, sortQty]);

    // 🔢 Pagination
    const totalPages = Math.ceil(processedFoods.length / ITEMS_PER_PAGE);
    const paginatedFoods = processedFoods.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold mt-5 mb-10">
                Available Foods{" "}
                <span className="text-3xl text-primary">
                    ({processedFoods.length})
                </span>
            </h2>

            {/* 🔧 Controls */}
            <div className="flex flex-wrap gap-4 mb-10 items-center bg-base-200 p-4 rounded-lg shadow">

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-2 text-primary" size={22} />
                    <input
                        type="text"
                        placeholder="Search food..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="input input-bordered ml-12 w-100"
                    />
                </div>

                {/* Sort */}
                <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-2 text-primary" size={22} />
                    <select
                        value={sortQty}
                        onChange={(e) => setSortQty(e.target.value)}
                        className="select select-bordered ml-12 w-52"
                    >
                        <option value="">Sort by Quantity</option>
                        <option value="asc">Low → High</option>
                        <option value="desc">High → Low</option>
                    </select>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="text-primary" size={40} />

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => {
                            setFromDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="input input-bordered"
                    />

                    <span className="font-semibold">to</span>

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => {
                            setToDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="input input-bordered"
                    />
                </div>
            </div>

            {/* Cards */}
            {paginatedFoods.length === 0 ? (
                <p className="text-center text-gray-500 mt-20">
                    No foods match your criteria.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedFoods.map(item => (
                        <FoodCard key={item._id} food={item} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">

                    {/* Prev */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-lg bg-secondary"
                    >
                        Prev
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages).keys()].map(num => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num + 1)}
                            className={`btn btn-lg ${currentPage === num + 1 ? "btn-primary" : "btn-secondary"
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() =>
                            setCurrentPage(prev => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="btn btn-lg btn-secondary"
                        
                    >
                        Next
                    </button>

                </div>
            )}

        </div>
    );
};

export default AvailableFoods;
