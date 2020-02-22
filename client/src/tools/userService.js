import axios  from 'axios';

class UserService {
  constructor(){
    this.service = axios.create({
      baseURL: `http://localhost:5000/users`
    })
  }

  getAll = () => {
    return this.service.get('/')
    .then(response => response.data)
  }

  get = id => {
    return this.service.get(`/user/${id}`)
    .then(response => response.data)
  }

  create = (name, birthdate) => {
    return this.service.post('/new', {name, birthdate})
    .then(response => response.data)
  }

  update = (id, name, birthdate) => {
    return this.service.post(`/edit/${id}`, {name, birthdate})
    .then(response => response.data)
  }

  remove = id => {
    return this.service.get(`/delete/${id}`)
    .then(response => response.data)
  }
}

export default UserService;