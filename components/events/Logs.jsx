
import React from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Popover, Button,
    PopoverHeader, PopoverBody, Container, Row, Col, Nav } from 'reactstrap';
import { LogWatcher } from 'ed-logwatcher';
import autoBind from 'auto-bind';
import Event from './Event';
import Details from './Details';
import CheckList from './generic/CheckList';

import EventFactory from './EventFactory';

const PER_PAGE_DEFAULT = 100;
const PAGINATION_RANGE = 3;
const PAGINATION_WINDOW = Math.floor(PAGINATION_RANGE / 2);
const COLUMNS_AVAILABLE = [
    'timestamp',
    'event',
];

class Logs extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.saveDir = props.saveDir;
        this.eventFactory = new EventFactory();
        this.events = [];
        this.state = {
            page: 0,
            perPage: PER_PAGE_DEFAULT,
            heads: ['timestamp', 'event', ],
            configureColumns: false,
            details: null,
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
                let event = this.eventFactory.consume(ob);
                if (event) {
                    this.events.push(event);
                }
            });
            // Update events to display
            this.setState({});
        });
    }

    componentWillUnmount() {
        this.watcher.stop();
    }

    configureColumnsToggle() {
        this.setState({
            configureColumns: !this.state.configureColumns
        });
    }

    setColumns(selection) {
        this.setState({
            heads: selection
        });
    }

    render() {
        // Select events to display based on page selection
        let offset = this.events.length - this.state.page * this.state.perPage;
        let events = this.events.slice(
            Math.max(0, offset - this.state.perPage),
            offset
        );

        let pagesNum = Math.ceil(this.events.length / this.state.perPage);
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
                <Container>
                    <Row>
                    <Col md={{ size: 4 }}>
                            <Pagination>
                                <PaginationItem disabled={pages[0] <= PAGINATION_WINDOW}>
                                    <PaginationLink
                                        onClick={(e) => this.setState({
                                            page: pages[0] - (PAGINATION_WINDOW + 1)
                                        })}
                                        previous/>
                                </PaginationItem>
                                {pages.map(pageNumber => (
                                    <PaginationItem key={pageNumber}
                                        active={this.state.page === pageNumber}>
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
                        </Col>

                    <Col md={{ size: 4 }}>
                            <Button id="rows-popover" onClick={this.configureColumnsToggle}>
                                Configure rows
                            </Button>
                            <Popover placement="bottom" isOpen={this.state.configureColumns}
                                target="rows-popover" toggle={this.configureColumnsToggle}>
                                <PopoverHeader>Select columns to display</PopoverHeader>
                                <PopoverBody>
                                    <CheckList values={COLUMNS_AVAILABLE}
                                        checked={this.state.heads}
                                        onApply={this.setColumns}/>
                                </PopoverBody>
                            </Popover>
                        </Col>
                    </Row>

                <Row>
                    <Col><Table>
                    <thead>
                        <tr>
                            {this.state.heads.map(head =>
                                <th key={head}>{head}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((e, i) =>
                                <Event key={i} columns={this.state.heads}
                                    event={e} onClick={() => this.setState({
                                        details: e
                                    })}/>
                        )}
                    </tbody>
                    </Table></Col>
                    <Col xs="3">
                        <Row><Nav><h5>Details</h5></Nav></Row>
                        <Row>
                            {this.state.details &&
                                <Details event={this.state.details}/>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Logs;
