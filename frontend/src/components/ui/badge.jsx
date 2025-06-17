import React from "react";

const Badge = ({ children, variant = "default" }) => {
  const badgeClasses = {
    default: "bg-gray-200 text-gray-700",
    destructive: "bg-red-500 text-white",
  };

  return (
    <span
      className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${badgeClasses[variant]}`}
    >
      {children}
    </span>
  );
};

export { Badge };
