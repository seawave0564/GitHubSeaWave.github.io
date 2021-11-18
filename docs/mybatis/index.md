# MarkDown基础语法指北

## 什么是MyBatis？

### 1.MyBatis介绍

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免 了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注 解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Ordinary Java Object,普通的 Java对 象)映射成数据库中的记录。

### 2.如何获取MyBatis有关的信息？

1. MyBatis官方文档：https://mybatis.org/mybatis-3/  
2. MyBatis项目地址：https://github.com/mybatis/mybatis-3/  
3. Maven中央仓库：https://mvnrepository.com/  

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

+ namespace:他指向你所需要映射的java接口方法
+ id:映射方法的名称
+ resultType指明返回类型
+ 不可或缺的是，我们需要更改查询语句。


