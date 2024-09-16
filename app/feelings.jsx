import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const FeelingScreen = () => {
  const [form, setForm] = useState({
    description: "",
  });

  const [recording, setRecording] = useState(null);
  const [recordedSound, setRecordedSound] = useState(null);
  const [soundUri, setSoundUri] = useState(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      throw error;
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const { sound } = await recording.createNewLoadedSoundAsync();
      setRecordedSound(sound);
      const uri = recording.getURI();
      setSoundUri(uri);
    } catch (error) {
      throw error;
    }
  };

  const playRecordedSound = async () => {
    try {
      await recordedSound.playAsync();
    } catch (error) {
      throw error;
    }
  };

  const deleteRecordedSound = () => {
    setRecordedSound(null);
    setRecording(null);
    setSoundUri(null);
  };

  const sendFeelings = async () => {
    try {
      if (!soundUri && form.description.trim() === "") {
        Alert.alert("Greška", "Molimo popunite jednu od opcija.");
        return;
      }

      if (soundUri) {
        const base64Sound = await FileSystem.readAsStringAsync(soundUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await AsyncStorage.setItem("soundMessage", base64Sound);
      }
      if (form.description.trim() !== "")
        await AsyncStorage.setItem("textMessage", form.description);

      router.replace("/activities");
    } catch (error) {
      throw error;
    }
  };

  return (
    <SafeAreaView className="bg-happyCard h-full">
      <ScrollView className="h-full w-full">
        <View className="justify-center items-center mt-[40px]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[300px] h-[124px] mb-7"
          />
          <Text className="text-white text-2xl font-psemibold">
            Opišite svoje osjećaje ili snimite glasovnu poruku!
          </Text>
        </View>
        <View style={styles.containerTextInput} className="rounded-2xl">
          <TextInput
            className="text-buttonColor font-pregular text-base"
            style={styles.textInput}
            multiline
            placeholder="Unesite tekst..."
            value={form.description} // vrednost TextInput-a iz stanja
            onChangeText={
              (text) =>
                setForm((prevState) => ({ ...prevState, description: text })) // ažuriranje stanja
            }
          />
        </View>
        <View style={recordedSound ? styles.noBackground : styles.container}>
          {!recordedSound ? (
            <TouchableOpacity
              onPress={recording ? stopRecording : startRecording}
              style={styles.actionButton}
            >
              <Text style={styles.buttonText}>
                {recording ? "Zaustavi snimanje" : "Pokreni snimanje"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={playRecordedSound}
              >
                <Text style={styles.buttonText}>Pokreni</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteRecordedSound}
              >
                <Text style={styles.buttonText}>Izbriši</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View className="justify-center items-center ml-4 mr-4 h-[90px]">
          <CustomButton
            title="Pošalji svoja osjećanja"
            handlePress={sendFeelings}
            containerStyles="w-full mt-[80px] bg-buttonColor"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: "#fea713",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    textAlignVertical: "top",
    padding: 10,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#074785",
    borderRadius: 8,
    width: "100%",
    fontSize: 17,
  },
  containerTextInput: {
    height: 200,
    backgroundColor: "#ffffff",
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fea713",
    borderRadius: 15,
    paddingVertical: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#DE385E",
    borderRadius: 15,
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FeelingScreen;
