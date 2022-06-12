import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// To use diff fonts in our app
import * as Font from "expo-font";
// to manage splash screen
import * as SplashScreen from "expo-splash-screen";
import Colors from "./constants/colors";
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { useEffect, useState } from "react";
import GameOverScreen from "./screens/GaveOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [isGameOver, setGameOver] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  // to manage splash screen and import custom fonts
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch {
        // handle error
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const pickedNumberHandler = (pickdNumber) => {
    setUserNumber(pickdNumber);
    setGameOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };
  // to decide which screen to show
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      {/* To add a linearGradient we will use expo's Linear Gradient package
      instead of normal view component */}
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          {/* Component helpful to set the parentContainer distance so that it is not covered by the notch */}
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
