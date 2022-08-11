## How to deploy to the rendering service


1. Fill all the necessary tokens in `.env.example` and rename it to `.env`
2. Build the nuxt project with `ssr: false`, it should generate a `.output` directory
3. Run `npm run predeploy` it should generate a `dist` directory
4. Check the `dist/page.liquid` file:

```
<link
  rel="stylesheet"
  href="https://a.storyblok.com/t/163682/assets/entry.b80e6736.css"
/>
```

The path of the `entry.b80e6736.css` should match the file located in the assets folder. If it doesn't match, put the correct path.

Do the same for the script: 

```
<script
    type="module"
    src="https://a.storyblok.com/t/163682/assets/entry-06ce5dfb.mjs"
  ></script>
```

5. If the paths match and the `dist` directory was generated correctly, you can run `npm run deploy` to upload this directory