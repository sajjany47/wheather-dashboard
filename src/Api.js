import axios from "axios";
import { apiKey, apiPath } from "./shared/Constant";

export class ApiService {
  constructor() {
    this.headers = {
      "Content-type": "application/json",
    };
  }

  currentWheather = async (payload) => {
    try {
      const response = await axios.get(
        `${apiPath}current.json?key=${apiKey}&q=${payload}&aqi=yes`,
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  forcastDetails = async (payload, number) => {
    try {
      const response = await axios.get(
        `${apiPath}forecast.json?key=${apiKey}&q=${payload}&days=${number}&aqi=yes&alerts=no`,
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  searchReason = async (payload) => {
    try {
      const response = await axios.get(
        `${apiPath}search.json?key=${apiKey}&q=${payload}`,
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };

  historyWheather = async (payload, date) => {
    try {
      const response = await axios.get(
        `${apiPath}history.json?key=${apiKey}&q=${payload}&dt=${date}`, //2024-06-28 date format
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error) {
      const err = error;
      throw err;
    }
  };
}
