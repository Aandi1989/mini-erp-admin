/* This file answers how do React components get access to our MobX stores. 
patientStore.ts creates one store class. 
rootStore.tsx creates a container for stores and exposes it through React Context.  */

import { createContext, useContext } from "react";

import PatientStore from "./patientStore";

/* RootStore is a container for MobX stores. Right now it contains only one store.
But later it could contain more. */ 
export class RootStore {
  patientStore: PatientStore;

  constructor() {
    /* Create One Root Store Instance. This creates the actual store object used by the app.  
    We create one shared instance, not a new store on every render. 
    So every component uses the same patientStore. */
    this.patientStore = new PatientStore();
  }
}

export const rootStore = new RootStore();

/* This creates React Context for the root store. Default value is rootStore.
That means if a component calls useStore(), React knows the expected shape: RootStore */
export const StoreContext = createContext<RootStore>(rootStore);

/* StoreProvider It is used in  src/providers/AppProviders.tsx*/
export const StoreProvider = StoreContext.Provider;

/* useStore Hook. This is a custom hook. Instead of writing this everywhere:
      const store = useContext(StoreContext); 
  We write: 
      const { patientStore } = useStore();
*/ 
export const useStore = () => useContext(StoreContext);
