
riot.tag2('grid2', '<div style="display:none"></div> <div class="gridheader"><yield></yield></div> <div onscroll="{scrolling}" riot-style="height:{parseInt(opts.height,10)-30}px" class="gridbody"> <div riot-style="position:relative;height:{rowheight*opts.data.length}px;background:white" class="scrollblock"> <div each="{row, i in visibleRows}" riot-style="top:{parent.rowheight*(i+parent.scrollTop)}px" ondblclick="{handleDblClick}" onclick="{handleClick}" class="gridrow {active:parent.active==row.id}"><yield></yield></div> </div> </div>', 'grid2 { position: relative; display: block; border: 1px solid #ccc; } grid2 .gridheader gridrow, grid2 .gridrow gridheader { display: none; } grid2 .gridheader { background: #ddd; position: absolute; top: 0; right: 0; left: 0; border-bottom: 1px solid #ccc; } grid2 .gridrow > gridrow > *, grid2 .gridheader > gridheader > * { box-sizing: border-box; display: inline-block; float: left; padding: 0 10px 0 10px; line-height: 30px; white-space: nowrap; overflow: hidden; border-right: 1px solid rgba(0,0,0,0.1); } grid2 .gridbody { margin-top: 32px; display: block; overflow: auto; } grid2 .gridrow { cursor: pointer; position: absolute; overflow: hidden; white-space: nowrap; height: 30px; left: 0; right: 0; } grid2 .gridrow:nth-of-type(odd) { background: #eee; } grid2 .gridrow.active { background: #888; color: #fff; }', '', function(opts) {
this.active = false;

this.rowheight = opts.rowheight || 30;

this.scrollTop = 0;

this.scrollBottom = 10;

this.prevScrollTop = -1;

this.mountcount = 0;

this.on('mount', (function(_this) {
  return function() {
    if (opts.active) {
      _this.active = opts.active;
    }
    return _this.root.querySelector('.gridheader gridrow').remove();
  };
})(this));

this.on('update', function() {
  var oldScrolltop;
  this.gridbody = this.root.querySelector(".gridbody");
  if (!opts.data) {
    return;
  }
  if (!this.gridbody) {
    return setTimeout(this.update, 100);
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
    _this.active = e.item.row.id;
    if (typeof opts.onselect !== "function") {
      return;
    }
    return setTimeout((function() {
      return opts.onselect(e.item.row);
    }), 50);
  };
})(this);

this.handleDblClick = (function(_this) {
  return function(e) {
    if (!opts.onedit) {
      return;
    }
    _this.active = e.item.row.id;
    return setTimeout(function() {
      if ((opts.onedit != null) && typeof opts.onedit === "function") {
        return opts.onedit(e.item.row);
      }
    }, 50);
  };
})(this);
}, '{ }');