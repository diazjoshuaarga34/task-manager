import { showFlash } from "./ajax_flash.js";
let editId = null;

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
        editId = e.target.dataset.id;

        document.getElementById("editTitle").value = e.target.dataset.title;
        document.getElementById("editStatus").value = e.target.dataset.status;
        document.getElementById("editDescription").value =
            e.target.dataset.description;

        document.getElementById("editModal").classList.remove("hidden");
    }

    if (e.target.id === "closeEdit") {
        document.getElementById("editModal").classList.add("hidden");
    }

    if (e.target.id === "saveEdit") {
        if (!editId) return;

        const title = document.getElementById("editTitle").value;
        const status = document.getElementById("editStatus").value;
        const description = document.getElementById("editDescription").value;

        fetch("/tasks/update/" + editId, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, status, description }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success_edit) {
                    const row = document.querySelector(
                        `tr[data-id="${editId}"]`,
                    );

                    if (row) {
                        const task = data.task;

                        row.cells[0].textContent = task.title;

                        const statusClasses = {
                            pending: "bg-gray-500 p-4 text-white rounded-md",
                            in_progress: "bg-yellow-500 p-4 rounded-md",
                            done: "bg-green-500 p-4 rounded-md",
                        };
                        const statusText = {
                            pending: "Pending",
                            in_progress: "In Progress",
                            done: "Done",
                        };
                        row.cells[1].innerHTML = `<span class="${statusClasses[task.status]}">${statusText[task.status]}</span>`;

                        const editBtn = row.querySelector(".edit-btn");
                        if (editBtn) {
                            editBtn.dataset.title = task.title;
                            editBtn.dataset.status = task.status;
                            editBtn.dataset.description = task.description;
                        }
                        showFlash("Task updated successfully!");
                    }

                    document
                        .getElementById("editModal")
                        .classList.add("hidden");
                    editId = null;
                }
            });
    }
});
