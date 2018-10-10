module.exports.rule = {
  checkRule: function (pathname, arrays) {
    if (arrays) {
      for (i in arrays) {
        const value = arrays[i].url;
        const isChecked = arrays[i].checked;
        if (pathname == value && isChecked) {
          return true;
        }
      }
    }
    return false;
  },
}
