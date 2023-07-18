import { useState } from "react";
import { getDaysInMonth } from "date-fns";

function dateOpts(): [Intl.LocalesArgument, Intl.DateTimeFormatOptions] {
  // return ['pt-BR', { dateStyle: 'short' }];
  // return ['pt-BR', { dateStyle: 'medium' }];
  return ["pt-BR", { dateStyle: "long" }];
  // return ['pt-BR', { dateStyle: 'full' }];
}

export default function Calendar() {
  const [focusedYear, setfocusedYear] = useState(new Date().getFullYear());
  const [focusedMonth, setfocusedMonth] = useState(new Date().getMonth());
  const [focusedDay, setfocusedDay] = useState(new Date().getDate());

  const monthDays = getDaysInMonth(new Date(focusedYear, focusedMonth, focusedDay));

  return (
    <div>
      <div>year {focusedYear}</div>
      <div>month {focusedMonth}</div>
      <div>day {focusedDay}</div>

      <div>
        currDate {"--->"} {new Date(focusedYear, focusedMonth, focusedDay).toLocaleDateString(...dateOpts())}
      </div>

      <div>
        <div>
          <button onClick={() => setfocusedYear((prev) => prev - 1)}>year -</button>
          <button onClick={() => setfocusedYear((prev) => prev + 1)}>year +</button>
        </div>
        <div>
          <button
            onClick={() =>
              setfocusedMonth((month) => {
                if (month === 0) {
                  setfocusedYear((year) => year - 1);
                  return 11;
                } else {
                  return month - 1;
                }
              })
            }
          >
            month -
          </button>
          <button
            onClick={() =>
              setfocusedMonth((month) => {
                if (month === 11) {
                  setfocusedYear((year) => year + 1);
                  return 0;
                } else {
                  return month + 1;
                }
              })
            }
          >
            month +
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              setfocusedDay((prev) => {
                if (prev - 1 === 0) {
                  setfocusedMonth((month) => {
                    if (month === 0) {
                      setfocusedYear((year) => year - 1);
                      return 11;
                    } else {
                      return month - 1;
                    }
                  });
                  return getDaysInMonth(new Date(focusedYear, focusedMonth - 1, 1));
                }
                return prev - 1;
              })
            }
          >
            day -
          </button>
          <button
            onClick={() =>
              setfocusedDay((prev) => {
                if (prev + 1 > monthDays) {
                  setfocusedMonth((month) => {
                    if (month === 11) {
                      setfocusedYear((year) => year + 1);
                      return 0;
                    } else {
                      return month + 1;
                    }
                  });
                  return 1;
                }
                return prev + 1;
              })
            }
          >
            day +
          </button>
        </div>
      </div>

      <ul>
        {Array(monthDays)
          .fill(0)
          .map((_, i) => {
            const day = i + 1;
            return <li>{day}</li>;
          })}
      </ul>
    </div>
  );
}
