import axios from "axios";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

function signupService(data) {
  console.log(data);
  axios
    .post("http://localhost:8081/auth/signup", data, { withCredentials: true })
    .then((Response) => {
      console.log(Response);
    })
    .catch((e) => {
      console.error(e);
    });
}

function loginService(data) {
  axios
    .post("http://localhost:8081/auth/login", data, headerForm)
    .then((Response) => {
      console.log(Response);
    })
    .catch((e) => {
      console.error(e);
    });
}
function googleAuth_Service(googleToken) {
  console.log(googleToken);
  axios
    .post(
      "http://localhost:8081/auth/google/provider",
      { token: googleToken },
      { withCredentials: true },
    )
    .then((Response) => {
      console.log(Response);
    })
    .catch((e) => {
      console.error(e);
    });
}
// function authWith_Facebook(token) {

// }
function logoutService() {
  axios
    .post("http://localhost:8081/auth/logout", {}, headerForm)
    .then((Response) => {
      console.log(Response);
    })
    .catch((e) => {
      console.error(e);
    });
}

export { signupService, logoutService, loginService, googleAuth_Service };
