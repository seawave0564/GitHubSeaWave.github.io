---
title: "MarkDwon基础语法指北"
date: 2021-07-02T17:00:00+08:00
categories: ["各种笔记"]
draft: false
Author: "SeaWave"
---
#                               Markdown语法规则

# 一、Markdown标题

## 1.使用 = 和 - 标记

> 我展示的是一级标题
>
>  =================
>
> 我展示的是二级标题
>
>  -------------------------------

**显示效果如下：**
 
![标题](https://seawave.top/file/markdown/bt.jpg)

 ## 2.使用#号标记
用#号标记标题时要注意#号与标题文本中间的空格
```
# 一级标题

## 二级标题

### 三级标题

##### 四级标题

###### 五级标题

####### 六级标题
```
 
![标题1](https://seawave.top/file/markdown/bt1.jpg)

# 二、Markdown 段落

## 1.段落分段

Markdown 段落没有特殊的格式，直接编写文字就好，**段落的换行是使用两个以上空格加上回车**。

![段落](https://www.runoob.com/wp-content/uploads/2019/03/36A89BDA-A062-4D66-A41B-0EBEE7891AB9.jpg)

## 2.字体格式

Markdown可以使用如下字体格式：

>*斜体文本*  ---文字首末分别使用一*包围文本
>
>_斜体文本_  ---文字首末分别使用一个_包围文本
>
>**粗体文本**  ---文字首末分别使用两个*包围文本
>
>__粗体文本__  ---文字首末分别使用两个_包围文本
>
>~~删除文本~~  ---文字首末分别使用两个~包围文本

## 3.分隔线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

```
***
* * *
*****
- - -
-----
```


**显示效果如下：**

![分隔线](https://seawave.top/file/markdown/fg.jpg)

## 4. 下划线

下划线可以通过 HTML 的 **</u>** 标签来实现：

`<u>带下划线的文本</u>`

**效果如下：**

![下划线](https://seawave.top/file/markdown/xh.jpg)



## 5.脚注

```
创建脚注格式类似这样 [^1]。
```

![](https://seawave.top/file/markdown/jz.jpg)

# 三、Markdown列表

## 1.无序列表

无序列表使用星号(*****)、加号(**+**)或是减号(**-**)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：

```
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项
```

**效果如下：**

![](https://www.runoob.com/wp-content/uploads/2019/03/89446A8E-6D83-4666-AACC-980145D5F070.jpg)

## 2.有序列表
有序列表使用数字标记，后面同样需要加一个空格在填写内容：
```
1. 第一项
2. 第二项
3. 第三项
```

**效果如下：**

![](https://www.runoob.com/wp-content/uploads/2019/03/560384BB-2B00-41D5-ACF2-18972F7F2775.jpg)

## 3.列表嵌套
列表是可以嵌套的，达到分级效果。
```
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

**效果如下：**

![](https://www.runoob.com/wp-content/uploads/2019/03/8ED795DA-F124-4E70-BA71-57CD9CF958A4.jpg)

# 四、Markdown区块

## 1.普通区块

Markdown 区块引用是在段落开头使用 **>** 符号 ，然后后面紧跟一个**空格**符号：

```
> Markdown
> 我们都有一个家
> 名字叫中国
```

**效果如下:**

![](https://seawave.top/file/markdown/qk.jpg)

## 2.区块嵌套

区块是可以嵌套的，一个 **>** 符号是最外层，两个 **>** 符号是第一层嵌套，以此类推：

```
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```

![](https://www.runoob.com/wp-content/uploads/2019/03/AA0A4A6A-33A7-48C7-971F-73FFC8FE85B0.jpg)

**区块也可以和列表互相嵌套：**

```
* 第一项
    > 区块列表
    > 区块列表的嵌套
* 第二项
```

**效果如下：**

![](https://seawave.top/file/markdown/qkqt.jpg)

# 五、Markdown 代码

## 1.代码片段

如果是段落上的一个函数或片段的代码可以用反引号把它包起来（**`**），例如：

```
`System.out.println(Markdown)` 
```

**效果如下：**

![](https://seawave.top/file/markdown/dmpd.jpg)

## 2.代码区块

代码区块用 **```** 包裹一段代码，并指定一种语言（也可以不指定）：

```
​```javascript
$(document).ready(function () {
    alert('RUNOOB');
});
​```
```

**效果如下：**

![](https://www.runoob.com/wp-content/uploads/2019/03/88F52386-2F98-4D7E-8935-E43BECA6D868.jpg)

# 六、Markdown 链接

## 1.超链接

链接使用方法如下：

```
欢迎来到我的博客 [点击进入](https://seawave.top)
```

**效果如下：**

欢迎来到我的博客 [点击进入](https://seawave.top)

![](https://seawave.top/file/markdown/clj.jpg)

## 2.高级链接

我们可以通过变量来设置一个链接，变量赋值在文档末尾进行：

此方法可以使用在需要大量引用同一网址的文档中。

```
点击进入 [Google][1]
点击进入 [seawave][2]
然后在文档的结尾为变量赋值（网址）
  [1]: http://www.google.com/
  [2]: http://www.seawave.com/
```
效果如下：

点击进入 [Google][1]
点击进入 [seawave][2]
然后在文档的结尾为变量赋值（网址）

![](https://seawave.top/file/markdown/gjlj.jpg)

# 七、Markdown 图片

Markdown 图片语法格式如下：

```
![alt 属性文本](图片地址)

![alt 属性文本](图片地址 "可选标题")
```

**使用举例：**

```
![Baidu 图标](https://www.baidu.com/img/540x258_2179d1243e6c5320a8dcbecd834a025d.png)

![Baidu 图标](https://www.baidu.com/img/540x258_2179d1243e6c5320a8dcbecd834a025d.png "100years")
```

**效果如下:**

![Baidu 图标](https://www.baidu.com/img/540x258_2179d1243e6c5320a8dcbecd834a025d.png)

![Baidu 图标](https://www.baidu.com/img/540x258_2179d1243e6c5320a8dcbecd834a025d.png "100years")

![](https://seawave.top/file/markdown/tb.jpg)

--------------

当然，你也可以像网址那样对图片网址使用变量:

```
这个链接用 1 作为网址变量 [Gitee][1].
然后在文档的结尾为变量赋值（网址）

[1]: https://gitee.com/static/images/logo-black.svg
```
效果如下：

这个链接用 1 作为网址变量 [Gitee][1].
然后在文档的结尾为变量赋值（网址）

![](https://seawave.top/file/markdown/gitee.jpg)

# 八、Markdown 表格

Markdown 制作表格使用 **|** 来分隔不同的单元格，使用 **-** 来分隔表头和其他行。

**语法格式如下：**

```
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |

![](https://seawave.top/file/markdown/bg1.jpg)

**我们可以设置表格的对齐方式：**

- **-:** 设置内容和标题栏居右对齐。
- **:-** 设置内容和标题栏居左对齐。
- **:-:** 设置内容和标题栏居中对齐。

**实例如下：**

```
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |

![](https://seawave.top/file/markdown/bg2.jpg)

  [1]: http://www.google.com/
  [2]: http://www.seawave.com/