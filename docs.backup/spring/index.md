# 初识Spring5

## 什么是Spring？

### 1、简介

Spring框架是由于[软件开发](https://baike.baidu.com/item/软件开发/3448966)的复杂性而创建的。Spring使用的是基本的[JavaBean](https://baike.baidu.com/item/JavaBean/529577)来完成以前只可能由[EJB](https://baike.baidu.com/item/EJB/144195)完成的事情。然而，Spring的用途不仅仅限于服务器端的开发。从简单性、可测试性和松耦合性角度而言，绝大部分Java应用都可以从Spring中受益。

### 2、创始人

![Rod Johnson](https://bkimg.cdn.bcebos.com/pic/63d0f703918fa0ecf02c6612269759ee3c6ddbc2?x-bce-process=image/resize,m_lfit,w_536,limit_1/format,f_jpg)

Rod在悉尼大学不仅获得了计算机学位，同时还获得了音乐学位。更令人吃惊的是在回到软件开发领域之前，他还获得了音乐学的博士学位。有着相当丰富的C/C++技术背景的Rod早在1996年就开始了对Java服务器端技术的研究。他是一个在保险、电子商务和金融行业有着丰富经验的技术顾问，同时也是JSR-154（Servlet 2.4）和JDO 2.0的规范专家、JCP的积极成员。

真正引起了人们的注意的，是在2002年Rod Johnson根据多年经验撰写的《Expert o-ne-on-One J2EE Design and Development》。其中对正统J2EE架构的臃肿、低效的质疑，引发了人们对正统J2EE的反思。这本书也体现了Rod Johnson对技术的态度，技术的选择应该基于实证或是自身的经验，而不是任何形式的偶像崇拜或者门户之见。正是这本书真正地改变了Java世界。基于这本书的代码，Rod Johnson创建了轻量级的容器Spring。Spring的出现，使得正统J2EE架构一统天下的局面被打破。基于Struts+Hibernate+Spring的J2EE架构也逐渐得到人们的认可，甚至在大型的项目架构中也逐渐开始应用。


### 3、官网

首页：[https://spring.io](https://spring.io/)

下载地址：[https://repo1.maven.org/maven2/org/springframework/spring](https://repo1.maven.org/maven2/org/springframework/spring)

github：[https://github.com/spring-projects/spring-framework](https://github.com/spring-projects/spring-framework)

maven：

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.13</version>
</dependency>
<!--MyBatis整合-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.13</version>
</dependency>
```

### 4.IOC理论

```java
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
```

使用set来把决定权交给用户，降低系统耦合性。

## Spring的使用

### 1.HelloSpring

----------

#### 例子：

Dao接口

```java
public interface UserDao {
    void getUser();
}
```

实现接口1：

```java
public class UserDaoImpl implements UserDao {
    @Override
    public void getUser() {
        System.out.println("默认获取用户数据");
    }
}
```

实现接口2：

```java
public class UserDaoMysqlImpl implements UserDao{
    @Override
    public void getUser() {
        System.out.println("默认获取MYSQL数据");
    }
}
```

业务层：

```java
public class UserServiceImpl implements  UserService{
   private UserDao userDao;
    @Override
    public void getUser() {
        userDao.getUser();
    }
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}	
```

通过spring实例化：

```java
public class MyTest {
    public static void main(String[] args) {
        //拿到spring容器
        ApplicationContext beans = new ClassPathXmlApplicationContext("beans.xml");
        UserServiceImpl userServiceImpl = (UserServiceImpl) 					beans.getBean("UserServiceImpl");
        userServiceImpl.getUser();
    }
}
```

配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userImpl" class="com.seawave.dao.UserDaoImpl"/>
    <bean id="mysqlImpl" class="com.seawave.dao.UserDaoMysqlImpl"/>
    <bean id="UserServiceImpl" class="com.seawave.service.UserServiceImpl">
        <property name="userDao" ref="userImpl"/>
    </bean>
</beans>

```

### 2.ioc创建对象的方式

--------

+ 默认使用无参构造

+ 假设我们需要用有参构造创建对象：

方式一：通过下标赋值

```java
    <bean id="user" class="com.kuang.pojo.User">
        <constructor-arg index="0" value="12"/>
        <constructor-arg index="1" value="fuck"/>
    </bean>
```

方式二：通过属性名赋值

```java
    <bean id="user" class="com.kuang.pojo.User">
        <constructor-arg name="id" value="12"/>
        <constructor-arg name="name" value="fuck"/>
    </bean>
```

在配置文件加载的时候，容器中管理的对象就已经初始化了！

### 3.Spring配置

-------

#### 3.1、别名

通过别名获取对象

```java
<!--    别名，可以用过别名获取对象-->
    <alias name="user" alias="UserTese"/>
```

#### 3.2、bean

```java
<bean id="user" class="com.kuang.pojo.User" name="userTest">
    <constructor-arg index="0" value="12"/>
    <constructor-arg index="1" value="fuck"/>
</bean>
```

+ id:bean对象的唯一标识符，相当于对象名
+ class：bean对应的全限定名，包名+类型
+ name：也是别名,可以取多个

#### 3.3、import

用于团队开发，导入其他的bean配置文件，将多个配置文件合并为一个。

```
<import resource="beans.xml"/>
<import resource="bean1.xml"/>
<import resource="bean2.xml"/>
```

### 4.依赖注入

------------



#### 4.1、构造器注入

前面用到的方式即为构造器注入

#### 4.2 Set方式注入【重点】

+ 依赖：bean对象的创建依赖于容器
+ 注入：bean对象中的所有属性，由容器注入

【环境搭建】

1.复杂类型

```java
public class Address {
    private String address;
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
}
```

2.真实测试对象

```java
@Data
public class Student {
    private String name;
    private  Address address;
    private String[]books;
    private List<String> hobbies;
    private Map<String,String>card;
    private Set<String>games;
    private Properties info;
    private String wife;
}
```

##### 复杂类型注入：

```xml
    <!--        第二种，Bean注入，ref-->
    <bean id="address" class="com.seawave.pojo.Address">
        <property name="address" value="北京东城"/>
    </bean>
    <bean id="student" class="com.seawave.pojo.Student">
        <property name="name" value="fuck"/>
        <property name="address" ref="address"/>
```

##### 数组注入：

```java
        <property name="books">
            <array>
                <value>红楼梦</value>
                <value>西游记</value>
                <value>三国演义</value>
                <value>水浒传</value>
            </array>
        </property>
```

##### List集合注入:

```xml
<property name="books">
    <array>
        <value>红楼梦</value>
        <value>西游记</value>
        <value>三国演义</value>
        <value>水浒传</value>
    </array>
</property>
```

##### map注入：

```xml
<property name="card">
    <map>
        <entry key="身份证" value="330629197010232241"/>
        <entry key="银行卡" value="340629197010232231"/>
    </map>
</property>
```

##### set注入：

```xml
<property name="games">
    <set>
        <value>LOL</value>
        <value>COC</value>
        <value>BOB</value>
    </set>
</property>
```

##### null值注入：

```
<property name="wife">
    <null/>
</property>
```

##### Properties注入：

```
<property name="info">
    <props>
        <prop key="url">https://baidu.com</prop>
        <prop key="username">seawave</prop>
        <prop key="password">zgq123</prop>
    </props>
</property>
```

### 5.bean的作用域

| 作用域    | 描述                                                         |
| :--------: | :----------------------------------------------------------: |
| singleton | (默认)将每个 Spring IoC 容器的单个 bean 定义范围限定为单个对象实例。 |
|prototype|将单个 bean 定义的作用域限定为任意数量的对象实例。|
|request|将单个 bean 定义的范围限定为单个 HTTP 请求的生命周期。也就是说，每个 HTTP 请求都有一个在单个 bean 定义后面创建的 bean 实例。仅在可感知网络的 Spring ApplicationContext中有效。|
|session|将单个 bean 定义的范围限定为 HTTP Session的生命周期。仅在可感知网络的 Spring ApplicationContext上下文中有效。|
|application|将单个 bean 定义的范围限定为ServletContext的生命周期。仅在可感知网络的 Spring ApplicationContext上下文中有效。|
|websocket|将单个 bean 定义的范围限定为WebSocket的生命周期。仅在可感知网络的 Spring ApplicationContext上下文中有效。|

##### 单例模式（默认模式）

```xml
<bean id="user" class="com.seawave.pojo.User" scope="singleton">
```

##### 原型模式（每次从容器中获取都会产生一个新对象）

```xml
<bean id="user" class="com.seawave.pojo.User" scope="prototype">
```

##### 其余的request、session、application、websocket 这些只能在web开发中失效

### 6.Bean自动装配

+ 自动装配是Spring满足bean依赖一种方式
+ Spring会在上下文中自动寻找，并自动给bean装配属性！

在spring中有三种装配方式：

1. 在xml中显示的配置
2. 在java中显示配置
3. 隐式 的自动装配bean【重要】

测试源代码：

```xml
<bean id="people" class="com.seawave.pojo.People" autowire="byName">
    <property name="name" value="fuck"/>
    <property name="cat" ref="cat"/>
    <property name="dog" ref="dog"/>
</bean>
```

#### ByName自动装配

会自动在容器上下文中查找和自己对象set方法后面的值对应的beanID

```xml
<bean id="people" class="com.seawave.pojo.People" autowire="byName">
    <property name="name" value="fuck"/>
</bean>
```

#### ByType自动装配

会自动在容器上下文中查找和自己对象属性类型相同的beanID

```xml
<bean id="people" class="com.seawave.pojo.People" autowire="byType">
    <property name="name" value="fuck"/>
</bean>
```

#### 使用注解进行自动装配

要使用注解须知：

1. 导入约束：context约束

2. **配置注解支持**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
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

