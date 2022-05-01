<script setup>
import { ref, computed } from 'vue';
defineProps({
    content: {
        type: Array,
        require: true,
    },
});

const currentDetail = ref([]);
const moreDetail = (curbookingId) => {
    currentDetail.value = curbookingId;
    // console.log(curbookingId);
}

</script>

<template>
    <div id="contents-list">
        <div v-if="content < 1" class="text-5xl pt-20">
            No Scheduled Events
        </div>
        <template v-else>
            <div v-for="contents in content" :key="contents.id">
                <div class="box-element box-entries max-h-xl p-6">
                    <div class="font-semibold text-xl text-black">
                        {{ contents.bookingId }}. {{ contents.bookingName }}
                        {{ contents.eventStartTime }}
                        <div id="showDetail">
                            <label for="my-modal-4" class="btn modal-button" @click="moreDetail(contents)">More Detail</label>
                            <input
                                type="checkbox"
                                id="my-modal-4"
                                class="modal-toggle"
                            />
                            <label for="my-modal-4" class="modal cursor-pointer">
                                <label class="box-element modal-box relative">
                                    <h3 class="text-xl font-bold">
                                        Detail
                                    </h3>
                                    <ul class="text-lg"  >
                                        <li>
                                            ID : {{ currentDetail.bookingId }}
                                        </li>
                                        <li>
                                            Name: {{ currentDetail.bookingName }}
                                        </li>
                                        <li>
                                            Email: {{ currentDetail.bookingEmail }}
                                        </li>
                                        <li>
                                            Clinic: {{ currentDetail.eventCategory }}
                                        </li>
                                        <li>
                                            StartTime: {{ currentDetail.eventStartTime }}
                                        </li>
                                        <li>
                                            Duration: {{ currentDetail.eventDuration }}
                                        </li>
                                        <li>
                                            Note: {{ currentDetail.eventNotes }}
                                        </li>
                                    </ul>
                                </label>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.box-element {
    @apply shadow-xl my-3 rounded-xl;
    width: 500px;
    background-color: #ede6db;
}
</style>
