import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const id = await generateUserId()
  user.id = id
  const createUser = await User.create(user)
  if (!createUser) {
    throw new ApiError(500, 'User not created')
  }
  return createUser
}

export default {
  createUser,
}
