import React, { useState } from "react";

import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "reactstrap";

import Switch from "react-bootstrap-switch";

import "./Tools.scss";

export default function Tools(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { sound, notification, setSound, setNotification } = props;

  const handleSound = () => {
    localStorage.setItem("sound", !sound);
    setSound(!sound);
  };

  const handleNotificiation = () => {
    localStorage.setItem("notification", !notification);
    setNotification(!notification);
  };

  return (
    <Dropdown direction="left" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="btn btn-icon btn-round" color="default">
        <i className="tim-icons icon-settings-gear-63" />
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem
          toggle={false}
          className="d-flex align-items-center justify-content-between"
        >
          Sounds
          <Switch value={sound} onChange={handleSound} className="mb-0" />
        </DropdownItem>
        <DropdownItem
          toggle={false}
          className="d-flex align-items-center justify-content-between"
        >
          Notification
          <Switch
            value={notification}
            onChange={handleNotificiation}
            className="mb-0"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
