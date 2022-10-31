export const strict = false;

export const state = () => ({
  g_loader: false,
  firebase: null,

  cart: [],

  toasterError: ""
});

export const getters = {};

export const mutations = {
  G_LOADER(state, data) {
    state.g_loader = data;
  },
  ALERT(state, data) {
    state.alert = data;
    setTimeout(() => {
      state.alert.msg = "";
      state.alert.type = "dark";
      state.alert.icon = "";
      state.alert.color = "blue";
    }, 5000);
  },

  tConvert(state, time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  },

  LOAD_TOASTER(state, data) {
    console.log(data);
    if (!data) return;
    state.toasterError = data;
    setTimeout(() => {
      state.toasterError = "";
    }, 5000);
  }
};
