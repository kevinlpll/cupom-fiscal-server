
import dayjs from 'dayjs'
import colors from 'colors'
import { Request } from 'express'

const requests = (request: Request, _, nextRequest) => {

  const isSignin = request.originalUrl.includes('/unauth/signin')

  if (isSignin) return nextRequest() 

  const requester = colors.blue(request.ip)
  // const host = colors.blue(request.headers.host)
  const path  = colors.green(request.url)

  let method = request.method.trim()

  switch(method) {
    case 'GET':
      method = colors.blue(method);
    break
    case 'POST':
      method = colors.yellow(method);
    break
    case 'DELETE':
      method = colors.red(method);
    break
    case 'PUT':
      method = colors.green(method);
    break
    case 'PATCH':
      method = colors.cyan(method);
    break
  }

  const time = colors.white(dayjs().format('HH:mm') || '')

  console.log(`${time} ${requester} ${method} ${path}`)

  if(Object.keys(request.body).length > 0) {
    console.log(request.body)
  }

  return nextRequest()
}

export default requests
