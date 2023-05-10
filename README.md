# bigNumberify

**A simple parser to correctly rebuild objects containing big numbers while parsing JSON strings**

## Intro

Managing transactions and results of query to smart contracts, you get a JSON string that encodes some Big Number in a format like

```json
{
  "bn": {
    "type": "BigNumber",
    "hex": "0x32"
  }
}
```

If you JSON.parse it, the property `bn` won't be a BigNumber :(

**bigNumberify** fixes the issue fixing all the BigNumber objects inside the JSON.

#### Starting from v0.0.7, **bigNumberify** also supports BigInt.

## Usage

In a Node app load as

```
const bigNumberify = require("bignumberify");
```

In a ES6 app, load as

```
import bigNumberify from "bignumberify";
```

### To parse an object

```
const obj = bigNumberify(inputObj);
```

or as a reviver function

```
const obj = JSON.parse(jsonStr, bigNumberify);
```

### To stringify an object

With BigNumber you do not need any special replacer to stringify an object containing BigNumbers. However, JSON.stringify throw an error if you try to stringify an object containing BigInt values. No problem, you can stringify them using

```javascript
const jsonStr = JSON.stringify(obj, bigNumberify.stringify);
```

It will encode the BigInt `125000n` as 
```json
{ 
  "type": "BigInt", 
  "hex": "0x01e848"
}
```

This way, during the parsing, the reviver function will be able to correctly rebuild the BigInt. Notice that the common practice is to stringify BigInt values as strings, but if you do so, how can you know, parsing the object, if that is a string or a BigInt?

## History

**0.0.7**

- Add `bigNumberify.stringify` method to the able to stringify objects containing BigInt
- Parse JSON strings containing encoded BigInt values as BigInt values 

**0.0.6**

- No real change. Just a fix in the README

**0.0.5**

- It is now able to manage single values as a reviver function

**0.0.4**

- Can now be used as a reviver function

**0.0.3**

- Ignore objects that look like a BigNumber, but they are not

**0.0.2**

- No real change. Just a better README

**0.0.1**

- First version

## TODO

- Add support for other formats

## License

MIT

## Copyright

(c) 2022, Francesco Sullo <francesco@sullo.co>
