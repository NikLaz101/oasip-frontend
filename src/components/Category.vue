<script setup>
import { ref, onBeforeMount } from "vue";
import CEdit from "./buttons/categoryBtn/CEdit.vue";
import CDelete from "./buttons/categoryBtn/CDelete.vue";
import CNavbar from "./buttons/categoryBtn/CNavbar.vue";

const categorys = ref([]);
const URL = "http://intproj21.sit.kmutt.ac.th/at1/api/category";

// GET
const getCategorys = async () => {
    const res = await fetch(URL);
    if (res.status === 200) {
        categorys.value = await res.json();
    } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
    await getCategorys();
});
//DELETE
const removeCategorys = async (removeContentID) => {
    if (confirm("Do you really want to delete")) {
        const res = await fetch(URL + "/" + removeContentID, {
            method: "DELETE",
        });
        if (res.status === 200) {
            categorys.value = categorys.value.filter(
                (categorys) => categorys.id !== removeContentID
            );
            console.log("deleted successfullly");
        } else console.log("error, cannot delete");
    }
};

// EDIT
const modifyCategorys = async (newid, newName, newDesc) => {
    const res = await fetch(URL + "/" + newid, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            eventCategoryName: newName,
            eventCategoryDescription: newDesc,
        }),
    });
    if (res.status === 201) {
        getCategorys();
        const modify = await res.json();
        categorys.value = categorys.value.map((categorys) =>
            categorys.id === modify.id
                ? {
                      ...categorys,
                      eventCategoryName: newName,
                      eventCategoryDescription: newDesc,
                  }
                : categorys
        );
        console.log("edited successfully");
    } else console.log("error, cannot edit");
};

const currentDetail = ref({});
const moreDetail = (curbookingId) => {
  currentDetail.value = curbookingId;
};

</script>

<template>
    <div id="contents-list" v-cloak class="px-10 py-5 flex justify-center">
        <table class="table-zebra table-layout table-element">
            <thead class="table-header bg-base-200">
                <tr>
                    <CNavbar />
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contents in categorys" :key="contents.id">
                    <td class="p-10 text-xl">
                        <div class="box-element break-words">
                            {{ contents.eventCategoryName }}
                        </div>
                    </td>
                    <td class="p-10 text-xl">
                        <div class="pt-2">
                            {{ contents.eventCategoryDescription }}
                        </div>
                    </td>
                    <td class="p-10 text-xl">
                        {{ contents.eventDuration }} minute
                    </td>

                    <td>
                        <div id="showDetail">
                            <CEdit
                            @moreDetail="moreDetail(contents)"
                                :detail="currentDetail"
                                @editDetail="modifyCategorys"
                            />

                            <CDelete @delete="removeCategorys(contents.id)" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}

.textarea {
    @apply textarea-ghost focus:outline-none;
}

table {
    text-align: left;
    position: relative;
    border-collapse: collapse;
    border-radius: 6px;
}

input,
textarea {
    color: rgb(0 0 0);
}

.table-header {
    position: sticky;
    top: 0;
    height: 100px;
}
.table-layout {
    table-layout: fixed;
    width: 90%;
}
.box-element {
    width: 250px;
}
.table-element {
    height: 100px;
}
.modal-content {
    background-color: #ffffff;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 300px;
}
.modal {
    position: fixed;
    z-index: 1;
    padding-top: 300px;
    left: 0;
    top: 0;
    width: 100%;
    height: 600px;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
