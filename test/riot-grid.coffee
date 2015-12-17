
window.riot = require 'riot'

grid = require '../lib/riot-grid.js'
simulant = require 'simulant'

spyclick = null
test = {}


describe 'riot-grid',->

   beforeEach (done)->
    startTime = new Date().getTime()
    @domnode = document.createElement('grid')
    @node = document.body.appendChild(@domnode)
    @tag = riot.mount(@domnode,'riot-grid',{data:griddata,columns:gridColumns,height:gridheight})[0]
    riot.update()
    rendertime = new Date().getTime()-startTime
    expect(rendertime).to.be.lt(500)
    setTimeout(done,500)

    
  afterEach ->
    @tag.unmount()
    @domnode = ''

#  it "should add grid to the document",->
#    expect(document.querySelectorAll('grid').length).to.equal(1)
#
#  it "should load data into the grid",->
#    expect(document.querySelectorAll('.gridrow').length).to.be.gt(1)
#    expect(@node.innerHTML).to.contain(griddata[0].first_name)
#    expect(@node.innerHTML).to.contain(griddata[0].surname)
#
#  it "should render only enough rows needed",->
#    expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
#    expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
#
#  it "should render only enough rows after scrolling",(done)->
#    document.querySelector('.gridbody').scrollTop = 1000
#    setTimeout ->
#      expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
#      expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
#      done()
#    ,20
#
#  it "should render only enough rows after scrolling (again)",(done)->
#    document.querySelector('.gridbody').scrollTop = 4389
#    setTimeout ->
#      expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
#      expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
#      done()
#    ,20 