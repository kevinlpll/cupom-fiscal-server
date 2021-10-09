import * as io from 'socket.io'
import * as nodemailer from 'nodemailer'

declare global {
  namespace NodeJS{
    interface Global {
      SocketServer: io.Server
      MailerTransporter: nodemailer.Transporter
    }
  }
}

global.SocketServer = io.default()
