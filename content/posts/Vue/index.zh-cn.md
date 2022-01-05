---
title:  "Vue快速入门"
date: 2022-01-05T21:00:00+08:00
categories: ["学习笔记"]
draft: false
Author: "SeaWave"
---
# Vue快速入门

以下所有代码均可在浏览器直接运行，替换body即可。为了节省空间，<head>里的内容需自行添加。

## 1.导入Vue

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>

## 2.数据绑定

**方式一：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>

</head>
<body>
    <div id="app">
        {{message}}
    </div>
    <script>
        var vm =new Vue({
            el:"#app",
            data:{
                message:"hello,vue!"
            }
        })
    </script>
</body>
</html>
```

***方式二：**

通过v-bind指令：

```html
<body>
    <div id="app">
        <span v-bind:title="message">悬停几秒查看动态绑定</span>
    </div>
    <script>
        var vm =new Vue({
            el:"#app",
            data:{
                message:""
            }
        })
    </script>
</body>
```

经过以上的操作div中的{{message}}的显示内容已经被绑定到了VUE对象中的message属性上，更改message的值即可动态刷新页面中的值。

## 3.条件判断

```html
<body>
    <div id="app">
        <h1 v-if="ok==='a'">A</h1>
        <h1 v-else-if="ok==='b'">B</h1>
        <h1 v-else>C</h1>
    </div>
    <script>
        var vm =new Vue({
            el:"#app",
            data:{
                ok:'a'
            }
        })
    </script>
</body>
```

## 4.语句循环

```html
<body>
    <div id="app">
        <li v-for="item in items">
            {{item.message}}
        </li>
    </div>
    <script>
        var vm =new Vue({
            el:"#app",
            data:{
                items:[
                    {message:'狂神说java'},
                    {message:'狂神说vue'},
                    {message:'狂神说js'}
                ]
            }
        })
    </script>
</body>
```

## 5.双向绑定

```html
<body>
    <div id="app">
        {{message}}<br>
        <input type="password" v-model="message"></input>
    </div>
    <script>
        var vm =new Vue({
            el:"#app",
            data:{
                message:""
            }
        })
    </script>
</body>
```

## 6.计算属性

```html
<body>
    <div id="app">
        {{currentTime1()}}<br>
        {{currentTime2}}<br>
    </div>
    <script>
        var vm =new Vue({
            el:"#app",
            data:{
                message:""
            },
            methods:{
                currentTime1:function () {
                    return Date.now()
                }
            },
            computed:{
                currentTime2:function () {
                    return Date.now()
                }
            }
        })
    </script>
</body>
```

1. 调用方式不同。computed直接以对象属性方式调用，不需要加括号，而methods必须要函数执行才可以得到结果。
2. 绑定方式不同。methods与compute纯get方式都是单向绑定，不可以更改输入框中的值。compute的get与set方式是真正的双向绑定。
3. 是否存在缓存。methods没有缓存，调用相同的值计算还是会重新计算。competed有缓存，在值不变的情况下不会再次计算，而是直接使用缓存中的值。