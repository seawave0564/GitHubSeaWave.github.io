# Junit使用教程


# Junit使用教程

---

## 简介

+ 单元测试工具（方法）
+ 常用于白盒测试

## 安装

1. 创建一个普通Maven项目
2. 在pom.xml中引入依赖

Maven

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```

注：junit4.11以上版本不在包含hamcrest，需要手动安装

```
<!-- https://mvnrepository.com/artifact/org.hamcrest/hamcrest-core -->
<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-core</artifactId>
    <version>1.3</version>
    <scope>test</scope>
</dependency>
```

## 覆盖测试

![1](https://seawave.top/file/Junit/1.png)

### 条件覆盖

```java
    @Test
    public void test1(){
        System.out.println(getData(6, 12));  //R==>6^2*12=432  A-B
        System.out.println(getData(1,2));  //  R==>(3+2)^5=243.0     A-C-D
        System.out.println(getData(4,0)); //   R==>sqrt(4)=     A-C-E
    }
```

## 断言

---

### 常用匹配方法

```java
//要求所有的条件都要通过测试才算成功
assertThat("hello world", allOf(startsWith("helloo"), containsString("world"))); //false
//如果接下来的所有条件只要有一个成立则测试通过
assertThat("hello world", anyOf(startsWith("hello"), containsString("worldd"))); //true
//anything匹配符表明无论什么条件，永远为true
assertThat( "hello world", is( "hello" ) ); //true
//is表明如果前面待测的object等于后面给出的object
assertThat( "hello world", is( "hello world") ); //true
//not匹配符和is匹配符正好相反，表明如果前面待测的object不等于后面给出的object
assertThat( "hello world", not( "hello world") ); //false

```

```java
//判断是否包含字符串
assertThat( "helloWorld", containsString( "hello" ) );  //true
//判断是否以指定字符串结尾
assertThat( "helloWorld", endsWith( "World" ) );  //true
//判断是否以指定字符串开始
assertThat( "helloWorld", startsWith( "hello" ) ); //true 
//equalTo匹配符表明如果测试的testedValue等于expectedValue则测试通过
assertThat( "hello", equalTo("hello") ); 
//判断忽略首尾空格时是否相等
assertThat( "hello", equalToIgnoringWhiteSpace( "  hello  " ) ); //true
```

```java
//判断列表中是否包含指定项
assertThat(Arrays.asList("foo", "bar"), hasItem("bar"));
//判断列表中是否包含多项
assertThat(Arrays.asList("foo", "bar", "baz"), hasItems("baz", "foo"))
//判断指定对象是否是某个类（包括子类）
assertThat(new ArrayList<>(), instanceOf(List.class));
```

## Junit测试类注解

| junit4       | junit5      | 特点                                                         |
| ------------ | ----------- | ------------------------------------------------------------ |
| @BeforeClass | @BeforeAll  | 在当前类的**所有测试方法**之前执行。注解在【静态方法】上。   |
| @AfterClass  | @AfterAll   | 在当前类中的**所有测试方法**之后执行。注解在【静态方法】上。 |
| @Before      | @BeforeEach | 在**每个测试方法**之前执行。注解在【非静态方法】上。         |
| @After       | @AfterEach  | 在**每个测试方法**之后执行。注解在【非静态方法】上。         |

## Junit测试套件

```java
public class JunitTestOne {
    @Test
    public void test() {
        System.out.println("测试一。。。");
    }
}
```

```java
public class JunitTestTwo {
    @Test
    public void test() {
         System.out.println("测试二。。。");
    }
}
```

```java
public class JunitTestThree {
    @Test
    public void test() {
         System.out.println("测试三。。。");
    }
}
```



```java
@RunWith(Suite.class)
@Suite.SuiteClasses({ JunitTestOne.class,JunitTestTwo.class ,JunitTestThree.class})
public class AllTests {

}
```

此时执行Alltests会同时执行三个测试方法

## Junit异常测试

例子：

```java
    @Test(expected = IndexOutOfBoundsException.class)
    public void test (){
        List<String> lists = new ArrayList<>();
        lists.get(1);
    }
```

@expected表达式表示如果方法抛出指定异常则测试通过，以上例子可以通过测试。

## Junit限时测试

例子：

```java
    @Test(timeout = 1000)
    public void test (){
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
```

@timeout表达式表示如果方法运行市场超过指定行数则测试不通过，以上案例中使用线程阻塞的方式阻塞线程2000毫秒，超过了规定时间，所以测试不通过。

