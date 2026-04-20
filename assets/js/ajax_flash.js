export function showFlash(message) {
    const div = document.createElement("div");
    div.className =
        "flex bg-green-500 text-black p-3 mb-3 rounded-xl m-auto w-fit";
    div.innerHTML = `<span class="text-center">${message}</span>`;

    const h1 = document.querySelector(".bg-indigo-200 h1");
    h1.insertAdjacentElement("afterend", div);

    setTimeout(() => div.remove(), 3000);
}
