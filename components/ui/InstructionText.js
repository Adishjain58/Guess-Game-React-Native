import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const InstructionText = ({ children, style }) => {
  // The styles which comes later in style array can override the previous styles
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
