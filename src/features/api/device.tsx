
import axios from "axios";
import { ApprovalsType, TabPageInfotype, Unit } from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});


export const resetXxmlDevice = async (): Promise<any> => {
    try {
      await axiosInstance.post("/resetXml");
    } catch (error) {
      console.error("resetXxmlDevice");
    }
  };

  
export const getDeviceInfo = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("/deviceInfo");
      
      const devices: { [key: number]: any } = {};
          
      for (const dev of response.data.deviceInfo.device) {
        const key = Number(dev.id);
        devices[key] = dev;
      }
  
      response.data.deviceInfo.device = devices
  
      return response.data.deviceInfo;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  

  export const readDeviceLog = async (
    deviceId: number,
    timeStamp: number
  ): Promise<any> => {
    try {
      const res =  await axiosInstance.get(`/readDeviceLog/${deviceId}/${timeStamp}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  