(async () => {
  const store = new Store();
  store.init();
  console.log(store);
  EventListenerAttacher.init();
  App.init();
})()
