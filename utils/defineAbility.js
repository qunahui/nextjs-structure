import { createContext } from 'react'
import { Ability, AbilityBuilder } from '@casl/ability'
import { store } from '~/redux/store'

export const ability = new Ability()
export const AbilityContext = createContext()

export const defineRulesFor = (user) => {
  const abilities = user?.abilities || []
  const { can, rules } = new AbilityBuilder()
  abilities?.map((abl) => can(abl.actions, abl.subject))

  return rules
}

store.subscribe(() => {
  const user = store.getState()?.user
  ability.update(defineRulesFor(user))
})
