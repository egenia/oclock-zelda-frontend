import React from 'react';
import { connect } from 'react-redux';
import map from './map';
import '../scss/style.scss';
import MapUtil from '../util/MapUtil';
import PhysicsUtil from '../util/PhysicsUtil';
import TimeUtil from '../util/TimeUtil';
import { FormattedMessage } from 'react-intl';
import LeaderboardModal from './LeaderboardModal';
import { getTopUsers } from '../actions/users/users';


class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.START_X = map.startPosition.posX * 20;
        this.START_Y = map.startPosition.posY * 20;

        // Debug position to start close to the diamond
        // this.START_X = 100;
        // this.START_Y = 40;

        this.state = this.initState();

        // Keyboard keyCodes
        this.TOP_ARROW_KEYCODE = 38;
        this.RIGHT_ARROW_KEYCODE = 39;
        this.DOWN_ARROW_KEYCODE = 40;
        this.LEFT_ARROW_KEYCODE = 37;

        // Geometric representation of the map
        this.MAP_BOUNDS = MapUtil.bounds(map);
        this.MAP_WALLS = MapUtil.toGeometry(map, '+');
        this.MAP_MUDS = MapUtil.toGeometry(map, 'x');
        this.MAP_DIAMOND = MapUtil.toGeometry(map, '$');
        this.MAP_EXIT = { x: 799, y: 360, w: 2, h: 20 };
    }

    initState = () => {
        return {
            x: this.START_X,
            y: this.START_Y,
            hasDiamond: false,
            start_date: new Date(),

            modal: null
        };
    }

    componentDidMount = () => {
        // Watch keyboard events
        document.addEventListener("keydown", (e) => this.handleKeyDown(e.keyCode));

        // Refresh the component every second for the timer to refresh
        this._intervalId = setInterval(() => this.forceUpdate(), 1000);

        this.getLeaderboard();
    }

    getLeaderboard = () => {
        // Fetch leaderboard
        this.props.onGetTopUsers(5);
    }

    componentWillUnmount = () => {
        // Clear refresh function
        clearInterval(this._intervalId);
    }

    handleKeyDown = (keyCode) => {
        this.setState(prevState => {
            let newState = { ...prevState };

            switch (keyCode) {
                case this.TOP_ARROW_KEYCODE:
                    newState.y -= 2;
                    break;

                case this.RIGHT_ARROW_KEYCODE:
                    newState.x += 2;
                    break;

                case this.DOWN_ARROW_KEYCODE:
                    newState.y += 2;
                    break;

                case this.LEFT_ARROW_KEYCODE:
                    newState.x -= 2;
                    break;

                default:
                    break;

            }

            const heroNewHitbox = { x: newState.x, y: newState.y, w: 20, h: 20 };

            // If hero has the diamond and exits
            if(prevState.hasDiamond && PhysicsUtil.overlap(heroNewHitbox, this.MAP_EXIT)){
                return {
                    modal: <LeaderboardModal
                        time={TimeUtil.msUntilNow(this.state.start_date)}
                        toggle={this.closeModal}
                        playAgain={() => this.setState(this.initState())}
                        onAddToLeaderboard={this.getLeaderboard} />
                };
            }
            // If hero overlaps the diamond, fetch it
            if (!prevState.hasDiamond && PhysicsUtil.overlaps(heroNewHitbox, this.MAP_DIAMOND)) {
                return { ...newState, hasDiamond: true };
            }
            // If hero overlaps the mud, back to start position!
            if (PhysicsUtil.overlaps(heroNewHitbox, this.MAP_MUDS)) {
                return this.initState();
            }
            // If hero does not overlap walls and does not get out of map bounds, authorize moving
            if (!PhysicsUtil.overlaps(heroNewHitbox, this.MAP_WALLS) && PhysicsUtil.withinStrict(heroNewHitbox, this.MAP_BOUNDS)) {
                return newState;
            } else {
                return prevState;
            }
        });
    }

    closeModal = () => this.setState({ modal: null });

    render = () => {
        const { users } = this.props;

        return (
            <div className="position-relative" style={{ width: this.MAP_BOUNDS.w + "px" }}>
                {/* The timer */}
                <div className="position-absolute pixel-font ml-2 mt-2">
                    <FormattedMessage id="Timer" /> : {TimeUtil.msToTime(TimeUtil.msUntilNow(this.state.start_date))}
                </div>

                {/* The leaderboard */}
                {(users && users.length > 0) &&
                    <div className="position-absolute pixel-font mt-2" style={{ right: 10 }}>
                        <div><FormattedMessage id="Leaderboard" /></div>
                        {users.map(u => {
                            return <div key={u._id}>{u.username} - {TimeUtil.msToTime(u.time)}s</div>
                        })}
                    </div>
                }

                {/* The map */}
                {MapUtil.toHtml(map, !this.state.hasDiamond)}

                {/* The hero */}
                <div
                    className="position-absolute bg-danger w-20px h-20px"
                    style={{ left: this.state.x, top: this.state.y }}>
                </div>

                {this.state.modal}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTopUsers: (cbk) => dispatch(getTopUsers(cbk))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);