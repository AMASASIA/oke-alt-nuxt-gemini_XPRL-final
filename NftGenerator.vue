<template>
  <div>
    <textarea v-model="prompt" placeholder="Describe your NFT idea"></textarea>
    <div style="margin-top:8px; display:flex; gap:8px">
      <button @click="generate" :disabled="loading || !prompt">{{ loading ? 'Generating...' : '✨ Generate NFT' }}</button>
      <button @click="mint" :disabled="!imageBase64 || minting">{{ minting ? 'Minting...' : 'Mint on XRPL' }}</button>
    </div>
    <div v-if="generated" style="margin-top:10px; color:#444">
      <strong>Generated Description:</strong> {{ generated }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const prompt = ref('')
const loading = ref(false)
const generated = ref('')
const minting = ref(false)
const imageBase64 = ref('')
const { setPreview } = usePreview()

async function generate() {
  if (!prompt.value) {
    alert('Please describe your NFT idea first.')
    return
  }
  loading.value = true
  
  try {
    // ★ サーバーAPIの呼び出し
    const response = await $fetch('/api/generate', {
      method: 'POST',
      body: { prompt: prompt.value }
    })

    if (response.error) {
      alert(`Generation failed: ${response.error}`)
      return
    }

    imageBase64.value = response.imageBase64
    const dataUrl = `data:image/jpeg;base64,${response.imageBase64}`
    setPreview(dataUrl)
    generated.value = prompt.value 

  } catch (error) {
    console.error('Generation Error:', error)
    alert('NFT generation failed. Check server logs.')
  } finally {
    loading.value = false
  }
}

async function mint() {
  if (!generated.value || !imageBase64.value) {
    alert('Generate an NFT image first.')
    return
  }
  minting.value = true

  try {
    // ★ サーバーAPIの呼び出し
    const response = await $fetch('/api/mint', {
      method: 'POST',
      body: { 
        imageBase64: imageBase64.value,
        metadataDescription: generated.value 
      }
    })

    if (response.error) {
      alert(`Minting failed: ${response.error}`)
    } else {
      alert(`Mint Successful! NFT ID: ${response.NFTokenID}\nTx Hash: ${response.txHash}`)
      setPreview(null) 
    }

  } catch (error) {
    console.error('Minting Error:', error)
    alert('NFT minting failed. Check XRPL connectivity and server logs.')
  } finally {
    minting.value = false
  }
}
</script>
