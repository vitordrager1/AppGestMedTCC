import http from '../http-common'

class AtendimentoDataService {


    getAll() {
        return http.get("/atendimento")
    }

    get(id) {
        return http.get(`/atendimento/${id}`)
    }

    create(data) {
        return http.post(`/atendimento`, data)
    }

    update(id, data) {
        return http.put(`/atendimento/${id}`, data)
    }

    delete(id) {
        return http.delete(`/atendimento/${id}`)
    }

    deleteAll() {
        return http.delete(`/atendimento`)
    }

    findByName(name) {
        return http.get(`atendimento?name=${name}`)
    }
}

export default new AtendimentoDataService()