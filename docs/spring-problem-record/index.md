# Springboot项目中遇到的问题记录

### Springboot项目中遇到的问题记录(持续记录)
-----------------------
#### 问题描述：maven+springboot项目中，使用lombok注解导致无法编译，控制台提示符号未找到
#### 解决方法：
```java
<build>
  <pluginManagement>
    <plugins>
        <plugin>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.0</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>UTF-8</encoding>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <version>1.18.14</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
  
    </plugins>
  </pluginManagement>
</build>

```
