import jwt from 'jsonwebtoken'
import users from '../models/users.js'

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || ''
    if (token.length > 0) {
      const decoded = jwt.decode(token)
      req.user = await users.findOne({ _id: decoded._id, tokens: token })
      req.token = token
      if (req.user) {
        jwt.verify(token, process.env.SECRET)
        next()
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError' && req.baseUrl === '/users' && req.path === '/extend') {
      next()
    } else {
      res.status(401).send({ success: false, message: '驗證錯誤' })
    }
  }
}
