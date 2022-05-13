---
title: "VirtualBox安装MacOS虚拟机"
date: 2022-05-13T16:30:26+08:00
categories: ["折腾记录"]
draft: false
tags: ["虚拟机"]
Author: "SeaWave"
---

## 在VirtualBox中安装MacOS

### 前言

博主环境如下：

宿主机：WINDOWS 10 H1H2

VirtualBox版本：6.1.34

虚拟机设置如下：

+ 内存：4096MB
+ 处理器：数量4，运行峰值100%
+ 显存：128MB
+ USB设备：USB 3.0
+ 其他：默认

环境无须一样，正常来说更高版本不会出现兼容性问题（不是绝对）。

### 第一步：下载镜像

可以在[https://sysin.org/blog/macOS/](https://sysin.org/blog/macOS/)下载iso镜像，各个版本都有。

此处感谢[GitHub netgc](https://github.com/netgc)大佬的收录与整理，非常感谢！[捐赠地址](https://sysin.org/donate/)

![image-20220513131821561](/file/vb-mac//image-20220513131821561.png)

选择你需要的版本下载即可。

### 第二步：创建虚拟机

![image-20220513132201749](/file/vb-mac//image-20220513132201749.png)

磁盘大小和内存大小按需设置。但是不可太小。

以macOS Big Sur为例 内存大小建议4GB以上，磁盘大小必须大于40GB！！

接下来，载入你下载的镜像

选择创建的虚拟机-点击属性=点击存储-点击右下角绿色加号添加虚拟光盘-选择你的镜像（未注册先注册）

![image-20220513132455412](/file/vb-mac//image-20220513132455412.png)

### 第三步：配置环境

```bash
cd “C:\Program Files\Oracle\VirtualBox\”
VBoxManage.exe modifyvm "macOS" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff
VBoxManage setextradata "macOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac19,1"
VBoxManage setextradata "macOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "macOS" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-AA95B1DDAB278B95"
VBoxManage setextradata "macOS" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "macOS" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
VBoxManage setextradata "macOS" "VBoxInternal2/EfiGraphicsResolution" "1440x900"
```

请逐行运行命令，其中第一行为你virtualbox主程序路径。"MacOS"为虚拟机的名字

**不确定名字的话输入` VBoxManage list vms`查看，输错了会导致后面开机进不了界面，重新输对一次就可以了,无需重新安装。**

### 第四步：进入系统

![image-20220513134400435](/file/vb-mac//image-20220513134400435.png)

启动虚拟机后会进入命令行，我们输入`exit`退出命令行。

![image-20220513134450528](/file/vb-mac//image-20220513134450528.png)

依次选择：Boot Maintenance Mannager-Boot From File

选择：

![image-20220513134625626](/file/vb-mac//image-20220513134625626.png)

依次进入目录：System-Library-CoreServices

选择`boot.efi`后单击回车，等待一段时间后即可进入安装页。

![image-20220513134754765](/file/vb-mac/image-20220513134754765.png)

### 第五步：安装MAC  OS 

进入系统后选择语言：

![image-20220513135203389](/file/vb-mac//image-20220513135203389.png)

中国人自然选择中文。

选择磁盘工具。

![image-20220513135341868](/file/vb-mac//image-20220513135341868.png)

选中磁盘后，点击**抹掉**按钮，文件系统默认即可。系统会自动格式化磁盘。（这一步选择磁盘时务必注意你选择的磁盘是否是你在虚拟机给mac创建的磁盘，大小>40GB）

![image-20220513140201384](/file/vb-mac//image-20220513140201384.png)

![image-20220513140206019](/file/vb-mac//image-20220513140206019.png)

完成后点击右上角磁盘工具，退出磁盘工具。

![image-20220513140457423](/file/vb-mac//image-20220513140457423.png)

选择第二项，安装macOS

![image-20220513140534686](/file/vb-mac//image-20220513140534686.png)

同意许可后选择创建的磁盘。单机继续。然后等待

![image-20220513140729750](/file/vb-mac//image-20220513140729750.png)

继续等待。。。

![image-20220513141459484](/file/vb-mac//image-20220513141459484.png)

### 步骤六：进入系统

安装完成后即可进入系统：

![image-20220513162431755](/file/vb-mac//image-20220513162431755.png)

#### enjoy it！
