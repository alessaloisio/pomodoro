import React, { useEffect, useRef } from "react";

import "./Clock.css";

export default function Clock(props) {
  const { sessionShow, timer } = props;

  // Manage Week Days
  const weekdaysEl = useRef(null);

  useEffect(() => {
    const currentDay = new Date().getDay() - 1;
    const weekElement = weekdaysEl.current.children[currentDay];
    weekElement.classList.add("active");
  }, []);

  // FORMATER
  const digitsEl = useRef(null);

  const twoDigit = value => (value < 10 ? "0" : "") + value;

  const formatTimer = timer => {
    const h = twoDigit(Math.floor(timer / 3600));
    const m = twoDigit(Math.floor((timer % 3600) / 60));
    const s = twoDigit(timer % 60);

    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    // Convert seconds to DIGITS format
    let strTimer = "";

    let currentTimer = Object.values(timer)[sessionShow];

    if (currentTimer > 0) strTimer = formatTimer(currentTimer);
    else {
      strTimer = "00:00:00";
    }

    // Update the title page
    document.title = strTimer + " | Pomodoro";

    // Update classes on digitsEl
    strTimer.split("").map((char, i) => {
      const digit = parseInt(char);
      if (Number.isInteger(digit)) {
        const element = digitsEl.current.children[i];
        element.setAttribute("class", classDigit[digit]);
      }
      return true;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, sessionShow]);

  return (
    <div id="clock">
      <div className="display">
        <div ref={weekdaysEl} className="weekdays">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
          <span>SUN</span>
        </div>

        <div
          ref={digitsEl}
          className="digits d-flex mt-1 justify-content-center"
        >
          <div className="zero">
            <span className="d1"></span>
            <span className="d2"></span>
            <span className="d3"></span>
            <span className="d4"></span>
            <span className="d5"></span>
            <span className="d6"></span>
            <span className="d7"></span>
          </div>
          <div className="zero">
            <span className="d1"></span>
            <span className="d2"></span>
            <span className="d3"></span>
            <span className="d4"></span>
            <span className="d5"></span>
            <span className="d6"></span>
            <span className="d7"></span>
          </div>
          <div className="dots"></div>
          <div className="zero">
            <span className="d1"></span>
            <span className="d2"></span>
            <span className="d3"></span>
            <span className="d4"></span>
            <span className="d5"></span>
            <span className="d6"></span>
            <span className="d7"></span>
          </div>
          <div className="zero">
            <span className="d1"></span>
            <span className="d2"></span>
            <span className="d3"></span>
            <span className="d4"></span>
            <span className="d5"></span>
            <span className="d6"></span>
            <span className="d7"></span>
          </div>
          <div className="dots"></div>
          <div className="zero">
            <span className="d1"></span>
            <span className="d2"></span>
            <span className="d3"></span>
            <span className="d4"></span>
            <span className="d5"></span>
            <span className="d6"></span>
            <span className="d7"></span>
          </div>
          <div className="zero">
            <span className="d1"></span>
            <span className="d2"></span>
            <span className="d3"></span>
            <span className="d4"></span>
            <span className="d5"></span>
            <span className="d6"></span>
            <span className="d7"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const classDigit = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];
