
riot.tag2('grid', '<yield></yield>', 'grid { position: relative; display: block; border: 1px solid #ccc; } grid gridhead { background: #ddd; position: absolute; top: 0; right: 0; left: 0; border-bottom: 1px solid #ccc; } grid .gridrow > *, grid gridhead > * { box-sizing: border-box; display: inline-block; float: left; padding: 0 10px 0 10px; line-height: 30px; white-space: nowrap; overflow: hidden; border-right: 1px solid rgba(0,0,0,0.1); } grid .gridbody { margin-top: 32px; display: block; overflow: auto; } grid .gridrow { cursor: pointer; position: absolute; overflow: hidden; white-space: nowrap; height: 30px; left: 0; right: 0; } grid .gridrow:nth-of-type(odd) { background: #eee; } grid .gridrow.active { background: #888; color: #fff; }', '', function(opts) {
});
riot.tag2('gridhead', '<yield></yield>', '', '', function(opts) {
});
riot.tag2('gridbody', '<div onscroll="{scrolling}" riot-style="height:{parseInt(parent.opts.height,10)-30}px" class="gridbody"> <div riot-style="position:relative;height:{rowheight*parent.opts.data.length}px;background:white" class="scrollblock"> <div each="{row, i in visibleRows}" riot-style="top:{parent.rowheight*(i+parent.scrollTop)}px" ondblclick="{handleDblClick}" onclick="{handleClick}" class="gridrow {active:parent.active==row.id}"><yield></yield></div> </div> </div>', '', '', function(opts) {
this.active = false;

this.scrollTop = 0;

this.scrollBottom = 10;

this.prevScrollTop = -1;

this.on('error', function(err) {
  return console.error(err.message);
});

this.on('mount', (function(_this) {
  return function() {
    var ref;
    _this.rowheight = ((ref = _this.parent.opts) != null ? ref.rowheight : void 0) || 30;
    if (_this.parent.opts.active) {
      return _this.active = _this.parent.opts.active;
    }
  };
})(this));

this.on('update', function() {
  var oldScrolltop;
  this.gridbody = this.root.querySelector(".gridbody");
  if (!this.parent.opts.data) {
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
  return this.visibleRows = this.parent.opts.data.slice(this.scrollTop, this.scrollBottom);
});

this.scrolling = (function(_this) {
  return function(e) {
    return _this.update();
  };
})(this);

this.handleClick = (function(_this) {
  return function(e) {
    if (!_this.parent.opts.onselect) {
      return;
    }
    _this.active = e.item.row.id;
    if (typeof _this.parent.opts.onselect !== "function") {
      return;
    }
    return setTimeout((function() {
      return this.parent.opts.onselect(e.item.row);
    }), 50);
  };
})(this);

this.handleDblClick = (function(_this) {
  return function(e) {
    if (!_this.parent.opts.onedit) {
      return;
    }
    _this.active = e.item.row.id;
    return setTimeout(function() {
      if ((this.parent.opts.onedit != null) && typeof this.parent.opts.onedit === "function") {
        return opts.onedit(e.item.row);
      }
    }, 50);
  };
})(this);
}, '{ }');