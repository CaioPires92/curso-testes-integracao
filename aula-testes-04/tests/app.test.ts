import app from 'app'
import supertest from 'supertest'

const server = supertest(app)

describe('GET /health', () => {
  it('should return 200', async () => {
    const result = await server.get('/health')
    const {status} = result
    expect(status).toBe(200)
  })
})
