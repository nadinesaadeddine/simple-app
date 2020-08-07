import React from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import Images from "../../constants/Images";
const { height, width } = Dimensions.get("screen");

function LoadPage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadPage;
