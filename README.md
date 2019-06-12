> Support popluar comment plugins in Vuepress, sucn as Gitalk, Valine, Disqus.

## Features

- Support Gitalk
- Response router change and refresh automatic
- User can use passage's `$frontmatter`

## Todo

- Support Valine, Disqus
- 中文说明

## Usage

### Install

With `npm`:

```bash
npm install --save vuepress-plugin-comment
```

With `yarn`:

```bash
yarn add vuepress-plugin-comment -D
```

With `cnpm`:

```bash
cnpm i --save vuepress-plugin-comment
```

### Choose: `Gitalk`

The `options` is exactly the same as `Gitalk` configuration.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'gitalk', 
        options: {
          clientID: 'GitHub Application Client ID',
          clientSecret: 'GitHub Application Client Secret',
          repo: 'GitHub repo',
          owner: 'GitHub repo owner',
          admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
          distractionFreeMode: false 
        }
      }
    ]
  ]
}
```

If you want to access variables, such as `$frontmatter` and `window`, please use **EJS** syntax.

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'gitalk', 
        options: {
          id: '<%- frontmatter.commentid || frontmatter.permalink %>',
          title: '「Comment」<%- frontmatter.title %>',
          body: '<%- frontmatter.title %>：<%-window.location.origin%><%- window.location.pathname %>',
          clientID: 'GitHub Application Client ID',
          clientSecret: 'GitHub Application Client Secret',
          repo: 'GitHub repo',
          owner: 'GitHub repo owner',
          admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
          distractionFreeMode: false,
        }
      }
    ]
  ]
}
```

**Note**: Never use callback function in plugin configuration, that will be filtered by vuepress. So I have to support EJS syntax.

## Options

- **choosen** `string`

  **Required**.

- **options** `object`

  **Required**. The options of choosen comment plugin.

- **container** `string`

  **Optional, default as `'main.page'`**. The dom selector that contains choosen comment plugin.