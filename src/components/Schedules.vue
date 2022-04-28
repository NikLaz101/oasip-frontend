<script setup>
defineProps({
    schedules: {
        type: Array,
        require: true,
    },
    category: {
        type: Array,
        require: true,
    }
    
});
</script>

<template>
    <div id="schedules-list">
        <div v-if="length < 1" class="text-5xl pt-20">
            No Scheduled Events
        </div>
        <template v-else>
            <div v-for="schedule in schedules">
                <div class="box-element box-content max-h-xl p-6">
                    <div class="font-semibold text-xl text-black">
                        <p>{{schedule.eventCategory }} {{schedule.bookingName }} 
                        <span v-if="schedule.eventCategory == category.eventCategoryId">{{ category.eventCategoryName }}</span>
                        </p>
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
