const moment = require('moment')
const dtInativacao = `${moment(new Date('01/01/2001'), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')}`

console.log(dtInativacao)