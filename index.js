(async () => {
  const store = new Store();
  store.init();
  EventBinder.init();
  App.init();
})();
