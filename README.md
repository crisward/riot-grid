# Riot Grid
[![Build Status](https://travis-ci.org/crisward/riot-grid.svg)](https://travis-ci.org/crisward/riot-grid)
[![Coverage Status](https://coveralls.io/repos/crisward/riot-grid/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/crisward/riot-grid?branch=master)

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


## Api Changes

I plan a couple of api changes. The click and double click events are going to return an array of selected 
rows, once you can select multiples. So if you can live with this change, feel free to use this. Or if
you hold back for a few days I may have the update in place, along with the v1.0 release.


## Todo

* ~~Add multi Select~~
* ~~Add keyboard interaction~~
* Add demo of reorder by column
* Add demo of change column width
* Take column widths from head and apply to body ? Pehaps make optional?

## Credit


## License

(The MIT License)

Copyright (c) 2015 Cris Ward

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

