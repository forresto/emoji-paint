var EmojiPaint =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var TAU, UI, calcDistance, drawOne, emojiHalf, emojiIndex, emojiSize, firstInStroke, lastX, lastY, mouseDown, mouseMove, mouseUp, move, pressedX, pressedY, touchMove, touchStart, wiggle;

	UI = __webpack_require__(1);

	TAU = Math.PI * 2;

	emojiSize = 64;

	emojiHalf = emojiSize / 2;

	emojiIndex = 0;

	pressedX = null;

	pressedY = null;

	lastX = null;

	lastY = null;

	wiggle = 5;

	firstInStroke = false;

	window.setup = function() {
	  var canvas;
	  canvas = createCanvas(640, 480);
	  canvas.elt.addEventListener('mousedown', mouseDown);
	  canvas.elt.addEventListener('touchstart', touchStart);
	  canvas.elt.addEventListener('mousemove', mouseMove);
	  canvas.elt.addEventListener('touchmove', touchMove);
	  window.addEventListener('mouseup', mouseUp);
	  window.addEventListener('touchend', mouseUp);
	  return UI.setup();
	};

	mouseDown = function(event) {
	  firstInStroke = true;
	  lastX = pressedX = mouseX;
	  return lastY = pressedY = mouseY;
	};

	touchStart = function(event) {
	  lastX = pressedX = event.touches[0].clientX;
	  return lastY = pressedY = event.touches[0].clientY;
	};

	mouseUp = function(event) {
	  var emoji, x, y;
	  if ((event.button != null) && (event.button !== 0)) {
	    return;
	  }
	  x = mouseX || touchX;
	  y = mouseY || touchY;
	  if (!(calcDistance(x, y, pressedX, pressedY) <= wiggle)) {
	    return;
	  }
	  emoji = UI.emoji[emojiIndex];
	  return drawOne(emoji, x, y, x, y - 1);
	};

	touchMove = function(event) {
	  if (!touchIsDown) {
	    return;
	  }
	  event.preventDefault();
	  return move(touchX, touchY);
	};

	mouseMove = function(event) {
	  if (!mouseIsPressed) {
	    return;
	  }
	  event.preventDefault();
	  return move(mouseX, mouseY);
	};

	move = function(x, y) {
	  var distanceFromLast, emoji, spacing;
	  spacing = UI.spacing;
	  distanceFromLast = calcDistance(x, y, lastX, lastY);
	  if (!((firstInStroke && distanceFromLast > wiggle) || (distanceFromLast > spacing))) {
	    return;
	  }
	  firstInStroke = false;
	  emoji = UI.emoji[emojiIndex];
	  drawOne(emoji, x, y, lastX, lastY);
	  lastX = x;
	  return lastY = y;
	};

	drawOne = function(emoji, x1, y1, x2, y2) {
	  var angle, half, size;
	  size = UI.size;
	  half = size / 2;
	  angle = Math.atan2(y2 - y1, x2 - x1) + TAU / 4;
	  translate(x1, y1);
	  rotate(angle);
	  image(emoji, 0, 0, emojiSize, emojiSize, -half, -half, size, size);
	  rotate(-angle);
	  return translate(-x1, -y1);
	};

	calcDistance = function(x1, y1, x2, y2) {
	  var dx, dy;
	  dx = x2 - x1;
	  dy = y2 - y1;
	  return Math.sqrt(dx * dx + dy * dy);
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var EmojiOne, changeEmoji, changeSize, changeSpacing, clickImage, defaultInput, emojiInput, emojiPreview, loadBg, mod;

	EmojiOne = __webpack_require__(2);

	defaultInput = ':rose: :fire: :star2: :green_heart: :ghost: :smiling_imp:';

	emojiPreview = null;

	emojiInput = null;

	mod = {
	  size: 48,
	  spacing: 32,
	  emoji: [],
	  setup: function() {
	    var div, spacingSlider;
	    div = createDiv('');
	    div.child(createDiv('canvas'));
	    div.child(createButton('save image').mouseClicked(function() {
	      return saveCanvas('emoji-paint', 'png');
	    }));
	    div.child(createButton('clear canvas').mouseClicked(function() {
	      return resizeCanvas(width, height);
	    }));
	    div.child(createDiv('chose emoji'));
	    emojiInput = createInput(defaultInput).input(changeEmoji);
	    emojiInput.size(640);
	    div.child(emojiInput);
	    emojiPreview = createDiv('');
	    div.child(emojiPreview);
	    changeEmoji();
	    div.child(createDiv('change spacing'));
	    div.child(createSpan('size '));
	    spacingSlider = createSlider(1, 64, mod.size).input(changeSize);
	    div.child(spacingSlider);
	    div.child(createSpan('spacing '));
	    spacingSlider = createSlider(1, 100, mod.spacing).input(changeSpacing);
	    return div.child(spacingSlider);
	  }
	};

	loadBg = function(file) {
	  if (file.type !== 'image') {
	    return;
	  }
	  return loadImage(file.data, function(img) {
	    resizeCanvas(img.width, img.height);
	    return image(img, 0, 0);
	  });
	};

	changeSize = function(event) {
	  return mod.size = parseInt(event.target.value);
	};

	changeSpacing = function(event) {
	  return mod.spacing = parseInt(event.target.value);
	};

	changeEmoji = function() {
	  var child, emoji, i, input, len, ref, results;
	  input = emojiInput.value();
	  emoji = EmojiOne.toImage(EmojiOne.toShort(input));
	  emojiPreview.html(emoji);
	  ref = emojiPreview.elt.children;
	  results = [];
	  for (i = 0, len = ref.length; i < len; i++) {
	    child = ref[i];
	    if (child.nodeName === 'IMG') {
	      if (!mod.emoji[0]) {
	        mod.emoji = [loadImage(child.src)];
	      }
	      results.push(child.addEventListener('click', clickImage));
	    } else {
	      results.push(void 0);
	    }
	  }
	  return results;
	};

	clickImage = function(event) {
	  var child, i, img, len, ref, results;
	  img = event.target;
	  mod.emoji = [loadImage(img.src)];
	  ref = emojiPreview.elt.children;
	  results = [];
	  for (i = 0, len = ref.length; i < len; i++) {
	    child = ref[i];
	    if (child.nodeName === 'IMG') {
	      results.push(child.className = img === child ? 'selected' : '');
	    } else {
	      results.push(void 0);
	    }
	  }
	  return results;
	};

	module.exports = mod;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint maxerr: 10000 */
	/* jslint unused: true */
	/* jshint shadow: true */
	/* jshint -W075 */
	(function(ns){
	    // this list must be ordered from largest length of the value array, index 0, to the shortest
	    ns.emojioneList = {':kiss_ww:':["1f469-200d-2764-fe0f-200d-1f48b-200d-1f469","1f469-2764-1f48b-1f469"],':couplekiss_ww:':["1f469-2764-1f48b-1f469"],':kiss_mm:':["1f468-200d-2764-fe0f-200d-1f48b-200d-1f468","1f468-2764-1f48b-1f468"],':couplekiss_mm:':["1f468-2764-1f48b-1f468"],':family_mmbb:':["1f468-200d-1f468-200d-1f466-200d-1f466","1f468-1f468-1f466-1f466"],':family_mmgb:':["1f468-200d-1f468-200d-1f467-200d-1f466","1f468-1f468-1f467-1f466"],':family_mmgg:':["1f468-200d-1f468-200d-1f467-200d-1f467","1f468-1f468-1f467-1f467"],':family_mwbb:':["1f468-200d-1f469-200d-1f466-200d-1f466","1f468-1f469-1f466-1f466"],':family_mwgb:':["1f468-200d-1f469-200d-1f467-200d-1f466","1f468-1f469-1f467-1f466"],':family_mwgg:':["1f468-200d-1f469-200d-1f467-200d-1f467","1f468-1f469-1f467-1f467"],':family_wwbb:':["1f469-200d-1f469-200d-1f466-200d-1f466","1f469-1f469-1f466-1f466"],':family_wwgb:':["1f469-200d-1f469-200d-1f467-200d-1f466","1f469-1f469-1f467-1f466"],':family_wwgg:':["1f469-200d-1f469-200d-1f467-200d-1f467","1f469-1f469-1f467-1f467"],':couple_ww:':["1f469-200d-2764-fe0f-200d-1f469","1f469-2764-1f469"],':couple_with_heart_ww:':["1f469-2764-1f469"],':couple_mm:':["1f468-200d-2764-fe0f-200d-1f468","1f468-2764-1f468"],':couple_with_heart_mm:':["1f468-2764-1f468"],':family_mmb:':["1f468-200d-1f468-200d-1f466","1f468-1f468-1f466"],':family_mmg:':["1f468-200d-1f468-200d-1f467","1f468-1f468-1f467"],':family_mwg:':["1f468-200d-1f469-200d-1f467","1f468-1f469-1f467"],':family_wwb:':["1f469-200d-1f469-200d-1f466","1f469-1f469-1f466"],':family_wwg:':["1f469-200d-1f469-200d-1f467","1f469-1f469-1f467"],':hash:':["0023-fe0f-20e3","0023-20e3"],':zero:':["0030-fe0f-20e3","0030-20e3"],':one:':["0031-fe0f-20e3","0031-20e3"],':two:':["0032-fe0f-20e3","0032-20e3"],':three:':["0033-fe0f-20e3","0033-20e3"],':four:':["0034-fe0f-20e3","0034-20e3"],':five:':["0035-fe0f-20e3","0035-20e3"],':six:':["0036-fe0f-20e3","0036-20e3"],':seven:':["0037-fe0f-20e3","0037-20e3"],':eight:':["0038-fe0f-20e3","0038-20e3"],':nine:':["0039-fe0f-20e3","0039-20e3"],':flag_ac:':["1f1e6-1f1e8"],':ac:':["1f1e6-1f1e8"],':flag_ad:':["1f1e6-1f1e9"],':ad:':["1f1e6-1f1e9"],':flag_ae:':["1f1e6-1f1ea"],':ae:':["1f1e6-1f1ea"],':flag_af:':["1f1e6-1f1eb"],':af:':["1f1e6-1f1eb"],':flag_ag:':["1f1e6-1f1ec"],':ag:':["1f1e6-1f1ec"],':flag_ai:':["1f1e6-1f1ee"],':ai:':["1f1e6-1f1ee"],':flag_al:':["1f1e6-1f1f1"],':al:':["1f1e6-1f1f1"],':flag_am:':["1f1e6-1f1f2"],':am:':["1f1e6-1f1f2"],':flag_ao:':["1f1e6-1f1f4"],':ao:':["1f1e6-1f1f4"],':flag_ar:':["1f1e6-1f1f7"],':ar:':["1f1e6-1f1f7"],':flag_at:':["1f1e6-1f1f9"],':at:':["1f1e6-1f1f9"],':flag_au:':["1f1e6-1f1fa"],':au:':["1f1e6-1f1fa"],':flag_aw:':["1f1e6-1f1fc"],':aw:':["1f1e6-1f1fc"],':flag_az:':["1f1e6-1f1ff"],':az:':["1f1e6-1f1ff"],':flag_ba:':["1f1e7-1f1e6"],':ba:':["1f1e7-1f1e6"],':flag_bb:':["1f1e7-1f1e7"],':bb:':["1f1e7-1f1e7"],':flag_bd:':["1f1e7-1f1e9"],':bd:':["1f1e7-1f1e9"],':flag_be:':["1f1e7-1f1ea"],':be:':["1f1e7-1f1ea"],':flag_bf:':["1f1e7-1f1eb"],':bf:':["1f1e7-1f1eb"],':flag_bg:':["1f1e7-1f1ec"],':bg:':["1f1e7-1f1ec"],':flag_bh:':["1f1e7-1f1ed"],':bh:':["1f1e7-1f1ed"],':flag_bi:':["1f1e7-1f1ee"],':bi:':["1f1e7-1f1ee"],':flag_bj:':["1f1e7-1f1ef"],':bj:':["1f1e7-1f1ef"],':flag_bm:':["1f1e7-1f1f2"],':bm:':["1f1e7-1f1f2"],':flag_bn:':["1f1e7-1f1f3"],':bn:':["1f1e7-1f1f3"],':flag_bo:':["1f1e7-1f1f4"],':bo:':["1f1e7-1f1f4"],':flag_br:':["1f1e7-1f1f7"],':br:':["1f1e7-1f1f7"],':flag_bs:':["1f1e7-1f1f8"],':bs:':["1f1e7-1f1f8"],':flag_bt:':["1f1e7-1f1f9"],':bt:':["1f1e7-1f1f9"],':flag_bw:':["1f1e7-1f1fc"],':bw:':["1f1e7-1f1fc"],':flag_by:':["1f1e7-1f1fe"],':by:':["1f1e7-1f1fe"],':flag_bz:':["1f1e7-1f1ff"],':bz:':["1f1e7-1f1ff"],':flag_ca:':["1f1e8-1f1e6"],':ca:':["1f1e8-1f1e6"],':flag_cd:':["1f1e8-1f1e9"],':congo:':["1f1e8-1f1e9"],':flag_cf:':["1f1e8-1f1eb"],':cf:':["1f1e8-1f1eb"],':flag_cg:':["1f1e8-1f1ec"],':cg:':["1f1e8-1f1ec"],':flag_ch:':["1f1e8-1f1ed"],':ch:':["1f1e8-1f1ed"],':flag_ci:':["1f1e8-1f1ee"],':ci:':["1f1e8-1f1ee"],':flag_cl:':["1f1e8-1f1f1"],':chile:':["1f1e8-1f1f1"],':flag_cm:':["1f1e8-1f1f2"],':cm:':["1f1e8-1f1f2"],':flag_cn:':["1f1e8-1f1f3"],':cn:':["1f1e8-1f1f3"],':flag_co:':["1f1e8-1f1f4"],':co:':["1f1e8-1f1f4"],':flag_cr:':["1f1e8-1f1f7"],':cr:':["1f1e8-1f1f7"],':flag_cu:':["1f1e8-1f1fa"],':cu:':["1f1e8-1f1fa"],':flag_cv:':["1f1e8-1f1fb"],':cv:':["1f1e8-1f1fb"],':flag_cy:':["1f1e8-1f1fe"],':cy:':["1f1e8-1f1fe"],':flag_cz:':["1f1e8-1f1ff"],':cz:':["1f1e8-1f1ff"],':flag_de:':["1f1e9-1f1ea"],':de:':["1f1e9-1f1ea"],':flag_dj:':["1f1e9-1f1ef"],':dj:':["1f1e9-1f1ef"],':flag_dk:':["1f1e9-1f1f0"],':dk:':["1f1e9-1f1f0"],':flag_dm:':["1f1e9-1f1f2"],':dm:':["1f1e9-1f1f2"],':flag_do:':["1f1e9-1f1f4"],':do:':["1f1e9-1f1f4"],':flag_dz:':["1f1e9-1f1ff"],':dz:':["1f1e9-1f1ff"],':flag_ec:':["1f1ea-1f1e8"],':ec:':["1f1ea-1f1e8"],':flag_ee:':["1f1ea-1f1ea"],':ee:':["1f1ea-1f1ea"],':flag_eg:':["1f1ea-1f1ec"],':eg:':["1f1ea-1f1ec"],':flag_eh:':["1f1ea-1f1ed"],':eh:':["1f1ea-1f1ed"],':flag_er:':["1f1ea-1f1f7"],':er:':["1f1ea-1f1f7"],':flag_es:':["1f1ea-1f1f8"],':es:':["1f1ea-1f1f8"],':flag_et:':["1f1ea-1f1f9"],':et:':["1f1ea-1f1f9"],':flag_fi:':["1f1eb-1f1ee"],':fi:':["1f1eb-1f1ee"],':flag_fj:':["1f1eb-1f1ef"],':fj:':["1f1eb-1f1ef"],':flag_fk:':["1f1eb-1f1f0"],':fk:':["1f1eb-1f1f0"],':flag_fm:':["1f1eb-1f1f2"],':fm:':["1f1eb-1f1f2"],':flag_fo:':["1f1eb-1f1f4"],':fo:':["1f1eb-1f1f4"],':flag_fr:':["1f1eb-1f1f7"],':fr:':["1f1eb-1f1f7"],':flag_ga:':["1f1ec-1f1e6"],':ga:':["1f1ec-1f1e6"],':flag_gb:':["1f1ec-1f1e7"],':gb:':["1f1ec-1f1e7"],':flag_gd:':["1f1ec-1f1e9"],':gd:':["1f1ec-1f1e9"],':flag_ge:':["1f1ec-1f1ea"],':ge:':["1f1ec-1f1ea"],':flag_gh:':["1f1ec-1f1ed"],':gh:':["1f1ec-1f1ed"],':flag_gi:':["1f1ec-1f1ee"],':gi:':["1f1ec-1f1ee"],':flag_gl:':["1f1ec-1f1f1"],':gl:':["1f1ec-1f1f1"],':flag_gm:':["1f1ec-1f1f2"],':gm:':["1f1ec-1f1f2"],':flag_gn:':["1f1ec-1f1f3"],':gn:':["1f1ec-1f1f3"],':flag_gq:':["1f1ec-1f1f6"],':gq:':["1f1ec-1f1f6"],':flag_gr:':["1f1ec-1f1f7"],':gr:':["1f1ec-1f1f7"],':flag_gt:':["1f1ec-1f1f9"],':gt:':["1f1ec-1f1f9"],':flag_gu:':["1f1ec-1f1fa"],':gu:':["1f1ec-1f1fa"],':flag_gw:':["1f1ec-1f1fc"],':gw:':["1f1ec-1f1fc"],':flag_gy:':["1f1ec-1f1fe"],':gy:':["1f1ec-1f1fe"],':flag_hk:':["1f1ed-1f1f0"],':hk:':["1f1ed-1f1f0"],':flag_hn:':["1f1ed-1f1f3"],':hn:':["1f1ed-1f1f3"],':flag_hr:':["1f1ed-1f1f7"],':hr:':["1f1ed-1f1f7"],':flag_ht:':["1f1ed-1f1f9"],':ht:':["1f1ed-1f1f9"],':flag_hu:':["1f1ed-1f1fa"],':hu:':["1f1ed-1f1fa"],':flag_id:':["1f1ee-1f1e9"],':indonesia:':["1f1ee-1f1e9"],':flag_ie:':["1f1ee-1f1ea"],':ie:':["1f1ee-1f1ea"],':flag_il:':["1f1ee-1f1f1"],':il:':["1f1ee-1f1f1"],':flag_in:':["1f1ee-1f1f3"],':in:':["1f1ee-1f1f3"],':flag_iq:':["1f1ee-1f1f6"],':iq:':["1f1ee-1f1f6"],':flag_ir:':["1f1ee-1f1f7"],':ir:':["1f1ee-1f1f7"],':flag_is:':["1f1ee-1f1f8"],':is:':["1f1ee-1f1f8"],':flag_it:':["1f1ee-1f1f9"],':it:':["1f1ee-1f1f9"],':flag_je:':["1f1ef-1f1ea"],':je:':["1f1ef-1f1ea"],':flag_jm:':["1f1ef-1f1f2"],':jm:':["1f1ef-1f1f2"],':flag_jo:':["1f1ef-1f1f4"],':jo:':["1f1ef-1f1f4"],':flag_jp:':["1f1ef-1f1f5"],':jp:':["1f1ef-1f1f5"],':flag_ke:':["1f1f0-1f1ea"],':ke:':["1f1f0-1f1ea"],':flag_kg:':["1f1f0-1f1ec"],':kg:':["1f1f0-1f1ec"],':flag_kh:':["1f1f0-1f1ed"],':kh:':["1f1f0-1f1ed"],':flag_ki:':["1f1f0-1f1ee"],':ki:':["1f1f0-1f1ee"],':flag_km:':["1f1f0-1f1f2"],':km:':["1f1f0-1f1f2"],':flag_kn:':["1f1f0-1f1f3"],':kn:':["1f1f0-1f1f3"],':flag_kp:':["1f1f0-1f1f5"],':kp:':["1f1f0-1f1f5"],':flag_kr:':["1f1f0-1f1f7"],':kr:':["1f1f0-1f1f7"],':flag_kw:':["1f1f0-1f1fc"],':kw:':["1f1f0-1f1fc"],':flag_ky:':["1f1f0-1f1fe"],':ky:':["1f1f0-1f1fe"],':flag_kz:':["1f1f0-1f1ff"],':kz:':["1f1f0-1f1ff"],':flag_la:':["1f1f1-1f1e6"],':la:':["1f1f1-1f1e6"],':flag_lb:':["1f1f1-1f1e7"],':lb:':["1f1f1-1f1e7"],':flag_lc:':["1f1f1-1f1e8"],':lc:':["1f1f1-1f1e8"],':flag_li:':["1f1f1-1f1ee"],':li:':["1f1f1-1f1ee"],':flag_lk:':["1f1f1-1f1f0"],':lk:':["1f1f1-1f1f0"],':flag_lr:':["1f1f1-1f1f7"],':lr:':["1f1f1-1f1f7"],':flag_ls:':["1f1f1-1f1f8"],':ls:':["1f1f1-1f1f8"],':flag_lt:':["1f1f1-1f1f9"],':lt:':["1f1f1-1f1f9"],':flag_lu:':["1f1f1-1f1fa"],':lu:':["1f1f1-1f1fa"],':flag_lv:':["1f1f1-1f1fb"],':lv:':["1f1f1-1f1fb"],':flag_ly:':["1f1f1-1f1fe"],':ly:':["1f1f1-1f1fe"],':flag_ma:':["1f1f2-1f1e6"],':ma:':["1f1f2-1f1e6"],':flag_mc:':["1f1f2-1f1e8"],':mc:':["1f1f2-1f1e8"],':flag_md:':["1f1f2-1f1e9"],':md:':["1f1f2-1f1e9"],':flag_me:':["1f1f2-1f1ea"],':me:':["1f1f2-1f1ea"],':flag_mg:':["1f1f2-1f1ec"],':mg:':["1f1f2-1f1ec"],':flag_mh:':["1f1f2-1f1ed"],':mh:':["1f1f2-1f1ed"],':flag_mk:':["1f1f2-1f1f0"],':mk:':["1f1f2-1f1f0"],':flag_ml:':["1f1f2-1f1f1"],':ml:':["1f1f2-1f1f1"],':flag_mm:':["1f1f2-1f1f2"],':mm:':["1f1f2-1f1f2"],':flag_mn:':["1f1f2-1f1f3"],':mn:':["1f1f2-1f1f3"],':flag_mo:':["1f1f2-1f1f4"],':mo:':["1f1f2-1f1f4"],':flag_mr:':["1f1f2-1f1f7"],':mr:':["1f1f2-1f1f7"],':flag_ms:':["1f1f2-1f1f8"],':ms:':["1f1f2-1f1f8"],':flag_mt:':["1f1f2-1f1f9"],':mt:':["1f1f2-1f1f9"],':flag_mu:':["1f1f2-1f1fa"],':mu:':["1f1f2-1f1fa"],':flag_mv:':["1f1f2-1f1fb"],':mv:':["1f1f2-1f1fb"],':flag_mw:':["1f1f2-1f1fc"],':mw:':["1f1f2-1f1fc"],':flag_mx:':["1f1f2-1f1fd"],':mx:':["1f1f2-1f1fd"],':flag_my:':["1f1f2-1f1fe"],':my:':["1f1f2-1f1fe"],':flag_mz:':["1f1f2-1f1ff"],':mz:':["1f1f2-1f1ff"],':flag_na:':["1f1f3-1f1e6"],':na:':["1f1f3-1f1e6"],':flag_nc:':["1f1f3-1f1e8"],':nc:':["1f1f3-1f1e8"],':flag_ne:':["1f1f3-1f1ea"],':ne:':["1f1f3-1f1ea"],':flag_ng:':["1f1f3-1f1ec"],':nigeria:':["1f1f3-1f1ec"],':flag_ni:':["1f1f3-1f1ee"],':ni:':["1f1f3-1f1ee"],':flag_nl:':["1f1f3-1f1f1"],':nl:':["1f1f3-1f1f1"],':flag_no:':["1f1f3-1f1f4"],':no:':["1f1f3-1f1f4"],':flag_np:':["1f1f3-1f1f5"],':np:':["1f1f3-1f1f5"],':flag_nr:':["1f1f3-1f1f7"],':nr:':["1f1f3-1f1f7"],':flag_nu:':["1f1f3-1f1fa"],':nu:':["1f1f3-1f1fa"],':flag_nz:':["1f1f3-1f1ff"],':nz:':["1f1f3-1f1ff"],':flag_om:':["1f1f4-1f1f2"],':om:':["1f1f4-1f1f2"],':flag_pa:':["1f1f5-1f1e6"],':pa:':["1f1f5-1f1e6"],':flag_pe:':["1f1f5-1f1ea"],':pe:':["1f1f5-1f1ea"],':flag_pf:':["1f1f5-1f1eb"],':pf:':["1f1f5-1f1eb"],':flag_pg:':["1f1f5-1f1ec"],':pg:':["1f1f5-1f1ec"],':flag_ph:':["1f1f5-1f1ed"],':ph:':["1f1f5-1f1ed"],':flag_pk:':["1f1f5-1f1f0"],':pk:':["1f1f5-1f1f0"],':flag_pl:':["1f1f5-1f1f1"],':pl:':["1f1f5-1f1f1"],':flag_pr:':["1f1f5-1f1f7"],':pr:':["1f1f5-1f1f7"],':flag_ps:':["1f1f5-1f1f8"],':ps:':["1f1f5-1f1f8"],':flag_pt:':["1f1f5-1f1f9"],':pt:':["1f1f5-1f1f9"],':flag_pw:':["1f1f5-1f1fc"],':pw:':["1f1f5-1f1fc"],':flag_py:':["1f1f5-1f1fe"],':py:':["1f1f5-1f1fe"],':flag_qa:':["1f1f6-1f1e6"],':qa:':["1f1f6-1f1e6"],':flag_ro:':["1f1f7-1f1f4"],':ro:':["1f1f7-1f1f4"],':flag_rs:':["1f1f7-1f1f8"],':rs:':["1f1f7-1f1f8"],':flag_ru:':["1f1f7-1f1fa"],':ru:':["1f1f7-1f1fa"],':flag_rw:':["1f1f7-1f1fc"],':rw:':["1f1f7-1f1fc"],':flag_sa:':["1f1f8-1f1e6"],':saudiarabia:':["1f1f8-1f1e6"],':saudi:':["1f1f8-1f1e6"],':flag_sb:':["1f1f8-1f1e7"],':sb:':["1f1f8-1f1e7"],':flag_sc:':["1f1f8-1f1e8"],':sc:':["1f1f8-1f1e8"],':flag_sd:':["1f1f8-1f1e9"],':sd:':["1f1f8-1f1e9"],':flag_se:':["1f1f8-1f1ea"],':se:':["1f1f8-1f1ea"],':flag_sg:':["1f1f8-1f1ec"],':sg:':["1f1f8-1f1ec"],':flag_sh:':["1f1f8-1f1ed"],':sh:':["1f1f8-1f1ed"],':flag_si:':["1f1f8-1f1ee"],':si:':["1f1f8-1f1ee"],':flag_sk:':["1f1f8-1f1f0"],':sk:':["1f1f8-1f1f0"],':flag_sl:':["1f1f8-1f1f1"],':sl:':["1f1f8-1f1f1"],':flag_sm:':["1f1f8-1f1f2"],':sm:':["1f1f8-1f1f2"],':flag_sn:':["1f1f8-1f1f3"],':sn:':["1f1f8-1f1f3"],':flag_so:':["1f1f8-1f1f4"],':so:':["1f1f8-1f1f4"],':flag_sr:':["1f1f8-1f1f7"],':sr:':["1f1f8-1f1f7"],':flag_st:':["1f1f8-1f1f9"],':st:':["1f1f8-1f1f9"],':flag_sv:':["1f1f8-1f1fb"],':sv:':["1f1f8-1f1fb"],':flag_sy:':["1f1f8-1f1fe"],':sy:':["1f1f8-1f1fe"],':flag_sz:':["1f1f8-1f1ff"],':sz:':["1f1f8-1f1ff"],':flag_td:':["1f1f9-1f1e9"],':td:':["1f1f9-1f1e9"],':flag_tg:':["1f1f9-1f1ec"],':tg:':["1f1f9-1f1ec"],':flag_th:':["1f1f9-1f1ed"],':th:':["1f1f9-1f1ed"],':flag_tj:':["1f1f9-1f1ef"],':tj:':["1f1f9-1f1ef"],':flag_tl:':["1f1f9-1f1f1"],':tl:':["1f1f9-1f1f1"],':flag_tm:':["1f1f9-1f1f2"],':turkmenistan:':["1f1f9-1f1f2"],':flag_tn:':["1f1f9-1f1f3"],':tn:':["1f1f9-1f1f3"],':flag_to:':["1f1f9-1f1f4"],':to:':["1f1f9-1f1f4"],':flag_tr:':["1f1f9-1f1f7"],':tr:':["1f1f9-1f1f7"],':flag_tt:':["1f1f9-1f1f9"],':tt:':["1f1f9-1f1f9"],':flag_tv:':["1f1f9-1f1fb"],':tuvalu:':["1f1f9-1f1fb"],':flag_tw:':["1f1f9-1f1fc"],':tw:':["1f1f9-1f1fc"],':flag_tz:':["1f1f9-1f1ff"],':tz:':["1f1f9-1f1ff"],':flag_ua:':["1f1fa-1f1e6"],':ua:':["1f1fa-1f1e6"],':flag_ug:':["1f1fa-1f1ec"],':ug:':["1f1fa-1f1ec"],':flag_us:':["1f1fa-1f1f8"],':us:':["1f1fa-1f1f8"],':flag_uy:':["1f1fa-1f1fe"],':uy:':["1f1fa-1f1fe"],':flag_uz:':["1f1fa-1f1ff"],':uz:':["1f1fa-1f1ff"],':flag_va:':["1f1fb-1f1e6"],':va:':["1f1fb-1f1e6"],':flag_vc:':["1f1fb-1f1e8"],':vc:':["1f1fb-1f1e8"],':flag_ve:':["1f1fb-1f1ea"],':ve:':["1f1fb-1f1ea"],':flag_vi:':["1f1fb-1f1ee"],':vi:':["1f1fb-1f1ee"],':flag_vn:':["1f1fb-1f1f3"],':vn:':["1f1fb-1f1f3"],':flag_vu:':["1f1fb-1f1fa"],':vu:':["1f1fb-1f1fa"],':flag_wf:':["1f1fc-1f1eb"],':wf:':["1f1fc-1f1eb"],':flag_ws:':["1f1fc-1f1f8"],':ws:':["1f1fc-1f1f8"],':flag_xk:':["1f1fd-1f1f0"],':xk:':["1f1fd-1f1f0"],':flag_ye:':["1f1fe-1f1ea"],':ye:':["1f1fe-1f1ea"],':flag_za:':["1f1ff-1f1e6"],':za:':["1f1ff-1f1e6"],':flag_zm:':["1f1ff-1f1f2"],':zm:':["1f1ff-1f1f2"],':flag_zw:':["1f1ff-1f1fc"],':zw:':["1f1ff-1f1fc"],':copyright:':["00a9-fe0f","00a9"],':registered:':["00ae-fe0f","00ae"],':mahjong:':["1f004-fe0f","1f004"],':black_joker:':["1f0cf"],':a:':["1f170"],':b:':["1f171"],':o2:':["1f17e"],':parking:':["1f17f-fe0f","1f17f"],':ab:':["1f18e"],':cl:':["1f191"],':cool:':["1f192"],':free:':["1f193"],':id:':["1f194"],':new:':["1f195"],':ng:':["1f196"],':ok:':["1f197"],':sos:':["1f198"],':up:':["1f199"],':vs:':["1f19a"],':koko:':["1f201"],':sa:':["1f202"],':u7121:':["1f21a-fe0f","1f21a"],':u6307:':["1f22f-fe0f","1f22f"],':u7981:':["1f232"],':u7a7a:':["1f233"],':u5408:':["1f234"],':u6e80:':["1f235"],':u6709:':["1f236"],':u6708:':["1f237"],':u7533:':["1f238"],':u5272:':["1f239"],':u55b6:':["1f23a"],':ideograph_advantage:':["1f250"],':accept:':["1f251"],':cyclone:':["1f300"],':foggy:':["1f301"],':closed_umbrella:':["1f302"],':night_with_stars:':["1f303"],':sunrise_over_mountains:':["1f304"],':sunrise:':["1f305"],':city_dusk:':["1f306"],':city_sunset:':["1f307"],':city_sunrise:':["1f307"],':rainbow:':["1f308"],':bridge_at_night:':["1f309"],':ocean:':["1f30a"],':volcano:':["1f30b"],':milky_way:':["1f30c"],':earth_africa:':["1f30d"],':earth_americas:':["1f30e"],':earth_asia:':["1f30f"],':globe_with_meridians:':["1f310"],':new_moon:':["1f311"],':waxing_crescent_moon:':["1f312"],':first_quarter_moon:':["1f313"],':waxing_gibbous_moon:':["1f314"],':full_moon:':["1f315"],':waning_gibbous_moon:':["1f316"],':last_quarter_moon:':["1f317"],':waning_crescent_moon:':["1f318"],':crescent_moon:':["1f319"],':new_moon_with_face:':["1f31a"],':first_quarter_moon_with_face:':["1f31b"],':last_quarter_moon_with_face:':["1f31c"],':full_moon_with_face:':["1f31d"],':sun_with_face:':["1f31e"],':star2:':["1f31f"],':stars:':["1f320"],':thermometer:':["1f321"],':cloud_rain:':["1f327"],':cloud_with_rain:':["1f327"],':cloud_snow:':["1f328"],':cloud_with_snow:':["1f328"],':cloud_lightning:':["1f329"],':cloud_with_lightning:':["1f329"],':cloud_tornado:':["1f32a"],':cloud_with_tornado:':["1f32a"],':fog:':["1f32b"],':wind_blowing_face:':["1f32c"],':chestnut:':["1f330"],':seedling:':["1f331"],':evergreen_tree:':["1f332"],':deciduous_tree:':["1f333"],':palm_tree:':["1f334"],':cactus:':["1f335"],':hot_pepper:':["1f336"],':tulip:':["1f337"],':cherry_blossom:':["1f338"],':rose:':["1f339"],':hibiscus:':["1f33a"],':sunflower:':["1f33b"],':blossom:':["1f33c"],':corn:':["1f33d"],':ear_of_rice:':["1f33e"],':herb:':["1f33f"],':four_leaf_clover:':["1f340"],':maple_leaf:':["1f341"],':fallen_leaf:':["1f342"],':leaves:':["1f343"],':mushroom:':["1f344"],':tomato:':["1f345"],':eggplant:':["1f346"],':grapes:':["1f347"],':melon:':["1f348"],':watermelon:':["1f349"],':tangerine:':["1f34a"],':lemon:':["1f34b"],':banana:':["1f34c"],':pineapple:':["1f34d"],':apple:':["1f34e"],':green_apple:':["1f34f"],':pear:':["1f350"],':peach:':["1f351"],':cherries:':["1f352"],':strawberry:':["1f353"],':hamburger:':["1f354"],':pizza:':["1f355"],':meat_on_bone:':["1f356"],':poultry_leg:':["1f357"],':rice_cracker:':["1f358"],':rice_ball:':["1f359"],':rice:':["1f35a"],':curry:':["1f35b"],':ramen:':["1f35c"],':spaghetti:':["1f35d"],':bread:':["1f35e"],':fries:':["1f35f"],':sweet_potato:':["1f360"],':dango:':["1f361"],':oden:':["1f362"],':sushi:':["1f363"],':fried_shrimp:':["1f364"],':fish_cake:':["1f365"],':icecream:':["1f366"],':shaved_ice:':["1f367"],':ice_cream:':["1f368"],':doughnut:':["1f369"],':cookie:':["1f36a"],':chocolate_bar:':["1f36b"],':candy:':["1f36c"],':lollipop:':["1f36d"],':custard:':["1f36e"],':honey_pot:':["1f36f"],':cake:':["1f370"],':bento:':["1f371"],':stew:':["1f372"],':egg:':["1f373"],':fork_and_knife:':["1f374"],':tea:':["1f375"],':sake:':["1f376"],':wine_glass:':["1f377"],':cocktail:':["1f378"],':tropical_drink:':["1f379"],':beer:':["1f37a"],':beers:':["1f37b"],':baby_bottle:':["1f37c"],':fork_knife_plate:':["1f37d"],':fork_and_knife_with_plate:':["1f37d"],':ribbon:':["1f380"],':gift:':["1f381"],':birthday:':["1f382"],':jack_o_lantern:':["1f383"],':christmas_tree:':["1f384"],':santa:':["1f385"],':fireworks:':["1f386"],':sparkler:':["1f387"],':balloon:':["1f388"],':tada:':["1f389"],':confetti_ball:':["1f38a"],':tanabata_tree:':["1f38b"],':crossed_flags:':["1f38c"],':bamboo:':["1f38d"],':dolls:':["1f38e"],':flags:':["1f38f"],':wind_chime:':["1f390"],':rice_scene:':["1f391"],':school_satchel:':["1f392"],':mortar_board:':["1f393"],':military_medal:':["1f396"],':reminder_ribbon:':["1f397"],':microphone2:':["1f399"],':studio_microphone:':["1f399"],':level_slider:':["1f39a"],':control_knobs:':["1f39b"],':film_frames:':["1f39e"],':tickets:':["1f39f"],':admission_tickets:':["1f39f"],':carousel_horse:':["1f3a0"],':ferris_wheel:':["1f3a1"],':roller_coaster:':["1f3a2"],':fishing_pole_and_fish:':["1f3a3"],':microphone:':["1f3a4"],':movie_camera:':["1f3a5"],':cinema:':["1f3a6"],':headphones:':["1f3a7"],':art:':["1f3a8"],':tophat:':["1f3a9"],':circus_tent:':["1f3aa"],':ticket:':["1f3ab"],':clapper:':["1f3ac"],':performing_arts:':["1f3ad"],':video_game:':["1f3ae"],':dart:':["1f3af"],':slot_machine:':["1f3b0"],':8ball:':["1f3b1"],':game_die:':["1f3b2"],':bowling:':["1f3b3"],':flower_playing_cards:':["1f3b4"],':musical_note:':["1f3b5"],':notes:':["1f3b6"],':saxophone:':["1f3b7"],':guitar:':["1f3b8"],':musical_keyboard:':["1f3b9"],':trumpet:':["1f3ba"],':violin:':["1f3bb"],':musical_score:':["1f3bc"],':running_shirt_with_sash:':["1f3bd"],':tennis:':["1f3be"],':ski:':["1f3bf"],':basketball:':["1f3c0"],':checkered_flag:':["1f3c1"],':snowboarder:':["1f3c2"],':runner:':["1f3c3"],':surfer:':["1f3c4"],':medal:':["1f3c5"],':sports_medal:':["1f3c5"],':trophy:':["1f3c6"],':horse_racing:':["1f3c7"],':football:':["1f3c8"],':rugby_football:':["1f3c9"],':swimmer:':["1f3ca"],':lifter:':["1f3cb"],':weight_lifter:':["1f3cb"],':golfer:':["1f3cc"],':motorcycle:':["1f3cd"],':racing_motorcycle:':["1f3cd"],':race_car:':["1f3ce"],':racing_car:':["1f3ce"],':mountain_snow:':["1f3d4"],':snow_capped_mountain:':["1f3d4"],':camping:':["1f3d5"],':beach:':["1f3d6"],':beach_with_umbrella:':["1f3d6"],':contruction_site:':["1f3d7"],':building_construction:':["1f3d7"],':homes:':["1f3d8"],':house_buildings:':["1f3d8"],':cityscape:':["1f3d9"],':house_abandoned:':["1f3da"],':derelict_house_building:':["1f3da"],':classical_building:':["1f3db"],':desert:':["1f3dc"],':island:':["1f3dd"],':desert_island:':["1f3dd"],':park:':["1f3de"],':national_park:':["1f3de"],':stadium:':["1f3df"],':house:':["1f3e0"],':house_with_garden:':["1f3e1"],':office:':["1f3e2"],':post_office:':["1f3e3"],':european_post_office:':["1f3e4"],':hospital:':["1f3e5"],':bank:':["1f3e6"],':atm:':["1f3e7"],':hotel:':["1f3e8"],':love_hotel:':["1f3e9"],':convenience_store:':["1f3ea"],':school:':["1f3eb"],':department_store:':["1f3ec"],':factory:':["1f3ed"],':izakaya_lantern:':["1f3ee"],':japanese_castle:':["1f3ef"],':european_castle:':["1f3f0"],':flag_white:':["1f3f3"],':waving_white_flag:':["1f3f3"],':flag_black:':["1f3f4"],':waving_black_flag:':["1f3f4"],':rosette:':["1f3f5"],':label:':["1f3f7"],':rat:':["1f400"],':mouse2:':["1f401"],':ox:':["1f402"],':water_buffalo:':["1f403"],':cow2:':["1f404"],':tiger2:':["1f405"],':leopard:':["1f406"],':rabbit2:':["1f407"],':cat2:':["1f408"],':dragon:':["1f409"],':crocodile:':["1f40a"],':whale2:':["1f40b"],':snail:':["1f40c"],':snake:':["1f40d"],':racehorse:':["1f40e"],':ram:':["1f40f"],':goat:':["1f410"],':sheep:':["1f411"],':monkey:':["1f412"],':rooster:':["1f413"],':chicken:':["1f414"],':dog2:':["1f415"],':pig2:':["1f416"],':boar:':["1f417"],':elephant:':["1f418"],':octopus:':["1f419"],':shell:':["1f41a"],':bug:':["1f41b"],':ant:':["1f41c"],':bee:':["1f41d"],':beetle:':["1f41e"],':fish:':["1f41f"],':tropical_fish:':["1f420"],':blowfish:':["1f421"],':turtle:':["1f422"],':hatching_chick:':["1f423"],':baby_chick:':["1f424"],':hatched_chick:':["1f425"],':bird:':["1f426"],':penguin:':["1f427"],':koala:':["1f428"],':poodle:':["1f429"],':dromedary_camel:':["1f42a"],':camel:':["1f42b"],':dolphin:':["1f42c"],':mouse:':["1f42d"],':cow:':["1f42e"],':tiger:':["1f42f"],':rabbit:':["1f430"],':cat:':["1f431"],':dragon_face:':["1f432"],':whale:':["1f433"],':horse:':["1f434"],':monkey_face:':["1f435"],':dog:':["1f436"],':pig:':["1f437"],':frog:':["1f438"],':hamster:':["1f439"],':wolf:':["1f43a"],':bear:':["1f43b"],':panda_face:':["1f43c"],':pig_nose:':["1f43d"],':feet:':["1f43e"],':chipmunk:':["1f43f"],':eyes:':["1f440"],':eye:':["1f441"],':ear:':["1f442"],':nose:':["1f443"],':lips:':["1f444"],':tongue:':["1f445"],':point_up_2:':["1f446"],':point_down:':["1f447"],':point_left:':["1f448"],':point_right:':["1f449"],':punch:':["1f44a"],':wave:':["1f44b"],':ok_hand:':["1f44c"],':thumbsup:':["1f44d"],':+1:':["1f44d"],':thumbsdown:':["1f44e"],':-1:':["1f44e"],':clap:':["1f44f"],':open_hands:':["1f450"],':crown:':["1f451"],':womans_hat:':["1f452"],':eyeglasses:':["1f453"],':necktie:':["1f454"],':shirt:':["1f455"],':jeans:':["1f456"],':dress:':["1f457"],':kimono:':["1f458"],':bikini:':["1f459"],':womans_clothes:':["1f45a"],':purse:':["1f45b"],':handbag:':["1f45c"],':pouch:':["1f45d"],':mans_shoe:':["1f45e"],':athletic_shoe:':["1f45f"],':high_heel:':["1f460"],':sandal:':["1f461"],':boot:':["1f462"],':footprints:':["1f463"],':bust_in_silhouette:':["1f464"],':busts_in_silhouette:':["1f465"],':boy:':["1f466"],':girl:':["1f467"],':man:':["1f468"],':woman:':["1f469"],':family:':["1f46a"],':couple:':["1f46b"],':two_men_holding_hands:':["1f46c"],':two_women_holding_hands:':["1f46d"],':cop:':["1f46e"],':dancers:':["1f46f"],':bride_with_veil:':["1f470"],':person_with_blond_hair:':["1f471"],':man_with_gua_pi_mao:':["1f472"],':man_with_turban:':["1f473"],':older_man:':["1f474"],':older_woman:':["1f475"],':grandma:':["1f475"],':baby:':["1f476"],':construction_worker:':["1f477"],':princess:':["1f478"],':japanese_ogre:':["1f479"],':japanese_goblin:':["1f47a"],':ghost:':["1f47b"],':angel:':["1f47c"],':alien:':["1f47d"],':space_invader:':["1f47e"],':imp:':["1f47f"],':skull:':["1f480"],':skeleton:':["1f480"],':information_desk_person:':["1f481"],':guardsman:':["1f482"],':dancer:':["1f483"],':lipstick:':["1f484"],':nail_care:':["1f485"],':massage:':["1f486"],':haircut:':["1f487"],':barber:':["1f488"],':syringe:':["1f489"],':pill:':["1f48a"],':kiss:':["1f48b"],':love_letter:':["1f48c"],':ring:':["1f48d"],':gem:':["1f48e"],':couplekiss:':["1f48f"],':bouquet:':["1f490"],':couple_with_heart:':["1f491"],':wedding:':["1f492"],':heartbeat:':["1f493"],':broken_heart:':["1f494"],':two_hearts:':["1f495"],':sparkling_heart:':["1f496"],':heartpulse:':["1f497"],':cupid:':["1f498"],':blue_heart:':["1f499"],':green_heart:':["1f49a"],':yellow_heart:':["1f49b"],':purple_heart:':["1f49c"],':gift_heart:':["1f49d"],':revolving_hearts:':["1f49e"],':heart_decoration:':["1f49f"],':diamond_shape_with_a_dot_inside:':["1f4a0"],':bulb:':["1f4a1"],':anger:':["1f4a2"],':bomb:':["1f4a3"],':zzz:':["1f4a4"],':boom:':["1f4a5"],':sweat_drops:':["1f4a6"],':droplet:':["1f4a7"],':dash:':["1f4a8"],':poop:':["1f4a9"],':shit:':["1f4a9"],':hankey:':["1f4a9"],':poo:':["1f4a9"],':muscle:':["1f4aa"],':dizzy:':["1f4ab"],':speech_balloon:':["1f4ac"],':thought_balloon:':["1f4ad"],':white_flower:':["1f4ae"],':100:':["1f4af"],':moneybag:':["1f4b0"],':currency_exchange:':["1f4b1"],':heavy_dollar_sign:':["1f4b2"],':credit_card:':["1f4b3"],':yen:':["1f4b4"],':dollar:':["1f4b5"],':euro:':["1f4b6"],':pound:':["1f4b7"],':money_with_wings:':["1f4b8"],':chart:':["1f4b9"],':seat:':["1f4ba"],':computer:':["1f4bb"],':briefcase:':["1f4bc"],':minidisc:':["1f4bd"],':floppy_disk:':["1f4be"],':cd:':["1f4bf"],':dvd:':["1f4c0"],':file_folder:':["1f4c1"],':open_file_folder:':["1f4c2"],':page_with_curl:':["1f4c3"],':page_facing_up:':["1f4c4"],':date:':["1f4c5"],':calendar:':["1f4c6"],':card_index:':["1f4c7"],':chart_with_upwards_trend:':["1f4c8"],':chart_with_downwards_trend:':["1f4c9"],':bar_chart:':["1f4ca"],':clipboard:':["1f4cb"],':pushpin:':["1f4cc"],':round_pushpin:':["1f4cd"],':paperclip:':["1f4ce"],':straight_ruler:':["1f4cf"],':triangular_ruler:':["1f4d0"],':bookmark_tabs:':["1f4d1"],':ledger:':["1f4d2"],':notebook:':["1f4d3"],':notebook_with_decorative_cover:':["1f4d4"],':closed_book:':["1f4d5"],':book:':["1f4d6"],':green_book:':["1f4d7"],':blue_book:':["1f4d8"],':orange_book:':["1f4d9"],':books:':["1f4da"],':name_badge:':["1f4db"],':scroll:':["1f4dc"],':pencil:':["1f4dd"],':telephone_receiver:':["1f4de"],':pager:':["1f4df"],':fax:':["1f4e0"],':satellite:':["1f4e1"],':loudspeaker:':["1f4e2"],':mega:':["1f4e3"],':outbox_tray:':["1f4e4"],':inbox_tray:':["1f4e5"],':package:':["1f4e6"],':e-mail:':["1f4e7"],':email:':["1f4e7"],':incoming_envelope:':["1f4e8"],':envelope_with_arrow:':["1f4e9"],':mailbox_closed:':["1f4ea"],':mailbox:':["1f4eb"],':mailbox_with_mail:':["1f4ec"],':mailbox_with_no_mail:':["1f4ed"],':postbox:':["1f4ee"],':postal_horn:':["1f4ef"],':newspaper:':["1f4f0"],':iphone:':["1f4f1"],':calling:':["1f4f2"],':vibration_mode:':["1f4f3"],':mobile_phone_off:':["1f4f4"],':no_mobile_phones:':["1f4f5"],':signal_strength:':["1f4f6"],':camera:':["1f4f7"],':camera_with_flash:':["1f4f8"],':video_camera:':["1f4f9"],':tv:':["1f4fa"],':radio:':["1f4fb"],':vhs:':["1f4fc"],':projector:':["1f4fd"],':film_projector:':["1f4fd"],':twisted_rightwards_arrows:':["1f500"],':repeat:':["1f501"],':repeat_one:':["1f502"],':arrows_clockwise:':["1f503"],':arrows_counterclockwise:':["1f504"],':low_brightness:':["1f505"],':high_brightness:':["1f506"],':mute:':["1f507"],':speaker:':["1f508"],':sound:':["1f509"],':loud_sound:':["1f50a"],':battery:':["1f50b"],':electric_plug:':["1f50c"],':mag:':["1f50d"],':mag_right:':["1f50e"],':lock_with_ink_pen:':["1f50f"],':closed_lock_with_key:':["1f510"],':key:':["1f511"],':lock:':["1f512"],':unlock:':["1f513"],':bell:':["1f514"],':no_bell:':["1f515"],':bookmark:':["1f516"],':link:':["1f517"],':radio_button:':["1f518"],':back:':["1f519"],':end:':["1f51a"],':on:':["1f51b"],':soon:':["1f51c"],':top:':["1f51d"],':underage:':["1f51e"],':keycap_ten:':["1f51f"],':capital_abcd:':["1f520"],':abcd:':["1f521"],':1234:':["1f522"],':symbols:':["1f523"],':abc:':["1f524"],':fire:':["1f525"],':flame:':["1f525"],':flashlight:':["1f526"],':wrench:':["1f527"],':hammer:':["1f528"],':nut_and_bolt:':["1f529"],':knife:':["1f52a"],':gun:':["1f52b"],':microscope:':["1f52c"],':telescope:':["1f52d"],':crystal_ball:':["1f52e"],':six_pointed_star:':["1f52f"],':beginner:':["1f530"],':trident:':["1f531"],':black_square_button:':["1f532"],':white_square_button:':["1f533"],':red_circle:':["1f534"],':large_blue_circle:':["1f535"],':large_orange_diamond:':["1f536"],':large_blue_diamond:':["1f537"],':small_orange_diamond:':["1f538"],':small_blue_diamond:':["1f539"],':small_red_triangle:':["1f53a"],':small_red_triangle_down:':["1f53b"],':arrow_up_small:':["1f53c"],':arrow_down_small:':["1f53d"],':cross_heavy:':["1f547"],':heavy_latin_cross:':["1f547"],':om_symbol:':["1f549"],':dove:':["1f54a"],':dove_of_peace:':["1f54a"],':clock1:':["1f550"],':clock2:':["1f551"],':clock3:':["1f552"],':clock4:':["1f553"],':clock5:':["1f554"],':clock6:':["1f555"],':clock7:':["1f556"],':clock8:':["1f557"],':clock9:':["1f558"],':clock10:':["1f559"],':clock11:':["1f55a"],':clock12:':["1f55b"],':clock130:':["1f55c"],':clock230:':["1f55d"],':clock330:':["1f55e"],':clock430:':["1f55f"],':clock530:':["1f560"],':clock630:':["1f561"],':clock730:':["1f562"],':clock830:':["1f563"],':clock930:':["1f564"],':clock1030:':["1f565"],':clock1130:':["1f566"],':clock1230:':["1f567"],':candle:':["1f56f"],':clock:':["1f570"],':mantlepiece_clock:':["1f570"],':hole:':["1f573"],':levitate:':["1f574"],':man_in_business_suit_levitating:':["1f574"],':spy:':["1f575"],':sleuth_or_spy:':["1f575"],':dark_sunglasses:':["1f576"],':spider:':["1f577"],':spider_web:':["1f578"],':joystick:':["1f579"],':paperclips:':["1f587"],':linked_paperclips:':["1f587"],':pen_ballpoint:':["1f58a"],':lower_left_ballpoint_pen:':["1f58a"],':pen_fountain:':["1f58b"],':lower_left_fountain_pen:':["1f58b"],':paintbrush:':["1f58c"],':lower_left_paintbrush:':["1f58c"],':crayon:':["1f58d"],':lower_left_crayon:':["1f58d"],':writing_hand:':["1f58e"],':left_writing_hand:':["1f58e"],':hand_splayed:':["1f590"],':raised_hand_with_fingers_splayed:':["1f590"],':middle_finger:':["1f595"],':reversed_hand_with_middle_finger_extended:':["1f595"],':vulcan:':["1f596"],':raised_hand_with_part_between_middle_and_ring_fingers:':["1f596"],':desktop:':["1f5a5"],':desktop_computer:':["1f5a5"],':printer:':["1f5a8"],':keyboard:':["1f5ae"],':wired_keyboard:':["1f5ae"],':trackball:':["1f5b2"],':frame_photo:':["1f5bc"],':frame_with_picture:':["1f5bc"],':dividers:':["1f5c2"],':card_index_dividers:':["1f5c2"],':card_box:':["1f5c3"],':card_file_box:':["1f5c3"],':file_cabinet:':["1f5c4"],':wastebasket:':["1f5d1"],':notepad_spiral:':["1f5d2"],':spiral_note_pad:':["1f5d2"],':calendar_spiral:':["1f5d3"],':spiral_calendar_pad:':["1f5d3"],':compression:':["1f5dc"],':key2:':["1f5dd"],':old_key:':["1f5dd"],':newspaper2:':["1f5de"],':rolled_up_newspaper:':["1f5de"],':dagger:':["1f5e1"],':dagger_knife:':["1f5e1"],':speaking_head:':["1f5e3"],':speaking_head_in_silhouette:':["1f5e3"],':anger_right:':["1f5ef"],':right_anger_bubble:':["1f5ef"],':ballot_box:':["1f5f3"],':ballot_box_with_ballot:':["1f5f3"],':map:':["1f5fa"],':world_map:':["1f5fa"],':mount_fuji:':["1f5fb"],':tokyo_tower:':["1f5fc"],':statue_of_liberty:':["1f5fd"],':japan:':["1f5fe"],':moyai:':["1f5ff"],':grinning:':["1f600"],':grin:':["1f601"],':joy:':["1f602"],':smiley:':["1f603"],':smile:':["1f604"],':sweat_smile:':["1f605"],':laughing:':["1f606"],':satisfied:':["1f606"],':innocent:':["1f607"],':smiling_imp:':["1f608"],':wink:':["1f609"],':blush:':["1f60a"],':yum:':["1f60b"],':relieved:':["1f60c"],':heart_eyes:':["1f60d"],':sunglasses:':["1f60e"],':smirk:':["1f60f"],':neutral_face:':["1f610"],':expressionless:':["1f611"],':unamused:':["1f612"],':sweat:':["1f613"],':pensive:':["1f614"],':confused:':["1f615"],':confounded:':["1f616"],':kissing:':["1f617"],':kissing_heart:':["1f618"],':kissing_smiling_eyes:':["1f619"],':kissing_closed_eyes:':["1f61a"],':stuck_out_tongue:':["1f61b"],':stuck_out_tongue_winking_eye:':["1f61c"],':stuck_out_tongue_closed_eyes:':["1f61d"],':disappointed:':["1f61e"],':worried:':["1f61f"],':angry:':["1f620"],':rage:':["1f621"],':cry:':["1f622"],':persevere:':["1f623"],':triumph:':["1f624"],':disappointed_relieved:':["1f625"],':frowning:':["1f626"],':anguished:':["1f627"],':fearful:':["1f628"],':weary:':["1f629"],':sleepy:':["1f62a"],':tired_face:':["1f62b"],':grimacing:':["1f62c"],':sob:':["1f62d"],':open_mouth:':["1f62e"],':hushed:':["1f62f"],':cold_sweat:':["1f630"],':scream:':["1f631"],':astonished:':["1f632"],':flushed:':["1f633"],':sleeping:':["1f634"],':dizzy_face:':["1f635"],':no_mouth:':["1f636"],':mask:':["1f637"],':smile_cat:':["1f638"],':joy_cat:':["1f639"],':smiley_cat:':["1f63a"],':heart_eyes_cat:':["1f63b"],':smirk_cat:':["1f63c"],':kissing_cat:':["1f63d"],':pouting_cat:':["1f63e"],':crying_cat_face:':["1f63f"],':scream_cat:':["1f640"],':slight_frown:':["1f641"],':slightly_frowning_face:':["1f641"],':slight_smile:':["1f642"],':slightly_smiling_face:':["1f642"],':no_good:':["1f645"],':ok_woman:':["1f646"],':bow:':["1f647"],':see_no_evil:':["1f648"],':hear_no_evil:':["1f649"],':speak_no_evil:':["1f64a"],':raising_hand:':["1f64b"],':raised_hands:':["1f64c"],':person_frowning:':["1f64d"],':person_with_pouting_face:':["1f64e"],':pray:':["1f64f"],':rocket:':["1f680"],':helicopter:':["1f681"],':steam_locomotive:':["1f682"],':railway_car:':["1f683"],':bullettrain_side:':["1f684"],':bullettrain_front:':["1f685"],':train2:':["1f686"],':metro:':["1f687"],':light_rail:':["1f688"],':station:':["1f689"],':tram:':["1f68a"],':train:':["1f68b"],':bus:':["1f68c"],':oncoming_bus:':["1f68d"],':trolleybus:':["1f68e"],':busstop:':["1f68f"],':minibus:':["1f690"],':ambulance:':["1f691"],':fire_engine:':["1f692"],':police_car:':["1f693"],':oncoming_police_car:':["1f694"],':taxi:':["1f695"],':oncoming_taxi:':["1f696"],':red_car:':["1f697"],':oncoming_automobile:':["1f698"],':blue_car:':["1f699"],':truck:':["1f69a"],':articulated_lorry:':["1f69b"],':tractor:':["1f69c"],':monorail:':["1f69d"],':mountain_railway:':["1f69e"],':suspension_railway:':["1f69f"],':mountain_cableway:':["1f6a0"],':aerial_tramway:':["1f6a1"],':ship:':["1f6a2"],':rowboat:':["1f6a3"],':speedboat:':["1f6a4"],':traffic_light:':["1f6a5"],':vertical_traffic_light:':["1f6a6"],':construction:':["1f6a7"],':rotating_light:':["1f6a8"],':triangular_flag_on_post:':["1f6a9"],':door:':["1f6aa"],':no_entry_sign:':["1f6ab"],':smoking:':["1f6ac"],':no_smoking:':["1f6ad"],':put_litter_in_its_place:':["1f6ae"],':do_not_litter:':["1f6af"],':potable_water:':["1f6b0"],':non-potable_water:':["1f6b1"],':bike:':["1f6b2"],':no_bicycles:':["1f6b3"],':bicyclist:':["1f6b4"],':mountain_bicyclist:':["1f6b5"],':walking:':["1f6b6"],':no_pedestrians:':["1f6b7"],':children_crossing:':["1f6b8"],':mens:':["1f6b9"],':womens:':["1f6ba"],':restroom:':["1f6bb"],':baby_symbol:':["1f6bc"],':toilet:':["1f6bd"],':wc:':["1f6be"],':shower:':["1f6bf"],':bath:':["1f6c0"],':bathtub:':["1f6c1"],':passport_control:':["1f6c2"],':customs:':["1f6c3"],':baggage_claim:':["1f6c4"],':left_luggage:':["1f6c5"],':couch:':["1f6cb"],':couch_and_lamp:':["1f6cb"],':sleeping_accommodation:':["1f6cc"],':shopping_bags:':["1f6cd"],':bellhop:':["1f6ce"],':bellhop_bell:':["1f6ce"],':bed:':["1f6cf"],':tools:':["1f6e0"],':hammer_and_wrench:':["1f6e0"],':shield:':["1f6e1"],':oil:':["1f6e2"],':oil_drum:':["1f6e2"],':motorway:':["1f6e3"],':railway_track:':["1f6e4"],':railroad_track:':["1f6e4"],':motorboat:':["1f6e5"],':airplane_small:':["1f6e9"],':small_airplane:':["1f6e9"],':airplane_departure:':["1f6eb"],':airplane_arriving:':["1f6ec"],':satellite_orbital:':["1f6f0"],':cruise_ship:':["1f6f3"],':passenger_ship:':["1f6f3"],':bangbang:':["203c-fe0f","203c"],':interrobang:':["2049-fe0f","2049"],':tm:':["2122-fe0f","2122"],':information_source:':["2139-fe0f","2139"],':left_right_arrow:':["2194-fe0f","2194"],':arrow_up_down:':["2195-fe0f","2195"],':arrow_upper_left:':["2196-fe0f","2196"],':arrow_upper_right:':["2197-fe0f","2197"],':arrow_lower_right:':["2198-fe0f","2198"],':arrow_lower_left:':["2199-fe0f","2199"],':leftwards_arrow_with_hook:':["21a9-fe0f","21a9"],':arrow_right_hook:':["21aa-fe0f","21aa"],':watch:':["231a-fe0f","231a"],':hourglass:':["231b-fe0f","231b"],':fast_forward:':["23e9"],':rewind:':["23ea"],':arrow_double_up:':["23eb"],':arrow_double_down:':["23ec"],':alarm_clock:':["23f0"],':hourglass_flowing_sand:':["23f3"],':m:':["24c2-fe0f","24c2"],':black_small_square:':["25aa-fe0f","25aa"],':white_small_square:':["25ab-fe0f","25ab"],':arrow_forward:':["25b6-fe0f","25b6"],':arrow_backward:':["25c0-fe0f","25c0"],':white_medium_square:':["25fb-fe0f","25fb"],':black_medium_square:':["25fc-fe0f","25fc"],':white_medium_small_square:':["25fd-fe0f","25fd"],':black_medium_small_square:':["25fe-fe0f","25fe"],':sunny:':["2600-fe0f","2600"],':cloud:':["2601-fe0f","2601"],':telephone:':["260e-fe0f","260e"],':ballot_box_with_check:':["2611-fe0f","2611"],':umbrella:':["2614-fe0f","2614"],':coffee:':["2615-fe0f","2615"],':point_up:':["261d-fe0f","261d"],':relaxed:':["263a-fe0f","263a"],':aries:':["2648-fe0f","2648"],':taurus:':["2649-fe0f","2649"],':gemini:':["264a-fe0f","264a"],':cancer:':["264b-fe0f","264b"],':leo:':["264c-fe0f","264c"],':virgo:':["264d-fe0f","264d"],':libra:':["264e-fe0f","264e"],':scorpius:':["264f-fe0f","264f"],':sagittarius:':["2650-fe0f","2650"],':capricorn:':["2651-fe0f","2651"],':aquarius:':["2652-fe0f","2652"],':pisces:':["2653-fe0f","2653"],':spades:':["2660-fe0f","2660"],':clubs:':["2663-fe0f","2663"],':hearts:':["2665-fe0f","2665"],':diamonds:':["2666-fe0f","2666"],':hotsprings:':["2668-fe0f","2668"],':recycle:':["267b-fe0f","267b"],':wheelchair:':["267f-fe0f","267f"],':anchor:':["2693-fe0f","2693"],':warning:':["26a0-fe0f","26a0"],':zap:':["26a1-fe0f","26a1"],':white_circle:':["26aa-fe0f","26aa"],':black_circle:':["26ab-fe0f","26ab"],':soccer:':["26bd-fe0f","26bd"],':baseball:':["26be-fe0f","26be"],':snowman:':["26c4-fe0f","26c4"],':partly_sunny:':["26c5-fe0f","26c5"],':ophiuchus:':["26ce"],':no_entry:':["26d4-fe0f","26d4"],':church:':["26ea-fe0f","26ea"],':fountain:':["26f2-fe0f","26f2"],':golf:':["26f3-fe0f","26f3"],':sailboat:':["26f5-fe0f","26f5"],':tent:':["26fa-fe0f","26fa"],':fuelpump:':["26fd-fe0f","26fd"],':scissors:':["2702-fe0f","2702"],':white_check_mark:':["2705"],':airplane:':["2708-fe0f","2708"],':envelope:':["2709-fe0f","2709"],':fist:':["270a"],':raised_hand:':["270b"],':v:':["270c-fe0f","270c"],':pencil2:':["270f-fe0f","270f"],':black_nib:':["2712-fe0f","2712"],':heavy_check_mark:':["2714-fe0f","2714"],':heavy_multiplication_x:':["2716-fe0f","2716"],':sparkles:':["2728"],':eight_spoked_asterisk:':["2733-fe0f","2733"],':eight_pointed_black_star:':["2734-fe0f","2734"],':snowflake:':["2744-fe0f","2744"],':sparkle:':["2747-fe0f","2747"],':x:':["274c"],':negative_squared_cross_mark:':["274e"],':question:':["2753"],':grey_question:':["2754"],':grey_exclamation:':["2755"],':exclamation:':["2757-fe0f","2757"],':heart:':["2764-fe0f","2764"],':heavy_plus_sign:':["2795"],':heavy_minus_sign:':["2796"],':heavy_division_sign:':["2797"],':arrow_right:':["27a1-fe0f","27a1"],':curly_loop:':["27b0"],':loop:':["27bf"],':arrow_heading_up:':["2934-fe0f","2934"],':arrow_heading_down:':["2935-fe0f","2935"],':arrow_left:':["2b05-fe0f","2b05"],':arrow_up:':["2b06-fe0f","2b06"],':arrow_down:':["2b07-fe0f","2b07"],':black_large_square:':["2b1b-fe0f","2b1b"],':white_large_square:':["2b1c-fe0f","2b1c"],':star:':["2b50-fe0f","2b50"],':o:':["2b55-fe0f","2b55"],':wavy_dash:':["3030"],':part_alternation_mark:':["303d-fe0f","303d"],':congratulations:':["3297-fe0f","3297"],':secret:':["3299-fe0f","3299"]};
	    ns.shortnames = Object.keys(ns.emojioneList).map(function(emoji) {
	        return emoji.replace(/[+]/g, "\\$&");
	    }).join('|');
	    ns.asciiList = {
	        '<3':'2764',
	        '</3':'1f494',
	        ':\')':'1f602',
	        ':\'-)':'1f602',
	        ':D':'1f603',
	        ':-D':'1f603',
	        '=D':'1f603',
	        ':)':'1f604',
	        ':-)':'1f604',
	        '=]':'1f604',
	        '=)':'1f604',
	        ':]':'1f604',
	        '\':)':'1f605',
	        '\':-)':'1f605',
	        '\'=)':'1f605',
	        '\':D':'1f605',
	        '\':-D':'1f605',
	        '\'=D':'1f605',
	        '>:)':'1f606',
	        '>;)':'1f606',
	        '>:-)':'1f606',
	        '>=)':'1f606',
	        ';)':'1f609',
	        ';-)':'1f609',
	        '*-)':'1f609',
	        '*)':'1f609',
	        ';-]':'1f609',
	        ';]':'1f609',
	        ';D':'1f609',
	        ';^)':'1f609',
	        '\':(':'1f613',
	        '\':-(':'1f613',
	        '\'=(':'1f613',
	        ':*':'1f618',
	        ':-*':'1f618',
	        '=*':'1f618',
	        ':^*':'1f618',
	        '>:P':'1f61c',
	        'X-P':'1f61c',
	        'x-p':'1f61c',
	        '>:[':'1f61e',
	        ':-(':'1f61e',
	        ':(':'1f61e',
	        ':-[':'1f61e',
	        ':[':'1f61e',
	        '=(':'1f61e',
	        '>:(':'1f620',
	        '>:-(':'1f620',
	        ':@':'1f620',
	        ':\'(':'1f622',
	        ':\'-(':'1f622',
	        ';(':'1f622',
	        ';-(':'1f622',
	        '>.<':'1f623',
	        'D:':'1f628',
	        ':$':'1f633',
	        '=$':'1f633',
	        '#-)':'1f635',
	        '#)':'1f635',
	        '%-)':'1f635',
	        '%)':'1f635',
	        'X)':'1f635',
	        'X-)':'1f635',
	        '*\\0/*':'1f646',
	        '\\0/':'1f646',
	        '*\\O/*':'1f646',
	        '\\O/':'1f646',
	        'O:-)':'1f607',
	        '0:-3':'1f607',
	        '0:3':'1f607',
	        '0:-)':'1f607',
	        '0:)':'1f607',
	        '0;^)':'1f607',
	        'O:)':'1f607',
	        'O;-)':'1f607',
	        'O=)':'1f607',
	        '0;-)':'1f607',
	        'O:-3':'1f607',
	        'O:3':'1f607',
	        'B-)':'1f60e',
	        'B)':'1f60e',
	        '8)':'1f60e',
	        '8-)':'1f60e',
	        'B-D':'1f60e',
	        '8-D':'1f60e',
	        '-_-':'1f611',
	        '-__-':'1f611',
	        '-___-':'1f611',
	        '>:\\':'1f615',
	        '>:/':'1f615',
	        ':-/':'1f615',
	        ':-.':'1f615',
	        ':/':'1f615',
	        ':\\':'1f615',
	        '=/':'1f615',
	        '=\\':'1f615',
	        ':L':'1f615',
	        '=L':'1f615',
	        ':P':'1f61b',
	        ':-P':'1f61b',
	        '=P':'1f61b',
	        ':-p':'1f61b',
	        ':p':'1f61b',
	        '=p':'1f61b',
	        ':-Þ':'1f61b',
	        ':Þ':'1f61b',
	        ':þ':'1f61b',
	        ':-þ':'1f61b',
	        ':-b':'1f61b',
	        ':b':'1f61b',
	        'd:':'1f61b',
	        ':-O':'1f62e',
	        ':O':'1f62e',
	        ':-o':'1f62e',
	        ':o':'1f62e',
	        'O_O':'1f62e',
	        '>:O':'1f62e',
	        ':-X':'1f636',
	        ':X':'1f636',
	        ':-#':'1f636',
	        ':#':'1f636',
	        '=X':'1f636',
	        '=x':'1f636',
	        ':x':'1f636',
	        ':-x':'1f636',
	        '=#':'1f636'
	    };
	    ns.asciiRegexp = '(\\<3|&lt;3|\\<\\/3|&lt;\\/3|\\:\'\\)|\\:\'\\-\\)|\\:D|\\:\\-D|\\=D|\\:\\)|\\:\\-\\)|\\=\\]|\\=\\)|\\:\\]|\'\\:\\)|\'\\:\\-\\)|\'\\=\\)|\'\\:D|\'\\:\\-D|\'\\=D|\\>\\:\\)|&gt;\\:\\)|\\>;\\)|&gt;;\\)|\\>\\:\\-\\)|&gt;\\:\\-\\)|\\>\\=\\)|&gt;\\=\\)|;\\)|;\\-\\)|\\*\\-\\)|\\*\\)|;\\-\\]|;\\]|;D|;\\^\\)|\'\\:\\(|\'\\:\\-\\(|\'\\=\\(|\\:\\*|\\:\\-\\*|\\=\\*|\\:\\^\\*|\\>\\:P|&gt;\\:P|X\\-P|x\\-p|\\>\\:\\[|&gt;\\:\\[|\\:\\-\\(|\\:\\(|\\:\\-\\[|\\:\\[|\\=\\(|\\>\\:\\(|&gt;\\:\\(|\\>\\:\\-\\(|&gt;\\:\\-\\(|\\:@|\\:\'\\(|\\:\'\\-\\(|;\\(|;\\-\\(|\\>\\.\\<|&gt;\\.&lt;|D:|\\:\\$|\\=\\$|#\\-\\)|#\\)|%\\-\\)|%\\)|X\\)|X\\-\\)|\\*\\\\0\\/\\*|\\\\0\\/|\\*\\\\O\\/\\*|\\\\O\\/|O\\:\\-\\)|0\\:\\-3|0\\:3|0\\:\\-\\)|0\\:\\)|0;\\^\\)|O\\:\\-\\)|O\\:\\)|O;\\-\\)|O\\=\\)|0;\\-\\)|O\\:\\-3|O\\:3|B\\-\\)|B\\)|8\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\-__\\-|\\-___\\-|\\>\\:\\\\|&gt;\\:\\\\|\\>\\:\\/|&gt;\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\:\\-P|\\=P|\\:\\-p|\\:p|\\=p|\\:\\-Þ|\\:\\-&THORN;|\\:Þ|\\:&THORN;|\\:þ|\\:&thorn;|\\:\\-þ|\\:\\-&thorn;|\\:\\-b|\\:b|d\\:|\\:\\-O|\\:O|\\:\\-o|\\:o|O_O|\\>\\:O|&gt;\\:O|\\:\\-X|\\:X|\\:\\-#|\\:#|\\=X|\\=x|\\:x|\\:\\-x|\\=#)';
	    // javascript escapes here must be ordered from largest length to shortest
	    ns.unicodeRegexp = '(\\uD83D\\uDC69\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC8B\\u200D\\uD83D\\uDC69|\\uD83D\\uDC68\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC8B\\u200D\\uD83D\\uDC68|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC69|\\uD83D\\uDC68\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC68|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67|#\\uFE0F\\u20E3|0\\uFE0F\\u20E3|1\\uFE0F\\u20E3|2\\uFE0F\\u20E3|3\\uFE0F\\u20E3|4\\uFE0F\\u20E3|5\\uFE0F\\u20E3|6\\uFE0F\\u20E3|7\\uFE0F\\u20E3|8\\uFE0F\\u20E3|9\\uFE0F\\u20E3|\\uD83C\\uDDE6\\uD83C\\uDDE8|\\uD83C\\uDDE6\\uD83C\\uDDE9|\\uD83C\\uDDE6\\uD83C\\uDDEA|\\uD83C\\uDDE6\\uD83C\\uDDEB|\\uD83C\\uDDE6\\uD83C\\uDDEC|\\uD83C\\uDDE6\\uD83C\\uDDEE|\\uD83C\\uDDE6\\uD83C\\uDDF1|\\uD83C\\uDDE6\\uD83C\\uDDF2|\\uD83C\\uDDE6\\uD83C\\uDDF4|\\uD83C\\uDDE6\\uD83C\\uDDF7|\\uD83C\\uDDE6\\uD83C\\uDDF9|\\uD83C\\uDDE6\\uD83C\\uDDFA|\\uD83C\\uDDE6\\uD83C\\uDDFC|\\uD83C\\uDDE6\\uD83C\\uDDFF|\\uD83C\\uDDE7\\uD83C\\uDDE6|\\uD83C\\uDDE7\\uD83C\\uDDE7|\\uD83C\\uDDE7\\uD83C\\uDDE9|\\uD83C\\uDDE7\\uD83C\\uDDEA|\\uD83C\\uDDE7\\uD83C\\uDDEB|\\uD83C\\uDDE7\\uD83C\\uDDEC|\\uD83C\\uDDE7\\uD83C\\uDDED|\\uD83C\\uDDE7\\uD83C\\uDDEE|\\uD83C\\uDDE7\\uD83C\\uDDEF|\\uD83C\\uDDE7\\uD83C\\uDDF2|\\uD83C\\uDDE7\\uD83C\\uDDF3|\\uD83C\\uDDE7\\uD83C\\uDDF4|\\uD83C\\uDDE7\\uD83C\\uDDF7|\\uD83C\\uDDE7\\uD83C\\uDDF8|\\uD83C\\uDDE7\\uD83C\\uDDF9|\\uD83C\\uDDE7\\uD83C\\uDDFC|\\uD83C\\uDDE7\\uD83C\\uDDFE|\\uD83C\\uDDE7\\uD83C\\uDDFF|\\uD83C\\uDDE8\\uD83C\\uDDE6|\\uD83C\\uDDE8\\uD83C\\uDDE9|\\uD83C\\uDDE8\\uD83C\\uDDEB|\\uD83C\\uDDE8\\uD83C\\uDDEC|\\uD83C\\uDDE8\\uD83C\\uDDED|\\uD83C\\uDDE8\\uD83C\\uDDEE|\\uD83C\\uDDE8\\uD83C\\uDDF1|\\uD83C\\uDDE8\\uD83C\\uDDF2|\\uD83C\\uDDE8\\uD83C\\uDDF3|\\uD83C\\uDDE8\\uD83C\\uDDF4|\\uD83C\\uDDE8\\uD83C\\uDDF7|\\uD83C\\uDDE8\\uD83C\\uDDFA|\\uD83C\\uDDE8\\uD83C\\uDDFB|\\uD83C\\uDDE8\\uD83C\\uDDFE|\\uD83C\\uDDE8\\uD83C\\uDDFF|\\uD83C\\uDDE9\\uD83C\\uDDEA|\\uD83C\\uDDE9\\uD83C\\uDDEF|\\uD83C\\uDDE9\\uD83C\\uDDF0|\\uD83C\\uDDE9\\uD83C\\uDDF2|\\uD83C\\uDDE9\\uD83C\\uDDF4|\\uD83C\\uDDE9\\uD83C\\uDDFF|\\uD83C\\uDDEA\\uD83C\\uDDE8|\\uD83C\\uDDEA\\uD83C\\uDDEA|\\uD83C\\uDDEA\\uD83C\\uDDEC|\\uD83C\\uDDEA\\uD83C\\uDDED|\\uD83C\\uDDEA\\uD83C\\uDDF7|\\uD83C\\uDDEA\\uD83C\\uDDF8|\\uD83C\\uDDEA\\uD83C\\uDDF9|\\uD83C\\uDDEB\\uD83C\\uDDEE|\\uD83C\\uDDEB\\uD83C\\uDDEF|\\uD83C\\uDDEB\\uD83C\\uDDF0|\\uD83C\\uDDEB\\uD83C\\uDDF2|\\uD83C\\uDDEB\\uD83C\\uDDF4|\\uD83C\\uDDEB\\uD83C\\uDDF7|\\uD83C\\uDDEC\\uD83C\\uDDE6|\\uD83C\\uDDEC\\uD83C\\uDDE7|\\uD83C\\uDDEC\\uD83C\\uDDE9|\\uD83C\\uDDEC\\uD83C\\uDDEA|\\uD83C\\uDDEC\\uD83C\\uDDED|\\uD83C\\uDDEC\\uD83C\\uDDEE|\\uD83C\\uDDEC\\uD83C\\uDDF1|\\uD83C\\uDDEC\\uD83C\\uDDF2|\\uD83C\\uDDEC\\uD83C\\uDDF3|\\uD83C\\uDDEC\\uD83C\\uDDF6|\\uD83C\\uDDEC\\uD83C\\uDDF7|\\uD83C\\uDDEC\\uD83C\\uDDF9|\\uD83C\\uDDEC\\uD83C\\uDDFA|\\uD83C\\uDDEC\\uD83C\\uDDFC|\\uD83C\\uDDEC\\uD83C\\uDDFE|\\uD83C\\uDDED\\uD83C\\uDDF0|\\uD83C\\uDDED\\uD83C\\uDDF3|\\uD83C\\uDDED\\uD83C\\uDDF7|\\uD83C\\uDDED\\uD83C\\uDDF9|\\uD83C\\uDDED\\uD83C\\uDDFA|\\uD83C\\uDDEE\\uD83C\\uDDE9|\\uD83C\\uDDEE\\uD83C\\uDDEA|\\uD83C\\uDDEE\\uD83C\\uDDF1|\\uD83C\\uDDEE\\uD83C\\uDDF3|\\uD83C\\uDDEE\\uD83C\\uDDF6|\\uD83C\\uDDEE\\uD83C\\uDDF7|\\uD83C\\uDDEE\\uD83C\\uDDF8|\\uD83C\\uDDEE\\uD83C\\uDDF9|\\uD83C\\uDDEF\\uD83C\\uDDEA|\\uD83C\\uDDEF\\uD83C\\uDDF2|\\uD83C\\uDDEF\\uD83C\\uDDF4|\\uD83C\\uDDEF\\uD83C\\uDDF5|\\uD83C\\uDDF0\\uD83C\\uDDEA|\\uD83C\\uDDF0\\uD83C\\uDDEC|\\uD83C\\uDDF0\\uD83C\\uDDED|\\uD83C\\uDDF0\\uD83C\\uDDEE|\\uD83C\\uDDF0\\uD83C\\uDDF2|\\uD83C\\uDDF0\\uD83C\\uDDF3|\\uD83C\\uDDF0\\uD83C\\uDDF5|\\uD83C\\uDDF0\\uD83C\\uDDF7|\\uD83C\\uDDF0\\uD83C\\uDDFC|\\uD83C\\uDDF0\\uD83C\\uDDFE|\\uD83C\\uDDF0\\uD83C\\uDDFF|\\uD83C\\uDDF1\\uD83C\\uDDE6|\\uD83C\\uDDF1\\uD83C\\uDDE7|\\uD83C\\uDDF1\\uD83C\\uDDE8|\\uD83C\\uDDF1\\uD83C\\uDDEE|\\uD83C\\uDDF1\\uD83C\\uDDF0|\\uD83C\\uDDF1\\uD83C\\uDDF7|\\uD83C\\uDDF1\\uD83C\\uDDF8|\\uD83C\\uDDF1\\uD83C\\uDDF9|\\uD83C\\uDDF1\\uD83C\\uDDFA|\\uD83C\\uDDF1\\uD83C\\uDDFB|\\uD83C\\uDDF1\\uD83C\\uDDFE|\\uD83C\\uDDF2\\uD83C\\uDDE6|\\uD83C\\uDDF2\\uD83C\\uDDE8|\\uD83C\\uDDF2\\uD83C\\uDDE9|\\uD83C\\uDDF2\\uD83C\\uDDEA|\\uD83C\\uDDF2\\uD83C\\uDDEC|\\uD83C\\uDDF2\\uD83C\\uDDED|\\uD83C\\uDDF2\\uD83C\\uDDF0|\\uD83C\\uDDF2\\uD83C\\uDDF1|\\uD83C\\uDDF2\\uD83C\\uDDF2|\\uD83C\\uDDF2\\uD83C\\uDDF3|\\uD83C\\uDDF2\\uD83C\\uDDF4|\\uD83C\\uDDF2\\uD83C\\uDDF7|\\uD83C\\uDDF2\\uD83C\\uDDF8|\\uD83C\\uDDF2\\uD83C\\uDDF9|\\uD83C\\uDDF2\\uD83C\\uDDFA|\\uD83C\\uDDF2\\uD83C\\uDDFB|\\uD83C\\uDDF2\\uD83C\\uDDFC|\\uD83C\\uDDF2\\uD83C\\uDDFD|\\uD83C\\uDDF2\\uD83C\\uDDFE|\\uD83C\\uDDF2\\uD83C\\uDDFF|\\uD83C\\uDDF3\\uD83C\\uDDE6|\\uD83C\\uDDF3\\uD83C\\uDDE8|\\uD83C\\uDDF3\\uD83C\\uDDEA|\\uD83C\\uDDF3\\uD83C\\uDDEC|\\uD83C\\uDDF3\\uD83C\\uDDEE|\\uD83C\\uDDF3\\uD83C\\uDDF1|\\uD83C\\uDDF3\\uD83C\\uDDF4|\\uD83C\\uDDF3\\uD83C\\uDDF5|\\uD83C\\uDDF3\\uD83C\\uDDF7|\\uD83C\\uDDF3\\uD83C\\uDDFA|\\uD83C\\uDDF3\\uD83C\\uDDFF|\\uD83C\\uDDF4\\uD83C\\uDDF2|\\uD83C\\uDDF5\\uD83C\\uDDE6|\\uD83C\\uDDF5\\uD83C\\uDDEA|\\uD83C\\uDDF5\\uD83C\\uDDEB|\\uD83C\\uDDF5\\uD83C\\uDDEC|\\uD83C\\uDDF5\\uD83C\\uDDED|\\uD83C\\uDDF5\\uD83C\\uDDF0|\\uD83C\\uDDF5\\uD83C\\uDDF1|\\uD83C\\uDDF5\\uD83C\\uDDF7|\\uD83C\\uDDF5\\uD83C\\uDDF8|\\uD83C\\uDDF5\\uD83C\\uDDF9|\\uD83C\\uDDF5\\uD83C\\uDDFC|\\uD83C\\uDDF5\\uD83C\\uDDFE|\\uD83C\\uDDF6\\uD83C\\uDDE6|\\uD83C\\uDDF7\\uD83C\\uDDF4|\\uD83C\\uDDF7\\uD83C\\uDDF8|\\uD83C\\uDDF7\\uD83C\\uDDFA|\\uD83C\\uDDF7\\uD83C\\uDDFC|\\uD83C\\uDDF8\\uD83C\\uDDE6|\\uD83C\\uDDF8\\uD83C\\uDDE7|\\uD83C\\uDDF8\\uD83C\\uDDE8|\\uD83C\\uDDF8\\uD83C\\uDDE9|\\uD83C\\uDDF8\\uD83C\\uDDEA|\\uD83C\\uDDF8\\uD83C\\uDDEC|\\uD83C\\uDDF8\\uD83C\\uDDED|\\uD83C\\uDDF8\\uD83C\\uDDEE|\\uD83C\\uDDF8\\uD83C\\uDDF0|\\uD83C\\uDDF8\\uD83C\\uDDF1|\\uD83C\\uDDF8\\uD83C\\uDDF2|\\uD83C\\uDDF8\\uD83C\\uDDF3|\\uD83C\\uDDF8\\uD83C\\uDDF4|\\uD83C\\uDDF8\\uD83C\\uDDF7|\\uD83C\\uDDF8\\uD83C\\uDDF9|\\uD83C\\uDDF8\\uD83C\\uDDFB|\\uD83C\\uDDF8\\uD83C\\uDDFE|\\uD83C\\uDDF8\\uD83C\\uDDFF|\\uD83C\\uDDF9\\uD83C\\uDDE9|\\uD83C\\uDDF9\\uD83C\\uDDEC|\\uD83C\\uDDF9\\uD83C\\uDDED|\\uD83C\\uDDF9\\uD83C\\uDDEF|\\uD83C\\uDDF9\\uD83C\\uDDF1|\\uD83C\\uDDF9\\uD83C\\uDDF2|\\uD83C\\uDDF9\\uD83C\\uDDF3|\\uD83C\\uDDF9\\uD83C\\uDDF4|\\uD83C\\uDDF9\\uD83C\\uDDF7|\\uD83C\\uDDF9\\uD83C\\uDDF9|\\uD83C\\uDDF9\\uD83C\\uDDFB|\\uD83C\\uDDF9\\uD83C\\uDDFC|\\uD83C\\uDDF9\\uD83C\\uDDFF|\\uD83C\\uDDFA\\uD83C\\uDDE6|\\uD83C\\uDDFA\\uD83C\\uDDEC|\\uD83C\\uDDFA\\uD83C\\uDDF8|\\uD83C\\uDDFA\\uD83C\\uDDFE|\\uD83C\\uDDFA\\uD83C\\uDDFF|\\uD83C\\uDDFB\\uD83C\\uDDE6|\\uD83C\\uDDFB\\uD83C\\uDDE8|\\uD83C\\uDDFB\\uD83C\\uDDEA|\\uD83C\\uDDFB\\uD83C\\uDDEE|\\uD83C\\uDDFB\\uD83C\\uDDF3|\\uD83C\\uDDFB\\uD83C\\uDDFA|\\uD83C\\uDDFC\\uD83C\\uDDEB|\\uD83C\\uDDFC\\uD83C\\uDDF8|\\uD83C\\uDDFD\\uD83C\\uDDF0|\\uD83C\\uDDFE\\uD83C\\uDDEA|\\uD83C\\uDDFF\\uD83C\\uDDE6|\\uD83C\\uDDFF\\uD83C\\uDDF2|\\uD83C\\uDDFF\\uD83C\\uDDFC|\\u00A9\\uFE0F|\\u00AE\\uFE0F|\\uD83C\\uDC04\\uFE0F|\\uD83C\\uDCCF|\\uD83C\\uDD70|\\uD83C\\uDD71|\\uD83C\\uDD7E|\\uD83C\\uDD7F\\uFE0F|\\uD83C\\uDD8E|\\uD83C\\uDD91|\\uD83C\\uDD92|\\uD83C\\uDD93|\\uD83C\\uDD94|\\uD83C\\uDD95|\\uD83C\\uDD96|\\uD83C\\uDD97|\\uD83C\\uDD98|\\uD83C\\uDD99|\\uD83C\\uDD9A|\\uD83C\\uDE01|\\uD83C\\uDE02|\\uD83C\\uDE1A\\uFE0F|\\uD83C\\uDE2F\\uFE0F|\\uD83C\\uDE32|\\uD83C\\uDE33|\\uD83C\\uDE34|\\uD83C\\uDE35|\\uD83C\\uDE36|\\uD83C\\uDE37|\\uD83C\\uDE38|\\uD83C\\uDE39|\\uD83C\\uDE3A|\\uD83C\\uDE50|\\uD83C\\uDE51|\\uD83C\\uDF00|\\uD83C\\uDF01|\\uD83C\\uDF02|\\uD83C\\uDF03|\\uD83C\\uDF04|\\uD83C\\uDF05|\\uD83C\\uDF06|\\uD83C\\uDF07|\\uD83C\\uDF08|\\uD83C\\uDF09|\\uD83C\\uDF0A|\\uD83C\\uDF0B|\\uD83C\\uDF0C|\\uD83C\\uDF0D|\\uD83C\\uDF0E|\\uD83C\\uDF0F|\\uD83C\\uDF10|\\uD83C\\uDF11|\\uD83C\\uDF12|\\uD83C\\uDF13|\\uD83C\\uDF14|\\uD83C\\uDF15|\\uD83C\\uDF16|\\uD83C\\uDF17|\\uD83C\\uDF18|\\uD83C\\uDF19|\\uD83C\\uDF1A|\\uD83C\\uDF1B|\\uD83C\\uDF1C|\\uD83C\\uDF1D|\\uD83C\\uDF1E|\\uD83C\\uDF1F|\\uD83C\\uDF20|\\uD83C\\uDF21|\\uD83C\\uDF27|\\uD83C\\uDF28|\\uD83C\\uDF29|\\uD83C\\uDF2A|\\uD83C\\uDF2B|\\uD83C\\uDF2C|\\uD83C\\uDF30|\\uD83C\\uDF31|\\uD83C\\uDF32|\\uD83C\\uDF33|\\uD83C\\uDF34|\\uD83C\\uDF35|\\uD83C\\uDF36|\\uD83C\\uDF37|\\uD83C\\uDF38|\\uD83C\\uDF39|\\uD83C\\uDF3A|\\uD83C\\uDF3B|\\uD83C\\uDF3C|\\uD83C\\uDF3D|\\uD83C\\uDF3E|\\uD83C\\uDF3F|\\uD83C\\uDF40|\\uD83C\\uDF41|\\uD83C\\uDF42|\\uD83C\\uDF43|\\uD83C\\uDF44|\\uD83C\\uDF45|\\uD83C\\uDF46|\\uD83C\\uDF47|\\uD83C\\uDF48|\\uD83C\\uDF49|\\uD83C\\uDF4A|\\uD83C\\uDF4B|\\uD83C\\uDF4C|\\uD83C\\uDF4D|\\uD83C\\uDF4E|\\uD83C\\uDF4F|\\uD83C\\uDF50|\\uD83C\\uDF51|\\uD83C\\uDF52|\\uD83C\\uDF53|\\uD83C\\uDF54|\\uD83C\\uDF55|\\uD83C\\uDF56|\\uD83C\\uDF57|\\uD83C\\uDF58|\\uD83C\\uDF59|\\uD83C\\uDF5A|\\uD83C\\uDF5B|\\uD83C\\uDF5C|\\uD83C\\uDF5D|\\uD83C\\uDF5E|\\uD83C\\uDF5F|\\uD83C\\uDF60|\\uD83C\\uDF61|\\uD83C\\uDF62|\\uD83C\\uDF63|\\uD83C\\uDF64|\\uD83C\\uDF65|\\uD83C\\uDF66|\\uD83C\\uDF67|\\uD83C\\uDF68|\\uD83C\\uDF69|\\uD83C\\uDF6A|\\uD83C\\uDF6B|\\uD83C\\uDF6C|\\uD83C\\uDF6D|\\uD83C\\uDF6E|\\uD83C\\uDF6F|\\uD83C\\uDF70|\\uD83C\\uDF71|\\uD83C\\uDF72|\\uD83C\\uDF73|\\uD83C\\uDF74|\\uD83C\\uDF75|\\uD83C\\uDF76|\\uD83C\\uDF77|\\uD83C\\uDF78|\\uD83C\\uDF79|\\uD83C\\uDF7A|\\uD83C\\uDF7B|\\uD83C\\uDF7C|\\uD83C\\uDF7D|\\uD83C\\uDF80|\\uD83C\\uDF81|\\uD83C\\uDF82|\\uD83C\\uDF83|\\uD83C\\uDF84|\\uD83C\\uDF85|\\uD83C\\uDF86|\\uD83C\\uDF87|\\uD83C\\uDF88|\\uD83C\\uDF89|\\uD83C\\uDF8A|\\uD83C\\uDF8B|\\uD83C\\uDF8C|\\uD83C\\uDF8D|\\uD83C\\uDF8E|\\uD83C\\uDF8F|\\uD83C\\uDF90|\\uD83C\\uDF91|\\uD83C\\uDF92|\\uD83C\\uDF93|\\uD83C\\uDF96|\\uD83C\\uDF97|\\uD83C\\uDF99|\\uD83C\\uDF9A|\\uD83C\\uDF9B|\\uD83C\\uDF9E|\\uD83C\\uDF9F|\\uD83C\\uDFA0|\\uD83C\\uDFA1|\\uD83C\\uDFA2|\\uD83C\\uDFA3|\\uD83C\\uDFA4|\\uD83C\\uDFA5|\\uD83C\\uDFA6|\\uD83C\\uDFA7|\\uD83C\\uDFA8|\\uD83C\\uDFA9|\\uD83C\\uDFAA|\\uD83C\\uDFAB|\\uD83C\\uDFAC|\\uD83C\\uDFAD|\\uD83C\\uDFAE|\\uD83C\\uDFAF|\\uD83C\\uDFB0|\\uD83C\\uDFB1|\\uD83C\\uDFB2|\\uD83C\\uDFB3|\\uD83C\\uDFB4|\\uD83C\\uDFB5|\\uD83C\\uDFB6|\\uD83C\\uDFB7|\\uD83C\\uDFB8|\\uD83C\\uDFB9|\\uD83C\\uDFBA|\\uD83C\\uDFBB|\\uD83C\\uDFBC|\\uD83C\\uDFBD|\\uD83C\\uDFBE|\\uD83C\\uDFBF|\\uD83C\\uDFC0|\\uD83C\\uDFC1|\\uD83C\\uDFC2|\\uD83C\\uDFC3|\\uD83C\\uDFC4|\\uD83C\\uDFC5|\\uD83C\\uDFC6|\\uD83C\\uDFC7|\\uD83C\\uDFC8|\\uD83C\\uDFC9|\\uD83C\\uDFCA|\\uD83C\\uDFCB|\\uD83C\\uDFCC|\\uD83C\\uDFCD|\\uD83C\\uDFCE|\\uD83C\\uDFD4|\\uD83C\\uDFD5|\\uD83C\\uDFD6|\\uD83C\\uDFD7|\\uD83C\\uDFD8|\\uD83C\\uDFD9|\\uD83C\\uDFDA|\\uD83C\\uDFDB|\\uD83C\\uDFDC|\\uD83C\\uDFDD|\\uD83C\\uDFDE|\\uD83C\\uDFDF|\\uD83C\\uDFE0|\\uD83C\\uDFE1|\\uD83C\\uDFE2|\\uD83C\\uDFE3|\\uD83C\\uDFE4|\\uD83C\\uDFE5|\\uD83C\\uDFE6|\\uD83C\\uDFE7|\\uD83C\\uDFE8|\\uD83C\\uDFE9|\\uD83C\\uDFEA|\\uD83C\\uDFEB|\\uD83C\\uDFEC|\\uD83C\\uDFED|\\uD83C\\uDFEE|\\uD83C\\uDFEF|\\uD83C\\uDFF0|\\uD83C\\uDFF3|\\uD83C\\uDFF4|\\uD83C\\uDFF5|\\uD83C\\uDFF7|\\uD83D\\uDC00|\\uD83D\\uDC01|\\uD83D\\uDC02|\\uD83D\\uDC03|\\uD83D\\uDC04|\\uD83D\\uDC05|\\uD83D\\uDC06|\\uD83D\\uDC07|\\uD83D\\uDC08|\\uD83D\\uDC09|\\uD83D\\uDC0A|\\uD83D\\uDC0B|\\uD83D\\uDC0C|\\uD83D\\uDC0D|\\uD83D\\uDC0E|\\uD83D\\uDC0F|\\uD83D\\uDC10|\\uD83D\\uDC11|\\uD83D\\uDC12|\\uD83D\\uDC13|\\uD83D\\uDC14|\\uD83D\\uDC15|\\uD83D\\uDC16|\\uD83D\\uDC17|\\uD83D\\uDC18|\\uD83D\\uDC19|\\uD83D\\uDC1A|\\uD83D\\uDC1B|\\uD83D\\uDC1C|\\uD83D\\uDC1D|\\uD83D\\uDC1E|\\uD83D\\uDC1F|\\uD83D\\uDC20|\\uD83D\\uDC21|\\uD83D\\uDC22|\\uD83D\\uDC23|\\uD83D\\uDC24|\\uD83D\\uDC25|\\uD83D\\uDC26|\\uD83D\\uDC27|\\uD83D\\uDC28|\\uD83D\\uDC29|\\uD83D\\uDC2A|\\uD83D\\uDC2B|\\uD83D\\uDC2C|\\uD83D\\uDC2D|\\uD83D\\uDC2E|\\uD83D\\uDC2F|\\uD83D\\uDC30|\\uD83D\\uDC31|\\uD83D\\uDC32|\\uD83D\\uDC33|\\uD83D\\uDC34|\\uD83D\\uDC35|\\uD83D\\uDC36|\\uD83D\\uDC37|\\uD83D\\uDC38|\\uD83D\\uDC39|\\uD83D\\uDC3A|\\uD83D\\uDC3B|\\uD83D\\uDC3C|\\uD83D\\uDC3D|\\uD83D\\uDC3E|\\uD83D\\uDC3F|\\uD83D\\uDC40|\\uD83D\\uDC41|\\uD83D\\uDC42|\\uD83D\\uDC43|\\uD83D\\uDC44|\\uD83D\\uDC45|\\uD83D\\uDC46|\\uD83D\\uDC47|\\uD83D\\uDC48|\\uD83D\\uDC49|\\uD83D\\uDC4A|\\uD83D\\uDC4B|\\uD83D\\uDC4C|\\uD83D\\uDC4D|\\uD83D\\uDC4E|\\uD83D\\uDC4F|\\uD83D\\uDC50|\\uD83D\\uDC51|\\uD83D\\uDC52|\\uD83D\\uDC53|\\uD83D\\uDC54|\\uD83D\\uDC55|\\uD83D\\uDC56|\\uD83D\\uDC57|\\uD83D\\uDC58|\\uD83D\\uDC59|\\uD83D\\uDC5A|\\uD83D\\uDC5B|\\uD83D\\uDC5C|\\uD83D\\uDC5D|\\uD83D\\uDC5E|\\uD83D\\uDC5F|\\uD83D\\uDC60|\\uD83D\\uDC61|\\uD83D\\uDC62|\\uD83D\\uDC63|\\uD83D\\uDC64|\\uD83D\\uDC65|\\uD83D\\uDC66|\\uD83D\\uDC67|\\uD83D\\uDC68|\\uD83D\\uDC69|\\uD83D\\uDC6A|\\uD83D\\uDC6B|\\uD83D\\uDC6C|\\uD83D\\uDC6D|\\uD83D\\uDC6E|\\uD83D\\uDC6F|\\uD83D\\uDC70|\\uD83D\\uDC71|\\uD83D\\uDC72|\\uD83D\\uDC73|\\uD83D\\uDC74|\\uD83D\\uDC75|\\uD83D\\uDC76|\\uD83D\\uDC77|\\uD83D\\uDC78|\\uD83D\\uDC79|\\uD83D\\uDC7A|\\uD83D\\uDC7B|\\uD83D\\uDC7C|\\uD83D\\uDC7D|\\uD83D\\uDC7E|\\uD83D\\uDC7F|\\uD83D\\uDC80|\\uD83D\\uDC81|\\uD83D\\uDC82|\\uD83D\\uDC83|\\uD83D\\uDC84|\\uD83D\\uDC85|\\uD83D\\uDC86|\\uD83D\\uDC87|\\uD83D\\uDC88|\\uD83D\\uDC89|\\uD83D\\uDC8A|\\uD83D\\uDC8B|\\uD83D\\uDC8C|\\uD83D\\uDC8D|\\uD83D\\uDC8E|\\uD83D\\uDC8F|\\uD83D\\uDC90|\\uD83D\\uDC91|\\uD83D\\uDC92|\\uD83D\\uDC93|\\uD83D\\uDC94|\\uD83D\\uDC95|\\uD83D\\uDC96|\\uD83D\\uDC97|\\uD83D\\uDC98|\\uD83D\\uDC99|\\uD83D\\uDC9A|\\uD83D\\uDC9B|\\uD83D\\uDC9C|\\uD83D\\uDC9D|\\uD83D\\uDC9E|\\uD83D\\uDC9F|\\uD83D\\uDCA0|\\uD83D\\uDCA1|\\uD83D\\uDCA2|\\uD83D\\uDCA3|\\uD83D\\uDCA4|\\uD83D\\uDCA5|\\uD83D\\uDCA6|\\uD83D\\uDCA7|\\uD83D\\uDCA8|\\uD83D\\uDCA9|\\uD83D\\uDCAA|\\uD83D\\uDCAB|\\uD83D\\uDCAC|\\uD83D\\uDCAD|\\uD83D\\uDCAE|\\uD83D\\uDCAF|\\uD83D\\uDCB0|\\uD83D\\uDCB1|\\uD83D\\uDCB2|\\uD83D\\uDCB3|\\uD83D\\uDCB4|\\uD83D\\uDCB5|\\uD83D\\uDCB6|\\uD83D\\uDCB7|\\uD83D\\uDCB8|\\uD83D\\uDCB9|\\uD83D\\uDCBA|\\uD83D\\uDCBB|\\uD83D\\uDCBC|\\uD83D\\uDCBD|\\uD83D\\uDCBE|\\uD83D\\uDCBF|\\uD83D\\uDCC0|\\uD83D\\uDCC1|\\uD83D\\uDCC2|\\uD83D\\uDCC3|\\uD83D\\uDCC4|\\uD83D\\uDCC5|\\uD83D\\uDCC6|\\uD83D\\uDCC7|\\uD83D\\uDCC8|\\uD83D\\uDCC9|\\uD83D\\uDCCA|\\uD83D\\uDCCB|\\uD83D\\uDCCC|\\uD83D\\uDCCD|\\uD83D\\uDCCE|\\uD83D\\uDCCF|\\uD83D\\uDCD0|\\uD83D\\uDCD1|\\uD83D\\uDCD2|\\uD83D\\uDCD3|\\uD83D\\uDCD4|\\uD83D\\uDCD5|\\uD83D\\uDCD6|\\uD83D\\uDCD7|\\uD83D\\uDCD8|\\uD83D\\uDCD9|\\uD83D\\uDCDA|\\uD83D\\uDCDB|\\uD83D\\uDCDC|\\uD83D\\uDCDD|\\uD83D\\uDCDE|\\uD83D\\uDCDF|\\uD83D\\uDCE0|\\uD83D\\uDCE1|\\uD83D\\uDCE2|\\uD83D\\uDCE3|\\uD83D\\uDCE4|\\uD83D\\uDCE5|\\uD83D\\uDCE6|\\uD83D\\uDCE7|\\uD83D\\uDCE8|\\uD83D\\uDCE9|\\uD83D\\uDCEA|\\uD83D\\uDCEB|\\uD83D\\uDCEC|\\uD83D\\uDCED|\\uD83D\\uDCEE|\\uD83D\\uDCEF|\\uD83D\\uDCF0|\\uD83D\\uDCF1|\\uD83D\\uDCF2|\\uD83D\\uDCF3|\\uD83D\\uDCF4|\\uD83D\\uDCF5|\\uD83D\\uDCF6|\\uD83D\\uDCF7|\\uD83D\\uDCF8|\\uD83D\\uDCF9|\\uD83D\\uDCFA|\\uD83D\\uDCFB|\\uD83D\\uDCFC|\\uD83D\\uDCFD|\\uD83D\\uDD00|\\uD83D\\uDD01|\\uD83D\\uDD02|\\uD83D\\uDD03|\\uD83D\\uDD04|\\uD83D\\uDD05|\\uD83D\\uDD06|\\uD83D\\uDD07|\\uD83D\\uDD08|\\uD83D\\uDD09|\\uD83D\\uDD0A|\\uD83D\\uDD0B|\\uD83D\\uDD0C|\\uD83D\\uDD0D|\\uD83D\\uDD0E|\\uD83D\\uDD0F|\\uD83D\\uDD10|\\uD83D\\uDD11|\\uD83D\\uDD12|\\uD83D\\uDD13|\\uD83D\\uDD14|\\uD83D\\uDD15|\\uD83D\\uDD16|\\uD83D\\uDD17|\\uD83D\\uDD18|\\uD83D\\uDD19|\\uD83D\\uDD1A|\\uD83D\\uDD1B|\\uD83D\\uDD1C|\\uD83D\\uDD1D|\\uD83D\\uDD1E|\\uD83D\\uDD1F|\\uD83D\\uDD20|\\uD83D\\uDD21|\\uD83D\\uDD22|\\uD83D\\uDD23|\\uD83D\\uDD24|\\uD83D\\uDD25|\\uD83D\\uDD26|\\uD83D\\uDD27|\\uD83D\\uDD28|\\uD83D\\uDD29|\\uD83D\\uDD2A|\\uD83D\\uDD2B|\\uD83D\\uDD2C|\\uD83D\\uDD2D|\\uD83D\\uDD2E|\\uD83D\\uDD2F|\\uD83D\\uDD30|\\uD83D\\uDD31|\\uD83D\\uDD32|\\uD83D\\uDD33|\\uD83D\\uDD34|\\uD83D\\uDD35|\\uD83D\\uDD36|\\uD83D\\uDD37|\\uD83D\\uDD38|\\uD83D\\uDD39|\\uD83D\\uDD3A|\\uD83D\\uDD3B|\\uD83D\\uDD3C|\\uD83D\\uDD3D|\\uD83D\\uDD47|\\uD83D\\uDD49|\\uD83D\\uDD4A|\\uD83D\\uDD50|\\uD83D\\uDD51|\\uD83D\\uDD52|\\uD83D\\uDD53|\\uD83D\\uDD54|\\uD83D\\uDD55|\\uD83D\\uDD56|\\uD83D\\uDD57|\\uD83D\\uDD58|\\uD83D\\uDD59|\\uD83D\\uDD5A|\\uD83D\\uDD5B|\\uD83D\\uDD5C|\\uD83D\\uDD5D|\\uD83D\\uDD5E|\\uD83D\\uDD5F|\\uD83D\\uDD60|\\uD83D\\uDD61|\\uD83D\\uDD62|\\uD83D\\uDD63|\\uD83D\\uDD64|\\uD83D\\uDD65|\\uD83D\\uDD66|\\uD83D\\uDD67|\\uD83D\\uDD6F|\\uD83D\\uDD70|\\uD83D\\uDD73|\\uD83D\\uDD74|\\uD83D\\uDD75|\\uD83D\\uDD76|\\uD83D\\uDD77|\\uD83D\\uDD78|\\uD83D\\uDD79|\\uD83D\\uDD87|\\uD83D\\uDD8A|\\uD83D\\uDD8B|\\uD83D\\uDD8C|\\uD83D\\uDD8D|\\uD83D\\uDD8E|\\uD83D\\uDD90|\\uD83D\\uDD95|\\uD83D\\uDD96|\\uD83D\\uDDA5|\\uD83D\\uDDA8|\\uD83D\\uDDAE|\\uD83D\\uDDB2|\\uD83D\\uDDBC|\\uD83D\\uDDC2|\\uD83D\\uDDC3|\\uD83D\\uDDC4|\\uD83D\\uDDD1|\\uD83D\\uDDD2|\\uD83D\\uDDD3|\\uD83D\\uDDDC|\\uD83D\\uDDDD|\\uD83D\\uDDDE|\\uD83D\\uDDE1|\\uD83D\\uDDE3|\\uD83D\\uDDEF|\\uD83D\\uDDF3|\\uD83D\\uDDFA|\\uD83D\\uDDFB|\\uD83D\\uDDFC|\\uD83D\\uDDFD|\\uD83D\\uDDFE|\\uD83D\\uDDFF|\\uD83D\\uDE00|\\uD83D\\uDE01|\\uD83D\\uDE02|\\uD83D\\uDE03|\\uD83D\\uDE04|\\uD83D\\uDE05|\\uD83D\\uDE06|\\uD83D\\uDE07|\\uD83D\\uDE08|\\uD83D\\uDE09|\\uD83D\\uDE0A|\\uD83D\\uDE0B|\\uD83D\\uDE0C|\\uD83D\\uDE0D|\\uD83D\\uDE0E|\\uD83D\\uDE0F|\\uD83D\\uDE10|\\uD83D\\uDE11|\\uD83D\\uDE12|\\uD83D\\uDE13|\\uD83D\\uDE14|\\uD83D\\uDE15|\\uD83D\\uDE16|\\uD83D\\uDE17|\\uD83D\\uDE18|\\uD83D\\uDE19|\\uD83D\\uDE1A|\\uD83D\\uDE1B|\\uD83D\\uDE1C|\\uD83D\\uDE1D|\\uD83D\\uDE1E|\\uD83D\\uDE1F|\\uD83D\\uDE20|\\uD83D\\uDE21|\\uD83D\\uDE22|\\uD83D\\uDE23|\\uD83D\\uDE24|\\uD83D\\uDE25|\\uD83D\\uDE26|\\uD83D\\uDE27|\\uD83D\\uDE28|\\uD83D\\uDE29|\\uD83D\\uDE2A|\\uD83D\\uDE2B|\\uD83D\\uDE2C|\\uD83D\\uDE2D|\\uD83D\\uDE2E|\\uD83D\\uDE2F|\\uD83D\\uDE30|\\uD83D\\uDE31|\\uD83D\\uDE32|\\uD83D\\uDE33|\\uD83D\\uDE34|\\uD83D\\uDE35|\\uD83D\\uDE36|\\uD83D\\uDE37|\\uD83D\\uDE38|\\uD83D\\uDE39|\\uD83D\\uDE3A|\\uD83D\\uDE3B|\\uD83D\\uDE3C|\\uD83D\\uDE3D|\\uD83D\\uDE3E|\\uD83D\\uDE3F|\\uD83D\\uDE40|\\uD83D\\uDE41|\\uD83D\\uDE42|\\uD83D\\uDE45|\\uD83D\\uDE46|\\uD83D\\uDE47|\\uD83D\\uDE48|\\uD83D\\uDE49|\\uD83D\\uDE4A|\\uD83D\\uDE4B|\\uD83D\\uDE4C|\\uD83D\\uDE4D|\\uD83D\\uDE4E|\\uD83D\\uDE4F|\\uD83D\\uDE80|\\uD83D\\uDE81|\\uD83D\\uDE82|\\uD83D\\uDE83|\\uD83D\\uDE84|\\uD83D\\uDE85|\\uD83D\\uDE86|\\uD83D\\uDE87|\\uD83D\\uDE88|\\uD83D\\uDE89|\\uD83D\\uDE8A|\\uD83D\\uDE8B|\\uD83D\\uDE8C|\\uD83D\\uDE8D|\\uD83D\\uDE8E|\\uD83D\\uDE8F|\\uD83D\\uDE90|\\uD83D\\uDE91|\\uD83D\\uDE92|\\uD83D\\uDE93|\\uD83D\\uDE94|\\uD83D\\uDE95|\\uD83D\\uDE96|\\uD83D\\uDE97|\\uD83D\\uDE98|\\uD83D\\uDE99|\\uD83D\\uDE9A|\\uD83D\\uDE9B|\\uD83D\\uDE9C|\\uD83D\\uDE9D|\\uD83D\\uDE9E|\\uD83D\\uDE9F|\\uD83D\\uDEA0|\\uD83D\\uDEA1|\\uD83D\\uDEA2|\\uD83D\\uDEA3|\\uD83D\\uDEA4|\\uD83D\\uDEA5|\\uD83D\\uDEA6|\\uD83D\\uDEA7|\\uD83D\\uDEA8|\\uD83D\\uDEA9|\\uD83D\\uDEAA|\\uD83D\\uDEAB|\\uD83D\\uDEAC|\\uD83D\\uDEAD|\\uD83D\\uDEAE|\\uD83D\\uDEAF|\\uD83D\\uDEB0|\\uD83D\\uDEB1|\\uD83D\\uDEB2|\\uD83D\\uDEB3|\\uD83D\\uDEB4|\\uD83D\\uDEB5|\\uD83D\\uDEB6|\\uD83D\\uDEB7|\\uD83D\\uDEB8|\\uD83D\\uDEB9|\\uD83D\\uDEBA|\\uD83D\\uDEBB|\\uD83D\\uDEBC|\\uD83D\\uDEBD|\\uD83D\\uDEBE|\\uD83D\\uDEBF|\\uD83D\\uDEC0|\\uD83D\\uDEC1|\\uD83D\\uDEC2|\\uD83D\\uDEC3|\\uD83D\\uDEC4|\\uD83D\\uDEC5|\\uD83D\\uDECB|\\uD83D\\uDECC|\\uD83D\\uDECD|\\uD83D\\uDECE|\\uD83D\\uDECF|\\uD83D\\uDEE0|\\uD83D\\uDEE1|\\uD83D\\uDEE2|\\uD83D\\uDEE3|\\uD83D\\uDEE4|\\uD83D\\uDEE5|\\uD83D\\uDEE9|\\uD83D\\uDEEB|\\uD83D\\uDEEC|\\uD83D\\uDEF0|\\uD83D\\uDEF3|\\u203C\\uFE0F|\\u2049\\uFE0F|\\u2122\\uFE0F|\\u2139\\uFE0F|\\u2194\\uFE0F|\\u2195\\uFE0F|\\u2196\\uFE0F|\\u2197\\uFE0F|\\u2198\\uFE0F|\\u2199\\uFE0F|\\u21A9\\uFE0F|\\u21AA\\uFE0F|\\u231A\\uFE0F|\\u231B\\uFE0F|\\u23E9|\\u23EA|\\u23EB|\\u23EC|\\u23F0|\\u23F3|\\u24C2\\uFE0F|\\u25AA\\uFE0F|\\u25AB\\uFE0F|\\u25B6\\uFE0F|\\u25C0\\uFE0F|\\u25FB\\uFE0F|\\u25FC\\uFE0F|\\u25FD\\uFE0F|\\u25FE\\uFE0F|\\u2600\\uFE0F|\\u2601\\uFE0F|\\u260E\\uFE0F|\\u2611\\uFE0F|\\u2614\\uFE0F|\\u2615\\uFE0F|\\u261D\\uFE0F|\\u263A\\uFE0F|\\u2648\\uFE0F|\\u2649\\uFE0F|\\u264A\\uFE0F|\\u264B\\uFE0F|\\u264C\\uFE0F|\\u264D\\uFE0F|\\u264E\\uFE0F|\\u264F\\uFE0F|\\u2650\\uFE0F|\\u2651\\uFE0F|\\u2652\\uFE0F|\\u2653\\uFE0F|\\u2660\\uFE0F|\\u2663\\uFE0F|\\u2665\\uFE0F|\\u2666\\uFE0F|\\u2668\\uFE0F|\\u267B\\uFE0F|\\u267F\\uFE0F|\\u2693\\uFE0F|\\u26A0\\uFE0F|\\u26A1\\uFE0F|\\u26AA\\uFE0F|\\u26AB\\uFE0F|\\u26BD\\uFE0F|\\u26BE\\uFE0F|\\u26C4\\uFE0F|\\u26C5\\uFE0F|\\u26CE|\\u26D4\\uFE0F|\\u26EA\\uFE0F|\\u26F2\\uFE0F|\\u26F3\\uFE0F|\\u26F5\\uFE0F|\\u26FA\\uFE0F|\\u26FD\\uFE0F|\\u2702\\uFE0F|\\u2708\\uFE0F|\\u2709\\uFE0F|\\u270A|\\u270B|\\u270C\\uFE0F|\\u270F\\uFE0F|\\u2712\\uFE0F|\\u2714\\uFE0F|\\u2716\\uFE0F|\\u2733\\uFE0F|\\u2734\\uFE0F|\\u2744\\uFE0F|\\u2747\\uFE0F|\\u274C|\\u274E|\\u2757\\uFE0F|\\u2764\\uFE0F|\\u27A1\\uFE0F|\\u27B0|\\u27BF|\\u2934\\uFE0F|\\u2935\\uFE0F|\\u2B05\\uFE0F|\\u2B06\\uFE0F|\\u2B07\\uFE0F|\\u2B1B\\uFE0F|\\u2B1C\\uFE0F|\\u2B50\\uFE0F|\\u2B55\\uFE0F|\\u303D\\uFE0F|\\u3297\\uFE0F|\\u3299\\uFE0F|\\u2705|\\u2728|\\u2753|\\u2754|\\u2755|\\u2795|\\u2796|\\u2797|\\u3030)';
	    ns.jsecapeMap = {"\u2049":"2049","\u2122":"2122","\u2139":"2139","\u2194":"2194","\u2195":"2195","\u2196":"2196","\u2197":"2197","\u2198":"2198","\u2199":"2199","\u2600":"2600","\u2601":"2601","\u2611":"2611","\u2614":"2614","\u2615":"2615","\u2648":"2648","\u2649":"2649","\u2650":"2650","\u2651":"2651","\u2652":"2652","\u2653":"2653","\u2660":"2660","\u2663":"2663","\u2665":"2665","\u2666":"2666","\u2668":"2668","\u2693":"2693","\u2702":"2702","\u2705":"2705","\u2708":"2708","\u2709":"2709","\u2712":"2712","\u2714":"2714","\u2716":"2716","\u2728":"2728","\u2733":"2733","\u2734":"2734","\u2744":"2744","\u2747":"2747","\u2753":"2753","\u2754":"2754","\u2755":"2755","\u2757":"2757","\u2764":"2764","\u2795":"2795","\u2796":"2796","\u2797":"2797","\u2934":"2934","\u2935":"2935","\u3030":"3030","\u3297":"3297","\u3299":"3299","\uD83C\uDDFF\uD83C\uDDFC":"1F1FF-1F1FC","\uD83C\uDDFF\uD83C\uDDF2":"1F1FF-1F1F2","\uD83C\uDDFE\uD83C\uDDEA":"1F1FE-1F1EA","\uD83C\uDDEA\uD83C\uDDED":"1F1EA-1F1ED","\uD83C\uDDFC\uD83C\uDDEB":"1F1FC-1F1EB","\uD83C\uDDFB\uD83C\uDDEA":"1F1FB-1F1EA","\uD83C\uDDFB\uD83C\uDDE6":"1F1FB-1F1E6","\uD83C\uDDFB\uD83C\uDDFA":"1F1FB-1F1FA","\uD83C\uDDFA\uD83C\uDDFF":"1F1FA-1F1FF","\uD83C\uDDFA\uD83C\uDDFE":"1F1FA-1F1FE","\uD83C\uDDFA\uD83C\uDDE6":"1F1FA-1F1E6","\uD83C\uDDFA\uD83C\uDDEC":"1F1FA-1F1EC","\uD83C\uDDFB\uD83C\uDDEE":"1F1FB-1F1EE","\uD83C\uDDF9\uD83C\uDDFB":"1F1F9-1F1FB","\uD83C\uDDF9\uD83C\uDDF2":"1F1F9-1F1F2","\uD83C\uDDF9\uD83C\uDDF3":"1F1F9-1F1F3","\uD83C\uDDF9\uD83C\uDDF9":"1F1F9-1F1F9","\uD83C\uDDF9\uD83C\uDDF4":"1F1F9-1F1F4","\uD83C\uDDF9\uD83C\uDDEC":"1F1F9-1F1EC","\uD83C\uDDF9\uD83C\uDDED":"1F1F9-1F1ED","\uD83C\uDDF9\uD83C\uDDFF":"1F1F9-1F1FF","\uD83C\uDDF9\uD83C\uDDEF":"1F1F9-1F1EF","\uD83C\uDDF9\uD83C\uDDFC":"1F1F9-1F1FC","\uD83C\uDDF8\uD83C\uDDFE":"1F1F8-1F1FE","\uD83C\uDDF8\uD83C\uDDFF":"1F1F8-1F1FF","\uD83C\uDDF8\uD83C\uDDF7":"1F1F8-1F1F7","\uD83C\uDDF8\uD83C\uDDE9":"1F1F8-1F1E9","\uD83C\uDDF1\uD83C\uDDF0":"1F1F1-1F1F0","\uD83C\uDDF8\uD83C\uDDF4":"1F1F8-1F1F4","\uD83C\uDDF8\uD83C\uDDE7":"1F1F8-1F1E7","\uD83C\uDDF8\uD83C\uDDEE":"1F1F8-1F1EE","\uD83C\uDDF8\uD83C\uDDF0":"1F1F8-1F1F0","\uD83C\uDDF8\uD83C\uDDF1":"1F1F8-1F1F1","\uD83C\uDDF8\uD83C\uDDE8":"1F1F8-1F1E8","\uD83C\uDDF7\uD83C\uDDF8":"1F1F7-1F1F8","\uD83C\uDDF8\uD83C\uDDF3":"1F1F8-1F1F3","\uD83C\uDDF8\uD83C\uDDF9":"1F1F8-1F1F9","\uD83C\uDDF8\uD83C\uDDF2":"1F1F8-1F1F2","\uD83C\uDDFC\uD83C\uDDF8":"1F1FC-1F1F8","\uD83C\uDDFB\uD83C\uDDE8":"1F1FB-1F1E8","\uD83C\uDDF1\uD83C\uDDE8":"1F1F1-1F1E8","\uD83C\uDDF0\uD83C\uDDF3":"1F1F0-1F1F3","\uD83C\uDDF8\uD83C\uDDED":"1F1F8-1F1ED","\uD83C\uDDF7\uD83C\uDDFC":"1F1F7-1F1FC","\uD83C\uDDF7\uD83C\uDDF4":"1F1F7-1F1F4","\uD83C\uDDF6\uD83C\uDDE6":"1F1F6-1F1E6","\uD83C\uDDF5\uD83C\uDDEA":"1F1F5-1F1EA","\uD83C\uDDF5\uD83C\uDDFE":"1F1F5-1F1FE","\uD83C\uDDF5\uD83C\uDDEC":"1F1F5-1F1EC","\uD83C\uDDF5\uD83C\uDDE6":"1F1F5-1F1E6","\uD83C\uDDF5\uD83C\uDDF8":"1F1F5-1F1F8","\uD83C\uDDF5\uD83C\uDDFC":"1F1F5-1F1FC","\uD83C\uDDF5\uD83C\uDDF0":"1F1F5-1F1F0","\uD83C\uDDF4\uD83C\uDDF2":"1F1F4-1F1F2","\uD83C\uDDF0\uD83C\uDDF5":"1F1F0-1F1F5","\uD83C\uDDF3\uD83C\uDDFA":"1F1F3-1F1FA","\uD83C\uDDF3\uD83C\uDDEC":"1F1F3-1F1EC","\uD83C\uDDF3\uD83C\uDDEA":"1F1F3-1F1EA","\uD83C\uDDF3\uD83C\uDDEE":"1F1F3-1F1EE","\uD83C\uDDF3\uD83C\uDDE8":"1F1F3-1F1E8","\uD83C\uDDF3\uD83C\uDDF5":"1F1F3-1F1F5","\uD83C\uDDF3\uD83C\uDDF7":"1F1F3-1F1F7","\uD83C\uDDF3\uD83C\uDDE6":"1F1F3-1F1E6","\uD83C\uDDF2\uD83C\uDDF2":"1F1F2-1F1F2","\uD83C\uDDF2\uD83C\uDDFF":"1F1F2-1F1FF","\uD83C\uDDF2\uD83C\uDDE6":"1F1F2-1F1E6","\uD83C\uDDF2\uD83C\uDDF8":"1F1F2-1F1F8","\uD83C\uDDF2\uD83C\uDDEA":"1F1F2-1F1EA","\uD83C\uDDF2\uD83C\uDDF3":"1F1F2-1F1F3","\uD83C\uDDF2\uD83C\uDDE8":"1F1F2-1F1E8","\uD83C\uDDF2\uD83C\uDDE9":"1F1F2-1F1E9","\uD83C\uDDEB\uD83C\uDDF2":"1F1EB-1F1F2","\uD83C\uDDF2\uD83C\uDDFA":"1F1F2-1F1FA","\uD83C\uDDF2\uD83C\uDDF7":"1F1F2-1F1F7","\uD83C\uDDF2\uD83C\uDDED":"1F1F2-1F1ED","\uD83C\uDDF2\uD83C\uDDF9":"1F1F2-1F1F9","\uD83C\uDDF2\uD83C\uDDF1":"1F1F2-1F1F1","\uD83C\uDDF2\uD83C\uDDFB":"1F1F2-1F1FB","\uD83C\uDDF2\uD83C\uDDFC":"1F1F2-1F1FC","\uD83C\uDDF2\uD83C\uDDEC":"1F1F2-1F1EC","\uD83C\uDDF2\uD83C\uDDF0":"1F1F2-1F1F0","\uD83C\uDDF1\uD83C\uDDFA":"1F1F1-1F1FA","\uD83C\uDDF1\uD83C\uDDF9":"1F1F1-1F1F9","\uD83C\uDDF1\uD83C\uDDEE":"1F1F1-1F1EE","\uD83C\uDDF1\uD83C\uDDFE":"1F1F1-1F1FE","\uD83C\uDDF1\uD83C\uDDF7":"1F1F1-1F1F7","\uD83C\uDDF1\uD83C\uDDF8":"1F1F1-1F1F8","\uD83C\uDDF1\uD83C\uDDE7":"1F1F1-1F1E7","\uD83C\uDDF1\uD83C\uDDFB":"1F1F1-1F1FB","\uD83C\uDDF1\uD83C\uDDE6":"1F1F1-1F1E6","\uD83C\uDDF0\uD83C\uDDEC":"1F1F0-1F1EC","\uD83C\uDDF0\uD83C\uDDFC":"1F1F0-1F1FC","\uD83C\uDDFD\uD83C\uDDF0":"1F1FD-1F1F0","\uD83C\uDDF0\uD83C\uDDEE":"1F1F0-1F1EE","\uD83C\uDDF0\uD83C\uDDEA":"1F1F0-1F1EA","\uD83C\uDDF0\uD83C\uDDFF":"1F1F0-1F1FF","\uD83C\uDDEF\uD83C\uDDF4":"1F1EF-1F1F4","\uD83C\uDDEF\uD83C\uDDEA":"1F1EF-1F1EA","\uD83C\uDDEF\uD83C\uDDF2":"1F1EF-1F1F2","\uD83C\uDDEE\uD83C\uDDF6":"1F1EE-1F1F6","\uD83C\uDDEE\uD83C\uDDF7":"1F1EE-1F1F7","\uD83C\uDDEE\uD83C\uDDF8":"1F1EE-1F1F8","\uD83C\uDDED\uD83C\uDDFA":"1F1ED-1F1FA","\uD83C\uDDED\uD83C\uDDF3":"1F1ED-1F1F3","\uD83C\uDDED\uD83C\uDDF9":"1F1ED-1F1F9","\uD83C\uDDEC\uD83C\uDDFE":"1F1EC-1F1FE","\uD83C\uDDEC\uD83C\uDDFC":"1F1EC-1F1FC","\uD83C\uDDEC\uD83C\uDDF3":"1F1EC-1F1F3","\uD83C\uDDEC\uD83C\uDDF9":"1F1EC-1F1F9","\uD83C\uDDEC\uD83C\uDDFA":"1F1EC-1F1FA","\uD83C\uDDEC\uD83C\uDDE9":"1F1EC-1F1E9","\uD83C\uDDEC\uD83C\uDDF1":"1F1EC-1F1F1","\uD83C\uDDEC\uD83C\uDDF7":"1F1EC-1F1F7","\uD83C\uDDEC\uD83C\uDDEE":"1F1EC-1F1EE","\uD83C\uDDEC\uD83C\uDDED":"1F1EC-1F1ED","\uD83C\uDDEC\uD83C\uDDEA":"1F1EC-1F1EA","\uD83C\uDDEC\uD83C\uDDF2":"1F1EC-1F1F2","\uD83C\uDDEC\uD83C\uDDE6":"1F1EC-1F1E6","\uD83C\uDDF5\uD83C\uDDEB":"1F1F5-1F1EB","\uD83C\uDDEB\uD83C\uDDEF":"1F1EB-1F1EF","\uD83C\uDDEB\uD83C\uDDF4":"1F1EB-1F1F4","\uD83C\uDDEB\uD83C\uDDF0":"1F1EB-1F1F0","\uD83C\uDDEA\uD83C\uDDF9":"1F1EA-1F1F9","\uD83C\uDDEA\uD83C\uDDEA":"1F1EA-1F1EA","\uD83C\uDDEA\uD83C\uDDF7":"1F1EA-1F1F7","\uD83C\uDDEC\uD83C\uDDF6":"1F1EC-1F1F6","\uD83C\uDDF8\uD83C\uDDFB":"1F1F8-1F1FB","\uD83C\uDDEA\uD83C\uDDEC":"1F1EA-1F1EC","\uD83C\uDDEA\uD83C\uDDE8":"1F1EA-1F1E8","\uD83C\uDDF9\uD83C\uDDF1":"1F1F9-1F1F1","\uD83C\uDDE9\uD83C\uDDF4":"1F1E9-1F1F4","\uD83C\uDDE9\uD83C\uDDF2":"1F1E9-1F1F2","\uD83C\uDDE9\uD83C\uDDEF":"1F1E9-1F1EF","\uD83C\uDDE8\uD83C\uDDFF":"1F1E8-1F1FF","\uD83C\uDDE8\uD83C\uDDFE":"1F1E8-1F1FE","\uD83C\uDDE8\uD83C\uDDFA":"1F1E8-1F1FA","\uD83C\uDDED\uD83C\uDDF7":"1F1ED-1F1F7","\uD83C\uDDE8\uD83C\uDDEE":"1F1E8-1F1EE","\uD83C\uDDE8\uD83C\uDDF7":"1F1E8-1F1F7","\uD83C\uDDF9\uD83C\uDDE9":"1F1F9-1F1E9","\uD83C\uDDE8\uD83C\uDDEC":"1F1E8-1F1EC","\uD83C\uDDE8\uD83C\uDDE9":"1F1E8-1F1E9","\uD83C\uDDF0\uD83C\uDDF2":"1F1F0-1F1F2","\uD83C\uDDE8\uD83C\uDDEB":"1F1E8-1F1EB","\uD83C\uDDF0\uD83C\uDDFE":"1F1F0-1F1FE","\uD83C\uDDE8\uD83C\uDDFB":"1F1E8-1F1FB","\uD83C\uDDE8\uD83C\uDDF2":"1F1E8-1F1F2","\uD83C\uDDF0\uD83C\uDDED":"1F1F0-1F1ED","\uD83C\uDDE7\uD83C\uDDEE":"1F1E7-1F1EE","\uD83C\uDDE7\uD83C\uDDEB":"1F1E7-1F1EB","\uD83C\uDDE7\uD83C\uDDEC":"1F1E7-1F1EC","\uD83C\uDDE7\uD83C\uDDF3":"1F1E7-1F1F3","\uD83C\uDDE7\uD83C\uDDFC":"1F1E7-1F1FC","\uD83C\uDDE7\uD83C\uDDE6":"1F1E7-1F1E6","\uD83C\uDDE7\uD83C\uDDF4":"1F1E7-1F1F4","\uD83C\uDDE7\uD83C\uDDF9":"1F1E7-1F1F9","\uD83C\uDDE7\uD83C\uDDF2":"1F1E7-1F1F2","\uD83C\uDDE7\uD83C\uDDEF":"1F1E7-1F1EF","\uD83C\uDDE7\uD83C\uDDFF":"1F1E7-1F1FF","\uD83C\uDDE7\uD83C\uDDFE":"1F1E7-1F1FE","\uD83C\uDDE7\uD83C\uDDE7":"1F1E7-1F1E7","\uD83C\uDDE7\uD83C\uDDE9":"1F1E7-1F1E9","\uD83C\uDDE7\uD83C\uDDED":"1F1E7-1F1ED","\uD83C\uDDE7\uD83C\uDDF8":"1F1E7-1F1F8","\uD83C\uDDE6\uD83C\uDDFF":"1F1E6-1F1FF","\uD83C\uDDE6\uD83C\uDDE8":"1F1E6-1F1E8","\uD83C\uDDE6\uD83C\uDDFC":"1F1E6-1F1FC","\uD83C\uDDE6\uD83C\uDDF2":"1F1E6-1F1F2","\uD83C\uDDE6\uD83C\uDDF7":"1F1E6-1F1F7","\uD83C\uDDE6\uD83C\uDDEC":"1F1E6-1F1EC","\uD83C\uDDE6\uD83C\uDDEE":"1F1E6-1F1EE","\uD83C\uDDE6\uD83C\uDDF4":"1F1E6-1F1F4","\uD83C\uDDE6\uD83C\uDDE9":"1F1E6-1F1E9","\uD83C\uDDE9\uD83C\uDDFF":"1F1E9-1F1FF","\uD83C\uDDE6\uD83C\uDDF1":"1F1E6-1F1F1","\uD83C\uDDE6\uD83C\uDDEB":"1F1E6-1F1EB","\uD83C\uDDFB\uD83C\uDDF3":"1F1FB-1F1F3","\uD83C\uDDE6\uD83C\uDDEA":"1F1E6-1F1EA","\uD83C\uDDFA\uD83C\uDDF8":"1F1FA-1F1F8","\uD83C\uDDEC\uD83C\uDDE7":"1F1EC-1F1E7","\uD83C\uDDF9\uD83C\uDDF7":"1F1F9-1F1F7","\uD83C\uDDE8\uD83C\uDDED":"1F1E8-1F1ED","\uD83C\uDDF8\uD83C\uDDEA":"1F1F8-1F1EA","\uD83C\uDDEA\uD83C\uDDF8":"1F1EA-1F1F8","\uD83C\uDDFF\uD83C\uDDE6":"1F1FF-1F1E6","\uD83C\uDDF8\uD83C\uDDEC":"1F1F8-1F1EC","\uD83C\uDDF8\uD83C\uDDE6":"1F1F8-1F1E6","\uD83C\uDDF7\uD83C\uDDFA":"1F1F7-1F1FA","\uD83C\uDDF5\uD83C\uDDF7":"1F1F5-1F1F7","\uD83C\uDDF5\uD83C\uDDF9":"1F1F5-1F1F9","\uD83C\uDDF5\uD83C\uDDF1":"1F1F5-1F1F1","\uD83C\uDDF5\uD83C\uDDED":"1F1F5-1F1ED","\uD83C\uDDF3\uD83C\uDDF4":"1F1F3-1F1F4","\uD83C\uDDF3\uD83C\uDDFF":"1F1F3-1F1FF","\uD83C\uDDF3\uD83C\uDDF1":"1F1F3-1F1F1","\uD83C\uDDF2\uD83C\uDDFD":"1F1F2-1F1FD","\uD83C\uDDF2\uD83C\uDDFE":"1F1F2-1F1FE","\uD83C\uDDF2\uD83C\uDDF4":"1F1F2-1F1F4","\uD83C\uDDF0\uD83C\uDDF7":"1F1F0-1F1F7","\uD83C\uDDEF\uD83C\uDDF5":"1F1EF-1F1F5","\uD83C\uDDEE\uD83C\uDDF9":"1F1EE-1F1F9","\uD83C\uDDEE\uD83C\uDDF1":"1F1EE-1F1F1","\uD83C\uDDEE\uD83C\uDDEA":"1F1EE-1F1EA","\uD83C\uDDEE\uD83C\uDDE9":"1F1EE-1F1E9","\uD83C\uDDEE\uD83C\uDDF3":"1F1EE-1F1F3","\uD83C\uDDED\uD83C\uDDF0":"1F1ED-1F1F0","\uD83C\uDDE9\uD83C\uDDEA":"1F1E9-1F1EA","\uD83C\uDDEB\uD83C\uDDF7":"1F1EB-1F1F7","\uD83C\uDDEB\uD83C\uDDEE":"1F1EB-1F1EE","\uD83C\uDDE9\uD83C\uDDF0":"1F1E9-1F1F0","\uD83C\uDDE8\uD83C\uDDF4":"1F1E8-1F1F4","\uD83C\uDDE8\uD83C\uDDF3":"1F1E8-1F1F3","\uD83C\uDDE8\uD83C\uDDF1":"1F1E8-1F1F1","\uD83C\uDDE8\uD83C\uDDE6":"1F1E8-1F1E6","\uD83C\uDDE7\uD83C\uDDF7":"1F1E7-1F1F7","\uD83C\uDDE7\uD83C\uDDEA":"1F1E7-1F1EA","\uD83C\uDDE6\uD83C\uDDF9":"1F1E6-1F1F9","\uD83C\uDDE6\uD83C\uDDFA":"1F1E6-1F1FA","\uD83D\uDDFA":"1F5FA","\uD83C\uDFEB":"1F3EB","\uD83C\uDFEA":"1F3EA","\u26EA\uFE0F":"26EA","\u26EA":"26EA","\uD83D\uDC92":"1F492","\uD83C\uDFE9":"1F3E9","\uD83C\uDFE8":"1F3E8","\uD83C\uDFE6":"1F3E6","\uD83C\uDFE5":"1F3E5","\uD83C\uDFE4":"1F3E4","\uD83C\uDFE3":"1F3E3","\uD83C\uDFED":"1F3ED","\uD83C\uDFEC":"1F3EC","\uD83C\uDFE2":"1F3E2","\uD83C\uDFD7":"1F3D7","\uD83C\uDFDA":"1F3DA","\uD83C\uDFE1":"1F3E1","\uD83C\uDFD8":"1F3D8","\uD83C\uDFE0":"1F3E0","\uD83C\uDF09":"1F309","\uD83C\uDF03":"1F303","\uD83C\uDF06":"1F306","\uD83C\uDF07":"1F307","\uD83C\uDFD9":"1F3D9","\uD83C\uDFDE":"1F3DE","\uD83C\uDFDD":"1F3DD","\uD83C\uDFDC":"1F3DC","\uD83C\uDFD6":"1F3D6","\uD83C\uDFD5":"1F3D5","\uD83C\uDFD4":"1F3D4","\uD83C\uDFDF":"1F3DF","\uD83C\uDFDB":"1F3DB","\uD83C\uDFEF":"1F3EF","\uD83C\uDFF0":"1F3F0","\u26F2\uFE0F":"26F2","\u26F2":"26F2","\uD83D\uDDFC":"1F5FC","\uD83C\uDF01":"1F301","\uD83D\uDDFF":"1F5FF","\uD83D\uDDFD":"1F5FD","\uD83D\uDECD":"1F6CD","\uD83C\uDF7D":"1F37D","\uD83D\uDECB":"1F6CB","\uD83D\uDECF":"1F6CF","\uD83D\uDECE":"1F6CE","\uD83D\uDCB5":"1F4B5","\uD83D\uDCB7":"1F4B7","\uD83D\uDCB6":"1F4B6","\uD83D\uDCB4":"1F4B4","\uD83D\uDEC5":"1F6C5","\uD83D\uDEC4":"1F6C4","\uD83D\uDEC3":"1F6C3","\uD83D\uDEC2":"1F6C2","\uD83D\uDE9F":"1F69F","\uD83D\uDEA0":"1F6A0","\uD83D\uDEA1":"1F6A1","\u26F5\uFE0F":"26F5","\u26F5":"26F5","\uD83D\uDEA4":"1F6A4","\uD83D\uDEE5":"1F6E5","\uD83D\uDEF3":"1F6F3","\uD83D\uDEA2":"1F6A2","\u2693\uFE0F":"2693","\uD83D\uDCBA":"1F4BA","\uD83D\uDEEC":"1F6EC","\uD83D\uDEEB":"1F6EB","\uD83D\uDEE9":"1F6E9","\uD83D\uDEEA":"1F6EA","\uD83D\uDEE6":"1F6E6","\uD83D\uDEE8":"1F6E8","\uD83D\uDEE7":"1F6E7","\u2708\uFE0F":"2708","\uD83D\uDE81":"1F681","\uD83D\uDE80":"1F680","\uD83D\uDEA5":"1F6A5","\uD83D\uDEA6":"1F6A6","\uD83D\uDEA7":"1F6A7","\u26FD\uFE0F":"26FD","\u26FD":"26FD","\uD83D\uDE8F":"1F68F","\uD83D\uDEE3":"1F6E3","\uD83D\uDEB2":"1F6B2","\uD83D\uDE9C":"1F69C","\uD83D\uDE9B":"1F69B","\uD83D\uDE9A":"1F69A","\uD83D\uDE99":"1F699","\uD83D\uDE98":"1F698","\uD83D\uDE97":"1F697","\uD83D\uDE96":"1F696","\uD83D\uDE95":"1F695","\uD83D\uDEA8":"1F6A8","\uD83D\uDE94":"1F694","\uD83D\uDE93":"1F693","\uD83D\uDEF1":"1F6F1","\uD83D\uDE92":"1F692","\uD83D\uDE91":"1F691","\uD83D\uDE90":"1F690","\uD83D\uDE8E":"1F68E","\uD83D\uDE8D":"1F68D","\uD83D\uDE8C":"1F68C","\uD83D\uDEE4":"1F6E4","\uD83D\uDE8A":"1F68A","\uD83D\uDE89":"1F689","\uD83D\uDE88":"1F688","\uD83D\uDE87":"1F687","\uD83D\uDE86":"1F686","\uD83D\uDE85":"1F685","\uD83D\uDE84":"1F684","\uD83D\uDE9D":"1F69D","\uD83D\uDE8B":"1F68B","\uD83D\uDEF2":"1F6F2","\uD83D\uDE82":"1F682","\uD83D\uDE9E":"1F69E","\uD83D\uDE83":"1F683","\uD83D\uDD67":"1F567","\uD83D\uDD66":"1F566","\uD83D\uDD65":"1F565","\uD83D\uDD64":"1F564","\uD83D\uDD63":"1F563","\uD83D\uDD62":"1F562","\uD83D\uDD61":"1F561","\uD83D\uDD60":"1F560","\uD83D\uDD5F":"1F55F","\uD83D\uDD5E":"1F55E","\uD83D\uDD5D":"1F55D","\uD83D\uDD5C":"1F55C","\uD83D\uDD5B":"1F55B","\uD83D\uDD5A":"1F55A","\uD83D\uDD59":"1F559","\uD83D\uDD58":"1F558","\uD83D\uDD57":"1F557","\uD83D\uDD56":"1F556","\uD83D\uDD55":"1F555","\uD83D\uDD54":"1F554","\uD83D\uDD53":"1F553","\uD83D\uDD52":"1F552","\uD83D\uDD51":"1F551","\uD83D\uDD50":"1F550","\uD83D\uDD33":"1F533","\uD83D\uDD32":"1F532","\u25FD\uFE0F":"25FD","\u25FD":"25FD","\u25FE\uFE0F":"25FE","\u25FE":"25FE","\u25FB\uFE0F":"25FB","\u25FB":"25FB","\u25FC\uFE0F":"25FC","\u25FC":"25FC","\u2B1C\uFE0F":"2B1C","\u2B1C":"2B1C","\u2B1B\uFE0F":"2B1B","\u2B1B":"2B1B","\u25AB\uFE0F":"25AB","\u25AB":"25AB","\u25AA\uFE0F":"25AA","\u25AA":"25AA","\uD83D\uDD37":"1F537","\uD83D\uDD36":"1F536","\uD83D\uDD39":"1F539","\uD83D\uDD38":"1F538","\uD83D\uDD3B":"1F53B","\uD83D\uDD3A":"1F53A","\uD83D\uDD35":"1F535","\uD83D\uDD34":"1F534","\uD83D\uDD18":"1F518","\u26AB\uFE0F":"26AB","\u26AB":"26AB","\u26AA\uFE0F":"26AA","\u26AA":"26AA","\uD83D\uDDF5":"1F5F5","\uD83D\uDDF4":"1F5F4","\uD83D\uDDF9":"1F5F9","\uD83D\uDDF8":"1F5F8","\u2611\uFE0F":"2611","\u2666\uFE0F":"2666","\u2665\uFE0F":"2665","\u2663\uFE0F":"2663","\u2660\uFE0F":"2660","\uD83D\uDCA0":"1F4A0","\uD83D\uDCA2":"1F4A2","\u267B\uFE0F":"267B","\u267B":"267B","\uD83C\uDFF6":"1F3F6","\uD83C\uDFF5":"1F3F5","\u2668\uFE0F":"2668","\u26A0\uFE0F":"26A0","\u26A0":"26A0","\uD83D\uDD31":"1F531","\uD83D\uDDF2":"1F5F2","\uD83D\uDD30":"1F530","\uD83D\uDD2F":"1F52F","\u26CE":"26CE","\uD83D\uDEC8":"1F6C8","\u24C2\uFE0F":"24C2","\u24C2":"24C2","\uD83C\uDF00":"1F300","\uD83D\uDD1C":"1F51C","\uD83D\uDD1D":"1F51D","\uD83D\uDD1B":"1F51B","\uD83D\uDD19":"1F519","\uD83D\uDD1A":"1F51A","\uD83D\uDCAF":"1F4AF","\u2B55\uFE0F":"2B55","\u2B55":"2B55","\u274C":"274C","\uD83D\uDEC6":"1F6C6","\u2049\uFE0F":"2049","\u203C\uFE0F":"203C","\u203C":"203C","\u2757\uFE0F":"2757","\u303D\uFE0F":"303D","\u303D":"303D","\u27BF":"27BF","\u27B0":"27B0","\uD83D\uDCB2":"1F4B2","\uD83D\uDCB1":"1F4B1","\u00AE":"00AE","\u00A9":"00A9","\uD83D\uDDD8":"1F5D8","\uD83D\uDD03":"1F503","\uD83D\uDDD9":"1F5D9","\u2714\uFE0F":"2714","\u2716\uFE0F":"2716","\uD83D\uDD23":"1F523","\uD83C\uDFA6":"1F3A6","\uD83D\uDCF6":"1F4F6","\u2139\uFE0F":"2139","\uD83D\uDD20":"1F520","\uD83D\uDD21":"1F521","\uD83D\uDD24":"1F524","\uD83D\uDD22":"1F522","\uD83D\uDD1F":"1F51F","9\uFE0F\u20E3":"0039-20E3","9\u20E3":"0039-20E3","8\uFE0F\u20E3":"0038-20E3","8\u20E3":"0038-20E3","7\uFE0F\u20E3":"0037-20E3","7\u20E3":"0037-20E3","6\uFE0F\u20E3":"0036-20E3","6\u20E3":"0036-20E3","5\uFE0F\u20E3":"0035-20E3","5\u20E3":"0035-20E3","4\uFE0F\u20E3":"0034-20E3","4\u20E3":"0034-20E3","3\uFE0F\u20E3":"0033-20E3","3\u20E3":"0033-20E3","2\uFE0F\u20E3":"0032-20E3","2\u20E3":"0032-20E3","1\uFE0F\u20E3":"0031-20E3","1\u20E3":"0031-20E3","0\uFE0F\u20E3":"0030-20E3","0\u20E3":"0030-20E3","#\uFE0F\u20E3":"0023-20E3","#\u20E3":"0023-20E3","\uD83D\uDD02":"1F502","\uD83D\uDD01":"1F501","\uD83D\uDD00":"1F500","\u2935\uFE0F":"2935","\u2934\uFE0F":"2934","\u21A9\uFE0F":"21A9","\u21A9":"21A9","\u21AA\uFE0F":"21AA","\u21AA":"21AA","\uD83D\uDD04":"1F504","\u2194\uFE0F":"2194","\u2195\uFE0F":"2195","\u2196\uFE0F":"2196","\u2199\uFE0F":"2199","\u2198\uFE0F":"2198","\u2197\uFE0F":"2197","\u2B07\uFE0F":"2B07","\u2B07":"2B07","\u2B06\uFE0F":"2B06","\u2B06":"2B06","\u2B05\uFE0F":"2B05","\u2B05":"2B05","\u27A1\uFE0F":"27A1","\u27A1":"27A1","\u23EC":"23EC","\u23EB":"23EB","\u23EA":"23EA","\u23E9":"23E9","\uD83D\uDD3D":"1F53D","\uD83D\uDD3C":"1F53C","\u25C0\uFE0F":"25C0","\u25C0":"25C0","\u25B6\uFE0F":"25B6","\u25B6":"25B6","\uD83D\uDEAE":"1F6AE","\uD83D\uDEAD":"1F6AD","\uD83D\uDEB0":"1F6B0","\u267F\uFE0F":"267F","\u267F":"267F","\uD83D\uDEBC":"1F6BC","\uD83D\uDECA":"1F6CA","\uD83D\uDEC9":"1F6C9","\uD83D\uDEBA":"1F6BA","\uD83D\uDEB9":"1F6B9","\uD83D\uDEBB":"1F6BB","\u2653\uFE0F":"2653","\u2652\uFE0F":"2652","\u2651\uFE0F":"2651","\u2650\uFE0F":"2650","\u264F\uFE0F":"264F","\u264F":"264F","\u264E\uFE0F":"264E","\u264E":"264E","\u264D\uFE0F":"264D","\u264D":"264D","\u264C\uFE0F":"264C","\u264C":"264C","\u264B\uFE0F":"264B","\u264B":"264B","\u264A\uFE0F":"264A","\u264A":"264A","\u2649\uFE0F":"2649","\u2648\uFE0F":"2648","\uD83C\uDFE7":"1F3E7","\uD83C\uDD99":"1F199","\uD83C\uDD97":"1F197","\uD83C\uDD96":"1F196","\uD83C\uDD95":"1F195","\uD83C\uDD93":"1F193","\uD83C\uDD92":"1F192","\uD83D\uDEBE":"1F6BE","\uD83C\uDD7F\uFE0F":"1F17F","\uD83C\uDD7F":"1F17F","\uD83C\uDD94":"1F194","\uD83C\uDD98":"1F198","\uD83C\uDD7E":"1F17E","\uD83C\uDD91":"1F191","\uD83C\uDD8E":"1F18E","\uD83C\uDD71":"1F171","\uD83C\uDD70":"1F170","\uD83C\uDD9A":"1F19A","\uD83D\uDCF4":"1F4F4","\uD83D\uDCF3":"1F4F3","\u2734\uFE0F":"2734","\u274E":"274E","\u2733\uFE0F":"2733","\u2747\uFE0F":"2747","\uD83D\uDCB9":"1F4B9","\uD83C\uDE2F\uFE0F":"1F22F","\uD83C\uDE2F":"1F22F","\uD83C\uDE01":"1F201","\uD83C\uDE02":"1F202","\uD83C\uDE33":"1F233","\uD83C\uDE39":"1F239","\uD83C\uDE37":"1F237","\uD83C\uDE3A":"1F23A","\uD83C\uDE38":"1F238","\uD83C\uDE1A\uFE0F":"1F21A","\uD83C\uDE1A":"1F21A","\uD83C\uDE36":"1F236","\uD83C\uDE32":"1F232","\uD83C\uDE35":"1F235","\uD83C\uDE34":"1F234","\u3297\uFE0F":"3297","\u3299\uFE0F":"3299","\uD83D\uDCAE":"1F4AE","\uD83C\uDE50":"1F250","\uD83C\uDE51":"1F251","\uD83D\uDD72":"1F572","\uD83D\uDD1E":"1F51E","\uD83D\uDCF5":"1F4F5","\uD83D\uDEB1":"1F6B1","\uD83D\uDEB3":"1F6B3","\uD83D\uDEAF":"1F6AF","\uD83D\uDEB7":"1F6B7","\uD83D\uDCDB":"1F4DB","\u26D4\uFE0F":"26D4","\u26D4":"26D4","\uD83D\uDEAB":"1F6AB","\uD83D\uDEC7":"1F6C7","\uD83D\uDECC":"1F6CC","\uD83D\uDDE3":"1F5E3","\uD83D\uDD0E":"1F50E","\uD83D\uDD0D":"1F50D","\uD83D\uDEE1":"1F6E1","\uD83D\uDEB8":"1F6B8","\uD83D\uDDF1":"1F5F1","\uD83D\uDDF0":"1F5F0","\uD83D\uDDEF":"1F5EF","\uD83D\uDDEE":"1F5EE","\uD83D\uDDED":"1F5ED","\uD83D\uDDEC":"1F5EC","\uD83D\uDDEB":"1F5EB","\uD83D\uDDEA":"1F5EA","\uD83D\uDDE9":"1F5E9","\uD83D\uDDE8":"1F5E8","\uD83D\uDCAC":"1F4AC","\uD83D\uDCAD":"1F4AD","\uD83D\uDD4A":"1F54A","\uD83D\uDD49":"1F549","\uD83D\uDD48":"1F548","\uD83D\uDD47":"1F547","\uD83D\uDD46":"1F546","\uD83C\uDF9D":"1F39D","\uD83C\uDF9C":"1F39C","\uD83D\uDD6D":"1F56D","\uD83D\uDD15":"1F515","\uD83D\uDD14":"1F514","\uD83D\uDCA4":"1F4A4","\uD83D\uDD6C":"1F56C","\uD83D\uDD6B":"1F56B","\uD83D\uDD6A":"1F56A","\uD83D\uDD69":"1F569","\uD83D\uDD68":"1F568","\uD83D\uDD07":"1F507","\uD83D\uDD0A":"1F50A","\uD83D\uDD09":"1F509","\uD83D\uDD08":"1F508","\uD83D\uDCE2":"1F4E2","\uD83D\uDCE3":"1F4E3","\uD83D\uDD13":"1F513","\uD83D\uDD12":"1F512","\uD83D\uDD10":"1F510","\uD83D\uDD0F":"1F50F","\uD83D\uDCDD":"1F4DD","\uD83D\uDD8D":"1F58D","\uD83D\uDD8C":"1F58C","\uD83D\uDD8B":"1F58B","\uD83D\uDD8A":"1F58A","\uD83D\uDD89":"1F589","\u270F\uFE0F":"270F","\u270F":"270F","\u2712\uFE0F":"2712","\uD83D\uDDC4":"1F5C4","\uD83D\uDCC2":"1F4C2","\uD83D\uDCC1":"1F4C1","\uD83D\uDDC1":"1F5C1","\uD83D\uDDC0":"1F5C0","\uD83D\uDD73":"1F573","\uD83C\uDFF4":"1F3F4","\uD83C\uDFF3":"1F3F3","\uD83C\uDFF2":"1F3F2","\uD83C\uDFF1":"1F3F1","\uD83D\uDEA9":"1F6A9","\uD83D\uDCCF":"1F4CF","\uD83D\uDCCD":"1F4CD","\uD83D\uDCD0":"1F4D0","\u2702\uFE0F":"2702","\uD83D\uDD88":"1F588","\uD83D\uDCCC":"1F4CC","\uD83D\uDD87":"1F587","\uD83D\uDCCE":"1F4CE","\uD83D\uDD17":"1F517","\uD83D\uDDC3":"1F5C3","\uD83D\uDDC2":"1F5C2","\uD83D\uDCC7":"1F4C7","\uD83D\uDCDA":"1F4DA","\uD83D\uDCD9":"1F4D9","\uD83D\uDCD8":"1F4D8","\uD83D\uDCD7":"1F4D7","\uD83D\uDCD5":"1F4D5","\uD83D\uDCD2":"1F4D2","\uD83D\uDCD4":"1F4D4","\uD83D\uDCD3":"1F4D3","\uD83D\uDCD6":"1F4D6","\uD83D\uDD6E":"1F56E","\uD83D\uDCCB":"1F4CB","\uD83D\uDCDC":"1F4DC","\uD83D\uDDBD":"1F5BD","\uD83D\uDDBC":"1F5BC","\uD83D\uDDBE":"1F5BE","\uD83D\uDDDC":"1F5DC","\uD83D\uDD06":"1F506","\uD83D\uDD05":"1F505","\uD83D\uDDF3":"1F5F3","\uD83D\uDDD3":"1F5D3","\uD83D\uDCC6":"1F4C6","\uD83D\uDCC5":"1F4C5","\uD83D\uDDE0":"1F5E0","\uD83D\uDCCA":"1F4CA","\uD83D\uDCC9":"1F4C9","\uD83D\uDCC8":"1F4C8","\uD83D\uDDD2":"1F5D2","\uD83D\uDDCA":"1F5CA","\uD83D\uDDC9":"1F5C9","\uD83D\uDDC7":"1F5C7","\uD83D\uDDC6":"1F5C6","\uD83D\uDDD1":"1F5D1","\uD83D\uDCD1":"1F4D1","\uD83D\uDDD0":"1F5D0","\uD83D\uDCC3":"1F4C3","\uD83D\uDCC4":"1F4C4","\uD83D\uDDCF":"1F5CF","\uD83D\uDDB9":"1F5B9","\uD83D\uDDCE":"1F5CE","\uD83D\uDCEC":"1F4EC","\uD83D\uDCED":"1F4ED","\uD83D\uDCEB":"1F4EB","\uD83D\uDCEA":"1F4EA","\uD83D\uDCEE":"1F4EE","\uD83D\uDCEF":"1F4EF","\uD83D\uDCE6":"1F4E6","\uD83D\uDCE4":"1F4E4","\uD83D\uDCE5":"1F4E5","\uD83D\uDCE7":"1F4E7","\uD83D\uDCE8":"1F4E8","\uD83D\uDCE9":"1F4E9","\uD83D\uDD86":"1F586","\uD83D\uDD85":"1F585","\uD83D\uDD83":"1F583","\uD83D\uDD82":"1F582","\u2709\uFE0F":"2709","\uD83D\uDDDD":"1F5DD","\uD83D\uDD11":"1F511","\uD83C\uDFF7":"1F3F7","\uD83C\uDF21":"1F321","\uD83D\uDDDE":"1F5DE","\uD83D\uDCF0":"1F4F0","\uD83D\uDD16":"1F516","\uD83D\uDD2B":"1F52B","\uD83D\uDD71":"1F571","\uD83D\uDEAC":"1F6AC","\uD83D\uDCA3":"1F4A3","\uD83D\uDEE2":"1F6E2","\uD83D\uDEE0":"1F6E0","\uD83D\uDD28":"1F528","\uD83D\uDD29":"1F529","\uD83D\uDDE1":"1F5E1","\uD83D\uDD2A":"1F52A","\uD83D\uDD27":"1F527","\uD83D\uDD2E":"1F52E","\uD83D\uDD2D":"1F52D","\uD83D\uDD2C":"1F52C","\uD83D\uDC8A":"1F48A","\uD83D\uDC89":"1F489","\uD83D\uDC88":"1F488","\uD83D\uDEBD":"1F6BD","\uD83D\uDEC1":"1F6C1","\uD83D\uDEBF":"1F6BF","\uD83D\uDEAA":"1F6AA","\uD83D\uDC56":"1F456","\uD83D\uDC54":"1F454","\uD83D\uDC55":"1F455","\uD83D\uDC5A":"1F45A","\uD83D\uDC58":"1F458","\uD83D\uDC57":"1F457","\uD83D\uDC59":"1F459","\uD83D\uDC5F":"1F45F","\uD83D\uDC5E":"1F45E","\uD83D\uDC62":"1F462","\uD83D\uDC60":"1F460","\uD83D\uDC61":"1F461","\uD83D\uDC52":"1F452","\uD83D\uDD76":"1F576","\uD83D\uDC53":"1F453","\uD83D\uDC84":"1F484","\uD83C\uDF92":"1F392","\uD83D\uDCBC":"1F4BC","\uD83D\uDC5C":"1F45C","\uD83D\uDC5B":"1F45B","\uD83D\uDC5D":"1F45D","\uD83C\uDF02":"1F302","\uD83D\uDC8E":"1F48E","\uD83D\uDCB0":"1F4B0","\uD83D\uDCB8":"1F4B8","\uD83D\uDCB3":"1F4B3","\uD83D\uDEF0":"1F6F0","\uD83D\uDCE1":"1F4E1","\uD83D\uDD6F":"1F56F","\uD83D\uDD26":"1F526","\uD83D\uDCA1":"1F4A1","\uD83D\uDD0C":"1F50C","\uD83D\uDD0B":"1F50B","\uD83D\uDCFC":"1F4FC","\uD83D\uDDB8":"1F5B8","\uD83D\uDCC0":"1F4C0","\uD83D\uDCBF":"1F4BF","\uD83D\uDDB4":"1F5B4","\uD83D\uDDAD":"1F5AD","\uD83D\uDDAB":"1F5AB","\uD83D\uDDAA":"1F5AA","\uD83D\uDCBE":"1F4BE","\uD83D\uDCBD":"1F4BD","\uD83D\uDCE0":"1F4E0","\uD83D\uDD81":"1F581","\uD83D\uDD7F":"1F57F","\uD83D\uDD7E":"1F57E","\u260E\uFE0F":"260E","\u260E":"260E","\uD83D\uDD7B":"1F57B","\uD83D\uDCDE":"1F4DE","\uD83D\uDD79":"1F579","\uD83D\uDCDF":"1F4DF","\uD83D\uDCFE":"1F4FE","\uD83D\uDCFB":"1F4FB","\uD83C\uDF9B":"1F39B","\uD83C\uDF9A":"1F39A","\uD83C\uDF99":"1F399","\uD83C\uDF98":"1F398","\uD83D\uDCFA":"1F4FA","\uD83D\uDCFD":"1F4FD","\uD83C\uDFA5":"1F3A5","\uD83D\uDCF9":"1F4F9","\uD83D\uDCF8":"1F4F8","\uD83D\uDCF7":"1F4F7","\u231B\uFE0F":"231B","\u231B":"231B","\u23F3":"23F3","\uD83D\uDD70":"1F570","\u23F0":"23F0","\uD83D\uDDA9":"1F5A9","\uD83D\uDDD4":"1F5D4","\uD83D\uDDA8":"1F5A8","\uD83D\uDDA7":"1F5A7","\uD83D\uDDA6":"1F5A6","\uD83D\uDDB2":"1F5B2","\uD83D\uDDAF":"1F5AF","\uD83D\uDDAE":"1F5AE","\uD83D\uDDB3":"1F5B3","\uD83D\uDDA5":"1F5A5","\uD83D\uDCBB":"1F4BB","\uD83D\uDCF2":"1F4F2","\uD83D\uDCF1":"1F4F1","\u231A\uFE0F":"231A","\u231A":"231A","\uD83C\uDF7C":"1F37C","\uD83C\uDF7B":"1F37B","\uD83C\uDF7A":"1F37A","\uD83C\uDF79":"1F379","\uD83C\uDF78":"1F378","\uD83C\uDF77":"1F377","\uD83C\uDF76":"1F376","\u2615\uFE0F":"2615","\uD83C\uDF75":"1F375","\uD83C\uDF74":"1F374","\uD83C\uDF73":"1F373","\uD83C\uDF72":"1F372","\uD83C\uDF71":"1F371","\uD83C\uDF70":"1F370","\uD83C\uDF6F":"1F36F","\uD83C\uDF6E":"1F36E","\uD83C\uDF6D":"1F36D","\uD83C\uDF6C":"1F36C","\uD83C\uDF6B":"1F36B","\uD83C\uDF6A":"1F36A","\uD83C\uDF69":"1F369","\uD83C\uDF68":"1F368","\uD83C\uDF67":"1F367","\uD83C\uDF66":"1F366","\uD83C\uDF65":"1F365","\uD83C\uDF64":"1F364","\uD83C\uDF63":"1F363","\uD83C\uDF62":"1F362","\uD83C\uDF61":"1F361","\uD83C\uDF5F":"1F35F","\uD83C\uDF5E":"1F35E","\uD83C\uDF5D":"1F35D","\uD83C\uDF5C":"1F35C","\uD83C\uDF5B":"1F35B","\uD83C\uDF5A":"1F35A","\uD83C\uDF59":"1F359","\uD83C\uDF58":"1F358","\uD83C\uDF57":"1F357","\uD83C\uDF56":"1F356","\uD83C\uDF55":"1F355","\uD83C\uDF54":"1F354","\uD83C\uDF53":"1F353","\uD83C\uDF52":"1F352","\uD83C\uDF51":"1F351","\uD83C\uDF50":"1F350","\uD83C\uDF4F":"1F34F","\uD83C\uDF4E":"1F34E","\uD83C\uDF4D":"1F34D","\uD83C\uDF4C":"1F34C","\uD83C\uDF4B":"1F34B","\uD83C\uDF4A":"1F34A","\uD83C\uDF49":"1F349","\uD83C\uDF48":"1F348","\uD83C\uDF47":"1F347","\uD83C\uDF36":"1F336","\uD83C\uDF60":"1F360","\uD83C\uDF3D":"1F33D","\uD83C\uDF46":"1F346","\uD83C\uDF45":"1F345","\uD83C\uDFA2":"1F3A2","\uD83C\uDFA1":"1F3A1","\uD83C\uDFA0":"1F3A0","\uD83C\uDC04\uFE0F":"1F004","\uD83C\uDC04":"1F004","\uD83C\uDCCF":"1F0CF","\uD83C\uDFB4":"1F3B4","\uD83C\uDFAE":"1F3AE","\uD83C\uDFB2":"1F3B2","\uD83C\uDFB0":"1F3B0","\uD83C\uDFB3":"1F3B3","\uD83C\uDFB1":"1F3B1","\uD83C\uDFAF":"1F3AF","\uD83C\uDFA8":"1F3A8","\uD83C\uDF9F":"1F39F","\uD83C\uDF9E":"1F39E","\uD83C\uDFAC":"1F3AC","\uD83C\uDFAA":"1F3AA","\uD83C\uDFA9":"1F3A9","\uD83C\uDFAB":"1F3AB","\uD83C\uDFAD":"1F3AD","\uD83C\uDFA4":"1F3A4","\uD83C\uDFA7":"1F3A7","\uD83C\uDFBC":"1F3BC","\uD83C\uDFB6":"1F3B6","\uD83C\uDFB5":"1F3B5","\uD83C\uDFBA":"1F3BA","\uD83C\uDFB7":"1F3B7","\uD83C\uDFBB":"1F3BB","\uD83C\uDFB8":"1F3B8","\uD83C\uDFB9":"1F3B9","\uD83C\uDFC1":"1F3C1","\uD83C\uDFBD":"1F3BD","\uD83C\uDFC5":"1F3C5","\uD83C\uDFC6":"1F3C6","\u26F3\uFE0F":"26F3","\u26F3":"26F3","\uD83C\uDFC9":"1F3C9","\uD83C\uDFBE":"1F3BE","\u26BE\uFE0F":"26BE","\u26BE":"26BE","\uD83C\uDFC8":"1F3C8","\uD83C\uDFC0":"1F3C0","\u26BD\uFE0F":"26BD","\u26BD":"26BD","\uD83C\uDFA3":"1F3A3","\u26FA\uFE0F":"26FA","\u26FA":"26FA","\uD83C\uDFC7":"1F3C7","\uD83C\uDFCE":"1F3CE","\uD83C\uDFCD":"1F3CD","\uD83D\uDEB5":"1F6B5","\uD83D\uDEB4":"1F6B4","\u26C4\uFE0F":"26C4","\u26C4":"26C4","\uD83C\uDFBF":"1F3BF","\uD83C\uDFC2":"1F3C2","\uD83D\uDEC0":"1F6C0","\uD83C\uDFC4":"1F3C4","\uD83C\uDFCA":"1F3CA","\uD83D\uDEA3":"1F6A3","\uD83C\uDFCC":"1F3CC","\uD83C\uDFCB":"1F3CB","\uD83D\uDC83":"1F483","\uD83D\uDEB6":"1F6B6","\uD83C\uDFC3":"1F3C3","\uD83D\uDC99":"1F499","\uD83D\uDC9A":"1F49A","\uD83D\uDC9B":"1F49B","\uD83D\uDC9C":"1F49C","\uD83D\uDC9F":"1F49F","\uD83C\uDF94":"1F394","\uD83D\uDC9D":"1F49D","\uD83D\uDC98":"1F498","\uD83D\uDC96":"1F496","\uD83D\uDC97":"1F497","\uD83D\uDC93":"1F493","\uD83D\uDC9E":"1F49E","\uD83D\uDC95":"1F495","\uD83D\uDC8C":"1F48C","\uD83D\uDC94":"1F494","\u2764\uFE0F":"2764","\uD83C\uDF95":"1F395","\uD83D\uDC8D":"1F48D","\uD83C\uDFEE":"1F3EE","\uD83C\uDF8C":"1F38C","\uD83C\uDF90":"1F390","\uD83C\uDF8F":"1F38F","\uD83C\uDF8E":"1F38E","\uD83C\uDF96":"1F396","\uD83C\uDF97":"1F397","\uD83D\uDC51":"1F451","\uD83C\uDF93":"1F393","\uD83D\uDCA5":"1F4A5","\uD83D\uDCAB":"1F4AB","\uD83C\uDF88":"1F388","\uD83C\uDF8A":"1F38A","\uD83C\uDF89":"1F389","\uD83C\uDF87":"1F387","\uD83C\uDF86":"1F386","\uD83C\uDF91":"1F391","\uD83C\uDF8D":"1F38D","\uD83C\uDF8B":"1F38B","\uD83C\uDF84":"1F384","\uD83C\uDF83":"1F383","\uD83C\uDF82":"1F382","\uD83C\uDF81":"1F381","\uD83C\uDF80":"1F380","\uD83C\uDF2C":"1F32C","\uD83C\uDF1E":"1F31E","\uD83C\uDF1C":"1F31C","\uD83C\uDF1B":"1F31B","\uD83C\uDF1D":"1F31D","\uD83C\uDF1A":"1F31A","\uD83C\uDF18":"1F318","\uD83C\uDF17":"1F317","\uD83C\uDF16":"1F316","\uD83C\uDF15":"1F315","\uD83C\uDF14":"1F314","\uD83C\uDF13":"1F313","\uD83C\uDF12":"1F312","\uD83C\uDF11":"1F311","\uD83C\uDF0F":"1F30F","\uD83C\uDF0E":"1F30E","\uD83C\uDF0D":"1F30D","\uD83C\uDF10":"1F310","\uD83D\uDDFE":"1F5FE","\uD83D\uDDFB":"1F5FB","\uD83C\uDF0C":"1F30C","\uD83C\uDF0B":"1F30B","\uD83C\uDF0A":"1F30A","\uD83C\uDF08":"1F308","\uD83C\uDF05":"1F305","\uD83C\uDF04":"1F304","\uD83C\uDF20":"1F320","\u2B50\uFE0F":"2B50","\u2B50":"2B50","\uD83C\uDF1F":"1F31F","\u2744\uFE0F":"2744","\uD83D\uDCA8":"1F4A8","\uD83C\uDF2B":"1F32B","\u2614\uFE0F":"2614","\uD83D\uDCA6":"1F4A6","\uD83D\uDCA7":"1F4A7","\uD83C\uDF2A":"1F32A","\uD83C\uDF29":"1F329","\uD83C\uDF28":"1F328","\uD83C\uDF27":"1F327","\u2601\uFE0F":"2601","\u26C5\uFE0F":"26C5","\u26C5":"26C5","\u2600\uFE0F":"2600","\uD83C\uDF19":"1F319","\uD83D\uDD25":"1F525","\u26A1\uFE0F":"26A1","\u26A1":"26A1","\uD83D\uDC3E":"1F43E","\uD83D\uDD78":"1F578","\uD83D\uDD77":"1F577","\uD83D\uDC1E":"1F41E","\uD83D\uDC1D":"1F41D","\uD83D\uDC1C":"1F41C","\uD83D\uDC1B":"1F41B","\uD83D\uDC0C":"1F40C","\uD83D\uDC1A":"1F41A","\uD83D\uDC21":"1F421","\uD83D\uDC20":"1F420","\uD83D\uDC1F":"1F41F","\uD83D\uDC19":"1F419","\uD83D\uDC2C":"1F42C","\uD83D\uDC33":"1F433","\uD83D\uDC0B":"1F40B","\uD83D\uDC38":"1F438","\uD83D\uDC22":"1F422","\uD83D\uDC0D":"1F40D","\uD83D\uDC0A":"1F40A","\uD83D\uDC32":"1F432","\uD83D\uDC09":"1F409","\uD83D\uDC12":"1F412","\uD83D\uDE4A":"1F64A","\uD83D\uDE49":"1F649","\uD83D\uDE48":"1F648","\uD83D\uDC35":"1F435","\uD83D\uDC3C":"1F43C","\uD83D\uDC28":"1F428","\uD83D\uDC3B":"1F43B","\uD83D\uDC3A":"1F43A","\uD83D\uDC36":"1F436","\uD83D\uDC29":"1F429","\uD83D\uDC15":"1F415","\uD83D\uDC3D":"1F43D","\uD83D\uDC37":"1F437","\uD83D\uDC16":"1F416","\uD83D\uDC17":"1F417","\uD83D\uDC2B":"1F42B","\uD83D\uDC2A":"1F42A","\uD83D\uDC18":"1F418","\uD83D\uDC27":"1F427","\uD83D\uDC26":"1F426","\uD83D\uDC25":"1F425","\uD83D\uDC23":"1F423","\uD83D\uDC24":"1F424","\uD83D\uDC14":"1F414","\uD83D\uDC13":"1F413","\uD83D\uDC10":"1F410","\uD83D\uDC11":"1F411","\uD83D\uDC0F":"1F40F","\uD83D\uDC34":"1F434","\uD83D\uDC0E":"1F40E","\uD83D\uDC31":"1F431","\uD83D\uDC08":"1F408","\uD83D\uDC30":"1F430","\uD83D\uDC07":"1F407","\uD83D\uDC3F":"1F43F","\uD83D\uDC2F":"1F42F","\uD83D\uDC06":"1F406","\uD83D\uDC05":"1F405","\uD83D\uDC2E":"1F42E","\uD83D\uDC04":"1F404","\uD83D\uDC03":"1F403","\uD83D\uDC02":"1F402","\uD83D\uDC39":"1F439","\uD83D\uDC2D":"1F42D","\uD83D\uDC01":"1F401","\uD83D\uDC00":"1F400","\uD83C\uDF30":"1F330","\uD83C\uDF44":"1F344","\uD83C\uDF43":"1F343","\uD83C\uDF42":"1F342","\uD83C\uDF41":"1F341","\uD83C\uDF40":"1F340","\uD83C\uDF3F":"1F33F","\uD83C\uDF3E":"1F33E","\uD83D\uDC90":"1F490","\uD83C\uDF3C":"1F33C","\uD83C\uDF3B":"1F33B","\uD83C\uDF3A":"1F33A","\uD83C\uDF39":"1F339","\uD83C\uDF38":"1F338","\uD83C\uDF37":"1F337","\uD83C\uDF35":"1F335","\uD83C\uDF34":"1F334","\uD83C\uDF33":"1F333","\uD83C\uDF32":"1F332","\uD83C\uDF31":"1F331","\uD83D\uDE4F":"1F64F","\uD83D\uDD9F":"1F59F","\uD83D\uDD9E":"1F59E","\uD83D\uDD99":"1F599","\uD83D\uDD98":"1F598","\uD83D\uDD97":"1F597","\uD83D\uDD96":"1F596","\uD83D\uDD95":"1F595","\uD83D\uDD94":"1F594","\uD83D\uDD93":"1F593","\uD83D\uDD92":"1F592","\uD83D\uDD91":"1F591","\uD83D\uDD90":"1F590","\uD83D\uDD8F":"1F58F","\uD83D\uDD8E":"1F58E","\uD83D\uDC50":"1F450","\uD83D\uDCAA":"1F4AA","\u270B":"270B","\u270A":"270A","\uD83D\uDC4A":"1F44A","\u270C\uFE0F":"270C","\u270C":"270C","\uD83D\uDC4C":"1F44C","\uD83D\uDC49":"1F449","\uD83D\uDC48":"1F448","\uD83D\uDC47":"1F447","\uD83D\uDC46":"1F446","\u261D\uFE0F":"261D","\u261D":"261D","\uD83D\uDC4E":"1F44E","\uD83D\uDC4D":"1F44D","\uD83D\uDC4B":"1F44B","\uD83D\uDC85":"1F485","\uD83D\uDC45":"1F445","\uD83D\uDC8B":"1F48B","\uD83D\uDDE2":"1F5E2","\uD83D\uDC44":"1F444","\uD83D\uDC43":"1F443","\uD83D\uDC40":"1F440","\uD83D\uDC41":"1F441","\uD83D\uDC42":"1F442","\uD83D\uDC4F":"1F44F","\uD83D\uDE4C":"1F64C","\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68":"1F468-2764-1F48B-1F468","\uD83D\uDC68\u2764\uD83D\uDC8B\uD83D\uDC68":"1F468-2764-1F48B-1F468","\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC69":"1F469-2764-1F48B-1F469","\uD83D\uDC69\u2764\uD83D\uDC8B\uD83D\uDC69":"1F469-2764-1F48B-1F469","\uD83D\uDC8F":"1F48F","\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68":"1F468-2764-1F468","\uD83D\uDC68\u2764\uD83D\uDC68":"1F468-2764-1F468","\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69":"1F469-2764-1F469","\uD83D\uDC69\u2764\uD83D\uDC69":"1F469-2764-1F469","\uD83D\uDC91":"1F491","\uD83D\uDC87":"1F487","\uD83D\uDC86":"1F486","\uD83D\uDE4D":"1F64D","\uD83D\uDE4E":"1F64E","\uD83D\uDE4B":"1F64B","\uD83D\uDE46":"1F646","\uD83D\uDE45":"1F645","\uD83D\uDC81":"1F481","\uD83D\uDE47":"1F647","\uD83D\uDC7E":"1F47E","\uD83D\uDC7D":"1F47D","\uD83D\uDC80":"1F480","\uD83D\uDCA9":"1F4A9","\uD83D\uDC7A":"1F47A","\uD83D\uDC79":"1F479","\uD83D\uDC7B":"1F47B","\uD83C\uDF85":"1F385","\uD83D\uDC7C":"1F47C","\uD83D\uDC82":"1F482","\uD83D\uDC78":"1F478","\uD83D\uDC77":"1F477","\uD83D\uDC6E":"1F46E","\uD83D\uDC75":"1F475","\uD83D\uDC74":"1F474","\uD83D\uDC73":"1F473","\uD83D\uDC72":"1F472","\uD83D\uDC71":"1F471","\uD83D\uDC70":"1F470","\uD83D\uDC6F":"1F46F","\uD83D\uDC6D":"1F46D","\uD83D\uDC6C":"1F46C","\uD83D\uDC6B":"1F46B","\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC67":"1F468-1F468-1F467-1F467","\uD83D\uDC68\uD83D\uDC68\uD83D\uDC67\uD83D\uDC67":"1F468-1F468-1F467-1F467","\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66\u200D\uD83D\uDC66":"1F468-1F468-1F466-1F466","\uD83D\uDC68\uD83D\uDC68\uD83D\uDC66\uD83D\uDC66":"1F468-1F468-1F466-1F466","\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67":"1F468-1F468-1F467","\uD83D\uDC68\uD83D\uDC68\uD83D\uDC67\uD83D\uDC66":"1F468-1F468-1F467-1F466","\uD83D\uDC68\uD83D\uDC68\uD83D\uDC67":"1F468-1F468-1F467","\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66":"1F468-1F468-1F466","\uD83D\uDC68\uD83D\uDC68\uD83D\uDC66":"1F468-1F468-1F466","\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67":"1F469-1F469-1F467-1F467","\uD83D\uDC69\uD83D\uDC69\uD83D\uDC67\uD83D\uDC67":"1F469-1F469-1F467-1F467","\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66":"1F469-1F469-1F466-1F466","\uD83D\uDC69\uD83D\uDC69\uD83D\uDC66\uD83D\uDC66":"1F469-1F469-1F466-1F466","\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66":"1F469-1F469-1F467-1F466","\uD83D\uDC69\uD83D\uDC69\uD83D\uDC67\uD83D\uDC66":"1F469-1F469-1F467-1F466","\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67":"1F469-1F469-1F467","\uD83D\uDC69\uD83D\uDC69\uD83D\uDC67":"1F469-1F469-1F467","\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66":"1F469-1F469-1F466","\uD83D\uDC69\uD83D\uDC69\uD83D\uDC66":"1F469-1F469-1F466","\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67":"1F468-1F469-1F467-1F467","\uD83D\uDC68\uD83D\uDC69\uD83D\uDC67\uD83D\uDC67":"1F468-1F469-1F467-1F467","\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66":"1F468-1F469-1F466-1F466","\uD83D\uDC68\uD83D\uDC69\uD83D\uDC66\uD83D\uDC66":"1F468-1F469-1F466-1F466","\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66":"1F468-1F469-1F467-1F466","\uD83D\uDC68\uD83D\uDC69\uD83D\uDC67\uD83D\uDC66":"1F468-1F469-1F467-1F466","\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67":"1F468-1F469-1F467","\uD83D\uDC68\uD83D\uDC69\uD83D\uDC67":"1F468-1F469-1F467","\uD83D\uDC6A":"1F46A","\uD83D\uDC69":"1F469","\uD83D\uDC68":"1F468","\uD83D\uDC67":"1F467","\uD83D\uDC66":"1F466","\uD83D\uDC76":"1F476","\uD83D\uDD75":"1F575","\uD83D\uDD74":"1F574","\uD83D\uDC65":"1F465","\uD83D\uDC64":"1F464","\uD83D\uDC63":"1F463","\uD83D\uDE40":"1F640","\uD83D\uDE3F":"1F63F","\uD83D\uDE3E":"1F63E","\uD83D\uDE3D":"1F63D","\uD83D\uDE3C":"1F63C","\uD83D\uDE3B":"1F63B","\uD83D\uDE3A":"1F63A","\uD83D\uDE39":"1F639","\uD83D\uDE38":"1F638","\uD83D\uDE42":"1F642","\uD83D\uDE41":"1F641","\uD83D\uDE37":"1F637","\uD83D\uDE36":"1F636","\uD83D\uDE35":"1F635","\uD83D\uDE34":"1F634","\uD83D\uDE33":"1F633","\uD83D\uDE32":"1F632","\uD83D\uDE31":"1F631","\uD83D\uDE30":"1F630","\uD83D\uDE2F":"1F62F","\uD83D\uDE2E":"1F62E","\uD83D\uDE2D":"1F62D","\uD83D\uDE2C":"1F62C","\uD83D\uDE2B":"1F62B","\uD83D\uDE2A":"1F62A","\uD83D\uDE29":"1F629","\uD83D\uDE28":"1F628","\uD83D\uDE27":"1F627","\uD83D\uDE26":"1F626","\uD83D\uDE25":"1F625","\uD83D\uDE24":"1F624","\uD83D\uDE23":"1F623","\uD83D\uDE22":"1F622","\uD83D\uDE21":"1F621","\uD83D\uDE20":"1F620","\uD83D\uDE1F":"1F61F","\uD83D\uDE1E":"1F61E","\uD83D\uDE1D":"1F61D","\uD83D\uDE1C":"1F61C","\uD83D\uDE1B":"1F61B","\uD83D\uDE1A":"1F61A","\uD83D\uDE19":"1F619","\uD83D\uDE18":"1F618","\uD83D\uDE17":"1F617","\uD83D\uDE16":"1F616","\uD83D\uDE15":"1F615","\uD83D\uDE14":"1F614","\uD83D\uDE13":"1F613","\uD83D\uDE12":"1F612","\uD83D\uDE11":"1F611","\uD83D\uDE10":"1F610","\uD83D\uDE0F":"1F60F","\uD83D\uDE0E":"1F60E","\uD83D\uDE0D":"1F60D","\uD83D\uDE0C":"1F60C","\uD83D\uDE0B":"1F60B","\u263A\uFE0F":"263A","\u263A":"263A","\uD83D\uDE0A":"1F60A","\uD83D\uDE09":"1F609","\uD83D\uDC7F":"1F47F","\uD83D\uDE08":"1F608","\uD83D\uDE07":"1F607","\uD83D\uDE06":"1F606","\uD83D\uDE05":"1F605","\uD83D\uDE04":"1F604","\uD83D\uDE03":"1F603","\uD83D\uDE02":"1F602","\uD83D\uDE01":"1F601","\uD83D\uDE00":"1F600"};
	    ns.imagePathPNG = '//cdn.jsdelivr.net/emojione/assets/png/';
	    ns.imagePathSVG = '//cdn.jsdelivr.net/emojione/assets/svg/';
	    ns.imagePathSVGSprites = './../assets/sprites/emojione.sprites.svg';
	    ns.imageType = 'png'; // or svg
	    ns.sprites = false; // if this is true then sprite markup will be used (if SVG image type is set then you must include the SVG sprite file locally)
	    ns.unicodeAlt = true; // use the unicode char as the alt attribute (makes copy and pasting the resulting text better)
	    ns.ascii = false; // change to true to convert ascii smileys
	    ns.cacheBustParam = '?v=1.2.4'; // you can [optionally] modify this to force browsers to refresh their cache. it will be appended to the send of the filenames

	    ns.toImage = function(str) {
	        str = ns.unicodeToImage(str);
	        str = ns.shortnameToImage(str);
	        return str;
	    };

	    // Uses toShort to transform all unicode into a standard shortname
	    // then transforms the shortname into unicode
	    // This is done for standardization when converting several unicode types
	    ns.unifyUnicode = function(str) {
	        str = ns.toShort(str);
	        str = ns.shortnameToUnicode(str);
	        return str;
	    };

	    // Replace shortnames (:wink:) with Ascii equivalents ( ;^) )
	    // Useful for systems that dont support unicode nor images
	    ns.shortnameToAscii = function(str) {
	        var unicode,
	            // something to keep in mind here is that array flip will destroy
	            // half of the ascii text "emojis" because the unicode numbers are duplicated
	            // this is ok for what it's being used for
	            unicodeToAscii = ns.objectFlip(ns.asciiList);

	        str = str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+ns.shortnames+")", "gi"),function(shortname) {
	            if( (typeof shortname === 'undefined') || (shortname === '') || (!(shortname in ns.emojioneList)) ) {
	                // if the shortname doesnt exist just return the entire match
	                return shortname;
	            }
	            else {
	                unicode = ns.emojioneList[shortname][ns.emojioneList[shortname].length-1].toLowerCase();
	                if(typeof unicodeToAscii[unicode] !== 'undefined') {
	                    return unicodeToAscii[unicode];
	                } else {
	                    return shortname;
	                }
	            }
	        });
	        return str;
	    };

	    // will output unicode from shortname
	    // useful for sending emojis back to mobile devices
	    ns.shortnameToUnicode = function(str) {
	        // replace regular shortnames first
	        var unicode;
	        str = str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+ns.shortnames+")", "gi"),function(shortname) {
	            if( (typeof shortname === 'undefined') || (shortname === '') || (!(shortname in ns.emojioneList)) ) {
	                // if the shortname doesnt exist just return the entire match
	                return shortname;
	            }
	            unicode = ns.emojioneList[shortname][ns.emojioneList[shortname].length-1].toUpperCase();
	            return ns.convert(unicode);
	        });

	        // if ascii smileys are turned on, then we'll replace them!
	        if (ns.ascii) {

	            str = str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|((\\s|^)"+ns.asciiRegexp+"(?=\\s|$|[!,.?]))","g"),function(entire, m1, m2, m3) {
	                if( (typeof m3 === 'undefined') || (m3 === '') || (!(ns.unescapeHTML(m3) in ns.asciiList)) ) {
	                    // if the shortname doesnt exist just return the entire match
	                    return entire;
	                }

	                m3 = ns.unescapeHTML(m3);
	                unicode = ns.asciiList[m3].toUpperCase();
	                return m2+ns.convert(unicode);
	            });
	        }

			return str;
	    };

	    ns.shortnameToImage = function(str) {
	        // replace regular shortnames first
	        var replaceWith,unicode,alt;
	        str = str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+ns.shortnames+")", "gi"),function(shortname) {
	            if( (typeof shortname === 'undefined') || (shortname === '') || (!(shortname in ns.emojioneList)) ) {
	                // if the shortname doesnt exist just return the entire match
	                return shortname;
	            }
	            else {
	                unicode = ns.emojioneList[shortname][ns.emojioneList[shortname].length-1].toUpperCase();

	                // depending on the settings, we'll either add the native unicode as the alt tag, otherwise the shortname
	                alt = (ns.unicodeAlt) ? ns.convert(unicode) : shortname;

	                if(ns.imageType === 'png') {
	                    if(ns.sprites) {
	                        replaceWith = '<span class="emojione-'+unicode+'" title="'+shortname+'">'+alt+'</span>';
	                    }
	                    else {
	                        replaceWith = '<img class="emojione" alt="'+alt+'" src="'+ns.imagePathPNG+unicode+'.png'+ns.cacheBustParam+'"/>';
	                    }
	                }
	                else {
	                    // svg
	                    if(ns.sprites) {
	                        replaceWith = '<svg class="emojione"><description>'+alt+'</description><use xlink:href="'+ns.imagePathSVGSprites+'#emoji-'+unicode+'"></use></svg>';
	                    }
	                    else {
	                        replaceWith = '<object class="emojione" data="'+ns.imagePathSVG+unicode+'.svg'+ns.cacheBustParam+'" type="image/svg+xml" standby="'+alt+'">'+alt+'</object>';
	                    }
	                }

	                return replaceWith;
	            }
	        });

	        // if ascii smileys are turned on, then we'll replace them!
	        if (ns.ascii) {

	            str = str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|((\\s|^)"+ns.asciiRegexp+"(?=\\s|$|[!,.?]))","g"),function(entire, m1, m2, m3) {
	                if( (typeof m3 === 'undefined') || (m3 === '') || (!(ns.unescapeHTML(m3) in ns.asciiList)) ) {
	                    // if the shortname doesnt exist just return the entire match
	                    return entire;
	                }

	                m3 = ns.unescapeHTML(m3);
	                unicode = ns.asciiList[m3].toUpperCase();

	                // depending on the settings, we'll either add the native unicode as the alt tag, otherwise the shortname
	                alt = (ns.unicodeAlt) ? ns.convert(unicode) : ns.escapeHTML(m3);

	                if(ns.imageType === 'png') {
	                    if(ns.sprites) {
	                        replaceWith = m2+'<span class="emojione-'+unicode.toUpperCase()+'" title="'+ns.escapeHTML(m3)+'">'+alt+'</span>';
	                    }
	                    else {
	                        replaceWith = m2+'<img class="emojione" alt="'+alt+'" src="'+ns.imagePathPNG+unicode+'.png'+ns.cacheBustParam+'"/>';
	                    }
	                }
	                else {
	                    // svg
	                    if(ns.sprites) {
	                        replaceWith = '<svg class="emojione"><description>'+alt+'</description><use xlink:href="'+ns.imagePathSVGSprites+'#emoji-'+unicode.toUpperCase()+'"></use></svg>';
	                    }
	                    else {
	                        replaceWith = m2+'<object class="emojione" data="'+ns.imagePathSVG+unicode+'.svg'+ns.cacheBustParam+'" type="image/svg+xml" standby="'+alt+'">'+alt+'</object>';
	                    }
	                }

	                return replaceWith;
	            });
	        }

	        return str;
	    };

	    ns.unicodeToImage = function(str) {

	        var replaceWith,unicode,alt;

	        if((!ns.unicodeAlt) || (ns.sprites)) {
	            // if we are using the shortname as the alt tag then we need a reversed array to map unicode code point to shortnames
	            var mappedUnicode = ns.mapShortToUnicode();
	        }

	        str = str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+ns.unicodeRegexp+")", "gi"),function(unicodeChar) {
	            if( (typeof unicodeChar === 'undefined') || (unicodeChar === '') || (!(unicodeChar in ns.jsecapeMap)) ) {
	                // if the unicodeChar doesnt exist just return the entire match
	                return unicodeChar;
	            }
	            else {
	                // get the unicode codepoint from the actual char
	                unicode = ns.jsecapeMap[unicodeChar];

	                // depending on the settings, we'll either add the native unicode as the alt tag, otherwise the shortname
	                alt = (ns.unicodeAlt) ? ns.convert(unicode) : mappedUnicode[unicode];

	                if(ns.imageType === 'png') {
	                    if(ns.sprites) {
	                        replaceWith = '<span class="emojione-'+unicode.toUpperCase()+'" title="'+mappedUnicode[unicode]+'">'+alt+'</span>';
	                    }
	                    else {
	                        replaceWith = '<img class="emojione" alt="'+alt+'" src="'+ns.imagePathPNG+unicode+'.png'+ns.cacheBustParam+'"/>';
	                    }
	                }
	                else {
	                    // svg
	                    if(ns.sprites) {
	                        replaceWith = '<svg class="emojione"><description>'+alt+'</description><use xlink:href="'+ns.imagePathSVGSprites+'#emoji-'+unicode.toUpperCase()+'"></use></svg>';
	                    }
	                    else {
	                        replaceWith = '<img class="emojione" alt="'+alt+'" src="'+ns.imagePathSVG+unicode+'.svg'+ns.cacheBustParam+'"/>';
	                    }
	                }

	                return replaceWith;
	            }
	        });

	        return str;
	    };

	    // super simple loop to replace all unicode emoji to shortnames
	    // needs to be improved into one big replacement instead, for performance reasons
	    ns.toShort = function(str) { // this is really just unicodeToShortname() but I opted for the shorthand name to match toImage()
	        for (var shortcode in ns.emojioneList) {
	            if (!ns.emojioneList.hasOwnProperty(shortcode)) { continue; }
	            for(var i = 0, len = ns.emojioneList[shortcode].length; i < len; i++){
	                var unicode = ns.emojioneList[shortcode][i].toUpperCase();
	                str = ns.replaceAll(str,ns.convert(unicode),shortcode);
	            }
	        }
	        return str;
	    };

	    // for converting unicode code points and code pairs to their respective characters
	    ns.convert = function(unicode) {
	        if(unicode.indexOf("-") > -1) {
	            var parts = [];
	            var s = unicode.split('-');
	            for(var i = 0; i < s.length; i++) {
	                var part = parseInt(s[i], 16);
	                if (part >= 0x10000 && part <= 0x10FFFF) {
	                    var hi = Math.floor((part - 0x10000) / 0x400) + 0xD800;
	                    var lo = ((part - 0x10000) % 0x400) + 0xDC00;
	                    part = (String.fromCharCode(hi) + String.fromCharCode(lo));
	                }
	                else {
	                    part = String.fromCharCode(part);
	                }
	                parts.push(part);
	            }
	            return parts.join('');
	        }
	        else {
	            var s = parseInt(unicode, 16);
	            if (s >= 0x10000 && s <= 0x10FFFF) {
	                var hi = Math.floor((s - 0x10000) / 0x400) + 0xD800;
	                var lo = ((s - 0x10000) % 0x400) + 0xDC00;
	                return (String.fromCharCode(hi) + String.fromCharCode(lo));
	            }
	            else {
	                return String.fromCharCode(s);
	            }
	        }
	    };

	    ns.escapeHTML = function (string) {
	        var escaped = {
	            '&' : '&amp;',
	            '<' : '&lt;',
	            '>' : '&gt;',
	            '"' : '&quot;',
	            '\'': '&#039;'
	        };

	        return string.replace(/[&<>"']/g, function (match) {
	            return escaped[match];
	        });
	    };
	    ns.unescapeHTML = function (string) {
	        var unescaped = {
	            '&amp;'  : '&',
	            '&#38;'  : '&',
	            '&#x26;' : '&',
	            '&lt;'   : '<',
	            '&#60;'  : '<',
	            '&#x3C;' : '<',
	            '&gt;'   : '>',
	            '&#62;'  : '>',
	            '&#x3E;' : '>',
	            '&quot;' : '"',
	            '&#34;'  : '"',
	            '&#x22;' : '"',
	            '&apos;' : '\'',
	            '&#39;'  : '\'',
	            '&#x27;' : '\''
	        };

	        return string.replace(/&(?:amp|#38|#x26|lt|#60|#x3C|gt|#62|#x3E|apos|#39|#x27|quot|#34|#x22);/ig, function (match) {
	            return unescaped[match];
	        });
	    };
	    ns.mapShortToUnicode = function() {
	        var new_obj = {};
	        for (var shortname in ns.emojioneList) {
	            if (!ns.emojioneList.hasOwnProperty(shortname)) { continue; }
	            for(var i = 0, len = ns.emojioneList[shortname].length; i < len; i++){
	                new_obj[ns.emojioneList[shortname][i].toUpperCase()] = shortname;
	            }
	        }
	        return new_obj;
	    };
	    //reverse an object
	    ns.objectFlip = function (obj) {
	        var key, tmp_obj = {};

	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                tmp_obj[obj[key]] = key;
	            }
	        }

	        return tmp_obj;
	    };

	    ns.escapeRegExp = function(string) {
	        return string.replace(/[-[\]{}()*+?.,;:&\\^$|#\s]/g, "\\$&");
	    };

	    ns.replaceAll = function(string, find, replaceWith) {

	        var search = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+find+")", "gi");

	        // callback prevents replacing anything inside of these common html tags as well as between an <object></object> tag
	        var replace = function(entire, m1) {
	            return ((typeof  m1 === 'undefined') || (m1 === '')) ? entire : replaceWith;
	        };

	        return string.replace(search,replace);
	    };

	}(this.emojione = this.emojione || {}));
	if(true) module.exports = this.emojione;


/***/ }
/******/ ]);