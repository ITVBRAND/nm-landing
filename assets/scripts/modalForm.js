const requestForm = document.querySelector(".request__form");

if (requestForm) {
    const modal = document.createElement("dialog");
    modal.className = "modalForm";
    modal.setAttribute("aria-labelledby", "modalForm-title");
    modal.innerHTML = `
        <div class="modalForm__panel">
            <div class="modalForm__header">
                <p class="eyebrow">Технический запрос</p>
                <button class="modalForm__close" type="button" aria-label="Закрыть форму">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modalForm__content"></div>
        </div>
    `;

    const modalForm = requestForm.cloneNode(true);
    const title = modalForm.querySelector(".request__form-title");
    if (title) {
        title.id = "modalForm-title";
    }

    modal.querySelector(".modalForm__content").append(modalForm);
    document.body.append(modal);

    document.querySelectorAll('a.btn[href="#contacts"]').forEach((link) => {
        link.dataset.modalOpen = "";
    });

    document.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-modal-open]");

        if (openButton) {
            event.preventDefault();
            modal.showModal();
            return;
        }

        if (event.target.closest(".modalForm__close")) {
            modal.close();
        }
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}
