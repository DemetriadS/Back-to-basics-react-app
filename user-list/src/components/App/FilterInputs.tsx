import React from "react";
import "./FilterInputs.css";
import { FilterProps } from "../../types";

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
