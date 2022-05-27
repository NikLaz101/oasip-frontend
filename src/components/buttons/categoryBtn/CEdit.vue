<script setup>
import { ref } from "vue";

defineEmits(["moreDetail", "editDetail"]);
const props = defineProps({
    detail: {
        type: Object,
        require: true,
    },
});

const isModalOn = ref(false);
// const duplicateValue = () => new Set(props.detail.map((v) => v.eventCategoryName))
</script>

<template>
    <button
        class="btn modal-button"
        @click="
            $emit('moreDetail');
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
                    <form
                        method="post"
                        @submit.prevent="
                            $emit(
                                'editDetail',
                                detail.id,
                                detail.eventCategoryName,
                                detail.eventCategoryDescription,
                                detail.eventDuration
                            );
                            isModalOn = !isModalOn;
                        "
                    >
                        <div
                            v-show="isModalOn"
                            class="text-base font-medium grid justify-center py-2"
                        >
                            <p
                                class="grid justify-center font-bold text-4xl mb-4 font-header"
                            >
                                Category Name
                            </p>
                            <input
                                type="text"
                                v-model="detail.eventCategoryName"
                                class="text-black p-1 m-1 rounded-md"
                                maxlength="100"
                                required
                            />
                        </div>
                        <div
                            class="text-base font-medium grid justify-center py-2"
                        >
                            <div v-show="isModalOn">
                                <p
                                    class="grid justify-center font-bold text-2xl mb-4 font-header"
                                >
                                    Description
                                </p>
                                <textarea
                                    cols="60"
                                    rows="4"
                                    maxlength="500"
                                    v-model="detail.eventCategoryDescription"
                                    class="text-black p-2 m-1 rounded-md"
                                ></textarea>
                            </div>
                        </div>
                        <div
                            class="text-lg font-medium grid justify-center py-2"
                        >
                            <p>
                                Duration :
                                <input
                                    type="number"
                                    min="1"
                                    max="480"
                                    v-model="detail.eventDuration"
                                    class="text-black p-1 m-1 rounded-md"
                                    required
                                />
                                <span>min: 1 | max: 480</span>
                            </p>
                        </div>
                        <div class="flex justify-end">
                            <input
                                class="btn m-2"
                                v-show="isModalOn"
                                type="submit"
                                value="OK"
                            />
                            <input
                                class="btn m-2"
                                v-show="isModalOn"
                                type="button"
                                value="Cancel"
                                @click="isModalOn = !isModalOn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.auto-fill {
    color: #8f8f8f;
}
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
