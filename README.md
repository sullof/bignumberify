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

In a Node app load as

```
const bigNumberify = require("bignumberify");
```

In a ES6 app, load as 

```
import {bigNumberify} from "bignumberify";
```

To parse an object
```
const obj = bigNumberify(inputObj);
```
or as a reviver function
``` 
const obj = JSON.parse(jsonStr, bigNumberify);
```

## History

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
