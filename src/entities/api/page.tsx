import axios from "axios";
import { ApprovalsType} from "@/types/types";
import { SERVER_URL } from "@/config/env";
import { withAPILogging } from "@/utils/logger/withAPILogging";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json' 
  }
});

export const get_page_list = async (): Promise<any> => {
  const params = { 
    with_tab_table_info: true,
    with_tab_device_info: false,
    with_tab_device_value: false
  };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/PageInfo/TabInfo/list", { params });
      return response.data.content.success ? response.data.content.data : false;
    },
    'GET',
    "/FacReport/PageInfo/TabInfo/list",
    params
  );
};

export const get_page_setting = async (tabName: string, withValue: boolean): Promise<any> => {
  const params = {
    tab_name: tabName,
    with_table_info: true,
    with_device_info: true,
    with_device_value: withValue,
    with_device_preset: false
  };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/PageInfo/get_page_setting", { params });
      return response.data.content.success ? response.data.content.data : false;
    },
    'GET',
    "/FacReport/PageInfo/get_page_setting",
    params
  );
};

export const get_page_time_list = async (tabName: string): Promise<any> => {
  const params = { tab_name: tabName };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/PageInfo/TabTimeInfo/list", { params });
      return response.data.content.success ? response.data.content.data : false;
    },
    'GET',
    "/FacReport/PageInfo/TabTimeInfo/list",
    params
  );
};

export const updateTabDate = async (tabName: string, date: string): Promise<any> => {
  const data = { name: tabName, history_date: date };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabInfo/update_history_date", data);
      return response ? true : false;
    },
    'PUT',
    "/FacReport/PageInfo/TabInfo/update_history_date",
    null,
    data
  );
};

export const update_page_approve = async (name: string, approves: ApprovalsType[]): Promise<boolean> => {
  const data = { name, approves };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabInfo/update_approves", data);
      return response.data.content.success;
    },
    'PUT',
    "/FacReport/PageInfo/TabInfo/update_approves",
    null,
    data
  );
};

export const update_tab_device_value = async (tabName: string): Promise<any> => {
  const data = { 
    tab_name: tabName, 
    tab_table_idx: 0, 
    tab_device_idx: 0 
  };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/update_tab_device_value", data);
      return response.data.content.success;
    },
    'PUT',
    "/FacReport/PageInfo/update_tab_device_value",
    null,
    data
  );
};

export const get_history_page_setting = async (tabName: string, date: string): Promise<any> => {
  const params = {
    tab_name: tabName,
    target_date: date,
    with_table_info: true,
    with_device_info: true,
    with_device_value: true,
  };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/HistoryPageInfo/get_page_setting", { params });
      return response.data.content.success ? response.data.content.data : false;
    },
    'GET',
    "/FacReport/HistoryPageInfo/get_page_setting",
    params
  );
};

export const update_tab_user_table_info = async (id: number, name: string, type: number, disable: number, user_data: any): Promise<any> => {
  const data = { id: id, name: name, type: type, disable: disable, user_data: user_data };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabUserTableInfo/update", data);
      return response.data.content.success;
    },
    'PUT',
    "/FacReport/PageInfo/TabUserTableInfo/update",
    null,
    data
  );
};

export const save_page_setting = async (tabName: string): Promise<any> => {
  const data = { tab_name: tabName };

  return withAPILogging(
    async () => {
      const response = await axiosInstance.get("/FacReport/HistoryPageInfo/save_page_setting", { params: data });
      return response.data.content.success;
    },
    'GET',
    "/FacReport/HistoryPageInfo/save_page_setting",
    null,
    data
  );
};

export const reset_tab_user_table_info = async (tabName: string): Promise<any> => {
  const data = { tab_name: tabName };

  console.log("reset_tab_user_table_info", data);

  return withAPILogging(
    async () => {
      const response = await axiosInstance.put("/FacReport/PageInfo/TabUserTableInfo/reset", data);
      return response.data.content.success;
    },
    'PUT',
    "/FacReport/PageInfo/TabUserTableInfo/reset",
    null,
    data
  );
};
