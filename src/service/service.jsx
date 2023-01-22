import axios from "axios";

const serverPath = "http://127.0.0.1:5000/";

const getMostPopularDistricts = () => {
  return axios.get(serverPath + "most_popular_districts");
};

const getDistrictByPrice = () => {
    return axios.get(serverPath + "district_per_price");
  };

export const scraperService = {
  getMostPopularDistricts,
  getDistrictByPrice
};
