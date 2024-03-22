import axios from 'axios';
import {BASE_URL} from '../../utils/Constant'



const apiService = axios.create({
    BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const EndPoints = "";

export const Get_All_Workouts = async () => {
    try {
      const response = await instance.get(ALL_WORKOUT_ENDPOINT);
      console.log("AllWorkoutResp----------", response.data);
      return response.data;
    } catch (error) {
      console.log('AllWorkoutError-------', error);
      throw error;
    }
  }


  export const mark_as_done = async (data) => {
    try {
      const response = await instance.post(MARK_DONE_ENDPOINT, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

export default apiService;