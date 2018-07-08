'use strict'
import Row from './Row.js'
import Cell from './Cell.js'

export default class Grid {
  constructor (rows, cols) {
    this.grid = []
    this.cols = cols
    this.currentCell = null

    this.cellSize = 50
    this.tableElement = document.createElement('div')
    this.tableElement.classList.add('container__wrap')

    this.addRows(rows)

    this.removeRowBtn = document.querySelector('.container__remove_row')
    this.removeColBtn = document.querySelector('.container__remove_column')
    this.addColBtn = document.querySelector('.container__add_column')
    this.addRowBtn = document.querySelector('.container__add_row')

    this.hideButtons()
  }

  init (selector) {
    document.querySelector(selector).appendChild(this.tableElement)

    this.tableElement.addEventListener('mouseenter', () => this.showButtons())
    this.tableElement.addEventListener('mouseover', (e) => this.moveButtons(e))
    this.tableElement.parentElement.parentElement.addEventListener('mouseleave', () => this.hideButtons())
    this.tableElement.parentElement.parentElement.addEventListener('click', (e) => this.setAction(e))

    this.setGridSize()
  }

  moveButtons (event) {
    if (event.target.dataset.isCell) this.currentCell = event.target
    this.removeColBtn.style.transform = `translateX(${event.target.offsetLeft}px)`
    this.removeRowBtn.style.transform = `translateY(${event.target.offsetTop}px)`
  }

  setAction (e) {
    switch (e.target) {
      case this.removeRowBtn: this.removeRow()
        break
      case this.removeColBtn: this.removeColumn()
        break
      case this.addColBtn: this.addColumn()
        break
      case this.addRowBtn: this.addRows()
        break
    }

    this.setGridSize()
    this.hideButtons()
  }

  addRows (rows) {
    if (!rows) rows = 1

    for (let i = 0; i < rows; i++) {
      let row = new Row(this.cols)
      this.grid.push(row)
      this.tableElement.appendChild(row.htmlElement)
    }
  }

  removeRow () {
    let rowIndex = [].indexOf.call(this.tableElement.children, this.currentCell.parentElement)
    this.tableElement.removeChild(this.currentCell.parentElement)
    this.grid.splice(rowIndex, 1)
  }

  addColumn () {
    for (let row of this.grid) {
      let cell = new Cell()
      row.cells.push(cell)
      row.htmlElement.appendChild(cell.htmlElement)
    }

    this.cols++
  }

  removeColumn () {
    let colIndex = [].indexOf.call(this.currentCell.parentNode.children, this.currentCell)

    for (let row of this.grid) {
      row.htmlElement.removeChild(row.htmlElement.children[colIndex])
      row.cells.splice(colIndex, 1)
    }

    --this.cols
  }

  hideButtons () {
    this.removeRowBtn.classList.add('hide')
    this.removeColBtn.classList.add('hide')
  }

  showButtons () {
    this.grid.length <= 1
      ? this.removeRowBtn.classList.add('hide')
      : this.removeRowBtn.classList.remove('hide')
    this.cols <= 1
      ? this.removeColBtn.classList.add('hide')
      : this.removeColBtn.classList.remove('hide')
  }

  setGridSize () {
    let gridBox = this.tableElement.parentElement
    gridBox.parentElement.style.width = `${gridBox.offsetWidth + this.cellSize + this.cellSize}px`
    gridBox.parentElement.style.height = `${gridBox.offsetHeight + this.cellSize + this.cellSize}px`
  }
}

(function () {
  let app = new Grid(4, 4)
  app.init('.app-grid-container')
})()
