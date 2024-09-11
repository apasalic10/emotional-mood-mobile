import AsyncStorage from "@react-native-async-storage/async-storage";
import EducationMaterialsService from "../services/educationMaterialService";
import EducationMaterialsModel from "../models/educationMaterialsModel";

class EducationMaterialController {
  async fetchData() {
    try {
      const response = await EducationMaterialsService.getData();
      const serializedData = EducationMaterialsModel.serialize(response);
      return serializedData;
    } catch (error) {
      throw error;
    }
  }
}

export default new EducationMaterialController();
