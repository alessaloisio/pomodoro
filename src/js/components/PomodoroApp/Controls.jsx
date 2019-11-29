import React, { useEffect, useRef } from "react";

import { Button, Row, Col, InputGroup, Label } from "reactstrap";

export default function Controls(props) {
  const {
    play,
    setPlayTimer,
    startTimer,
    removeTimerInterval,
    resetTimer,
    multiplier,
    setMultiplier,
    addTimerValue,
    subTimerValue,
    sessionShow,
    toggleSession
  } = props;

  const sessionsRef = useRef(null);

  const startButton = () => {
    if (play === null) {
      return (
        <Button
          className="btn-round"
          color="info"
          size="lg"
          onClick={startTimer}
        >
          Start
        </Button>
      );
    } else {
      return (
        <Button
          className="btn-round"
          color="info"
          size="lg"
          onClick={() => {
            removeTimerInterval();
            setPlayTimer(null);
          }}
        >
          Pause
        </Button>
      );
    }
  };

  const incMultiplier = () => {
    setMultiplier(multiplier =>
      multiplier + 1 < 100 ? multiplier + 1 : multiplier
    );
  };

  const decMultiplier = () => {
    setMultiplier(multiplier =>
      multiplier - 1 > 0 ? multiplier - 1 : multiplier
    );
  };

  useEffect(() => {
    const elements = sessionsRef.current.childNodes;

    elements[sessionShow].classList.remove("btn-default");
    elements[sessionShow].classList.add("btn-info");

    elements[+!sessionShow].classList.remove("btn-info");
    elements[+!sessionShow].classList.add("btn-default");
  }, [sessionShow]);

  return (
    <div className="Controls">
      <Row className="mb-5">
        <Col xs={{ size: "4" }}>
          <Label for="exampleSelect">Multiplier</Label>
          <InputGroup>
            <div onClick={incMultiplier} className="input-group-prepend">
              <span className="btn-info input-group-text">+</span>
            </div>
            <div className="form-control">
              <p className="mb-0" key={multiplier}>
                {multiplier}
              </p>
            </div>
            <div onClick={decMultiplier} className="input-group-append">
              <span className="btn-info input-group-text">-</span>
            </div>
          </InputGroup>
        </Col>

        <Col xs={{ size: "4" }}>
          <Label for="exampleSelect">Sessions</Label>
          <div ref={sessionsRef} className="sessionSelection">
            <button
              type="button"
              onClick={() => toggleSession(0)}
              className="btn btn-icon btn-round btn-info"
            >
              <i className="fas fa-briefcase"></i>
            </button>
            <button
              type="button"
              onClick={() => toggleSession(1)}
              className="btn btn-icon btn-round btn-default"
            >
              <i className="fas fa-coffee"></i>
            </button>
          </div>
        </Col>

        <Col xs={{ size: "4" }}>
          <Label for="exampleSelect">Edit</Label>
          <InputGroup>
            <div onClick={addTimerValue} className="input-group-prepend">
              <span className="btn-info input-group-text">+</span>
            </div>
            <div onClick={subTimerValue} className="input-group-append">
              <span className="btn-info input-group-text">-</span>
            </div>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: "6" }}>{startButton()}</Col>
        <Col xs={{ size: "6" }}>
          <Button
            onClick={resetTimer}
            size="lg"
            className="btn-round"
            color="info"
            type="button"
          >
            <i className="fas fa-undo" />
          </Button>
        </Col>
      </Row>
    </div>
  );
}
