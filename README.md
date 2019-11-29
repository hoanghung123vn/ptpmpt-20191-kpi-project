# Hướng dẫn cài đặt mã nguồn và desploy

## Phần cài đặt mã nguồn: (lưu ý máy bạn cần cài Nodejs version > 8.10, Vue CLI > 3.0)
## Cài đặt mã nguồn: 
* Sau khi tải hoặc clone mã nguồn về máy local, vào đường dẫn thư mục dự án và cài đặt các gói phụ thuộc trong file package.json: (bạn có thể dùng npm hoặc yarn để cài đặt)
```
yarn install 
or npm install
```

* Biên dịch và tải nhanh trang web trên local cho môi trường phát triển dùng lệnh:
```
yarn serve
or npm run serve
```

* Biên dịch và tối ưu cho môi trường sản xuất dùng lệnh build:
```
yarn build
or npm run build
```

* Kết nối và kết hợp các file
```
yarn lint
or npm run lint
```

* Các cài đặt tùy chọn khác: 
Xem tại [Configuration Reference](https://cli.vuejs.org/config/).

## Phần desploy hệ thống lên Heroku: 
* Bước 1: Tạo ra file server.js trong thư mục chính của dự án với nội dung như trong mã nguồn.
* Bước 2: Trong file package.json thêm đoạn script:
```
"start" = "node server"
```
* Bước 3: Không cần build trước vì Heroku sẽ tự build cho mình, desploy bằng Heroku CLI:
```
$ heroku login
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
