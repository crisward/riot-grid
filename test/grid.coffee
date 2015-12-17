datagen = require './mockdata'

griddata = datagen(1000)
gridheight = 400
window.riot = require 'riot'

require '../lib/grid.js'
require './testtag.tag'
simulant = require 'simulant'

spyclick = null
test = {}



describe 'grid',->

  beforeEach ->
    startTime = new Date().getTime()
    @domnode = document.createElement('div')
    @domnode.appendChild(document.createElement('testtag'))
    @node = document.body.appendChild(@domnode)
    @tag = riot.mount('testtag',{griddata:griddata,gridheight:gridheight})[0]
    riot.update()
    
  afterEach ->
    @tag.unmount()
    @domnode = ''

  it "should add grid to the document",->
    expect(document.querySelectorAll('testtag').length).to.equal(1)
    expect(document.querySelectorAll('grid').length).to.equal(1)

  it "should load data into the grid",->
    expect(document.querySelectorAll('.gridrow').length).to.be.gt(1)
    expect(@node.textContent).to.contain(griddata[0].first_name)
    expect(@node.innerHTML).to.contain(griddata[0].surname)

  it "should render only enough rows needed",->
    expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
    expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)

  it "should render only enough rows after scrolling",(done)->
    document.querySelector('.gridbody').scrollTop = 1000
    setTimeout ->
      expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
      expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
      done()
    ,20

  it "should render only enough rows after scrolling (again)",(done)->
    document.querySelector('.gridbody').scrollTop = 4389
    setTimeout ->
      expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
      expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
      done()
    ,20 