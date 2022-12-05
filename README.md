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

## Usage

Use with

```
const bigNumberify = require("bignumberify")
const obj = bigNumberify(JSON.parse(jsonStr))
```

## History

**0.0.1**
- First version

## License

MIT

## Copyright

(c) 2022, Francesco Sullo <francesco@sullo.co>
