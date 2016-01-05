grid
  <yield />
 
  style(type="text/stylus").
    grid
      position relative
      display block
      border 1px solid #ccc
      gridhead 
        background #ddd
        position absolute
        top 0 
        right 0
        left 0
        border-bottom 1px solid #ccc
      .gridrow > *,gridhead > *
        box-sizing border-box
        display inline-block
        float left
        padding 0 10px 0 10px
        line-height 30px
        white-space nowrap
        overflow hidden
        border-right 1px solid rgba(0,0,0,0.1)
      .gridbody
        margin-top 32px
        display block
        overflow auto
      .gridrow
        cursor pointer
        position absolute
        overflow hidden
        white-space nowrap
        height 30px
        left 0
        right 0

      .gridrow:nth-of-type(odd)
        background #eee
      .gridrow.active
        background #888
        color white

gridhead
  <yield />

gridbody
  .gridbody(onscroll='{scrolling}', style='height:{parseInt(parent.opts.height,10)-30}px')
    .scrollblock(style='position:relative;height:{rowheight*parent.opts.data.length}px;background:white')
      .gridrow(each='{row, i in visibleRows}', class='{active:isActive(row)}', style='top:{rowheight*(i+scrollTop)}px',ondblclick='{handleDblClick}', onclick='{handleClick}')
        <yield></yield>

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  script(type='text/coffee').
    @active = []
    @hasFocus = false
    @scrollTop = 0 
    @scrollBottom = 10 #default to rendering 10 rows
    @prevScrollTop = -1
    @downKey = 40
    @upKey = 38

    # @on 'error',(err)-> console.error err.message

    @on 'mount',->
      @rowheight = @parent.opts?.rowheight || 30
      @active = @parent.opts.active if @parent.opts.active?
      document.addEventListener 'keydown',@keydown
      ['click','focus','blur'].forEach (ev)=> @root.addEventListener ev,@focused
      @update()

    @on 'unmount',->
      document.removeEventListener 'keydown',@keydown
      ['click','focus','blur'].forEach (ev)=> @root.removeEventListener ev,@focused
      
    @on 'update',->
      @gridbody = @root.querySelector(".gridbody")
      return if !@parent.opts.data
      oldScrolltop = @scrollTop   
      @scrollTop = Math.round((@gridbody.scrollTop / @rowheight)/2)*2 -10
      @scrollTop = 0 if @scrollTop < 0
      @scrollBottom = @scrollTop+Math.round((@gridbody.offsetHeight / @rowheight)/2)*2 +20
      @visibleRows = @parent.opts.data.slice(@scrollTop,@scrollBottom)
      if @keyPressed
        @activePos = (@keyPressed*@rowheight)-(@gridbody.offsetHeight/2)+@rowheight/2
        @gridbody.scrollTop = @activePos if @activePos > 0
        @gridbody.scrollTop = 0   if @activePos < 0
        @keyPressed = false

    @focused = =>
      if @parent.root == document.activeElement then @update(hasFocus:true) else @update(hasFocus:false)

    @isActive = (row)=>
      @active.indexOf(row)>-1

    @keydown = (e)=>
      return @update(hasFocus:false) if @parent.root != document.activeElement
      return if e.keyCode != @downKey && e.keyCode != @upKey
      @hasFocus = true
      index = @parent.opts.data.indexOf(@active[@active.length-1])
      index++ if e.keyCode == @downKey
      index-- if e.keyCode == @upKey
      index = 0 if index < 0
      index = @parent.opts.data.length-1 if index >= @parent.opts.data.length
      @keyPressed = index
      row = @parent.opts.data[index]
      if e.shiftKey
        idx = @active.indexOf(row)
        if idx>-1 then @active.splice(idx,1) else @active.push(row)
      else
        @active = [row]
      @parent.opts.onchange(@active) if @parent.opts.onchange? && typeof @parent.opts.onchange == "function"
      e.preventDefault() if e.keyCode == @downKey || e.keyCode == @upKey
      @update()

    @scrolling = (e)=>
      @update()

    @handleClick = (e)=>
      return if !@parent.opts.click
      if e.shiftKey && @firstSelectedIndex?
        idx1 = @firstSelectedIndex
        idx2 = @parent.opts.data.indexOf(e.item.row)
        @active = [Math.min(idx1,idx2)..Math.max(idx1,idx2)].map (i)=> @parent.opts.data[i]
      else if e.metaKey
        idx = @active.indexOf(e.item.row)
        if idx>-1 then @active.splice(idx,1) else @active.push(e.item.row)
      else
        @active = [e.item.row]
        @firstSelectedIndex = @parent.opts.data.indexOf(e.item.row)
      window.getSelection().removeAllRanges()
      @parent.opts.click(e.item.row) if @parent.opts.click? && typeof @parent.opts.click == "function"
      @parent.opts.onchange(@active) if @parent.opts.onchange? && typeof @parent.opts.onchange == "function"

    @handleDblClick = (e)=>
      return if !@parent.opts.dblclick
      @active = [e.item.row]
      @parent.opts.dblclick(e.item.row) if @parent.opts.dblclick? && typeof @parent.opts.dblclick == "function"

