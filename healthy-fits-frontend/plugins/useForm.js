export default ({ app }, inject) => {
  inject("useForm", (state) => {
    function resetForm() {
      Object.keys(state).forEach((key) => {
        state[key] = "";
      });
    }
    return {
      resetForm,
    };
  });
};
