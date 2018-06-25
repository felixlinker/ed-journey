
import React from 'react';
import { Table } from 'reactstrap';
import keys from 'lodash/keys';
import Rows from './generic/Rows';

class Details extends React.Component {

    render() {
        let details = keys(this.props.event).filter(k => k !== '_state')
            .map(k => [k, this.props.event[k]]);

        let system = this.props.event._state.location.system;
        let systemDetails = keys(system).map(k => [k, system[k]]);

        return (
            <React.Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Rows values={details}/>
                    </tbody>
                </Table>

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
