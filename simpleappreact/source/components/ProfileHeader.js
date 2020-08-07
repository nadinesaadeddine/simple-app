import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import ajax from "../services/Services";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

function ProfileHeader(props) {
  const user_id = props.user_id;
  const [user, setUser] = useState({
    user_id: user_id,
    first_name: null,
    last_name: null,
  });

  const getUserById = async () => {
    let data = await ajax.getUserById(user_id);

    if (data != "") {
      setUser({
        ...user,
        user_id: user_id,
        first_name: data.name,
        last_name: data.last_name,
      });
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <View style={{ height: height * 0.05, marginLeft: 15 }}>
      {user.first_name != null && (
        <View style={styles.subSection}>
          <AntDesign name="user" color="#5E72E4" size={16} />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.userText}>
              {user.first_name + " " + user.last_name}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default ProfileHeader;

const styles = StyleSheet.create({
  userText: {
    marginTop: 6,
    lineHeight: 20,
    paddingLeft: 15,
    color: "#5E72E4",
    fontSize: 14,
  },
  subSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 2,
  },
});
