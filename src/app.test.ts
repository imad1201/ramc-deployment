import request from 'supertest'
import app from './app'

describe('App root endpoint', () => {
  it('GET / should return "Hello World!"', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toBe('Hello World!')
  })

  it('GET /nonexistent should return 404', async () => {
    const res = await request(app).get('/nonexistent')
    expect(res.status).toBe(404)
  })
})
