/*******************************************************************************
 * 汎用関数等のまとめ
 * - func Array#shuffleEx
 * - func randomRange
 * - func bindArgs
 * - func valueStr
 * - class Configuration
 * - func jQuery#checked
 ******************************************************************************/
/**
 * より良い実装のshuffle関数
 */
Array.prototype.shuffleEx = function(rnd) {
  var i, j, temp, arr = this.slice();
  i = arr.length;
  if (i === 0) {
    return arr;
  }
  while (--i) {
    j = Math.floor((rnd ? rnd.quick() : Math.random()) * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

/**
 * startからendまでインクリメントした整数値の配列をシャッフルし、
 * size分を先頭から切り出して返す関数。
 * @param {int} start 開始する数値
 * @param {int} end 終了する数値
 * @param {int} size 切り出す長さ
 * @param {seedrandom} rnd 渡された場合seedrandomオブジェクトとして使用する
 * @return {Array} 切り出した配列
 */
function randomRange(start, end, size, rnd) {
  if (size === undefined)
    size = end;
  const list = [...Array(end - start).keys()].shuffleEx(rnd);
  return list.slice(0, size);
}

/**
 * オブジェクトに値をバインドする。主にクラスのコンストラクタで用いる。
 * @param {object} instance バインド先のオブジェクト
 * @param {object} values バインドするキーと値の連想配列
 * @return {object} instance
 */
function bindArgs(instance, values) {
  for (const k in values) {
    instance[k] = values[k];
  }
  return instance;
}

/**
 * 引数vが文字列型の場合、二重引用符で括って返す。
 * @param {object} v 値
 * @return {object} 変換後の値
 */
function valueStr(v) {
    return typeof v === 'string' ? '"' + v + '"' : v;
}

/**
 * LocalStorageを使いやすくするためのラッパークラス。
 * idに結び付けられた値はJSONとして管理され、キーと値でデータを記録できる。
 */
class Configuration {
    /**
     * Configurationインスタンスを構築する。
     * @param {string} id LocalStorage参照に用いるID
     * @param {Function} jsonParser ロード時のJSON.parseに渡す関数
     * @param {object} initialData 初期データ
     */
    constructor(id, jsonParser, initialData) {
        this.id = id;
        this.jsonParser = jsonParser;
        const data = localStorage.getItem(id);
        if (data) {
            this.data = JSON.parse(data, jsonParser);
        } else {
            this.data = initialData ? initialData : {};
            localStorage.setItem(id, JSON.stringify(this.data));
        }
        this.log('Constructed configuration.');
    }
    /**
     * IDを付加してconsole.debugにログを出力する。
     * @param {string} msgs メッセージの可変長配列。展開されて渡される
     */
    log(...msgs) {
        console.debug('[cfg:' + this.id + ']', ...msgs);
    }
    /**
     * 値を取得する。
     * @param {string} key キー
     * @param {object} defaultValue 存在しなかった場合に返す値
     * @param {boolean} isSaveDefault デフォルト値を保存するか
     * @return {object} 値
     */
    get(key, defaultValue, isSaveDefault=false) {
        if (key in this.data) {
            return this.data[key];
        }
        if (isSaveDefault) {
            this.data[key] = defaultValue;
            this.save();
            this.log(`Writed new configuration: ${key} =`, valueStr(defaultValue));
        }
        return defaultValue;
    }
    /**
     * 値を格納する。
     * @param {string} key キー
     * @param {object} value 値
     * @param {boolean} isSave 格納後にLocalStorageに保存するか
     */
    put(key, value, isSave=false) {
        if (!isSave && this.data[key] === value) {
            this.log(`No changed configuration: ${key}=`, valueStr(value));
            return;
        }
        this.data[key] = value;
        if (isSave) {
            this.log(`Put configuration: ${key}=`, valueStr(value));
            this.save();
        } else {
            this.log(`Writed configuration: ${key}=`, valueStr(value));
        }
    }
    /**
     * JSONデータの文字列をセットする。上書きされるので注意。
     * @param {boolean} isSave セット後にLocalStorageに保存するか
     */
    setStrData(s, isSave=false) {
        this.data = JSON.parse(s, this.jsonParser);
        if (isSave) this.save();
    }
    /**
     * 値を削除する。
     * @param {string} key キー
     * @param {boolean} isSave 削除後にLocalStorageに保存するか
     */
    remove(key, isSave=true) {
        delete this.data[key];
        this.log('Deleted configuration:', key);
        if (isSave) this.save();
    }
    /**
     * データをLocalStorageに保存する。
     */
    save() {
        localStorage.setItem(this.id, JSON.stringify(this.data));
        this.log('Saved configuration');
    }
    /**
     * LocalStorageからデータをリロードする。メモリ上のデータは上書きされる。
     */
    reload() {
        this.data = JSON.parse(localStorage.getItem(this.id), this.jsonParser);
        this.log('Reloaded configuration');
        return this;
    }
    /**
     * キーの配列を返す。
     * @return {Array}
     */
    getKeys() {
        return Object.keys(this.data);
    }
    /**
     * 値の配列を返す。
     * @return {Array}
     */
    getValues() {
        return Object.keys(this.data).map(k => this.data[k]);
    }
}
if ($) {
  $.fn.extend({
    /**
     * 引数が省略された場合、要素がチェック状態かを返す。
     * 引数が渡された場合、その値をセットする。
     * @param {boolean} checked チェック状態
     * @return {boolean|jQuery} 省略時はチェック状態、指定時はjQueryオブジェクト
     */
    checked: function(checked) {
      if (checked === undefined)
        return $(this).prop('checked') ? true : false;
      return $(this).prop('checked', checked);
    }
  });
}