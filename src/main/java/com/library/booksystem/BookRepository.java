package com.library.booksystem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // 自定义查询：根据书名或作者搜索
    List<Book> findByTitleContainingOrAuthorContaining(String title, String author);
}