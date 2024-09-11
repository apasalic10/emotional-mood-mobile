import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { Video } from "expo-av";
import { icons, images } from "../../constants";

const mediaList = [
  {
    type: "image",
    title: "Relaksacija mišića",
    source: images.relaksacijaSlika,
  },
  {
    type: "video",
    title: "Disanje za relaksaciju",
    source: require("../../assets/videos/relaksacijaVideo.mp4"),
  },
  {
    type: "image",
    title: "Položaj za relaksaciju",
    source: images.relaksacijaSlika1,
  },
];

const Relaxation = () => {
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
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          Pogledajte neke od slika i videa za relaksaciju!
        </Text>
      </View>

      <ScrollView className="h-full w-full bg-goodCard">
        {mediaList.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              margin: 16,
              borderRadius: 10,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              {item.title}
            </Text>
            {item.type === "image" ? (
              <Image
                source={item.source}
                style={{ width: 380, height: 400 }}
                resizeMode="contain"
              />
            ) : (
              <Video
                source={item.source}
                style={{ width: 380, height: 300 }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Relaxation;
