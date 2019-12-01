import React, {useEffect, useRef} from "react";

import "./clock.css";

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
    "nine",
];

export default function Clock(props) {
    const {sessionShow, timer} = props;

    // Manage Week Days
    const weekdaysEl = useRef(null);

    useEffect(() => {
        let currentDay = new Date().getDay() - 1;

        if (currentDay < 0) {
            currentDay = 6; // sunday
        }

        const weekElement = weekdaysEl.current.children[currentDay];
        weekElement.classList.add("active");
    }, []);

    // FORMATER
    const digitsEl = useRef(null);

    const twoDigit = value => (value < 10 ? "0" : "") + value;

    const formatTimer = time => {
        const h = twoDigit(Math.floor(time / 3600));
        const m = twoDigit(Math.floor((time % 3600) / 60));
        const s = twoDigit(time % 60);

        return `${h}:${m}:${s}`;
    };

    useEffect(() => {
        // Convert seconds to DIGITS format
        let strTimer = "";

        const currentTimer = Object.values(timer)[sessionShow];

        if (currentTimer > 0) {
            strTimer = formatTimer(currentTimer);
        } else {
            strTimer = "00:00:00";
        }

        // Update the title page
        document.title = `${strTimer} | Pomodoro`;

        // Update classes on digitsEl
        strTimer.split("").map((char, i) => {
            const digit = parseInt(char);
            if (Number.isInteger(digit)) {
                const element = digitsEl.current.children[i];
                element.setAttribute("class", classDigit[digit]);
            }
            return true;
        });
    }, [timer, sessionShow]);

    return (
        <div id={"clock"}>
            <div className={"display"}>
                <div ref={weekdaysEl} className={"weekdays"}>
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
                    className={"digits d-flex mt-1 justify-content-center"}>
                    <div className={"zero"}>
                        <span className={"d1"} />
                        <span className={"d2"} />
                        <span className={"d3"} />
                        <span className={"d4"} />
                        <span className={"d5"} />
                        <span className={"d6"} />
                        <span className={"d7"} />
                    </div>
                    <div className={"zero"}>
                        <span className={"d1"} />
                        <span className={"d2"} />
                        <span className={"d3"} />
                        <span className={"d4"} />
                        <span className={"d5"} />
                        <span className={"d6"} />
                        <span className={"d7"} />
                    </div>
                    <div className={"dots"} />
                    <div className={"zero"}>
                        <span className={"d1"} />
                        <span className={"d2"} />
                        <span className={"d3"} />
                        <span className={"d4"} />
                        <span className={"d5"} />
                        <span className={"d6"} />
                        <span className={"d7"} />
                    </div>
                    <div className={"zero"}>
                        <span className={"d1"} />
                        <span className={"d2"} />
                        <span className={"d3"} />
                        <span className={"d4"} />
                        <span className={"d5"} />
                        <span className={"d6"} />
                        <span className={"d7"} />
                    </div>
                    <div className={"dots"} />
                    <div className={"zero"}>
                        <span className={"d1"} />
                        <span className={"d2"} />
                        <span className={"d3"} />
                        <span className={"d4"} />
                        <span className={"d5"} />
                        <span className={"d6"} />
                        <span className={"d7"} />
                    </div>
                    <div className={"zero"}>
                        <span className={"d1"} />
                        <span className={"d2"} />
                        <span className={"d3"} />
                        <span className={"d4"} />
                        <span className={"d5"} />
                        <span className={"d6"} />
                        <span className={"d7"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
