import React from "react";

import IndexNavbar from "../components/Navbars/index-navbar.jsx";
import PageHeader from "../components/PageHeader/page-header.jsx";
import TimerSection from "../components/PomodoroApp/pomodoro-app.jsx";

class Index extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("index-page");
    }
    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }
    render() {
        return (
            <React.Fragment>
                <IndexNavbar />
                <div className="wrapper">
                    <PageHeader>
                        <TimerSection />
                    </PageHeader>
                </div>
            </React.Fragment>
        );
    }
}

export default Index;
