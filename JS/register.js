const registerForm = document.getElementById('register-form');
const lastNameError = document.getElementById('lastName-error');
const firstNameError = document.getElementById('firstName-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirmPassword-error');
const acceptError = document.getElementById('accept-error');

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const accept = document.getElementById('accept').checked;

    lastNameError.textContent = '';
    firstNameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    acceptError.textContent = '';

    let isValid = true;

    if (!lastName) {
        lastNameError.textContent = 'Vui lòng nhập họ và tên đệm';
        isValid = false;
    }

    if (!firstName) {
        firstNameError.textContent = 'Vui lòng nhập tên';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = 'Vui lòng nhập email';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Xin hãy nhập đúng định dạng email';
        isValid = false;
    }

    if (!password) {
        passwordError.textContent = 'Vui lòng nhập mật khẩu';
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Mật khẩu phải từ 8 ký tự trở lên';
        isValid = false;
    }

    if (confirmPassword !== password) {
        confirmPasswordError.textContent = 'Xác nhận mật khẩu không chính xác';
        isValid = false;
    }

    if (!accept) {
        acceptError.textContent = 'Bạn phải đồng ý với chính sách và điều khoản';
        isValid = false;
    }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const isExist = users.some(user => user.email === email);
    if (isExist) {
        emailError.textContent = 'Email đã được đăng ký';
        return;
    }

    const newUser = {
        fullName: `${lastName} ${firstName}`,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công!');
    window.location.href = 'login.html';
});
