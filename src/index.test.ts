import rewire from "rewire"
import calibrate from "./index"
import bcrypt from "bcryptjs"
import { range, times } from "lodash"

const index = rewire("./index")
const calibrateBcryptRounds = index.__get__("calibrateBcryptRounds")
const thresholds = range(100, 500, 100)
const iterations = 5

jest.setTimeout(30000);

thresholds.forEach((threshold) => {
  test(`returns the number of rounds needed to result in a minimum hashing time of ${ threshold }`, async () => {
    let rounds = await calibrate(bcrypt, threshold * 1.25);
    await Promise.all(times(iterations, async () => {
      let duration = await time(async () => {
        await bcrypt.hash('12345678', rounds);
      });
      expect(duration).toBeGreaterThan(threshold);
    }));
  });
});

async function time(fn: () => void | Promise<void>) {
  let start = Date.now();
  await fn();
  return Date.now() - start;
}

// @ponicode
describe("calibrateBcryptRounds", () => {
    test("0", async () => {
        await calibrateBcryptRounds({}, 100)
    })

    test("1", async () => {
        await calibrateBcryptRounds({}, -5.48)
    })

    test("2", async () => {
        await calibrateBcryptRounds({}, 0)
    })

    test("3", async () => {
        await calibrateBcryptRounds({}, 1)
    })

    test("4", async () => {
        await calibrateBcryptRounds({}, -100)
    })

    test("5", async () => {
        await calibrateBcryptRounds({}, -Infinity)
    })
})
