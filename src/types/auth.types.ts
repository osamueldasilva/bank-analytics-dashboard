import { PERMISSIONS, USER_ROLES } from '@/src/constants/auth.constants'

export type UserRole = (typeof USER_ROLES)[number]

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export type RoleMeta = {
  name: string
  email: string
}
