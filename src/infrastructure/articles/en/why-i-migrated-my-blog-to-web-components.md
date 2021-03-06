---
title: Why I migrated my blog<br/> to Web Components?
date: 2020-04-12
locale: en
image: clouds-in-the-sky.jpg
---

Why did I migrate my [blog](https://github.com/cesalberca/blog) for the third and last (hopefully) to Web Components? In this article I'll explain why.

<!-- more -->

## Why?

Initially my blog was powered by [Jekyll](https://jekyllrb.com/), then I migrated it to [Vue](https://vuejs.org/) and last week I was thinking about migrating it to [Nuxt](https://nuxtjs.org/) so that I could improve my SEO and performance. In the last moment I decided to approach it with a more _agnostic_ solution that could also improve my SEO. So I finally decided to migrate it to [LitElement](https://lit-element.polymer-project.org/).

Why this change all of a sudden? Well, I was starting to wonder things that I had taken for granted: Is it so hard to have good SEO without using techniques like SSR or some frameworks like static site generators like [Gatsby](https://www.gatsbyjs.org/)? Is it really necessary to add dependencies with **thousands upon thousands of lines of code**, with **so many moving parts** and **so many abstractions** to build a website nowadays? It _can't be that hard_. Or at least it shouldn't be. That's when [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) come into play, which a part from removing the need of using a complex framework they have [good SEO](https://developers.google.com/search/docs/guides/javascript-seo-basics#web-components).

> It can't be _that complicated_.

When I started my blog in Vue there wasn't a possibility to use Web Components which would work on all modern browsers, but today, it is a possibility. If choosing Web Components means also that I **bet on the platform**, **have less moving parts**, **fewer dependencies**, **less magical transpilation**, then I would have less surface for errors and that would make my code **more robust**, so it would **last longer**.

Here you have the code for my blog: [https://github.com/cesalberca/blog](https://github.com/cesalberca/blog). Without further ado, let's answer the very first question: **how do we serve Web Components?**

## Bundling web components

To serve Web Components we should start looking to include [Webpack](https://webpack.js.org/) o [Parcel](https://parceljs.org/), right? But now that we are rethinking everything, do we really need a bundler? Yes, it seems like a crazy idea, right? Do we really need to create a single file —a bundle— to serve to the client? Why is it necessary today when ESModules are [supported by all modern browsers](https://caniuse.com/#feat=es6-module).

> Do we really need a bundler?

All of these questions led me to choose [Snowpack](https://www.snowpack.dev/), which proposes taking the dependencies and moving them to a `web_modules` and in our code instead of doing:

```typescript
import { customElement } from 'lit-element'
```

We do this:

```typescript
import { customElement } from '/web_modules/lit-element.js'
```

Because the first way of importing is not native —not now [at least](https://github.com/WICG/import-maps)— and browsers don't understand, that's why the piece of the bundler was so **import**ant. Every time the bundler saw some import it would associate it with `node_modules` and so it included the related code in the bundle.

### Snowpack

To use Snowpack you have to take into account the following:

1. The imports must include the extension. At least if we don't want to use Babel (although we can avoid putting the extension with [this configuration](https://www.snowpack.dev/#importing-packages-by-name))
   . With TypeScript, you have to include the extension `.js`. There is an [issue](https://github.com/microsoft/TypeScript/issues/16577) where this is mentioned.
2. When you install dependencies you have to include them in the `package.json` inside the [Snowpack configuration](https://www.snowpack.dev/#whitelisting-dependencies). In my case it was necessary because I wanted to use RxJS, which has the same problems with certain exports.

```json
{
    "snowpack": {
        "webDependencies": [
            "lit-html",
            "lit-element",
            "lit-html/directives/class-map.js",
            "lit-html/directives/style-map.js"
        ],
        "dedupe": ["lit-element", "lit-html"]
    }
}
```

If you find that this command works:

```bash
snowpack --include "src/**/*.ts"
```

Then don't whitelist the dependencies inside the `webDependencies` option.

Although be careful, because the moment you add a web dependency the `--include "src/**/*.ts"` does not do anything, so you should remove it.

3. You need to launch a local server. Opening the `index.html` file won't work because of the script type module. In this case I chose [servor](https://github.com/lukejacksonn/servor) because of its simplicity and its option of auto-reload.

4. Regenerate the `web_modules` when you add a new dependency. You can add a script `prepare` to do so:

```json
{
    "prepare": "snowpack"
}
```

5. If you use [inversify](http://inversify.io/) with [inversify-props](https://github.com/CKGrafico/inversify-props) then you should add the following configuration in the `package.json`:

```json
{
    "snowpack": {
        "namedExports": {
            "inversify-props": ["injectable", "inject"]
        }
    }
}
```

That is probably all you need to know for now of Snowpack, a tool that **saves us the bundle generation time**, which can shave off precious seconds in developments and **avoids complexity**.

## Migration process

In my projects I bet on an architecture which **separates the logic of what my application does from how the user interacts with system**. I often follow an architecture with 4 layers: **application**, **domain**, **infrastructure** and **ui**. This has allowed me to migrate from Vue to LitElement changing mainly the **ui** layer. If you want to know more about this you can watch a talk a gave about [this](https://www.youtube.com/watch?v=NpjecaAgcVQ) (in Spanish).

What other layers did I need to change? The **infrastructure** layer, because when you don't have bundler the imports of Markdown are handled by Webpack with [frontmatter-markdown-loader](https://www.npmjs.com/package/frontmatter-markdown-loader). I had to replace the retrieval of articles with HTTP requests using [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Something so simple as importing non JavaScript files was something that was primarily introduced by Webpack and other bundlers, but is something not native, not [at moment](https://github.com/tc39/proposal-module-attributes) at least. Moreover, CSS, image and SVG imports inside JavaScript can be replaced by the use of link, img tags and inlining SVG respectively.

Something that I like about Vue is the reactivity and how you can even create reactive objects outside of the components using the [Vue.observable](https://vuejs.org/v2/api/#Vue-observable) API. I was using this API mainly to handle the little state I have, which is to change the language and theme. With LitElement there is nothing like this, and as I didn't want to couple the state with the view I had to rely on a solution like [RxJS](https://rxjs-dev.firebaseapp.com/) where I stored the state in a BehaviourSubject.

Something that I missed was to avoid prop drilling using the [Provide/Inject](https://vuejs.org/v2/api/#provide-inject) API. With LitElement there is nothing like this or React's [context API](https://reactjs.org/docs/context.html) (which is where the Provide/Inject API comes from). Now that I have my state centralized and being able to do dependency injection with [inversify-props](https://github.com/CKGrafico/inversify-props) I could emulate this functionality.

## Configuration

We don't need a bundler, but we still need to execute certain tasks. For example, when we compile TypeScript, it doesn't copy the HTML, CSS and assets files in the compiled sources. Moreover, something like minifying images which was so simple with a Webpack plugin now we have to do it invoking the image processing library.

At the end everything has its pros and cons. This I would say has been the biggest con, and that is that **many tools are not really adapted to ESModules**.

### Development

The copying of files I do it with [cpx](https://www.npmjs.com/package/cpx) which has a watch mode. I included this in the `package.json`:

```json
{
    "scripts": {
        "prestart": "run-s -l clean",
        "start": "run-p -l server copy:watch compile:watch",
        "clean": "rimraf dist",
        "copy:watch": "run-p copy:assets:watch copy:dependencies:watch",
        "copy:assets:watch": "cpx \"src/**/*.{jpg,jpeg,svg,png,css,html,ico,md}\" dist/ -w",
        "copy:dependencies:watch": "cpx \"web_modules/**/*.js\" dist/web_modules -w",
        "compile:watch": "tsc -w",
        "server": "servor dist index.html --reload --browse",
        "dependencies": "snowpack",
        "prepare": "run-s dependencies"
    }
}
```

You'll see that I make use of the weird commands: `run-s` and `run-p`. Well, I use that in order to execute several processes at the same time, like the compiler watch, the copying watch and the local server. You can't wait for one process to finish to start another one because it will never finish executing, not until we stop it manually.

`run-s` and `run-p` come from the package [npm-run-all](https://www.npmjs.com/package/npm-run-all). The `s` means "sequentially" and the `p` means "parallel".

With an `index.html` file where we import a script with type module we will be able to see something:

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <link rel="stylesheet" rel="preload" href="ui/styles/base.css" />
        <script type="module" src="./index.js"></script>
    </head>
    <body>
        <cesalberca-blog></cesalberca-blog>
    </body>
</html>
```

### Production

To make the production build we will need to have a script similar to the `start` script except we won't need the watch mode. I also minify the images here. I don't do any other type of [minification](<https://en.wikipedia.org/wiki/Minification_(programming)>), [uglifying](https://www.quora.com/What-does-uglify-mean) or [tree shaking](https://en.wikipedia.org/wiki/Tree_shaking). I'm aware of the costs of not doing this and for the moment I think they are trivial to the user.

Something that we get for free without a bundle is that the browser will cache the files for you.

The `package.json` now looks like this:

```json
{
    "scripts": {
        "prebuild": "run-s -l clean",
        "build": "run-s -l dependencies copy compile",
        "postbuild": "run-s optimize",
        "clean": "rimraf dist",
        "copy": "run-s copy:assets copy:dependencies",
        "copy:assets": "cpx \"src/**/*.{jpg,jpeg,svg,png,css,html,ico,md}\" dist/",
        "copy:dependencies": "cpx \"web_modules/**/*.js\" dist/web_modules",
        "compile": "tsc",
        "optimize": "ts-node scripts/optimize.ts",
        "dependencies": "snowpack",
        "prepare": "run-s dependencies"
    }
}
```

### TypeScript

In order for TypeScript's type resolution to work I had to add the following configuration to `tsconfig.json`:

```json
{
    "compilerOptions": {
        "rootDir": "src",
        "baseUrl": ".",
        "paths": {
            "/web_modules/*.js": ["node_modules/@types/*", "node_modules/*", "web_modules/*.js"]
        }
    }
}
```

So now when we do an import from `/web_modules` TypeScript knows to resolve the imports from `node_modules`.

Moreover, I had to add `inlineSourceMap` and `inlineSources` to true in order to be able to debug with breakpoints.

My whole `tsconfig.json` configuration is this:

```json
{
    "compilerOptions": {
        "target": "es2018",
        "module": "esnext",
        "outDir": "dist",
        "moduleResolution": "node",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "inlineSourceMap": true,
        "inlineSources": true,
        "resolveJsonModule": true,
        "types": ["jest", "reflect-metadata", "node"],
        "lib": ["esnext", "dom", "dom.iterable"],
        "rootDir": "src",
        "baseUrl": ".",
        "paths": {
            "/web_modules/*.js": ["node_modules/@types/*", "node_modules/*", "web_modules/*.js"]
        },
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/*"],
    "exclude": ["node_modules"]
}
```

### Testing

For testing, I use [Jest](https://jestjs.io/). Here I had to adapt the configuration, so it worked correctly. In this case I had to add the following dependencies:

```bash
npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env @babel/preset-typescript @types/jest babel-jest jest jest-ts-webcompat-resolver -DE
```

As you can see we added Babel, but... Why? Well, Jest **executes directly TypeScript**. However, Jest, does not know how to read a TypeScript file. That's why we need to erase all type information so Jest can parse and execute that file. This is explained more in detail [here](https://iamturns.com/typescript-babel/).

In this case we only need to use Babel for the tests, that's why I included this configuration in the `babel.config.js`:

```javascript
module.exports = {
    env: {
        test: {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                '@babel/preset-typescript'
            ],
            plugins: [
                [
                    '@babel/plugin-proposal-decorators',
                    {
                        legacy: true
                    }
                ]
            ]
        }
    }
}
```

Lastly my `jest.config.js`:

```javascript
module.exports = {
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    resolver: 'jest-ts-webcompat-resolver',
    moduleNameMapper: {
        '/web_modules/(.*)': '<rootDir>/web_modules/$1'
    },
    setupFiles: ['<rootDir>/tests/set-up.ts']
}
```

The [jest-ts-webcompat-resolver](https://www.npmjs.com/package/jest-ts-webcompat-resolver) is a package that helps resolve imports from TypeScript with the extension.

With that we can now run our tests.

## Conclusions

The code of my blog you can read it [here on Github](https://github.com/cesalberca/blog). I'm very satisfied with the result. I employed a lot of time investigating how to approach common problems in the most native way. At the end I managed to achieve my objectives: **have a better SEO**, **simplify** and **bet on the platform**.

I think for now tooling must try and adapt to the modern way of doing things and leave behind non-native APIs. It's something that [Deno](https://deno.land/) is doing. It's something that LitElement is doing. **And it's something that we should be doing**.
