const API_URL = 'http://localhost:8080/api/books';

// 页面加载时获取所有图书
window.onload = function() {
    loadBooks();
};

// 加载图书列表
function loadBooks() {
    axios.get(API_URL)
        .then(response => {
            const books = response.data;
            displayBooks(books);
            showStatus('', ''); // 清空状态
        })
        .catch(error => {
            console.error('加载失败:', error);
            showStatus('加载图书失败，请检查后端服务', 'error');
        });
}

// 显示图书列表
function displayBooks(books) {
    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = '';
    
    if (books.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#999;">暂无图书数据</td></tr>';
        return;
    }
    
    books.forEach(book => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${escapeHtml(book.title)}</td>
            <td>${escapeHtml(book.author)}</td>
            <td>${escapeHtml(book.isbn) || '-'}</td>
            <td>¥${book.price?.toFixed(2) || '0.00'}</td>
            <td>${formatDate(book.createTime)}</td>
            <td>
                <button class="delete-btn" onclick="deleteBook(${book.id})">删除</button>
            </td>
        `;
    });
}

// 添加图书
function addBook() {
    const book = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        isbn: document.getElementById('isbn').value.trim(),
        price: parseFloat(document.getElementById('price').value) || 0
    };

    // 表单验证
    if (!book.title || !book.author) {
        showStatus('书名和作者不能为空！', 'error');
        return;
    }

    axios.post(API_URL, book)
        .then(() => {
            showStatus('图书添加成功！', 'success');
            // 清空表单
            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            document.getElementById('isbn').value = '';
            document.getElementById('price').value = '';
            // 刷新列表
            loadBooks();
        })
        .catch(error => {
            console.error('添加失败:', error);
            showStatus('添加失败，ISBN可能重复或网络错误', 'error');
        });
}

// 删除图书
function deleteBook(id) {
    if (!confirm(`确定删除ID为 ${id} 的图书吗？`)) return;
    
    axios.delete(`${API_URL}/${id}`)
        .then(() => {
            showStatus('图书删除成功！', 'success');
            loadBooks();
        })
        .catch(error => {
            console.error('删除失败:', error);
            showStatus('删除失败，请稍后重试', 'error');
        });
}

// 搜索图书
function searchBooks() {
    const keyword = document.getElementById('searchInput').value.trim();
    
    if (!keyword) {
        loadBooks(); // 如果搜索框为空，加载全部
        return;
    }

    axios.get(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`)
        .then(response => {
            const books = response.data;
            displayBooks(books);
            showStatus(`搜索到 ${books.length} 条结果`, 'success');
        })
        .catch(error => {
            console.error('搜索失败:', error);
            showStatus('搜索失败，请检查网络', 'error');
        });
}

// 显示状态信息
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    if (!message) {
        statusDiv.innerHTML = '';
        return;
    }
    statusDiv.innerHTML = `<p class="${type}">${message}</p>`;
    // 3秒后自动清除
    setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19);
}

// HTML转义防止XSS攻击
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}