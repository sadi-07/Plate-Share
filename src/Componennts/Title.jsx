import React from 'react';

const Title = ({ level = 1, children, className = "" }) => {
  const Tag = `h${level}`;

  const sizes = {
    1: "text-4xl md:text-5xl font-bold",
    2: "text-3xl md:text-4xl font-semibold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-semibold",
  };

  return (
    <Tag className={`font-poppins ${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Title;
