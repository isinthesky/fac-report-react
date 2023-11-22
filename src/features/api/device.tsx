
import axios from "axios";
import { ApprovalsType, TabPageInfotype, Unit } from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});


export const resetXmlDevice = async (): Promise<any> => {
    try {
      await axiosInstance.post("/resetXml");
    } catch (error) {
      console.error("resetXmlDevice");
    }
  };

  
export const getDeviceInfo = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("device/deviceInfo");
      
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


export const updateSettingsTabPage = async (
    name: string,
    object: TabPageInfotype
  ): Promise<any> => {
    try {
      return await axiosInstance.put("device/updateTabPage", {
        name: name,
        object: object
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const getUnitGroupList = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("device/unitGroupList");

      console.log("getUnitGroupList", response)

      return response.data.deviceInfo;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateUnitGroupList = async (
    object: [Unit[]]
  ): Promise<any> => {
    try {
      return await axiosInstance.put("/device/UnitGroupList", {
        object: object
      });
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
      const res =  await axiosInstance.get(`device/readDeviceLog/${deviceId}/${timeStamp}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  