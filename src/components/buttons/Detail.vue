<<<<<<< HEAD
<script setup>
import moment from "moment";
import { ref } from "vue";

defineEmits(["moreDetail","editDetail"]);
defineProps({
  detail: {
    type: Object,
    require: true,
  },
});

const edit = ref(false);
</script>

<template>
  <label for="my-modal-3" class="btn modal-button" @click="$emit('moreDetail'); edit = false;"
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
	    <td>
              <!-- EDIT -->
              <button v-show="!edit" class="btn" @click="edit = !edit">
                Edit
              </button>
            </td>
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
            <td v-show="!edit">
              {{
                moment(detail.eventStartTime).format("D MMMM YYYY, h:mm:ss A")
              }}
            </td>
            <td v-show="edit">
              <input type="datetime-local" v-model="detail.eventStartTime" />
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
            <td v-show="!edit" v-if="detail.eventNotes != null">
              {{ detail.eventNotes }}
            </td>
            <td v-show="!edit" v-else class="opacity-50">
              <b>No messages</b>
            </td>
            <td v-show="edit">
              <textarea
                cols="30"
                rows="5"
                v-model="detail.eventNotes"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <!-- Edit -->
              <label
                for="my-modal-3"
                class="btn m-2"
                v-show="edit"
                @click="
                  $emit(
                    'editDetail',
                    detail.id,
                    detail.eventStartTime,
                    detail.eventNotes
                  );
                  edit = !edit;
                "
                >OK</label
              >
              <button class="btn m-2" v-show="edit" @click="edit = !edit">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
=======
<script setup>
import moment from "moment";
import { ref } from "vue";

defineEmits(["moreDetail", "editDetail"]);
defineProps({
  detail: {
    type: Object,
    require: true,
  },
});

const edit = ref(false);
</script>

<template>
  <label
    for="my-modal-3"
    class="btn modal-button"
    @click="
      $emit('moreDetail');
      edit = false;
    "
    >Detail</label
  >
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
            <td>
              <!-- EDIT -->
              <button v-show="!edit" class="btn" @click="edit = !edit">
                Edit
              </button>
            </td>
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
            <td v-show="!edit">
              {{
                moment(detail.eventStartTime).format("D MMMM YYYY, h:mm:ss A")
              }}
            </td>
            <td v-show="edit">
              <input type="datetime-local" v-model="detail.eventStartTime" />
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
            <td v-show="!edit" v-if="detail.eventNotes != null">
              {{ detail.eventNotes }}
            </td>
            <td v-show="!edit" v-else class="opacity-50">
              <b>No messages</b>
            </td>
            <td v-show="edit">
              <textarea
                cols="30"
                rows="5"
                v-model="detail.eventNotes"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <!-- Edit -->
              <label
                for="my-modal-3"
                class="btn m-2"
                v-show="edit"
                @click="
                  $emit(
                    'editDetail',
                    detail.id,
                    detail.eventStartTime,
                    detail.eventNotes
                  );
                  edit = !edit;
                "
                >OK</label
              >
              <button class="btn m-2" v-show="edit" @click="edit = !edit">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
>>>>>>> f190333ae447eda6ea1cf035446f031b564b6b77
