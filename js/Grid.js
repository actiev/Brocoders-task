import Row from './Row.js'
import Cell from './Cell.js'

export default class Grid {
  constructor (rows, cols) {
    this.currentCell = null
    this.rowsArray = []

    this.cellSize = 50
    this.htmlElement = document.createElement('div')
    this.htmlElement.classList.add('container__wrap')

    this.addRows(rows, cols)

    this.removeRowBtn = document.querySelector('.container__remove_row')
    this.removeColBtn = document.querySelector('.container__remove_column')
    this.addColBtn = document.querySelector('.container__add_column')
    this.addRowBtn = document.querySelector('.container__add_row')

    this.hideButtons()
  }

  init (selector) {
    document.querySelector(selector).appendChild(this.htmlElement)

    this.htmlElement.addEventListener('mouseenter', () => this.showButtons())
    this.htmlElement.addEventListener('mouseover', (e) => this.moveButtons(e))
    this.htmlElement.parentElement.parentElement.addEventListener('mouseleave', () => this.hideButtons())
    this.htmlElement.parentElement.parentElement.addEventListener('click', (e) => this.setAction(e))

    this.setGridSize()
  }

  moveButtons (event) {
    if (event.target.context instanceof Cell) this.currentCell = event.target

    this.removeColBtn.style.transform = `translateX(${event.target.offsetLeft}px)`
    this.removeRowBtn.style.transform = `translateY(${event.target.offsetTop}px)`
  }

  setAction (e) {
    switch (e.target.id) {
      case this.removeRowBtn.id:
        this.removeRow()
        break
      case this.removeColBtn.id:
        this.removeColumn()
        break
      case this.addColBtn.id:
        this.addColumn()
        break
      case this.addRowBtn.id:
        this.addRows()
        break
    }

    this.setGridSize()
    this.hideButtons()
  }

  addRows (rows = 1, cellsCount) {
    cellsCount = cellsCount || this.rowsArray[0].cellsArray.length

    for (let i = 0; i < rows; i++) {
      const row = new Row(cellsCount)

      this.rowsArray.push(row)
      this.htmlElement.appendChild(row.htmlElement)
    }
  }

  removeRow () {
    const rowIndex = [].indexOf.call(this.htmlElement.children, this.currentCell.parentElement)

    this.htmlElement.removeChild(this.currentCell.parentElement)
    this.rowsArray.splice(rowIndex, 1)
  }

  addColumn () {
    this.rowsArray.forEach(row => {
      const cell = new Cell()

      row.cellsArray.push(cell)
      row.htmlElement.appendChild(cell.htmlElement)
    })
  }

  removeColumn () {
    const colIndex = [].indexOf.call(this.currentCell.parentNode.children, this.currentCell)

    this.rowsArray.forEach(row => {
      row.htmlElement.removeChild(row.htmlElement.children[colIndex])
      row.cellsArray.splice(colIndex, 1)
    })
  }

  hideButtons () {
    this.removeRowBtn.classList.add('hide')
    this.removeColBtn.classList.add('hide')
  }

  showButtons () {
    this.rowsArray.length <= 1
      ? this.removeRowBtn.classList.add('hide')
      : this.removeRowBtn.classList.remove('hide')
    this.rowsArray[0].cellsArray.length <= 1
      ? this.removeColBtn.classList.add('hide')
      : this.removeColBtn.classList.remove('hide')
  }

  setGridSize () {
    const gridBox = this.htmlElement.parentElement
    gridBox.parentElement.style.width = `${gridBox.offsetWidth + this.cellSize + this.cellSize}px`
    gridBox.parentElement.style.height = `${gridBox.offsetHeight + this.cellSize + this.cellSize}px`
  }
}

(function () {
  const app = new Grid(4, 4)
  app.init('.app-grid-container')
})()
