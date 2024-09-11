export default class EmotionEntryModel {
  constructor(
    id,
    user_id,
    emotion_id,
    activity_id,
    description,
    voiceMessage,
    createdAt
  ) {
    this._id = id;
    this.user_id = user_id;
    this.emotion_id = emotion_id;
    this.activity_id = activity_id;
    this.description = description;
    this.voiceMessage = voiceMessage;
    this.createdAt = createdAt;
  }

  static serialize(data) {
    return new EmotionEntryModel(
      data._id,
      data.user_id,
      data.emotion_id,
      data.activity_id,
      data.description,
      data.voiceMessage,
      data.createdAt
    );
  }
}
