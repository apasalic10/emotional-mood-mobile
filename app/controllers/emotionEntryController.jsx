import EmotionEntryModel from "../models/emotionEntryModel";
import EmotionEntryService from "../services/emotionEntryService";

class EmotionEntryController {
  async postData(emotionId, activityId, description, voiceMessage) {
    try {
      const response = await EmotionEntryService.postData(
        emotionId,
        activityId,
        description,
        voiceMessage
      );
      const serializedData = EmotionEntryModel.serialize(response);
      return serializedData;
    } catch (error) {
      throw error;
    }
  }
}

export default new EmotionEntryController();
