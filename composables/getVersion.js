export default function () {
  const route = useRoute()
  console.log('test: ' + route.query._storyblok_published)
  if (route.query._storyblok_published !== undefined) {
    return 'published'
  } else {
    return 'draft'
  }
}
