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

function updateOne(item: Item) {
  const specialQuality =
    item.name == "Aged Brie" ||
    item.name == "Backstage passes to a TAFKAL80ETC concert";

  if (specialQuality) {
    let delta = 1;
    // extra handling for backstage passes
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn <= 10) {
        delta += 1;
      }
      if (item.sellIn <= 5) {
        delta += 1;
      }
    }
    updateQuality(item, delta);
  } else {
    updateQuality(item, -1);
  }
  if (!isLegendary(item)) {
    item.sellIn = item.sellIn - 1;
  }
  if (item.sellIn < 0) {
    if (item.name == "Aged Brie") {
      updateQuality(item, 1);
    } else {
      if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
        updateQuality(item, -1);
      } else {
        item.quality = 0;
      }
    }
  }
}
