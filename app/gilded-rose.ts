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

function isLegendary(item: Item) {
  return item.name == "Sulfuras, Hand of Ragnaros";
}

function isConcert(item: Item) {
  return item.name == "Backstage passes to a TAFKAL80ETC concert";
}

function isCheese(item: Item) {
  return item.name == "Aged Brie";
}

function isConjured(item: Item) {
  return item.name == "Conjured Mana Cake";
}

function isPastDue(item: Item) {
  return item.sellIn < 0;
}

function qualityDelta(item: Item) {
  if (isConcert(item)) {
    if (item.sellIn <= 5) {
      return 3;
    } else if (item.sellIn <= 10) {
      return 2;
    } else return 1;
  } else if (isCheese(item)) {
    return 1;
  } else {
    return isConjured(item) ? -2 : -1;
  }
}

function pastDueQualityDelta(item: Item) {
  if (isConcert(item)) {
    return -item.quality;
  } else return qualityDelta(item);
}

function updateQuality(item: Item, delta: number) {
  if (!isLegendary(item)) {
    item.quality = Math.max(Math.min(item.quality + delta, 50), 0);
  }
}

function updateSellIn(item: Item, delta: number) {
  if (!isLegendary(item)) {
    item.sellIn = item.sellIn + delta;
  }
}

function updateOne(item: Item) {
  updateQuality(item, qualityDelta(item));
  updateSellIn(item, -1);
  if (isPastDue(item)) {
    updateQuality(item, pastDueQualityDelta(item));
  }
}
