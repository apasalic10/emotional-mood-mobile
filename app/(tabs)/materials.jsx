import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons, images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import educationMaterialsController from "../controllers/educationMaterialsController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const openFile = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert("Open Error", "There was an error opening the file.");
  }
};

const Materials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLogged, setIsLogged } = useGlobalContext();

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await educationMaterialsController.fetchData();
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setIsLogged(false);
    router.replace("/sign-in");
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F97243",
          paddingHorizontal: 16,
          paddingTop: 50,
          paddingBottom: 0,
          borderBottomWidth: 0,
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[80px] h-[80px]"
        />
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={icons.logout}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View className="bg-goodCard" style={{ padding: 16 }}>
        <Text className="text-white text-xl font-psemibold">
          Preuzmite neku od priča i saznajte kako odreagovati na emocije!
        </Text>
      </View>
      <ScrollView className="h-full w-full bg-goodCard">
        {data.map((item) => (
          <View
            key={item._id}
            style={{
              backgroundColor: "#f5f5f5",
              margin: 16,
              borderRadius: 10,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#333", marginBottom: 12 }}>
              {item.description}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#F97243",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={() => openFile(item.url)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Otvori priču
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Materials;
