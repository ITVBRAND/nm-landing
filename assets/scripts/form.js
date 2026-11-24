const form = document.querySelector(".request__form");

if (form) {
    const selectButton = form.querySelector(".request__select");
    const selectText = form.querySelector(".request__select-text");
    const options = form.querySelector(".request__options");
    const valueInput = form.querySelector(".request__direction");
    const fileInput = form.querySelector(".request__file-input");
    const fileName = form.querySelector(".request__file-name");
    const status = form.querySelector(".request__status");
    const defaultLabel = selectText.textContent;

    const closeOptions = () => {
        options.hidden = true;
        selectButton.setAttribute("aria-expanded", "false");
    };

    selectButton.addEventListener("click", () => {
        const willOpen = options.hidden;
        options.hidden = !willOpen;
        selectButton.setAttribute("aria-expanded", String(willOpen));
    });

    options.addEventListener("click", (event) => {
        const option = event.target.closest(".request__option");

        if (!option) {
            return;
        }

        valueInput.value = option.dataset.value;
        selectText.textContent = option.dataset.value;
        selectButton.classList.add("has-value");
        options.querySelectorAll(".request__option").forEach((item) => {
            item.classList.toggle("is-active", item === option);
        });
        closeOptions();
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".request__field--select")) {
            closeOptions();
        }
    });

    fileInput.addEventListener("change", () => {
        const file = fileInput.files && fileInput.files[0];
        fileName.textContent = file ? file.name : "Прикрепить файл";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        status.classList.remove("is-error");

        const name = form.querySelector("[name='name']").value.trim();
        const contact = form.querySelector("[name='contact']").value.trim();
        const task = form.querySelector("[name='task']").value.trim();
        const consent = form.querySelector("[name='consent']").checked;

        if (!name || !contact || !valueInput.value || !task || !consent) {
            status.textContent = "Заполните все поля и подтвердите согласие.";
            status.classList.add("is-error");
            return;
        }

        status.textContent = "Запрос подготовлен. Отправка на сервер подключается отдельно.";
        form.reset();
        valueInput.value = "";
        selectText.textContent = defaultLabel;
        selectButton.classList.remove("has-value");
        fileName.textContent = "Прикрепить файл";
        options.querySelectorAll(".request__option").forEach((item) => {
            item.classList.remove("is-active");
        });
        closeOptions();
    });
}
