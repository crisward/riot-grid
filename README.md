# Riot Grid
[![Build Status](https://travis-ci.org/crisward/riot-grid.svg)](https://travis-ci.org/crisward/riot-grid)
[![Coverage Status](https://coveralls.io/repos/crisward/riot-grid/badge.svg?branch=master&service=github)](https://coveralls.io/github/crisward/riot-grid?branch=master)

## Installing

```
npm install riot-grid
```

## Usage

```html
<grid data="{collection}" height="{400}" onselect="{handleSelect}" onedit="{handleDoubleClick}">
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

**STILL IN DEVELOPMENT PLEASE DON'T USE**

## Todo

* Add multi Select
* Work out if I can highjack onclick and ondblclick, instead of select and edit
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

