
import React from 'react';
import { Table } from 'reactstrap';
import keys from 'lodash/keys';
import get from 'lodash/get';
import Rows from './generic/Rows';
import representationBuilder from './eventRepresentation/RepresentationBuilder';

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

    render() {
        let event = this.props.event;
        let details = (get(REPRESENTATION_MAP, event.event, PASS))(event);

        let system = this.props.event._state.location.system;
        let systemDetails = keys(system).map(k => [k, system[k]]);

        return (
            <React.Fragment>
                {details && details.length > 0 &&
                    <Table>
                        <tbody>
                            <Rows firstIsHead={true} values={details}/>
                        </tbody>
                    </Table>}

                <Table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Rows values={systemDetails}/>
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default Details;
