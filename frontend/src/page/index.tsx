import axios from "axios";
import type { IMeals } from "../interfaces/IMeals";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {

    headers: {
  
      "Content-Type": "application/json",
  
      Authorization: `${Bearer} ${Authorization}`,
  
    },
  
  };

  //User
  async function GetUserById(userId: number) {
    return await axios
      .get(`${apiUrl}/users/${userId}`, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }

  async function CreatedMeals(data: IMeals) {

    return await axios

      .post(`${apiUrl}/meals`, data, requestOptions)

      .then((res) => res)
  
      .catch((e) => e.response);
  
  }

  export {
    
    //User
    GetUserById,

    //EatingHistory
    CreatedMeals
  }