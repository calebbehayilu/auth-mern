const getAvatar = (name) => {
  const getArray = name.split(" ");
  const initials = getArray.map((part) => part.charAt(0));

  return initials.join("");
};

export default getAvatar;
