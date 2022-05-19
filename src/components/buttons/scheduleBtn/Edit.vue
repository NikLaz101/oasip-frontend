<script setup>
import moment from "moment";
import { ref } from "vue";

defineEmits(["edit"]);
defineProps({
  detail: {
    type: Object,
    require: true,
  },
});
const show = ref(false);
</script>

<template>
  <button class="btn m-2" @click="show = !show">Edit</button>
  <div v-show="show">
    <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>
            {{ detail.bookingName }}
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            {{ detail.bookingEmail }}
          </td>
        </tr>
        <tr>
          <td>CLINIC</td>
          <td>
            {{ detail.categoryName }}
          </td>
        </tr>
        <tr>
          <td>DATE</td>
          <td>
            {{ moment(detail.eventStartTime).format("D MMMM YYYY, h:mm:ss A") }}
          </td>
        </tr>
        <tr>
          <td>DURATION</td>
          <td>
            {{ detail.eventDuration }}
          </td>
        </tr>
        <tr>
          <td>NOTE</td>
          <td v-if="detail.eventNotes != null">
            {{ detail.eventNotes }}
          </td>
          <td v-else class="opacity-50">
            <b>No messages</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
