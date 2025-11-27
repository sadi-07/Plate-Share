import React from 'react';

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
}) => {
    const base =
        "font-inter px-5 py-2 rounded-lg font-medium transition duration-200";

    const variants = {
        primary: "bg-[#247DC2] text-white",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600",
        outline:
            "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
