const usernameLength = document.querySelector("#username-length");
const messageLength = document.querySelector("#message-length");
const usernameInput = document.querySelector("#author");
const messageInput = document.querySelector("#message");

if (usernameLength) {
  usernameLength.textContent = `${usernameInput.value.length}/16`;
  messageLength.textContent = `${messageInput.value.length}/255`;

  usernameInput.addEventListener("input", () => {
    usernameLength.textContent = `${usernameInput.value.length}/16`;
  });

  messageInput.addEventListener("input", () => {
    messageLength.textContent = `${messageInput.value.length}/255`;
  });
}
