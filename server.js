const express = require('express')
const next = require('next')

const port = 5000
const dev = false
// creating the app either in production or dev mode 
const app = next({ dev })
const handle = app.getRequestHandler()


// running the app, async operation 
app.prepare().then(() => {
  const server = express()
  
  // redirecting all requests to Next.js 
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Runing on port ${port}, dev: ${dev}`)
  })
})
//update
