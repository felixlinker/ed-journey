
import React from 'react';

class Rows extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.values.map(row =>
                    <tr key={row[0]}>
                        {row.map(cell =>
                            <td key={cell}>{cell}</td>
                        )}
                    </tr>
                )}
            </React.Fragment>
        )
    }
}

export default Rows;
