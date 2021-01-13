export default {
  // This app is designed for mobile phone screens. That is, width that is shorter
  // than height.
  // So for laptops/monitors which have larger width, we squish it's aspect ratio down to
  // this value here. This keeps the app layout similar to mobile screens.
  maxAspectRatio: 3 / 4,
  serverUrl: "http://192.168.43.58:4000",
  sortingOrder: {
    header: 5,
    backdrop: 10,
    sidebar: 20,
    toast: 40,
  },
};
