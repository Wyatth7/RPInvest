const getUserEmail = (headers: string[]) => {
  let number = 0;

  headers.forEach((el, index) => {
    if (el === "email") {
      number = index;
    }
  });

  if (!number) {
    return -1;
  } else {
    return number + 1;
  }
};

export default getUserEmail;
