const ethers = require("ethers");

function isObject(o) {
  return typeof o === "object" && o !== null && !!Object.keys(o).length;
}

function isBN(bn) {
  return bn.type === "BigNumber" && bn.hex && Object.keys(bn).length === 2;
}

function convert(bn) {
  try {
    bn = ethers.BigNumber.from(bn.hex);
  } catch (e) {}
  return bn;
}

function bigNumberify(key, value) {
  if (typeof key === "string" && typeof value === "function") {
    let obj = JSON.parse(key);
    if (isBN(obj)) {
      return convert(JSON.parse(key));
    } else {
      return obj;
    }
  } else if (typeof key === "object") {
    return scan(key);
  } else {
    return typeof value === "object" &&
      value.type === "BigNumber" &&
      !!value.hex
      ? convert(value)
      : value;
  }
}

function scan(obj) {
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
