export default class Cell {
  constructor () {
    this.htmlElement = document.createElement('div')
    this.htmlElement.classList.add('cell')
    this.htmlElement.context = this

    this.moveCell = this.moveCell.bind(this)

    this.htmlElement.addEventListener('mousedown', (e) => this.clickOnCell(e))
    this.htmlElement.addEventListener('mouseup', () => this.mouseUp())
  }

  clickOnCell (e) {
    e.preventDefault()

    window.addEventListener('mousemove', this.moveCell)

    this.htmlElement.classList.add('move')
    this.htmlElement.classList.add('moved')
    this.htmlElement.y = e.target.offsetTop
    this.htmlElement.x = e.target.offsetLeft
    this.htmlElement.fixedCurX = e.pageX
    this.htmlElement.fixedCurY = e.pageY
  }

  moveCell (e) {
    if (e) {
      this.htmlElement.cursorX = e.pageX
      this.htmlElement.cursorY = e.pageY
    }

    let coordsY = this.htmlElement.y + (this.htmlElement.cursorY - this.htmlElement.fixedCurY)
    let coordsX = this.htmlElement.x + (this.htmlElement.cursorX - this.htmlElement.fixedCurX)

    if (this.htmlElement.classList.contains('move')) {
      this.htmlElement.style.top = `${coordsY}px`
      this.htmlElement.style.left = `${coordsX}px`
    }
  }

  mouseUp () {
    this.htmlElement.classList.remove('move')

    window.removeEventListener('mousemove', this.moveCell)
  }
}
