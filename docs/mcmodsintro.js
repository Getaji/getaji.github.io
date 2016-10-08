
document.addEventListener("DOMContentLoaded", function() {
  window.jsrender.templates({
    modsRender: document.getElementById('modsTmpl').innerHTML
  });
  const modsRender = window.jsrender.render.modsRender;
  
  const mods = [
  {
    "desc": "MOD漁ってたら見つけた。アイテムドロップの挙動を現実的にするMOD。アイテムが転がったり、水に浮いたり、溶岩で消えるアイテムと消えないアイテムに分類されたり。",
    "name": "ItemPhysic",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2076336-itemphysic-1-3-3-updated-1-10-2-more-realtistic"
  },
  {
    "desc": "シングルプレイで街を発展させるMOD。放棄された都市を発見し、鉱業、林業、農業などの様々な方向から再生させていく。経済要素もある。",
    "name": "Dooglamoo Cities Mod",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2740025-dooglamoo-cities-mod"
  },
  {
    "desc": "リアルな地形を生成するMOD。ブロック、Mob、バイオームは追加していない。",
    "name": "Realistic Terrain Generation (RTG)",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2524489-realistic-terrain-generation-rtg-realistic-biomes"
  },
  {
    "desc": "自由にマントを設定できるMOD。それだけ。余談だけどマントってポルトガル語らしいね。ケープは正確には丈が短くて首から胸元を覆うやつ。",
    "name": "Advanced Capes mod",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2300380-1-7-10-advanced-capes-mod-205000-downloads"
  },
  {
    "desc": "牧場物語インスパイアMOD。作物や家畜、季節の概念、街の構築、NPCとの関係、売買、無限鉱山、料理要素を追加する。",
    "name": "Harvest Festival ~ A Harvest Moon mod ~",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2743756-harvest-festival-a-harvest-moon-mod-cooking"
  },
  {
    "desc": "農業、畜産、新Mobとドロップ、エンチャント、修理、醸造(ポーション)、新ブロック、アイテム、レシピ、その他広く浅く要素を追加するMOD。",
    "name": "Improving Minecraft",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1294646-improving-minecraft-v1-12-1"
  },
  {
    "desc": "沢山の素材とそれを材料とするツール類、それに伴う鋳造システムを追加するMOD。日本語情報が少ない……",
    "name": "Tinkers' Construct 2",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2218638-tinkers-construct-2"
  },
  {
    "desc": "ドアの開閉にアニメーションを付け、ガラスや鉄格子、カーテン、ハッチ、フォースフィールドなど、バニラアイテムを素材とした多種多様なドアを追加するMOD。障子もあるよ。",
    "name": "MalisisDoors",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2076338-malisisdoors-1-10-2-5-1-1-01-10-2016"
  },
  {
    "desc": "グレートソード、双剣、バトルアックスなどの武器を追加するMOD。それぞれ独自のモデルが設定されている。",
    "name": "Kaishi's Weapon Pack",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2712536-kaishis-weapon-pack-v1-2-katanas-spears-claws-and"
  },
  {
    "desc": "150種類以上の構造物を追加するMOD。",
    "name": "Recurrent Complex",
    "url": "https://minecraft.curseforge.com/projects/recurrent-complex"
  },
  {
    "desc": "村人のﾌｩﾝから脱却、より人間的な村人にするMOD。村人はそれぞれ名前を持つ。村人と関係を深め、結婚し、子供を持つことができる。",
    "name": "Minecraft Comes Alive",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1280154-minecraft-comes-alive-v5-2-3-mc-1-10-2-1-9-4-1-9-1"
  },
  {
    "desc": "様々な素材の看板を追加するMOD。文字入力もカスタマイズされている。",
    "name": "MoarSigns",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1295071-moarsigns-4-0-1-4-1-10-2-3-3-1-3-1-9-4"
  },
  {
    "desc": "村人に手紙を出して招待し、村を作ることができるMOD。ブロック破壊時などに出るコインで交易をすることもできる。村人はデカ鼻生物ではなく色々なスキンのプレイヤーモデル。",
    "name": "Village Box",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2639366-village-box-build-your-own-village-updated-8-15"
  },
  {
    "desc": "ブロック状の生物を追加するMOD。花を使用してテイムする。レベルアップさせると戦闘や農林業、採掘など様々なことをさせることができる。かわいい。",
    "name": "Blocklings",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2125932-blocklings-4-0-0-available-trainable-block-pets"
  },
  {
    "desc": "コロニーを作るMOD。建物を配置し、労働者を動かす。",
    "name": "MineColonies",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2736767-minecolonies-colony-simulator-now-in-playable"
  },
  {
    "desc": "ノミを追加、ブロックに彫刻を施して装飾をすることができるMOD。",
    "name": "Chisels & Bits",
    "url": "https://minecraft.curseforge.com/projects/chisels-bits"
  },
  {
    "desc": "ドローンを作成できるMOD。",
    "name": "CustomDrones",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2705301-customdrones-v1-5-0-drone-tower-gun-upgrades-no"
  },
  {
    "desc": "クエストを作るMOD。様々なクエストを作ることが出来、クエストツリーの設定やパーティ管理なども可能。",
    "name": "Better Questing",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2577119-better-questing-a-new-and-improved-questing-mod"
  },
  {
    "desc": "バニラのUX(ユーザー体験)を改善するために新エンチャント、アイテム、レシピ、作業台の変更など様々な要素を追加・変更するMOD。",
    "name": "Craft++",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2342595-1-10-2-1-9-1-8-25-000-downloads-craft-a-simple"
  },
  {
    "desc": "体温や渇きなどの現実的な要素により難易度を上昇させるMOD。体温はバイオームや季節などに影響される。",
    "name": "Tough As Nails",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2696397-tough-as-nails-difficulty-through-realism-seasons"
  },
  {
    "desc": "ミニマップMODによくあるウェイポイントをクラフトして設置できるMOD。専用の杖を作ってテレポートすることもできる。",
    "name": "Craftable Waypoints",
    "url": "http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/2540692-craftable-waypoints-forge-1-10-2-1-8"
  },
  {
    "desc": "接続されたインベントリからアイテムを抽出/転送するブロックを追加する。追加されるストレージユニットは容量が三段階あり、鉱石辞書によって同類の鉱石などを1つに格納できる。他に液体やRFエネルギー用もある。",
    "name": "Router Reborn",
    "url": "https://mods.curse.com/mc-mods/minecraft/223808-router-reborn"
  },
  {
    "desc": "モジュール形式で拡張できる机を追加するMOD。アイテムや本、流体、作業台、かまど、ゴミ捨てを組み込むことができる。ToDoリストを作成して置くこともできる。机のモデルがシックでお洒落。",
    "name": "Bagelsmore: The Return",
    "url": "https://mods.curse.com/mc-mods/minecraft/248538-bagelsmore-the-return"
  },
  {
    "desc": "二重半ブロックの片方だけを破壊できるようにするMOD。幾つかのMODで追加されるハーフブロックにも対応している。",
    "name": "KleeSlabs",
    "url": "https://mods.curse.com/mc-mods/minecraft/241895-kleeslabs"
  },
  {
    "desc": "カカシ(設置式ダミー人形)を追加するMOD。攻撃してダメージを表示させたり、防具を装備させて受けるダメージを減少させたりできる。顔がスライムになっていて叩く度にプルプルする。ダメージ量に応じて大きく震える。",
    "name": "MmmMmmMmmMmm",
    "url": "https://mods.curse.com/mc-mods/minecraft/225738-mmmmmmmmmmmm"
  },
  {
    "desc": "追加されるフレームにクラフトレシピを登録、プレイヤーインベントリもしくは貼り付けられたチェストから素材を消費して簡単にアイテムをクラフトできるようにするMOD。",
    "name": "Super Crafting Frame",
    "url": "https://mods.curse.com/mc-mods/minecraft/super-crafting-frame"
  },
  {
    "desc": "作業台を改善するMOD。機能はグリッドの回転、配置アイテム数の調整、インベントリに戻す、アイテム一括移動、3x3の圧縮形式に配置、右クリックでフルスタック作成。他の20個以上のMODの作業台にも対応。",
    "name": "Crafting Tweaks",
    "url": "https://mods.curse.com/mc-mods/minecraft/233071-crafting-tweaks"
  },
  {
    "desc": "マウスホイールを使ってインベントリのアイテムを操作するMOD。キーの組み合わせで一度に一つずつ/スタック/同じ/全ての/ドラッグした/一つを残してアイテムを移動させたりできる。動画を見るとわかりやすい。",
    "name": "Item Scroller",
    "url": "https://mods.curse.com/mc-mods/minecraft/242064-item-scroller"
  },
  {
    "name": "Sleeping Bag",
    "url": "https://mods.curse.com/mc-mods/minecraft/244584-sleeping-bag",
    "desc": "寝袋を追加するMOD。どこでも寝られるがスポーンポイントは設定されない。"
  }
];
  mods.forEach(function(mod){
    let surl = mod.url;
    if (surl.length > 70)
      surl=mod.url.substring(0, 67) + "...";
    mod.surl = surl;
  });
  
  document.getElementById('mods').innerHTML = modsRender(mods);
});