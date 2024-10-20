
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});


export const resetXmlDevice = (): Promise<any> => {
  return axiosInstance.get("/xml/downloadXml")
    .then(download => {
      if (download.data.success) {
        return axiosInstance.put("/report/device/resetDeviceInfo");
      }
    })
    .catch(error => {
      console.error("resetXmlDevice", error);
    });
};

export const getDeviceDict = (): Promise<any> => {
  return axiosInstance.get("/FacReport/Device/dict")
    .then(response => {
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};


export const getStationList = (): Promise<any> => {
  const params = { with_division: true };
  return axiosInstance.get("/FacReport/DeviceInfo/Station/list", { params })
    .then(response => {
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};


export const getDivisionList = (): Promise<any> => {
  return axiosInstance.get("/FacReport/DeviceInfoDivision/list")
    .then(response => {
      if (response.data.content.success)
        return response.data.content.data;
      else
        return false;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};


export const updateTab =(
  id: number,
  name: string,
  tbl_row: number,
  tbl_column: number,
  history_date: string,
): Promise<any> => {
  console.log("updateTab", id, name, tbl_row, tbl_column, history_date)
  return axiosInstance.put("/FacReport/PageInfo/TabInfo/update", {
    id: id,
    name: name,
    tbl_row: tbl_row,
    tbl_column: tbl_column,
    history_date: history_date,
  })
    .then(response => {
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
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
  return axiosInstance.put("/FacReport/PageInfo/TabTableInfo/update", {
    id: id,
    name: name,
    type: type,
    disable: disable,
    max_device: max_device,
    search_st: search_st,
    search_div: search_div
  })
    .then(response => {
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};


export const updateDevice =(
  id: number,
  station_id: number,
  division_id: number,
  path_id: number,
  digits: number
): Promise<boolean> => {
    
  const data = {
    id: id,
    station_id: station_id,
    division_id: division_id,
    path_id: path_id,
    decimal_part_digits: digits
  };
  return axiosInstance.put("/FacReport/PageInfo/TabDeviceInfo/update", data)
    .then(response => {
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};


export const getUnitGroupList = (): Promise<any> => {
  const params = { with_tab_device_preset: true };
  return axiosInstance.get("/FacReport/PageInfo/TabTablePreset/list", { params })
    .then(response => {
      if (response.data.content.success) {
        return response.data.content.data;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};


export const updatePresetTab = (
    id: number,
    name: string,
    type: number,
    max_device: number,
    search_st: number,
    search_div: number
  ): Promise<boolean> => {
    const data = {
      id: id,
      name: name,
      type: type,
      max_device: max_device,
      search_st: search_st,
      search_div: search_div
    };
    return axiosInstance.put("/FacReport/PageInfo/TabTablePreset/update", data)
      .then(response => {
      if (response.data.content.success) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
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

  return axiosInstance.put("/FacReport/PageInfo/TabDevicePreset/update", data)
    .then(response => {
    if (response.data.content.success) {
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    console.error(error);
    return false;
  });
};


export const updateTabTimeInfo = (
  tab_name: string,
  times: string[]
): Promise<boolean> => {
  const data = { name: tab_name, times: times };
  return axiosInstance.put("/FacReport/PageInfo/TabInfo/update_times", data)
    .then(res => {
      if (res.data.content.success)
        return true;
      else
        return false;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
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
  return axiosInstance.put("/FacReport/PageInfo/update_tab_user_table_info", data)
    .then(res => {
      if (res.data.content.success)
        return true;
      else
        return false;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};