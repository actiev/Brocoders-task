'use strict'

export default class Cell {
  constructor () {
    this.htmlElement = document.createElement('div')
    this.htmlElement.className = 'cell'
    this.htmlElement.dataset.isCell = true
  }
}
