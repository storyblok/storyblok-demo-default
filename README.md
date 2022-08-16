# Storyblok Default Demo

This frontend is shown when creating a new example space in your [Storyblok](https://storyblok.com) account. It is built using [Nuxt 3](https://v3.nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/). Feel free to explore and reuse the code.

## Setup

- **Install the dependencies:**

```bash
npm install
```

- **Install `mkcert` on your system:** The installation instructions for macOS, Windows and Linux can be found in the [mkcert Github repository](https://github.com/FiloSottile/mkcert).

- **Create a valid certificate by running the following command in your project folder:** 

```bash
mkcert localhost
```

- **Run your project:**

```bash
npm run dev
```

Your project will now be served on [https://localhost:3000](https://localhost:3000).

Have a look at the [Nuxt 3 deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for further information.

## Some particularities to be aware of

### Internationalization and language detection

For the purpose of being used in product demos, it has to be possible that any language can be added in the internationalization settings in Storyblok and is detected automatically in the frontend subsequently. In order to ensure this, all currently active language codes are retrieved from the Storyblok space. When fetching a particular story based on the current route, it is checked whether any of the currently active language codes matches the first part of the route. For example, if the current route was `https://localhost:3000/de/home` and German had been added as a language, `de` would get added as the language parameter in the API request for the home story. You can take a look at the [getLanguage composable](composables/getLanguage.js) to see how it works.

In a real-world project, you would usually know which languages are used on the website, allowing you to choose a simpler approach (e.g. a folder-based one).

### Setting a real path for stories

The main drawback of handling internationalization as described above is that field-level translation will not working when setting a real path for certain stories (e.g. `/` instead of `home`). When setting a real path, the language code is no longer part of the route, thus making it impossible to detect.
