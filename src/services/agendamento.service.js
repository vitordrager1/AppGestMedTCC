import http from '../http-common'

class AgendamentoDataService {


    getAll() {
        return http.get("/agendamentos")
    }

    get(id) {
        return http.get(`/agendamentos/${id}`)
    }

    create(data) {
        console.log(data)
        return http.post(`/agendamentos`, data)
    }

    update(id, data) {
        return http.put(`/agendamentos/${id}`, data)
    }

    delete(id) {
        return http.delete(`/agendamentos/${id}`)
    }

    deleteAll() {
        return http.delete(`/agendamentos`)
    }

    findByName(name) {
        return http.get(`agendamentos?name=${name}`)
    }
}

export default new AgendamentoDataService()