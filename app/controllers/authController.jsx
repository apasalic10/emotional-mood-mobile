import AuthModel from "../models/authModel";
import AuthService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthController {
  // POST /auth/login
  async login(email, password) {
    try {
      const response = await AuthService.loginRequest(email, password);
      const serializedData = AuthModel.serialize(response);
      await AsyncStorage.setItem("accessToken", serializedData.accessToken);
      return serializedData;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
