import "./index.css";
import { io } from 'socket.io-client'
import { text } from "express";

const url = new URL(location.href)
const userName = url.searchParams.get('user_name')
const roomName = url.searchParams.get('room_name')

if (!userName || !roomName) {
  location.href = '/main/main.html'
}

// 建立連接 -> nodejs server
const clientIO = io()

const textInput = document.querySelector('#textInput') as HTMLInputElement
const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement
const backBtn = document.querySelector('#backBtn') as HTMLButtonElement
const chatBoard = document.querySelector('#chatBoard') as HTMLDivElement
const headerRoomName = document.querySelector('#headerRoomName') as HTMLParagraphElement

headerRoomName.innerText = roomName || ''

const msgHandle = (msg: string) => {
  // <div class="flex justify-end mb-4 items-end" >
  //   < /div>
  const divBox = document.createElement('div')
  divBox.classList.add('flex', 'justify-end', 'mb-4', 'items-end')
  divBox.innerHTML = `
    <p class="text-xs text-gray-700 mr-4" > 00: 00 </p>

    <div>
      <p class="text-xs text-white mb-1 text-right" > NaLuWan </p>
      <p
    class="mx-w-[50%] break-all bg-white px-4 py-2 rounded-bl-full rounded-br-full rounded-tl-full"
      >
      ${msg}
      </p>
    < /div>
  `
  chatBoard.appendChild(divBox)
  // 輸入框重置
  textInput.value = ''
  // 聊天視窗會跟著聊天訊息自動往下
  chatBoard.scrollTop = chatBoard.scrollHeight
}

// 送出按鈕點擊事件
submitBtn.addEventListener('click', () => {
  const textValue = textInput.value
  // 發送訊息到後端
  // emit(頻道, 內容)
  clientIO.emit('chat', textValue)
})

// 輸入框Enter點擊事件
textInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const textValue = textInput.value
    // 發送訊息到後端
    // emit(頻道, 內容)
    clientIO.emit('chat', textValue)
  }
})

backBtn.addEventListener('click', () => {
  location.href = '/main/main.html'
})

clientIO.on('join', msg => {
  console.log('msg', msg)
})

clientIO.on('chat', msg => {
  console.log('client msg', msg)
  msgHandle(msg)
})