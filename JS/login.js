// login.js

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorText = document.getElementById('login-error');

// Tạo user mẫu nếu chưa có (để test)
if (!localStorage.getItem('users')) {
    const users = [
        {
            email: 'admin@gmail.com',
            password: '123456'
        }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        errorText.textContent = '* Tài khoản hoặc mật khẩu không chính xác';
        return;
    }

    // Lưu user đăng nhập
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Chuyển trang
    window.location.href = 'dashboard.html';
});
