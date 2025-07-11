import express from 'express';
import {
  getAllImages,
  searchImagesByName,
  getImageDetails,
  getImageComments,
  checkImageSaved,
  postImageComment
} from '../controllers/image.controller.js';

const router = express.Router();

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   image_id:
 *                     type: integer
 *                   image_name:
 *                     type: string
 *                   path:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/images', getAllImages);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   image_id:
 *                     type: integer
 *                   image_name:
 *                     type: string
 *                   path:
 *                     type: string
 *                   description:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Thiếu tham số truy vấn name
 */
router.get('/images/search', searchImagesByName);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_id:
 *                   type: integer
 *                 image_name:
 *                   type: string
 *                 path:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy hình ảnh
 */
router.get('/images/:image_id', getImageDetails);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   commented_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/images/:image_id/comments', getImageComments);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSaved:
 *                   type: boolean
 */
router.get('/images/:image_id/is-saved', checkImageSaved);

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
router.post('/images/:image_id/comments', postImageComment);

export default router;
