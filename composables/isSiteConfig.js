export default async function () {
  const route = useRoute()
  /**
   * route.path has to be used instead of route.params because otherwise it will not work with nested catch-all routes.
   */
  return (
    route.path.includes('site-config') || route.query?.path === 'site-config'
  )
}
