const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)

describe('NodeGoat react apirest api', () => {
  test('should handle NOT FOUND route', async done => {
    const response = await request.get('/invented-route')

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ error: { message: 'Not Found' } })
    done()
  })

  test('should handle API route', async done => {
    const response = await request.get('/api/v1/')

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ msg: 'respond with a resource' })
    done()
  })
})
