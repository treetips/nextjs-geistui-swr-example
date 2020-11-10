# nextjs-geistui-swr-example

This is a sample using `TypeScript` , `Vercel` , `Next.js` , `Geist-UI` , `SWR` , and `React Context API`.

This is a `Vercel-friendly` sample using Vercel products.

これは、 `TypeScript` , `Vercel` , `Next.js` , `Geist-UI` , `SWR` , `React Context API` を使ったサンプルです。

Vercelプロダクトを使った、 `Vercelフレンドリー` なサンプルです。

## Live demo

[Live Demo](https://nextjs-geistui-swr-example.vercel.app/)

## Features

- [TypeScript](https://www.typescriptlang.org/)
- Vercel Products
    - [Next.js](https://nextjs.org/)
    - [Geist-UI](https://react.geist-ui.dev/en-us/guide/introduction)
    - [SWR](https://swr.vercel.app/)
- [React Context API](https://reactjs.org/docs/context.html)
- [react-context-devtool](https://github.com/deeppatel234/react-context-devtool)
- [json-server](https://github.com/typicode/json-server)
- [Web Vitals](https://nextjs.org/docs/advanced-features/measuring-performance)


## Setup

- [Visual Studio Code](https://code.visualstudio.com/)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- `react-context-devtool` [Chrome](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf) / [FireFox](https://addons.mozilla.org/en-US/firefox/addon/react-context-devtool/) / [MS Edge](https://microsoftedge.microsoft.com/addons/detail/react-context-devtool/bnclaomncapgohhafjepfklgbjdjlfcd) 

## Usage

### Run Local

```bash
git clone https://github.com/treetips/nextjs-geistui-swr-example.git
cd nextjs-geistui-swr-example
npm i
npm run dev
```

### Run Production

```bash
git clone https://github.com/treetips/nextjs-geistui-swr-example.git
cd nextjs-geistui-swr-example
npm i --production
npm run build
npm start
```

## Note

Although I use `jsons-server` as the API server in the `local environment` , in the `production environment (live demo)` , I want to make it in-memory for the browser, so I have implemented the API independently with Next.js.
