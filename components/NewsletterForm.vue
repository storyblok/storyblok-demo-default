<script setup>
const showMessage = ref(false)

const submit = () => {
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 4000)
}

const button = {
  link: {
    linktype: 'url',
  },
  size: 'default',
  style: 'default',
  button_color: 'primary',
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <form action="" class="relative">
    <div class="flex flex-col space-y-6">
      <div
        class="flex items-center justify-center space-x-1 text-white lg:justify-start"
      >
        <h4 class="text-xl">Sign up for our newsletter</h4>
      </div>
      <input
        type="email"
        placeholder="Your email"
        class="rounded-lg border border-white bg-transparent px-6 py-4 text-white transition-all focus:outline-none"
        required
      />
    </div>

    <div class="flex justify-center lg:justify-start">
      <Button :button="button" class="mt-8" @click="submit">
        <div class="flex items-center space-x-2">
          <span>Sign up</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </Button>
    </div>

    <Transition name="fade">
      <div
        v-if="showMessage"
        class="botttom-0 absolute left-0 translate-y-full text-lg text-white"
      >
        Thank you!
      </div>
    </Transition>
  </form>
</template>
