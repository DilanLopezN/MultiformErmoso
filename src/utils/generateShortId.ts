// src/utils/uuidGenerator.js
import {v4 as uuidv4} from 'uuid'

const generateShortUUID = () => {
  const fullUUID = uuidv4();
  const shortUUID = fullUUID.replace(/-/g, '').substring(0, 5);
  return shortUUID;
};

export default generateShortUUID;
