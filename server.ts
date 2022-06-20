import app from './script'

const port = process.env.PORT || 4012

app.listen( port, () => {
    console.log(`Server started on http://localhost:${port}`)
  })