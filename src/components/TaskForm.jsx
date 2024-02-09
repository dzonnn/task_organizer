import "./TaskForm.css";
import { useEffect, useState } from "react";

//set curreny time
const currentDay = new Date().getDay();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const TaskForm = () => {
  //state
  const [date, setDate] = useState();
  const [day, setDay] = useState(currentDay);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [dateFormat, setDateFormat] = useState(true);
  //set range of imput
  const numbersDays = Array.from({ length: 31 }, (_, index) => index + 1);
  const numbersMonth = Array.from({ length: 12 }, (_, index) => index + 1);
  const numberYears = Array.from(
    { length: 3 },
    (_, index) => currentYear + index
  );
  //testing if date is valid
  const testDate = (testedYear, testedMonth, testedDay) => {
    let testedDate = new Date(testedYear, testedMonth - 1, testedDay);
    let isValid =
      testedDate.getFullYear() === testedYear &&
      testedDate.getMonth() === testedMonth - 1 &&
      testedDate.getDate() === testedDay;
    return isValid;
  };
  //handle function
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDate = (newDate) => {
    const parsedDate = new Date(newDate);
    const newYear = parsedDate.getFullYear();
    const newMonth = parsedDate.getMonth();
    const newDay = parsedDate.getDate();
    setYear(newYear);
    setMonth(newMonth);
    setDay(newDay);
  };
  //test date on state change
  useEffect(() => {
    const isValid = testDate(year, month, day);
    if (isValid) {
      setDateFormat(true);
    } else {
      setDateFormat(false);
    }
    console.log("date is valid: " + isValid);
  }, [year, month, day]);
  ////
  return (
    <form onSubmit={handleSubmit} className="TaskForm">
      {/*Date Input***********************************/}
      <input
        type="date"
        style={{ width: "20px" }}
        onChange={(e) => handleDate(e.target.value)}
      />
      <label htmlFor="day">Day</label>
      <select
        name="day"
        id="day"
        value={day}
        onChange={(e) => {
          setDay(Number(e.target.value)); //!typeof e.targe.value === string
        }}
      >
        {numbersDays.map((number) => (
          <option
            key={number}
            value={number}
            disabled={number > 28 && !testDate(year, month, number)}
          >
            {number}
          </option>
        ))}
      </select>
      <label htmlFor="month">Month</label>
      <select
        name="month"
        id="month"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))} //!typeof e.targe.value === string
      >
        {numbersMonth.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <label htmlFor="year">Year</label>
      <select
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))} //!typeof e.targe.value === string
      >
        {numberYears.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <div className={dateFormat ? "date-format-success" : "date-format-error"}>
        {" "}
        wrong date format
      </div>
      {/*********************************************/}
      <button type="submit">submit</button>
    </form>
  );
};
export default TaskForm;
