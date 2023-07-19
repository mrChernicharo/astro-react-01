import { useEffect, useRef, useState } from "react";
import { addDays, addMonths, addYears, getDaysInMonth, isSameDay } from "date-fns";

const btn = "inline-flex items-center rounded-md px-3 pt-1.5 pb-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset";
const highlightBg = "ring-pink-200 bg-pink-400 hover:bg-pink-300 focus-within:bg-pink-300";
const regularBg = "ring-gray-300 bg-white hover:bg-gray-100";

function fullDateFormat(): [Intl.LocalesArgument, Intl.DateTimeFormatOptions] {
  return ["pt-BR", { dateStyle: "full" }];
}

function monthFormat(): [Intl.LocalesArgument, Intl.DateTimeFormatOptions] {
  return ["pt-BR", { month: "long" }];
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const monthDays = getDaysInMonth(selectedDate);
  const startOffset = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const isSameDate = (day: number) =>
    focusedDate && isSameDay(new Date(focusedDate.getFullYear(), focusedDate.getMonth(), day), focusedDate);

  return (
    <div>
      <div>Selected date: {selectedDate.toLocaleDateString(...fullDateFormat())}</div>
      <div>Focused date: {focusedDate && focusedDate.toLocaleDateString(...fullDateFormat())}</div>

      <div>
        <div>
          <button
            className={`${btn} ${regularBg}`}
            onClick={() => {
              const date = addYears(selectedDate, -1);
              setSelectedDate(date);
              focusedDate && setFocusedDate(date);
            }}
          >
            year -
          </button>
          <span>{selectedDate.getFullYear()}</span>
          <button
            className={`${btn} ${regularBg}`}
            onClick={() => {
              const date = addYears(selectedDate, 1);
              setSelectedDate(date);
              focusedDate && setFocusedDate(date);
            }}
          >
            year +
          </button>
        </div>
        <div>
          <button
            className={`${btn} ${regularBg}`}
            onClick={() => {
              const date = addMonths(selectedDate, -1);
              setSelectedDate(date);
              focusedDate && setFocusedDate(date);
            }}
          >
            month -
          </button>
          <span>{selectedDate.toLocaleDateString(...monthFormat())}</span>
          <button
            className={`${btn} ${regularBg}`}
            onClick={() => {
              const date = addMonths(selectedDate, 1);
              setSelectedDate(date);
              focusedDate && setFocusedDate(date);
            }}
          >
            month +
          </button>
        </div>
        <div>
          <button
            className={`${btn} ${regularBg}`}
            onClick={() => {
              const date = addDays(selectedDate, -1);
              setSelectedDate(date);
              focusedDate && setFocusedDate(date);
            }}
          >
            day -
          </button>
          <span>{selectedDate.getDate()}</span>
          <button
            className={`${btn} ${regularBg}`}
            onClick={() => {
              const date = addDays(selectedDate, 1);
              setSelectedDate(date);
              focusedDate && setFocusedDate(date);
            }}
          >
            day +
          </button>
        </div>
      </div>

      <div className="border">
        <ul className="grid grid-cols-7">
          {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((weekday) => (
            <li key={weekday}>{weekday}</li>
          ))}
        </ul>

        <ul className="grid grid-cols-7">
          {Array(startOffset)
            .fill(0)
            .map((_, i) => (
              <li key={`startOffset-${i}`}></li>
            ))}
          {Array(monthDays)
            .fill(0)
            .map((_, i) => {
              const day = i + 1;
              return (
                <li key={day}>
                  <button
                    className={`${btn} ${isSameDate(day) ? highlightBg : regularBg} w-full flex justify-center`}
                    onClick={() => {
                      isSameDate(day)
                        ? setFocusedDate(null)
                        : (() => {
                            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                            setSelectedDate(date);
                            setFocusedDate(date);
                          })();
                    }}
                  >
                    {day}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
