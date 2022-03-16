---
title: "初识SpringMVC"
date: 2021-12-28T20:50:00+08:00
categories: ["学习笔记"]
tags: ["spring","java"]
draft: false
Author: "SeaWave"
---
## 什么是SpringMVC？
### 1、简介 
很多应用程序的问题在于处理业务数据的对象和显示业务数据的视图之间存在紧密耦合，通常，更新业务对象的命令都是从视图本身发起的，使视图对任何业务对象更改都有高度敏感性。而且，当多个视图依赖于同一个业务对象时是没有灵活性的。

SpringMVC是一种基于Java，实现了Web MVC设计模式，请求驱动类型的轻量级Web框架，即使用了MVC架构模式的思想，将Web层进行职责解耦。基于请求驱动指的就是使用请求-响应模型，框架的目的就是帮助我们简化开发，SpringMVC也是要简化我们日常Web开发。

### 2、MVC设计模式

MVC设计模式的任务是将包含业务数据的模块与显示模块的视图解耦。这是怎样发生的？在模型和视图之间引入重定向层可以解决问题。此重定向层是控制器，控制器将接收请求，执行更新模型的操作，然后通知视图关于模型更改的消息。

+ Model（模型）：
+ View（视图）：
+ Controller（控制器）：

![结构](https://img-blog.csdnimg.cn/20190328153555304.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpdGlhbnhpYW5nX2thb2xh,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20190630145911981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpdGlhbnhpYW5nX2thb2xh,size_16,color_FFFFFF,t_70)

### 3、初识SpringMVC

#### 第一步、配置web.xml

```xml
<!--    注册DispatcherServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--       关联一个springmvc配置文件-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spirngmvc-servlet.xml</param-value>
        </init-param>
<!--        设置启动级别-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>·
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

#### 第二步、配置spirngmvc-servlet.xml

```xml
 <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>  
 <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>  
<!-- 视图解析器:DispatcherServlet给他的ModeLAndVIew-->  
<!--    1.获取了ModelAndView的数据-->  
<!--    2.解析ModelAndView的试图名字-->  
<!--    3.拼接试图名字，找到对应视图-->  
<!--    4.将数据渲染到视图上-->  
 <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">  
<!-- 前置-->  
 <property name="prefix" value="/WEB-INF/jsp/"/>  
<!-- 后缀-->  
 <property name="suffix" value=".jsp"/>  
 </bean><!--    Handler-->  
 <bean id="/hello" class="com.seawave.HelloController"/>  
</beans>
```

#### 第三步、在Controller类中测试
```java
 @Override  
 public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {  
//        modelAndView 模型和视图  
 ModelAndView mv = new ModelAndView();  
// 封装对象，放在ModelAndView中  
 mv.addObject("msg","helloSpringMVC");  
// 封装要跳转的视图，放在ModelAndView中  
 mv.setViewName("hello");  
 return mv;  
  
 }  
}
```

结果：在浏览器中显示hellospringmvc。

## SpringMVC的使用

### 1、使用注解开发SpringMVC

**步骤1 ：配置web.xml**

```java
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--    注册DispatcherServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--       关联一个springmvc配置文件-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spirngmvc-servlet.xml</param-value>
        </init-param>
        <!--        设置启动级别-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

***tips：此文件除非特殊需求无需变动***

-----

**步骤2：配置springmvc-servlet**

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/mvc
       https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <context:component-scan base-package="com.seawave.controller"/>
    <mvc:default-servlet-handler/>
    <mvc:annotation-driven/>
<!--    视图解析器:DispatcherServlet给他的ModeLAndVIew-->
<!--    1.获取了ModelAndView的数据-->
<!--    2.解析ModelAndView的试图名字-->
<!--    3.拼接试图名字，找到对应视图-->
<!--        4.将数据渲染到视图上-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
<!--        前置-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
<!--        后缀-->
        <property name="suffix"  value=".jsp"/>
    </bean>
</beans>
```

***tips:此文件除特殊需求无需变动***

--------

**步骤3：创建控制器**

```java
@Controller
@RequestMapping("/test")    //非必须
public class HelloController {
    @RequestMapping("/hello")  //真实地址：项目路径/test/hello
    public String hello(Model model){
        model.addAttribute("msg","Hello,SpringMVCAnnotation!");
        return "hello"; //会被视图解析器处理
    }
}
```

此时在浏览器中访问http://localhost:8080/test/hello可以看到后端返回了：Hello,SpringMVCAnnotation!

### 2、Restful风格

传统风格与Restful风格对比：

传统：http://baidu.com?search=china

Restful：http://baidu.com/china

使用Restful风格可以使同一个url提交不同请求。

示例代码：

```java
@Controller
public class RestFulController {
    方式1：@RequestMapping(value = "/add/{a}/{b}",method = RequestMethod.GET)
    方式2：@GetMapping("/add/{a}/{b}")
    public String test1(@PathVariable int a, @PathVariable int b, Model mv){
        mv.addAttribute("msg",a+b);
        return "test";
    }
}
```

当我们在浏览器中输入http://localhost:8080/add/1/2时，可以得到结果：3

从示例代码中可以看到我们指定了提交方式为GET，我们也可以通过注解的方式直接限定提交方式：

+ @GetMapping
+ @POSTMapping
+ @DELETEMapping
+ .....

### 3、获取请求参数

#### 接收为普通参数

使用springmvc获取前端请求的参数时，只需要在控制器上设置相应的传参即可。

```java
public class Controller {
    @RequestMapping("/add")
    public String test1(int a, int b, Model mv){
        mv.addAttribute("msg",a+b);
        return "test";
    }
}
```

默认情况下，形参类型和请求参数的名称一致，比如当我访问http://localhost:8080/add?a=1&b=2时，那么a变量和b变量便会自动赋值1

和2，当形参名和请求参数名不一致时，我们可以添加@RequestParam 注解使之匹配：

```java
public class Controller {
    @RequestMapping("/add")
    public String test1(@RequestParam("a") int num1,@RequestParam("b") int num, Model mv){
        mv.addAttribute("msg",a+b);
        return "test";
    }
}
```

此时请求参数ab的值将会赋值到num1和num2.

#### 接收为实体类

我们可以直接在控制器的形参中添加一个实体类，当前端发送请求时会自动创建该类的实体对象，会自动匹配属性名进行赋值：

```java
@RequestMapping("/test2")
public String test2( User user){
    System.out.println(user);
    return "test";
}
```

此时我们访问http://localhost:8080/test2?name=zs&id=11&age=21时会创建一个name=zs，id=11，age=21的User对象。

控制台输出如下：

```
User(id=11, name=zs, age=21)
```

**注：请求参数名必须和实体类属性名一致，否则为null**

### 4、设置编码方式

前后端传递数据时，经常会遇到编码问题，比如中文乱码。springMVC为我们提供了一个现成的过滤器，我们直接在web.xml中配置即可。

```xml
<filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>		
```

### 5、SpringMVC返回数据

大多数情况下，后端所要做的事仅仅是向前端返回数据，这意味着我们并不需要使用到视图解析器返回视图，我们可以给控制器的方法添加@ResponseBody注解来表示此处理器只返回数据。

例子：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/j1")
    @ResponseBody //使此控制器不会走视图解析器，直接返回字符串
    public String json1(){
        String str="";
        User user =new User("海浪",20,"男");
        ObjectMapper mapper=new ObjectMapper();
        try {
             str = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return str;
    }
}
```

此控制器会返回一个user类的JSON字符串。

我们也可以在控制器类上使用@RestController来表明此控制器下的所有控制器均只返回数据。

### 6、解决SpringMVC返回JSON乱码问题

```xml
    <bean id="utf8Charset" class="java.nio.charset.Charset" factory-method="forName">
        <constructor-arg value="UTF-8" />
    </bean>
<mvc:annotation-driven>
    <mvc:message-converters register-defaults="true">
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <constructor-arg value="UTF-8"/>
        </bean>
        <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
            <property name="objectMapper">
                <bean class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean">
                    <property name="failOnEmptyBeans" value="false"/>
                </bean>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```