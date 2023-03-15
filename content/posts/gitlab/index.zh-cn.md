---
title: "GitLab安装部署及配置CI/CD"
date: 2023-03-15T12:16:26+08:00
categories: ["学习笔记"]
draft: false
tags: ["git"]
Author: "SeaWave"
---

# GitLab 安装部署及配置 CI/CD

## 一、基本概念

### 1.什么是 GitLab？

GitLab 是利用 Ruby on Rails 一个开源的版本管理系统，实现一个自托管的 Git 项目仓库，可通过 Web 界面进行访问公开的或者私人项目。

与 Github 类似，GitLab 能够浏览源代码，管理缺陷和注释。可以管理团队对仓库的访问，它非常易于浏览提交过的版本并提供一个文件历史库。团队成员可以利用内置的简单聊天程序(Wall)进行交流。

### 2.什么是 CI/CD？

CICD 是 持续集成（Continuous Integration）和持续部署（Continuous Deployment）简称。指在开发过程中自动执行一系列脚本来减低开发引入 bug 的概率，在新代码从开发到部署的过程中，尽量减少人工的介入。

_本文将通过 docker 的方式进行演示安装。_

## 二、安装 GitLab

1. 下载镜像

```shell
docker pull gitlab/gitlab-ce
```

2. 运行容器

```bash
sudo docker run --detach \
  --hostname 192.168.3.38 \
  --publish 443:443 --publish 80:80 --publish 222:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

```shell
sudo docker run --detach \
  --hostname 192.168.3.37 \   # 设置主机名或域名
  --publish 443:443 --publish 80:80 --publish 222:22 \ # 本地端口映射：容器端口映射
  --name gitlab \     # gitlab-ce 的镜像运行成为一个容器，这里是对容器的命名
  --restart always \  # 设置重启方式，always 代表一直开启，服务器开机后也会自动开启的
  --volume /srv/gitlab/config:/etc/gitlab \   # 将 gitlab的配置文件目录映射到 /srv/gitlab/config 目录中
  --volume /srv/gitlab/logs:/var/log/gitlab \ # 将 gitlab 的log文件目录映射到 /srv/gitlab/logs 目录中
  --volume /srv/gitlab/data:/var/opt/gitlab \ # 将 gitlab 的数据文件目录映射到 /srv/gitlab/data 目录中
  gitlab/gitlab-ce:latest  # 需要运行的镜像
```

3. 输入服务器地址即可访问页面
4. 获取初始密码

```shell
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

5. 设置中文（可选）

> 点击头像 依次进入 Settings—Preferences—Localization 将 default language 改成简体中文。
>
> 刷新浏览器即可变成中文页面。

_如果只是当作私有仓库使用，到这一步已经完毕了，使用方式和 github 无异，下面为 CI/CD 的内容_

## 三、安装 GitLab Runner

> GitLab Runner 是一个开源项目，用于运行您的作业并将结果发送回 GitLab。它与 GitLab CI 一起使用，GitLab CI 是 GitLab 随附的开源持续集成服务，用于协调作业。
>
> 简单来说你的项目就是通过这个 runner 运行的，本文同样使用 docker 进行 runner 的安装。

首先执行 docker 运行命令。

```shell
docker run -itd --restart=always --name gitlab-runner \
-v /srv/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock  gitlab/gitlab-runner:latest
```

### 注册 Runner

1. 在搭建好的 gitlab 页面的管理中心中点击 CI/CD，选择 Runner，点击注册一个实例 runner，将注册令牌复制保存。
2. 进入 docker 容器

```bash
sudo docker exec -it gitlab-runner bash
```

3. 执行注册指令

```bash
gitlab-runner register
```

4. 输入注册信息

```bash
Enter the GitLab instance URL (for example, https://gitlab.com/):
http://192.168.3.36 #输入你github的地址
Enter the registration token:
Jo8bZMMJDzUWwkQeLJ34 #这里是你刚刚保存的令牌
Enter a description for the runner:
[d5860f02b79f]: docker-test
Enter tags for the runner (comma-separated):
test #输入标识
Enter optional maintenance note for the runner:
#输入备注信息，我这里直接跳过了
WARNING: Support for registration tokens and runner parameters in the 'register' command has been deprecated in GitLab Runner 15.6 and will be replaced with support for authentication tokens. For more information, see https://gitlab.com/gitlab-org/gitlab/-/issues/380872
Registering runner... succeeded                     runner=Jo8bZMMJ
Enter an executor: custom, docker-ssh, parallels, virtualbox, docker-ssh+machine, docker, shell, ssh, docker+machine, instance, kubernetes
docker #输入运行执行环境，我选择了docker
Enter the default Docker image (for example, ruby:2.7):
ubuntu:latest
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```

5.完成注册

> 刷新 gitlab 页面，可以看到已经多出一个在线的 runner。

**当然，你也可以使用 docker 指令一键部署：**

```bash
docker run --rm -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://192.168.3.36" \
  --registration-token "Jo8bZMMJDzUWwkQeLJ34" \
  --description "dct-frontend" \
  --tag-list "test" \
  --run-untagged="false" \
  --locked="true" \
  --access-level="not_protected"
```

## 四、编写.gitlab-ci.yml 文件

gitlab-ci.yaml 文件的具体使用需参考官网或查阅此文章：

https://www.jianshu.com/p/4cc441b1c8a3

前端模板

```yaml
cache:
  key: test
  paths:
    - node_modules
    - dist
stages:
  - deploy
job1:
  stage: deploy
  only:
    - main
  tags:
    - test
  script:
    - npm install
    - npm run build
    - sudo cp -r dist/* /var/html/
```

后端模板

```yaml
variables:
  jar_name: test-runner-b-0.0.1-SNAPSHOT.jar

stages:
  - build
  - deploy

maven-build:
  tags:
    - test
  stage: build
  script:
    - mvn package -Dmaven.test.skip=true
  artifacts:
    paths:
      - target/$jar_name
  cache:
    paths:
      - /root/.m2/repository
maven-deploy:
  tags:
    - test
  stage: deploy
  script:
    - sh test.sh restart
    - sh test.sh status
  cache:
    paths:
      - logs
```
