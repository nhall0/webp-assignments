<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getUsers, type User , deleteUser} from '@/model/users';

export default defineComponent({
  setup() {
    const users = ref<User[]>([]);

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        users.value = fetchedUsers; 
        console.log(users.value)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const removeUser = async (user: string) => {
      try {
        await deleteUser(user);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    onMounted(fetchUsers); 

    return { users, removeUser };
  },
});
</script>

<template>
<div class="box">
    <h2 class="subtitle">User Management</h2>
    <td><button class="button is-small">Create New User</button></td>
    <table class="table is-fullwidth">
    <thead>
        <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="user in users" :key="user.username">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td v-if="user.role == 1">Admin</td>
        <td v-if="user.role == 0">User</td>
        <td><button class="button is-small">Edit</button></td>
        <td><button class="button is-small" @click="removeUser(user._id)">Delete</button></td>
        </tr>
    </tbody>
    </table>
</div>
<div class="box">
    <h2 class="subtitle">Statistics</h2>
    <ul>
    <li>Total Users: {{ users.length }}</li>
    </ul>
</div>
</template>

<style scoped>
.admin-page {
  padding: 20px;
}
</style>