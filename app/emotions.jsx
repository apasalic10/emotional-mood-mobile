import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import React, { useState, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import emotionController from "./controllers/emotionController";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Emotions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(
    styles.happyCard.backgroundColor
  );
  const [currentMood, setCurrentMood] = useState({});
  const [isLoadingButtons, setIsLoadingButtons] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await emotionController.fetchData();
        setData(fetchedData);
        const initialButtonState = {};
        fetchedData.forEach((item, index) => {
          initialButtonState[item.name] = index !== 0;
        });
        setCurrentMood(fetchedData[0]);
        setIsLoadingButtons(initialButtonState);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleButtonPress = (mood) => {
    const selectedItem = data.find((item) => item.name === mood);
    const newBackgroundColor = selectedItem
      ? styles[`${selectedItem.description.toLowerCase()}Card`]?.backgroundColor
      : styles.happyCard.backgroundColor;

    setBackgroundColor(newBackgroundColor);
    setCurrentMood(selectedItem ?? data[0]);
    setIsLoadingButtons((prev) => {
      const updatedButtons = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key !== mood;
        return acc;
      }, {});
      return updatedButtons;
    });
  };

  const submit = async () => {
    await AsyncStorage.setItem("emotion", JSON.stringify(currentMood));
    router.replace("/feelings");
  };

  if (loading) {
    return (
      <SafeAreaView
        className="bg-goodCard h-full"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className="bg-goodCard h-full"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[{ backgroundColor }]}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-center min-h-[50px] w-full mb-[240px]">
          <Image
            source={images[`${currentMood.description.toLowerCase()}Emoji`]}
            resizeMode="contain"
            className={` w-[375px] h-[290px] ${
              currentMood.description === "Neutral" ? "mt-8 mb-2" : "mb-10"
            }`}
          />
          <Text className="font-pregular text-white text-base mb-">
            Osjećam se{" "}
          </Text>
          <Text className="text-3xl font-pbold text-white">
            {currentMood.name}
          </Text>
        </View>
        <View className="flex-row mb-2 items-center justify-center">
          {data.slice(0, 3).map((item) => (
            <RoundButton
              key={item.name}
              title={item.name}
              handlePress={() => handleButtonPress(item.name)}
              containerStyles={`w-[115px] mr-2`}
              isLoading={isLoadingButtons[item.name]}
            />
          ))}
        </View>
        <View className="flex-row mb-5 items-center justify-center">
          {data.slice(3).map((item) => (
            <RoundButton
              key={item.name}
              title={item.name}
              handlePress={() => handleButtonPress(item.name)}
              containerStyles="w-[115px] mr-2"
              isLoading={isLoadingButtons[item.name]}
            />
          ))}
        </View>
        <View className="justify-end items-center ">
          <CustomButton
            title="Odaberi osjećanje"
            handlePress={submit}
            containerStyles="bg-buttonColor w-[85%]"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#01B26E" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  happyCard: {
    backgroundColor: "#01B26E",
  },
  sadCard: {
    backgroundColor: "#368AE9",
  },
  goodCard: {
    backgroundColor: "#F97243",
  },
  neutralCard: {
    backgroundColor: "#da9a15",
  },
  angryCard: {
    backgroundColor: "#DE385E",
  },
  cryingCard: {
    backgroundColor: "#856EFA",
  },
});
