// #var timerNameList
const timerNameList = [
  '日常資源開発', '覚醒実証研究',
  '中級木材輸送護衛', '上級木材輸送護衛',
  '中級鉄鋼輸送護衛', '上級鉄鋼輸送護衛',
  '小型油田開発', '大型油田開発',
  '中型船団護衛', '大型船団護衛',
  '艦隊輸送演習', '外洋練習航海', '中距離練習航海', '海域浮標保守作業',
  '科学研究',
  '戦術教室'
];

// #var soundeffect
const soundeffect = {
  source: (() => {
    const audio = document.getElementById('soundeffect');
    audio.volume = 0.2;
    return audio;
  })(),
  play() { soundeffect.source.play(); }
};

// #func padZero(n): String
function padZero(n) {
  return String(n).padStart(2, '0');
}

// #func msToTimeString(ms: Number): String
function msToTimeString(ms) {
  const hours = Math.floor(ms / 1000 / 60 / 60);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 1000 / 60);
  ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);
  //ms -= seconds * 1000;
  return hours + ':' + padZero(minutes) + ':' + padZero(seconds);
}

// #vue-c group-timer
Vue.component('group-timer', {
  // #props
  props: {
    timer: {
      type: null,
      required: true
    }
  },
  // #data
  data() {
    return { ms: this.timer.currentMs };
  },
  // #computed
  computed: {
    // #lengthString
    lengthString() {
      return this.formatTime(this.ms);
    },
    // #toggleText
    togglerText() {
      return this.timer.running ? '停止' : '開始';
    },
    // #timerState
    timerState() {
      if (!this.timer.started) {
        return 'standby';
      }
      if (this.timer.running) {
        return 'running';
      }
      return 'finished';
    }
  },
  // #mounted
  mounted() {
    this.timer.callback = () => {
      this.stop();
    };
    if (this.timer.running) {
      this.start();
    }
    this.timer.onstart = () => {
      this.start();
    };
    this.$emit('mounted');
  },
  // #methods
  methods: {
    // #formatTime(ms)
    formatTime(ms) {
      if (this.timer.running) {
        ms = this.timer.length - ms;
      }
      return msToTimeString(ms);
      /* + '.' + ms*/
    },
    // #onClickToggler
    onClickToggler() {
      this.timer.running ? this.stop() : this.start();
    },
    // #start
    start() {
      if (this.tickID) return;
      this.timer.start();
      this.tickID = setInterval(() => {
        this.ms = this.timer.currentMs;
      }, 100);
    },
    // #stop
    stop() {
      if (!this.tickID) return;
      this.timer.stop();
      clearInterval(this.tickID);
      this.tickID = null;
    }
  },
  // #template
  template: `
    <div class="groupTimer" :class="'timer-' + timerState">
      <div class="timerItems">
        <div class="timerName">{{ timer.name }}</div>
        <div class="timerLength">{{ lengthString }}</div>
        <div class="timerToggler">
          <button @click="onClickToggler">{{ togglerText }}</button>
        </div>
        <div class="timerRemover">
          <button @click="$emit('remove')">削除</button>
        </div>
      </div>
      <vc-progressbar
        :value="ms"
        :max="timer.length"
      />
    </div>
  `
});

// #vue-c timer-group
Vue.component('timer-group', {
  // #data
  data() {
    return {
      formLabel: '',
      formHours: 0,
      formMinutes: 0,
      formSeconds: 0,
      isStartOnAdd: true
    };
  },
  // #props
  props: {
    group: {
      type: null,
      required: true
    }
  },
  // #computed
  computed: {
    // #validateConfirm
    validateConfirm() {
      return this.formTimeToMs() === 0;
    }
  },
  // #methods
  methods: {
    // #formTimeToMs
    formTimeToMs() {
      return this.formHours * 3600000 + this.formMinutes * 60000 + this.formSeconds * 1000;
    },
    // #onConfirmForm
    onConfirmForm() {
      const timer = this.group.makeTimer(this.formLabel, this.formTimeToMs());
      this.formLabel = '';
      this.formHours = 0;
      this.formMinutes = 0;
      this.formSeconds = 0;
    },
    // #onRemoveTimer
    onRemoveTimer(i, timer) {
      if (confirm('タイマー「' + timer.name + '」を削除しますか？')) {
        timer.stop();
        this.group.timers.splice(i, 1);
      }
    },
    // #onMountedTimer
    onMountedTimer(timer) {
      if (this.isStartOnAdd) {
        timer.start();
      }
    },
    // #onWheel
    onWheel(target, ev) {
      if (ev.deltaY > 0) {
        this[target] -= 1;
      } else if (ev.deltaY < 0) {
        this[target] += 1;
      }
    }
  },
  // #template
  template: `
    <div class="timerGroup">
      <div class="timerGroupName">{{ group.name }}</div>
      <div class="timers">
        <group-timer
          v-for="(timer, i) in group.timers"
          :key="timer.id"
          :timer="timer"
          @remove="onRemoveTimer(i, timer)"
          @mounted="onMountedTimer(timer)"
        />
      </div>
      <div class="timerGroupForm">
        <input class="label" placeholder="タイマー名"
               autocomplete="on" list="timerNameList"
               v-model="formLabel">
        <input class="hours" placeholder="時" type="number"
               v-model.number="formHours"
               @wheel="onWheel('formHours', $event)">
        <input class="minutes" placeholder="分" type="number"
               v-model.number="formMinutes"
               @wheel="onWheel('formMinutes', $event)">
        <input class="seconds" placeholder="秒" type="number"
               v-model.number="formSeconds"
               @wheel="onWheel('formSeconds', $event)">
        <button class="add"
                :disabled="validateConfirm"
                @click="onConfirmForm">追加</button>
        <label>
          <input type="checkbox" class="startOnAdd" v-model="isStartOnAdd">
          即時開始
        </label>
      </div>
    </div>
  `
});

// #class Timer
/** タイマークラス */
class Timer {
  /**
   * タイマーを作成します。
   * @param {string} name - タイマーの名前
   * @param {number} length - タイマーの長さ(ミリ秒)
   *   指定しない場合、start関数に長さを渡す必要があります
   * @param {function} callback - タイマー終了時のコールバック関数
   * @param {Object} id - 識別用のID
   */
  constructor(name, length, callback, id) {
    this.name = name;
    this.length = length === undefined || length === null ? 0 : length;
    this.__startms = 0;
    this.__timeoutID = null;
    this.id = id;
    // handlers
    this.callback = callback || null;
    this.onstart = null;
    // flag
    this.started = false;
    this.running = false;
    this.finished = false;
  }
  // #func start(length)
  start(length) {
    if (this.__timeoutID !== null) {
      return;
    }
    if (length === undefined || length === null) {
      length = this.length;
    } else {
      this.length = length;
    }
    this.__startms = Date.now();
    this.started = true;
    this.running = true;
    this.__timeoutID = setTimeout(() => {
      this.finishTimer();
    }, length);
    if (this.onstart) { this.onstart(this); }
  }
  finishTimer() {
    this.callback(this);
    this.finished = true;
    this.running = false;
    if (app.isPlaySoundUponCompletion) {
      soundeffect.play();
    }
    if (app.isNotifyUponCompletion) {
      const notification = new Notification('タイマー「' + this.name + '」が完了しました');
      notification.onclick = () => notification.close();
    }
  }
  // #func stop()
  stop() {
    if (this.__timeoutID !== null) {
      clearTimeout(this.__timeoutID);
      this.running = false;
      this.__timeoutID = null;
    }
  }
  // #prop currentMs
  get currentMs() {
    if (this.started) {
      return Date.now() - this.__startms;
    }
    /*if (this.finished) {
      return this.length;
    }
    return 0;*/
    return this.length;
  }
}

// #class TimerGroup
class TimerGroup {
  constructor(name, timers) {
    this.name = name;
    this.timers = timers ? timers : [];
    this.counter = timers ? timers.length : 0;
    this.idnum = 0;
  }
  // #func makeTimer(name, length, cb)
  makeTimer(name, length, callback) {
    if (!name) {
      name = 'タイマー' + (this.counter++ + 1);
    }
    const timer = new Timer(name, length, callback, this.idnum++);
    this.timers.push(timer);
    return timer;
  }
}

function makeSimpleTimerGroup(name) {
  const group = new TimerGroup(name);
  return group;
}

// タイマー表示の更新は一括でやったほうがいいのではというやつ
class TimerTicker {
  constructor() {
    this.running = false;
  }
}

// #var app
const app = new Vue({
  el: '#app',
  data: {
    timerGroups: [
      makeSimpleTimerGroup('Default Timers'),
    ],
    timerNameList,
    isNotifyUponCompletion: true,
    isPlaySoundUponCompletion: true,
    version: '0.1.0'
  }
});

if (Notification.permission ==='default') {
  Notification.requestPermission();
}