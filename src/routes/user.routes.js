import express from 'express';
import {
  getUserDetails,
  getUserSavedImages,
  getUserCreatedImages,
  deleteImage
} from '../controllers/user.controller.js';

const router = express.Router();

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 full_name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 avatar:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Người dùng không tồn tại
 */
router.get('/users/:user_id', getUserDetails);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   image_id:
 *                     type: integer
 *                   saved_at:
 *                     type: string
 *                     format: date-time
 *                   images:
 *                     type: object
 *                     properties:
 *                       image_id:
 *                         type: integer
 *                       image_name:
 *                         type: string
 *                       path:
 *                         type: string
 *                       description:
 *                         type: string
 *                       user_id:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 */
router.get('/users/:user_id/saved-images', getUserSavedImages);

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
router.get('/users/:user_id/created-images', getUserCreatedImages);

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
router.delete('/images/:image_id', deleteImage);

export default router;
