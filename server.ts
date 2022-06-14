import app from './script'

app.listen( process.env.PORT || 4005, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 4000}`)
  })