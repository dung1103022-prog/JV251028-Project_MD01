const logoutBtn = document.getElementById('log-out-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');

        window.location.href = 'login.html';
    });
}
