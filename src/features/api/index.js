import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const postDailyData = async (date) => {
  console.log("getDailyData", date);

  const res = await axiosInstance.post("/report", { type: "day", date: date });

  //   const response = await axiosInstance.post("/api/auth/signin", {
  //     email,
  //     password,
  //   });

  console.log("getDailyData", res);

  //if (res.ok) return true;

  return false;
};
