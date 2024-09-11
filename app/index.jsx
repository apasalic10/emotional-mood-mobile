import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import React, { useState, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) {
    return <Redirect href="/emotions" />;
  }
  return (
    <SafeAreaView className={`h-full bg-goodCard`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[160px] h-[124px] mb-1 mt-8"
            resizeMode="contain"
          ></Image>

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[350px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 h-[100px]">
            <Text className="text-3xl text-white font-semibold text-center">
              Svaka emocija je bitna sa {"\n"}
              <Text className="text-buttonColor font-pbold">
                Emotional Tracker!
              </Text>
            </Text>
            <Text className="text-sm font-pregular text-white mt-3 text-center">
              Gdje svaka emocija priča svoju priču: započnite putovanje
              razumijevanja i rasta sa Emotional Trackerom.
            </Text>
          </View>

          <CustomButton
            title="Početak"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-[80px] bg-buttonColor"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F97243" style="light" />
    </SafeAreaView>
  );
}
