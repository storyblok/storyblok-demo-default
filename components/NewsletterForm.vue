<template>
  <form action="" class="relative">
    <div class="flex flex-col space-y-6">
      <div
        class="flex space-x-1 items-center justify-center lg:justify-start text-white"
      >
        <h4 class="text-2xl font-extrabold">Sign up for our newsletter</h4>
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
        type="email"
        placeholder="Your email"
        class="border-white px-6 py-4 rounded-lg border-2 focus:border-secondary focus:outline-none transition-all"
        required
      />
    </div>

    <div class="flex justify-center lg:justify-start">
      <Button :button="button" class="mt-8" @click="submit">
        <div class="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Sign up</span>
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
const showMessage = ref(false);

const submit = () => {
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 4000);
};

const button = {
  link: {
    linktype: "url",
  },
  size: "large",
  ghost: true,
  button_color: "white",
};
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
