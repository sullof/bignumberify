const ethers = require("ethers");

function bigNumberify(obj) {
  const isObject = (o) => {
    return typeof o === "object" && o !== null && !!Object.keys(o).length;
  };
  const isBN = (bn) => {
    return bn.type === "BigNumber" && bn.hex && Object.keys(bn).length === 2;
  };
  const manage = (item, i) => {
    if (isObject(item[i])) {
      if (isBN(item[i])) {
        item[i] = ethers.BigNumber.from(item[i].hex);
      } else {
        item[i] = bigNumberify(item[i]);
      }
    }
  };
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      try {
        manage(obj, i);
      } catch (e) {}
    }
  } else if (isObject(obj)) {
    if (isBN(obj)) {
      obj = ethers.BigNumber.from(obj.hex);
    } else
      for (let i in obj) {
        try {
          manage(obj, i);
        } catch (e) {}
      }
  }
  return obj;
}

module.exports = bigNumberify;
