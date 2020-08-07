import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Images from "../../constants/Images";
import ajax from "../services/Services";
import { AuthContext } from "../components/Context";

const { height, width } = Dimensions.get("screen");

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { LogIn } = React.useContext(AuthContext);

  const loginUser = async () => {
    if (email == "" || password == "") {
      setErrorMsg("Email/password required!");
    } else {
      let data = await ajax.login(email, password);

      if (data.error) {
        setErrorMsg(data.error);
      } else {
        LogIn(data.id, data.token);
      }
    }
  };

  return (
    <ImageBackground
      source={Images.RegisterBackground}
      style={{ width, height, zIndex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <View style={styles.header}>
              <Text style={{ color: "#8898AA", fontSize: 14 }}>Sign In</Text>
            </View>
            {errorMsg != "" && (
              <View style={styles.header}>
                <Text
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {"Error: " + errorMsg}
                </Text>
              </View>
            )}
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Email"
                  style={styles.textInput}
                  value={email}
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  type="password"
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => loginUser()}
              >
                <Text style={styles.buttonText}>SIGN IN</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={() => navigation.push("Registration")}
                  style={styles.createButton2}
                >
                  <Text style={styles.buttonText2}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 50,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#f4f5f7",
    borderRadius: 4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  createButton: {
    width: width * 0.8,
    //marginTop: 10,
    alignItems: "center",
    backgroundColor: "#5E72E4",
    padding: 10,
    borderRadius: 20,
  },
  createButton2: {
    width: width * 0.8,
    //marginTop: 10,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#5E72E4",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonText2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5E72E4",
  },
  textContainer: {
    width: width * 0.8,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: width * 0.8,
    height: 40,
    paddingLeft: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  iconStyle: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#5E72E4",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5E72E4",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 1,
  },
});
