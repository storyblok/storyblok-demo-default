<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
const props = defineProps({ blok: Object })

const modules = [Navigation]
</script>

<style scoped>
.swiper {
  --swiper-theme-color: var(--medium);
}
</style>

<template>
  <div v-editable="blok">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      :navigation="true"
      :auto-height="true"
      :modules="modules"
      class="swiper"
    >
      <swiper-slide v-for="banner in blok.banners" :key="banner.uuid">
        <Banner
          v-if="banner.content"
          :blok="banner.content"
          :referenced="true"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
