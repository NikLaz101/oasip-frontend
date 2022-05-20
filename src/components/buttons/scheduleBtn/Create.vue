<script setup>
import { ref, onBeforeMount, computed } from "vue";
import moment from "moment";
defineEmits(["create"]);

const isModalOn = ref(false);
const category = ref([]);
const URL = "http://intproj21.sit.kmutt.ac.th/at1/api/category";

// GET
const getCategories = async () => {
    const res = await fetch(URL);
    if (res.status === 200) {
        category.value = await res.json();
    } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
    await getCategories();
});

const Name = ref();
const Email = ref();
const Selected = ref();
const Time = ref();
const Duration = ref();
const Notes = ref("");
const selectedId = ref();

const countName = computed(() => {
    return Name.value.length;
});


const newDuration = () => {
    category.value.forEach((category) => {
        if (category.eventCategoryName === Selected.value) {
            Duration.value = category.eventDuration;
            selectedId.value = category.id;
        }
    });
};

const date = ref();
function updateTime() {
    date.value = moment().format("YYYY-MM-DDTHH:mm:ss");
}
const realTime = () => {
    setInterval(updateTime, 1000);
};
realTime();
</script>

<template>
    <div id="create">
        <button
            class="btn text-xl font-extrabold px-10"
            @click="
                Name = undefined;
                Email = undefined;
                Selected = undefined;
                Time = undefined;
                Duration = undefined;
                Notes = '';
                isModalOn = !isModalOn;
            "
        >
            CREATE
        </button>
        <div v-show="isModalOn" class="modal-show flex justify-center">
            <div class="modal-content bg-base-100 rounded-2xl">
                <div class="flex justify-end">
                    <button class="close" @click="isModalOn = !isModalOn">
                        x
                    </button>
                </div>
                <form
                    method="post"
                    @submit.prevent="
                        $emit(
                            'create',
                            Name,
                            Email,
                            selectedId,
                            Time,
                            Duration,
                            Notes
                        );
                        Name == undefined ||
                        Email == undefined ||
                        Selected == undefined ||
                        Time == undefined
                            ? isModalOn
                            : (isModalOn = !isModalOn);
                    "
                >
                    <div class="grid justify-center">
                        <label for="name"
                            >Name<span class="auto-fill"
                                >( /100)</span
                            ></label
                        >
                        <div class="py-3">
                            <input
                                id="message"
                                type="text"
                                v-model="Name"
                                maxlength="100"
                                class="bg-base-100 italic"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <label for="Email">Email<span class="auto-fill"> (  /50)</span></label>
                        <div class="py-3">
                            <input
                                id="message"
                                type="email"
                                v-model="Email"
                                maxlength="50"
                                class="bg-base-100 border-b-2 italic"
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <label for="clinics">Clinic</label>
                        <div class="py-3">
                            <select
                                id="message"
                                name="clinics"
                                class="bg-base-100 border-b-2 italic"
                                @change="newDuration"
                                v-model="Selected"
                                required
                            >
                                <option
                                    v-for="categorys in category"
                                    :value="categorys.eventCategoryName"
                                >
                                    {{ categorys.eventCategoryName }}
                                </option>
                            </select>
                        </div>
                        <label for="Date">Date</label>
                        <div class="py-3">
                            <input
                                id="message"
                                type="datetime-local"
                                v-model="Time"
                                :min="date"
                                step="any"
                                class="text-black"
                                required
                            />
                        </div>
                        <label for="Duration">Duration (minutes)</label>
                        <div class="py-3">
                            <input
                                id="message"
                                class="bg-base-100 border-b-2 italic focus:outline-none pointer-events-none"
                                readonly
                                type="text"
                                v-model="Duration"
                                placeholder="Select your clinic"
                            />
                        </div>
                        <label for="Note">Note<span class="auto-fill"> ( /500)</span></label>
                        <div class="py-3">
                            <textarea
                                id="message"
                                cols="50"
                                rows="2"
                                v-model="Notes"
                                maxlength="500"
                                class="bg-base-100 border-b-2 italic p-2"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                    </div>
                    <div class="flex justify-end pt-2">
                        <!-- <button class="btn">Create</button> -->
                        <input class="btn" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
#message {
    border-color: #494a7d;
    border-radius: 5px;
    padding: 10px;
    border-width: 2px;
    width: 100%;
}
#message:focus {
    outline: none !important;
    border: 2px solid #fcc302;
}

.modal-content {
    margin: auto;
    padding: 20px;
    width: 500px;
}
.modal-show {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(32, 32, 32);
    background-color: rgba(73, 73, 73, 0.4);
}
.close {
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: rgb(82, 80, 80);
    text-decoration: none;
    cursor: pointer;
}
.auto-fill {
    color: #8f8f8f;
}

</style>
