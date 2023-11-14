import axios from "axios";
import { ApprovalsType, TabPageInfotype, Unit } from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

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

export const getSettings = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/settings");
    console.log("settings", response);
    return response.data.settings;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setInitSettings = async (
  keyString: string,
  valueData: string
): Promise<any> => {
  try {
    await axiosInstance.post("/createSettings", {
      type: keyString,
      value: JSON.parse(valueData),
    });
  } catch (error) {
    console.error("setInitSettings", keyString, error);
  }
};

export const resetXxmlDevice = async (): Promise<any> => {
  try {
    await axiosInstance.post("/resetXml");
  } catch (error) {
    console.error("resetXxmlDevice");
  }
};

export const setUpdateSettingsColRow = async (
  row: number,
  column: number
): Promise<any> => {
  try {
    return await axiosInstance.put("/updateSettingsColRow", {
      row: row,
      column: column,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setUpdateSettingsTabPage = async (
  name: string,
  object: TabPageInfotype
): Promise<any> => {
  try {
    return await axiosInstance.put("/updateSettingsTabPage", {
      name: name,
      object: object
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setUpdateSettingsApprove = async (
  approves: ApprovalsType[]
): Promise<any> => {
  try {
    return await axiosInstance.put("/updateSettingsApprove", {
      datas: approves
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
    const res =  await axiosInstance.get(`/readDeviceLog/${deviceId}/${timeStamp}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
