import http from '../http-common'

class PessoaDataService {


    getAll() {
        return http.get("/pessoas/pessoas")
    }

    get(id) {
        return http.get(`/pessoas/${id}`)
    }

    create(data) {
        return http.post(`/pessoas/`, data)
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
        return http.get(`pessoas/pessoas/limit?name=${name}`)
    }
    
}

export default new PessoaDataService()