import axios from "axios";
import { SERVER_URL } from "@/config/env";
import { withAPILogging } from "@/utils/logger/withAPILogging";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});


export const resetXmlDevice = (): Promise<any> => {
  return withAPILogging(
    async () => {
      const download = await axiosInstance.get("/xml/downloadXml");
      if (download.data.success) {
        return axiosInstance.put("/report/device/resetDeviceInfo");
      }
    },
    'GET',
    "/xml/downloadXml",
    null
  );
};

export const getDeviceDict = (): Promise<any> => {
  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/Device/dict");
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    },
    'GET',
    "/FacReport/Device/dict",
    null
  );
};


export const getStationList = (): Promise<any> => {
  const params = { with_division: true };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/DeviceInfo/Station/list", { params });
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    },
    'GET',
    "/FacReport/DeviceInfo/Station/list",
    params
  );
};


export const getDivisionList = (): Promise<any> => {
  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/DeviceInfoDivision/list");
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    },
    'GET',
    "/FacReport/DeviceInfoDivision/list",
    null
  );
};


export const updateTab =(
  id: number,
  name: string,
  tbl_row: number,
  tbl_column: number,
  history_date: string,
): Promise<any> => {
  const data = { id, name, tbl_row, tbl_column, history_date };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabInfo/update", data);
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/TabInfo/update",
    data
  );
};
  

export const updateTable =(
  id: number,
  name: string,
  type: number,
  disable: number,
  max_device: number,
  search_st: number,
  search_div: number
): Promise<any> => {
  const data = { id, name, type, disable, max_device, search_st, search_div };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabTableInfo/update", data);
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/TabTableInfo/update",
    data
  );
};


export const updateDevice =(
  id: number,
  station_id: number,
  division_id: number,
  path_id: number,
  digits: number
): Promise<boolean> => {
  const data = { id, station_id, division_id, path_id, decimal_part_digits: digits };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabDeviceInfo/update", data);
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/TabDeviceInfo/update",
    data
  );
};


export const getUnitGroupList = (): Promise<any> => {
  const params = { with_tab_device_preset: true };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/PageInfo/TabTablePreset/list", { params });
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    },
    'GET',
    "/FacReport/PageInfo/TabTablePreset/list",
    params
  );
};


export const updatePresetTable = (
    id: number,
    name: string,
    type: number,
    max_device: number,
    search_st: number,
    search_div: number
  ): Promise<any> => {
    const data = {
      id: id,
      name: name,
      type: type,
      max_device: max_device,
      search_st: search_st,
      search_div: search_div
    };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabTablePreset/update", data);
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/TabTablePreset/update",
    data
  );
};


export const updatePresetDevice = (
  id: number,
  station_id: number,
  division_id: number,
  path_id: number
): Promise<boolean> => {
  const data = {
    id: id,
    station_id: station_id,
    division_id: division_id,
    path_id: path_id
  };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabDevicePreset/update", data);
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/TabDevicePreset/update",
    data
  );
};


export const updateTabTimeInfo = (
  tab_name: string,
  times: string[]
): Promise<boolean> => {
  const data = { name: tab_name, times: times };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabInfo/update_times", data);
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/TabInfo/update_times",
    data
  );
};


export const updateTabUserTableInfo = (
  id: number,
  idx: number,
  name: string,
  type: number,
  disable: number,
  user_data: any = {}
): Promise<boolean> => {
  console.log("updateTabUserTableInfo", id, idx, name, type, disable, user_data);
  const data = { id, idx, name, type, disable, user_data };
  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/update_tab_user_table_info", data);
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    },
    'PUT',
    "/FacReport/PageInfo/update_tab_user_table_info",
    data
  );
};
