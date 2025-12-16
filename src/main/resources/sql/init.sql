-- 创建数据库（如果还没创建）
CREATE DATABASE IF NOT EXISTS book_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 切换到数据库
USE book_db;

-- 创建图书表（如果表不存在）
CREATE TABLE IF NOT EXISTS book (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(50) UNIQUE,
    price DECIMAL(10,2),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_author (author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 初始化测试数据（如果不存在则插入）
INSERT IGNORE INTO book (title, author, isbn, price) VALUES
('Java编程思想', 'Bruce Eckel', '9787111213826', 99.00),
('Spring Boot实战', '王松', '9787115472837', 69.00),
('深入理解Java虚拟机', '周志明', '9787111641247', 129.00),
('Python编程从入门到实践', '埃里克·马瑟斯', '9787115428028', 79.00),
('算法导论', 'Thomas H. Cormen', '9787111407010', 128.00);

-- 查询验证
SELECT COUNT(*) as total_books FROM book;
SELECT * FROM book ORDER BY create_time DESC;