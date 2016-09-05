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
  function dotpict(name, id, size, type, tooltip) {
    if (!type) type = 'png';
    if (!tooltip) tooltip = '';
    var d = { name, id, size, url: 'icons/'+id+'.'+type, tooltip };
    dotpicts.push(d);
    if (!(size in dotpictsBySize)) {
      dotpictsBySize[size] = [];
    }
    dotpictsBySize[size].push(d);
  }

  dotpict('目', 'eye', 16);
  dotpict('メダル', 'medal', 16);
  dotpict('炎の宝石', 'fire_gem', 16);
  dotpict('緑の玉', 'green_ball', 16);
  dotpict('折り畳みナイフ', 'knife', 16);
  dotpict('氷の剣', 'ice_sword', 16);
  dotpict('指輪', 'ring', 16);
  dotpict('本', 'book', 24);
  dotpict('ライトスタンド', 'light_stand', 24);
  dotpict('剣', 'sword', 24);
  dotpict('斧', 'axe', 32);
  dotpict('金槌', 'hammer', 32);
  dotpict('ブーメラン', 'boomerang', 32);
  dotpict('爪', 'claw', 32);

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
