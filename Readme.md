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

**Note:** using `calibrate` will help pick the right cost factor every time
you restart or redeploy your app. But it won't update old passwords hashed
with fewer rounds. As you check passwords, you should also check to see if
they need to be rehashed with more rounds to keep them secure, i.e.:

```js
if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
  // User has authenticated, now rehash password if needed
  if (bcrypt.getRounds(user.hashedPassword) < myAppConfig.bcryptRoundsFromCalibration) {
    user.hashedPassword = await bcrypt.hash(req.body.password, myAppConfig.bcryptRoundsFromCalibration);
    await user.save();
  }
  // ...
}

## Motivation

bcrypt is an adaptive hashing function, meaning that it accepts a `cost` (or
`rounds`) parameter determines how much work to perform. When bcrypt was
first released in 1999, the original suggested cost factor was 6. Today
(2018), thanks to faster hardware, that recommendation is now somewhere
between 11 and 14 (each increment of the cost factor doubles the work).

Rather than hardcoding a specific cost factor into your code (which will likely
become out date in a year), you should instead calculate an appropriate cost
factor based on how long you want it to take to calculate.

This module automates that process by running bcrypt with progressively
increasing cost factors until it takes at least as long as you specify to
hash a password.

See [this Security StackExchange answer](https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256/3993#3993)
for more detail.
