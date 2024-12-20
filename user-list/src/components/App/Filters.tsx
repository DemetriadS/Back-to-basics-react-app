import React from "react";

interface FilterProps {
  filters: { [key: string]: string };
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="filters">
      {Object.entries(filters).map(([key, value]) => (
        <input
          key={key}
          type={key === "age" ? "number" : "text"}
          name={key}
          value={value}
          onChange={onFilterChange}
          placeholder={`Filter by ${key}`}
        />
      ))}
    </div>
  );
};

export default Filters;
