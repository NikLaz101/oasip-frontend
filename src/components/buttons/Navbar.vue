<script setup></script>

<template>
  <th id="Name" class="text-xl font-extrabold px-10">NAME</th>
  <th class="px-10">
    <div class="dropdown">
      <button tabindex="0" class="m-1 text-xl font-extrabold">CLINIC</button>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 bg-base-300 shadow rounded-box w-auto mt-7"
      >
        <li>
          <button class="text-xl">Project Management</button>
        </li>
        <li>
          <button class="text-xl">DevOps/Infra</button>
        </li>
        <li>
          <button class="text-xl">Database</button>
        </li>
        <li>
          <button class="text-xl">Client-Side</button>
        </li>
        <li>
          <button class="text-xl">Server-Side</button>
        </li>
      </ul>
    </div>
  </th>
  <th class="text-xl font-extrabold px-10">DATE</th>
  <th class="text-xl font-extrabold px-10">DURATION</th>
</template>

<style></style>
