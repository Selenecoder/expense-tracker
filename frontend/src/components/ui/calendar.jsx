import React, { useState } from "react";

const Calendar = ({ className, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper function to get the days of the week
  const getWeekDays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays;
  };

  // Helper function to get the first day of the month
  const getFirstDayOfMonth = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDay.getDay();
  };

  // Helper function to get the number of days in the current month
  const getDaysInMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  };

  // Helper function to handle next and previous month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Render the days of the month
  const renderDays = () => {
    const days = [];
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="calendar-day"
          onClick={() => onDateSelect && onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`calendar ${className}`}>
      <div className="calendar-header">
        <button className="calendar-nav" onClick={() => changeMonth(-1)}>
          &lt;
        </button>
        <span className="calendar-month-year">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </span>
        <button className="calendar-nav" onClick={() => changeMonth(1)}>
          &gt;
        </button>
      </div>
      <div className="calendar-body">
        <div className="calendar-weekdays">
          {getWeekDays().map((day, index) => (
            <div key={index} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">{renderDays()}</div>
      </div>
    </div>
  );
};

export default Calendar;
