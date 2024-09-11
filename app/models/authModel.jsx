export default class AuthModel {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  static serialize(data) {
    return new AuthModel(data.accessToken);
  }
}
