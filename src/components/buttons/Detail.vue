<script setup>
defineEmits(['moreDetail'])
defineProps({
	detail: {
		type: Array,
		require: true,
	},
});

const URL = "http://ip21at1.sit.kmutt.ac.th:5000/api/event";

//GET
const getSchedule = async (id) => {
	const res = await fetch(URL + "/" + id);
	if (res.status === 200) {
		post.value = await res.json();
	}
};

</script>

<template>
  <div id="showDetail">
    <label for="my-modal-3" class="btn modal-button" @click="$emit('moreDetail')">Detail</label>
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td class="text-base font-bold">DETAIL</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                {{ currentDetail.bookingName }}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                {{ currentDetail.bookingEail }}
              </td>
            </tr>
            <tr>
              <td>CLINIC</td>
              <td>
                {{ currentDetail.categoryName }}
              </td>
            </tr>
            <tr>
              <td>DATE</td>
              <td>
                {{
                    moment(currentDetail.eventStartTime).format(
                      "D MMMM YYYY, h:mm:ss A"
                    )
                }}
              </td>
            </tr>
            <tr>
              <td>DURATION</td>
              <td>
                {{ currentDetail.eventDuration }}
              </td>
            </tr>
            <tr>
              <td>NOTE</td>
              <td v-if="currentDetail.eventNotes != null">
                {{ currentDetail.eventNotes }}
              </td>
              <td v-else class="opacity-50">
                <b>No messages</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
</style>
