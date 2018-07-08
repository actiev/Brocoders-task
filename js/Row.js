'use strict'
import Cell from './Cell.js'

export default class Row {
  constructor (cells) {
    this.cells = []
    this.htmlElement = document.createElement('div')
    this.addCells(cells)
  }

  addCells (cells) {
    for (let i = 0; i < cells; i++) {
      let cell = new Cell()
      this.cells.push(cell)
      this.htmlElement.appendChild(cell.htmlElement)
    }
  }
}
