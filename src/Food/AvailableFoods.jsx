import React from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from './FoodCard';

const AvailableFoods = () => {
    const foods = useLoaderData();
    console.log(foods);

    return (
        <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-5 mb-10">
                Available Foods <span className='text-3xl text-primary'>({foods.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map(item => (
                    <FoodCard key={item._id} food={item} />
                ))}
            </div>

        </div>
    );
};

export default AvailableFoods;