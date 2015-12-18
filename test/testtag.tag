testtag

  grid(data="{data}",height="{height}",click="{handleSelect}",dblclick="{handleEdit}")
    gridhead
      span(style="width:40%") First Name
      span(style="width:40%") Surname
      span(style="width:20%") Age
    gridbody
      span(style="width:40%") {row.first_name}
      span(style="width:40%") {row.surname}
      span(style="width:20%") {row.age}


  script(type="text/coffee").

    @on 'update',->
      @data = opts.griddata
      @height = opts.gridheight

    @handleSelect = (rows)=>
      opts.testclick(rows)

    @handleEdit = (rows)=>
      opts.testclick2(rows) 


testtag2

  grid(data="{data}",height="{height}",active="{activerow}")
    gridhead
      span(style="width:40%") First Name
      span(style="width:40%") Surname
      span(style="width:20%") Age
    gridbody
      span(style="width:40%") {row.first_name}
      span(style="width:40%") {row.surname}
      span(style="width:20%") {row.age}


  script(type="text/coffee").

    @on 'update',->
      @data = opts.griddata
      @height = opts.gridheight
      @activerow = opts.activerow

