import React from "react";
import {Container} from "reactstrap";

export default function PageHeader(props) {
    return (
        <div className={"page-header header-filter"}>
            <div className={"squares square1"} />
            <div className={"squares square2"} />
            <div className={"squares square3"} />
            <div className={"squares square4"} />
            <div className={"squares square5"} />
            <div className={"squares square6"} />
            <div className={"squares square7"} />
            <Container>
                <div className={"content-center brand"}>{props.children}</div>
            </Container>
        </div>
    );
}
