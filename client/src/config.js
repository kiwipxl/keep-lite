import process from "process";

const exports = {
  // This app is designed for mobile phone screens. That is, width that is shorter
  // than height.
  // So for laptops/monitors which have larger width, we squish it's aspect ratio down to
  // this value here. This keeps the app layout similar to mobile screens.
  maxAspectRatio: 16 / 9,
  serverUrl: `http://localhost:4000`,
  sortingOrder: {
    header: 5,
    backdrop: 10,
    sidebar: 20,
    toast: 40,
  },
};
export default exports;
