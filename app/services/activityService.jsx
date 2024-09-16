const API_URL = "https://8011-109-175-78-156.ngrok-free.app/";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ActivityService {
  static async getData() {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("No token found");

    const response = await fetch(API_URL + "api/activities", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
}

export default ActivityService;
