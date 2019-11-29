import React, {useState, useEffect} from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

import "./pomodoro-app.scss";

import Tools from "./tools";
import Clock from "./clock";
import Controls from "./controls";
import Sound from "./sound";

import alarm from "./alarm.mp3";

let intervalTimer = null;

const timeSound = 3000;
const audio = new Audio(alarm);

const controlsValueEdit = 300;
const defaultValue = {
    work: 1500,
    break: 300,
};
const lengthTimerSession = Object.keys(defaultValue).length;
const defaultMultiplier = 2;

export default function PomodoroApp() {
    // Sound
    const [playingSound, setPlayingSound] = Sound(audio);

    // Tools
    const localSound = JSON.parse(localStorage.getItem("sound"));
    const localNotification = JSON.parse(localStorage.getItem("notification"));

    const [sound, setSound] = useState(localSound !== null ? localSound : true);
    const [notification, setNotification] = useState(
        localNotification !== null ? localNotification : true,
    );

    // Timer States
    const [multiplier, setMultiplier] = useState(defaultMultiplier);

    const [sequence, setSequence] = useState(lengthTimerSession); // nb sequence (work/break)

    const [playTimer, setPlayTimer] = useState(null); // Which timer dec
    const [sessionShow, setSessionShow] = useState(0); // Toggle Visible

    const [timer, setTimer] = useState(defaultValue);

    /**
     * Timer FUNCTIONS
     */
    const startTimer = () => {
        setPlayTimer(lengthTimerSession - sequence);
    };

    useEffect(() => {
        // Decrement timer
        const decTimer = () =>
            setTimer(timer => {
                const newTimer = {...timer};
                const key = Object.keys(newTimer)[playTimer];
                newTimer[key] = newTimer[key] - 1;
                return newTimer;
            });

        if (playTimer !== null) {
            // Init setInterval
            if (intervalTimer === null) {
                intervalTimer = setInterval(() => decTimer(), 1000);
            }

            // Manage End
            const nameSession = Object.keys(timer)[playTimer];

            if (timer[nameSession] === 0) {
                setPlayTimer(playTimer => playTimer + 1);
                setSequence(sequence => sequence - 1);

                if (sequence - 1 === 0) {
                    setTimer(defaultValue);
                    setSequence(lengthTimerSession);
                    toggleSession(0);

                    if (multiplier - 1 > 0) {
                        setPlayTimer(0);
                        setMultiplier(multiplier => multiplier - 1);
                    } else {
                        setPlayTimer(null);
                        setMultiplier(defaultMultiplier);
                    }
                } else {
                    toggleSession(playTimer + 1);
                }

                removeTimerInterval();

                // Sound
                if (!playingSound && sound) {
                    setPlayingSound(); // enable
                    setTimeout(() => setPlayingSound(), timeSound); //disable after x imer
                }

                // Notification
            }
        }
    }, [
        playTimer,
        timer,
        multiplier,
        playingSound,
        sequence,
        setPlayingSound,
        sound,
    ]);

    const removeTimerInterval = () => {
        clearInterval(intervalTimer);
        intervalTimer = null;
    };

    const addTimerValue = () => {
        setTimer(timer => {
            const newTimer = {...timer};
            const key = Object.keys(newTimer)[sessionShow];

            newTimer[key] =
                newTimer[key] + controlsValueEdit <= 86400
                    ? newTimer[key] + controlsValueEdit
                    : (newTimer[key] = controlsValueEdit);

            return newTimer;
        });
    };

    const subTimerValue = () => {
        setTimer(timer => {
            const newTimer = {...timer};
            const key = Object.keys(newTimer)[sessionShow];

            newTimer[key] =
                newTimer[key] - controlsValueEdit > 0
                    ? newTimer[key] - controlsValueEdit
                    : (newTimer[key] = 86400);

            return newTimer;
        });
    };

    const resetTimer = () => {
        clearInterval(intervalTimer);
        intervalTimer = null;
        setPlayTimer(null);
        setSequence(lengthTimerSession);
        setTimer(defaultValue);
    };

    // Toggle Session
    const toggleSession = n => setSessionShow(n);

    return (
        <Row
            id="PomodoroApp"
            className="row-grid justify-content-between align-items-center">
            <Col>
                <Card className="card-register">
                    <CardHeader style={divCardHeader}>
                        <CardTitle
                            style={divCardTitle}
                            className="text-center"
                            tag="h4">
                            {Object.keys(timer)[playTimer || 0]}
                        </CardTitle>
                        <Tools
                            sound={sound}
                            setSound={setSound}
                            notification={notification}
                            setNotification={setNotification}
                        />
                    </CardHeader>
                    <CardBody>
                        <Clock
                            className="red"
                            sessionShow={sessionShow}
                            timer={timer}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Controls
                            play={playTimer}
                            setPlayTimer={setPlayTimer}
                            startTimer={startTimer}
                            removeTimerInterval={removeTimerInterval}
                            resetTimer={resetTimer}
                            multiplier={multiplier}
                            setMultiplier={setMultiplier}
                            addTimerValue={addTimerValue}
                            subTimerValue={subTimerValue}
                            sessionShow={sessionShow}
                            toggleSession={toggleSession}
                        />
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    );
}

const divCardHeader = {paddingBottom: "30px"};
const divCardTitle = {
    color: "#fff",
    margin: "0",
    paddingTop: "50px",
};
