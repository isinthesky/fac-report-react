import axios from "axios";
import { ApprovalsType} from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const getSettings = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/report/general/getSettings");
    // console.log("getSettings", response);
    return response.data.data;
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
    await axiosInstance.post("/report/general/createSetting", {
      type: keyString,
      value: JSON.parse(valueData),
    });
  } catch (error) {
    console.error("setInitSettings", keyString, error);
  }
};

export const setResetSettings = async (): Promise<boolean> => {
  try {
    await axiosInstance.put("/report/general/resetSettings");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setDeleteSettings = async (): Promise<boolean> => {
  try {
    await axiosInstance.delete("/report/general/deleteSettings");
    return true;
  } catch (error) {
    console.error("setDeleteSettings", error);
    return false;
  }
};

export const setUpdateSettingsColRow = async (
  row: number,
  column: number
): Promise<any> => {
  try {
    const value = {"row": row, "column": column};
    const response = await axiosInstance.put("/report/general/updateSetting", {
      type: "settings",
      value: value,
    });
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setUpdateSettingsApprove = async (
  approves: ApprovalsType[]
): Promise<any> => {
  try {
    return await axiosInstance.put("/report/general/updateSetting", {
      type: "approves",
      value: approves
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
