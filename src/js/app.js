/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui')
var Vector2 = require('vector2')

var state = {
  cost: 20.0,
  tip: 15,
  selected: 0
}

function modify (amount) {
  if (state.selected >= 0 && state.selected < 4) {
    state.cost += amount * (0.1 ** state.selected) * 10
  } else if (state.selected === 4) {
    state.tip += amount
  }
}

var main = new UI.Window({
  backgroundColor: 'white'
})

main.add(new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(180, 50),
  backgroundColor: '#AAAAAA'
}))

main.add(new UI.Text({
  position: new Vector2(0, 20),
  size: new Vector2(180, 60),
  textAlign: 'center',
  font: 'gothic-18-bold',
  text: 'Tip Calc',
  color: 'black'
}))

var cost = new UI.Text({
  position: new Vector2(20, 55),
  size: new Vector2(140, 180),
  textAlign: 'center',
  color: 'black'
})
main.add(cost)

var tip = new UI.Text({
  position: new Vector2(20, 80),
  size: new Vector2(140, 180),
  textAlign: 'center',
  color: 'black'
})
main.add(tip)

main.add(new UI.Rect({
  position: new Vector2(0, 120),
  size: new Vector2(180, 60),
  backgroundColor: '#00FF55'
}))

var total = new UI.Text({
  position: new Vector2(20, 120),
  size: new Vector2(140, 50),
  textAlign: 'center',
  color: 'black'
})
main.add(total)

function render () {
  var displayCost = state.cost.toFixed(2)
  var stateIdx = {
    0: -4,
    1: -3,
    2: -1,
    3: displayCost.length,
  }
  var splice = stateIdx[state.selected]
  if (splice) {
    displayCost = displayCost.slice(0, splice) + '_' + displayCost.slice(splice, displayCost.length)
  }

  cost.text('$' + displayCost)
  tip.text('%' + state.tip + (state.selected === 4 ? '_' : ''))
  var tipAmount = state.cost * state.tip / 100
  var totalAmount = tipAmount + state.cost
  total.text('+$' + tipAmount.toFixed(2) + ' =$' + totalAmount.toFixed(2))
}

render()

main.show()

main.on('click', 'up', function (e) {
  modify(1)
  render()
})

main.on('click', 'select', function (e) {
  state.selected = (state.selected + 1) % 5
  render()
})

main.on('click', 'down', function (e) {
  modify(-1)
  render()
})

