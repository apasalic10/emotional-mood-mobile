import ActivityModel from "../models/activityModel";
import ActivityService from "../services/activityService";

class ActivityController {
  async fetchData() {
    try {
      const response = await ActivityService.getData();
      const serializedData = ActivityModel.serialize(response);
      return serializedData;
    } catch (error) {
      throw error;
    }
  }
}

export default new ActivityController();
