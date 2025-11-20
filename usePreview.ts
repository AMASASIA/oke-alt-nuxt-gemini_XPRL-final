import { ref } from 'vue'

const previewUrl = ref('')

export const usePreview = () => {
  function setPreview(url: string) {
    previewUrl.value = url
  }
  function clearPreview() {
    previewUrl.value = ''
  }
  function viewCollection() {
    // placeholder - route to collection or open external link
    alert('Open your collection (placeholder). Implement collection view or link.')
  }
  return {
    previewUrl,
    setPreview,
    clearPreview,
    viewCollection
  }
}
