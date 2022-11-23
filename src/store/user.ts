import type { User } from '~/types'
import defaultAvatar from '~/assets/default-avatar.png'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref<User>({})
    function updateUser(_user: User) {
      if (!_user.avatar)
        _user.avatar = defaultAvatar
      if ((_user.password ?? '') !== '')
        _user.password = undefined
      user.value = _user
    }
    return {
      user,
      updateUser,
    }
  },
)
