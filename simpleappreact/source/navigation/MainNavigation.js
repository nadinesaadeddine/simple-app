import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import LoadPage from "../components/LoadPage";
import { AuthContext } from "../components/Context";
import { DrawerContent } from "../navigation/DrawerContent";

export function MainNavigation() {
  const initialLoginState = {
    isLoading: true,
    api_token: null,
    user_id: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          api_token: action.token,
          isLoading: false,
          user_id: action.id,
        };
      case "LOGIN":
        return {
          ...prevState,
          api_token: action.token,
          user_id: action.id,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          api_token: action.token,
          user_id: action.id,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          api_token: action.token,
          user_id: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      LogIn: async (user_id, user_token) => {
        try {
          await AsyncStorage.setItem("user_id", JSON.stringify(user_id));
          await AsyncStorage.setItem("api_token", JSON.stringify(user_token));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          id: user_id,
          token: user_token,
        });
      },
      LogOut: async () => {
        let user_id, user_token;
        try {
          await AsyncStorage.removeItem("user_id");
          await AsyncStorage.removeItem("api_token");
          user_id = null;
          user_token = null;
        } catch (e) {
          console.log(e);
        }

        dispatch({
          type: "LOGOUT",
          id: user_id,
          token: user_token,
        });
      },
      SignUp: async (user_id, user_token) => {
        try {
          await AsyncStorage.setItem("user_id", JSON.stringify(user_id));
          await AsyncStorage.setItem("api_token", JSON.stringify(user_token));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "REGISTER",
          id: user_id,
          token: user_token,
        });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let user_id, api_token;
      user_id = null;
      api_token = null;
      try {
        user_id = await AsyncStorage.getItem("user_id");
        api_token = JSON.parse(await AsyncStorage.getItem("api_token"));
      } catch (e) {
        console.log(e);
      }

      dispatch({
        type: "RETRIEVE_TOKEN",
        id: user_id,
        token: api_token,
      });
    }, 1000);
  }, []);

  //   if (loginState.isLoading) {
  //     return;
  //     <LoadPage />;
  //   }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <DrawerContent user_id={loginState.user_id} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
