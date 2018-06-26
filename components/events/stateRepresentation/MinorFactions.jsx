
import React from 'react';
import { Table } from 'reactstrap';

let KEYS = ['influence', 'state', 'government'];

export default function(props) {
    return (
        <Table>
            <thead><tr>
                <th></th>
                {props.factions.map(mf =>
                    <th key={mf.name}>{mf.name}</th>)}
            </tr></thead>
            <tbody>
                {KEYS.map(key =>
                    <tr key={key}>
                        <th>{key}</th>
                        {props.factions.map(mf =>
                            <td key={mf.name}>{mf[key]}</td>)}
                    </tr>)}
            </tbody>
        </Table>
    );
}
