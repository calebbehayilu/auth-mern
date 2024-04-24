import apiClient from "./api-client";

class UserService {
  getUser() {
    return apiClient.get("/user/me");
  }
}

export default new UserService();
