const mainSection = document.querySelector('.container');

function MakeHtml() {
    const div_card = document.createElement('div');
    let sum = localStorage.getItem('finalTotal');
    let numericSum = parseInt(sum) || 0; 
    let formattedSum = numericSum.toLocaleString('vi-VN');
    div_card.innerHTML = `
            <h1 style="color: #4CAF50;">Đặt bàn thành công!</h1>
            <p>Cảm ơn bạn đã lựa chọn chúng tôi. Thông tin xác nhận đã được gửi đến hệ thống.</p>
            
            <div style="margin: 30px 0; padding: 20px; background: #0b0e14; border: 1px solid #2a3650; border-radius: 8px;">
                <p style="color: #a8b2d1; font-size: 1.1rem; margin-bottom: 10px;">Tổng số tiền của bạn là:</p>
                <strong id="final-total" style="color: #d9534f; font-size: 2rem;">${formattedSum}.000 VND</strong>
            </div>

            <br>
            <a href="index.html" class="btn">Quay lại trang chủ</a>`
    mainSection.appendChild(div_card);
}

MakeHtml();