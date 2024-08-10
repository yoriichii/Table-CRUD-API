<template>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box max-w-[43rem] min-h-[300px]">
      <h3 class="text-lg font-bold">Deatil</h3>
      <div class="modal-action">
        <form method="dialog">
          <ul v-for="(deatil, index) in countryDetail" :key="index">
            <li>{{ index + 1 }}</li>
            <li>{{ deatil.currency }}</li>
          </ul>
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getDetail } from "../api/api";
onMounted(() => {
  fetchCountriesDetail();
});

const countryDetail = ref([]);

const fetchCountriesDetail = async () => {
  const res = await getDetail();
  if (res.data.data && res.data.data.length > 0) {
    countryDetail.value = res.data.data[0];
  }
};
</script>

<style scoped>
input {
  width: 220px;
}
</style>
