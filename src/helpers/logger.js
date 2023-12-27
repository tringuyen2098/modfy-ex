import pino from 'pino';
import moment from 'moment'

export default pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'hostname,pid',
      translateTime: moment().format("DD/MM/YYYY HH:mm:ss")
    }
  }
})