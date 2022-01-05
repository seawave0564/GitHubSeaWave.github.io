# 初识SpringMVC

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
ework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">
    <context:annotation-config/>
</beans>
```

**@Autowired：直接在属性名上使用**

> @nonull：如果标记了这个注解，说明这个属性可以为null。
>
> @required：如果显式定义了此属性，说明这个对象可以为null，否则不允许为空。

### 7.使用Java的方式配置Spring

-------

```java
//这个注解表示这个类被Spring接管。
@Configuration
public class MyConfig {
    //注册一个bean，就相当于我们之前写的一个bean标签
    //这个方法的名字，就相当于bean标签中的id属性
    //这个方法的返回值，就相当于bean标签中的class属性
    @Bean
    public User getUser() {
        return new User();
    }
}
```

```java
@Configuration
@Data
public class User {
    @Value("fuck")
    private  String  name;
}
```

## 代理模式

为什么要学习代理模式？因为这就是SprngAOP的底层！

代理模式的分类：

+ 静态代理
+ 动态代理

### 1.静态代理

角色分析：

+ 抽象角色：一般会使用接口或者抽象类来解决。
+ 真是角色：被代理的角色。
+ 代理介绍：代理真实角色，代理之后一般会进行附属操作。
+ 客户：访问代理对象的人。

代码步骤：

1. 接口

```java
//租房
public interface Rent {
    public void rent();
}
```

2. 真实角色

```java
//房东
public class Host implements Rent{
    @Override
    public void rent() {
        System.out.println("房东要出租房子");
    }
}
```

3. 代理角色

```java
package com.seawave.demo01;

public class  Proxy {
    private Host host;
    public Proxy(){

    }
    public Proxy(Host host){
        this.host=host;
    }
    public void rent(){
        seeHouse();
        sign();
        host.rent();
    }
    public void seeHouse(){
        System.out.println("中介带你看房"); 
    }
    public  void sign(){
        System.out.println("签合同");
    }
}
```

4. 客户访问代理角色

```java
package com.seawave.demo01;

public class Client {
    public static void main(String[] args) {
    Host host=new Host();
     host.rent();
    }
}
```

代理模式的好处：

+ 可以使真实角色的操作更加纯粹，不用去关注一些公共业务。
+ 公共业务交给代理角色！实现了业务分工。
+ 公共业务发生扩展的时候，方便管理！

缺点：

+ 一个真实角色就会产生一个代理角色，代码量会翻倍。

### 2.动态代理

+ 动态代理和静态代理角色一样。
+ 动态代理的代理类是动态生成的，不是我们写好的！
+ 动态代理分为两大类：基于接口的动态代理，基于类的动态代理。

```java
package com.seawave.demo03;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

//使用这个类动态生产代理类
public class ProxyInvocationHandler implements InvocationHandler {
    //被代理的接口
    private Object target;
	//传入被代理的实体类
    public void setTarget(Object target) {
        this.target = target;
    }

    public Object getProxy(){
        return Proxy.newProxyInstance(this.getClass().getClassLoader(),
                target.getClass().getInterfaces(),this);
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        log(method.getName());
        Object result =method.invoke(target,args);
        return result;

    }
    public  void log(String msg){
        System.out.println("执行了"+msg+"方法");
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        ProxyInvocationHandler pih = new ProxyInvocationHandler();
        Host host = new Host();
        pih.setTarget(host);
        Rent rent= (Rent) pih.getProxy();
        rent.rent();
    }
}
```

## AOP

### 1.什么是AOP

> 在软件业，AOP为Aspect Oriented Programming的缩写，意为：[面向切面编程](https://baike.baidu.com/item/面向切面编程/6016335)，通过[预编译](https://baike.baidu.com/item/预编译/3191547)方式和运行期间动态代理实现程序功能的统一维护的一种技术。AOP是[OOP](https://baike.baidu.com/item/OOP)的延续，是软件开发中的一个热点，也是[Spring](https://baike.baidu.com/item/Spring)框架中的一个重要内容，是[函数式编程](https://baike.baidu.com/item/函数式编程/4035031)的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的[耦合度](https://baike.baidu.com/item/耦合度/2603938)降低，提高程序的可重用性，同时提高了开发的效率。

### 2.使用Spring实现AOP

使用aop织入需要导入依赖包：

```xml
<dependency>
    <groupId>org.apache.geronimo.bundles</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.6.8_2</version>
</dependency>
```

#### 方式一：使用Spring的API接口

 **例子**：

**第一步、配置如下spring配置文件：**

```xml
<bean id="userService" class="com.seawave.service.UserServiceImpl"/>
<bean id="log" class="com.seawave.log.Log"/>
<bean id="afterLog" class="com.seawave.log.AfterLog"/>
<!--配置aop-->
<aop:config>
    <aop:pointcut id="poincut" expression="execution(* com.seawave.service.UserServiceImpl.* (..))"/>
    <!--    执行环绕-->
    <aop:advisor advice-ref="log" pointcut-ref="poincut"/>
    <aop:advisor advice-ref="afterLog" pointcut-ref="poincut"/>
</aop:config>
```

**第二步、创建如下两个log日志类**

```java
public class Log implements MethodBeforeAdvice {
    @Override
    //method:要执行的目标对象的方法
    //objects：参数
    //target//目标对象
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println(target.getClass().getName()+"的"+method.getName()+"被执行了");
    }
}
```

```java
public class AfterLog implements AfterReturningAdvice {
    @Override
    //returnValue:返回值
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        System.out.println("执行了"+method.getName()+"返回结果为："+returnValue);
    }
}
```

**第三步、在测试类中执行方法**

```java
public class MyTest {
    public static void main(String[] args) {
       ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = context.getBean("userService", UserService.class);
        userService.add();
    }
}		
```

**运行结果如下**

``` java 
com.seawave.service.UserServiceImpl的add被执行了
增加了一个用户
执行了add返回结果为：null
```

由此可见，我们通过context.getBean方法从spring容器中得到了一个UserService的代理类，我们可以在执行UserService类的方法之前插入自己的逻辑方法。

#### 方式二：使用自定义类

**例子**

**第一步、新建diy类**

```java
public class DiyPointCut {
    public void before() {
        System.out.println("===========方法执行前==========");
    }

    public void after() {
        System.out.println("===========方法执行后===========");
    }
```

**第二步、配置spring配置文件**

```xml
    //注册diy类
<bean id="diy" class="com.seawave.diy.DiyPointCut"/>
<!--方式二-->
    <aop:config>
        <aop:aspect ref="diy">
            <aop:pointcut id="point" expression="execution(* com.seawave.service.UserServiceImpl.* (..))"/>
            <aop:before method="before" pointcut-ref="point"/>
            <aop:after method="after" pointcut-ref="point"/>
        </aop:aspect>
    </aop:config>
```

**第三步、在测试类中测试，代码和第一种一样**

我们可以得到如下结果：

```xml
===========方法执行前==========
增加了一个用户
===========方法执行后===========
```

## 整合MyBatis

实际开发中，我们通常会使用多哥框架技术，这就需要将mybatis和spring进行整合。

**例子**

1. 配置数据源和工厂注入

   ```xml
       <!-- 一些基本配置  -->
   <bean id="datasource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
           <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
           <property name="url" value="jdbc:mysql://127.0.0.1:3306/mybatis"/>
           <property name="username" value="root"/>
           <property name="password" value="root"/>
       </bean>
   		<!--创建sqlsession工厂-->
       <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
           <property name="dataSource" ref="datasource" />
           <!--此配置项用于连接原有的mabatis配置文件，因此mybatis配置文件仍可使用。-->
           <property name="configLocation" value="classpath:mybatis-config.xml"/>
           <property name="mapperLocations" value="classpath:com/seawave/mapper/UserMapper.xml"/>
       </bean>
       <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
   <!--        只能使用构造器注入sqlSessionFactory-->
           <constructor-arg index="0" ref="sqlSessionFactory"/>
       </bean>
   ```

我们可以看到：

+ 我们将原有的mybatis配置文件通过注入的方式放到了spring的配置文件中。

+ 上述配置项都是一些固定的配置。

2. 创建接口实现类

   ```java
   private SqlSessionTemplate sqlSession;
   
   public void setSqlSession(SqlSessionTemplate sqlSession) {
       this.sqlSession = sqlSession;
   }
   
   @Override
   public List<User> getUsers() {
       UserMapper mapper = sqlSession.getMapper(UserMapper.class);
       return mapper.getUsers();
   }
   ```

   **注意**

   setSqlSession方法必不可少，缺少会导致spring无法注入。

3. 注入实现类

   ```java
   <bean id="userMapper" class="com.seawave.mapper.UserMapperImpl">
       <property name="sqlSession" ref="sqlSession"/>
   </bean>
   ```

4. 测试

   ```java
   public class MyTest {
       @Test
       public void test() throws IOException {
           ApplicationContext context = new ClassPathXmlApplicationContext("spring-dao.xml");
           UserMapper userMapper = context.getBean("userMapper", UserMapper.class);
           for (User user : userMapper.getUsers()) {
               System.out.println(user);
           }
       }
   }
   ```
 ## Spring事务   

   事务是作为单个逻辑工作单元执行的一系列操作。一个逻辑工作单元必须有四个属性，称为原子性、一致性、隔离性和持久性 (ACID) 属性，只有这样才能成为一个事务。事务一般都是与数据库打交道的操作。

   **简单来说，事务就是将一系列要做的事情放在一起，要么一起成功，要么一起失败。**

   spring提供了以下两种事务：

   + 声明式事务
   + 编程式事务

   本文将举例声明式事务。

   **例子：**
   在UserMapper中配置如下sql语句：

   ```xml
   <mapper namespace="com.seawave.mapper.UserMapper">
       <select id="getUsers" resultType="user">
           select * from user
       </select>
       <insert id="insertUser" parameterType="user">
           insert into user (id,name) values (#{id} , #{name});
       </insert>
       <delete id="delete" parameterType="user">
           deletes from user where id=#{id};
       </delete>
   </mapper>
   ```

   可以看到，我们故意将delete写错成deletes，以此来模仿业务逻辑中的错误。

   配置spring配置文件：

   ```xml
   <!--    配置声明式事务-->
       <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
           <property name="dataSource" ref="datasource"/>
       </bean>
   <!--    结合APO实现事务的织入-->
       <tx:advice id="txAdvice" transaction-manager="transactionManager">
   <!--        给哪些方法配置事务-->
           <tx:attributes>
               <tx:method name="getUsers"/>
               <tx:method name="insertUser"/>
               <tx:method name="deleteUser"/>
   <!--            配置事务的传播特性-->
               <tx:method name="select" read-only="true"/>
           </tx:attributes>
       </tx:advice>
   <!--    配置事务切入-->
       <aop:config>
           <aop:pointcut id="txPointCut" expression="execution(* com.seawave.mapper.*.* (..))"/>
           <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointCut"/>
       </aop:config>
   ```

   测试：

   ```xml
   public class MyTest {
       public static void main(String[] args) {
           ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
           UserMapper userMapper = context.getBean("userMapper", UserMapper.class);
           for (User user : userMapper.getUsers()) {
               System.out.println(user);
           }
       }
   }	
   ```

   此时运行程序会提示sql语句错误，但是并没有执行insertUser中的插入语句，如果我们注释掉第二步中的语句，那么将会产生插入成功，删除失败的现象。而此时对于插入和删除这两个操作来说，他们是一致的，其中一个失败另外一个也不会执行。

