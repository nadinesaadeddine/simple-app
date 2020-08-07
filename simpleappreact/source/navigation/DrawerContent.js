import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Dimensions, StyleSheet } from "react-native";
import Login from "../screens/LoginScreen";
import Registration from "../screens/RegistrationScreen";
import Home from "../screens/HomeScreen";
import Signout from "../screens/SignoutScreen";
import ProfileHeader from "../components/ProfileHeader";

const { height, width } = Dimensions.get("screen");
const Drawer = createDrawerNavigator();
const PreScreens = createStackNavigator();
const PostScreens = createStackNavigator();

export function DrawerContent(props) {
  const user_id = props.user_id;
  console.log(user_id);
  const PreScreenNavigator = ({ navigation, route }) => {
    //  const { user_id } = route.params;

    return (
      <PreScreens.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PreScreens.Screen
          name="Login"
          component={Login}
          //initialParams={{ user_id: user_id }}
        />
        <PreScreens.Screen
          name="Registration"
          component={Registration}
          // initialParams={{ user_id: user_id }}
        />
      </PreScreens.Navigator>
    );
  };

  const PostScreenNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;

    return (
      <PostScreens.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PostScreens.Screen
          name="Home"
          component={Home}
          initialParams={{ user_id: user_id }}
        />

        <PostScreens.Screen name="Sign Out" component={Signout} />
      </PostScreens.Navigator>
    );
  };

  const Contents = (props) => {
    return (
      <DrawerContentScrollView {...props} style={{ height: height }}>
        {user_id != null ? (
          <>
            <ProfileHeader user_id={user_id} />
            <DrawerItem
              label="Home"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Home")}
              icon={() => <AntDesign name="home" color="#5E72E4" size={16} />}
            />

            <DrawerItem
              label="Sign Out"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Sign Out")}
              icon={() => (
                <FontAwesome name="sign-out" color="#5E72E4" size={16} />
              )}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label="Login"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Login")}
              icon={() => <AntDesign name="login" color="#5E72E4" size={16} />}
            />
            <DrawerItem
              label="Registration"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Registration")}
              icon={() => <AntDesign name="idcard" color="#5E72E4" size={16} />}
            />
          </>
        )}
      </DrawerContentScrollView>
    );
  };
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: "60%",
        backgroundColor: "white",
        height: height,
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      drawerContent={(props) => <Contents {...props} />}
    >
      {user_id != null ? (
        <Drawer.Screen
          name="PostScreens"
          component={PostScreenNavigator}
          initialParams={{ user_id: user_id }}
        />
      ) : (
        <Drawer.Screen
          name="PreScreens"
          component={PreScreenNavigator}
          initialParams={{ user_id: user_id }}
        />
      )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    marginLeft: -15,
    color: "#5E72E4",
    fontSize: 14,
  },
});
