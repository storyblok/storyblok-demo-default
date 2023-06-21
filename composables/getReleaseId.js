export default async function () {
  const route = useRoute()
  const releaseId = route.query?._storyblok_release || 0

  return releaseId
}
