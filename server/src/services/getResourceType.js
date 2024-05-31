import mime from'mime-types';

const getResourceType = (filePath) => {
  const mimeType = mime.lookup(filePath);
  if (mimeType.startsWith('image/')) {
    return 'image';
  } else if (mimeType.startsWith('video/')) {
    return 'video';
  } else if (mimeType.startsWith('audio/')) {
    return 'audio';
  } else {
    return 'raw';
  }
}

export default getResourceType