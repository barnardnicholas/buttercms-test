import axios from "axios";
import { apiKey } from "./auth/auth";

const baseURL = "https://api.buttercms.com/v2/content";

const headers = {
  authorization: `Token ${apiKey}`,
  "Content-Type": "application/json"
};

export const generateUid = () => {
  const authOptions = {
    method: "GET",
    url: `${baseURL}/restaurants`,
    headers
  };
  return axios(authOptions).then(response => {
    const { count } = response.data.meta;
    return count + 1;
  });
};

export const getAllRestaurants = () => {
  const authOptions = {
    method: "GET",
    url: `${baseURL}/restaurants`,
    headers
  };
  return axios(authOptions).then(response => {
    const { meta } = response.data;
    const { restaurants } = response.data.data;
    return { meta, restaurants };
  });
};

export const postRestaurant = data => {
  console.log("postRestaurant");
  console.log(data);
  const authOptions = {
    method: "POST",
    url: `${baseURL}/`,
    data,
    headers
  };
  return axios(authOptions).then(response => {
    console.log("postRestaurant response");
    console.log(response);
    return response;
  });
};
