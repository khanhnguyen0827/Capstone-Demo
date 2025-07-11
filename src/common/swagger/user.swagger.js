/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng và hình ảnh của họ
 */

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Người dùng không tồn tại
 */

/**
 * @swagger
 * /users/{user_id}/saved-images:
 *   get:
 *     summary: Lấy danh sách các hình ảnh mà người dùng đã lưu
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách hình ảnh đã lưu
 */

/**
 * @swagger
 * /users/{user_id}/created-images:
 *   get:
 *     summary: Lấy danh sách các hình ảnh mà người dùng đã tạo
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách hình ảnh đã tạo
 */

/**
 * @swagger
 * /images/{image_id}:
 *   delete:
 *     summary: Xóa một hình ảnh do người dùng tạo
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Xóa hình ảnh thành công
 *       404:
 *         description: Hình ảnh không tồn tại hoặc không thể xóa
 */
