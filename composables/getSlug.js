export default async function () {
  const route = useRoute()

  let slug = []
  if (route.query.path) {
    /**
     * Check if the path URL parameter is provided.
     * Note: This is needed specifically for demo spaces created on the fly. Not needed in a usual project.
     */
    slug = route.query.path?.split('/')
  } else {
    /**
     * If there is no path parameter provided, retrieve the slug.
     */
    if (route.params?.slug) {
      slug = route.params.slug.slice()
    }
  }

  return slug
}
