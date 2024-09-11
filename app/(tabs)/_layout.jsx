import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, focused }) => {
  return (
    <View
      className="items-center justify-center"
      style={{
        width: 48, // Ensure space for the circle
        height: 48,
        borderRadius: 24,
        backgroundColor: focused ? "#FFFFFF" : "transparent", // Circle when focused
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          tintColor: focused ? "#dc4c1a" : "#FFFFFF", // White icon when focused, orange when not
        }}
        className="w-6 h-6"
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F97243",
          tabBarInactiveTintColor: "#f5b7a3",
          tabBarStyle: {
            backgroundColor: "#dc4c1a",
            borderTopWidth: 0,
            borderTopColor: "#F97243",
            height: 84,
            padding: 10,
          },
        }}
      >
        <Tabs.Screen
          name="materials"
          options={{
            title: "Materials",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.materials} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="relaxation"
          options={{
            title: "Relaxation",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.media} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
