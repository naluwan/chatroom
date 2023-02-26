type UserData = {
  id: string,
  userName: string,
  roomName: string
}

export default class UserService {
  // 記錄使用者的資訊
  private userMap: Map<string, UserData>

  constructor() {
    this.userMap = new Map()
  }

  // 新增user
  addUser(data: UserData) {
    this.userMap.set(data.id, data)
  }

  // 刪除user
  removeUser(id: string) {
    if (this.userMap.has(id)) {
      this.userMap.delete(id)
    }
  }

  // 取得user
  getUser(id: string) {
    if (!this.userMap.has(id)) return null
    const data = this.userMap.get(id)
    if (data) {
      return data
    }

    return null
  }

  userDataInfoHandler(id: string, userName: string, roomName: string): UserData {
    return {
      id,
      userName,
      roomName
    }
  }
}