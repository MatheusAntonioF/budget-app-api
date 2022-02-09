export const generateUuidV4 = () => {
  const replace = (substring = '') => {
    const random = (Math.random() * 16) | 0;

    const hash = substring == 'x' ? random : (random & 0x3) | 0x8;

    return hash.toString(16);
  };

  const generatedHash = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    replace,
  );

  return generatedHash;
};
