interface BcryptLike {
  hash(value: string, rounds: number): Promise<any>;
}

export default async function calibrateBcryptRounds(bcrypt: BcryptLike, minimumTime: number) {
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
