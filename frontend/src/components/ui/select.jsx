// src/components/ui/select.jsx

import React from "react";

export function Select({ children, ...props }) {
  return (
    <select {...props} className="border rounded px-3 py-2">
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
