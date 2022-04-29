# Docker使用教程


# Docker使用教程

---
## Docker概述

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的[镜像](https://baike.baidu.com/item/镜像/1574)中，然后发布到任何流行的 [Linux](https://baike.baidu.com/item/Linux)或[Windows](https://baike.baidu.com/item/Windows/165458)操作系统的机器上，也可以实现[虚拟化](https://baike.baidu.com/item/虚拟化/547949)。容器是完全使用[沙箱](https://baike.baidu.com/item/沙箱/393318)机制，相互之间不会有任何接口。 

>Q：为什么会出现？
>
>A：环境管理复杂，云计算时代的到来，虚拟化手段的变化，LXC的移动性

GitHub开源地址：[https://github.com/docker/docker-ce]()

官方文档：[https://docs.docker.com/](https://docs.docker.com/)

### 名词解释：

**镜像（image）：**是一个只读模板，含创建Docker容器的说明，它与操作系统的安装光盘有点像

**容器（Container）**：镜像和容器的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

**仓库（Repository）**：仓库可看成一个代码控制中心，用来保存镜像。

| Docker | 面向对象 |
| :----- | :------- |
| 容器   | 对象     |
| 镜像   | 类       |

## 在 Ubuntu20.4 上安装Dcoker与卸载

tips：在其他系统环境中可能有所不同，仅供参考

---

### 安装

1. 更新`apt`包索引并安装包以允许`apt`通过 HTTPS 使用存储库：

   ```shell
    sudo apt-get update
    sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

2. 添加 Docker 的官方 GPG 密钥：

   ```shell
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

3. 安装docker 引擎

   ```shell
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

### 卸载

1. 卸载 Docker 引擎、CLI 和 Containerd 软件包：

   ```shell
   sudo apt-get purge docker-ce docker-ce-cli containerd.io
   ```

2. 主机上的映像、容器、卷或自定义配置文件不会自动删除。要删除所有映像、容器和卷：

   ```shell
    sudo rm -rf /var/lib/docker
    sudo rm -rf /var/lib/containerd
   ```

### 配置镜像加速器

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://4gn8fwxf.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Docker常用命令

### 镜像命令

#### docker images 查看本地镜像

```shell
seawave@seawave:~$ sudo docker images
[sudo] password for seawave: 
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
mysql                 latest    826efd84393b   3 weeks ago     521MB
redis                 latest    7614ae9453d1   3 months ago    113MB

#解释
REPOSITORY 镜像的仓库源
TAG 镜像标签
IMAGE ID 镜像id
CREATED 创建的时间
SIZE 镜像的大小
#可选项
-a, --all #列出所有镜像
-q, --quiet #只显示镜像的id
```

#### docker search 搜索远程镜像

```shell
seawave@seawave:~$ sudo docker search mysql
[sudo] password for seawave: 
NAME                     DESCRIPTION                            STARS     OFFICIAL   AUTOMATED
mysql               MySQL is a widely used, open-source relation…   12353     [OK]       
mariadb               MariaDB Server is a high performing open sou…   4756      [OK]       
mysql/mysql-server      Optimized MySQL Server Docker images. Create…   916      [OK]
percona                 Percona Server is a fork of the MySQL relati…   572       [OK]       
#可选项
--filter
seawave@seawave:~$ sudo docker search mysql --filter=stars=3000 #只显示星标数大于3000的镜像
```

#### docker pull 下载镜像

```shell
seawave@seawave:~$ sudo docker pull hello-world:tag
Using default tag: latest
latest: Pulling from library/hello-world
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Image is up to date for hello-world:latest
docker.io/library/hello-world:latest
#可选项
:tag：下载版本 默认latest（最新版本）
```

#### docker rmi  删除镜像

```shell
seawave@seawave:~$ sudo docker rmi hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Deleted: sha256:feb5d9fea6a5e9606aa995e879d862b825965ba48de054caab5ef356dc6b3412
Deleted: sha256:e07ee1baac5fae6a26f30cabfe54a36d3402f96afda318fe0a96cec4ca393359
seawave@seawave:~$ 
#可选项
-f 镜像id1..镜像id2 #强制删除指定镜像id
```

### 容器命令

#### docker run 创建容器并运行

```shell
docker run [可选参数] [镜像id]
#参数说明
--name="name"	容器名字
-d		#后台方式运行
-it		#用交互方式运行，进入容器查看内容 docker run -it centos /bin/bash
		#退出并停止：exit           退出继续运行:Ctrl+P+Q
-P		#指定随机端口运行
-p		#指定端口运行
--rm     #t
```

#### docker ps 查看容器

```shell
seawave@seawave:~$ sudo docker ps
CONTAINER ID   IMAGE            COMMAND      CREATED         STATUS           PORTS        NAMES
b8434de9fcf7   portainer/portainer   "/portainer"   About an hour ago   Up About an hour   0.0.0.0:9000->9000/tcp, :::9000->9000/tcp   prtainer-test
#可选参数
-a	#列出所有容器，包括未运行的
-n  #列出指定数量容器
-q	#只显示容器编号
```

#### docker rm 删除容器

```shell
seawave@seawave:~$ sudo docker rm 5cf
5cf
#可选项
docker rm -f $(docker ps -aq)	#删除所有容器
```

#### 启动与停止容器

```shell
docker start id	#启动容器
docker restart id	#重启容器
docker stop id	#停止当前容器
docker kill id	#强制停止当前容器
```

### 其他命令

#### docker logs 查看日志

```shell
docker logs	#查看日志
-f 		#跟踪日志输出
-t		#显示时间戳
--tail   #设定显示日志条数
```

#### docker exec进入正在运行的容器

```shell
#方式一:打开一个新终端
docker exec -it 容器id /bin/bash
#方式二：使用正在执行的终端
docker attach 容器id /bin/bash

```

#### docker cp 复制文件

```shell
docker cp 容器ID:/home/test.java /home
# 容器id:容器内部路径 主机路径
```

#### docker commit 保存快照

```shell
docker commit -a "seawave" -m "add file" 容器id
#-a:作者名;-m:提交信息
#此命令可以将当前容器打包为一个镜像，并且保留所做的修改（保存快照）
```

## 数据卷

-------

> 通过数据卷技术可以将容器内部目录与本机目录进行绑定，实现在容器外更改容器内部文件

### 通过-v命令进行绑定

```shell
docker run -it -v /home/test:/home centos /bin/bash
#将容器/home目录映射到宿主机/home/test目录下
```

#### 实战：Mysql持久化

```shell
#获取镜像
docker pull mysql:5.7
#运行容器            注意点：mysql启动时需要配置密码！ -e MYSQL_ROOT_PASSWORD=my-secret-pw
docker run -d -p 3306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=zgq123 --name mysql01 mysql:5.7

```

#### 具名挂载

```shell
docker run -d -P --name nginx-test -v juming-nginx:/etc/nginx nginx
```

所有docker容器内的卷，没有指定目录的情况下都是在` /var/lib/docker/volumes/xxxx/_data`下

![](https://seawave.top/file/docekr/1.png)

#### 卷权限

通过ro/rw改变权限，当权限为ro时，只可从宿主机改变。

```shell
docker run -d -P --name nginx-test -v juming-nginx:/etc/nginx:ro nginx#只读
docker run -d -P --name nginx-test -v juming-nginx:/etc/nginx:fw nginx#读写
```

### 查看卷

```shell
docker volume [create/inspect/ls/prune/rm]
```

+ create 创建卷
+ inspect 卷id ：查看卷信息
+ ls ：查看卷列表
+ rm：移除卷

### 数据卷容器

可以实现不同容器间共享数据

```shell
docker run -it --name centos02 --volumers-from centos01 centos
```

## DockerFile

----------

### 指令

FROM：基础镜像

MAINTAINER：作者，姓名+邮箱

RUN ：镜像构建时的命令

ADD：添加内容

WORKDIR：镜像工作目录

VOLUME：挂载目录

EXPOST：保留端口配置

CMD：指定容器启动时要运行的命令

ENTRYPOINT：指定容器启动时要运行的命令，可以追加命令

### 实战测试

**实战一：在ubuntu镜像中添加vim和net-tools**

DockerHub中99%的镜像都是从scratch基础镜像构建而来。

编写dockerfile文件：

![](https://seawave.top/file/docker/2.png)

执行构建命令：

```shell
docker build -f dockerfile -t myubuntu:1.0 .  #tips:最后有个点
```

**实战儿：在unbuntu中添加tomcat并配置环境**

1. 编写Dockerfile文件

   ```shell
   FROM ubuntu
   MAINTAINER seawave<943581833@qq.com>
   
   ADD jdk-8u151-linux-x64.tar.gz /usr/local/
   ADD apache-tomcat-9.0.62.tar.gz /usr/local/
   RUN apt update
   RUN apt install -y vim
   
   ENV MYPATH /usr/local
   WORKDIR $MYPATH
   
   ENV JAVA_HOME /usr/local/jdk1.8.0_151
   ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
   ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.62
   ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.62
   ENV PATH $PATH:$JAVA_HOME/bin:CATALINA_HOME/lib:CATALINA_HOME/bin
       
   EXPOSE 8080
   CMD /usr/local/apache-tomcat-9.0.62/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.62/logs
   ```

2. 执行build命令

   ```shell
   sudo docker build -t diytomcat .
   ```

3. 运行生成的镜像

   ```shell
   docker run -it -p 9090:8080 --name mytomcat01 -v /home/seawave/build/tomcat/webapps:/usr/local/apache-tomcat-9.0.62/webapps/ -v /home/seawave/build/tomcat/log:/usr/local/apache-tomcat-9.0.62/logs diytomcat /bin/bash
   ```

### 发布镜像到DockerHub

1. 首先登录自己的docker账号

   ```bash
   docker login
   #按照提示输入账号密码即可
   ```

2. 上传镜像

   ```bash
   docker push 容器id
   ```

## Docker网络

首先我们创建一个tomcat容器，发现他的网卡信息如下：

```bash
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)
        RX packets 5048  bytes 9099495 (8.6 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 3543  bytes 243850 (238.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

我们尝试用宿主机ping容器的IP地址172.17.0.2：

```bash
root@seawave:/home/seawave/build/tomcat/webapps# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.035 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.035 ms
64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.036 ms
```

 可以ping通，说明宿主机和容器是互通的。

查看宿主机网卡信息发现：

```bash
root@seawave:/home/seawave/build/tomcat/webapps# ifconfig
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::42:4fff:feb9:d6b9  prefixlen 64  scopeid 0x20<link>
        ether 02:42:4f:b9:d6:b9  txqueuelen 0  (Ethernet)
        RX packets 55332  bytes 3613977 (3.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 105758  bytes 166228443 (166.2 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

宿主机用于桥接容器的虚拟网卡和容器ip地址在同一网段

### 容器互联

在创建容器时可以使用 --link参数指定需要互联的容器

```bash
docker run -d -P --name tomcat02 --link tomcat01 tomcat
```

此时在tomcat2中可以ping通tomcat01.


