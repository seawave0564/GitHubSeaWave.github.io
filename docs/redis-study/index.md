# 初始Redis


## 什么是Redis?

--------

在Web应用发展的初期，那时关系型数据库受到了较为广泛的关注和应用，原因是因为那时候Web站点基本上访问和并发不高、交互也较少。而在后来，随着访问量的提升，使用关系型数据库的Web站点多多少少都开始在性能上出现了一些瓶颈，而瓶颈的源头一般是在磁盘的I/O上。而随着互联网技术的进一步发展，各种类型的应用层出不穷，这导致在当今云计算、大数据盛行的时代，对性能有了更多的需求，主要体现在以下四个方面：

1. 低延迟的读写速度：应用快速地反应能极大地提升用户的满意度
2. 支撑海量的数据和流量：对于搜索这样大型应用而言，需要利用PB级别的数据和能应对百万级的流量
3. 大规模集群的管理：系统管理员希望分布式应用能更简单的部署和管理
4. 庞大运营成本的考量：IT部门希望在硬件成本、软件成本和人力成本能够有大幅度地降低

为了克服这一问题，NoSQL应运而生，它同时具备了高性能、可扩展性强、高可用等优点，受到广泛开发人员和仓库管理人员的青睐。

------------------

Redis是现在最受欢迎的NoSQL数据库之一，Redis是一个使用ANSI C编写的开源、包含多种数据结构、支持网络、基于内存、可选持久性的键值对存储数据库，其具备如下特性：

- 基于内存运行，性能高效
- 支持分布式，理论上可以无限扩展
- key-value存储系统
- 开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API

------

Redis 是一个高性能的key-value数据库。 redis的出现，很大程度补偿了[memcached](https://baike.baidu.com/item/memcached)这类key/value存储的不足，在部 分场合可以对关系数据库起到很好的补充作用。它提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等客户端，使用很方便。

## NoSQL概述

------------

### 什么要用Nosql

NoSQL有如下优点：易[扩展](https://baike.baidu.com/item/扩展/2732987)，NoSQL数据库种类繁多，但是一个共同的特点都是去掉关系数据库的关系型特性。数据之间无关系，这样就非常容易扩展。无形之间也在架构的层面上带来了可扩展的能力。大数据量，高性能，NoSQL数据库都具有非常高的读写性能，尤其在大数据量下，同样表现优秀。这得益于它的无关系性，数据库的结构简单。

### NoSQL分类

**KV键值对：**

+ 新浪：Redis
+ 美团：Redis+Tair
+ 阿里、百度：Redis+memecache

**文档型数据库**（bson格式和json）：

+ MongoDB：
  - 基于分布式存储的数据库，C++编写。
  - 介于关系型数据库和非关系型数据库中中间产品！MongoDB是非关系型数据库中功能最丰富，最像关系型数据库的数据库。

**列存储数据库**：

- HBase
- 分布式文件系统

**图关系数据库**：

+ 存放图形，放的是关系，比如：朋友圈社交网络，广告推荐！
+ Neo4J，InfoGid

## Redis 入门

----------

### 官网与文档：

官网：[https://redis.io](https://redis.io)

中文网：[https://redis.cn](https://redis.cn)

Github：[https://github.com/redis/redis](https://github.com/redis/redis)

### Redis基础语法：

```bash
select n  #切换到第n个数据库
```

```bash
set name zhangsan #设置name的值为zhangsan
```

```bash
get name #获取name值
```

```bash
keys * #查看当前数据库所有键
```

```bash
flushdb #清空当前数据库数据
```

```bash
flushall #清空所有数据库所有数据
```

```bash
exists name #查询name键是否存在
```

``` bash
move name 1 #将name键和值移动至1号数据库
```

``` bash
expire name 10 #设置name键十秒后过期
```

```bash
ttl name #查询name键所剩时间
```

```bash
type name #查询name的数据类型
```

### Redis-Key：

**String**

```bash
append name "hello" #向name追加字符hello
```

```bash
strlen name #查询name长度
```

```bash
set name 30 "xiaoming" #设置name的值为xiaoming并设置过期时间为30妙 
```

```bash
setnx name xiaoming #如果不存在name键则设置name为xiaoming
```

```bash
mset k1 v1 k2 v2 k3 v3 #设置多个键值对
```

```bash
set user:1{name:zhangsan,age:3} #设置一个user:1对象值为json字符串
```

**List**

在redis里面，List可以作为栈、队列、阻塞队列！

```bash
Lpush list one #将one放入list（左侧）
```

```bash
Lrange list 0 -1 #取出全部的值
```

``` bash
Lrange list 0 1 #取出下标从0到1所有值
```

```bash
Rpush list right #将right放入list（右侧）
```

```bash
Lpop list #移除list的第一个元素
```

```bash
Rpop list #移除list的最后一个元素
```

```bash
lindex list 1 #通过下标获取list中的某一个值
```

```bash
Llen list #返回列表的长度
```

```bash
lrem list 2 one #移除2个list中的one值（存在数据重复的情况下）
```

```bash
ltrim list 1 2 #截取下标1至2的数据
```

```bash
rpoplpush list mylist#移除列表最后一个元素并将其移到mylist中
```

```bash
lset list 0 x #将list中下标为0的位置替换为x
```

```bash
existe list #判断这个列表是否存在
```

```bash
linsert list before "world" "other" #在other之前插入world eg:hello world ==> hello other world
```

**Set**

set中的值不能重复！

```bash
sadd myset "hello" #添加一个值为hello
```

``` bash
smembers myset #获取所有值
```

```bash
sismember myset "hello" #判断set集合中是否存在hello
```

``` bash
scard myset #获取set集合中元素个数
```

```bash
srem myset "hello" #移除set集合中值为hello的元素
```

```bash
srandmember myset #随机获取集合中的元素
```

```bash
spop myset #随机删除集合中的元素
```

```bash
smove myset myset2 "hello"#将hello移动到指定set集合
```

```bash
sdiff set1 set2 #查询set1和set2的差集
```

```bash
sinter set1 set2 #查询set1和set2交集
```

```bash
sunion set1 set2 #查询set1和set2的并集
```

**Hash（键值对）**

Map集合，Key-Map集合，值是一个map集合

```bash
hset myhash field1 value1 #set一个key为field1,value的键值对
```

```bash
hmset myhash field2 value1 field2 value2 #set多个键值对
```

```bash
hmget myhash field1 field2 #获取myhashi中的多个键值对
```

```bash
hgetall myhash #获取myhash中全部键值对
```

```bash
hdel myhash filed #删除myhash中键为filed的键值对
```

```bash
hlen myhash #获取myhash中元素个数
```

```bash
hexists myhash field1 #判断hash中指定字段是否存在
```

```bash
hkeys myhash #获取myhash中所有的key
```

```bash
hvals myhash #获取myhash中所有的value
```

```bash
haset myhash field3 value3 #添加一个键值对
```

```bash
hsetrnx myhash filed4 value4 #如果不存在则设置一个值
```

**Zset**

```bash
zadd myset 1 one #添加一个值权重为1
```

```bash
zadd myset 2 two 3 three #添加多个值
```

```bash
zrange myset 0 -1 #查询所有值
```

```bash
zrangebyscore salary -inf +inf #根据salary从小到大排序显示
```

```bash
zrem myset value #移除zset中指定元素
```

```bash
zcard myset #获取有序集合中的元素个数
```

```bash
zcount myset 1 3 #获取指定区间数量
```

## 事务

### 模拟事务

Redis 事务本质：一组命令的集合

+ 开启事务 ``` multi```
+ 命令入队
+ 执行事务 ``` exec ```

锁：Redis可以实现乐观锁

**正常执行事务**

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> get k1
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> exec
1) OK
2) OK
3) "v1"
4) OK

```

**放弃事务：Discard**

**编译型异常：**

> 代码有问题，比如语法错误，事务中所有命令都不会执行

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> setget k2 v2
(error) ERR unknown command `setget`, with args beginning with: `k2`, `v2`, 
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> exec
(error) EXECABORT
```

**运行时异常**

> 其他命令可以正常执行，错误命令抛出异常

```bash
127.0.0.1:6379> set k1 "v1"
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> incr k1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> get k2
QUEUED
127.0.0.1:6379> exec
1) (error) ERR value is not an integer or out of range
2) OK
3) "v2"
```

### 监控

悲观锁：

+ 很悲观，什么时候都会出现问题，无论做什么都加锁

乐观锁：

+ 很乐观，认为什么时候都不会出现问题，所以不会上锁

**Redis监控测试**

正常：

```bash
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 0
OK
127.0.0.1:6379> watch money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> DECRBY money 20
QUEUED
127.0.0.1:6379> INCRBY out 20
QUEUED
127.0.0.1:6379> exec
1) (integer) 80
2) (integer) 20
```

正常执行成功，事务正常结束。

异常情况：

线程一：

```bash
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 0
OK
127.0.0.1:6379> watch money #监视money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379>  Decrby money 20
QUEUED
127.0.0.1:6379> INCRBY out 20
QUEUED
127.0.0.1:6379> 
```

此时不执行exec，模拟**线程二**插队修改数据：

```bash
127.0.0.1:6379> get money
"100"
127.0.0.1:6379> set money 100 #线程二修改money
OK
127.0.0.1:6379> 
```

**线程一**执行exec：

```bash
127.0.0.1:6379> exec
(nil)
```

## Jedis

> Jedis是Redis官方推荐的java链接开发工具，使用java操作Redis。

导入依赖：

```xml
    <dependencies>
        <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>3.2.0</version>
        </dependency>
    </dependencies>
```

连接测试：

```java
        Jedis jedis=new Jedis("192.168.0.103",6379);
        System.out.println(jedis.ping());
```

输出： ```PONG```

### 常用api：

#### String：

```java
        System.out.println("===========增加数据===========");
        System.out.println(jedis.set("key1","value1"));
        System.out.println(jedis.set("key2","value2"));
        System.out.println(jedis.set("key3", "value3"));
        System.out.println("删除键key2:"+jedis.del("key2"));
        System.out.println("获取键key2:"+jedis.get("key2"));
        System.out.println("修改key1:"+jedis.set("key1", "value1Changed"));
        System.out.println("获取key1的值："+jedis.get("key1"));
        System.out.println("在key3后面加入值："+jedis.append("key3", "End"));
        System.out.println("key3的值："+jedis.get("key3"));
        System.out.println("增加多个键值对："+jedis.mset("key01","value01","key02","value02","key03","value03"));
        System.out.println("获取多个键值对："+jedis.mget("key01","key02","key03"));
        System.out.println("获取多个键值对："+jedis.mget("key01","key02","key03","key04"));
        System.out.println("删除多个键值对："+jedis.del("key01","key02"));
        System.out.println("获取多个键值对："+jedis.mget("key01","key02","key03"));
        jedis.flushDB();
        System.out.println("===========新增键值对防止覆盖原先值==============");
        System.out.println(jedis.setnx("key1", "value1"));
        System.out.println(jedis.setnx("key2", "value2"));
        System.out.println(jedis.setnx("key2", "value2-new"));
        System.out.println(jedis.get("key1"));
        System.out.println(jedis.get("key2"));

        System.out.println("===========新增键值对并设置有效时间=============");
        System.out.println(jedis.setex("key3", 2, "value3"));
        System.out.println(jedis.get("key3"));
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(jedis.get("key3"));
        System.out.println("===========获取原值，更新为新值==========");
        System.out.println(jedis.getSet("key2", "key2GetSet"));
        System.out.println(jedis.get("key2"));
        System.out.println("获得key2的值的字串："+jedis.getrange("key2", 2, 4));
```

#### List：

```java
jedis.lpush("collections", "ArrayList", "Vector", "Stack", "HashMap", "WeakHashMap", "LinkedHashMap");
        jedis.lpush("collections", "HashSet");
        jedis.lpush("collections", "TreeSet");
        jedis.lpush("collections", "TreeMap");
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));//-1代表倒数第一个元素，-2代表倒数第二个元素,end为-1表示查询全部
        System.out.println("collections区间0-3的元素："+jedis.lrange("collections",0,3));
        System.out.println("===============================");
        // 删除列表指定的值 ，第二个参数为删除的个数（有重复时），后add进去的值先被删，类似于出栈
        System.out.println("删除指定元素个数："+jedis.lrem("collections", 2, "HashMap"));
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));
        System.out.println("删除下表0-3区间之外的元素："+jedis.ltrim("collections", 0, 3));
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));
        System.out.println("collections列表出栈（左端）："+jedis.lpop("collections"));
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));
        System.out.println("collections添加元素，从列表右端，与lpush相对应："+jedis.rpush("collections", "EnumMap"));
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));
        System.out.println("collections列表出栈（右端）："+jedis.rpop("collections"));
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));
        System.out.println("修改collections指定下标1的内容："+jedis.lset("collections", 1, "LinkedArrayList"));
        System.out.println("collections的内容："+jedis.lrange("collections", 0, -1));
        System.out.println("===============================");
        System.out.println("collections的长度："+jedis.llen("collections"));
        System.out.println("获取collections下标为2的元素："+jedis.lindex("collections", 2));
        System.out.println("===============================");
        jedis.lpush("sortedList", "3","6","2","0","7","4");
        System.out.println("sortedList排序前："+jedis.lrange("sortedList", 0, -1));
        System.out.println(jedis.sort("sortedList"));
        System.out.println("sortedList排序后："+jedis.lrange("sortedList", 0, -1));
```

#### Hash：

```java
   map.put("key1","value1");
        map.put("key2","value2");
        map.put("key3","value3");
        map.put("key4","value4");
        //添加名称为hash（key）的hash元素
        jedis.hmset("hash",map);
        //向名称为hash的hash中添加key为key5，value为value5元素
        jedis.hset("hash", "key5", "value5");
        System.out.println("散列hash的所有键值对为："+jedis.hgetAll("hash"));//return Map<String,String>
        System.out.println("散列hash的所有键为："+jedis.hkeys("hash"));//return Set<String>
        System.out.println("散列hash的所有值为："+jedis.hvals("hash"));//return List<String>
        System.out.println("将key6保存的值加上一个整数，如果key6不存在则添加key6："+jedis.hincrBy("hash", "key6", 6));
        System.out.println("散列hash的所有键值对为："+jedis.hgetAll("hash"));
        System.out.println("将key6保存的值加上一个整数，如果key6不存在则添加key6："+jedis.hincrBy("hash", "key6", 3));
        System.out.println("散列hash的所有键值对为："+jedis.hgetAll("hash"));
        System.out.println("删除一个或者多个键值对："+jedis.hdel("hash", "key2"));
        System.out.println("散列hash的所有键值对为："+jedis.hgetAll("hash"));
        System.out.println("散列hash中键值对的个数："+jedis.hlen("hash"));
        System.out.println("判断hash中是否存在key2："+jedis.hexists("hash","key2"));
        System.out.println("判断hash中是否存在key3："+jedis.hexists("hash","key3"));
        System.out.println("获取hash中的值："+jedis.hmget("hash","key3"));
        System.out.println("获取hash中的值："+jedis.hmget("hash","key3","key4"));
```

#### set：

```java
System.out.println("============向集合中添加元素（不重复）============");
System.out.println(jedis.sadd("eleSet", "e1","e2","e4","e3","e0","e8","e7","e5"));
System.out.println(jedis.sadd("eleSet", "e6"));
System.out.println(jedis.sadd("eleSet", "e6"));
System.out.println("eleSet的所有元素为："+jedis.smembers("eleSet"));
System.out.println("删除一个元素e0："+jedis.srem("eleSet", "e0"));
System.out.println("eleSet的所有元素为："+jedis.smembers("eleSet"));
System.out.println("删除两个元素e7和e6："+jedis.srem("eleSet", "e7","e6"));
System.out.println("eleSet的所有元素为："+jedis.smembers("eleSet"));
System.out.println("随机的移除集合中的一个元素："+jedis.spop("eleSet"));
System.out.println("随机的移除集合中的一个元素："+jedis.spop("eleSet"));
System.out.println("eleSet的所有元素为："+jedis.smembers("eleSet"));
System.out.println("eleSet中包含元素的个数："+jedis.scard("eleSet"));
System.out.println("e3是否在eleSet中："+jedis.sismember("eleSet", "e3"));
System.out.println("e1是否在eleSet中："+jedis.sismember("eleSet", "e1"));
System.out.println("e1是否在eleSet中："+jedis.sismember("eleSet", "e5"));
System.out.println("=================================");
System.out.println(jedis.sadd("eleSet1", "e1","e2","e4","e3","e0","e8","e7","e5"));
System.out.println(jedis.sadd("eleSet2", "e1","e2","e4","e3","e0","e8"));
System.out.println("将eleSet1中删除e1并存入eleSet3中："+jedis.smove("eleSet1", "eleSet3", "e1"));//移到集合元素
System.out.println("将eleSet1中删除e2并存入eleSet3中："+jedis.smove("eleSet1", "eleSet3", "e2"));
System.out.println("eleSet1中的元素："+jedis.smembers("eleSet1"));
System.out.println("eleSet3中的元素："+jedis.smembers("eleSet3"));
System.out.println("============集合运算=================");
System.out.println("eleSet1中的元素："+jedis.smembers("eleSet1"));
System.out.println("eleSet2中的元素："+jedis.smembers("eleSet2"));
System.out.println("eleSet1和eleSet2的交集:"+jedis.sinter("eleSet1","eleSet2"));
System.out.println("eleSet1和eleSet2的并集:"+jedis.sunion("eleSet1","eleSet2"));
System.out.println("eleSet1和eleSet2的差集:"+jedis.sdiff("eleSet1","eleSet2"));//eleSet1中有，eleSet2中没有
jedis.sinterstore("eleSet4","eleSet1","eleSet2");//求交集并将交集保存到dstkey的集合
System.out.println("eleSet4中的元素："+jedis.smembers("eleSet4"));
```

### Jedis事务：

```java
        Jedis jedis = new Jedis("192.168.0.103", 6379);
        System.out.println(jedis.ping());
        JSONObject json =new JSONObject();
        json.put("name","seawave");
        json.put("hello","world");
        String result = json.toJSONString();
        Transaction multi = jedis.multi();
        try {
            multi.set("user1",result);
            multi.set("user2",result);
            int i= 1/0;
            multi.exec();
        } catch (Exception e) {
            e.printStackTrace();
            multi.discard();
        } finally {
            System.out.println(jedis.get("user1"));
            System.out.println(jedis.get("user2"));
            jedis.close();
        }
    }
```

结果：

```java
java.lang.ArithmeticException: 除以零
	at com.seawave.TestTx.main(TestTx.java:21)
null
null
```

## SpringBoot整合：

----

### 简单测试案例

1. 导入依赖:idea可快速导入

2. 配置链接：在application.yml中配置端口、ip等信息。

   ```yml
     redis:
       host: 127.0.0.1
       port: 6379
   ```

3. 测试

```java
@Test
void contextLoads() {
    //opsForValue 操作字符串 类似于String
    //opsForList
    //.....
    //除了基本的操作，我们常用的方法可以通过redisTemplate直接操作比如事务、基本的CRUD
    redisTemplate.opsForValue().set("name","seawave");
    System.out.println(redisTemplate.opsForValue().get("name"));
```

输出：seawave

## Redis.conf文件解析

**网络**

```bash
bind 127.0.0.1 #绑定的IP，用于控制访问
protected-mode yes/no #保护模式
port 6379 #访问端口
```

**通用**

```bash
daemonize no/yes #以守护进程方式运行
pidfile /var/run/redis_6379.pid #如果以守护进程方式运行我们需要指定pid文件
loglevel [debug/verbose/notice/warning] #日志级别 
logfile "" #日志文件路径
databases #数据库数量，默认16
always-show-logo yes/no #是否显示logo
```

**快照**

持久化：在规定的时间内，执行了多少次操作，则会持久化到文件.rdb/.aof

```bash
save 900 1 #如果900秒内，至少有一个key进行了修改，就进行持久化操作
save 300 10 #如果300秒内，至少有10个key进行了修改，就进行持久化操作
save 60 10000 #如果60秒内，至少有10000个key进行了修改，就进行持久化操作
stop-writes-on-bgsave-error yes #如果持久化出错，是否继续工作
rdbcompression yes/no #是否压缩.rdb文件
rdbchecksum yes/no #保存.rdb文件时进行错误校验
dir ./ #.rdb文件保存目录
```

**安全**

```bash
config get requirepass #获取redis密码
config set requirepass "123456" #设置redis的密码
```

**限制**

```bash
maxclients 10000 #设置能连接上redis的最大客户端数量
maxmemory <bytes> #设置redis最大内存占用
```

```xml
maxmemory-policy noeviction 
<!--1、volatile-lru：只对设置了过期时间的key进行LRU（默认值） 
2、allkeys-lru ： 删除lru算法的key   
3、volatile-random：随机删除即将过期key   
4、allkeys-random：随机删除   
5、volatile-ttl ： 删除即将过期的   
6、noeviction ： 永不过期，返回错误-->
```

**AOF持久化**

```bash
appendonly no/yes #是否开启aof持久化，默认为rdb模式
appendfilename "appendonly.aof" #aof持久化文件名
appendfsync everysec/no/always #每秒执行一次同步/不同步/每次修改同步

```

## Redis持久化

Redis是内存数据库，如果不将内存中的数据库状态保存到磁盘，那么一旦服务器进程退出，服务器中的数据库状态也会消失，所以Redis提供了持久化功能。

### RDB(Redis DataBase)

RDB其实就是把数据以快照的形式保存在磁盘上。什么是快照呢，你可以理解成把当前时刻的数据拍成一张照片保存下来。RDB持久化是指在指定的时间间隔内将内存中的数据集快照写入磁盘。也是默认的持久化方式，这种方式是就是将内存中数据以快照的方式写入到二进制文件中,默认的文件名为dump.rdb。

**AOF(AppendOnly File)**

每当有一个修改数据库的命令被执行时，服务器就将命令写入到 appendonly.aof 文件中，该文件存储了服务器执行过的所有修改命令，因此，只要服务器重新执行一次 .aof 文件，就可以实现还原数据的目的，这个过程被形象地称之为“命令重演”。

#### 1) 写入机制

Redis 在收到客户端修改命令后，先进行相应的校验，如果没问题，就立即将该命令存追加到 .aof 文件中，也就是先存到磁盘中，然后服务器再执行命令。这样就算遇到了突发的宕机情况情况，也只需将存储到 .aof 文件中的命令，进行一次“命令重演”就可以恢复到宕机前的状态。

在上述执行过程中，有一个很重要的环节就是命令的写入，这是一个 IO 操作。Redis 为了提升写入效率，它不会将内容直接写入到磁盘中，而是将其放到一个内存缓存区（buffer）中，等到缓存区被填满时才真正将缓存区中的内容写入到磁盘里。

#### 2) 重写机制

Redis 在长期运行的过程中，aof 文件会越变越长。如果机器宕机重启，“重演”整个 aof 文件会非常耗时，导致长时间 Redis 无法对外提供服务。因此就需要对 aof 文件做一下“瘦身”运动。

为了让 aof 文件的大小控制在合理的范围内，Redis 提供了 AOF 重写机制，手动执行`BGREWRITEAOF`命令

## 发布订阅

-----

Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。

Redis 客户端可以订阅任意数量的频道。

下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系：

![](https://www.runoob.com/wp-content/uploads/2014/11/pubsub2.png)

| 序号 | 命令及描述                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | [PSUBSCRIBE pattern [pattern ...\]](https://www.runoob.com/redis/pub-sub-psubscribe.html) 订阅一个或多个符合给定模式的频道。 |
| 2    | [PUBSUB subcommand [argument [argument ...\]]](https://www.runoob.com/redis/pub-sub-pubsub.html) 查看订阅与发布系统状态。 |
| 3    | [PUBLISH channel message](https://www.runoob.com/redis/pub-sub-publish.html) 将信息发送到指定的频道。 |
| 4    | [PUNSUBSCRIBE [pattern [pattern ...\]]](https://www.runoob.com/redis/pub-sub-punsubscribe.html) 退订所有给定模式的频道。 |
| 5    | [SUBSCRIBE channel [channel ...\]](https://www.runoob.com/redis/pub-sub-subscribe.html) 订阅给定的一个或多个频道的信息。 |
| 6    | [UNSUBSCRIBE [channel [channel ...\]]](https://www.runoob.com/redis/pub-sub-unsubscribe.html) 指退订给定的频道。 |

