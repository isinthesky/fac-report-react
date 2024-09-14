
import axios from "axios";

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


export const updateTab = async(
  id: number,
  name: string,
  tbl_row: number,
  tbl_column: number,
  history_date: string,
): Promise<any> => {
    try {
      console.log("updateTab", id, name, tbl_row, tbl_column, history_date)
      await axiosInstance.put("/FacReport/PageInfo/TabInfo/update", {
        id: id,
        name: name,
        tbl_row: tbl_row,
        tbl_column: tbl_column,
        history_date: history_date,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const updateTable = async(
  id: number,
  name: string,
  type: number,
  disable: number,
  max_device: number,
  search_st: number,
  search_div: number
): Promise<any> => {
    try {
      console.log("updateTable", id, name, type, disable, max_device, search_st, search_div)
      await axiosInstance.put("/FacReport/PageInfo/TabTableInfo/update", {
        id: id,
        name: name,
        type: type,
        disable: disable,
        max_device: max_device,
        search_st: search_st,
        search_div: search_div
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const updateDevice = async(
  id: number,
  station_id: number,
  division_id: number,
  path_id: number
): Promise<boolean> => {
    try {
      const data = {
        id: id,
        station_id: station_id,
        division_id: division_id,
        path_id: path_id
      };
      const res = await axiosInstance.put("/FacReport/PageInfo/TabDeviceInfo/update", data);
      
      if (res.data.content.success)
        return true;
      else
        return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const getUnitGroupList = async (): Promise<any> => {
    try {
      const params = { with_tab_device_preset: true };
      const response = await axiosInstance.get("/FacReport/PageInfo/TabTablePreset/list", { params });
      
      if (response.data.content.success)
        return response.data.content.data;
      else
        return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const updatePresetTab = async (
    id: number,
    name: string,
    type: number,
    max_device: number,
    search_st: number,
    search_div: number
  ): Promise<boolean> => {
    try {
      const data = {
        id: id,
        name: name,
        type: type,
        max_device: max_device,
        search_st: search_st,
        search_div: search_div
      };
      const res = await axiosInstance.put("/FacReport/PageInfo/TabTablePreset/update", data);
      
      if (res.data.content.success)
        return true;
      else
        return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


export const updatePresetDevice = async (
  id: number,
  station_id: number,
  division_id: number,
  path_id: number
): Promise<boolean> => {
  try {
    const data = {
      id: id,
      station_id: station_id,
      division_id: division_id,
      path_id: path_id
    };

    const res = await axiosInstance.put("/FacReport/PageInfo/TabDevicePreset/update", data);
      
    if (res.data.content.success)
      return true;
    else
      return false;
    
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const updateTabTimeInfo = async (
  tab_name: string,
  times: string[]
): Promise<boolean> => {
  try {
    const data = { name: tab_name, times: times };
    const res =  await axiosInstance.put("/FacReport/PageInfo/TabInfo/update_times", data);
    
    if (res.data.content.success)
      return true;
    else
      return false;
    
  } catch (error) {
    console.error(error);
    return false;
  }
};
