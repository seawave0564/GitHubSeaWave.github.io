---
title: "初识SpringBoot"
date: 2022-03-01T19:00:00+08:00
categories: ["学习笔记"]
draft: false
Author: "SeaWave"
---

## 什么是SpringBoot？

Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。

**简单来说**，springboot就是会我们自动配置spring框架，从而简化开发流程。

所以**约定大于配置**变得尤为重要。

## 构建SpringBoot程序

### 方式一、从官网构建

在以下网站中初始化配置后，下载到本地使用idea导入即可。

``` 
https://start.spring.io/
```

### 方式二、使用idea自带方式构建

在new project窗口中选择Spring initializr，然后初始化配置即可。

------------

tips:在resources目录下修改或新建banner.txt可以修改spring启动时欢迎语

模板:

```txt
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
```

效果：

![文件位置](https://seawave.top/file/springboot/3.png)

## SpringBoot原理初探

### 1、启动器 spring-boot-starter

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**springboot-boot-starter-xxx**：就是spring-boot的场景启动器

**spring-boot-starter-web**：帮我们导入了web模块正常运行所依赖的组件；

SpringBoot将所有的功能场景都抽取出来，做成一个个的starter （启动器），只需要在项目中引入这些starter即可，所有相关的依赖都会导入进来 ， 我们要用什么功能就导入什么样的场景启动器即可 ；我们未来也可以自己自定义 starter；

### 2、主启动类

#### 默认的主动启动类

```java
//@SpringBootApplication 来标注一个主程序类//说明这是一个Spring Boot应用@SpringBootApplicationpublic class SpringbootApplication {
   public static void main(String[] args) {     //以为是启动了一个方法，没想到启动了一个服务      
       SpringApplication.run(SpringbootApplication.class, args);   
   }
}
```

#### @SpringBootApplication注解

> 作用：标注在某个类上说明这个类是SpringBoot的主配置类 ， SpringBoot就应该运行这个类的main方法来启动SpringBoot应用；

#### spring.factories

我们根据源头打开spring.factories ， 看到了很多自动配置的文件；这就是自动配置根源所在！

![spring.factories](https://seawave.top/file/springboot/1.png)

#### **SpringApplication**

**这个类主要做了以下四件事情：**

1、推断应用的类型是普通的项目还是Web项目

2、查找并加载所有可用初始化器 ， 设置到initializers属性中

3、找出所有的应用程序监听器，设置到listeners属性中

4、推断并设置main方法的定义类，找到运行的主类

![SpringApplication](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZicjafiawQLp9u8wc4ic1Mjy6OyfibzfjVofeL5pnS1NSFKVjlIg6neI9ySg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## YAML

YAML 是 "YAML Ain't a Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。

YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种配置文件、倾印调试内容、文件大纲（例如：许多电子邮件标题格式和YAML非常接近）。

YAML 的配置文件后缀为 **.yml**，如：**application.yml** 。

### 基本语法

- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释

### 数据类型

YAML 支持以下几种数据类型：

- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值

#### YAML对象

对象键值对使用冒号结构表示 **key: value**，冒号后面要加一个空格。

也可以使用 **key:{key1: value1, key2: value2, ...}**。

还可以使用缩进表示层级关系；

```yaml
key: 
    child-key: value
    child-key2: value2
```

#### YAML数组

```yaml
- A
- B
- C
```

YAML 支持多维数组，可以使用行内表示：

```yaml
key: [value1, value2, ...]
```

数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。

```yaml
-
 - A
 - B
 - C
```

**例子**

```yaml
companies:
    -
        id: 1
        name: company1
        price: 200W
    -
        id: 2
        name: company2
        price: 500W
```

#### 复合结构

数组和对象可以构成复合结构，例：

```yaml
languages:
  - Ruby
  - Perl
  - Python 
websites:
  YAML: yaml.org 
  Ruby: ruby-lang.org 
  Python: python.org 
  Perl: use.perl.org
```

转换为 json 为：

```yaml
{ 
  languages: [ 'Ruby', 'Perl', 'Python'],
  websites: {
    YAML: 'yaml.org',
    Ruby: 'ruby-lang.org',
    Python: 'python.org',
    Perl: 'use.perl.org' 
  } 
}
```

## 配置文件切换

### 1、多环境切换

profile是Spring对不同环境提供不同配置功能的支持，可以通过激活不同的环境版本，实现快速切换环境；

我们在主配置文件编写的时候，文件名可以是 application-{profile}.properties/yml , 用来指定多个环境版本；

**例如：**

application-test.properties 代表测试环境配置

application-dev.properties 代表开发环境配置

但是Springboot并不会直接启动这些配置文件，它**默认使用application.properties主配置文件**；

我们需要通过一个配置来选择需要激活的环境：

```properties
#比如在配置文件中指定使用dev环境，我们可以通过设置不同的端口号进行测试；#我们启动SpringBoot，就可以看到已经切换到dev下的配置了;

spring.profiles.active=dev
```

**yaml的多文档块**

```yaml
server:
  port: 8081
#选择要激活那个环境块
spring:
  profiles:
    active: prod
---
server:
  port: 8083
spring:
  profiles: dev #配置环境的名称
---
server:
  port: 8084
spring:
  profiles: prod  #配置环境的名称
```

**注意：如果yml和properties同时都配置了端口，并且没有激活其他环境 ， 默认会使用properties配置文件的！**

### 2、配置文件加载位置

![文件位置](https://seawave.top/file/springboot/2.png)

springboot 启动会扫描以下位置的application.properties或者application.yml文件作为Spring boot的默认配置文件：

```
优先级1：项目路径下的config文件夹配置文件
优先级2：项目路径下配置文件
优先级3：资源路径下的config文件夹配置文件
优先级4：资源路径下配置文件
```

## 使用SpringBoot进行Web开发

### 1、静态资源处理

在springboot中，我们可以使用以下方式处理今天资源。

+ webjars  `localhost:8080/webjars/`
+ public，static，/**，resources `localhost:8080`

优先级 ：resources>static>public

### 2、模板引擎Thymeleaf

-----

>  模板引擎的作用就是我们来写一个页面模板，比如有些值呢，是动态的，我们写一些表达式。而这些值，从哪来呢，就是我们在后台封装一些数据。然后把这个模板和这个数据交给我们模板引擎，模板引擎按照我们这个数据帮你把这表达式解析、填充到我们指定的位置，然后把这个数据最终生成一个我们想要的内容给我们写出去，这就是我们这个模板引擎，不管是jsp还是其他模板引擎，都是这个思想。只不过呢，就是说不同模板引擎之间，他们可能这个语法有点不一样。其他的我就不介绍了，我主要来介绍一下SpringBoot给我们推荐的Thymeleaf模板引擎，这模板引擎呢，是一个高级语言的模板引擎，他的这个语法更简单。而且呢，功能更强大。

Thymeleaf 官网：https://www.thymeleaf.org/

Thymeleaf 在Github 的主页：https://github.com/thymeleaf/thymeleaf

Spring官方文档：找到我们对应的版本

[https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#using-boot-starter](https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#using-boot-starter)

pom依赖：

```xml
<!--thymeleaf-->
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### 3、页面国际化

> 国际化的作用就是使页面支持多种语言切换，从而使页面国际化！

#### 编写配置文件

1. 我们在resources资源文件下新建一个i18n目录，存放国际化配置文件

2. 建立一个login.properties文件，还有一个login_zh_CN.properties；发现IDEA自动识别了我们要做国际化操作；文件夹变了！

   ![4](https://seawave.top/file/springboot/4.png)

3. 然后就行翻译处理，将所需要翻译的文本翻译后填入对应的文本框中

   ![5](https://seawave.top/file/springboot/5.png)

4. 配置目录：在application.properties中配置

   ```properties
   spring.messages.basename=i18n.login
   ```
   
#### 配置页面国际化值
   去页面获取国际化的值，查看Thymeleaf的文档，找到message取值操作为：#{...}

   ![6](https://seawave.top/file/springboot/6.png)

#### 配置国际化解析

>  假如我们现在想点击链接让我们的国际化资源生效，就需要让我们自己的Locale生效！我们去自己写一个自己的LocaleResolver，可以在链接上携带区域信息！修改一下前端页面的跳转连接：

![7](https://seawave.top/file/springboot/7.png)

我们去写一个处理的组件类！

 ```java
 package com.kuang.component;
 import org.springframework.util.StringUtils;
 import org.springframework.web.servlet.LocaleResolver;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import java.util.Locale;
 //可以在链接上携带区域信息
 public class MyLocaleResolver implements LocaleResolver {
     //解析请求
     @Override
     public Locale resolveLocale(HttpServletRequest request)hailagn {
         String language = request.getParameter("l");
         Locale locale = Locale.getDefault(); // 如果没有获取到就使用系统默认的
         //如果请求链接不为空
         if (!StringUtils.isEmpty(language)){
             //分割请求参数
             String[] split = language.split("_");
             //国家，地区
             locale = new Locale(split[0],split[1]);
         }
         return locale;
     }
     @Override
     public void setLocale(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Locale locale) {
     }
 }
 ```

为了让我们的区域化信息能够生效，我们需要再配置一下这个组件！在我们自己的MvcConofig下添加bean；

```java
@Bean
public LocaleResolver localeResolver(){
    return new MyLocaleResolver();
}
```

#### 配置登录拦截器

1. 编写拦截器类

   ```java
   public class LoginHandlerInterceptor implements HandlerInterceptor {
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           Object loginUser = request.getSession().getAttribute("loginUser");
           if(loginUser==null){
               request.setAttribute("msg","没有权限，请先登录");
               //转发至主页
               request.getRequestDispatcher("/index.html").forward(request,response);
               return false;
           }else{
               return true;
           }
       }
   }
   ```

2. 实例化拦截器并注入

   ```java
       @Override
       public void addInterceptors(InterceptorRegistry registry) {
           registry.addInterceptor(new 		LoginHandlerInterceptor()).addPathPatterns("/**").excludePathPatterns("/index.html","/","/user/login","/css/**","/img/**");
       }
   ```

   **拦截请求时注意过滤静态资源，拦截静态资源会导致css样式不可用，无法访问请求等状况。**
## SpringBoot整合Mybatis

   在绝大多数开发场景中，我们都需要通过数据库进行数据的存储，就目前来说，Mybatis是一个比较常用的持久层框架，他能很好的帮助我们的开发，在下面的例子将会说明如何在springboot中整合mybatis。

官方文档：[http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/](http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)

Maven仓库地址：[https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter](https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter) 	

### 整合案例：

1. 导Mybatis依赖：

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
```

2. 配置数据源：

```yaml
spring:
  datasource:
    username: root
    password: root
    #?serverTimezone=UTC解决时区的报错
    url: jdbc:mysql://localhost:3306/springboot?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

    #Spring Boot 默认是不注入这些属性值的，需要自己绑定
    #druid 数据源专有配置
    initialSize: 5
    minIdle: 5
    maxActive: 20
    maxWait: 60000
    timeBetweenEvictionRunsMillis: 60000
    minEvictableIdleTimeMillis: 300000
    validationQuery: SELECT 1 FROM DUAL
    testWhileIdle: true
    testOnBorrow: false
    testOnReturn: false
    poolPreparedStatements: true

    #配置监控统计拦截的filters，stat:监控统计、log4j：日志记录、wall：防御sql注入
    #如果允许时报错  java.lang.ClassNotFoundException: org.apache.log4j.Priority
    #则导入 log4j 依赖即可，Maven 地址：https://mvnrepository.com/artifact/log4j/log4j
    filters: stat,wall,log4j
    maxPoolPreparedStatementPerConnectionSize: 20
    useGlobalDataSourceStat: true
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
```

3. 创建测试表：

![8](http://seawave.top/file/springboot/8.png)

4. 创建实体类：

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int number;
    private String name;
    private int age;
    private String sex;
}
```

5.在application.yml中配置mybatis实体类映射：

```yml
mybatis:
  type-aliases-package: com.seawave.pojo
  mapper-locations: classpath:mybatis/mapper/*.xml
```
6.编写UserMapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.seawave.mapper.UserMapper">
    <!--    查询所有用户-->
    <select id="queryUserList" resultType="com.seawave.pojo.User">
        select *
        from student
    </select>
    <!--    根据id查询用户-->
    <select id="queryUserById" resultType="User">
        select *
        from student
        where id = #{id}
    </select>
    <!--添加一个用户-->
    <insert id="addUser" parameterType="User">
        insert into student (name, age, sex)
        values (#{name}, #{age}, #{sex})
    </insert>
    <!--    更新一个用户-->
    <update id="updateUser" parameterType="User">
        update student
        set name=#{name},
            age=#{age},
            sex=#{sex}where id =#{id}
    </update>
    <!--删除一个用户-->
    <delete id="deleteUser" parameterType="int">
        delete
        from student
        where id = #{id}
    </delete>
</mapper>
```

7. 在测试类中测试是否正常连接数据库

```java
@SpringBootTest
class Springboot05MybatisApplicationTests {
    @Autowired
    UserMapper userMapper;
    @Test
    void contextLoads() {
        for (User user : userMapper.queryUserList()) {
            System.out.println(user);
        }
    }

}
```

成功即可读取到数据库表内容：

![9](http://seawave.top/file/springboot/9.png)vv
