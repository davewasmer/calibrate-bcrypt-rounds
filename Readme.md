# calibrate-bcrypt-rounds

![Build Status](https://img.shields.io/circleci/project/github/davewasmer/calibrate-bcrypt-rounds/master.svg?style=flat-square)

> Calculate bcrypt rounds on the fly rather than hardcoding a specific number

## Installation

```
$ yarn add calibrate-bcrypt-rounds
```

## Usage

```js
import calibrate from 'calibrate-bcrypt-rounds';
import bcrypt from 'bcryptjs';

// Note how the calibrate function is called once, when the module is loaded
const rounds = await calibrate(bcrypt, 241);

export default async function hashPassword(password) {
  return bcrypt.hash(password, rounds);
}
```

## Motivation

bcrypt is an adaptive hashing function, meaning that it accepts a `cost` (or
`rounds`) parameter determines how much work to perform. When bcrypt was
first released in 1999, the original suggested cost factor was 6. Today
(2018), that recommendation is now somewhere between 11 and 14 (each
increment of the cost factor doubles the work).

Rather than hardcoding a specific cost factor into your code (which will likely
become out date in a year), you should instead calculate an appropriate cost
factor based on how long you want it to take to calculate.

See [this Security StackExchange answer](https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256/3993#3993)
for more detail.
