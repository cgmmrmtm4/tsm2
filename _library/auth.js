export function authenticateUser() {
    if ($(authUser).text() === "Guest") {
        $(authUser).text("Admin");
        isAuthorized.setAuth(true);
    } else {
        $(authUser).text("Guest");
        isAuthorized.setAuth(false);
    }
}

export let isAuthorized = (function () {
    let authorized = false;
    let getAuthorized = function () {
        return authorized;
    };
    let setAuthorized = function (val) {
        authorized = val;
    };

    return {
        getAuth: getAuthorized,
        setAuth: setAuthorized
    }
})();