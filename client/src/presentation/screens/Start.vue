<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTelegram } from '@/application/services'
import { useRouter } from 'vue-router'
import { Placeholder } from '@/presentation/components'

const { showMainButton, hideMainButton, expand } = useTelegram()
const router = useRouter()

onMounted(() => {
  expand()
  showMainButton('Начать', () => {
    void router.push('/home')
  })
})

onBeforeUnmount(() => {
  hideMainButton()
})
</script>

<template>
  <div class="start-page">
    <Placeholder
      title="Club Agri"
      caption="Этот сервис позволяет подобрать удобные клубы поблизости"
    >
      <template #picture>
        <img
          src="/telebook.svg"
          aria-hidden="true"
          width="80"
        >
      </template>
    </Placeholder>
  </div>
</template>

<style scoped>
.start-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
</style>
