# img-loader for webpack

## 背景

改装自`file-loader`，因为`file-loader`的`name`即是内容中的路径也是输出文件的路径，不够灵活，`img-loader`增加了`outputPath`属性！

## 安装

```js
    npm install img-loader --save-dev
```

## 用法

```js
    {
        test:/\.(png|jpg)$/,
        loader: 'img-loader?limit=7&name=../img/[name].[ext]&outputPath=img/'
    }
```
`name`是内容中的路径，文件路径是`outputPath`+`[name].[ext]`形成的！其他用法和`file-loader`一致！
