Vue.component('vc-progressbar', {
  props: {
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      nowPercentage: 0,
      onePct: this.max / 100,
    };
  },
  watch: {
    value(newValue, oldValue) {
      this.nowPercentage = this.calcPercentage();
    }
  },
  computed: {
  },
  mounted() {
    window.pgb = this;
    this.nowPercentage = this.calcPercentage();
  },
  methods: {
    calcPercentage() {
      return this.value / this.onePct;
    },
  },
  template: `
    <div class="vcProgressBar">
      <div class="vcProgressBarFg"
           :style="{ width: nowPercentage + '%' }"></div>
      <div class="vcProgressBarBg"></div>
    </div>
  `
});