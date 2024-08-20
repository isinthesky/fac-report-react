
import axios from "axios";
import { IDevice, TabPageInfotype, Unit, Preset, Item } from "../../static/types";

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
): Promise<any> => {
    try {

      await axiosInstance.put("/FacReport/PageInfo/TabDeviceInfo/update", {
        id: id,
        station_id: station_id,
        division_id: division_id,
        path_id: path_id
      });
      return true;
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


export const updateUnitGroupList = async (
    id: number,
    name: string,
    type: number,
    devices: Item[]
  ): Promise<any> => {
    try {
      return await axiosInstance.put("/FacReport/PageInfo/TabTablePreset/update", {
        id: id,
        name: name,
        type: type,
        max_device: devices.length,
        devices: devices
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
  