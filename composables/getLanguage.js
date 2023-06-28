export default async function (slug) {
  let language = null
  const languageCodes = ref()
  const storyblokApi = useStoryblokApi()

  /**
   * Request all languages set up in the space.
   */
  const { data } = await storyblokApi.get('cdn/spaces/me')
  languageCodes.value = data.space.language_codes

  console.log(languageCodes.value)

  /**
   * If the the first part of the slug array matches one of the language codes defined in the space,
   * it matches the language code that has to be specified in the API request for the story/stories.
   */
  if (languageCodes.value.includes(slug[0])) language = slug[0]

  return language
}
