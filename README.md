# bigNumberify

**A simple filter to rebuild correctly big numbers while parsing JSON strings**

## Intro

Managing transactions and results of query to smart contracts, ofter you get a JSON string that encodes any Big Number. When you parse it, `JSON.parse` does not revert the big numbers correctly, and you cannot use them :-(

**bigNumberify** does the job for you.

## Usage

Use with

```
const bigNumberify = require("bignumberify")
const obj = bigNumberify(JSON.parse(jsonStr))
```

## License

MIT

## Copyright

(c) 2022, Francesco Sullo <francesco@sullo.co>
