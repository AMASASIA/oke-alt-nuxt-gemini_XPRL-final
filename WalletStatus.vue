<template>
  <div class="wallet">
    <div>
      <div style="font-weight:600">Wallet Status</div>
      <div>{{ statusText }}</div>
    </div>
    <div class="row">
      <button @click="connect">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const connected = ref(false)

function connect() {
  // Placeholder: implement GemWallet / XRPL wallet connection here.
  connected.value = !connected.value
}

const statusText = computed(() => connected.value ? 'Connected' : 'Not connected')
const buttonText = computed(() => connected.value ? 'Disconnect GemWallet' : 'Connect GemWallet')
</script>
