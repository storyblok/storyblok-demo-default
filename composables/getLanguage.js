export default async function (slug) {
  let language = 'default'
  const languageCodes = ref()
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/spaces/me')
  languageCodes.value = data.space.language_codes

  if (languageCodes.value.includes(slug[0])) language = slug[0]

  return language
}
