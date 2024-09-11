const API_URL = "https://1cbf-176-108-63-31.ngrok-free.app/api/users/login";

class AuthService {
  static async loginRequest(email, password) {
    const response = await fetch(API_URL, {
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
}

export default AuthService;
