<template>
  <form action="" class="relative">
    <div class="flex flex-col space-y-6">
      <div
        class="flex space-x-1 items-center justify-center lg:justify-start text-white"
      >
        <h4 class="text-2xl font-extrabold">Leave us a message</h4>
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
        class="border-white px-6 py-4 rounded-lg border-2 focus:border-secondary focus:outline-none transition-all"
        required
      />
      <input
        type="email"
        placeholder="Your email"
        class="border-white px-6 py-4 rounded-lg border-2 focus:border-secondary focus:outline-none transition-all"
        required
      />
      <textarea
        name="message"
        placeholder="Your message"
        class="border-white px-6 py-4 rounded-lg border-2 focus:border-secondary focus:outline-none transition-all"
        required
      ></textarea>
    </div>

    <div class="flex justify-center lg:justify-start">
      <Button :button="button" @click="submit" class="mt-8">
        <div class="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
            />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Submit</span>
        </div>
      </Button>
    </div>

    <Transition name="fade">
      <div
        v-if="showMessage"
        class="absolute botttom-0 left-0 translate-y-full text-white text-lg"
      >
        Thank you!
      </div>
    </Transition>
  </form>
</template>

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
  size: 'large',
  ghost: true,
  button_color: 'white',
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
