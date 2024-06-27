import { createPinia } from "pinia";
import piniaPulgPersist from "pinia-plugin-persist";

const store = createPinia();
store.use(piniaPulgPersist);

export default store;
