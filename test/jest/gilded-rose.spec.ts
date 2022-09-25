import { golden } from "../golden";
import { Item, GildedRose } from "../../app/gilded-rose";
import { readFileSync, writeFileSync } from "fs";

function capture(f) {
  let out = "";
  function print(s) {
    out += s + "\n";
  }
  f(print);
  return out;
}

it("Should match expected text", () => {
  const actual = capture(golden);
  writeFileSync("test/actual.txt", actual);

  const expected = readFileSync("test/expected.txt", "utf-8");
  try {
    expect(actual).toBe(expected);
  } catch (e) {
    console.log(
      "*** Golden master test failed ***\nTo update golden master, run: cp tests/actual.txt tests/expected.txt\n**********************************"
    );
    throw e;
  }
});

it("Should update regular item -1", () => {
  let g = new GildedRose([{ name: "Foo", sellIn: 5, quality: 5 }]);

  g.updateQuality();
  expect(g.items[0].quality).toBe(4);
});

it("Should update clojured item -2", () => {
  let g = new GildedRose([
    { name: "Conjured Mana Cake", sellIn: 5, quality: 5 },
  ]);

  g.updateQuality();
  expect(g.items[0].quality).toBe(3);
});
