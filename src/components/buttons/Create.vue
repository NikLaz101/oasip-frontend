<script setup>
import { ref, computed, onBeforeMount } from "vue";

defineEmits(["create"]);
defineProps({
    create: {
        type: Object,
        require: true,
    },
});

const category = ref([]);
const isModalOn = ref(false);

// GET
const getCategories = async () => {
    const res = await fetch("http://intproj21.sit.kmutt.ac.th/at1/api/category");
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
    <div>
        <button
            class="btn text-xl font-extrabold px-10"
            @click="
                Name = undefined;
                Email = undefined;
                Selected = undefined;
                Time = undefined;
                Duration = undefined;
                Notes = undefined;
                isModalOn = !isModalOn;
            "
        >
            CREATE
        </button>
        <div v-show="isModalOn" class="modal">
            <div>
                <div class="modal-content">fcdfd</div>
                <p>test</p>
            </div>
            <!-- <div>
                <table>
                    <tr>
                        <th id="size">Name:</th>
                        <td id="size">
                            <input type="text" v-model="Name" />
                        </td>
                    </tr>
                    <tr>
                        <th id="size">Email:</th>
                        <td id="size">
                            <input type="text" v-model="Email" />
                        </td>
                    </tr>
                    <tr>
                        <th id="size">Clinic:</th>
                        <td id="size">
                            <form>
                                <select
                                    id="clinics"
                                    name="clinics"
                                    class="text-black"
                                    @change="newDuration"
                                    v-model="Selected"
                                >
                                    <option selected>--Select--</option>
                                    <option
                                        v-for="categorys in category"
                                        :value="categorys.eventCategoryName"
                                    >
                                        {{ categorys.eventCategoryName }}
                                    </option>
                                </select>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th id="size">Date:</th>
                        <td id="size">
                            <input type="datetime-local" v-model="Time" />
                        </td>
                    </tr>
                    <tr>
                        <th id="size">Duration:</th>
                        <td id="size">
                            <input readonly type="text" v-model="Duration" />
                        </td>
                    </tr>
                    <tr>
                        <th id="size">Note:</th>
                        <td id="size">
                            <textarea
                                cols="30"
                                rows="5"
                                v-model="Notes"
                            ></textarea>
                        </td>
                    </tr>
                </table>

                <div class="modal-action">
                    <button
                        @click="
                            $emit(
                                'create',
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
            </div> -->
        </div>
    </div>
</template>

<style>
input,
textarea {
    color: rgb(0 0 0);
}
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 300px;
}
.modal {
    position: fixed;
    z-index: 1;
    padding-top: 300px;
    left: 0;
    top: 0;
    width: 100%;
    height: 600px;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
