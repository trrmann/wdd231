const modal = document.querySelector("#myModal");
const closeModal = document.querySelector("#closeModal");
modal.showModal();
closeModal.addEventListener('click', () => { modal.close();});

const modal2 = document.querySelector("#signup");
const openModal = document.querySelector(".open-button");
const closeModal2 = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal2.showModal();
});

closeModal2.addEventListener("click", () => {
  modal2.close();
});
