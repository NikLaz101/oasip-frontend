import {
    createRouter,
    createWebHistory
} from "vue-router";
import Homepage from "../views/Homepage.vue";
import Contents from "../views/Contents.vue";
import CategoryContent from "../views/CategoryContent.vue"

const history = createWebHistory();
const routes = [{
    path: "/",
    name: "homepage",
    component: Homepage,
    children: [{
            path: "",
            name: "contents",
            component: Contents,
        },
        {
            path: "category",
            name: "categoryContents",
            component: CategoryContent,
        },
    ],
}, ];

const router = createRouter({
    history,
    routes
});

export default router;