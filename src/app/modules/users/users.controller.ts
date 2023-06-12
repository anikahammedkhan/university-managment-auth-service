import { RequestHandler } from 'express'
import usersService from './users.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { users } = req.body
    const result = await usersService.createUser(users)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createUser,
}
