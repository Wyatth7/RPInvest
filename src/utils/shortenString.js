const shortenString = (string) => {
  if (string.length < 8) {
    return string;
  }

  const dots = "...";

  const stringArr = string.split(string[8]);

  return stringArr[0].concat(dots);
};

export default shortenString;
