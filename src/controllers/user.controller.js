import {
  fetchUserDetails,
  fetchUserSavedImages,
  fetchUserCreatedImages,
  removeImage
} from '../services/user.service.js';

export async function getUserDetails(req, res) {
  try {
    const { user_id } = req.params;
    const user = await fetchUserDetails(Number(user_id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserSavedImages(req, res) {
  try {
    const { user_id } = req.params;
    const images = await fetchUserSavedImages(Number(user_id));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserCreatedImages(req, res) {
  try {
    const { user_id } = req.params;
    const images = await fetchUserCreatedImages(Number(user_id));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteImage(req, res) {
  try {
    const { image_id } = req.params;
    const deleted = await removeImage(Number(image_id));
    if (!deleted) {
      return res.status(404).json({ error: 'Image not found or not deleted' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
