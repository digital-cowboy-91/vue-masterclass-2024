import { acceptHMRUpdate, type StoreDefinition } from 'pinia'

export const handleHMR = (store: StoreDefinition) =>
  import.meta.hot?.accept(acceptHMRUpdate(store, import.meta.hot))
