// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Show/hide back to top button
window.addEventListener('scroll', function () {
    const backToTopButton = document.querySelector('a[href="#home"]');
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

// Service detail functions
function showServiceDetail(serviceId) {
    // Hide all service details first
    document.querySelectorAll('.service-detail').forEach(detail => {
        detail.classList.remove('active');
    });

    // Show the selected service detail
    const detailElement = document.getElementById(`${serviceId}-detail`);
    if (detailElement) {
        detailElement.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling of the main page
    }
}

function closeServiceDetail() {
    // Hide all service details
    document.querySelectorAll('.service-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close service detail on ESC key press
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeServiceDetail();
    }
});
// xử lý gửi form
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        eventType: document.getElementById('event-type').value.trim(),
        details: document.getElementById('details').value.trim()
    };

    // Kiểm tra dữ liệu trước khi gửi
    if (!formData.name || !formData.email || !formData.phone || !formData.eventType || !formData.details) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    // Kiểm tra định dạng số điện thoại: chỉ gồm 10 hoặc 11 chữ số
    const phonePattern = /^[0-9]{10,11}$/;
    if (!phonePattern.test(formData.phone)) {
        alert('Số điện thoại không hợp lệ! Chỉ được phép 10 hoặc 11 chữ số.');
        return;
    }
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwVOBljSqNZCKDJmkMGhYxBpk0Xp2MXNTxXuw1qKkxeZ6nJUQ5H4BhWkK8J4OmI0sVmDQ/exec', {
            method: 'POST',
            mode: 'no-cors', // Tránh lỗi CORS
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // Hiển thị toast thành công
        const toast = document.getElementById('success-toast');
        toast.classList.remove('hidden');
        toast.classList.add('opacity-100');

        // Reset form
        document.getElementById('contact-form').reset();

        // Tự ẩn toast sau 3 giây
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('opacity-100', 'opacity-0');
            }, 300);
        }, 3000);

    } catch (error) {
        console.error('Lỗi:', error);
        alert('Không thể gửi yêu cầu. Vui lòng kiểm tra kết nối.');
    }
});