import * as bcryptLike from 'bcryptjs';

export default async function calibrateBcryptRounds(bcrypt: typeof bcryptLike, minimumTime: number) {
  let timeTaken = 0;
  let rounds = 1;
  while (timeTaken < minimumTime) {
    rounds += 1;
    let startTime = Date.now();
    await bcrypt.hash('12345678', rounds);
    timeTaken = Date.now() - startTime;
  }
  return rounds;
}
