<script setup>
import moment from "moment";
import { ref } from "vue";
defineEmits(["moreDetail", "editDetail"]);
defineProps({
    detail: {
        type: Object,
        require: true,
    },
});
const edit = ref(false);
const isModalOn = ref(false);
const date = ref();
function updateTime() {
    date.value = moment().format("YYYY-MM-DDTHH:mm:ss");
}
var realTime = () => {
    setInterval(updateTime, 1000);
};
realTime();
</script>

<template>
    <button
        class="btn modal-button"
        @click="
            $emit('moreDetail');
            edit = false;
            isModalOn = !isModalOn;
        "
    >
        Detail
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
        <div class="modal-content bg-base-100 rounded-2xl">
            <div class="flex justify-end">
                <button class="close" @click="isModalOn = !isModalOn">x</button>
            </div>
            <div class="flex justify-center">
                <div>
                    <div class="text-3xl font-bold flex justify-center">
                        <p class="font-header">
                            {{ detail.bookingName }}
                        </p>
                        <button
                            v-show="!edit"
                            @click="edit = !edit"
                            class="pl-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="text-base font-medium grid justify-center py-2">
                        {{ detail.bookingEmail }}
                    </div>
                    <div class="grid justify-center">
                        <p
                            class="text-lg font-bold grid justify-center py-3 opacity-50"
                        >
                            Clinic
                        </p>
                        <div class="font-header text-2xl font-bold py-2">
                            {{ detail.categoryName }}
                        </div>
                    </div>
                    <!-- form -->
                    <form
                        method="post"
                        @submit.prevent="
                            $emit(
                                'editDetail',
                                detail.id,
                                detail.eventStartTime,
                                detail.eventNotes
                            );
                            edit = !edit;
                        "
                    >
                        <div
                            v-show="!edit"
                            class="text-base font-medium grid justify-center py-2"
                        >
                            {{
                                moment(detail.eventStartTime).format(
                                    "D MMMM YYYY, h:mm:ss A"
                                )
                            }}
                        </div>
                        <div
                            v-show="edit"
                            class="text-base font-medium grid justify-center py-2"
                        >
                            <input
                                type="datetime-local"
                                v-model="detail.eventStartTime"
                                :min="date"
                                step="any"
                                class="text-black p-1 rounded-md"
                                required
                            />
                        </div>
                        <div
                            class="text-2xl font-bold grid justify-center py-2"
                        >
                            <div>
                                <span class="font-header">Duration : </span
                                ><span>{{ detail.eventDuration }} minutes</span>
                            </div>
                        </div>
                        <div class="grid justify-center">
                            <p
                                class="text-lg font-bold opacity-50 grid justify-center py-3"
                            >
                                Note
                            </p>
                            <div
                                v-show="!edit"
                                v-if="
                                    detail.eventNotes != null &&
                                    detail.eventNotes.trim() != ''
                                "
                                class="text-base font-medium py-2 "
                            >
                                {{ detail.eventNotes }}
                            </div>
                            <div
                                v-show="!edit"
                                v-else-if="typeof detail.eventNotes"
                                class="text-base font-medium opacity-50 py-2"
                            >
                                <b>No messages</b>
                            </div>
                            <div v-show="edit" class="py-2">
                                <textarea
                                    cols="50"
                                    rows="3"
                                    v-model="detail.eventNotes"
                                    class="text-black p-2 rounded-md"
                                ></textarea>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <input
                                class="btn m-2"
                                v-show="edit"
                                type="submit"
                                value="OK"
                            />
                            <input
                                class="btn m-2"
                                v-show="edit"
                                type="button"
                                value="Cancel"
                                @click="edit = !edit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-header {
    color: #ff9d00;
}
.modal-content {
    margin: auto;
    padding: 20px;
    width: 550px;
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
</style>
