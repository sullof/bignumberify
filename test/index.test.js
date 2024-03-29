const {assert} = require("chai");
const {ethers} = require("ethers");

const bigNumberify = require("..");

describe("bigNumberify", async function () {

  let obj;
  let obj2;

  beforeEach(async function () {
    obj = {
      a: 2,
      b: {
        c: ethers.BigNumber.from("10"),
        d: "Some string",
      },
      e: [
        ethers.BigNumber.from("20"),
        {
          f: ethers.BigNumber.from("30"),
          g: [0, 1, 2, 3, 4, ethers.BigNumber.from("40"), 6],
        },
      ],
      h: ethers.BigNumber.from("50"),
    }
    obj2 = obj.h;
  })

  it("should recover all the big numbers", async function () {
    let jsonStr = JSON.stringify(obj);
    let bad = JSON.parse(jsonStr);

    assert.isFalse(ethers.BigNumber.isBigNumber(bad.h));
    assert.equal(bad.b.c.toString(), "[object Object]");

    let good = bigNumberify(bad);
    assert.isTrue(ethers.BigNumber.isBigNumber(good.h));

    assert.equal(good.b.c.toString(), "10");
    assert.equal(good.e[0].toString(), "20");
    assert.equal(good.e[1].f.toString(), "30");
    assert.equal(good.e[1].g[5].toString(), "40");
    assert.equal(good.h.toString(), "50");
  });

  it("should manage a single big number", async function () {
    let jsonStr = JSON.stringify(obj2);
    let bad = JSON.parse(jsonStr);
    assert.equal(bad.type, "BigNumber");
    assert.equal(bad.hex, "0x32");
    assert.isFalse(ethers.BigNumber.isBigNumber(bad));

    let good = bigNumberify(bad);
    assert.isTrue(ethers.BigNumber.isBigNumber(good));
    assert.equal(good.toString(), "50");
  });

  it("should skip not-real BigNumber in the JSON", async function () {
    let jsonStr = JSON.stringify(obj);
    let bad = JSON.parse(jsonStr);

    bad.e[0] = {
      type: "BigNumber",
      hex: "some wrong stuff",
    };

    let good = bigNumberify(bad);
    assert.isTrue(ethers.BigNumber.isBigNumber(good.h));

    assert.equal(good.b.c.toString(), "10");
    assert.equal(good.e[0].hex, "some wrong stuff");
    assert.equal(good.e[1].f.toString(), "30");
    assert.equal(good.e[1].g[5].toString(), "40");
    assert.equal(good.h.toString(), "50");
  });

  it("should stringify BigInt items and parse them back", async function () {
    obj.x = 125000n;
    let jsonStr = JSON.stringify(obj, bigNumberify.stringify, 2);

    let good = JSON.parse(jsonStr, bigNumberify);

    assert.equal(typeof good.x, "bigint");
  });

  it("should recover if used as a reviver function", async function () {
    let jsonStr = JSON.stringify(obj);

    let good = JSON.parse(jsonStr, bigNumberify);
    assert.isTrue(ethers.BigNumber.isBigNumber(good.h));

    assert.equal(good.b.c.toString(), "10");
    assert.equal(good.e[0].toString(), "20");
    assert.equal(good.e[1].f.toString(), "30");
    assert.equal(good.e[1].g[5].toString(), "40");
    assert.equal(good.h.toString(), "50");
  });

  it("should manage a single big number as reviver", async function () {
    let jsonStr = JSON.stringify(obj2);
    let good = bigNumberify(jsonStr, bigNumberify);
    assert.isTrue(ethers.BigNumber.isBigNumber(good));
    assert.equal(good.toString(), "50");

    let num = 1.4;
    jsonStr = JSON.stringify(num);
    good = bigNumberify(jsonStr, bigNumberify);
    assert.equal(good, 1.4);
  });
});
