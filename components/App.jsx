
import React from 'react';
import Logs from './events/Logs';
import { Container, Row, Col, Nav, Navbar, NavbarBrand, NavItem, NavLink,
    TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import autoBind from 'auto-bind';

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

        this.logs = (<Logs saveDir={DEFAULT_SAVE_DIR}/>);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Navbar><NavbarBrand>ed-journey</NavbarBrand></Navbar>
                </Row>

                <Row>
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
                </Row>

                <TabContent activeTab="1">
                    <TabPane tabId="1">
                        {this.logs}
                    </TabPane>

                    <TabPane tabId="2">
                        {/* TODO: add map */}
                    </TabPane>
                </TabContent>
            </Container>
        );
    }
}

export default App;
