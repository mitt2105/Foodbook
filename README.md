# FOODBOOK

Ứng dụng web/PWA lưu trữ và khám phá địa điểm ăn uống tổng hợp. Có tìm kiếm theo tên quán/món/địa chỉ, lọc theo **quận cũ** và danh mục, cùng tùy chọn chỉ hiện nơi có món chay.

## Chạy thử trên máy

Yêu cầu Node.js 20+ (khuyến nghị Node 22).

```bash
npm install
cp .env.example .env
npm run dev
```

Nếu chưa cấu hình Supabase, website chạy bằng dữ liệu demo. Dữ liệu thêm trong chế độ demo chỉ nằm trong bộ nhớ phiên hiện tại, không được lưu lâu dài.

## Kết nối Supabase

1. Tạo project tại https://supabase.com.
2. Mở SQL Editor, chạy toàn bộ nội dung `supabase/schema.sql` khi tạo database mới. Nếu đã chạy schema V1, chỉ chạy nội dung `supabase/migrations/20261108_general_foodbook.sql` để nâng cấp database hiện có.
3. Vào Authentication > Users, tạo tài khoản quản trị cho riêng bạn.
4. Gán `app_metadata` cho tài khoản quản trị với nội dung `{"role":"admin"}` bằng công cụ quản trị đáng tin cậy của Supabase (không thực hiện từ trình duyệt/client).
5. Sao chép Project URL và anon/publishable key vào `.env`: 

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

6. Chạy lại `npm run dev` và đăng nhập bằng tài khoản đã tạo.

**Lưu ý bảo mật:** Không bao giờ đưa `service_role` key vào frontend hoặc GitHub. Các policy trong schema kiểm tra `app_metadata.role = admin`; tài khoản đăng nhập thông thường không có quyền ghi dữ liệu.

## Đưa lên GitHub Pages

1. Dùng repository `mitt2105/Vegetarian` (base path đã đặt sẵn là `/Vegetarian/`).
2. Đưa toàn bộ mã nguồn trong thư mục này lên nhánh `main`.
3. Trong repository, vào Settings > Pages > Build and deployment, chọn **GitHub Actions**.
4. Vào Settings > Secrets and variables > Actions, thêm:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Push lên `main`. Workflow `.github/workflows/deploy.yml` sẽ build và deploy.

Base path đã cấu hình cho repository `Vegetarian`. Trong Settings > Pages, chọn **GitHub Actions** làm nguồn xuất bản.

## PWA và ảnh

Manifest và service worker cho phép cài FOODBOOK như ứng dụng web và mở lại shell trang đã tải khi mất mạng. Dữ liệu Supabase vẫn cần kết nối mạng. SQL schema tạo bucket Storage `foodbook-images`; ảnh công khai để hiển thị, chỉ admin có quyền tải lên. Nếu chưa cấu hình Supabase, có thể nhập URL ảnh.

## Cấu trúc dữ liệu địa chỉ

- `address`: địa chỉ cụ thể (số nhà, tên đường).
- `ward`: phường hiện tại.
- `old_district`: quận/huyện cũ dùng làm bộ lọc độc lập.
- `city`: tỉnh/thành phố.

Không tự động suy ra quận cũ từ phường mới; người quản trị chọn đúng nhãn quận cũ khi thêm quán.

## Phạm vi bản khởi tạo

Danh mục ẩm thực dùng chung cho mọi loại địa điểm. Người quản trị có thể đánh dấu nơi đó có phục vụ món chay; bộ lọc “Chỉ hiện địa điểm có món chay” giúp tìm các nơi phù hợp. Dữ liệu mẫu tổng hợp chỉ để minh họa.

Đã có: giao diện responsive, danh sách địa điểm ăn uống, tìm kiếm, lọc danh mục/quận cũ/món chay, hồ sơ chi tiết, yêu thích trong phiên, chọn địa điểm ngẫu nhiên, quản trị CRUD, đăng nhập Supabase, tải ảnh lên Supabase Storage và PWA cơ bản.

Cần cấu hình tiếp: tạo project Supabase và tài khoản admin, bật GitHub Pages bằng Actions, thêm secrets Supabase trong GitHub, rồi xác minh deploy thực tế. Bản đồ hiện mở liên kết ngoài Google Maps.
