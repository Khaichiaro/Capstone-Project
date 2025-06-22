import axios from "axios";
import type { EatingHistoryInterface } from "../../interfaces/IEatingHistory";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {

    headers: {
  
      "Content-Type": "application/json",
  
      Authorization: `${Bearer} ${Authorization}`,
  
    },
  
  };

  async function CreatedEatingHistory(data: EatingHistoryInterface) {

    return await axios

      .post(`${apiUrl}/eating-history`, data, requestOptions)

      .then((res) => res)
  
      .catch((e) => e.response);
  
  }

  export {
    CreatedEatingHistory
  }