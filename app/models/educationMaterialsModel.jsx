export default class EducationMaterialsModel {
  constructor(id, title, description, url) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.url = url;
  }

  static serialize(data) {
    return data.map(
      (item) =>
        new EducationMaterialsModel(
          item._id,
          item.title,
          item.description,
          item.url
        )
    );
  }
}
