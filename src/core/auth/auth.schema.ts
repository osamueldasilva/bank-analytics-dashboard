import { z } from 'zod'

import { USER_ROLES } from '@/src/constants'

export const userRoleSchema = z.enum(USER_ROLES)
