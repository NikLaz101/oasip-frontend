<<<<<<< HEAD
import {
    createRouter,
    createWebHistory
} from "vue-router";
import Homepage from "../views/Homepage.vue";
import Contents from "../views/Contents.vue";

const history = createWebHistory(import.meta.env.VITE_BASE_URL);
const routes = [{
    path: "/",
    name: "homepage",
    component: Homepage,
    children: [{
        path: "",
        name: "contents",
        component: Contents,
    }, ],
}, ];

const router = createRouter({
    history,
    routes
});

=======
import {
    createRouter,
    createWebHistory
} from "vue-router";
import Homepage from "../views/Homepage.vue";
import Contents from "../views/Contents.vue";

const history = createWebHistory();
const routes = [{
    path: "/",
    name: "homepage",
    component: Homepage,
    children: [{
        path: "",
        name: "contents",
        component: Contents,
    }, ],
}, ];

const router = createRouter({
    history,
    routes
});

>>>>>>> f190333ae447eda6ea1cf035446f031b564b6b77
export default router;