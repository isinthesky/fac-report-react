
import axios from "axios";
import { IDevice, TabPageInfotype, Unit } from "../../static/types";

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
      
      const devices: { [key: number]: IDevice } = {};
          
      for (const dev of response.data.deviceInfo.device) {
        if (dev.pathId !== 0) {
          const key = Number(dev.id);
          devices[key] = dev;
        } 
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

    console.log("updateSettingsTabPage" ,name)
    try {
      await axiosInstance.put("device/updateTabPage", {
        name: name,
        object: object
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const getUnitGroupList = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("device/unitGroupList");

      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const updateUnitGroupList = async (
    object: Unit[]
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


export const readDevicesData = async (
    deviceId: number,
    date: number
  ): Promise<any> => {
    try {
      const res = await axiosInstance.get(`device/readDeviceLog/${deviceId.toString()}/${date.toString()}`);

      if (res.data) {
        return (res.data.ok === true) ? res.data.data : null;
      }
      
      return null;
    } catch (error) {
      console.error("readDevicesData", error);
      return null;
    }
  };
  