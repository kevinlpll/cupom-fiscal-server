import { Router } from "express"
import Tesseract from "tesseract.js"
import { Request, Response } from "express"
const routes = Router()



routes.get("/ping", (request, response) => {
  response.json("pingou")
})

routes.post("/image", (request: Request, response: Response) => {
  const debug = false

  Tesseract.recognize(
    'https://tesseract.projectnaptha.com/img/eng_bw.png',
    'eng',   
  ).then(({ data: { text } }) => {
    response.json(text)
  }).catch((error) => {
    response.status(500).json(error)
  })

})


export { routes }