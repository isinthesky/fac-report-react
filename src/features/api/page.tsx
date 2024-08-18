import axios from "axios";
import { ApprovalsType} from "../../static/types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'accept': 'application/json'
  }
});

export const get_page_setting = async (tabName: string): Promise<any> => {
  try {
    const params = {
        tab_name: tabName,
        with_table_info: true,
        with_device_info: true
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


export const get_page_list = async (): Promise<any> => {
  try {
    console.log("get_page_list call")
    const params = { with_tab_table_info: true };
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


export const get_page_time_list = async (tabName: string): Promise<any> => {
  try {
    const params = { tab_name: tabName };
    const response = await axiosInstance.get("/PageInfo/TabTimeInfo/list", { params });

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