# Hướng Dẫn Kết Nối Firebase Cho Totoro Nướng & Lẩu

Tài liệu này hướng dẫn chi tiết từng bước tạo dự án Firebase, kích hoạt cơ sở dữ liệu, kho lưu trữ ảnh và cấu hình biến môi trường trên Vercel để kết nối Cloud Firestore & Storage cho website của bạn.

---

## 🛠️ Bước 1: Tạo Dự Án Trên Firebase Console

1. Đăng nhập vào [Firebase Console](https://console.firebase.google.com/) bằng tài khoản Gmail của bạn.
2. Nhấn nút **Add project** (Tạo dự án mới).
3. Nhập tên dự án: Ví dụ `totoro-sushi-danang`. Nhấn **Continue**.
4. Tại bước Google Analytics: Bạn có thể tắt (bấm thanh gạt sang màu xám) để bỏ qua bước cấu hình phân tích phức tạp, giúp tạo dự án nhanh hơn. Nhấn **Create project**.
5. Đợi khoảng 10 giây để Google khởi tạo hệ thống, sau đó nhấn **Continue** để hoàn tất vào bảng điều khiển chính.

---

## ⚙️ Bước 2: Kích Hoạt Database (Firestore) & Storage (Lưu Trữ Ảnh)

### A. Firestore Database (Lưu trữ đơn hàng, đặt bàn, thực đơn)
1. Ở thanh menu bên trái, chọn **Build** ➔ **Firestore Database**.
2. Nhấn nút **Create database** (Tạo cơ sở dữ liệu).
3. **Vị trí cơ sở dữ liệu (Location)**: Chọn khu vực gần Việt Nam để tải trang nhanh nhất, ví dụ:
   * `asia-southeast1` (Singapore) hoặc `asia-east2` (Hồng Kông).
   * Nhấn **Next**.
4. **Quy tắc bảo mật**: Chọn **Start in test mode** (Bắt đầu ở chế độ thử nghiệm). Việc này sẽ cho phép các hàm API trung gian của website có quyền đọc và ghi dữ liệu lên đám mây mà không cần xác thực phức tạp trong giai đoạn chạy thử nghiệm.
5. Nhấn **Create** và đợi Google thiết lập phân vùng dữ liệu.

### B. Storage (Lưu trữ tệp tin hình ảnh món ăn tải lên)
1. Ở thanh menu bên trái, chọn **Build** ➔ **Storage**.
2. Nhấn nút **Get started** (Bắt đầu).
3. Chọn **Start in test mode** (Bắt đầu ở chế độ thử nghiệm). Nhấn **Next**.
4. Chọn vị trí lưu trữ (mặc định sẽ chọn trùng với khu vực Firestore đã thiết lập ở trên).
5. Nhấn **Done** và đợi hệ thống tạo phân vùng lưu trữ ảnh.

---

## 🔑 Bước 3: Lấy Project ID & Web API Key

1. Tại trang chính của dự án Firebase, nhấn vào biểu tượng hình **Bánh răng cài đặt (⚙️)** ở góc trên thanh menu bên trái (cạnh dòng chữ *Project Overview*) ➔ Chọn **Project settings** (Cài đặt dự án).
2. Tại tab **General** (Cài đặt chung), bạn hãy sao chép lại hai thông tin quan trọng sau:
   * **Project ID**: Ví dụ `totoro-sushi-danang-abcde`.
   * **Web API Key**: Ví dụ `AIzaSyB12345-XyZ...`.

---

## 🚀 Bước 4: Điền Cấu Hình Vào Vercel (Kích hoạt Cloud Live)

1. Truy cập vào trang quản trị của dự án trên [Vercel Dashboard](https://vercel.com/dashboard), mở dự án `totoro-sushi-danang`.
2. Nhấp vào tab **Settings** (Cài đặt) ở thanh menu trên cùng.
3. Chọn mục **Environment Variables** (Biến môi trường) ở danh sách bên trái.
4. Lần lượt điền 2 biến môi trường sau:
   * **Biến thứ 1**:
     * **Key**: `FIREBASE_PROJECT_ID`
     * **Value**: *[Dán mã Project ID của bạn ở Bước 3 vào]*
     * Nhấn **Add**.
   * **Biến thứ 2**:
     * **Key**: `FIREBASE_API_KEY`
     * **Value**: *[Dán mã Web API Key của bạn ở Bước 3 vào]*
     * Nhấn **Add**.
5. **Kích hoạt nạp cấu hình**: Sau khi thêm xong 2 biến, bạn hãy nhấp vào tab **Deployments** trên Vercel, chọn bản deploy trên cùng (mới nhất), nhấp vào nút **Ba dấu chấm** ở bên phải ➔ chọn **Redeploy** ➔ Nhấn **Redeploy** để Vercel build lại và nạp các biến môi trường này vào live web.

*Sau khi Redeploy thành công, website của bạn sẽ tự động chuyển từ cơ chế lưu offline (LocalStorage) sang đồng bộ đám mây trực tiếp của Google Firebase!*
