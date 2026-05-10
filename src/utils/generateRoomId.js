const generateRoomId = () => {
  const randomDigits = Math.floor(60000 + Math.random() * 10000); // always 6 digits
  return `AD${randomDigits}`;
};

export default generateRoomId;
