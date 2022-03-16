---
title: "通过SakuraFrp进行远程桌面连接"
date: 2021-01-12T18:00:00+08:00
draft: false
tags: ["windows","frp"]
categories: ["Windows小技巧"]
Author: "SeaWave"
---
## SakuraFrp简介  
SakuraFrp是目前市面上少有的免费内网穿透平台，可以用于个人搭建服务器和做一些应用的流量穿透。花生壳虽然也有免费的，但是带宽和流量都有很大限制，SakuraFrp免费用户就可提供10Mbps和6GB的流量相比之下这个平台算是比较良心的了。  


点此处进入[Sakura官网](https://www.natfrp.com/)  
## 连接端和被链接端准备  
这里我们以win10 20H2版本做演示  
1.按WIN+R打开运行窗口


2.在运行窗口输入  `SystemPropertiesRemote`  
![运行窗口](https://seawave.top/blogimage/blog2-1.png)  


3.在远程协助中勾选 `允许远程协助链接这台计算机`  
&nbsp;&nbsp;在远程桌面中选择 `允许远程连接到此计算机`  
![系统属性](https://seawave.top/blogimage/blog2-2.png)     


4.确定。到此配置完毕。  
## 创建SakuraFrp隧道  
1.注册账号  
2.创建隧道：  
>节点最好是选国内的，联通还是电信根据你自己的网络环境来选。  
>隧道名称随意，取一个你自己能分辨的就行  
>隧道类型 选TCP  
>本地地址填127.0.0.1  
>本地端口填3389（windows远程连接的端口号） 
>远程端口留空即可  

![创建隧道](https://seawave.top/blogimage/blog2-3.png)  
4.单击确认创建，完成创建。  
## 连接隧道  
1.下载Sakura客户端。[单击下载](https://getfrp.sh/l/SakuraLauncher.zip)   
&nbsp;&nbsp;无法下载可以在主页点击软件下载手动选择windows客户端。  


2.打开客户端并登录  
![客户端](https://seawave.top/blogimage/blog2-4.jpg)  
（可以选择开机自启这样每次开机会自动连接到隧道）   


3.点击隧道，可以看到我们刚刚创建的隧道。  
![隧道](https://seawave.top/blogimage/blog2-5.jpg)  


4.点击启动开关启动隧道，这样你的电脑就成功连接到了sakura服务器。电脑右下角会给出一个通知，提示连接方式。
来不及保存的话可以点击软件左侧的日志选项，里面会写出你连接到你电脑所需的IP和端口号。  
![日志](https://seawave.top/blogimage/blog2-6.png)  

5.保存所提示的IP或域名，选择其中一种即可。  
## 在其他电脑上连接到你的电脑  
1.打开远程连接工具。  
>第1种方法：win+r打开运行窗口，输入mstsc。  
>第2种方法：单击开始菜单，在附件中找到远程桌面连接。 

![远程桌面连接](https://seawave.top/blogimage/blog2-7.png)  
2.输入你的ip:端口。  
3.完成你的连接。  

 