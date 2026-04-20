import { showFlash } from "./ajax_flash.js";

let selectedId = null;

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        selectedId = e.target.dataset.id;
        document.getElementById("deleteModal").classList.remove("hidden");
    }

    if (e.target.id === "cancelBtn") {
        document.getElementById("deleteModal").classList.add("hidden");
        selectedId = null;
    }

    if (e.target.id === "confirmBtn") {
        if (!selectedId) return;

        fetch("/tasks/delete/" + selectedId, {
            method: "DELETE",
            headers: { "X-Requested-With": "XMLHttpRequest" },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success_delete) {
                    const row = document.querySelector(
                        `tr[data-id="${selectedId}"]`,
                    );
                    if (row) {
                        row.remove();
                        const remaining =
                            document.querySelectorAll("tr[data-id]");

                        if (remaining.length === 0) {
                            const tbody = document.querySelector("tbody");
                            tbody.innerHTML = `<tr class="hover:text-black hover:bg-indigo-50 text-lg bg-indigo-100" style="cursor: pointer;">
                                                    <th class="text-center p-21" colspan="4">No tasks found</th>
                                               </tr>
                                               `;
                        }
                    }

                    document
                        .getElementById("deleteModal")
                        .classList.add("hidden");
                    selectedId = null;

                    showFlash("Task Deleted!");
                }
            });
    }
});
