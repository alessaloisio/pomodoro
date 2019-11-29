import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";

class ComponentsNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent",
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.changeColor);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
    }

    handleToggleCollapse() {
        document.documentElement.classList.toggle("nav-open");
        this.setState(prevState => ({
            collapseOpen: !prevState.collapseOpen,
        }));
    }

    handleCollapseExiting() {
        this.setState({
            collapseOut: "collapsing-out",
        });
    }
    handleCollapseExited() {
        this.setState({
            collapseOut: "",
        });
    }
    render() {
        return (
            <Navbar
                className={`fixed-top ${this.state.color}`}
                color-on-scroll={"100"}
                expand={"lg"}>
                <Container>
                    <div className={"navbar-translate"}>
                        <NavbarBrand
                            data-placement={"bottom"}
                            to={"/"}
                            rel={"noopener noreferrer"}
                            title={"React Pomodoro App"}
                            tag={Link}>
                            <span>{"Pomodoro"}</span>
                        </NavbarBrand>
                        <button
                            type={"button"}
                            aria-expanded={this.state.collapseOpen}
                            className={"navbar-toggler navbar-toggler"}
                            onClick={() => this.handleToggleCollapse()}>
                            <span className={"navbar-toggler-bar bar1"} />
                            <span className={"navbar-toggler-bar bar2"} />
                            <span className={"navbar-toggler-bar bar3"} />
                        </button>
                    </div>
                    <Collapse
                        className={`justify-content-end ${this.state.collapseOut}`}
                        navbar
                        isOpen={this.state.collapseOpen}
                        onExiting={() => this.handleCollapseExiting()}
                        onExited={() => this.handleCollapseExited()}>
                        <div className={"navbar-collapse-header"}>
                            <Row>
                                <Col className={"collapse-brand"} xs={"6"}>
                                    <a onClick={e => e.preventDefault()}>
                                        {"Pomodoro"}
                                    </a>
                                </Col>
                                <Col
                                    className={"collapse-close text-right"}
                                    xs={"6"}>
                                    <button
                                        type={"button"}
                                        aria-expanded={this.state.collapseOpen}
                                        className={"navbar-toggler"}
                                        onClick={() =>
                                            this.handleToggleCollapse()
                                        }>
                                        <i
                                            className={
                                                "tim-icons icon-simple-remove"
                                            }
                                        />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color={"default"}
                                    data-toggle={"dropdown"}
                                    href={"#pablo"}
                                    nav
                                    onClick={e => e.preventDefault()}>
                                    <i
                                        className={
                                            "fa fa-cogs d-lg-none d-xl-none"
                                        }
                                    />
                                    {"Pages"}
                                </DropdownToggle>
                                <DropdownMenu className={"dropdown-with-icons"}>
                                    <DropdownItem tag={Link} to={"/components"}>
                                        <i className={"tim-icons icon-paper"} />
                                        {"Components"}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem className={"p-0"}>
                                <NavLink
                                    data-placement={"bottom"}
                                    href={"https://aloisio.work"}
                                    rel={"noopener noreferrer"}
                                    target={"_blank"}
                                    title={"Contact me"}>
                                    <i className={"fas fa-globe"} />
                                    <p className={"d-lg-none d-xl-none"}>
                                        {"My website"}
                                    </p>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"p-0"}>
                                <NavLink
                                    data-placement={"bottom"}
                                    href={"https://github.com/alessaloisio"}
                                    rel={"noopener noreferrer"}
                                    target={"_blank"}
                                    title={"Follow me on Github"}>
                                    <i className={"fab fa-github"} />
                                    <p className={"d-lg-none d-xl-none"}>
                                        {"Github"}
                                    </p>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default ComponentsNavbar;
