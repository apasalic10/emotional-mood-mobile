import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const RoundButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-buttonColor min-h-[50px] justify-center items-center rounded-2xl ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      style={{
        position: "relative",
      }}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundButton;
