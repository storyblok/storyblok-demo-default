<script setup>
import Client from 'shopify-buy'
const config = useRuntimeConfig()
const props = defineProps({ blok: Object })

const shopifyClient = Client.buildClient({
  domain: config.public.shopifyDomain,
  storefrontAccessToken: config.public.shopifyToken,
})

const productId = computed(() => props.blok?.product?.items[0]?.id)
const product = ref(null)
const pending = ref(true)

const fetchProduct = async (id) => {
  if (!id) return
  let productObject = {}
  await shopifyClient.product.fetch(id).then((fetchedProduct) => {
    productObject.title = fetchedProduct.title
    productObject.image = fetchedProduct.images[0].src
    productObject.currency = fetchedProduct.variants[0].price.currencyCode
    productObject.price = fetchedProduct.variants[0].price.amount
    productObject.avaiable = fetchedProduct.variants[0].available
  })
  return productObject
}

watchEffect(async () => {
  try {
    product.value = await fetchProduct(productId.value)
    pending.value = false
  } catch (error) {
    console.log(error)
    product.value = null
    pending.value = false
  }
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section single-product-section"
    :class="'bg-' + blok.background_color"
  >
    <div
      class="container grid items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
    >
      <div
        class="order-last"
        :class="blok.reverse_layout ? '' : 'lg:order-first'"
      >
        <Headline v-if="blok.headline" class="mb-4">
          {{ blok.headline }}
        </Headline>

        <RichText :text="blok.text" />
        <div v-if="blok.button.length" class="mt-8">
          <Button
            v-for="button in blok.button"
            :key="button._uid"
            :button="button"
          />
        </div>
      </div>
      <div>
        <div
          v-if="!pending && product"
          class="overflow-hidden rounded-lg shadow-2xl"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="pointer-events-none block"
          />
          <div class="flex justify-between bg-light px-6 py-3 text-dark">
            <span>{{ product.title }}</span>
            <span v-if="product.avaiable" class="font-bold">
              {{ product.price + ' ' + product.currency }}
            </span>
            <span v-else class="font-bold">Currently out of stock</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>