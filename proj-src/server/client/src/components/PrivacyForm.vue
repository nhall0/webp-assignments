<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    privacy: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setPrivacy(value: number) {
      this.$emit('update:privacy', value);
    },
  },
});
</script>

<template>
  <div class="has-text-centered">
    <button @click="setPrivacy(2)" :class="{ 'is-active': privacy === 2 }" class="button is-rounded">Private</button>
    <button @click="setPrivacy(1)" :class="{ 'is-active': privacy === 1 }" class="button is-rounded">Friends Only</button>
    <button @click="setPrivacy(0)" :class="{ 'is-active': privacy === 0 }" class="button is-rounded">Public</button>
  </div>
</template>

<style scoped>
.has-text-centered {
  text-align: center;
  padding: 20px;
}

.button.is-active {
  background-color: #3273dc;
  /* Nicer background color, e.g., a shade of blue */
  color: #fff;
  /* Nicer text color, e.g., white */
}

.is-rounded {
  border-radius: 20px;
}
</style>
