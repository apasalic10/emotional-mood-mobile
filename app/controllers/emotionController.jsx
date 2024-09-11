import EmotionModel from "../models/emotionModel";
import EmotionService from "../services/emotionService";
import AsyncStorage from "@react-native-async-storage/async-storage";

class EmotionController {
  async fetchData() {
    try {
      const response = await EmotionService.getData();
      const serializedData = EmotionModel.serialize(response);
      return serializedData;
    } catch (error) {
      throw error;
    }
  }
}

export default new EmotionController();
