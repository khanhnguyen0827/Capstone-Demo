import express from 'express';
import prisma from './src/common/prisma/init.prisma.js';
import rootRouter from './src/routes/root.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/common/swagger/index.js';
import logger from './src/common/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware để ghi log HTTP với màu sắc
app.use(logger);

// Middleware để parse JSON body
app.use(express.json());

// Tích hợp swagger-ui để hiển thị tài liệu API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import { handleErr } from './src/common/helpers/handle-err.helper.js';

// Sử dụng router chính
app.use('/', rootRouter);

// Middleware xử lý lỗi toàn cục
// app.use(handleErr);

async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await checkDatabaseConnection();
});
