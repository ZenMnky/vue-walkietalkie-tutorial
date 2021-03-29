<template>
  <div>
    <!-- slot prop. makes user data available to other components that consumes the User component -->
    <slot name="user" :user="user"></slot>
  </div>
</template>

<script>
// a way to create a reactive value
// similar yet different from reactive
import { ref } from '@vue/composition-api';
import { auth } from '../firebase';
export default {
  // setup state with setup lifecycle hoook
  setup() {
    // null means user is not signed in
    const user = ref(null);
    // listen for changes on user state
    // returns a state function
    // takes a callback function that fires when state is changed
    const unsubscribe = auth.onAuthStateChanged(
      firebaseUser => (user.value = firebaseUser)
    );
    return {
      user,
      unsubscribe,
    };
  },
  destroyed() {
    this.unsubscribe();
  },
};
</script>
