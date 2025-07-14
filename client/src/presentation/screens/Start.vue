<script setup lang="ts">
import { Placeholder, Sections, Section } from '@/presentation/components'
import { useTelegram } from '@/application/services'
import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

const { showMainButton, hideMainButton } = useTelegram()
const router = useRouter()

function start(): void {
  void router.push('/home')
}

onMounted(() => {
  showMainButton('Начать', start)
})

onBeforeUnmount(() => {
  hideMainButton()
})
</script>

<template>
  <div class="start-page">
    <Sections>
      <Section>
        <Placeholder
          title="Добро пожаловать"
          caption="Этот сервис позволяет подобрать удобные клубы поблизости"
        >
          <template #picture>
            <img src="/telebook.svg" alt="logo" width="100" />
          </template>
        </Placeholder>
      </Section>
    </Sections>
  </div>
</template>

<style scoped>
.start-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>
