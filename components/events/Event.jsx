
import React from 'react';

class Event extends React.Component {

    render() {
        return (
            <tr>
                {this.props.columns.map(key =>
                    <td key={key}>{this.props.event[key] || ''}</td>
                )}
            </tr>
        );
    }
}

export default Event;
