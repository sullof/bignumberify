const ethers = require("ethers");

function isObject(o) {
  return typeof o === "object" && o !== null && !!Object.keys(o).length;
}

function isBN(bn) {
  const result = Object.keys(bn).length === 2 && (bn.type === "BigNumber" || bn.type === "BigInt") && /^0x(?:[a-fA-F0-9]{2})*$/.test(bn.hex || "");
  return result;
}

function convert(bn) {
  try {
    if (bn.type === "BigNumber") {
      return ethers.BigNumber.from(bn.hex);
    } else if (bn.type === "BigInt") {
      return BigInt(bn.hex);
    }
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
    return typeof value === "object" && isBN(value)
      ? convert(value)
      : value;
  }
}

function stringify(key, value) {
  if (typeof value === "bigint") {
    // Change the key and value if the person is alive
    let hex = value.toString(16);
    if (hex.length % 2) {
      hex = '0' + hex;
    }
    return 'status', {
      type: "BigInt",
      hex: '0x' + hex,
    };
  }
  return value;
}

bigNumberify.stringify = stringify;

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
