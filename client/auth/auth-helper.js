import { signout } from "../auth/api-user";

const auth = {
  authenticate(jwt, cb) {
    //window is opened
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
      cb();
    }
  },

  isAuthenticated() {
    if (typeof window == "undefined") {
      return false;
    }

    if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  },

  clearJwt(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
    signout().then((data) => {
      document.cookie = "t=; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
