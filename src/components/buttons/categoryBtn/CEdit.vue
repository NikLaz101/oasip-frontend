<script setup>
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
</script>

<template>
    <button
        class="btn modal-button"
        @click="
            $emit('moreDetail');
            edit = !edit;
            isModalOn = !isModalOn;
        "
    >
        EDIT
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
        <div class="modal-content bg-base-100 rounded-2xl">
            <div class="flex justify-end">
                <button class="close" @click="isModalOn = !isModalOn">x</button>
            </div>
            <div class="flex justify-center">
                <div>
                    <div
                        v-show="edit"
                        class="text-base font-medium grid justify-center py-2"
                    >
                    <p>Category Name</p>
                        <input
                            type="text"
                            v-model="detail.eventCategoryName"
                            class="text-black"
                        />
                    </div>
                    <div class="text-base font-medium grid justify-center py-2">
                        <div v-show="edit">
                        <p>Description</p>
                            <textarea
                                cols="50"
                                rows="3"
                                v-model="detail.eventCategoryDescription"
                                class="text-black p-2"
                            ></textarea>
                        </div>
                    </div>
                    <div class="text-base font-medium grid justify-center py-2">
                        <p>Duration : <span>{{ detail.eventDuration }}</span></p>
                    </div>
                    <div class="flex justify-end">
                        <button
                            class="btn m-2"
                            v-show="edit"
                            @click="
                                $emit(
                                    'editDetail',
                                    detail.id,
                                    detail.eventCategoryName,
                                    detail.eventCategoryDescription
                                );
                                isModalOn = !isModalOn;
                            "
                        >
                            OK
                        </button>
                        <button
                            class="btn m-2"
                            v-show="edit"
                            @click="isModalOn = !isModalOn;"
                        >
                            Cancel
                        </button>
                    </div>
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
