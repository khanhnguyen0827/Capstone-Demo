import prisma from '../common/prisma/init.prisma.js';

export async function fetchUserDetails(user_id) {
  return await prisma.users.findUnique({
    where: { user_id },
    select: {
      user_id: true,
      email: true,
      full_name: true,
      age: true,
      avatar: true,
      created_at: true
    }
  });
}

export async function fetchUserSavedImages(user_id) {
  return await prisma.saved_images.findMany({
    where: { user_id },
    include: {
      images: true
    }
  });
}

export async function fetchUserCreatedImages(user_id) {
  return await prisma.images.findMany({
    where: { user_id },
    orderBy: { created_at: 'desc' }
  });
}

export async function removeImage(image_id) {
  const deleted = await prisma.images.deleteMany({
    where: { image_id }
  });
  return deleted.count > 0;
}
