<img src="https://cdn.rawgit.com/crisward/riot-grid/master/grid-logo.svg" height="140"/>
[![Build Status](https://travis-ci.org/crisward/riot-grid.svg)](https://travis-ci.org/crisward/riot-grid)
[![Coverage Status](https://coveralls.io/repos/crisward/riot-grid/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/crisward/riot-grid?branch=master)
[![NPM Downloads](https://img.shields.io/npm/dm/riot-grid.svg)](https://www.npmjs.com/package/riot-grid)
[![NPM Downloads](https://img.shields.io/npm/v/riot-grid.svg)](https://www.npmjs.com/package/riot-grid)

## Installing

```
npm install riot-grid
```

## Usage

```html
<grid tabindex="1" data="{collection}" height="{400}" click="{handleSelect}" dblclick="{handleDoubleClick}" onchange="{handleSelectionChange}">
  <gridhead>
    <span style="width:70%">Name</span>
    <span style="width:30%">Age</span>
  </gridhead>
  
  <gridbody>
    <span style="width:70%">{row.name}</span>
    <span style="width:30%">{row.age}</span>
  </gridbody>

</grid>

```

## Demo

See demo on [codepen](http://codepen.io/crisward/pen/rxepMX?editors=101)
This includes a bit of code to generate 100,000 random users to show off the performance of the grid.
I tried increasing this to 10,000,000 but codepen thought I had an infinite loop.

Note: the keyboard interaction doesn't seem to work in codepen


## Attributes

| Attribute | Description
|----       |----
| tabindex  | This needs to be set to enable keyboard interaction, the up and down keys only work when the grid has focus
| data      | Your collection of data (an array of objects)
| height    | The height of the grid in pixels
| rowheight | The height of each row in the grid in pixels (this defaults to 30)
| click     | Callback fired when a row is click, this returns the selcted row
| dblclick  | Callback fired when a row is double clicked, this returns the row selected (useful for edit events)
| onchange  | Callback fires whenever row selection changes. This returns and array of active rows. This fires on both mouse and keyboard events
| active    | Setting an array of rows will select them in the grid
| selectkey | optional keycode to select the row, ie 13 = enter


## Keyboard

* Clicking on the grid gives it keyboard focus, allowing multiple grids to work on the page at once.
* Arrow up selects the previous row in the grid
* Arrow down selects the next row
* Provider optional selectkey (see attributes above)
* Shift + Arrow adds more to a selection
* Shift + Click selects all rows between the first click, and the new click
* CMD/CTRL + Click toggles row selection

Note: during arrow up/down I scroll the panel to keep the selected row in the center of the panel.
This may need a little work as it sometimes jump to the center.

## About

I developed this because there doesn't seem to be any grid components available for riot (that I've found). This only
renders visible rows to the dom so is capable of handling large amounts of data. I've tried it with a million+ rows.
The browser tends to slow down because of the data processing before is slows down with the rendering. 

The api may seem a little verbose, but being able to pass in the header and body rows gives a lot of flexibility
in terms of the data you choose to display. You can even include your own tags in the rows.

Each row has to be the same height. This may seem a little restrictive but it makes calculating which rows to render
much quicker.

## Reordering, Resizing, Data formats etc
The grid itself doesn't help with reordering, resizing or field formats. However the api is flexible enough
to allow you to easily implemnt this outside the grid component. This was a deliberate choice as I 
want the grid to do one thing well, which is to allow you to scroll lots of data. I included the selection api
too as this is much easier to deal with when embedded.

## Style
The style applied to this grid is deliberately basic. Its intended to lay things out, but should be overriden
with your own colour scheme and style. You can probably work out the selectors used by using your web-inspector. 
Though I may add some notes here in the future.

## Todo

* Add demo of reorder by column
* Add demo of change column width


## License

(The MIT License)

Copyright (c) 2015 Cris Ward

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

