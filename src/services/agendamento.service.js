import http from '../http-common'

class AgendamentoDataService {


    getAll() {
        return http.get("/agendamentos/agendamentos")
    }

    getAllDate(dt_atendimento) {
        return http.get(`/agendamentos/date/${dt_atendimento}`)
    }

    get(id) {
        return http.get(`/agendamentos/${id}`)
    }

    create(data) {
        return http.post(`/agendamentos`, data)
    }

    update(nr_agendamento, data) {
        return http.put(`/agendamentos/${nr_agendamento}`, data)
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