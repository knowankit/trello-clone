export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body

    if(body.username === 'nidhi@love.com' && body.password === 'pika') {
      const data = {
        'message': 'success',
        status: 200
      }

      res.send(data)
    } else {
      const data = {
        'message': 'Invalid username of password',
        status: 404
      }

      res.send(data)
    }

  } else {
    // Handle any other HTTP method
  }
}
