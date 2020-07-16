var UserProfile = (function () {
  var getFirstName = function () {
    return localStorage.getItem("fname");
  };

  var getLastName = function () {
    return localStorage.getItem("lname");
  };

  var getUsername = function () {
    return localStorage.getItem("username");
  };

  var setUserInfo = function (first, last, user) {
    localStorage.setItem("fname", first);
    localStorage.setItem("lname", last);
    localStorage.setItem("username", user);
  };

  return {
    getFirstName: getFirstName,
    getLastName: getLastName,
    getUsername: getUsername,
    setUserInfo: setUserInfo,
  };
})();

export default UserProfile;
