import { golden } from '../golden';
import {readFileSync} from 'fs';

function capture(f) {
  let out = "";
  function print(s) {
    out += s + "\n";
  }
  f(print);
  return out;
}

it('Should match expected text', () => {
  const actual = capture(golden);
  const expected = readFileSync("test/expected.txt", "utf-8");
  expect(actual).toBe(expected);
});
