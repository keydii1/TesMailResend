# 🚀 Hướng dẫn Deploy lên Render

## Bước 1: Cấu hình Environment Variables trên Render

1. Vào Render Dashboard: https://dashboard.render.com
2. Chọn service **TesMailResend**
3. Click tab **Environment** (menu bên trái)
4. Click **Add Environment Variable**

### Thêm các biến sau:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_7pkmDc1K_2SBpPpMBZXgj8XQL2btngsia` |
| `FROM_EMAIL` | `noreply@anhchang911.site` |

⚠️ **Lưu ý:**
- Không có dấu ngoặc kép `""`
- Không có khoảng trắng thừa
- Copy chính xác

## Bước 2: Redeploy

Sau khi thêm Environment Variables:
1. Click **Manual Deploy** → **Deploy latest commit**
2. Hoặc Render sẽ tự động deploy khi bạn push code mới

## Bước 3: Kiểm tra Logs

1. Vào tab **Logs** trên Render
2. Xem build có thành công không
3. Server phải chạy: `🚀 Server running on http://localhost:3000`

## Bước 4: Test

Sau khi deploy thành công:

```bash
# Lấy URL từ Render (ví dụ: https://tesmailresend.onrender.com)
curl -X POST https://your-app-name.onrender.com/send-mail \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com"}'
```

## ❌ Lỗi thường gặp:

### 1. "Cannot convert argument to a ByteString"
- **Nguyên nhân**: File `.env` bị push lên Git có ký tự lỗi
- **Giải pháp**: Dùng Environment Variables trên Render (đã làm ở Bước 1)

### 2. "RESEND_API_KEY is not set"
- **Nguyên nhân**: Chưa set Environment Variables
- **Giải pháp**: Xem lại Bước 1

### 3. Build fails
- **Nguyên nhân**: `node_modules` trong Git
- **Giải pháp**: Đã xóa rồi, push lại code

## ✅ Checklist

- [x] File `.env` đã thêm vào `.gitignore`
- [x] `node_modules` đã xóa khỏi Git
- [x] Code đã push lên GitHub
- [ ] Environment Variables đã set trên Render
- [ ] Deploy thành công
- [ ] Test API hoạt động

---

**Sau khi hoàn thành, app của bạn sẽ chạy trên Render và có thể gửi email!** 🚀
