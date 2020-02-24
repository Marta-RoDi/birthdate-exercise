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
    .catch(err=>console.log(err))
  }

  get = id => {
    return this.service.get(`/user/${id}`)
    .then(response => response.data)
    .catch(err=>console.log(err))
  }

  create = (name, birthdate) => {
    return this.service.post('/new', {name, birthdate})
    .then(response => response.data)
    .catch(err=>console.log(err))
  }

  update = (id, name, birthdate) => {
    return this.service.post(`/edit/${id}`, {name, birthdate})
    .then(response => response.data)
    .catch(err=>console.log(err))
  }

  remove = id => {
    return this.service.get(`/delete/${id}`)
    .then(response => response.data)
    .catch(err=>console.log(err))
  }
}

export default UserService;