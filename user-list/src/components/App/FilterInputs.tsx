import React from "react";
import "./FilterInputs.css";
import { FilterProps } from "../../types";
import {
  PLACEHOLDER_TEXTS,
  FILTER_PLACEHOLDERS,
  GENDER_LABEL,
  GENDER_OPTIONS,
} from "../../utils/constants.ts";

const Filters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const handleAgeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value === "" || /^[0-9]*$/.test(value)) {
      onFilterChange({ target: { name, value } });
    }
  };

  return (
    <div className="filters">
      {Object.entries(filters)
        .filter(([key]) => !["age", "gender"].includes(key))
        .map(([key, value]) => (
          <input
            key={key}
            type="text"
            name={key}
            value={value}
            onChange={onFilterChange}
            placeholder={
              FILTER_PLACEHOLDERS[key as keyof typeof FILTER_PLACEHOLDERS]
            }
          />
        ))}

      <input
        data-testid="age-input"
        type="number"
        name="age"
        value={filters.age}
        onChange={handleAgeInputChange}
        placeholder={PLACEHOLDER_TEXTS.age}
        min="0"
      />

      <div className="filter-gender">
        <label data-testid="gender-label">{GENDER_LABEL}</label>
        <select
          id="gender"
          name="gender"
          data-testid="gender-select"
          value={filters.gender}
          onChange={onFilterChange}
        >
          {GENDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
