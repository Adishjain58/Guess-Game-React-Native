import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
/*
  We can even have platform dependent js files with .android or .ios
  in their names and import the file without any file extension
  and react-native will automatically pick the file based on the platform
  where our app is running
*/
import Title from "../components/ui/Title";
import GuessLogItem from "../components/game/GuessLogItem";

const GameScreen = ({ userNumber, onGameOver }) => {
  const [guessedNumber, setGuessedNumber] = useState(null);
  const [minBoundary, setMinBoundary] = useState(1);
  const [maxBoundary, setMaxBoundary] = useState(100);
  const [guessRounds, setGuessRounds] = useState([]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setGuessedNumber(
      generateRandomBetween(
        minBoundary,
        maxBoundary,
        guessedNumber ? guessedNumber : userNumber
      )
    );
  }, [minBoundary, maxBoundary]);

  useEffect(() => {
    if (guessedNumber) {
      setGuessRounds((prevRounds) => [guessedNumber, ...prevRounds]);
    }
    if (guessedNumber === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [guessedNumber, userNumber, onGameOver]);

  useEffect(() => {
    setMinBoundary(1);
    setMaxBoundary(100);
  }, []);

  const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  };

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && guessedNumber < userNumber) ||
      (direction === "higher" && guessedNumber > userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      setMaxBoundary(guessedNumber);
    } else {
      setMinBoundary(guessedNumber + 1);
    }
  };

  const guessroundsListLength = guessRounds.length;

  // To show different contents beased on the device width
  let content = (
    <>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  // to change the layout when width > 500
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>

          <NumberContainer>{guessedNumber}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(listItem) => {
            return (
              <GuessLogItem
                roundNumber={guessroundsListLength - listItem.index}
                guess={listItem.item}
              />
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
