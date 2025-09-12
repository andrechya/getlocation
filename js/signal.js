const overlay = document.getElementById("connectionOverlay");
const statusMessage = document.getElementById("statusMessage");
let countdown = 15;
let countdownTimer;

function showOverlay() {
  overlay.style.display = "flex";
  countdown = 15;
  updateMessage();
  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    countdown--;
    if (countdown <= 0) countdown = 15;
    updateMessage();
  }, 1000);
}

function hideOverlay() {
  overlay.style.display = "none";
  clearInterval(countdownTimer);
}

function updateMessage() {
  statusMessage.textContent = `Rejoin failed... trying again in ${countdown} seconds`;
}

// Jalankan saat status jaringan berubah
window.addEventListener("offline", () => {
  console.log("🔴 Offline terdeteksi");
  showOverlay();
});

window.addEventListener("online", () => {
  console.log("🟢 Online kembali");
  hideOverlay();
});

// Periksa status saat pertama kali halaman dibuka
if (!navigator.onLine) {
  showOverlay();
} else {
  hideOverlay();
}
