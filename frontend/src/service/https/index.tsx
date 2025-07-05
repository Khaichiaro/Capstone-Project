import axios from "axios";
import type { UserProfileInterface } from "../../interfaces/IUserProfile";
import type { UserInterface } from "../../interfaces/IUser";
import type { NutritionGoalInterface } from "../../interfaces/INutritionGoal";
import type { UserActivityInterface } from "../../interfaces/IUserActivity";
import type { DailyNutrientSumInterface } from "../../interfaces/IDailyNutrientSum";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
    headers: {
        "Content-type": "application/json",
        Authorization: `${Bearer} ${Authorization}`,
    }
}

//User
async function ListUsers() {
    return await axios
        .get(`${apiUrl}/users`, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function GetUserByID(id: string) {
    return await axios
    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function CreateUser(data: UserInterface) {
    return await axios
    .post(`${apiUrl}/user`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function UpdateUser(id:string, data: UserInterface) {
    return await axios
    .patch(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//UserProfile
async function ListProfiles() {
    return await axios
    .get(`${apiUrl}/profiles`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function GetUserProfileByID(id: string) {
    return await axios
    .get(`${apiUrl}/profile/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function CreateUserProfile(data: UserProfileInterface) {
    return await axios
    .post(`${apiUrl}/profile`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function UpdateUserProfile(id: string, data: UserProfileInterface) {
    return await axios
    .patch(`${apiUrl}/profile/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//ActivityLevel
async function ListActivityLevels() {
    return await axios
    .get(`${apiUrl}/activity-levels`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//ActivityType
async function ListActivityTyeps() {
    return await axios
    .get(`${apiUrl}/activity-types`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function GetActivityTypeByID(id: string) {
    return await axios
    .get(`${apiUrl}/activity-type/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//Gender
async function ListGenders() {
    return await axios
    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//Level
async function ListLevels() {
    return await axios
    .get(`${apiUrl}/levels`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function GetLevelByUserProfileID(id: string) {
    return await axios
    .get(`${apiUrl}/level/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//NutritionGoal
async function ListNutritionGoals() {
    return await axios
        .get(`${apiUrl}/nutrition-goals`, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function GetNutritionGoalByID(id: string) {
    return await axios
        .get(`${apiUrl}/nutrition-goal/${id}`, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function GetNutritionGoalByUserID(id: string) {
    return await axios
        .get(`${apiUrl}/user/${id}/nutrition-goal`, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function CreateNutritionGoal(data: NutritionGoalInterface) {
    return await axios
        .post(`${apiUrl}/nutrition-goal`, data, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function UpdateNutritionGoal(id: string, data: NutritionGoalInterface) {
    return await axios
        .patch(`${apiUrl}/nutrition-goal/${id}`, data, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

//UserActivity
async function ListUserActivities() {
    return await axios
        .get(`${apiUrl}/user-activities`, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function GetUserActivityByID(id: string) {
    return await axios
    .get(`${apiUrl}/user-activity/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function CreateUserActivity(data: UserActivityInterface) {
    return await axios
    .post(`${apiUrl}/user-activity`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

//DailyNutrientSum
async function ListDailyNutrientSums() {
    return await axios
        .get(`${apiUrl}/daily-nutrients`, requestOptions)
        .then((res) => res)
        .catch((e) => e.response);
}

async function GetDailyNutrientSumByID(id: string) {
    return await axios
    .get(`${apiUrl}/daily-nutrients/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

async function GetDailyNutrientSumByUserID(id:string) {
    return await axios
    .get(`${apiUrl}/user/${id}/daily-nutrient`)
    .then((res) => res)
    .catch((e) => e.response)
}

async function CreateDailyNutrientSum(data: DailyNutrientSumInterface) {
    return await axios
    .post(`${apiUrl}/daily-nutrient`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response)
}

export{
    //User
    ListUsers,
    GetUserByID,
    CreateUser,
    UpdateUser,
    //UserProfile
    ListProfiles,
    GetUserProfileByID,
    CreateUserProfile,
    UpdateUserProfile,
    //ActivityLevel
    ListActivityLevels,
    //ActivityType
    ListActivityTyeps,
    GetActivityTypeByID,
    //Gender
    ListGenders,
    //Level
    ListLevels,
    GetLevelByUserProfileID,
    //NutritionGoal
    ListNutritionGoals,
    GetNutritionGoalByID,
    GetNutritionGoalByUserID,
    CreateNutritionGoal,
    UpdateNutritionGoal,
    //UserActivity
    ListUserActivities,
    GetUserActivityByID,
    CreateUserActivity,
    //DailyNutrientSum
    ListDailyNutrientSums,
    GetDailyNutrientSumByID,
    GetDailyNutrientSumByUserID,
    CreateDailyNutrientSum
}