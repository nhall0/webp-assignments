<script setup lang="ts">
import FriendsList from '@/components/FriendsList.vue';
import { getSession } from '@/model/session';
import { ref, computed} from 'vue';
import { getFriendsByUser, addFriend, getUsersByFirstLetters, type User} from '@/model/users';
import { OField, OAutocomplete } from '@oruga-ui/oruga-next'

const user = getSession().user;

if (!user) {
  throw new Error('User is not logged in');
}

const users = ref([] as User[]);

const current_user_name = ref("");
const last_user_name = ref("");
const selected = ref("");

const friends = ref([] as User[]);

const getFilteredUsers = async () => {
  try {
    const temp_users = await getUsersByFirstLetters(current_user_name.value);
    users.value = temp_users;

  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const filterDataArray = computed( () => {
  //GET FILTERED DATA
  if(current_user_name.value != last_user_name.value){
    last_user_name.value = current_user_name.value;
    getFilteredUsers();
  }
  var searched_users = users.value.filter(
    (option) => option.username.toLowerCase().indexOf(current_user_name.value.toLowerCase()) > -1
    )

  var searched_usernames = searched_users.map((option) => option.email)
  searched_usernames = searched_usernames.slice(0, 3)
  return searched_usernames
});

const fetchFriends = async () => {
  try {
    friends.value = await getFriendsByUser();
  } catch (error) {
    console.error('Error fetching friends:', error);
  }
};

const addFriendWrapper = async (email: string) => {
  try {
    await addFriend(email);
    fetchFriends();
  } catch (error) {
    console.error('Error adding friend:', error);
    alert('Error adding friend');
  }
};

fetchFriends();
</script>

<template>
  <div class="friends-page">
    <section class="section">
      <div class="container">
        <h1 class="title has-text-success">Your Friends</h1>

        <section>
          <label class="label">Search here : </label> 
            <o-field>
                <o-autocomplete
                    v-model="current_user_name"
                    rounded
                    expanded
                    size="large"
                    placeholder="Enter your friend's name"
                    icon="search"
                    clearable
                    open-on-focus
                    :data="filterDataArray"
                    @select="(value: string | number) => (selected = value.toString())">
                    <template #empty>No results found</template>
                </o-autocomplete>
            </o-field>

            <p class="label" style="margin-top: 80px;"><b>Selected:</b> {{ selected }}</p>
        </section>

        <div class="add-friend">
          <button class="button is-success" @click="addFriendWrapper(current_user_name)">Add Friend</button>
        </div>

        <FriendsList :friends="friends"/>
      </div>
    </section>
  </div>
</template>

<style scoped>

.friends-page {
  margin-top: 20px;
}

.add-friend {
  margin-top: 20px;
}

.label {
  margin-top: 20px;
}

</style>
