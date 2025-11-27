import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const FeatureFoods = () => {
    return (
        <div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-center text-primary">Featured Foods</h2>
            
            <div></div>

            <div>
                <Link className="btn hover:scale-104 px-10 py-6" to="availableFoods">Show All<FaArrowRight /> </Link>
            </div>
        </div>
    );
};

export default FeatureFoods;