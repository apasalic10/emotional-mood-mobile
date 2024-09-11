export default class UserModel {
  constructor(firstname, lastname, username, email, isAdmin, id) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.isAdmin = isAdmin;
    this.id = id;
  }

  static serialize(data) {
    return new UserModel(
      data.firstname,
      data.lastname,
      data.username,
      data.email,
      data.isAdmin,
      data.id
    );
  }
}
