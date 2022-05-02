<script setup>
const props = defineProps({
    schedules: {
        type: Array,
        require: true,
    } 
});
</script>

<template>
    <div id="schedules-list">
        <div v-if="props.schedules < 1" class="text-5xl pt-20">
            No Scheduled Events
        </div>
        <template v-else>
            <div v-for="schedule in props.schedules">
                <div class="box-element box-content max-h-xl p-6">
                    <div class="font-semibold text-xl text-black">
                     {{schedule.id }}. {{schedule.bookingName }} {{ schedule.eventCategory }}
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
