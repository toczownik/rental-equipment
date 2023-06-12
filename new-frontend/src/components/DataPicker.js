import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataPicker = ({ label, date, setDate }) => {
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <>
      <h2>{label}</h2>
      <DatePicker
        showTimeSelect
        selected={date}
        onChange={(date) => setDate(date)}
        timeClassName={handleColor}
      />
      {date.toISOString()}
    </>
  );
};

export default DataPicker;
