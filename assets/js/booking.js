/**
 * Totoro Sushi & Grill - Table Booking Form Handler (booking.js)
 * Validates reservation details, sets date constraints, and displays detailed success alerts.
 */

document.addEventListener('DOMContentLoaded', function() {
    initBookingForms();
});

function initBookingForms() {
    const bookingForms = document.querySelectorAll('.totoro-booking-form');
    if (bookingForms.length === 0) return;

    // 1. Restrict Date inputs to Today and future dates only
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    const todayString = `${yyyy}-${mm}-${dd}`;
    
    bookingForms.forEach(form => {
        const dateInput = form.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.min = todayString;
            dateInput.value = todayString; // Default to today
        }

        // 2. Add submit event handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form input fields
            const name = form.querySelector('[name="fullname"]');
            const phone = form.querySelector('[name="phone"]');
            const date = form.querySelector('[name="date"]');
            const time = form.querySelector('[name="time"]');
            const adults = form.querySelector('[name="adults"]');
            const kids = form.querySelector('[name="kids"]');
            const notes = form.querySelector('[name="notes"]');
            const submitBtn = form.querySelector('button[type="submit"]');

            if (!name.value || !phone.value || !date.value || !time.value || !adults.value) {
                if (typeof showAlert === 'function') {
                    showAlert('Vui lòng điền đầy đủ các thông tin đặt bàn bắt buộc.', 'error');
                }
                return;
            }

            // Simple phone number check (10 digits starting with 0)
            const phonePattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (!phonePattern.test(phone.value.trim())) {
                if (typeof showAlert === 'function') {
                    showAlert('Số điện thoại không đúng định dạng. Vui lòng nhập số điện thoại Việt Nam 10 số.', 'error');
                }
                return;
            }

            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner" style="width: 16px; height: 16px; margin-right: 6px;"></span> Đang xử lý...';

            // Simulate server network latency (1.5 seconds)
            setTimeout(() => {
                // Show success modal popup
                showBookingSuccessModal({
                    name: name.value.trim(),
                    phone: phone.value.trim(),
                    date: date.value,
                    time: time.value,
                    adults: adults.value,
                    kids: kids.value || 0,
                    notes: notes ? notes.value.trim() : ''
                });

                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Reset form fields
                form.reset();
                if (dateInput) dateInput.value = todayString;

            }, 1500);
        });
    });
}

// Render and show details in Booking Success Modal
function showBookingSuccessModal(details) {
    // Check if modal container exists in HTML, otherwise create dynamic details modal
    let successModal = document.getElementById('booking-success-modal');
    
    if (!successModal) {
        // Create modal dynamically
        successModal = document.createElement('div');
        successModal.id = 'booking-success-modal';
        successModal.className = 'modal';
        successModal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; text-align: center;">
                <div class="modal-close-btn" id="close-booking-success-btn">✕</div>
                <div style="padding: var(--spacing-lg); display: flex; flex-direction: column; gap: 15px;">
                    <div style="font-size: 60px; margin-bottom: 5px;">🎉</div>
                    <h2 class="modal-title" style="color: var(--color-primary);">Đặt Bàn Thành Công!</h2>
                    <p style="font-size: 15px; color: var(--color-text-muted);">
                        Cảm ơn anh/chị <strong id="bk-modal-name" style="color: var(--color-secondary);"></strong>.
                        Totoro Nướng & Sushi đã nhận được yêu cầu giữ bàn của bạn.
                    </p>
                    
                    <div style="background-color: var(--color-bg); padding: var(--spacing-sm); border-radius: var(--radius-sm); border: 1px dashed var(--color-primary); text-align: left; font-size: 14px; margin: 10px 0;">
                        <p>📍 <strong>Nhà hàng:</strong> Totoro Nướng & Sushi Đà Nẵng</p>
                        <p>📅 <strong>Ngày đặt:</strong> <span id="bk-modal-date"></span></p>
                        <p>⏰ <strong>Giờ đặt:</strong> <span id="bk-modal-time"></span></p>
                        <p>👥 <strong>Số lượng:</strong> <span id="bk-modal-qty"></span></p>
                        <p>📞 <strong>SĐT xác nhận:</strong> <span id="bk-modal-phone"></span></p>
                        <p id="bk-modal-notes-row" style="display:none;">📝 <strong>Ghi chú:</strong> <span id="bk-modal-notes"></span></p>
                    </div>

                    <p style="font-size: 13px; color: var(--color-text-muted); font-style: italic;">
                        * Nhân viên nhà hàng sẽ gọi điện xác nhận đặt bàn trực tiếp tới số điện thoại này trong vòng 10-15 phút. Xin chân thành cảm ơn!
                    </p>
                    
                    <button type="button" class="btn btn-primary" id="confirm-booking-success-btn" style="margin-top: 10px; width: 100%;">Đóng và Trở Về</button>
                </div>
            </div>
        `;
        document.body.appendChild(successModal);

        // Attach close event handlers
        const closeBtn = successModal.querySelector('#close-booking-success-btn');
        const confirmBtn = successModal.querySelector('#confirm-booking-success-btn');
        const closeModalFn = () => successModal.classList.remove('open');

        if (closeBtn) closeBtn.addEventListener('click', closeModalFn);
        if (confirmBtn) confirmBtn.addEventListener('click', closeModalFn);
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) closeModalFn();
        });
    }

    // Fill data values into success modal
    successModal.querySelector('#bk-modal-name').textContent = details.name;
    successModal.querySelector('#bk-modal-phone').textContent = details.phone;
    
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = details.date.split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : details.date;
    successModal.querySelector('#bk-modal-date').textContent = formattedDate;
    
    successModal.querySelector('#bk-modal-time').textContent = details.time;
    successModal.querySelector('#bk-modal-qty').textContent = `${details.adults} người lớn` + (details.kids > 0 ? `, ${details.kids} trẻ em` : '');
    
    // Ghi chú
    const notesRow = successModal.querySelector('#bk-modal-notes-row');
    const notesSpan = successModal.querySelector('#bk-modal-notes');
    if (details.notes) {
        notesRow.style.display = 'block';
        notesSpan.textContent = details.notes;
    } else {
        notesRow.style.display = 'none';
    }

    // Open success details modal popup
    successModal.classList.add('open');
}
