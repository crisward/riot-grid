
riot.tag2('grid', '<div class="gridhead"> <yield from="head"></yield> </div> <div onscroll="{scrolling}" riot-style="height:{parseInt(opts.height,10)-30}px" class="gridbody"> <div riot-style="position:relative;height:{rowheight*opts.data.length}px;background:white" class="scrollblock"> <div each="{row, i in visibleRows}" riot-style="top:{rowheight*(i+scrollTop)}px" ondblclick="{handleDblClick}" onclick="{handleClick}" class="gridrow {active:active==row}"><yield from="body"></yield></div> </div> </div>', 'grid { position: relative; display: block; border: 1px solid #ccc; } grid .gridhead { background: #ddd; position: absolute; top: 0; right: 0; left: 0; border-bottom: 1px solid #ccc; } grid .gridrow > *, grid .gridhead > * { box-sizing: border-box; display: inline-block; float: left; padding: 0 10px 0 10px; line-height: 30px; white-space: nowrap; overflow: hidden; border-right: 1px solid rgba(0,0,0,0.1); } grid .gridbody { margin-top: 32px; display: block; overflow: auto; } grid .gridrow { cursor: pointer; position: absolute; overflow: hidden; white-space: nowrap; height: 30px; left: 0; right: 0; } grid .gridrow:nth-of-type(odd) { background: #eee; } grid .gridrow.active { background: #888; color: #fff; }', '', function(opts) {
this.active = false;

this.scrollTop = 0;

this.scrollBottom = 10;

this.prevScrollTop = -1;

this.on('error', function(err) {
  return console.error(err.message);
});

this.on('mount', (function(_this) {
  return function() {
    _this.rowheight = (typeof opts !== "undefined" && opts !== null ? opts.rowheight : void 0) || 30;
    if (opts.active != null) {
      return _this.active = opts.active;
    }
  };
})(this));

this.on('update', function() {
  var oldScrolltop;
  this.gridbody = this.root.querySelector(".gridbody");
  if (!opts.data) {
    return;
  }
  oldScrolltop = this.scrollTop;
  this.scrollTop = Math.round((this.gridbody.scrollTop / this.rowheight) / 2) * 2 - 10;
  if (this.scrollTop !== oldScrolltop) {
    setTimeout(this.update, 100);
  }
  if (this.scrollTop < 0) {
    this.scrollTop = 0;
  }
  this.scrollBottom = this.scrollTop + Math.round((this.gridbody.offsetHeight / this.rowheight) / 2) * 2 + 20;
  return this.visibleRows = opts.data.slice(this.scrollTop, this.scrollBottom);
});

this.scrolling = (function(_this) {
  return function(e) {
    return _this.update();
  };
})(this);

this.handleClick = (function(_this) {
  return function(e) {
    if (!opts.onselect) {
      return;
    }
    _this.active = e.item.row;
    if (typeof opts.onselect !== "function") {
      return;
    }
    return opts.onselect(e.item.row);
  };
})(this);

this.handleDblClick = (function(_this) {
  return function(e) {
    if (!opts.onedit) {
      return;
    }
    _this.active = e.item.row;
    if ((opts.onedit != null) && typeof opts.onedit === "function") {
      return opts.onedit(e.item.row);
    }
  };
})(this);
}, '{ }');