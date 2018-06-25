
import React from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { LogWatcher } from 'ed-logwatcher';
import Event from './Event';

const PER_PAGE_DEFAULT = 100;
const PAGINATION_RANGE = 3;
const PAGINATION_WINDOW = Math.floor(PAGINATION_RANGE / 2);

class Logs extends React.Component {

    constructor(props) {
        super(props);

        this.saveDir = props.saveDir;
        this.rows = [];
        this.state = {
            page: 0,
            perPage: PER_PAGE_DEFAULT,
        };
    }

    componentDidMount() {
        this.watcher = new LogWatcher(this.saveDir, 5);
        this.watcher.on('error', err => {
            watcher.stop();
            console.error(err.stack || err);
        });
        this.watcher.on('finished', () => {});
        this.watcher.on('data', obs => {
            obs.forEach(ob => {
                let {timestamp, event} = ob;
                this.rows.push(<Event event={ob}/>);
            });
            // Update rows to display
            this.setState({});
        });
    }

    componentWillUnmount() {
        this.watcher.stop();
    }

    rowClick() {
        // TODO: show details
    }

    render() {
        // Select rows to display based on page selection
        let offset = this.rows.length - this.state.page * this.state.perPage;
        let rows = this.rows.slice(
            Math.max(0, offset - this.state.perPage),
            offset
        );

        let pagesNum = Math.ceil(this.rows.length / this.state.perPage);
        let pagesStart = Math.max(
            0,
            Math.min(
                this.state.page - PAGINATION_WINDOW,
                pagesNum - PAGINATION_RANGE
            )
        );
        let pagesRange = Math.min(PAGINATION_RANGE, pagesNum - pagesStart);
        let pages = [...Array(pagesRange).keys()]
            .map(index => index + pagesStart);

        return (
            <React.Fragment>
                <Pagination>
                    <PaginationItem disabled={pages[0] <= PAGINATION_WINDOW}>
                        <PaginationLink
                            onClick={(e) => this.setState({
                                page: pages[0] - (PAGINATION_WINDOW + 1)
                            })}
                            previous/>
                    </PaginationItem>
                    {pages.map(pageNumber => (
                        <PaginationItem active={this.state.page === pageNumber}>
                            <PaginationLink
                                onClick={
                                    (this.state.page != pageNumber)
                                    ? (e) => this.setState({
                                        page: pageNumber
                                    })
                                    : () => {}
                                }>
                                {pageNumber + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem disabled={
                        pages[pages.length - 1] >= pagesNum
                            - (PAGINATION_WINDOW + 1)}>
                        <PaginationLink
                            onClick={(e) => this.setState({
                                page: pages[pages.length - 1]
                                    + (PAGINATION_WINDOW + 1)
                            })}
                            next/>
                    </PaginationItem>
                </Pagination>

                <Table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default Logs;
