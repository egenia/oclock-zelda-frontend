const rootUrl = process.env.REACT_APP_BE_URL || "http://localhost:6001";

const APIUrl = {
    rootUrl:            rootUrl,

    addUser:            rootUrl + "/user",              // POST
    getTopUsers:        rootUrl + "/users/top/",        // GET
};

export default APIUrl;
