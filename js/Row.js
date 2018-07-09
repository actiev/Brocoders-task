import Cell from './Cell.js'

export default class Row {
  constructor (cells) {
    this.cellsArray = []
    this.htmlElement = document.createElement('div')
    this.addCells(cells)
  }

  addCells (cells) {
    for (let i = 0; i < cells; i++) {
      const cell = new Cell()

      this.cellsArray.push(cell)
      this.htmlElement.appendChild(cell.htmlElement)
    }
  }
}
