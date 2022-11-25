// Примитивный кеширующий сервис

export default class CacheService {
  constructor(minutes = 5) {
    this.maxAge = 1000 * 60 * minutes
  }
  set(key, value) {
    this[key] = {
      value,
      date: Date.now()
    }
  }
  delete(key) {
    delete this[key];
  }
  get(key) {
    if (this.has(key)) {
      return this[key].value
    }
    return undefined;
  }
  has(key) {
    if (key in this) {
      return Date.now() - this[key].date < this.maxAge
    }
    return false;
  }
}

export class CacheFacadeService extends CacheService {
  async request(key, req) {
    const cached = this.get(key);
    if (cached) {
      return Promise.resolve(cached)
    } else {
      const value = await req()
      this.set(key, value);
      return value;
    }
  }
}