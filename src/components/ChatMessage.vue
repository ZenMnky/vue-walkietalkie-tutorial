<template>
  <div class="message" :class="{ 'from-user': owner }">
    {{ message.text }} <br />
    <audio v-if="message.audioURL" :src="message.audioURL" controls></audio
    ><br />
    <br />
    <span class="sender"> from UID {{ message.sender }}</span>
  </div>
</template>

<script>
export default {
  props: ['message', 'owner'],
};
</script>

<style scoped>
.message {
  background: #dddddd;
  color: black;
  margin-right: 10px;
  margin-left: auto;
  border-radius: 5px;
  padding: 12px;
}
.from-user {
  margin-left: 10px;
  margin-right: auto;
  background: #91bbff;
}
.sender {
  font-size: 0.5rem;
}
</style>
