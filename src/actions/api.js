import axios from "axios";

const baseURL = "http://sp21-cs411-26.cs.illinois.edu/"

export default {
  dCandidate(url = baseURL + 'car/') {
    return {
      fetchAll: () => axios.get(url),
      detchById: id => axios.get(url + id),
      create: newRecord => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url, updateRecord),
      delete: id => axios.delete(url + id)
    }
  }
}