import http from '../http-common'

class PacienteDataService {


    getAll() {
        return http.get("/pacientes")
    }

    get(id) {
        return http.get(`/pacientes/${id}`)
    }

    create(data) {
        return http.post(`/pacientes/`, data)
    }

    update(id, data) {
        return http.put(`/pacientes/${id}`, data)
    }

    delete(id) {
        return http.delete(`/pacientes/${id}`)
    }

    deleteAll() {
        return http.delete(`/pacientes`)
    }

    findByName(name) {
        return http.get(`pacientes/pacientes/limit?name=${name}`)
    }
}

export default new PacienteDataService()