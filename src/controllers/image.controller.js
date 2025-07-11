import {
  fetchAllImages,
  fetchImagesByName,
  fetchImageDetails,
  fetchImageComments,
  checkIfImageSaved,
  addImageComment
} from '../services/image.service.js';

export async function getAllImages(req, res) {
  try {
    const images = await fetchAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchImagesByName(req, res) {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Missing query parameter: name' });
    }
    const images = await fetchImagesByName(name);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getImageDetails(req, res) {
  try {
    const { image_id } = req.params;
    const image = await fetchImageDetails(Number(image_id));
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getImageComments(req, res) {
  try {
    const { image_id } = req.params;
    const comments = await fetchImageComments(Number(image_id));
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function checkImageSaved(req, res) {
  try {
    const { image_id } = req.params;
    const user_id = req.query.user_id; // giả sử user_id được truyền qua query param
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id query parameter' });
    }
    const isSaved = await checkIfImageSaved(Number(user_id), Number(image_id));
    res.status(200).json({ isSaved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postImageComment(req, res) {
  try {
    const { image_id } = req.params;
    const { user_id, content } = req.body;
    if (!user_id || !content) {
      return res.status(400).json({ error: 'Missing user_id or content in request body' });
    }
    const comment = await addImageComment(Number(user_id), Number(image_id), content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
