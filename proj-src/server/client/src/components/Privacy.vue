<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    privacy: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const showPrivateButton = ref(props.privacy === 2);
    const showFriendsOnlyButton = ref(props.privacy === 1);
    const showPublicButton = ref(props.privacy === 0);

    const setPrivacy = (value: number) => {
      showPrivateButton.value = value === 2;
      showFriendsOnlyButton.value = value === 1;
      showPublicButton.value = value === 0;
    };

    return {
      setPrivacy,
      showPrivateButton,
      showFriendsOnlyButton,
      showPublicButton,
    };
  },
});
</script>

<template>
  <div>
    <button @click="setPrivacy(2)" :class="{ 'is-active': privacy === 2 }" class="button is-danger"
      v-if="showPrivateButton">Private</button>
    <button @click="setPrivacy(1)" :class="{ 'is-active': privacy === 1 }" class="button is-warning"
      v-if="showFriendsOnlyButton">Friends Only</button>
    <button @click="setPrivacy(0)" :class="{ 'is-active': privacy === 0 }" class="button is-primary"
      v-if="showPublicButton">Public</button>
  </div>
</template>
  