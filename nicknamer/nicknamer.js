(function() {
  const parts = NICKNAMER_PARTS;
  const parts1 = parts[0];
  const parts2 = parts[1];
  const parts1Len = parts1.length;
  const parts2Len = parts2.length;
  const patterns = ["12", "2の2", "112", "12の2"];
  const patternsLen = patterns.length;

  const INITIAL_NAMES_COUNT = 30;

  function randInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min
  }

  new Vue({
    el: '#app',
    data() {
      return {
        nicknames: this.generateNicknames(INITIAL_NAMES_COUNT),
        parts1,
        parts2,
        namesCount: INITIAL_NAMES_COUNT,
        selectedNames: [],
        savedNames: [],
        activeTabName: 'maker',
      }
    },
    computed: {
      validateClickGenerate() {
        return Number.isInteger(this.namesCount) && this.namesCount > 0;
      }
    },
    methods: {
      generateNickname() {
        const pattern = patterns[randInt(0, patternsLen - 1)];
        return pattern.replace(/[12]/g, function(n) {
          if (n === "1") {
            return parts1[randInt(0, parts1Len - 1)];
          } else {
            return parts2[randInt(0, parts2Len - 1)];
          }
        });
      },
      generateNicknames(count) {
        if (count < 1) return [];
        return new Array(count).fill(0).map(this.generateNickname);
      },
      onClickGenerate() {
        this.nicknames = this.generateNicknames(this.namesCount);
      },
      isSelectedName(i) {
        return this.selectedNames.includes(i);
      },
      onClickName(i) {
        const pos = this.selectedNames.indexOf(i);
        if (pos > -1) {
          this.selectedNames.splice(pos, 1);
        } else {
          this.selectedNames.push(i);
        }
      },
      saveSelectedName() {
        this.savedNames.push(...this.nicknames);
        this.selectedNames = [];
      }
    }
  });
})();
