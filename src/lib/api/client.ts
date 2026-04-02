import axios from "axios";
import { getApiBaseUrl } from "./base-url";

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});
