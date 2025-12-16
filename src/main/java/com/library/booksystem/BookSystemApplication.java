package com.library.booksystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 图书管理系统启动类
 * @SpringBootApplication 是三个注解的组合：
 * - @SpringBootConfiguration: 表示这是一个配置类
 * - @EnableAutoConfiguration: 开启自动配置
 * - @ComponentScan: 开启组件扫描，自动发现@Controller、@Service等注解
 */
@SpringBootApplication
public class BookSystemApplication {

    /**
     * 主函数，应用入口
     * SpringApplication.run() 会启动内嵌的Tomcat服务器
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        SpringApplication.run(BookSystemApplication.class, args);
    }
}