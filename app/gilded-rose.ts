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
  item.quality = Math.max(Math.min(item.quality + delta, 50), 0);
}

function updateOne(item: Item) {
  if (
    item.name != "Aged Brie" &&
    item.name != "Backstage passes to a TAFKAL80ETC concert"
  ) {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      updateQuality(item, -1);
    }
  } else {
    updateQuality(item, 1);
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn < 11) {
        updateQuality(item, 1);
      }
      if (item.sellIn < 6) {
        updateQuality(item, 1);
      }
    }
  }
  if (item.name != "Sulfuras, Hand of Ragnaros") {
    item.sellIn = item.sellIn - 1;
  }
  if (item.sellIn < 0) {
    if (item.name == "Aged Brie") {
      updateQuality(item, 1);
    } else {
      if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.name != "Sulfuras, Hand of Ragnaros") {
          updateQuality(item, -1);
        }
      } else {
        item.quality = 0;
      }
    }
  }
}
