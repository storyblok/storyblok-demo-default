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

<template>
  <form action="" class="relative">
    <div class="flex flex-col space-y-6">
      <div
        class="flex items-center justify-center space-x-1 text-white lg:justify-start"
      >
        <h4 class="text-xl">Leave us a message</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Your name"
        class="rounded-lg border border-white bg-transparent px-6 py-4 text-white transition-all focus:outline-none"
        required
      />
      <input
        type="email"
        placeholder="Your email"
        class="rounded-lg border border-white bg-transparent px-6 py-4 text-white transition-all focus:outline-none"
        required
      />
      <textarea
        name="message"
        placeholder="Your message"
        class="resize-none rounded-lg border border-white bg-transparent px-6 py-4 text-white transition-all focus:outline-none"
        required
      ></textarea>
    </div>

    <div class="flex justify-center lg:justify-start">
      <Button :button="button" @click="submit" class="mt-8">
        <div class="flex items-center space-x-2">
          <span>Submit</span>
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
