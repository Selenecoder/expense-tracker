import React from 'react';

// Card component to wrap content
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

// CardContent component for content inside the card
export function CardContent({ children, className = '' }) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}
