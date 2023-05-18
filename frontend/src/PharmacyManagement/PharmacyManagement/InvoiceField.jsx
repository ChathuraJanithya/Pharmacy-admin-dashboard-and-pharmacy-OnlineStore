import React from "react";

const InvoiceField = ({ onEditItem, cellData }) => {
  return (
    <input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      defaultValue={cellData.value}
      onChange={onEditItem}
      autoComplete="off"
    />
  );
};

export default InvoiceField;
