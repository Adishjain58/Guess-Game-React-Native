import { Text, StyleSheet, Platform } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    /*
    Platform is an API provided by react-native by which we can
    determine on which platform our code is running and based on that 
    we can write platform dependent code.
    */
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    /*
     another way to use Platform Api where in we provide values for both 
     ios and android and based on respective platform the specified values 
     will be returned by the select method
     */
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
