datagen = require './mockdata'

griddata = datagen(1000)
gridheight = 400
require 'es5-shim' #needed for phantom js
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
    spyclick = sinon.spy()
    @tag = riot.mount('testtag',{griddata:griddata,gridheight:gridheight,testclick:spyclick})[0]
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

  it "should render only enough rows after scrolling",->
    document.querySelector('.gridbody').scrollTop = 1000
    expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
    expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
   
  it "should render only enough rows after scrolling (again)",->
    document.querySelector('.gridbody').scrollTop = 4389
    expect(document.querySelectorAll('.gridrow').length).to.be.lt((gridheight/30)+20)
    expect(document.querySelectorAll('.gridrow').length).to.be.gt(gridheight/30)
 
  it "should change class to active when row is clicked",->
    expect(@domnode.querySelectorAll('.active').length).to.equal(0)
    simulant.fire(document.querySelector('.gridrow'),'click')
    expect(@domnode.querySelectorAll('.active').length).to.equal(1)

  it "should callback row when row is clicked",->
    simulant.fire(document.querySelector('.gridrow'),'click')
    expect(spyclick.calledOnce).to.be.true
    expect(spyclick.args[0][0]).to.eql(griddata[0])


