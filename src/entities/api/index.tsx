import axios from "axios";
import { SERVER_URL } from "@/config/env";
import { withAPILogging } from "@/utils/logger/withAPILogging";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'accept': 'application/json'
  }
});

export const setInitSettings = async (
  keyString: string,
  valueData: string
): Promise<any> => {
  const data = { type: keyString, value: JSON.parse(valueData) };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.post("/report/general/createSetting", data);
      return response.data.success;
    },
    'POST',
    "/report/general/createSetting",
    data
  );
};

export const setResetSettings = async (): Promise<boolean> => {
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/report/general/resetSettings");
      return response.data.success;
    },
    'PUT',
    "/report/general/resetSettings",
    {}
  );
};

export const setDeleteSettings = async (): Promise<boolean> => {
  return withAPILogging(
    async () => {
      const response = await axiosInstance.delete("/report/general/deleteSettings");
      return response.data.success;
    },
    'DELETE',
    "/report/general/deleteSettings",
    {}
  );
};

export const setUpdateSettingsColRow = async (
  id: number,
  name: string,
  row: number,
  column: number
): Promise<any> => {
  const data = { id, name, tbl_row: row, tbl_column: column };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabInfo/update", data);
      return response.data.success;
    },
    'PUT',
    "/FacReport/PageInfo/TabInfo/update",
    data
  );
};


export const setUpdateSettingsApprove = async (
  id: number,
  text: string,
  checked: number
): Promise<any> => {
  const data = { id, text, checked };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabApprove/update", data);
      return response.data.success;
    },
    'PUT',
    "/FacReport/PageInfo/TabApprove/update",
    data
  );
};
