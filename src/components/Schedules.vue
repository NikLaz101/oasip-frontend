<script setup>
const prop = defineProps({
    content: {
        type: Array,
        require: true,
    },
});
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
                            <label for="my-modal-4" class="btn modal-button">More Detail</label>
                            <input
                                type="checkbox"
                                id="my-modal-4"
                                class="modal-toggle"
                            />
                            <label for="my-modal-4" class="modal cursor-pointer">
                                <label class="box-element modal-box relative" for="">
                                    <h3 class="text-xl font-bold">
                                        Detail
                                    </h3>
                                    <ul class="text-lg">
                                        <li>
                                            Name: {{ contents.bookingName }}
                                        </li>
                                        <li>
                                            Email: {{ contents.bookingEmail }}
                                        </li>
                                        <li>
                                            Clinic: {{ contents.eventCategory }}
                                        </li>
                                        <li>
                                            StartTime: {{ contents.eventStartTime }}
                                        </li>
                                        <li>
                                            Duration: {{ contents.eventDuration }}
                                        </li>
                                        <li>
                                            Note: {{ contents.eventNotes }}
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
