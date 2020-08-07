import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export function ScreenHeader(props) {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          bottom: 0,
          top: (height * 0.12) / 2,
          left: 20,
        }}
      >
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.12,
    backgroundColor: "#5E72E4",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
