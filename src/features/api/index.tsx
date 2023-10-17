import axios from "axios";
import { DevicePackProp } from "../../static/interface";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const postDailyData = async (
  yy: number,
  mm: number,
  dd: number
): Promise<Object> => {
  try {
    const response = await axiosInstance.post("/report", {
      type: "daily",
      year: yy,
      month: mm,
      date: dd,
    });

    console.info("getDailyData", response);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};

export const getDeviceInfo = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/getDeviceInfo");
    
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
    const response = await axiosInstance.get("/getSettings");
    console.log("getSettings", response);
    return response.data.settings;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setInitSettings = async (
  table: string,
  device: string
): Promise<any> => {
  try {
    await axiosInstance.delete("/general");

    await axiosInstance.post("/createSettings", {
      type: "settings",
      value: JSON.parse(table),
    });
    await axiosInstance.post("/createSettings", {
      type: "deviceList",
      value: JSON.parse(device),
    });
  } catch (error) {
    console.error("setInitSettings", error);
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

export const setUpdateSettingsDeviceList = async (
  tab: string,
  deviceList: DevicePackProp[]
): Promise<any> => {
  try {
    return await axiosInstance.put("/updateSettingsDeviceList", {
      tab:tab,
      deviceList:deviceList
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
