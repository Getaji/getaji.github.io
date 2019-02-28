$(function() {
  'use strict';  
  
  // 音声
  //const audioPaper = loadAudioFromURL('http://maoudamashii.jokersounds.com/music/se/wav/se_maoudamashii_se_paper01.wav');

  // 乱数
  const rnd = new Math.seedrandom(Date.now());
  function randInt(max, min) {
    return Math.floor( Math.quick() * (max - min + 1) ) + min;
  }
  function parseTrumpNum(num) {
    if (num === 11) return 'J';
    if (num === 12) return 'Q';
    if (num === 13) return 'K';
    return num;
  }
  // トランプを文字列に変換
  function toString(trump) {
    let n = parseTrumpNum(trump.i);
    return trump.mark + n;
  }
  // トランプ構造を比較
  function trumpSorter(t1, t2) {
    if (t1.i === t2.i) return t1.mark.localeCompare(t2.mark);
    return t1.i - t2.i;
  }
  
  const marks = ['♥', '♦', '♠', '♣'];
  class PokerGame {
    constructor() {
      this.trumps = [];
      for (let i = 0; i < 12; i++) {
        for (let mi = 0; mi < 4; mi++) {
          this.trumps.push({ mark: marks[mi], i: i + 1 });
        }
      }
      this.deck = [];
      this.hands = [];
      this.state = 'idle';
      this.swaps = [false, false, false, false, false];
    }
    start() {
      this.deck = this.trumps.shuffleEx(rnd);
      this.hands = this.deck.slice(0, 5);
      this.hands.sort(trumpSorter);
      return this;
    }
    checkRank() {
      const handsN = this.hands.map(c => c.i).sort((a, b) => a - b);
      const nsame = getSameCards(handsN);
      for (const rank of ranks) {
        const result = rank.test(this.hands, handsN, nsame);
        if (result.established) {
          result.rank = rank;
          this.result = result;
          return result;
        }
      }
      this.result = { established: false, cards: [], mag: -1 };
      return this.result;
    }
    swap() {
      let removes = 0;
      for (let i = 0; i < 5; i++) {
        if (this.swaps[i]) {
          const ci = i - removes++;
          // Remove
          this.hands.splice(ci, 1);
          // Append
          const card = this.deck[i + 5];
          this.hands.push(card);
          this.swaps[i] = false;
        }
      }
      this.hands.sort(trumpSorter);
    }
  }
  const trumps = new PokerGame().trumps;
  
  const game = new PokerGame();
  
  let coin = 1000;
  
  // 手札のカードを番号別に数える
  function getSameCards(cardsN) {
    const sc = {};
    for (const card of cardsN) {
      if (sc[card] === undefined)
        sc[card] = 1;
      else
        sc[card]++;
    }
    return sc;
  }

  // ポーカーの役
  const ranks = [
  ];
  function addRank(name, test) {
    ranks.push({name, test})
  }
  function rankStraightFlash(hands, handsN, samesN) {
    let prev = handsN[0];
    const mark = hands[0].mark;
    for (let i = 1; i < 5; i++) {
      if (prev.i === 0 || hands[i].i === 0 ||
          handsN[i] - 1 !== prev || hands[i].mark !== mark) {
        return { established: false };
      }
      prev = handsN[i];
    }
    return { established: true, cards: hands, mag: 50 };
  }
  addRank('ロイヤルストレートフラッシュ', function(hands, handsN, samesN) {
    const result = rankStraightFlash(hands, handsN, samesN);
    if (result.established)
      if (handsN[4] < 11) {
        result.mag = 100;
        return result;
      }
    return { established: false };
  });
  addRank('ストレートフラッシュ', rankStraightFlash);
  addRank('フォーカード', function(hands, handsN, samesN) {
    if (Object.keys(samesN).length === 2) {
      const n = samesN[handsN[0]];
      if (n === 1 || n === 4) {
        return {
          established: true,
          cards: n === 1 ? hands.slice(1, 5) : hands.slice(0, 4),
          mag: 25
        };
      }
    }
    return { established: false };
  });
  addRank('フルハウス', function(hands, handsN, samesN) {
    if (Object.keys(samesN).length === 2) {
      const n = samesN[handsN[0]];
      if (n === 3 || n === 2) {
        return { established: true, cards: hands, mag: 15 };
      }
    }
    return { established: false };
  });
  addRank('フラッシュ', function(hands, handsN, samesN) {
    const mark = hands[0].mark;
    for (let i = 1; i < 5; i++) {
      if (hands[i].mark !== mark) {
        return { established: false };
      }
    }
    return { established: true, cards: hands, mag: 12 };
  });
  addRank('ストレート', function(hands, handsN, samesN) {
    let prev = handsN[0];
    for (let i = 1; i < 5; i++) {
      if (handsN[i] - 1 !== prev) {
        return { established: false };
      }
      prev = handsN[i];
    }
    return { established: true, cards: hands, mag: 8 };
  });
  addRank('スリーカード', function(hands, handsN, samesN) {
    for (const i in samesN) {
      if (samesN[i] === 3) {
        const inti = Number.parseInt(i);
        return {
          established: true,
          cards: hands.filter(c => c.i === inti),
          mag: 4
        };
      }
    }
    return { established: false };
  });
  addRank('ツーペア', function(hands, handsN, samesN) {
    if (Object.keys(samesN).length === 3) {
      return {
        established: true,
        cards: hands.filter(c => samesN[c.i] === 2),
        mag: 2,
      };
    }
    return { established: false };
  });
  addRank('ワンペア', function(hands, handsN, samesN) {
    if (Object.keys(samesN).length === 4) {
      return {
        established: true,
        cards: hands.filter(c => samesN[c.i] === 2),
        mag: 1
      };
    }
    return { established: false };
  });

  // 要素
  const eCards = $('#cards');
  const eSwap = $('#swap');
  const eSwapAll = $('#swapAll');
  const eResult = $('#result');
  const eCoin = $('#coin');
  const eBet = $('#bet');
  const eBetPlus100 = $('#bet-plus100');
  const eBetMinus100 = $('#bet-minus100');
  const eLogs = $('#logs');

  // カード構造から要素を構築する
  function newCardElement(card, i, swappable) {
    const eCard = $('<div class="card card-large card--' + toString(card) + '"/>');
    eCard.addClass('card-mark-' + card.mark);
    const cardStr = '<div class="card-view-text"><span class="card-view-num">' + parseTrumpNum(card.i) + '</span><span class="card-view-mark card-view-mark-' + card.mark + '">' + card.mark + '</span></div>';
    const cardMark = '<span class="card-view-mark card-view-mark-center card-view-mark-' + card.mark + '">' + card.mark + '</span>';
    const eCardView = $('<div class="card-view">' + cardStr + cardStr + cardMark + '</div>').appendTo(eCard);
    if (swappable) {
    let swap = false;
    eCard.on('click', function() {
      if (swap)
        eCard.removeClass('card-swapping');
      else
        eCard.addClass('card-swapping');
      swap = !swap;
      game.swaps[i] = swap;
    });
    }
    return eCard;
  }
  function newCardElementSimple(card, i) {
    const eCard = $('<div class="card card--' + toString(card) + '"/>');
    eCard.addClass('card-mark-' + card.mark);
    const cardStr = '<span class="card-view-mark card-view-mark-' + card.mark + '">' + card.mark + '</span><span class="card-view-num">' + parseTrumpNum(card.i) + '</span>';
    const eCardView = $('<div class="card-view">' + cardStr + '</div>').appendTo(eCard);
    return eCard;
  }

  // ポーカーを開始する
  // カードをシャッフルして5枚手札に加える
  function gameStart() {
    eCards.empty();
    game.start();
    for (const e of game.hands.map(newCardElement))
      eCards.append(e);
    eCoin.text(coin);
    game.state = 'wait';
  }
  // 現在の手札と役をログに表示する
  function logRank(rank, result) {
    const tr = $('<tr class="log"><td>' + rank + '</td></tr>');
    const cards = $('<div class="cards"/>')
    for (const e of game.hands.map(c => {
      const elm = newCardElementSimple(c);
      if (result.cards.includes(c)) elm.addClass('card-ranked');
      return elm;
    })) cards.append(e);
    tr.append(cards);
    eLogs.prepend(tr);
  }
  // 役をチェックする
  function checkRank(hands) {
    if (hands === undefined) hands = game.hands;
    const result = game.checkRank();
    if (result.established) {
        console.log(result.rank.name);
        eResult.text(result.rank.name + ' x' + result.mag);
        const gotCoin = Number.parseInt(eBet.val()) * result.mag;
        coin += gotCoin;
        eCoin.text(coin + '(+' + gotCoin + ')');
        for (const card of result.cards) {
          $('#cards .card--' + toString(card)).addClass('card-ranked');
        }
        logRank(result.rank.name, result);
        console.log(result);
    } else {
      console.log('ノーペア');
      eResult.text('ノーペア');
      logRank('ノーペア', result);
      const lostCoin = Number.parseInt(eBet.val());
      coin -= lostCoin;
      eCoin.text(coin + '(-' + lostCoin + ')');
    }
  }
  // 手札を交換する
  function onSwap() {
    game.swap();
    eCards.empty();
    for (const e of game.hands.map(newCardElement, false))
      eCards.append(e);
    checkRank();
    eSwap.text('もう1度');
    eSwapAll.hide();
    game.state = 'end';
  }
  // 交換ボタン
  eSwap.on('click', function() {
    if (game.state === 'wait') {
      onSwap();
    } else if (game.state === 'end') {
      eResult.empty();
      eSwap.text('交換');
      eSwapAll.show();
      gameStart();
    }
  });
  // 全て交換ボタン
  eSwapAll.on('click', function() {
    game.swaps = [true, true, true, true, true];
    onSwap();
  });
  
  eBet.on('change', function() {
    const value = eBet.val();
    if (value === '') {
      eSwap.prop('disabled', true);
      eSwapAll.prop('disabled', true);
    } else {
      eSwap.prop('disabled', false);
      eSwapAll.prop('disabled', false);
    }
  });
  eBetPlus100.on('click', function() {
    eBet.val(Number.parseInt(eBet.val()) + 100);
  });
  eBetMinus100.on('click', function() {
    eBet.val(Number.parseInt(eBet.val()) - 100);
  });
  
  gameStart();
  /*checkRank([
    { i: 7, mark: 'a' },
    { i: 8, mark: 'a' },
    { i: 9, mark: 'a' },
    { i: 10, mark: 'a' },
    { i: 11, mark: 'a' },
  ]);*/
});