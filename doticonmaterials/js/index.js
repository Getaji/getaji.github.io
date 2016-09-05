$(function() {
  var DotPict = function(name, id, tags, size) {
    this.name = name;
    this.id = id;
    this.tags = tags;
    this.size = size;
    this.url = 'icons/' + id + '.png'
  };
  
  var dotpicts = [];
  var dotpictsBySize = {};
  function dotpict(name, id, size, tooltip, type) {
    if (!tooltip) tooltip = '';
    if (!type) type = 'png';
    var d = { name, id, size, url: 'icons/'+id+'.'+type, tooltip };
    dotpicts.push(d);
    if (!(size in dotpictsBySize)) {
      dotpictsBySize[size] = [];
    }
    dotpictsBySize[size].push(d);
  }

  dotpict('目', 'eye', 16, '普通の目');
  dotpict('メダル', 'medal', 16, 'メダル部分が安っぽい。多分プラスチック');
  dotpict('炎の宝石', 'fire_gem', 16, '宝石……？');
  dotpict('緑の玉', 'green_ball', 16, '某アレ(伝わらなくていい)用に用意した謎の玉');
  dotpict('折り畳みナイフ', 'knife', 16, 'ちょっと気に入っている');
  dotpict('氷の剣', 'ice_sword', 16, 'ただの青い剣');
  dotpict('指輪', 'ring', 16, '形状が微妙');
  dotpict('本', 'book', 24, '雑');
  dotpict('ライトスタンド', 'light_stand', 24, '机の上にある');
  dotpict('剣', 'sword', 24, '習作');
  dotpict('小瓶', 'small_bottle', 24, 'モデルは無印良品のローズマリーのエッセンシャルオイル', 'gif');
  dotpict('斧', 'axe', 32, '貴方が落としたのはこの素材ですか？');
  dotpict('金槌', 'hammer', 32, '武器っぽい');
  dotpict('ブーメラン', 'boomerang', 32, '物に当たっても帰ってくるゲームのブーメラン');
  dotpict('爪', 'claw', 32, 'ドラクエに出てきそうなアレ');

  var dotpictsC = $('#dotpictsContainer');
  var dotpictsTemplate = $('#dotpictsTemplate');
  for (const k in dotpictsBySize) {
    dotpictsC.append(dotpictsTemplate.render({size:k,picts:dotpictsBySize[k]}));
    const size = Number.parseInt(k);
    $('#dotpicts-x'+k+' .resize-x1').on('click', function(e) {
      $('#dotpicts-x'+k+' img').width(size);
    });
    $('#dotpicts-x'+k+' .resize-x2').on('click', function(e) {
      $('#dotpicts-x'+k+' img').width(size * 2);
    });
    $('#dotpicts-x'+k+' .resize-x4').on('click', function(e) {
      $('#dotpicts-x'+k+' img').width(size * 4);
    });
  }

  $('#submit').onclick = function() {
    var value = $('#query').value;
    alert(value);
  }
});
