<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button @click="auth.signInAnonymously()">Sign In</button>
    <div v-if="newUser">
      <h3>Sign up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User</a>
    </div>
    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="newUser = true">Create Account</a>
    </div>
    <label for="email">Email</label><br />
    <input v-model="email" placeholder="email" type="email" class="input" />
    <label for="password">Password</label><br />
    <input v-model="password" type="password" class="input" />

    <br />

    <!-- is-loading class provided by Bulma -->
    <!-- vue has built in class directive  -->
    <button
      @click="signInOrCreateUser()"
      class="button is-info"
      :class="{ 'is-loading': loading }"
    >
      {{ newUser ? 'Sign Up' : 'Login' }}
    </button>
    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return {
      newUser: false,
      email: '',
      password: '',
      auth,
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = '';

      try {
        if (this.newUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
        this.errorMessage = error.message;
      }

      this.loading = false;
    },
  },
};
</script>
