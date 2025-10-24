
import React from 'react';

export const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.512 2.086a.75.75 0 00-1.024 0L6.112 7.238c-1.132 1.253-1.61 2.92-1.428 4.581.182 1.662.953 3.193 2.294 4.29l4.396 3.623a.75.75 0 001.048-.001l4.392-3.622c1.34-1.097 2.112-2.628 2.294-4.29.182-1.66-.296-3.328-1.428-4.581L12.512 2.086z"
      clipRule="evenodd"
    />
  </svg>
);

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={`animate-spin ${className}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
        <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
        ></circle>
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);
