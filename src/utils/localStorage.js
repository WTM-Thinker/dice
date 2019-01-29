const storage = window.localStorage;



export default {
  setItem(name, data) {
    let _key = name;
    storage.setItem(_key, JSON.stringify(data));
  },
  getItem(name) {
    let _key = name;
    let value = storage.getItem(_key);
    return JSON.parse(value);
  },
  removeItem(name) {
    let _key = name;
    storage.removeItem(_key);
  }
}