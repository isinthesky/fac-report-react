
import axios from "axios";
import { IDevice, TabPageInfotype, Unit } from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});


export const resetXmlDevice = async (): Promise<any> => {
    try {
      const download = await axiosInstance.get("/xml/downloadXml");
      if (download.data.success) {
        await axiosInstance.put("/report/device/resetDeviceInfo");
      }
    } catch (error) {
      console.error("resetXmlDevice");
      
    }
  };

  
export const getDeviceInfo = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("/report/device/getDeviceInfo");      
      response.data.data.devices = response.data.data.devices.filter((dev: IDevice) => dev.pathId !== 0);

      const devices: { [key: number]: IDevice } = {};          
      for (const dev of response.data.data.devices) {
        const key = Number(dev.id);
        devices[key] = dev;
      }

      response.data.data.devices = devices

        return response.data.data;
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
      await axiosInstance.put("/report/general/updateSetting", {
        type: name,
        value: object
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const getUnitGroupList = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("/report/general/getSetting/unitGroup");

      return response.data.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const updateUnitGroupList = async (
    object: Unit[]
  ): Promise<any> => {
    try {
      return await axiosInstance.put("/report/general/updateSetting", {
        type: "unitGroup",
        value: object
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
      const response = await axiosInstance.post("/bms/getPointHistory", {
        path_id: deviceId.toString(),
        timestamp: date.toString()
      });

      if (response.data.success) {
        return response.data.data;
      }
      
      return null;
    } catch (error) {
      console.error("readDevicesData", error);
      return null;
    }
  };
  