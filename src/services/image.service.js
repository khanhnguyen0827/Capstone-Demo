import prisma from '../common/prisma/init.prisma.js';

export async function fetchAllImages() {
  return await prisma.images.findMany({
    orderBy: { created_at: 'desc' }
  });
}

export async function fetchImagesByName(name) {
  return await prisma.images.findMany({
    where: {
      image_name: {
        contains: name,
        mode: 'insensitive'
      }
    },
    orderBy: { created_at: 'desc' }
  });
}

export async function fetchImageDetails(image_id) {
  return await prisma.images.findUnique({
    where: { image_id },
    include: {
      user: {
        select: {
          user_id: true,
          email: true,
          full_name: true
        }
      }
    }
  });
}

export async function fetchImageComments(image_id) {
  return await prisma.comments.findMany({
    where: { image_id },
    orderBy: { commented_at: 'desc' }
  });
}

export async function checkIfImageSaved(user_id, image_id) {
  const saved = await prisma.saved_images.findUnique({
    where: {
      user_id_image_id: {
        user_id,
        image_id
      }
    }
  });
  return saved !== null;
}

export async function addImageComment(user_id, image_id, content) {
  return await prisma.comments.create({
    data: {
      user_id,
      image_id,
      content
    }
  });
}
