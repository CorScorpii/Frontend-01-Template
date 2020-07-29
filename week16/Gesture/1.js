let element = document.body

element.addEventListener('mousedown', () => {
  let move = (event) => {
    console.log(event.clientX, event.clientY)
  }

  let end = (event) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', end)
})
