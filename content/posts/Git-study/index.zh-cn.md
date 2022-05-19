---
title: "Git食用教程"
date: 2022-05-19T14:00:00+08:00
categories: ["学习笔记"]
tags: ["git"]
draft: false
Author: "SeaWave"
---



## Git—分布式版本控制系统

## 一、版本控制

------------------

### 概述

版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

- 实现跨区域多人协同开发
- 追踪和记载一个或者多个文件的历史记录
- 组织和保护你的源代码和文档
- 统计工作量
- 并行开发、提高开发效率
- 跟踪记录整个软件的开发过程--
- 减轻开发人员的负担，节省时间，同时降低人为错误

主流的版本控制器有如下这些：

- **Git**
- **SVN**（Subversion）
- **CVS**（Concurrent Versions System）
- **VSS**（Micorosoft Visual SourceSafe）
- **TFS**（Team Foundation Server）

### 分类

**1、本地版本控制**

记录文件每次的更新，可以对每个版本做一个快照，或是记录补丁文件，适合个人用，如RCS。

![](https://seawave.top/file/git/1.png)

**2、集中版本控制  SVN**

所有的版本数据都保存在服务器上，协同开发者从服务器上同步更新或上传自己的修改

![](https://seawave.top/file/git/2.png)

所有的版本数据都存在服务器上，用户的本地只有自己以前所同步的版本，如果不连网的话，用户就看不到历史版本，也无法切换版本验证问题，或在不同分支工作。而且，所有数据都保存在单一的服务器上，有很大的风险这个服务器会损坏，这样就会丢失所有的数据，当然可以定期备份。代表产品：SVN、CVS、VSS

**3、分布式版本控制**

所有版本信息仓库全部同步到本地的每个用户，**没有中央服务器，每个人的电脑就是一个完整的版本库**。这样就可以在本地查看所有版本历史，可以离线在本地提交，只需在连网时push到相应的服务器或其他用户那里。由于每个用户那里保存的都是所有的版本数据，只要有一个用户的设备没有问题就可以恢复所有的数据，但这增加了本地存储空间的占用。

![](https://seawave.top/file/git/3.jfif)

**Git是目前世界上最先进的分布式版本控制系统。**

Git创始人：

![](https://seawave.top/file/git/4.jpeg)

## 二、Git 安装与配置

-------------

### 安装

参考链接：[https://blog.csdn.net/mukes/article/details/115693833](https://blog.csdn.net/mukes/article/details/115693833)

安装完成后开始菜单如下：

![](https://seawave.top/file/git/5.png)

### 配置

``系统级：Git\etc\gitconfig  ：Git 安装目录下的 gitconfig``

``用户级：C:\Users\Administrator\.gitconfig    只适用于当前登录用户的配置``

```bash
#查看git配置
git config -l
#配置用户名
git config --global user.name "seawave0564"
#配置邮箱
git config --global user.email "943581833@qq.com"
```

## 三、Git基本理论

----------

![](https://seawave.top/file/git/6.png)

- Workspace：工作区，就是你平时存放项目代码的地方
- Staging/index：暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息
- Repository：仓库区（或本地仓库），就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中HEAD指向最新放入仓库的版本
- Remote：远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换

### Git的工作流程

在工作目录中添加、修改文件；比如：新建UserMapper.xml

将需要进行版本管理的文件放入暂存区域；存放：git add.

将暂存区域的文件提交到git仓库。 提交：git commit

因此，git管理的文件有三种状态：已修改（modified），已暂存（staged），已提交（committed）

![](https://seawave.top/file/git/7.png)

## 四、Git项目搭建

------------

> 方式一：本地创建仓库

```bash
#在当前目录创建一个git目录
git init 
```
***此方式需要手动链接远程仓库***

```bash
git remote add origin https://gitee.com/seawave0564/helloworld.git
git push -u origin "master"
```

> 方式二：远程克隆仓库

在Github/Gitee上创建一个仓库，使用``git clone ``克隆到本地

## 五、Git文件操作

----------

> Git文件的四中状态

- Untracked: 未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged.
- Unmodify: 文件已经入库, 未修改, 即版本库中的文件快照内容与文件夹中完全一致. 这种类型的文件有两种去处, 如果它被修改, 而变为Modified. 如果使用git rm移出版本库, 则成为Untracked文件
- Modified: 文件已修改, 仅仅是修改, 并没有进行其他的操作. 这个文件也有两个去处, 通过git add可进入暂存staged状态, 使用git checkout 则丢弃修改过, 返回到unmodify状态, 这个git checkout即从库中取出文件, 覆盖当前修改 !
- Staged: 暂存状态. 执行git commit则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为Unmodify状态. 执行git reset HEAD filename取消暂存, 文件状态为Modified

> 查看文件状态

```bash
#查看指定文件状态
git status [filename]

#查看所有文件状态
git status

# git add .                  添加所有文件到暂存区
# git commit -m "消息内容"    提交暂存区中的内容到本地仓库 -m 提交信息
```

> 忽略文件

在主目录下建立".gitignore"文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（#）开始的行将会被忽略。
2. 可以使用Linux通配符。例如：星号（*）代表任意多个字符，问号（？）代表一个字符，方括号（[abc]）代表可选字符范围，大括号（{string1,string2,...}）代表可选的字符串等。
3. 如果名称的最前面有一个感叹号（!），表示例外规则，将不被忽略。
4. 如果名称的最前面是一个路径分隔符（/），表示要忽略的文件在此目录下，而子目录中的文件不忽略。
5. 如果名称的最后面是一个路径分隔符（/），表示要忽略的是此目录下该名称的子目录，而非文件（默认文件或目录都忽略）。

## 六、Git分支

----

![](https://seawave.top/file/git/8.png)

分支相关常用命令：

```shell

# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

