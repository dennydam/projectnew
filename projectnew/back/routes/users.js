import express from 'express'
import auth from '../middleware/auth.js'
import {
  register,
  login,
  getUsers,
  getUserInfo,
  extend
} from '../controllers/users.js'

const router = express.Router()

router.post('/', register)
router.post('/login', login)
router.post('/extend', auth, extend)
router.get('/', auth, getUsers)
router.get('/me', auth, getUserInfo)

export default router
