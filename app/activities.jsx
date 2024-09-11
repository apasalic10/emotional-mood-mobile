import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import activityController from "./controllers/activityController";
import RoundButton from "../components/RoundButton";
import emotionEntryController from "./controllers/emotionEntryController";

const Activities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentActivity, setCurrentActivity] = useState({});
  const [isLoadingButtons, setIsLoadingButtons] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await activityController.fetchData();
        setData(fetchedData);
        const initialButtonState = {};
        fetchedData.forEach((item, index) => {
          initialButtonState[item.name] = index !== 0;
        });
        setCurrentActivity(fetchedData[0]);
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

    setCurrentActivity(selectedItem ?? data[0]);
    setIsLoadingButtons((prev) => {
      const updatedButtons = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key !== mood;
        return acc;
      }, {});
      return updatedButtons;
    });
  };

  const submit = async () => {
    try {
      setLoading(true);
      const emotionString = await AsyncStorage.getItem("emotion");
      const emotion = JSON.parse(emotionString);
      const activity = currentActivity;
      const description = await AsyncStorage.getItem("textMessage");
      const soundMessage = await AsyncStorage.getItem("soundMessage");

      await emotionEntryController.postData(
        emotion._id,
        activity._id,
        description,
        soundMessage
      );

      router.replace("/materials");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      await AsyncStorage.removeItem("emotion");
      await AsyncStorage.removeItem("textMessage");
      await AsyncStorage.removeItem("soundMessage");
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        className="bg-angryCard h-full"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className="bg-angryCard h-full"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-angryCard h-full">
      <ScrollView className="h-full w-full">
        <View className="justify-center items-center mt-[40px] mb-14">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[300px] h-[124px] mb-7"
          />
          <Text className="text-white text-2xl font-psemibold">
            Odaberite koja od ponudjenih aktivnosti je dovela do toga{"\n"}da se
            osjećate tako!
          </Text>
        </View>
        <View className="flex-row mb-2 ml-4 mr-2 items-center justify-center">
          {data.slice(0, 2).map((item) => (
            <RoundButton
              key={item.name}
              title={item.name}
              handlePress={() => handleButtonPress(item.name)}
              containerStyles={`w-[190px] h-[60px] mr-2`}
              isLoading={isLoadingButtons[item.name]}
            />
          ))}
        </View>
        <View className="flex-row mb-2 ml-4 mr-2 items-center justify-center">
          {data.slice(2, 4).map((item) => (
            <RoundButton
              key={item.name}
              title={item.name}
              handlePress={() => handleButtonPress(item.name)}
              containerStyles={`w-[190px] h-[60px] mr-2`}
              isLoading={isLoadingButtons[item.name]}
            />
          ))}
        </View>
        <View className="flex-row mb-2 ml-4 mr-2 items-center justify-center">
          {data.slice(4).map((item) => (
            <RoundButton
              key={item.name}
              title={item.name}
              handlePress={() => handleButtonPress(item.name)}
              containerStyles={`w-[190px] h-[60px] mr-2`}
              isLoading={isLoadingButtons[item.name]}
            />
          ))}
        </View>
        <View className="justify-center items-center ml-4 mr-4 h-[90px]">
          <CustomButton
            title="Odaberi aktivnost"
            handlePress={submit}
            containerStyles="w-full mt-[80px] bg-buttonColor"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activities;
