import "./index.css";

const nameInput = document.querySelector('#nameInput') as HTMLInputElement
const roomSelect = document.querySelector('#roomSelect') as HTMLSelectElement
const startBtn = document.querySelector('#startBtn') as HTMLButtonElement

startBtn.addEventListener('click', () => {
  const userName = nameInput.value
  const roomName = roomSelect.value

  location.href = `/chatRoom/chatRoom.html?user_name=${userName}&room_name=${roomName}`
})