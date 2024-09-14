import axios from "axios";
import { ApprovalsType} from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json' 
  }
});


export const get_page_list = async (): Promise<any> => {
  try {
    const params = { with_tab_table_info: true,
      with_tab_device_info: false,
      with_tab_device_value: false
     };
    const response = await axiosInstance.get("/FacReport/PageInfo/TabInfo/list", { params });

    if (response.data.content.success)
      return response.data.content.data;
    else
      return false;
  } catch (error) {
    console.error("get_page_list: ", error);
    return false;
  }
};


export const get_page_setting = async (tabName: string, withValue: boolean, withPreset: boolean): Promise<any> => {
  try {
    console.log("get_page_setting call", tabName, withValue)
    const params = {
        tab_name: tabName,
        with_table_info: true,
        with_device_info: true,
        with_device_value: withValue,
        with_device_preset: withPreset
      };
      const response = await axiosInstance.get("/FacReport/PageInfo/get_page_setting", { params });

      if (response.data.content.success)
        return response.data.content.data;
      else
        return false;
  } catch (error) {
    console.error("get_page_setting", error);
    return false;
  }
};


export const get_page_time_list = async (tabName: string): Promise<any> => {
  try {
    const params = { tab_name: tabName };
    const url = "/FacReport/PageInfo/TabTimeInfo/list";
    const response = await axiosInstance.get(url, { params });
    if (response.data.content.success) {
      return response.data.content.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("get_page_time_list", error);
    return false;
  }
};


export const updateTabDate = async (tabName: string, date: string): Promise<any> => {
  try {
    const url = "/FacReport/PageInfo/TabInfo/update_history_date";
    const data = { name: tabName, history_date: date };
    const response = await axiosInstance.put(url, data);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("updateTabDate", error);
    return false;
  }
};


export const set_page_approve_list = async (tabName: string, level: number, text: string, checked: number, tab_info_id: number): Promise<any> => {
  try {
    console.log("set_page_approve_list1", tabName, level, text, checked, tab_info_id)
    const params = { tab_name: tabName, level: level, text: text, checked: checked, tab_info_id: tab_info_id };
    const url = "/FacReport/PageInfo/TabApprove/create";
    const response = await axiosInstance.post(url, { params });
    if (response.data.content.success) {
      console.log("set_page_approve_list2", response.data.content.data)
      return response.data.content.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("get_page_approve_list", error);
    return false;
  }
};


export const update_page_approve = async (name: string, approves: ApprovalsType[]): Promise<boolean> => {
  try {
    const url = "/FacReport/PageInfo/TabInfo/update_approves";
    const data = { name: name, approves: approves };
    const response = await axiosInstance.put(url, data);
    if (response.data.content.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("get_page_approve_list", error);
    return false;
  }
};


export const update_tab_device_value = async (tabName: string): Promise<any> => {
  try {
    const url = "/FacReport/PageInfo/update_tab_device_value";
    const data = { tab_name: tabName, tab_table_idx: 0, tab_device_idx: 0 };
    const response = await axiosInstance.put(url, data);
    if (response.data.content.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("update_tab_device_value", error);
    return false;
  }
};