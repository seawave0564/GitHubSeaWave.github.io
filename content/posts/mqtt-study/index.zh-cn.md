---
title: "初识MQTT协议"
date: 2022-03-17T00:30:26+08:00
categories: ["学习笔记"]
draft: false
tags: ["物联网","协议"]
Author: "SeaWave"
---
## MQTT协议简解

------

**MQTT**(**消息队列遥测传输**)是[ISO](https://baike.baidu.com/item/ISO/10400) 标准(ISO/IEC PRF 20922)下基于[发布](https://baike.baidu.com/item/发布/33814)/[订阅](https://baike.baidu.com/item/订阅/8724574)范式的消息协议。它工作在 TCP/IP协议族上，是为[硬件性能](https://baike.baidu.com/item/硬件性能/12730200)低下的远程设备以及网络状况糟糕的情况下而设计的发布/订阅型消息[协议](https://baike.baidu.com/item/协议/670528)，为此，它需要一个[消息中间件 ](https://baike.baidu.com/item/消息中间件 /5899771)。

MQTT是一个基于[客户端](https://baike.baidu.com/item/客户端/101081)-[服务器](https://baike.baidu.com/item/服务器/100571)的消息发布/订阅传输协议。MQTT协议是轻量、简单、开放和易于实现的，这些特点使它适用范围非常广泛。在很多情况下，包括受限的环境中，如：机器与机器（M2M）通信和物联网（IoT）。其在，通过卫星链路通信传感器、偶尔拨号的医疗设备、智能家居、及一些小型化设备中已广泛使用。

## MQTT的实现方式

实现MQTT协议需要客户端和服务器端通讯完成，在通讯过程中，MQTT协议中有三种身份：发布者（Publish）、代理（Broker）（服务器）、订阅者（Subscribe）。其中，消息的发布者和订阅者都是客户端，消息代理是服务器，消息发布者可以同时是订阅者。

MQTT传输的消息分为：主题（Topic）和负载（payload）两部分：

- （1）Topic，可以理解为消息的类型，订阅者订阅（Subscribe）后，就会收到该主题的消息内容（payload）；
- （2）payload，可以理解为消息的内容，是指订阅者具体要使用的内容。

## MQTT的特点

1. 相互可独立：订阅者之间并不知道对方的存在，而发布者也不知道有多少客户端订阅了自己。
2. 空间可分离：只要订阅者、服务器、发布者连接了网络，那么就不受空间距离限制。
3. 时间可异步：订阅者有时并不能立马收到发布者的消息（比如断网），但是当可以接收时可以继续接收到已经发布的消息。

## MQTT客户端与服务端连接过程

---------

1. 首先MQTT客户端将会向服务端发送连接请求。该请求实际上是一个包含有连接请求信息的数据包。这个数据包的官方名称为**CONNECT**。

![MQTT-Client-Sends-Connection-Request](https://seawave.top/file/mqtt/MQTT-Client-Sends-Connection-Request.png)

2. MQTT服务端收到客户端连接请求后，会向客户端发送连接确认。同样的，该确认也是一个数据包。这个数据包官方名称为**CONNACK**。

![MQTT-Server-Sends-Connection-Confirmation](https://seawave.top/file/MQTT/MQTT-Server-Sends-Connection-Confirmation.png)

### CONNECT报文

在上面的描述中我们看到。MQTT客户端要想连接服务端，首先要向服务端发送CONNECT报文。如果此CONNECT报文的格式或内容不符合MQTT规范，则服务器会拒绝客户端的连接请求。

下图是CONNECT报文所包含的信息内容。

![MQTT-connect](https://seawave.top/file/MQTT/MQTT-connect.gif)

#### **clientId – 客户端ID**

ClientId是MQTT客户端的标识。MQTT服务端用该标识来识别客户端。因此ClientId必须是独立的。如果两个MQTT客户端使用相同ClientId标识，服务端会把它们当成同一个客户端来处理。通常ClientId是由一串字符所构成的，如上图所示，此示例中的clientID是“client-1”。

#### **cleanSession – 清除会话**

cleanSession有两种状态分别为true和false，当设置为true时，服务器将不会确认客户端是否收到消息，也不会保存报文，当设置为false时，服务器发出报文后会等待客户端发送确认报文，如果没有收到确认报文，则会保存报文，等待下次发送。

**请注意，如果需要服务端保存重要报文，光设置cleanSession 为false是不够的，还需要传递的MQTT信息QoS级别大于0。**

关于QoS的概念，我们会在本教程后续课程中详细讲解。到目前请您务必牢记，**如果想让服务器记住重要报文，那么客户端在连接服务端时，需要把cleanSession中设置为false**。这一点非常关键，请务必牢记。

#### **keepAlive – 心跳时间间隔

MQTT服务端运行过程中，当有客户端因为某种原因断开了与服务端的连接，服务端需要实时了解这一情况。**KeepAlive** （心跳时间间隔）正是用于服务端了解客户端连接情况的目前您只需要记住，**KeepAlive**用于服务端实时了解客户端是否与其保持连接的情况。

### CONNACK – 确认连接请求报文

CONNACK报文包括两个信息。一个是returnCode(连接返回码)，另一个是sessionPresent (当前会话)。以下是这两个信息的说明：

![connack](https://seawave.top/file/MQTT/connack.gif)

#### **returnCode – 连接返回码**

当服务端收到了客户端的连接请求后，会向客户端发送returnCode(连接返回码)，用以说明连接情况。如果客户端与服务端成功连接，则返回数字“0”。如果未能成功连接，连接返回码将会是一个非零的数值，具体这个数值的含义，请见下表：

| 返回码 | 返回码描述                                             |
| ------ | ------------------------------------------------------ |
| 0      | 成功连接                                               |
| 1      | 连接被服务端拒绝，原因是不支持客户端的MQTT协议版本     |
| 2      | 连接被服务端拒绝，原因是不支持客户端标识符的编码。     |
| 3      | 连接被服务端拒绝，网络连接已经建立，但MQTT服务不可用。 |
| 4      | 连接被服务端拒绝，原因是用户名或密码无效。             |
| 5      | 连接被服务端拒绝，原因是客户端未被授权连接到此服务端。 |

**sessionPresent – 当前会话**

当重要客户端连接服务端时，服务端可能保存着没有得到确认的报文。如果是这样的话，那么客户端在连接服务端时，就会通过sessionPresent来了解服务端是否有之前未能确认的信息。简单来说，sessionpressent携带着是否收到报文的确认信息。























