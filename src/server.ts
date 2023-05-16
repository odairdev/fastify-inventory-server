import { app } from "./app";

app.listen({
  host: '0.0.0.0',
  port: 3333
})

app.ready().then(() => {
  app.swagger()
  console.log('HTTP server running.')
})