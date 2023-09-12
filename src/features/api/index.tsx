import axios from "axios";

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
    await axiosInstance.post("/createSettings", {
      type: "settings",
      value: JSON.parse(table),
    });
    await axiosInstance.post("/createSettings", {
      type: "deviceList",
      value: JSON.parse(device),
    });
  } catch (error) {
    console.error(error);
  }
};

export const setUpdateSettings = async (
  row: number,
  column: number
): Promise<any> => {
  try {
    return await axiosInstance.put("/updateSettings", {
      row: row,
      column: column,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
