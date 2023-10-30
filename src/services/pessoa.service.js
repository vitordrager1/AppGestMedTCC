import http from '../http-common'

class PessoaDataService {


    getAll() {
        return http.get("/pessoas")
    }

    get(id) {
        return http.get(`/pessoas/${id}`)
    }

    create(data) {
        console.log(data)
        return http.post(`/pacientes/`, data)
    }

    update(id, data) {
        return http.put(`/pessoas/${id}`, data)
    }

    delete(id) {
        return http.delete(`/pessoas/${id}`)
    }

    deleteAll() {
        return http.delete(`/pessoas`)
    }

    findByName(name) {
        return http.get(`pessoas/pessoas?name=${name}`)
    }
    
}

export default new PessoaDataService()