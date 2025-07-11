/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API quản lý hình ảnh
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Lấy danh sách tất cả các hình ảnh
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Danh sách hình ảnh
 */

/**
 * @swagger
 * /images/search:
 *   get:
 *     summary: Tìm kiếm hình ảnh theo tên
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Tên hoặc phần tên hình ảnh cần tìm
 *     responses:
 *       200:
 *         description: Danh sách hình ảnh tìm được
 *       400:
 *         description: Thiếu tham số truy vấn name
 */

/**
 * @swagger
 * /images/{image_id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một hình ảnh và người tạo
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Thông tin chi tiết hình ảnh
 *       404:
 *         description: Không tìm thấy hình ảnh
 */

/**
 * @swagger
 * /images/{image_id}/comments:
 *   get:
 *     summary: Lấy danh sách bình luận của một hình ảnh
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 */

/**
 * @swagger
 * /images/{image_id}/is-saved:
 *   get:
 *     summary: Kiểm tra xem hình ảnh đã được người dùng hiện tại lưu hay chưa
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Trạng thái lưu ảnh
 */

/**
 * @swagger
 * /images/{image_id}/comments:
 *   post:
 *     summary: Đăng một bình luận mới của người dùng về hình ảnh
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của hình ảnh
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - content
 *             properties:
 *               user_id:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bình luận được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
