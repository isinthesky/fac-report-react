
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

  
export const getDeviceDict = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/FacReport/Device/dict");

    if (response.data.content.success)
      return response.data.content.data;
    else
      return false;
      
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const getStationList = async (): Promise<any> => {
  try {
    const params = { with_division: true };
    const response = await axiosInstance.get("/FacReport/DeviceInfo/Station/list", { params });

    if (response.data.content.success)
      return response.data.content.data;
    else
      return false;
      
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const getDivisionList = async (): Promise<any> => {
  try {    
    const response = await axiosInstance.get("/FacReport/DeviceInfoDivision/list");

    if (response.data.content.success)
      return response.data.content.data;
    else
      return false;
      
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
  