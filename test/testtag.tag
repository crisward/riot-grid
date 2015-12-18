testtag

  grid(data="{data}",height="{height}",onselect="{handleSelect}",onedit="{handleEdit}")
    <yield to="head">
    span(style="width:40%") First Name
    span(style="width:40%") Surname
    span(style="width:20%") Age
    </yield>
    <yield to="body">
    span(style="width:40%") {row.first_name}
    span(style="width:40%") {row.surname}
    span(style="width:20%") {row.age}
    </yield>


  script(type="text/coffee").

    @on 'update',->
      @data = opts.griddata
      @height = opts.gridheight

    @handleSelect = (rows)=>
      opts.testclick(rows)

    @handleEdit = (rows)=>
      opts.testclick2(rows)
