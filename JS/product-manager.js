const addProductBtn = document.getElementById('add-category-btn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const form = document.getElementById('add-category-form');
const idInput = document.getElementById('category-id');
const nameInput = document.getElementById('category-name');
const quantityInput = document.getElementById('product-quantity');
const priceInput = document.getElementById('product-price');
const discountInput = document.getElementById('product-discount');
const categoryFilter = document.getElementById('category-filter');
const tableBody = document.querySelector('.category-table tbody');
const searchInput = document.getElementById('search-name');
const confirmDeleteModal = document.getElementById('confirm-delete-modal');
const deleteItemName = document.getElementById('delete-item-name');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

let productToDelete = null;
let products = JSON.parse(localStorage.getItem('products')) || [
  {id: 'SP001', name: 'Iphone 12 Pro', category: 'phone', quantity: 10, price: 12000000, discount: 0, status: 'active'}
];

addProductBtn.addEventListener('click', () => modal.style.display = 'flex');
closeModal.addEventListener('click', () => modal.style.display = 'none');
cancelBtn.addEventListener('click', () => modal.style.display = 'none');

function validateForm() {
  let isValid = true;

  if (!idInput.value.trim()) {
    idInput.nextElementSibling.textContent = 'Mã sản phẩm không được bỏ trống';
    isValid = false;
  } else if (products.some(p => p.id === idInput.value.trim())) {
    idInput.nextElementSibling.textContent = 'Mã sản phẩm đã tồn tại';
    isValid = false;
  } else idInput.nextElementSibling.textContent = '';

  if (!nameInput.value.trim()) {
    nameInput.nextElementSibling.textContent = 'Tên sản phẩm không được bỏ trống';
    isValid = false;
  } else if (products.some(p => p.name.toLowerCase() === nameInput.value.trim().toLowerCase())) {
    nameInput.nextElementSibling.textContent = 'Tên sản phẩm đã tồn tại';
    isValid = false;
  } else nameInput.nextElementSibling.textContent = '';

  if (Number(priceInput.value) <= 0) {
    alert('Giá sản phẩm phải lớn hơn 0');
    isValid = false;
  }

  if (Number(quantityInput.value) <= 0 || !Number.isInteger(Number(quantityInput.value))) {
    alert('Số lượng phải là số nguyên dương');
    isValid = false;
  }

  const imgInput = form.querySelector('input[type="text"]:not(#category-id):not(#category-name)');
  if (!imgInput.value.trim()) {
    alert('Vui lòng nhập link hình ảnh');
    isValid = false;
  } else if (!/\.(jpe?g|png|webp)$/i.test(imgInput.value.trim())) {
    alert('Hình ảnh phải có định dạng JPG, PNG hoặc WebP');
    isValid = false;
  }

  return isValid;
}

function renderProducts(list) {
  tableBody.innerHTML = '';
  list.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price.toLocaleString()}đ</td>
      <td>${p.quantity}</td>
      <td>${p.discount}%</td>
      <td><span class="status ${p.status}">${p.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span></td>
      <td>
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const newProduct = {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    category: categoryFilter.value,
    quantity: Number(quantityInput.value),
    price: Number(priceInput.value),
    discount: Number(discountInput.value),
    status: document.querySelector('input[name="status"]:checked').value
  };

  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts(products);
  modal.style.display = 'none';
  form.reset();
});

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

tableBody.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.delete-btn');
  if (!deleteBtn) return;

  if (products.length === 1) {
    alert('Sản phẩm không được phép bỏ trống');
    return;
  }

  const row = deleteBtn.closest('tr');
  const productId = row.children[0].textContent;
  const productName = row.children[1].textContent;

  productToDelete = products.find(p => p.id === productId);
  deleteItemName.textContent = productName;
  confirmDeleteModal.style.display = 'flex';
});


cancelDeleteBtn.addEventListener('click', () => {
  confirmDeleteModal.style.display = 'none';
  productToDelete = null;
});

confirmDeleteBtn.addEventListener('click', () => {
  if (productToDelete) {
    products = products.filter(p => p.id !== productToDelete.id);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts(products);
    productToDelete = null;
  }
  confirmDeleteModal.style.display = 'none';
});

renderProducts(products);
