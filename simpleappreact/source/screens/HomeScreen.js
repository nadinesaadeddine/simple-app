import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import LoadPage from "../components/LoadPage";
import ajax from "../services/Services";

const { height, width } = Dimensions.get("screen");

function Home({ route, navigation }) {
  const { user_id } = route.params;
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    let data = await ajax.getAllUsers(user_id);
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <ScreenHeader title="Registered Users" />
      {isLoading ? (
        <LoadPage />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
          <View style={styles.thead}>
            <View style={[styles.th, { marginLeft: 10 }]}>
              <Text style={styles.thText}>First Name</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.thText}>Last Name</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.thText}>Email</Text>
            </View>
          </View>
          {Users.length > 0 &&
            Users.map((user) => {
              return (
                <View key={user.id} style={styles.tbody}>
                  <View style={[styles.td, { marginLeft: 10 }]}>
                    <Text>{user.name}</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>{user.last_name}</Text>
                  </View>
                  <View style={styles.td}>
                    <Text>{user.email}</Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}

export default Home;
const styles = StyleSheet.create({
  thead: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  tbody: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  th: {
    width: width / 3,
  },
  td: {
    width: width / 3,
  },
  thText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
