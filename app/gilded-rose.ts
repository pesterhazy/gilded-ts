export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      updateOne(item);
    }
  }
}

function updateQuality(item: Item, delta: number) {
  if (!isLegendary(item)) {
    item.quality = Math.max(Math.min(item.quality + delta, 50), 0);
  }
}

function isLegendary(item: Item) {
  return item.name == "Sulfuras, Hand of Ragnaros";
}

function isConcert(item: Item) {
  return item.name == "Backstage passes to a TAFKAL80ETC concert";
}

function isCheese(item: Item) {
  return item.name == "Aged Brie";
}

function calcDelta(item: Item) {
  if (isConcert(item)) {
    if (item.sellIn <= 5) {
      return 3;
    } else if (item.sellIn <= 10) {
      return 2;
    } else return 1;
  } else if (isCheese(item)) {
    return 1;
  } else {
    return -1;
  }
}

function pastDue(item: Item) {
  return item.sellIn < 0;
}

function updateOne(item: Item) {
  updateQuality(item, calcDelta(item));
  if (!isLegendary(item)) {
    item.sellIn = item.sellIn - 1;
  }
  if (pastDue(item)) {
    if (isConcert(item)) {
      item.quality = 0;
    } else if (isCheese(item)) {
      updateQuality(item, 1);
    } else {
      updateQuality(item, -1);
    }
  }
}
