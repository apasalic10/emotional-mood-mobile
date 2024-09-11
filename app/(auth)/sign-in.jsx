import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import authController from "../controllers/authController";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Greška", "Molimo unesite sva polja.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authController.login(form.email, form.password);
      router.replace("/emotions");
    } catch (error) {
      Alert.alert("Greška", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-goodCard h-full">
      <ScrollView>
        <View className="w-full justify-center items-center mt-[50px]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[300px] h-[124px]"
          />
        </View>
        <View className="w-full justify-center px-4 my-6">
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Prijava na{" "}
            <Text className="text-buttonColor font-pbold">
              Emotional Tracker
            </Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Prijavi se"
            handlePress={submit}
            containerStyles="mt-7 bg-buttonColor"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
