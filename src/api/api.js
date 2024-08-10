import axios from "axios";

const API_URL_COUNTRY =
  "https://countriesnow.space/api/v0.1/countries/flag/images";
const API_URL_DETAIL = "https://countriesnow.space/api/v0.1/countries/currency";

const apiCountries = axios.create({ baseURL: API_URL_COUNTRY });
const apiDetail = axios.create({ baseURL: API_URL_DETAIL });

export const getCountry = () => apiCountries.get();
export const getDetail = () => apiDetail.get();
