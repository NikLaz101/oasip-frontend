<script setup>
import { ref, onBeforeMount, computed } from "vue";

const error = ref({});
const isModalOn = ref(false);
const category = ref([]);
const URLC = "http://intproj21.sit.kmutt.ac.th/at1/api/category";
const URLE = "http://intproj21.sit.kmutt.ac.th/at1/api/event";

// GET
const getCategories = async () => {
    const res = await fetch(URLC);
    if (res.status === 200) {
        category.value = await res.json();
    } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
    await getCategories();
});

// POST
const createNewSchedules = async (
    Name,
    Email,
    selectedId,
    Time,
    Duration,
    Notes
) => {
    const res = await fetch(URLE, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            bookingName: Name,
            bookingEmail: Email,
            categoryId: selectedId,
            eventStartTime: Time,
            eventDuration: Duration,
            eventNotes: Notes,
        }),
    });
    if (res.status === 200) {
        getSchedules();
        error.value = {};
    } else if (res.status === 400) {
        error.value = await res.json();
        console.log(error.value);
    } else console.log("error, cannot be added");
};

const Name = ref();
const Email = ref();
const Selected = ref();
const Time = ref();
const Duration = ref();
const Notes = ref();
const selectedId = ref();

const newDuration = () => {
    category.value.forEach((category) => {
        if (category.eventCategoryName === Selected.value) {
            Duration.value = category.eventDuration;
            selectedId.value = category.id;
        }
    });
};
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
                Notes = undefined;
                error = {};
                isModalOn = !isModalOn;
            "
        >
            CREATE
        </button>
        <div v-show="isModalOn" class="modal-show flex justify-center">
            <div class="modal-content bg-base-100 rounded-2xl ">
                <div class="flex justify-end">
                    <button class="close" @click="isModalOn = !isModalOn">x</button>
                </div>
                <div class="grid justify-center">
                    <label for="name">Name</label>
                    <div class="py-3">
                        <input type="text" v-model="Name" maxlength="100" class="bg-base-100 border-b-2 italic" placeholder="Your name" />
                        <p class="error">{{ error.bookingName }}</p>
                    </div>

                    <label for="Email">Email</label>
                    <div class="py-3">
                        <input type="text" v-model="Email" class="bg-base-100 border-b-2 italic" placeholder="Your email"  />
                        <p class="error">{{ error.bookingEmail }}</p>
                    </div>
                    <label for="clinics">Clinic</label>
                    <div class="py-3">
                        <select
                            name="clinics"
                            class="text-black"
                            @change="newDuration"
                            v-model="Selected">
                            <option value="" disabled selected>
                                --Select your clinic--
                            </option>
                            <option
                                v-for="categorys in category"
                                :value="categorys.eventCategoryName">
                                {{ categorys.eventCategoryName }}
                            </option>
                        </select>
                        <p class="error">{{ error.categoryName }}</p>
                    </div >
                    <label for="Date">Date</label>
                    <div class="py-3">
                        <input type="datetime-local" v-model="Time" class="text-black"/>
                        <p class="error">{{ error.eventStartTime }}</p>
                    </div>
                    <label for="Duration">Duration</label>
                    <div class="py-3">
                        <input
                            class="bg-base-100 border-b-2 italic focus:outline-none"
                            readonly
                            type="text"
                            v-model="Duration"
                            placeholder="Select your clinic"
                        />
                    </div>
                    <label for="Note">Note</label>
                    <div class="py-3">
                        <textarea
                            cols="50"
                            rows="2"
                            v-model="Notes"
                            maxlength="500"
                            class="bg-base-100 border-b-2 italic"
                            placeholder="Your message"
                        ></textarea>
                        <p class="error">{{ error.eventNotes }}</p>
                    </div>
                </div>
                <div class="flex justify-end pt-2">
                    <button
                        @click="
                            createNewSchedules(
                                Name,
                                Email,
                                selectedId,
                                Time,
                                Duration,
                                Notes
                            )
                        "
                        class="btn"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
input,
textarea {
    color: rgb(255, 255, 255);
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
    background-color: #b7babd;
}
.error {
    color: red;
    font-size: 1.5ch;
}
</style>
