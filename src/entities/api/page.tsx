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


export const get_page_setting = async (tabName: string, withValue: boolean): Promise<any> => {
  try {
    const params = {
        tab_name: tabName,
        with_table_info: true,
        with_device_info: true,
        with_device_value: withValue,
        with_device_preset: false
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


export const update_page_approve = async (name: string, approves: ApprovalsType[]): Promise<boolean> => {
  try {
    console.log("update_page_approve call", name, approves)
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


export const get_history_page_setting = async (tabName: string, date: string): Promise<any> => {
  try {
    const params = {
        tab_name: tabName,
        target_date: date,
        with_table_info: true,
        with_device_info: true,
        with_device_value: true,
      };
      const response = await axiosInstance.get("/FacReport/HistoryPageInfo/get_page_setting", { params });

      if (response.data.content.success)
        return response.data.content.data;
      else
        return false;
  } catch (error) {
    console.error("get_history_page_setting", error);
    return false;
  }
};

export const update_tab_user_table_info = async (id: number, name: string, type: number, disable: number, user_data: any): Promise<any> => {
  try {
    const url = "/FacReport/PageInfo/TabUserTableInfo/update";
    const data = { id: id, name: name, type: type, disable: disable, user_data: user_data };
    const response = await axiosInstance.put(url, data);
    if (response.data.content.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("update_tab_user_table_info", error);
    return false;
  }
};

export const save_page_setting = async (tabName: string): Promise<any> => {
  try {
    const url = "/FacReport/HistoryPageInfo/save_page_setting";
    const data = { tab_name: tabName };
    const response = await axiosInstance.get(url, { params: data });
    if (response.data.content.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("save_page_setting", error);
    return false;
  }
};

export const reset_tab_user_table_info = async (tabName: string): Promise<any> => {
  try {
    const url = `/FacReport/PageInfo/TabUserTableInfo/reset?tab_name=${tabName}`;
    const response = await axiosInstance.put(url);
    if (response.data.content.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("reset_tab_user_table_info", error);
    return false;
  }
};

