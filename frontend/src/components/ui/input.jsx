import React from "react";

// The Input component accepts all the standard input props (e.g., value, onChange)
const Input = ({ type = "text", value, onChange, placeholder, className, ...rest }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded-md px-4 py-2 text-sm w-full ${className}`} 
      {...rest} // Spread any additional props passed to the component (e.g., style)
    />
  );
};

export { Input };
