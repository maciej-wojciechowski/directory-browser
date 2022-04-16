import { create } from "axios";

export const axiosInstance = create({
  baseURL: "https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories",
});
