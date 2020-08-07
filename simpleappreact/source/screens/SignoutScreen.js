import React, { useState, useEffect } from "react";
import { AuthContext } from "../components/Context";
import { View } from "react-native";

function Signout({ navigation }) {
  const { LogOut } = React.useContext(AuthContext);
  useEffect(() => {
    LogOut();
  });
  return <View></View>;
}

export default Signout;
