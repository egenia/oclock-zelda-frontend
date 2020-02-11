import APIUrl from "../APIUrl";
import axios from "axios";

export const ADD_USER = "ADD_USER";
export const GET_USERS = "GET_USERS";

export function addUserAction(user) { return { type: ADD_USER, user } };
export function getUsersAction(users) { return { type: GET_USERS, users } };

export const addUser = function (user, cbk) {
    return function (dispatch) {
        return axios.post(APIUrl.addUser, user)
            .then(function (response) {

                if (response && response.data){
                    const result = response.data.user;
                    dispatch(addUserAction([result]));

                    if (cbk) cbk(result);
                } else {
                    if (cbk) cbk();
                }
            })
            .catch(function (err) {
                throw err;
            });
    };
};

export const getTopUsers = function (top, cbk) {
    return function (dispatch) {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        return axios.get(APIUrl.getTopUsers,
            {
                headers: {
                'Access-Control-Allow-Origin': '*'
                }
            }) //  + top
            .then(function (response) {

                if (response && response.data){
                    const users = response.data.users;
                    dispatch(getUsersAction(users));

                    if (cbk) cbk(users);
                } else {
                    if (cbk) cbk();
                }
            })
            .catch(function (err) {
                throw err;
            });
    };
};
