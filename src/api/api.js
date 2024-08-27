import axios from "axios";

const API_URL_COUNTRY = "https://restcountries.com/v3.1/all";

const apiCountries = axios.create({ baseURL: API_URL_COUNTRY });

export const getCountry = () => apiCountries.get();
