package com.library.booksystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;
    
    // 查询所有
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    // 根据ID查询
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
    
    // 添加或更新
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
    
    // 删除
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
    
    // 搜索
    public List<Book> searchBooks(String keyword) {
        return bookRepository.findByTitleContainingOrAuthorContaining(keyword, keyword);
    }
}