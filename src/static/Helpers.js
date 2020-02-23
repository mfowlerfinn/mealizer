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
  let arr = [];

  const getNumber = maxRange => {
    let result;

    const randomNumber = maxRange => {
      result = Math.floor(Math.random() * maxRange);

      if (maxRange > len) {
        checkForDuplicate();
      } else {
        // console.log("not enough recipes, duplicates will be present.");
        arr.push(result);
      }
    };

    const checkForDuplicate = () => {
      let duplicate = false;
      arr.map((num, index) => {
        if (num === result) duplicate = true;
      });
      if (duplicate === false) {
        arr.push(result);
      } else {
        randomNumber(maxRange);
      }
    };

    randomNumber(maxRange);
    return result;
  };

  for (let i = 0; i < len; i++) {
    getNumber(maxRange);
  }

  // console.log(arr);
  return arr;
};
