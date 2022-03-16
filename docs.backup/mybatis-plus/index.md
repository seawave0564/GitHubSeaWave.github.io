# MyBatis-plus使用教程

## 什么是Mybatis-plus？

### 简介

>  [MyBatis-Plus (opens new window)](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis (opens new window)](https://www.mybatis.org/mybatis-3/)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

开源代码：[Github](https://github.com/baomidou/mybatis-plus)   [Gitee]https://gitee.com/baomidou/mybatis-plus()

官方文档：[https://baomidou.com/pages/24112f/](https://baomidou.com/pages/24112f/)

### 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

### 支持数据库

> 任何能使用 `MyBatis` 进行 CRUD, 并且支持标准 SQL 的数据库，具体支持情况如下，如果不在下列表查看分页部分教程 PR 您的支持。

- MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
- 达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据库，瀚高数据库

## 第一个使用例子：

### 数据表结构

![](https://seawave.top/file/mybatisplus/1.png)

### 配置数据源

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/mybatis-plus?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
```

### 创建Mapper类

*使用@Repository注解将Mapper注入到spring容器。

```java
@Repository
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
```

BaseMapper类：mybatis-plus内置类，存放基础sql语句，当我们的查询比较简单时，使用这个类即可快速完成查询。

### 编写实体类

*此处使用了Lombok注解简化setter/getter方法和构造器

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
        private Integer id;
        private String name;
        private Integer age;
        private String email;
}
```

## 测试

```java
@SpringBootTest
class MybatisPlusApplicationTests {
    @Autowired
    private UserMapper userMapper;
    @Test
    void contextLoads() {
        List<User> users = userMapper.selectList(null);
        List<User> users = userMapper.selectList(null);
        users.forEach(System.out::println);}
    }
```

**结果如下**

![](https://seawave.top/file/mybatisplus/2.png)

## CRUD

### 主键生成策略

#### @TableId注解

```java
public enum IdType {
        AUTO(0), // 数据库id自增
        NONE(1), // 未设置主键
        INPUT(2), // 手动输入
        ID_WORKER(3), // 默认的全局唯一id
        UUID(4), // 全局唯一id uuid
        ID_WORKER_STR(5); //ID_WORKER 字符串表示法
}
```

### 自动填充

1. 在实体类中有如下字段

```java
//字段添加填充内容
@TableField(fill = FieldFill.INSERT)
private LocalDateTime create_time;
@TableField(fill = FieldFill.INSERT_UPDATE)
private LocalDateTime update_time;
```

@TableField注解：注解填充字段，用于标注需要填充的属性。值为自动填充的触发条件。

2. 编写自定义处理器，实现MetaObjectHandler接口

```java
@Component
public class MyHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject, "create_time", LocalDateTime.class, LocalDateTime.now());
        this.strictInsertFill(metaObject, "update_time", LocalDateTime.class, LocalDateTime.now());
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject, "update_time", LocalDateTime.class, LocalDateTime.now());
    }
}
```

**注意标识@Component注解，将自定义处理器注入容器**

### 乐观锁*

>乐观锁 : 故名思意十分乐观，它总是认为不会出现问题，无论干什么不去上锁！如果出现了问题， 再次更新值测试 
>
>悲观锁：故名思意十分悲观，它总是认为总是出现问题，无论干什么都会上锁！再去操作！

乐观锁实现方式：

> - 取出记录时，获取当前 version
> - 更新时，带上这个 version
> - 执行更新时， set version = newVersion where version = oldVersion
> - 如果 version 不对，就更新失败

举例：

1. 在表中添加version字段并更新实体类
2. 在实体类的version属性上添加@version注解

```java
@Version
private Integer version;
```

3. 注册组件

### 查询操作

#### 批量查询

```java
public void testQuery(){
    List<User> users = userMapper.selectBatchIds(Arrays.asList(1,2,3));
    users.forEach(System.out::println);
}
```

![](https://seawave.top/file/mybatisplus/3.png)

#### 条件查询

```java
@Test
public void testQuery2(){
    HashMap<String, Object> map = new HashMap<>();
    map.put("name","fuck");
    List<User> users = userMapper.selectByMap(map);
    users.forEach(System.out::println);
}
```

![](https://seawave.top/file/mybatisplus/4.png)

### 删除操作

**和查询无异**！！！！！！！！！！！（偷懒）

#### 逻辑删除

> 物理删除 ：从数据库中直接移除  
>
> 逻辑删除 ：再数据库中没有被移除，而是通过一个变量来让他失效，类似于回收站！

测试：

1. 在表中增加字段 ```deleted``` 字段
2. 配置application.yml

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

3. 测试

![](https://seawave.top/file/mybatisplus/5.png)

当我们再次查询时，1号用户将不会被查询到

![](https://seawave.top/file/mybatisplus/6.png)

## Wrapper：条件构造器

例子：

```java
@Test
void contextLoads() {
// 查询name不为空的用户，并且邮箱不为空的用户，年龄大于等于12
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper
.isNotNull("name")
.isNotNull("email")
.ge("age",12);
userMapper.selectList(wrapper).forEach(System.out::println); 
}
```



```java
@Test
void test2(){
// 查询名字狂神说
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.eq("name","狂神说");
User user = userMapper.selectOne(wrapper); 
或者 Map
System.out.println(user);
}
```

```java
@Test
void test3(){
// 查询年龄在 20 ~ 30 岁之间的用户
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.between("age",20,30); // 区间
Integer count = userMapper.selectCount(wrapper);// 查询结果数
System.out.println(count);
}
```

```java
// 模糊查询
@Test
void test5(){
QueryWrapper<User> wrapper = new QueryWrapper<>();
// id 在子查询中查出来
wrapper.inSql("id","select id from user where id<3");
List<Object> objects = userMapper.selectObjs(wrapper);
objects.forEach(System.out::println);
}
```

```java
//测试六
@Test
void test6(){
QueryWrapper<User> wrapper = new QueryWrapper<>();
// 通过id进行排序
wrapper.orderByAsc("id");
List<User> users = userMapper.selectList(wrapper);
users.forEach(System.out::println);
}

```


