import { database, app, apps, initializeApp } from 'firebase';
import { Item, User } from './types';
import * as moment from 'moment';
import * as lru from 'lru-cache';
import * as f from 'isomorphic-unfetch';

export class HN {
  private static domain = 'https://hacker-news.firebaseio.com';
  private static version = 'v0';
  private static app: app.App;

  private static ref: database.Reference;

  private static cache = lru<number, Item>({
    max: 10000,
    stale: true,
    maxAge: 1 * 60 * 60 * 1000,
  });

  static async initialize() {
    if (apps.length === 0) {
      HN.app = initializeApp({
        databaseURL: HN.domain,
      });
    }

    if (!HN.ref) {
      HN.ref = await database().ref(`/${HN.version}`);
    }

  }

  static async getItems(pathname: string, page: number = 1): Promise<Item[]> {
    const limit = 30;
    const offset = (page - 1) * limit;

    const itemsSnapshot = await HN.ref.child(`${pathname}stories`)
      .limitToFirst(limit * page)
      .once('value');

    const itemIds: number[] = itemsSnapshot.val().slice(offset, offset + limit);

    const promises: Promise<Item>[] = (itemIds || []).map(HN.getItem);

    const items = await Promise.all(promises);

    return (items
      .map((item, i) => HN.processItem(item, i, offset))
      .filter(item => item !== null)
    );
  }

  private static processItem(item: Item, index: number = 0, offset = 0): Item {
    if (!item) return null;

    if (item.url) {
      const parts = item.url.split('/');
      if (parts.length > 1) {
        item.domain = parts[2];
      }
    }
    if (item.time) {
      item.moment = moment.unix(item.time).from(moment(new Date()));
    }
    item.index = offset + index + 1;
    return item;
  }

  static async getItem(id: number): Promise<Item> {
    if (HN.cache.has(id)) return HN.cache.get(id);

    const itemSnapshot = await HN.ref.child(`item/${id}`).once('value');
    const item = HN.processItem(itemSnapshot.val());
    HN.cache.set(id, item);

    return item;
  }

  static async getExpandedItem(
    id: number, level: number = 0): Promise<Item> {

    const item = await HN.getItem(id);

    item.level = level;

    item.subItems = await Promise.all(
      (item.kids || []).map(kidId => HN.getExpandedItem(kidId, level + 1))
    );

    return item;
  }

  static async getUser(id: string): Promise<User> {
    const snapshot = await HN.ref.child(`user/${id}`).once('value');
    return snapshot.val();
  }

  static async getFastHomePage(): Promise<Item[]> {
    try {
      const result = await f(`https://hnpwa.com/api/v0/news.json`);

      const items = await result.json();

      return items.map((item, i) => {
        item.index = i + 1;
        item.moment = item.time_ago;
        return item;
      });
    } catch (e) {
      return HN.getItems('top');
    }
  }
}
