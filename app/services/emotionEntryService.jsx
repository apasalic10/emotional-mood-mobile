const API_URL = "https://3275-176-108-63-31.ngrok-free.app/";
import AsyncStorage from "@react-native-async-storage/async-storage";

class EmotionEntryService {
  static async postData(emotionId, activityId, description, voiceMessage) {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("No token found");

    const response = await fetch(API_URL + "api/emotionEntries", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emotion_id: emotionId,
        activity_id: activityId,
        description: description,
        voiceMessage: voiceMessage,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
}

export default EmotionEntryService;
