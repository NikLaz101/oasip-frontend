<script setup>
import moment from "moment";

defineEmits(["moreDetail"]);
defineProps({
  detail: {
    type: Object,
    require: true,
  },
});

</script>

<template>
  <label for="my-modal-3" class="btn modal-button" @click="$emit('moreDetail')"
    >Detail</label>
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-3"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <table>
        <tbody>
          <tr>
            <td></td>
            <td class="text-base font-bold">DETAIL</td>
          </tr>
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
              {{
                moment(detail.eventStartTime).format(
                  "D MMMM YYYY, h:mm:ss A"
                )
              }}
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
  </div>
</template>

<style></style>
