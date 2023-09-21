class ObjectLinks {
    constructor() {
      this.links = {}
    }
  
    get(linkID) {
        if (!this.links[linkID]) {
            throw new Error(`Missing linkID: ${linkID}`)
        }
        return this.links[linkID]
    }
  
    set(linkID, object) {
      if (linkID === undefined || this.links[linkID]) {
        throw new Error('Incorrect linkID')
      }
  
      this.links[linkID] = object
    }
  
    assign(linkID, object) {
      this.links[linkID] = null
  
      this.set(linkID, object)
    }
  }
  
  export default new ObjectLinks()  