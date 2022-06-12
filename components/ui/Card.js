import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // for adding shadow to ios, below 4 properties are used.
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    // to add shadow to android
    elevation: 4,
    alignItems: "center",
  },
});

export default Card;
