Vue.component('myc-box', {
  props: {
    iconSize: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
    };
  },
  computed: {
    className() {
      return [
        'm-' + this.iconSize
      ]
    }
  },
  methods: {
    hasSlot(name) {
      return !!this.$slots[name]
    }
  },
  template: `
    <div class="c-box">
      <div
        v-if="hasSlot('icon')"
        class="c-box__icon"
        :class="className"
      >
        <slot name="icon"></slot>
      </div>
      <div v-if="hasSlot('title')" class="c-box__title">
        <slot name="title"></slot>
      </div>
      <div v-if="hasSlot('subtitle')" class="c-box__subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
  `
})

new Vue({
  el: '#app',
  data: {
  },
  methods: {
  }
})