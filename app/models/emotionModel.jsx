export default class EmotionModel {
  constructor(id, name, description) {
    this._id = id;
    this.name = name;
    this.description = description;
  }

  static serialize(data) {
    return data.map(
      (item) => new EmotionModel(item._id, item.name, item.description)
    );
  }

  static deserialize(data) {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
  }
}
