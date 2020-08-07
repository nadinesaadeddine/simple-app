import config from "../../config/Config";
import { AsyncStorage } from "react-native";

const URI = config.URI;

let token = null;
AsyncStorage.getItem("api_token").then((value) => {
  token = JSON.parse(value);
});

async function request(endpoint, bodyReq = null, method = "POST") {
  //console.log(endpoint);
  return method === "POST"
    ? fetch(URI + "/api" + endpoint, {
        method: method,
        body: JSON.stringify(bodyReq),
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        //console.log(response.text());
        if (!response.ok) throw new Error("Network response was not ok");
        else return response.json();
        //return response.text();
      })
    : fetch(URI + "/api" + endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          else return response.json();
        })
        .catch((error) => console.error("Error: " + error));
}

export default {
  async register(firstName, lastName, email, password) {
    let user;
    let bodyReq = {
      name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    let promise = fetch(URI + "/api/register", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log(data.message);

          user = {
            error: data.message,
          };
        } else user = data.data;
      })
      .catch((error) => console.log("Error: " + error));
    await promise;
    console.log(user);
    return user;
  },

  async login(email, password) {
    let user;
    let bodyReq = {
      email: email,
      password: password,
    };
    let promise = fetch(URI + "/api/login", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log(data.message);
          user = {
            error: data.message,
          };
        } else user = data.data;
      })
      .catch((error) => console.log("Error: " + error));
    await promise;
    return user;
  },

  async getAllUsers(user_id) {
    let users;
    let promise = request("/user/" + user_id + "/getAllUsers", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          users = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return users;
  },

  async getUserById(user_id) {
    let user;
    let promise = request("/user/" + user_id + "/getUserById", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          user = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return user;
  },
};
