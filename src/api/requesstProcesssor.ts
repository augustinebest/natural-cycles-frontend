import axios from 'axios'

const baseURL = 'https://natural-cycles-app.herokuapp.com'
axios.defaults.baseURL = `${baseURL}/api/user`

class ProcessRequest {
  async get(url: string) {
    const res = await axios.get(url)
    return res.data
  }

  async put(url: string, data = {}) {
    const res = await axios.put(url, data)
    return res.data
  }
}

export default new ProcessRequest()
