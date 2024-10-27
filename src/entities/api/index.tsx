import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'accept': 'application/json'
  }
});

export const setInitSettings = async (
  keyString: string,
  valueData: string
): Promise<any> => {
  try {
    await axiosInstance.post("/report/general/createSetting", {
      type: keyString,
      value: JSON.parse(valueData),
    });
  } catch (error) {
    console.error("setInitSettings", keyString, error);
  }
};

export const setResetSettings = async (): Promise<boolean> => {
  try {
    await axiosInstance.put("/report/general/resetSettings");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setDeleteSettings = async (): Promise<boolean> => {
  try {
    await axiosInstance.delete("/report/general/deleteSettings");
    return true;
  } catch (error) {
    console.error("setDeleteSettings", error);
    return false;
  }
};

export const setUpdateSettingsColRow = async (
  id: number,
  name: string,
  row: number,
  column: number
): Promise<any> => {
  try {
    console.log("setUpdateS", id, name, column, row)
    const response = await axiosInstance.put("/FacReport/PageInfo/TabInfo/update", {
      id: id,
      name: name,
      tbl_row: row,
      tbl_column: column
    });
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const setUpdateSettingsApprove = async (
  id: number,
  text: string,
  checked: number
): Promise<any> => {
  try {
    return await axiosInstance.put("/FacReport/PageInfo/TabApprove/update", {
      id: id,
      text: text,
      checked: checked
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
