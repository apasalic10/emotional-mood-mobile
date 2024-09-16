const API_URL = "https://8011-109-175-78-156.ngrok-free.app/";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
  static async loginRequest(email, password) {
    const response = await fetch(API_URL + "api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    return data;
  }

  static async currentUser() {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await fetch(API_URL + "api/users/current", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    return data;
  }
}

export default AuthService;
