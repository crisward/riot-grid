grid2
  div(style="display:none")
    
  .gridheader
    <yield></yield>
  .gridbody(onscroll='{scrolling}', style='height:{parseInt(opts.height,10)-30}px')
    .scrollblock(style='position:relative;height:{rowheight*opts.data.length}px;background:white')
      .gridrow(each='{row, i in visibleRows}', class='{active:parent.active==row.id}', style='top:{parent.rowheight*(i+parent.scrollTop)}px',ondblclick='{handleDblClick}', onclick='{handleClick}')
        <yield></yield>


  style(type="text/stylus").
    grid2
      position relative
      display block
      border 1px solid #ccc
      .gridheader gridrow,.gridrow gridheader
        display none
      .gridheader 
        background #ddd
        position absolute
        top 0 
        right 0
        left 0
        border-bottom 1px solid #ccc
      .gridrow > gridrow > *,.gridheader > gridheader > *
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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  script(type='text/coffeescript').
    @active = false
    @rowheight = opts.rowheight || 30
    @scrollTop = 0 
    @scrollBottom = 10 #default to rendering 10 rows
    @prevScrollTop = -1
    @mountcount = 0

    @on 'mount',=>
      @active = opts.active if opts.active
      @root.querySelector('.gridheader gridrow').remove()
      
    @on 'update',->
      @gridbody = @root.querySelector(".gridbody")
      return if !opts.data
      return setTimeout(@update,100) if !@gridbody#wait until dom is ready
      oldScrolltop = @scrollTop   
      @scrollTop = Math.round((@gridbody.scrollTop / @rowheight)/2)*2 -10
      setTimeout(@update,100) if @scrollTop!=oldScrolltop #reupdate if scroll has changed
      @scrollTop = 0 if @scrollTop < 0
      @scrollBottom = @scrollTop+Math.round((@gridbody.offsetHeight / @rowheight)/2)*2 +20
      @visibleRows = opts.data.slice(@scrollTop,@scrollBottom)

    @scrolling = (e)=>
      @update()

    @handleClick = (e)=>
      return if !opts.onselect
      @active = e.item.row.id
      return if typeof opts.onselect != "function"
      setTimeout (-> opts.onselect(e.item.row)),50

    @handleDblClick = (e)=>
      return if !opts.onedit
      @active = e.item.row.id
      setTimeout -> 
        opts.onedit(e.item.row) if opts.onedit? && typeof opts.onedit == "function"
      ,50
