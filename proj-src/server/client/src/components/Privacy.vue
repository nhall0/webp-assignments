<template>
  <div>
    <button @click="setPrivacy(2)" :class="{ 'is-active': privacy === 2 }" class="button is-danger">Private</button>
    <button @click="setPrivacy(1)" :class="{ 'is-active': privacy === 1 }" class="button is-warning">Friends Only</button>
    <button @click="setPrivacy(0)" :class="{ 'is-active': privacy === 0 }" class="button is-primary">Public</button>
  </div>
</template>

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

<style scoped>
/* You can add any additional styles here */
.button.is-active {
  background-color: green;
  color: white;
}
</style>
