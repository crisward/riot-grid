
riot.tag2('grid', '<yield></yield>', 'grid { position: relative; display: block; border: 1px solid #ccc; } grid gridhead { background: #ddd; position: absolute; top: 0; right: 0; left: 0; border-bottom: 1px solid #ccc; } grid .gridrow > *, grid gridhead > * { box-sizing: border-box; display: inline-block; float: left; padding: 0 10px 0 10px; line-height: 30px; white-space: nowrap; overflow: hidden; border-right: 1px solid rgba(0,0,0,0.1); } grid .gridbody { margin-top: 32px; display: block; overflow: auto; } grid .gridrow { cursor: pointer; position: absolute; overflow: hidden; white-space: nowrap; height: 30px; left: 0; right: 0; } grid .gridrow:nth-of-type(odd) { background: #eee; } grid .gridrow.active { background: #888; color: #fff; }', '', function(opts) {
});
riot.tag2('gridhead', '<yield></yield>', '', '', function(opts) {
});
riot.tag2('gridbody', '<div onscroll="{scrolling}" riot-style="height:{parseInt(parent.opts.height,10)-30}px" class="gridbody"> <div riot-style="position:relative;height:{rowheight*parent.opts.data.length}px;background:white" class="scrollblock"> <div each="{row, i in visibleRows}" riot-style="top:{rowheight*(i+scrollTop)}px" ondblclick="{handleDblClick}" onclick="{handleClick}" class="gridrow {active:isActive(row)}"><yield></yield></div> </div> </div>', '', '', function(opts) {
this.active = [];

this.hasFocus = false;

this.scrollTop = 0;

this.scrollBottom = 10;

this.prevScrollTop = -1;

this.downKey = 40;

this.upKey = 38;

this.selectKey = null;

this.on('mount', function() {
  var ref;
  this.rowheight = ((ref = this.parent.opts) != null ? ref.rowheight : void 0) || 30;
  if (this.parent.opts.active != null) {
    this.active = this.parent.opts.active;
  }
  if (this.parent.opts.selectkey != null) {
    this.selectKey = this.parent.opts.selectkey;
  }
  document.addEventListener('keydown', this.keydown);
  ['click', 'focus', 'blur'].forEach((function(_this) {
    return function(ev) {
      return _this.root.addEventListener(ev, _this.focused);
    };
  })(this));
  return this.update();
});

this.on('unmount', function() {
  document.removeEventListener('keydown', this.keydown);
  return ['click', 'focus', 'blur'].forEach((function(_this) {
    return function(ev) {
      return _this.root.removeEventListener(ev, _this.focused);
    };
  })(this));
});

this.on('update', function() {
  var oldScrolltop;
  this.gridbody = this.root.querySelector(".gridbody");
  if (!this.parent.opts.data) {
    return;
  }
  oldScrolltop = this.scrollTop;
  this.scrollTop = Math.round((this.gridbody.scrollTop / this.rowheight) / 2) * 2 - 10;
  if (this.scrollTop < 0) {
    this.scrollTop = 0;
  }
  this.scrollBottom = this.scrollTop + Math.round((this.gridbody.offsetHeight / this.rowheight) / 2) * 2 + 20;
  this.visibleRows = this.parent.opts.data.slice(this.scrollTop, this.scrollBottom);
  if (this.keyPressed) {
    this.activePos = (this.keyPressed * this.rowheight) - (this.gridbody.offsetHeight / 2) + this.rowheight / 2;
    if (this.activePos > 0) {
      this.gridbody.scrollTop = this.activePos;
    }
    if (this.activePos < 0) {
      this.gridbody.scrollTop = 0;
    }
    return this.keyPressed = false;
  }
});

this.focused = (function(_this) {
  return function() {
    if (_this.parent.root === document.activeElement) {
      return _this.update({
        hasFocus: true
      });
    } else {
      return _this.update({
        hasFocus: false
      });
    }
  };
})(this);

this.isActive = (function(_this) {
  return function(row) {
    return _this.active.indexOf(row) > -1 || (row.id && (_this.active.filter(function(s) {
      return s.id === row.id;
    })).length > 0);
  };
})(this);

this.keydown = (function(_this) {
  return function(e) {
    var idx, index, row;
    if (_this.parent.root !== document.activeElement) {
      return _this.update({
        hasFocus: false
      });
    }
    if (e.keyCode !== _this.downKey && e.keyCode !== _this.upKey && e.keyCode !== _this.selectKey) {
      return;
    }
    if (e.keyCode === _this.selectKey && _this.active && (_this.parent.opts.dblclick != null) && typeof _this.parent.opts.dblclick === "function") {
      return _this.parent.opts.dblclick(_this.active[0]);
    }
    _this.hasFocus = true;
    index = _this.parent.opts.data.indexOf(_this.active[_this.active.length - 1]);
    if (e.keyCode === _this.downKey) {
      index++;
    }
    if (e.keyCode === _this.upKey) {
      index--;
    }
    if (index < 0) {
      index = 0;
    }
    if (index >= _this.parent.opts.data.length) {
      index = _this.parent.opts.data.length - 1;
    }
    _this.keyPressed = index;
    row = _this.parent.opts.data[index];
    if (e.shiftKey) {
      idx = _this.active.indexOf(row);
      if (idx > -1) {
        _this.active.splice(idx, 1);
      } else {
        _this.active.push(row);
      }
    } else {
      _this.active = [row];
    }
    if ((_this.parent.opts.onchange != null) && typeof _this.parent.opts.onchange === "function") {
      _this.parent.opts.onchange(_this.active);
    }
    if (e.keyCode === _this.downKey || e.keyCode === _this.upKey) {
      e.preventDefault();
    }
    return _this.update();
  };
})(this);

this.scrolling = (function(_this) {
  return function(e) {
    return _this.update();
  };
})(this);

this.handleClick = (function(_this) {
  return function(e) {
    var idx, idx1, idx2, j, ref, ref1, results;
    if (!_this.parent.opts.click) {
      return;
    }
    if (e.shiftKey && (_this.firstSelectedIndex != null)) {
      idx1 = _this.firstSelectedIndex;
      idx2 = _this.parent.opts.data.indexOf(e.item.row);
      _this.active = (function() {
        results = [];
        for (var j = ref = Math.min(idx1, idx2), ref1 = Math.max(idx1, idx2); ref <= ref1 ? j <= ref1 : j >= ref1; ref <= ref1 ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).map(function(i) {
        return _this.parent.opts.data[i];
      });
    } else if (e.metaKey) {
      idx = _this.active.indexOf(e.item.row);
      if (idx > -1) {
        _this.active.splice(idx, 1);
      } else {
        _this.active.push(e.item.row);
      }
    } else {
      _this.active = [e.item.row];
      _this.firstSelectedIndex = _this.parent.opts.data.indexOf(e.item.row);
    }
    window.getSelection().removeAllRanges();
    if ((_this.parent.opts.click != null) && typeof _this.parent.opts.click === "function") {
      _this.parent.opts.click(e.item.row);
    }
    if ((_this.parent.opts.onchange != null) && typeof _this.parent.opts.onchange === "function") {
      return _this.parent.opts.onchange(_this.active);
    }
  };
})(this);

this.handleDblClick = (function(_this) {
  return function(e) {
    if (!_this.parent.opts.dblclick) {
      return;
    }
    _this.active = [e.item.row];
    if ((_this.parent.opts.dblclick != null) && typeof _this.parent.opts.dblclick === "function") {
      return _this.parent.opts.dblclick(e.item.row);
    }
  };
})(this);
}, '{ }');