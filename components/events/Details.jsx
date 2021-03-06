
import React from 'react';
import { Table, ListGroup, ListGroupItem, Popover, Button } from 'reactstrap';
import keys from 'lodash/keys';
import get from 'lodash/get';
import autoBind from 'auto-bind';
import SimpleTable from './generic/SimpleTable';
import representationBuilder from './eventRepresentation/RepresentationBuilder';

import SystemRepr from './stateRepresentation/System';
import BodyRepr from './stateRepresentation/Body';
import StationRepr from './stateRepresentation/Station';
import MinorFactions from './stateRepresentation/MinorFactions';
const SYSTEM = representationBuilder(SystemRepr);
const BODY = representationBuilder(BodyRepr);
const STATION = representationBuilder(StationRepr);

import ApproachBodyRepr from './eventRepresentation/ApproachBody';
import DockedRepr from './eventRepresentation/Docked';
import FSDJumpRepr from './eventRepresentation/FSDJump';
import LeaveBodyRepr from './eventRepresentation/LeaveBody';
import LiftoffRepr from './eventRepresentation/Liftoff';
import TouchdownRepr from './eventRepresentation/Touchdown';
import UndockedRepr from './eventRepresentation/Undocked';
import USSDropRepr from './eventRepresentation/USSDrop';

const REPRESENTATION_MAP = {
    'ApproachBody': representationBuilder(ApproachBodyRepr),
    'Docked': representationBuilder(DockedRepr),
    'FSDJump': representationBuilder(FSDJumpRepr),
    'LeaveBody': representationBuilder(LeaveBodyRepr),
    'Liftoff': representationBuilder(LiftoffRepr),
    'Touchdown': representationBuilder(TouchdownRepr),
    'Undocked': representationBuilder(UndockedRepr),
    'USSDrop': representationBuilder(USSDropRepr),
};
const PASS = () => {};

class Details extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            showSystemInfo: false,
            showBodyInfo: false,
            showStationInfo: false,
            showMfInfo: false,
        }
    }

    toggleSystemInfo() {
        this.setState({
            showSystemInfo: !this.state.showSystemInfo
        });
    }

    toggleBodyInfo() {
        this.setState({
            showBodyInfo: !this.state.showBodyInfo
        });
    }

    toggleStationInfo() {
        this.setState({
            showStationInfo: !this.state.showStationInfo
        });
    }

    toggleMfInfo() {
        this.setState({
            showMfInfo: !this.state.showMfInfo
        });
    }

    render() {
        let event = this.props.event;
        let location = event._state.location;
        let details = (get(REPRESENTATION_MAP, event.event, PASS))(event);

        return (
            <React.Fragment>
                {details && details.length > 0 &&
                    <SimpleTable values={details}/>}

                <ListGroup>
                    <ListGroupItem><h6>Location</h6></ListGroupItem>
                    {location.system.address &&
                        <ListGroupItem>In system
                            <Button id="system-button"
                                onClick={this.toggleSystemInfo}>
                                {location.system.name}
                            </Button>
                            <Popover placement="bottom" target="system-button"
                                isOpen={this.state.showSystemInfo}
                                toggle={this.toggleSystemInfo}>
                                <SimpleTable values={SYSTEM(location.system)}/>
                            </Popover>
                        </ListGroupItem>}
                    {(location.body.id && !location.station.name) &&
                        <ListGroupItem>At body
                            <Button id="body-button"
                                onClick={this.toggleBodyInfo}>
                                {location.body.name}
                            </Button>
                            <Popover placement="bottom" target="body-button"
                                isOpen={this.state.showBodyInfo}
                                toggle={this.toggleBodyInfo}>
                                <SimpleTable values={BODY(location.body)}/>
                            </Popover>
                        </ListGroupItem>}
                    {location.station.name &&
                        <ListGroupItem>At station
                            <Button id="station-button"
                                onClick={this.toggleStationInfo}>
                                {location.station.name}
                            </Button>
                            <Popover placement="bottom" target="station-button"
                                isOpen={this.state.showStationInfo}
                                toggle={this.toggleStationInfo}>
                                <SimpleTable
                                    values={STATION(location.station)}/>
                            </Popover>
                        </ListGroupItem>}
                    {location.factions.length &&
                        <ListGroupItem>
                            <Button id="mf-button"
                                onClick={this.toggleMfInfo}>
                                Show minor factions
                            </Button>
                            <Popover placement="bottom" target="mf-button"
                                isOpen={this.state.showMfInfo}
                                toggle={this.toggleMfInfo}>
                                {/* {JSON.stringify(location.factions)} */}
                                <MinorFactions factions={location.factions}/>
                            </Popover>
                        </ListGroupItem>}
                </ListGroup>
            </React.Fragment>
        );
    }
}

export default Details;
