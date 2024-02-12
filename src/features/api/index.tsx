import axios from "axios";
import { ApprovalsType, TabPageInfotype, Unit } from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

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


export const setDeleteSettings = async (): Promise<Boolean> => {
  try {
    await axiosInstance.delete("/general");
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
    return await axiosInstance.put("/updateSettingsColRow", {
      row: row,
      column: column,
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
