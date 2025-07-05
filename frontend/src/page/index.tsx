// import axios from "axios";
// <<<<<<<< HEAD:frontend/src/page/index.tsx
// import type { IMeals } from "../interfaces/IMeals";
// ========
// import type { IMeals } from "../../interfaces/IMeals";
// import type { ILike } from "../../interfaces/ILike";
// >>>>>>>> rec:frontend/src/services/https/index.tsx

// const apiUrl = "http://localhost:8000";
// const Authorization = localStorage.getItem("token");
// const Bearer = localStorage.getItem("token_type");

// const requestOptions = {
//   headers: {
//     "Content-Type": "application/json",

//     Authorization: `${Bearer} ${Authorization}`,
//   },
// };

// //User
// async function GetUserById(userId: number) {
//   return await axios
//     .get(`${apiUrl}/users/${userId}`, requestOptions)
//     .then((res) => res)
//     .catch((e) => e.response);
// }

// async function CreatedMeals(data: IMeals) {
//   return await axios

//     .post(`${apiUrl}/meals`, data, requestOptions)

//     .then((res) => res)

//     .catch((e) => e.response);
// }

// //FoodRecommend
// async function GetAllFoodRecommend() {
//   return await axios
//     .get(`${apiUrl}/foodRecommend`, requestOptions)
//     .then((res) => res)
//     .catch((e) => e.response);
// }

// async function GetAllFoodRecommendWithRanking() {
//   return await axios
//     .get(`${apiUrl}/foodRanking`, requestOptions)
//     .then((res) => res)
//     .catch((e) => e.response);
// }

// async function toggleLike(like: ILike) {
//   try {
//     const res = await axios.post(`${apiUrl}/toggleLike`, like);
//     return res.data;
//   } catch (error: any) {
//     console.error("Error toggleLike:", error);
//     throw error.response?.data || error.message;
//   }
// }

// async function checkLikeStatus(userId: number, foodRecommendId: number) {
//   const res = await axios.get(`${apiUrl}/checkLikeStatus/${userId}/${foodRecommendId}`, requestOptions);
//   return res.data; // true หรือ false
// };

// export {
//   //User
//   GetUserById,

//   //EatingHistory
//   CreatedMeals,

//   //FoodRecommend
//   GetAllFoodRecommend,
//   GetAllFoodRecommendWithRanking,
//   toggleLike,
//   checkLikeStatus,
// };
