let RootStore: any;

export function setParentStore(store: any) {
  RootStore = store;
}
export function getParentStore() {
  return RootStore;
}
