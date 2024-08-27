<template>
  <div>
    <div class="flex justify-end mr-2 gap-2">
      <label class="input input-bordered flex items-center gap-2">
        <input
          v-model="isSearchMatch"
          type="text"
          class="grow"
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>
    
    <div class="overflow-x-auto">
      <table class="table" v-if="filteredCountries.length">
        <thead>
          <tr>
            <th>No.</th>
            <th>Country Flag</th>
            <th>Country Name</th>
            <th>Language</th>
            <th>Region</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(country, index) in filteredCountries"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="country.flags.png"
                :alt="`${country.name.common}`"
                width="50"
                height="30"
              />
            </td>
            <td>{{ country.name.common }}</td>
            <td>{{ getLanguages(country.languages) }}</td>
            <td>{{ country.region }}</td>
            <td>
              <button
                @click="showCountryDetails(country)"
                class="tooltip tooltip-bottom"
                data-tip="Detail"
              >
                <img src="../assets/edit.png" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center text-xl mt-5">
        No matching countries found.
      </p>
    </div>
  </div>
  <popUpForm
    ref="countryModal"
    :title="displayCountry.title"
    :flag="displayCountry.flag"
    :population="displayCountry.population"
    :capital="displayCountry.capital"
    :official="displayCountry.official"
    :currencies="displayCountry.currencies"
    :googleMaps="displayCountry.googleMaps"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getCountry } from "../api/api";
import popUpForm from "./pop-up-form.vue";

const countries = ref([]);
const isSearchMatch = ref("");
const countryModal = ref(null);
const displayCountry = ref("");

onMounted(() => {
  fetchCountries();
});

const fetchCountries = async () => {
  try {
    const response = await getCountry();
    countries.value = response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

const filteredCountries = computed(() => {
  return countries.value.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(isSearchMatch.value.toLowerCase())
  );
});

const getLanguages = (languages) => {
  return languages ? Object.values(languages)[0] : [];
};

const showCountryDetails = (country) => {
  displayCountry.value = {
    title: country.cca2,
    flag: country.flags.png,
    population: country.population,
    capital: Array.isArray(country.capital)
      ? country.capital[0]
      : country.capital,
    official: country.name.official,
    currencies: Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", "),
    googleMaps: country.maps.googleMaps,
  };

  if (countryModal.value) {
    countryModal.value.openModal();
  }
};
</script>

<style lang="scss" scoped></style>
