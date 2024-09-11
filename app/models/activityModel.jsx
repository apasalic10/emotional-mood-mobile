export default class ActivityModel {
  constructor(id, name) {
    this._id = id;
    this.name = name;
  }

  static serialize(data) {
    return data.map((item) => new ActivityModel(item._id, item.name));
  }
}
