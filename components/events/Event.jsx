
import React from 'react';

class Event extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.event.timestamp}</td>
                <td>{this.props.event.event}</td>
            </tr>
        );
    }
}

export default Event;
