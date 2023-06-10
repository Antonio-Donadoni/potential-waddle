import React, { useState } from "react";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

const CurrentWeekDays = ({ selectedDay, setSelectedDay }) => {
  const [currentWeek, setCurrentWeek] = useState(moment());
  const previousWeek = () => {
    const previousStartOfWeek = currentWeek.clone().subtract(1, "week");
    setCurrentWeek(previousStartOfWeek);
  };

  const nextWeek = () => {
    const nextStartOfWeek = currentWeek.clone().add(1, "week");
    setCurrentWeek(nextStartOfWeek);
  };

  const startOfCurrentWeek = currentWeek.clone().startOf("week");
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = startOfCurrentWeek.clone().add(i, "days");
    const formattedDay = day.format("D");
    const formattedMonth = day.format("MMMM");

    weekDays.push({
      day: formattedDay,
      weekDays: day.format("ddd"),
      month: formattedMonth,
      fullDate: moment(day).format("YYYY-MM-DD"),
    });
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="flex
     items-center mb-6 w-full md:w-2/3 lg:w-1/2 "
      >
        <ChevronLeft
          onClick={previousWeek}
          className="mr-4 cursor-pointer text-gray-600 hover:text-blue-800"
        ></ChevronLeft>
        <div
          className="flex flex-row w-full justify-around items-center
      "
        >
          {weekDays.map((day) => (
            <DayCard
              key={`${day.day}-${day.month}`}
              day={day}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          ))}
        </div>
        <ChevronRight
          onClick={nextWeek}
          className="ml-4 cursor-pointer  text-gray-600 hover:text-blue-800"
        ></ChevronRight>
      </div>
    </div>
  );
};

export default CurrentWeekDays;

const DayCard = ({ day, selectedDay, setSelectedDay }) => {
  const appuntamenti = useSelector((state) => state.appuntamenti);
  const isSelected = day.fullDate === moment(selectedDay).format("YYYY-MM-DD");

  const dayHasAppuntamenti = appuntamenti.some((appuntamento) =>
    moment(appuntamento.data, "YYYY/MM/DD HH:mm").isSame(day.fullDate, "day")
  );

  return (
    <div
      key={`${day.day}-${day.month}`}
      className={`mr-1 md:mr-2  font-bold text-center rounded-full md:rounded-lg px-1 py-2 md:px-2 md:pb-4 transition duration-300 ease-in-out hover:shadow-lg cursor-pointer relative ${
        isSelected
          ? "bg-blue-800 text-white"
          : dayHasAppuntamenti
          ? " text-gray-600"
          : " text-gray-600"
      }`}
      onClick={() => setSelectedDay(day.fullDate)}
    >
      <div className="text-xs uppercase md:tracking-wider font-semibold">
        {day.weekDays}
      </div>
      <div className="text-lg md:text-xl lg:text-2xl">{day.day}</div>
      <div
        className={`hidden md:block
        text-xs  uppercase md:tracking-wider font-semibold `}
      >
        {day.month}
      </div>
      {!!dayHasAppuntamenti && (
        <div
          className={`absolute bottom-1  right-1/2 transform translate-x-1/2
         ${
           isSelected ? " bg-white" : "bg-blue-800"
         } text-white rounded-full w-2 h-2 flex justify-center items-center text-xs`}
        >
          {/* {
            appuntamenti.filter((appuntamento) =>
              moment(appuntamento.data, "YYYY/MM/DD HH:mm").isSame(
                day.fullDate,
                "day"
              )
            ).length
          } */}
        </div>
      )}
    </div>
  );
};
