import {
    ADD_USER,
    GET_USERS
} from "../../actions/users/users";

export default function users(state = [], action) {

    switch (action.type) {
        case ADD_USER:
            // Not used yet
            return state;

        case GET_USERS:
            // Arbitrarily override current users with new ones
            return action.users;

        default:
            return state;
    }

};