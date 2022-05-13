# Swagger使用教程


## Swagger使用教程

----

### 安装

```xml
        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.9.2</version>
        </dependency>
```

**注意：swagger 2.9.2仅支持springboot2.5.6以下版本！**

***由于swagger已停止更新，springboot2.5.6之后请使用springdoc代替swagger！！***

```xml
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-ui</artifactId>
            <version>1.6.8</version>
        </dependency>
```

***同时更新swagger-ui：***

```xml
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>swagger-ui</artifactId>
            <version>4.10.3</version>
        </dependency>
```



###  测试

导入依赖后即可访问```http://127.0.0.1:8080/swagger-ui.html```查看接口文档。

## 配置swagger

----------

### 配置首页信息

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket SwaggerConfigs(){

        return new Docket(DocumentationType.SWAGGER_2).apiInfo(getApiInfo());
    }
    public ApiInfo getApiInfo(){
        Contact contact = new Contact("", "", "");
        return new ApiInfo(
                "seawave api",
                "人生无常大肠包小肠",
                "2.0v",
                "http://www.seawave..top",
                contact,
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0", new ArrayList());
    }
}
```

### 配置扫描接口

通过apis指定需要扫描的接口

```java
public Docket SwaggerConfigs(){

    return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(getApiInfo())
            .select()
		   .apis()
        	//..........
            .build();
}
```

可选参数有：

            //RequestHandlerSelectors 配置要扫描的接口
            //.basePackage 扫描指定的包
            //.withClassAnnotation 扫描类上的注解
            //.withMethodAnnotation 扫描包上的注解

通过path路径来指定要扫描的接口

```java
@Bean
public Docket SwaggerConfigs(){

    return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(getApiInfo())
            .select()
            //RequestHandlerSelectors 配置要扫描的接口
            //.basePackage 扫描指定的包
            //.withClassAnnotation 扫描类上的注解
            //.withMethodAnnotation 扫描包上的注解
            .paths(PathSelectors.ant("com/seawave/**"))
            .build();
}
```

### 配置API文档分组

```java
.groupName("小组1")
```

```java
@Bean
public Docket docket1(){
    return new Docket(DocumentationType.SWAGGER_2).groupName("小组1");
}
@Bean
public Docket docket2(){
    return new Docket(DocumentationType.SWAGGER_2).groupName("小组2");
} 
@Bean
public Docket docket3(){
    return new Docket(DocumentationType.SWAGGER_2).groupName("小组3");
}
```
