
import React from 'react';
import { Table } from 'reactstrap';
import Rows from './Rows';

export default function(props) {
    return (
        <Table>
            <tbody>
                <Rows firstIsHead={true} values={props.values}/>
            </tbody>
        </Table>
    );
};
