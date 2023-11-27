import http from '../http-common'

class AtendenteDataService {


    getAll() {
        return http.get("/atendente/")
    }

    get(id) {
        return http.get(`/atendente/${id}`)
    }

    create(data) {
        console.log(data)
        return http.post(`/atendente/`, data)
    }

    update(id, data) {
        return http.put(`/atendente/${id}`, data)
    }

    delete(id) {
        return http.delete(`/atendente/${id}`)
    }

    deleteAll() {
        return http.delete(`/atendente`)
    }

    findByName(name) {
        return http.get(`atendente?name=${name}`)
    }
}

export default new AtendenteDataService()