//some helper functions for maths



export const restoreArrayFromLocal = keyName => {
  if (localStorage.getItem(keyName)) {
    let storedString = localStorage.getItem(keyName);
    let arr = JSON.parse(storedString);
    return arr;
  } else {
    return [];
  }
};

export const saveArrayToLocal = (arr, keyName) => {
  if (arr.length > 0) {
    let stringValue = JSON.stringify(arr);
    localStorage.setItem(keyName, stringValue);
  } else {
    return;
  }
};

export const arrayOfRandomNumbers = (len, maxRange) => {
  let arr = Array.from({ length: len }, () =>
    Math.floor(Math.random() * maxRange)
  );
  return arr;
};

