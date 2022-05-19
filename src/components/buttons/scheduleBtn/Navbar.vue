<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
defineEmits(["option"]);

const category = ref([]);
const appRouter = useRouter();
const URL_CATEGORY = "http://intproj21.sit.kmutt.ac.th/at1/api/category";

// GET
const getCategories = async () => {
    const res = await fetch(URL_CATEGORY);
    if (res.status === 200) {
        category.value = await res.json();
    } else console.log("error, cannot get data");
};

onMounted(async () => {
    await getCategories();
});

const scheduleRouter = () =>
    appRouter.push({
        name: "contents",
    });
const categoryRouter = () =>
    appRouter.push({
        name: "categoryContents",
    });
</script>

<template>
    <th class="text-xl font-extrabold px-10">
        <div class="dropdown">
            <button tabindex="0" class="m-1 text-xl font-extrabold">
                NAME
            </button>
            <ul
                tabindex="0"
                class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-64 mt-7"
            >
                <li>
                    <button class="text-xl" @click="scheduleRouter">Name</button>
                </li>
                <li>
                    <button class="text-xl" @click="categoryRouter ">
                        Category
                    </button>
                </li>
            </ul>
        </div>
    </th>
    <th class="px-10">
        <div class="dropdown">
            <button tabindex="0" class="m-1 text-xl font-extrabold">
                CLINIC
            </button>
            <ul
                tabindex="0"
                class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-64 mt-7"
            >
                <li>
                    <button @click="$emit('option', 0)" class="text-xl">
                        All Clinic
                    </button>
                </li>
                <li v-for="content in category">
                    <button
                        @click="$emit('option', content.id)"
                        class="text-xl"
                    >
                        {{
                            content.eventCategoryName.substring(
                                0,
                                content.eventCategoryName.length - 7
                            )
                        }}
                    </button>
                </li>
            </ul>
        </div>
    </th>
    <th class="px-10">
        <div class="dropdown">
            <button tabindex="0" class="m-1 text-xl font-extrabold">
                DATE
            </button>
            <ul
                tabindex="0"
                class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-64 mt-7"
            >
                <li><button class="text-xl">Upcoming</button></li>
                <li><button class="text-xl">Past</button></li>
            </ul>
        </div>
    </th>
    <th class="text-xl font-extrabold px-10">DURATION</th>
</template>

<style></style>
