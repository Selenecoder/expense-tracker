import React from "react";

const Table = ({ children }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100">
          {children[0]} {/* Column headers */}
        </tr>
      </thead>
      <tbody>{children[1]}</tbody> {/* Table rows */}
    </table>
  );
};

export default Table;
