<template>
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
  <div>
    <div class="overflow-x-auto">
      <table class="table" v-if="filteredCountries.length">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>No.</th>
            <th>Name</th>
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
                :src="country.flag"
                :alt="`${country.name}`"
                width="50"
                height="30"
              />
            </td>
            <td>{{ country.name }}</td>
            <td>
              <button onclick="my_modal_1.showModal()">
                <img src="../assets/edit.png" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No matching countries found.</p>
    </div>
  </div>
  <popUpForm />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getCountry, getDetail } from "../api/api";
import popUpForm from "./pop-up-form.vue";
const countries = ref([]);
const isSearchMatch = ref("");

onMounted(() => {
  fetchCountries();
});

const fetchCountries = async () => {
  try {
    const response = await getCountry();
    countries.value = response.data.data;
    //NOTE -  make sure just bind this data
    // countries.value = response.data.data.map((country) => ({
    //   name: country.name,
    //   flag: country.flag,
    // }));
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

const filteredCountries = computed(() => {
  return countries.value.filter((country) =>
    country.name.toLowerCase().includes(isSearchMatch.value.toLowerCase())
  );
});
</script>

<style lang="scss" scoped></style>
