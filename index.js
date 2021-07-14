var app = new Vue({
  el: '#app',
  data() {
    return {
      inputs: [''],
    };
  },
  computed: {
    formatedInputs() {
      const singleObjects = this.inputs.map(this.parseStringsToJson);

      const mergedObjects = this.mergeAllObjectsOfAnArray(singleObjects);

      return mergedObjects;
    },
  },
  methods: {
    addInput() {
      this.inputs.push('');

      this.focusLastInput();
    },

    stringToObj(string) {
      const reversedString = string.split('.').reverse().join('.');
      const properties = reversedString.split('.');

      const result = properties.reduce((acc, curr) => {
        const isArray = curr.endsWith('[*]');
        if (curr.length) {
          acc = {
            [isArray ? curr.replace('[*]', '') : curr]: isArray ? [acc] : acc,
          };
        }

        return acc;
      }, {});
      return result;
    },

    generateKey(index) {
      return Symbol(index).toString();
    },

    mergeAllObjectsOfAnArray(array) {
      return array.reduce((acc, curr, index) => {
        acc = _.defaultsDeep(acc, curr);

        return acc;
      }, {});
    },

    parseStringsToJson(input) {
      return this.stringToObj(input);
    },

    focusLastInput() {
      const indexOfLastInput = 'input-' + (this.inputs.length - 1);

      setTimeout(() => {
        this.$refs[indexOfLastInput][0].focus();
      }, 1);
    },

    clearInputs() {
      this.inputs = [''];
    },

    removeInput(indexPassed) {
      this.inputs = this.inputs.filter((input, index) => index !== indexPassed);
    },
  },
});
