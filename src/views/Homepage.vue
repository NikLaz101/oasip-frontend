<script setup>
</script>

<template>
    <div class="flex text-white">
        <div id="menu">
            <div class="grid justify">
                <p class="font-semibold text-4xl">Clinic</p>
                <button class="btn">Home</button>
                <button class="btn" >Project Management Clinic</button>
                <button class="btn" >DevOps/Infra Clinic</button>
                <button class="btn" >Database Clinic</button>
                <button class="btn" >Client-Side Clinic</button>
                <button class="btn" >Server-Side Clinic</button>
            </div>
        </div>
        <div id="content">
            <div>
                <button class="btn">Create</button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style></style>
