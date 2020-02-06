import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import TimeUtil from '../util/TimeUtil';
import { addUser } from '../actions/users/users';


class LeaderboardModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            disabled: false
        };
    }

    onSend = () => {
        this.props.onAddUser({ username: this.state.value, time: this.props.time}, () => {
            this.props.onAddToLeaderboard();
            this.props.toggle();
        });
    }

    render() {
        return (
            <Modal isOpen={true} toggle={this.props.toggle} size="md">

                <ModalHeader toggle={this.props.toggle}>
                    <FormattedMessage id="Victory" />&nbsp;!
                </ModalHeader>

                <ModalBody>

                    <h5 className="text-center">
                        <FormattedMessage id="You.Completed.The.Game.In" values={{ sec: TimeUtil.msToTime(this.props.time) }} />&nbsp;!
                    </h5>

                    <div className="text-center mt-4">
                        <div className="text-center mb-3"><FormattedMessage id="Enter.Username.For.Leaderboard" /></div>

                        <input
                            type="text"
                            maxLength={100}
                            className="form-control"
                            id="username"
                            value={this.state.value}
                            onChange={(e) => this.setState({ value: e.target.value })} />
                    </div>

                </ModalBody>

                <ModalFooter>

                    <Button color="primary"
                        disabled={this.state.disabled}
                        onClick={() => this.onSend()}>
                        <FormattedMessage id="Send" />
                    </Button>

                    <Button color="secondary"
                        onClick={this.props.playAgain}>
                        <FormattedMessage id="Play.Again" />
                    </Button>

                </ModalFooter>

            </Modal>
        );

    }

}

const mapStateToProps = state => {
    return {
        //
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddUser: (user, cbk) => dispatch(addUser(user, cbk))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardModal);