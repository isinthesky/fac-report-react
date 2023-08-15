import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const postDailyData = async (
  yy: number,
  mm: number,
  dd: number
): Promise<Object> => {
  try {
    const res = await axiosInstance.post("/report", {
      type: "daily",
      year: yy,
      month: mm,
      date: dd,
    });

    console.info("getDailyData", res);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};
