
import React from 'react';
import Logs from './events/Logs';
import { Container, Row, Col, Nav, Navbar, NavbarBrand, NavItem, NavLink,
    TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import autoBind from 'auto-bind';
import Details from './events/Details';

const DEFAULT_SAVE_DIR = require('path').join(
    require('os').homedir(),
    'Saved Games',
    'Frontier Developments',
    'Elite Dangerous'
);

class App extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.logs = (<Logs saveDir={DEFAULT_SAVE_DIR}
            onDetails={this.displayDetails}/>);

        this.state = {
            details: null,
        };
    }

    displayDetails(event) {
        this.setState({
            details: event,
        });
    }

    render() {
        return (
            <div>
                <Navbar>
                    <NavbarBrand>ed-journey</NavbarBrand>
                </Navbar>

                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: true })}>
                            Journey
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: false })}>
                            Map
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab="1">
                    <TabPane tabId="1">
                        <Container>
                            <Row>
                                <Col>{this.logs}</Col>
                                <Col xs="3">
                                    <Row><Nav><h5>Details</h5></Nav></Row>
                                    <Row>
                                        {this.state.details &&
                                            <Details
                                                event={this.state.details}/>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </TabPane>

                    <TabPane tabId="2">
                        {/* TODO: add map */}
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default App;
