import { RichTextSchema, renderRichText } from '@storyblok/vue'
import cloneDeep from 'clone-deep'

export default function (richTextData) {
  const customSchema = cloneDeep(RichTextSchema)
  const renderedRichText = renderRichText(richTextData, {
    schema: customSchema,
    resolver: (component, blok) => {
      switch (component) {
        case 'richtext-youtube':
          if (!blok.video_id) return 'Please provide a YouTube video ID.'
          return `<iframe src="https://www.youtube-nocookie.com/embed/${blok.video_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowfullscreen class="aspect-video w-full"></iframe>`
        default:
          return `Component ${component} not found.`
      }
    },
  })

  return renderedRichText
}
