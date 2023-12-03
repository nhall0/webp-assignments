<script lang="ts">
import { defineComponent } from 'vue';
import { type Exercise, getExercises } from '@/model/exercises';

export default defineComponent({
  props: {
    exerciseSubList: {
      type: Array as () => number[],
      required: false,
    }
  },
  methods: {
    sendCallBack(exercise: Exercise) {
      this.$emit('call:back', exercise);
    },
  },
  setup() {
    return {
      getExercises
    };
  },
});
</script>

<template>
  <div class="exercise-list">
    <button v-for="exercise in getExercises(exerciseSubList)" :key="exercise.name" @click="sendCallBack(exercise)">
      {{ exercise.name }}
    </button>
  </div>
</template>

<style scoped>
.exercise-list {
  max-height: 400px;
  max-width: 400px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.exercise-list button {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  width: 95%;
  text-align: left;
}

.exercise-list button:hover {
  background-color: #e0e0e0;
}</style>