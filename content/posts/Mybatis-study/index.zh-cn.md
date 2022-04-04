---
title: "MyBatis使用教程"
date: 2021-12-05T14:00:00+08:00
categories: ["学习笔记"]
draft: false
tags: ["spring","spring boot","java","mybatis"]
Author: "SeaWave"
---
## 什么是MyBatis？

### 1.MyBatis介绍

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免 了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注 解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Ordinary Java Object,普通的 Java对 象)映射成数据库中的记录。

### 2.如何获取MyBatis有关的信息？

1. MyBatis官方文档：[https://mybatis.org/mybatis-3](https://mybatis.org/mybatis-3/)
2. MyBatis项目地址：[https://github.com/mybatis/mybatis-3](https://github.com/mybatis/mybatis-3/)  
3. Maven中央仓库：[https://mvnrepository.com](https://mvnrepository.com)  

## MyBatis的安装 

### 方式一：在idea中配置MyBatis 

首先创建一个maven项目，然后在pom.xml中添加依赖列表： 

```xml
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.2</version>
        </dependency>
```

### 方式二：手动导入jar包  

[点击此处](https://github.com/mybatis/mybatis-3/releases)在github上下载jar包，解压后放入导入idea项目即可  

## MyBatis的使用（idea+maven）

### 1.在你的资源目录创建mybatis-config.xml配置文件（构建 SqlSessionFactory） 

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
</configuration>
```

其中需要注意的是： 

driver项的值需要改为具体的数据库驱动全类名。 

url，username，password需要根据实际情况进行更改。 

mapper中resource指向sql语句列表，这一项后面会提及。

### 2.从 SqlSessionFactory 中获取 SqlSession 

```java
//创建工厂
String resource = "org/mybatis/example/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//从工厂中获取sqlSession
try (SqlSession session = sqlSessionFactory.openSession()) {
  BlogMapper mapper = session.getMapper(BlogMapper.class);
  Blog blog = mapper.selectBlog(101);
}
```

### 3.SQL语句映射 

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.mybatis.example.BlogMapper">
  <select id="selectBlog" resultType="Blog">
    select * from Blog where id = #{id}
  </select>
</mapper>
```

在上述代码中我们需要更改以下几项：

+ namespace:他指向你所需要映射的java接口
+ id:映射方法的名称
+ resultType指明返回类型
+ 不可或缺的是，我们需要更改查询语句。

### 4.ResultMap结果集映射

当数据库字段名和属性名不一致时，会导致实体类中的属性值为null，例子如下：  

```java
//实体类的属性如下：
class user{
    int name;
	int password;
}
//接口方法
void getUser();
```

```xml
<!--mapper中的查询语句如下-->
<select id="getUser" type=com.example.User>
select * name,pwd from users
</select>
```

此时返回的User类中的password属性值为null，对于这个问题我们可以在mapper配置文件中添加resultMap标签来解决。  

```xml
<!--mapper中的查询语句如下-->
<select id="getUser" resultmap=com.example.User>
select * name,pwd from users
</select>
<!--新增resultMap标签-->
<resultMap id="UserMap" type="User">
<!--column表示数据库中的字段，property表示实体类中的属性 -->
    <result column="name" property="name"/>
    <result column="pwd" property="password"/>
</resultMap>
```

  

### 5.多对一的处理

在实际查询数据库的过程中，大概率会遇到多对一的情况，比如多个学生对应一个老师，我们查询寻学生时需要连同老师一起查询，这时我们需要对结果集做一些修改。

例子：

```java
//实体类的属性如下：
class Student{
    int id;
	String name;
	Teacher teacher
}
//接口方法
void getStudent();
```

很明显 以上User类中的Teacher属性是一个复杂类型，所以我们需要单独处理。

#### 方法一

类似于子查询的方法

```xml
<select id = "getStudent" resultMap="StudentTeacher">
	select * from student
</select>

<resultMap id ="StudentTeacher" type="Student">
<result property="id" colum="id"/>
<result property="name"colum="name"/>
    <!-- 复杂的属性，单独处理。对象：association 集合：collection -->
<association property="teacher" colum="tid" javaType="Teacher" select="getTcher"/>    

    <!--单独查询Teacher的语句-->
<select id="getTeacher" resultType="Teacher">
	select * from teacher where id=#{id}    
</select>      
</result>
```

#### 方法二

按照结果嵌套处理

``` xml
<select id="getStudent" resultMap="StudentTeacher">
	select s.id sid,s.name sname,t.name tname
    from student s,teacher t
    where s.tid = t.id
</select>
<resultMap id="StudentTeacher2" type ="Student">
	<result property="id" column="sid"/>
    <result property="name" column="sname"/>
    <association property="teacher" javaType="Teacher">
    	<result property="name" column="tname"/>
    </association>
</resultMap>
```

### 6. 一对多的处理

与多对一相反,我们会遇到一对多的情况,比如说一个老师对应多个老师,所以我们同样需要对结果集进行处理.

例子:

```java
//实体类
public class Teacher{
    private int id;
    private String name;
    private List<Student> students;
}
//接口方法
class TeacherMapper{
    Teacher getTeacher(int id);
}
```

```xml
<select id="getTeacher" resultMapper="">
	select s.id sid,s.name sname,t.name tname
    from student s,teacher t
    where s.tid = t.id and t.id=#{tid}
</select>
<resultMap id="TeacherStudent" type ="Teacher">
	<result property="id" column="sid"/>
    <result property="name" column="sname"/>
    <collection property="teacher" TypeOf="Stident">
    	<result property="id" column="sid"/>
        <result property="name" column="sname"/>
        <result property="tid" column="tid"/>
    </association>
</resultMap>
```

