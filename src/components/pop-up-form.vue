<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box max-w-[43rem]">
      <div class="flex gap-2">
        <img v-if="flag" :src="flag" alt="Country Flag" class="w-10" />
        <h3 class="font-bold text-lg">{{ title }}</h3>
      </div>
      <div class="">
        <table>
          <tr>
            <td>Official Name :</td>
            <td>
              <span class="bind-text">{{ official }}</span>
            </td>
          </tr>

          <tr>
            <td>Population :</td>
            <td>
              <span class="bind-text">{{ population }}</span>
            </td>
          </tr>

          <tr>
            <td>Capital :</td>
            <td>
              <span class="bind-text">{{ capital }}</span>
            </td>
          </tr>

          <tr>
            <td>Currency :</td>
            <td>
              <span class="bind-text">{{ currencies }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <a :href="googleMaps" target="_blank" class="underline font-bold"
                >Country Map</a
              >
            </td>
          </tr>
        </table>
      </div>
      <button class="btn mt-8 float-end" @click="closeModal">Close</button>
    </div>
  </dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const modal = ref(null);
const props = defineProps({
  title: String,
  flag: String,
  population: String,
  capital: String,
  official: String,
  currencies: String,
  googleMaps: String,
});
const openModal = () => {
  modal.value.showModal();
};
const closeModal = () => {
  modal.value.close();
};

defineExpose({ openModal, closeModal });
</script>

<style scoped>
td {
  padding-top: 1.5rem;
}

.bind-text {
  opacity: 75%;
}
</style>
