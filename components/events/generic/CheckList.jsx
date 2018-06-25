
import React from 'react';
import { ButtonGroup, Button, Container, Row, Col } from 'reactstrap';
import autoBind from 'auto-bind';

class CheckList extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            checked: props.checked || [],
        };
    }

    check(value) {
        let checked = [...this.state.checked];
        let i = this.state.checked.indexOf(value);
        if (i < 0) {
            checked.push(value);
        } else {
            checked.splice(i, 1);
        }
        this.setState({
            checked: checked
        });
    }

    getChecked() {
        return this.state.checked;
    }

    render() {
        let onApply = this.props.onApply || (() => {});
        return (
            <Container>
                <Row>
                    <Col md={{size: 'auto'}}>
                        <ButtonGroup vertical={true}>
                            {this.props.values.map(value =>
                                <Button key={value}
                                    onClick={() => this.check(value)}
                                    active={this.state.checked.includes(value)}>
                                    {value}
                                </Button>
                            )}
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{size: 'auto'}}>
                        <Button color="primary"
                            onClick={() => onApply(this.state.checked)}>
                            Apply
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CheckList;
