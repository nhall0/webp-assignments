<script lang="ts">
import { defineComponent } from 'vue';

import UserAdminList from '@/components/UserAdminList.vue';

export default defineComponent({
  components: {
    UserAdminList
  }
});
</script>

<template>
  <div class="friends-page">
    <section class="section">
    <h1 class="title">Admin Page</h1>

      <UserAdminList />
    </section>
  </div>  
</template>

<style>

</style>