const addCategoryBtn = document.getElementById('add-category-btn');
const categoryModal = document.getElementById('modal');
const closeCategoryModal = document.getElementById('close-modal');
const cancelCategoryBtn = document.getElementById('cancel-btn');
const categoryForm = document.getElementById('add-category-form');
const categoryIdInput = document.getElementById('category-id');
const categoryNameInput = document.getElementById('category-name');
const idError = document.getElementById('id-error');
const nameError = document.getElementById('name-error');
const categoryTableBody = document.querySelector('.category-table tbody');
const searchCategoryInput = document.getElementById('search-name');
const statusFilter = document.getElementById('status-filter');
const confirmDeleteCategoryModal = document.getElementById('confirm-delete-modal');
const deleteCategoryName = document.getElementById('delete-item-name');
const cancelDeleteCategoryBtn = document.getElementById('cancel-delete-btn');
const confirmDeleteCategoryBtn = document.getElementById('confirm-delete-btn');

let categoryToDelete = null;

if (!localStorage.getItem('categories')) {
    const defaultCategories = [
        {id: 'DM001', name: 'Quần áo', status: 'active'},
        {id: 'DM002', name: 'Kính mắt', status: 'inactive'}
    ];
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
}
let categories = JSON.parse(localStorage.getItem('categories'));

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function renderCategories(list) {
    categoryTableBody.innerHTML = '';
    list.forEach(cat => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${cat.id}</td>
            <td>${cat.name}</td>
            <td><span class="status ${cat.status}">${cat.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span></td>
            <td>
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        `;
        categoryTableBody.appendChild(row);
    });
}

//phàn tìm kiếm
function filterCategories() {
    const keyword = searchCategoryInput.value.toLowerCase();
    const status = statusFilter.value;

    const filtered = categories.filter(cat => {
        const matchesName = cat.name.toLowerCase().includes(keyword);
        const matchesStatus = status === 'all' || cat.status === status;
        return matchesName && matchesStatus;
    });
    renderCategories(filtered);
}

addCategoryBtn.addEventListener('click', () => categoryModal.style.display = 'flex');
closeCategoryModal.addEventListener('click', () => categoryModal.style.display = 'none');
cancelCategoryBtn.addEventListener('click', () => categoryModal.style.display = 'none');

// them danh mục
categoryForm.addEventListener('submit', e => {
    e.preventDefault();
    let isValid = true;

    if (!categoryIdInput.value.trim()) {
        idError.textContent = 'Mã danh mục không được bỏ trống';
        isValid = false;
    } else if (categories.some(c => c.id === categoryIdInput.value.trim())) {
        idError.textContent = 'Mã danh mục đã tồn tại';
        isValid = false;
    } else idError.textContent = '';

    if (!categoryNameInput.value.trim()) {
        nameError.textContent = 'Tên danh mục không được bỏ trống';
        isValid = false;
    } else if (categories.some(c => c.name.toLowerCase() === categoryNameInput.value.trim().toLowerCase())) {
        nameError.textContent = 'Tên danh mục đã tồn tại';
        isValid = false;
    } else nameError.textContent = '';

    if (!isValid) return;

    const newCategory = {
        id: categoryIdInput.value.trim(),
        name: categoryNameInput.value.trim(),
        status: document.querySelector('input[name="status"]:checked').value
    };
    categories.push(newCategory);
    saveCategories();
    renderCategories(categories);
    categoryModal.style.display = 'none';
    categoryForm.reset();
});


searchCategoryInput.addEventListener('input', filterCategories);
statusFilter.addEventListener('change', filterCategories);

// xóa danh mụ
categoryTableBody.addEventListener('click', e => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (!deleteBtn) return;

    if (categories.length === 1) {
        alert('Danh mục không được phép bỏ trống');
        return;
    }

    const row = deleteBtn.closest('tr');
    const categoryId = row.children[0].textContent;
    const categoryName = row.children[1].textContent;

    categoryToDelete = categories.find(c => c.id === categoryId);
    deleteCategoryName.textContent = categoryName;
    confirmDeleteCategoryModal.style.display = 'flex';
});

cancelDeleteCategoryBtn.addEventListener('click', () => {
    confirmDeleteCategoryModal.style.display = 'none';
    categoryToDelete = null;
});

confirmDeleteCategoryBtn.addEventListener('click', () => {
    if (categoryToDelete) {
        categories = categories.filter(c => c.id !== categoryToDelete.id);
        saveCategories();
        renderCategories(categories);
        categoryToDelete = null;
    }
    confirmDeleteCategoryModal.style.display = 'none';
});

renderCategories(categories);

