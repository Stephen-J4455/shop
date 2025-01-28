const signupForm = document.getElementById("signcontainer");
const loginForm = document.getElementById("logcontainer");
const reset = document.getElementById("passwordForm");
const formCnt = document.querySelector(".form-container");
const homePage = document.getElementById("homepage");
const accountPage = document.querySelector(".account");
const feed = document.getElementById("feedpage");
const help = document.getElementById("help");
const category = document.querySelector(".category");
const navBar = document.querySelector(".buttom-nav");
// chat
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
// notification
const notification = document.getElementById("note");
const noteBox = document.querySelector(".notification");
function closeNotification() {
    noteBox.style.display = "none";
}
// notification
// dark mode
const toggleSwitch = document.getElementById("switch");
const currentTheme = localStorage.getItem("theme");
// category
const grosP = document.getElementById("grosP");
const elecP = document.getElementById("elecP");
const phoneP = document.getElementById("phoneP");
const computingP = document.getElementById("computingP");
const machinaryP = document.getElementById("machinaryP");
const fashionP = document.getElementById("fashionP");
const sportsP = document.getElementById("sportsP");
const gamingP = document.getElementById("gamingP");
const homeAndOfficeP = document.getElementById("homeAndOfficeP");
const healthP = document.getElementById("healthP");
const gardenP = document.getElementById("gardenP");
const musicP = document.getElementById("musicP");
const miscP = document.getElementById("miscP");
const booksP = document.getElementById("booksP");
const automobileP = document.getElementById("automobileP");
const butt = document.getElementById("grocery");
// category end

// chat
function chatSetUp() {
    let firstUser = firebase.auth().currentUser.uid;
    const otherUser = "Empviv";
    const chatID = `chat_${[firstUser, otherUser].sort().join("_")}`;

    const chatDocRef = fs.collection("chats").doc(chatID);

    sendButton.addEventListener("click", async () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            messageInput.value = "";

            const chatSnapshot = await chatDocRef.get();
            if (!chatSnapshot.exists) {
                await chatDocRef.set({
                    startDate: firebase.firestore.FieldValue.serverTimestamp()
                });
            }

            await chatDocRef.collection("messages").add({
                senderID: firstUser,
                message: messageText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    });

    // Real-time listener for new messages
    chatDocRef
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
            messageContainer.innerHTML = ""; // Clear old messages
            let lastDate = null;

            snapshot.forEach(doc => {
                const data = doc.data();
                const messageDate = data.timestamp
                    ?.toDate()
                    .toLocaleDateString();
                const messageTime = data.timestamp
                    ?.toDate()
                    .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                // If the message is from a different day, display the date
                if (messageDate !== lastDate) {
                    lastDate = messageDate;
                    const dateDiv = document.createElement("div");
                    dateDiv.classList.add("date-divider");
                    dateDiv.textContent = lastDate;
                    messageContainer.appendChild(dateDiv);
                }

                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message");
                messageDiv.classList.add(
                    data.senderID === firstUser ? "sent" : "received"
                );
                messageDiv.textContent = data.message;

                // Create a subscript div for the time
                const timeSubscript = document.createElement("div");
                timeSubscript.classList.add("message-time");
                timeSubscript.textContent = messageTime;

                messageDiv.appendChild(timeSubscript);
                messageContainer.appendChild(messageDiv);
            });
            messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to the latest message
        });

    // Display chat start date at the top
    chatDocRef.get().then(chatSnapshot => {
        if (chatSnapshot.exists) {
            const chatData = chatSnapshot.data();
            const startDate = chatData.startDate?.toDate().toLocaleDateString();

            if (startDate) {
                const startDiv = document.createElement("div");
                startDiv.classList.add("start-date");
                startDiv.textContent = `Chat started on ${startDate}`;
                messageContainer.insertBefore(
                    startDiv,
                    messageContainer.firstChild
                );
            }
        }
    });
}
// chat

function sign() {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
}
function log() {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
}
function forgot() {
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    reset.style.display = "flex";
}
function back() {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    reset.style.display = "none";
}

// window
window.addEventListener("load", function () {
    if (localStorage.getItem("cartPage")) {
        document.querySelector(".cart-menu").style.display = "flex";
    }
});
// theme
// Load the theme from local storage on page load

if (currentTheme) {
    document.body.classList.add(currentTheme + "-mode");
    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
    }
}

toggleSwitch.addEventListener("change", function () {
    const elements = [
        document.querySelector(".buttom-nav"),
        document.getElementById("category"),
        document.getElementById("feed"),
        document.querySelector(".loading-effect"),
        document.querySelector(".loader-item")
    ];

    if (toggleSwitch.checked) {
        document.body.classList.replace("light-mode", "dark-mode");
        elements.forEach(element => {
            if (element) {
                element.classList.replace("light-mode", "dark-mode");
            }
        });
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.replace("dark-mode", "light-mode");
        elements.forEach(element => {
            if (element) {
                element.classList.replace("dark-mode", "light-mode");
            }
        });
        localStorage.setItem("theme", "light");
    }
        location.reload();
});

function removeDarkMode() {
    // Remove the current theme from local storage
    localStorage.removeItem("theme");

    // Remove the dark-mode class from the body
    document.body.classList.remove("dark-mode");

    // Uncheck the toggle switch if it's checked
    if (toggleSwitch.checked) {
        toggleSwitch.checked = false;
    }
}

// end of auto load
// navBar controls
function navBtn(index) {
    const nav = document.querySelectorAll(".nav-btn");
    const pages = document.getElementsByClassName("navPage");
    for (var i = 0; i < nav.length; i++) {
        if (i == index) {
            nav[i].classList.add("nav-select");
        } else {
            nav[i].classList.remove("nav-select");
        }
    }
    for (var j = 0; j < pages.length; j++) {
        if (j == index) {
            pages[j].classList.add("navPageSelect");
        } else {
            pages[j].classList.remove("navPageSelect");
        }
    }
}
//auto scroll
function autoScroll() {
    const container = document.querySelector(".adds");
    const cards = container.querySelectorAll(".giftcards");
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        container.scrollTo({
            left: cards[currentIndex].offsetLeft,
            behavior: "smooth"
        });
    }, 3000);
}
autoScroll();

document.getElementById("feedList").addEventListener("scroll", function () {
    const feedList = document.getElementById("feedList");

    // Check if scrolled to bottom
    if (
        feedList.scrollTop + feedList.clientHeight >=
        feedList.scrollHeight - 5
    ) {
        displayfeedPage();
    }
});

// add to cart function
function openCartMenu() {
    // location.reload();
    const cartMenu = document.querySelector(".cart-menu");
    if (cartMenu.style.display === "block") {
        cartMenu.style.display = "none";
        // navBar.style.display = "flex";
    } else {
        cartMenu.style.display = "block";
        // navBar.style.display = "none";
    }
    localStorage.setItem("cartPage", "true");
}
function closeCartPage() {
    localStorage.removeItem("cartPage");
    document.querySelector(".cart-menu").style.display = "none";
}

// navBar hover
function navhover() {
    if ((homePage.style.display = "block")) {
        document.getElementById("activehome").style.color = "darkorange";
    }
}
navhover();

// open address book
function openAddressBook() {
    const addressPress = document.getElementById("addressPage");
    const expandIcon = document.getElementById("expandIcon");
    if (addressPress.style.display === "flex") {
        addressPress.style.display = "none";
        expandIcon.style.rotate = "0deg";
        expandIcon.style.transition = "0.3s ease";
    } else {
        addressPress.style.display = "flex";
        expandIcon.style.rotate = "180deg";
        expandIcon.style.transition = "0.3s ease";
    }
}

// category page
function btnSelect(cardNum) {
    var catP = document.getElementsByClassName("for-gros");
    var buttons = document.querySelectorAll(".category-box span");
    for (var i = 0; i < catP.length; i++) {
        if (i == cardNum) {
            catP[i].classList.add("show");
        } else {
            catP[i].classList.remove("show");
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        if (i == cardNum) {
            buttons[i].classList.add("cat-active");
        } else {
            buttons[i].classList.remove("cat-active");
        }
    }
}
// acc management
function openAccMgt() {
    const accBox = document.getElementById("accountManagement");
    const head = document.querySelectorAll(".setting-item");
    const icon = document.getElementById("mgtIc");
    if (accBox.style.display === "flex") {
        accBox.style.display = "none";
        icon.style.rotate = "0deg";
        icon.style.transition = "0.3s ease";
    } else {
        accBox.style.display = "flex";
        icon.style.rotate = "180deg";
        icon.style.transition = "0.3s ease";
    }
}
function openPasswordReset() {
    const resetPage = document.getElementById("passwordChange");
    if (resetPage.style.display === "block") {
        resetPage.style.display = "none";
    } else {
        resetPage.style.display = "block";
    }
}

function openChange() {
    const namePage = document.querySelector(".change-name");
    if (namePage.style.display === "block") {
        namePage.style.display = "none";
    } else {
        namePage.style.display = "block";
    }
}
function shopMore() {
    const cart = document.querySelector(".cart-menu");
    const order = document.querySelector(".make-order");
    cart.style.display = "none";
    order.style.display = "none";
}

function openInbox() {
    const inbox = document.querySelector(".acc-page");
    // inbox.innerHTML = "";
    inbox.classList.add("show-acc");
}

function closeInbox() {
    const inbox = document.querySelector(".acc-page");
    // inbox.innerHTML = "";
    inbox.classList.remove("show-acc");
}

function openChat() {
    const chatBox = document.querySelector(".chat-container");
    chatBox.classList.add("show-chat");
}
function closeChat() {
    const chatBox = document.querySelector(".chat-container");
    chatBox.classList.remove("show-chat");
}
