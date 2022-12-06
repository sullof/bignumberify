const ethers = require("ethers");

function convert(bn) {
  try {
    bn = ethers.BigNumber.from(bn.hex);
  } catch(e) {
    // if it looks like a BigNumber but it is not
  }
  return bn;
}

function bigNumberify(key, value) {
  if (typeof key === 'object') {
    return scan(key)
  } else {
    return (typeof value === "object" && value.type === "BigNumber" && !!value.hex ? convert(value) : value);
  }
}

function scan(obj) {
  const isObject = (o) => {
    return typeof o === "object" && o !== null && !!Object.keys(o).length;
  };
  const isBN = (bn) => {
    return bn.type === "BigNumber" && bn.hex && Object.keys(bn).length === 2;
  };
  const manage = (item, i) => {
    if (isObject(item[i])) {
      if (isBN(item[i])) {
        item[i] = convert(item[i]);
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
      obj = convert(obj);
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
