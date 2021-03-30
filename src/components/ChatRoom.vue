<template>
  <main class="section">
    <h3>Welcome to ChatRoom {{ chatId }}</h3>

    <User #user="{ user }">
      <ul>
        <li v-for="message of messages" :key="message.id">
          <ChatMessage
            :message="message"
            :owner="user.uid === message.sender"
          />
        </li>
      </ul>

      <input v-model="newMessageText" class="input" />
      <br />
      <h5>Record Audio</h5>
      <button v-if="!recorder" @click="record()">Record</button>
      <button v-else @click="stop()">Stop</button>
      <audio v-if="newAudio" :src="newAudioURL" controls></audio>
      <br />
      <button
        :disabled="!newMessageText || loading"
        class="button is-success"
        type="text"
        @click="addMessage(user.uid)"
      >
        Send
      </button>
    </User>
  </main>
</template>

<script>
import User from './User';
import ChatMessage from './ChatMessage';
import { db } from '../firebase';

export default {
  components: {
    User,
    ChatMessage,
  },
  data() {
    return {
      newMessageText: '',
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection('messages');
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy('createdAt').limitToLast(10),
    };
  },
  methods: {
    async addMessage(uid) {
      this.loading = true;

      const { id: messageId } = this.messagesCollection.doc();

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
      });
      this.loading = false;
      this.newMessageText = '';
    },
    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: 'audio/webm' };
      const recordedChuncks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener('dataavailable', e => {
        if (e.data.size > 0) {
          recordedChuncks.push(e.data);
        }
      });

      this.recorder.addEventListener('stop', () => {
        this.newAudio = new Blob(recordedChuncks);
        console.log(this.newAudio);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}

li {
  display: flex;
}
</style>
