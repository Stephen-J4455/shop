// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCG7fRw21apfTA36HKl5LbVWiHI_8zk12A",
  authDomain: "signup-bfcf8.firebaseapp.com",
  databaseURL: "https://signup-bfcf8-default-rtdb.firebaseio.com",
  projectId: "signup-bfcf8",
  storageBucket: "signup-bfcf8.appspot.com",
  messagingSenderId: "862509936181",
  appId: "1:862509936181:web:6a16490f27a97bac7bcb7c",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

// Firebase Auth Functions
function signUp() {
  event.preventDefault();
  const email = $("#signup-email").val();
  const password = $("#signup-password").val();
  const username = $("#userName").val();
  if ((email === "", password === "", username === "")) {
    noteBox.style.display = "block";
    notification.innerText = "Enter Email and Password";
  } else {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        var userId = firebase.auth().currentUser.uid;
        let dbId = 1599263;
        db.ref(`USER/ADDRESS/${userId}`).set({
          account: username,
          database: dbId,
        });
        // alert("Sign up successful: ", user);
        location.reload();
        homePage.style.display = "block";
        formCnt.style.display = "none";
      })
      .catch((error) => {
        //alert("Error signing up: ", error);
        noteBox.style.display = "block";
        notification.innerText = "Error Signing Up! ";
      });
  }
}

function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();
  if ((email === "", password === "")) {
    noteBox.style.display = "block";
    notification.innerText = "Enter Email and Password";
  } else {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        location.reload();
        const user = userCredential.user;
        homePage.style.display = "block";
        formCnt.style.display = "none";
      })
      .catch((error) => {
        noteBox.style.display = "block";
        notification.innerText = `Error
                Logging In!,${error}`;
      });
  }
}

function logout() {
  auth
    .signOut()
    .then(() => {
      document.getElementById("body-box").style.display = "none";
      formCnt.style.display = "block";
      homePage.style.display = "none";

      removeDarkMode();
    })
    .catch((error) => {
      //alert("Error signing out: ", error);
    });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    // console.log("User is signed in: ", user);
    const use = document.getElementById("userEmail");
    use.innerText = user.email;
    // Redirect to home page when logged in
    formCnt.style.display = "none";
    navBar.style.display = "flex";
    document.querySelector(".cart-btn").style.display = "block";
    chatSetUp();
    changeAccName();
    cart();
    // checkLikedProducts();
    getUserAddress();
    catGros("Category/grocery", "groceryP");
    catGros("Category/computing", "computingP");
    catGros("Category/electronics", "elecP");
    catGros("Category/home&office", "homeAndOfficeP");
    catGros("Category/phones", "phoneP");
    catGros("Category/machinary", "machinaryP");
    catGros("Category/fashion", "fashionP");
    catGros("Category/sports", "sportsP");
    catGros("Category/gaming", "gamingP");
    catGros("Category/health&beauty", "healthP");
    catGros("Category/garden&outdoors", "gardenP");
    catGros("Category/music", "musicP");
    catGros("Category/books&movies", "booksP");
    catGros("Category/misc", "miscP");
    catGros("Category/automobile", "automobileP");
    displayfeedPage();
  } else {
    // alert("User is signed out");
    // Redirect to login page
    navBar.style.display = "none";
    formCnt.style.display = "flex";
    homePage.style.display = "none";
  }
});

function forgotPassword() {
  const email = document.getElementById("resetEmail").value;
  if (email === "") {
    noteBox.style.display = "block";
    notification.innerText = "Enter Email To Reset Password";
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        noteBox.style.display = "block";
        notification.innerText = "Password reset email sent! ";
      })
      .catch(function (error) {
        noteBox.style.display = "block";
        notification.innerText = "Error resetting password! ";
      });
  }
  event.preventDefault();
}
function closeerror() {
  const close = document.querySelectorAll(".errorMessage");
  close.forEach((close) => {
    close.style.display = "none";
  });
}

// add firebase real time database to
let db = firebase.database();
const storage = firebase.storage();
const fs = firebase.firestore(app);

function openAccDelPage() {
  const delP = document.getElementById("confirmDel");
  if (delP.style.display === "flex") {
    delP.style.display = "none";
  } else {
    delP.style.display = "flex";
  }
}
function proceedDel() {
  const delP = document.getElementById("confirmDel");
  const delPass = document.getElementById("passDelPage");
  if (delPass.style.display === "block") {
    delPass.style.display = "none";
  } else {
    delPass.style.display = "block";
  }
}
function deleteAcc() {
  const delIn = document.getElementById("delPass").value;
  var mail = firebase.auth().currentUser.email;
  if (delIn === mail) {
    clearDatabase();
    deleteUserAccount();
  } else {
    noteBox.style.display = "block";
    notification.innerText = "Invalid Email";
  }
}
function clearDatabase() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/ADDRESS/${user}`).remove();
  // remember to add remove chat in db
  db.ref(`USER/CART/${user}`)
    .remove()
    .then(function () {
      noteBox.style.display = "block";
      notification.innerText = "Clearing Database";
    })
    .catch(function (error) {
      noteBox.style.display = "block";
      notification.innerText = "Error removing database ";
    });
}
function deleteUserAccount() {
  var account = firebase.auth().currentUser;

  account
    .delete()
    .then(function () {
      noteBox.style.display = "block";
      notification.innerText = "Account Successfully Deleted";
      document.getElementById("body-box").style.display = "none";
      formCnt.style.display = "block";
      homePage.style.display = "none";
    })
    .catch(function (error) {
      // An error happened
      noteBox.style.display = "block";
      notification.innerText = "Error Deleting Account";
    });
}
function changeAccoutPassword() {
  const input = document.getElementById("changePass").value;
  if (input === "") {
    noteBox.style.display = "block";
    notification.innerText = "Enter Email To Reset Password ";
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(input)
      .then(function () {
        // alert("Password reset email sent!");
        noteBox.style.display = "block";
        notification.innerText = "Password reset email sent! ";
      })
      .catch(function (error) {
        //alert("Error resetting password: " + error.message);
        noteBox.style.display = "block";
        notification.innerText = "Error resetting password! ";
      });
  }
}

function topPicks() {
  // Define all the database references you want to fetch products from
  const dbRefs = [db.ref("TopPicks/products")];

  // Fetch data from all references
  Promise.all(
    dbRefs.map((ref) =>
      ref.once("value").then((snapshot) => {
        let products = [];
        snapshot.forEach((childSnapshot) => {
          products.push(childSnapshot.val());
        });
        return products;
      })
    )
  )
    .then((results) => {
      // Combine all products into a single array
      let allProducts = results.flat();

      // Shuffle the combined array randomly
      allProducts = allProducts.sort(() => Math.random() - 0.5);

      // Limit to a maximum of 16 products
      let selectedProducts = allProducts.slice(0, 12);

      // Generate the HTML for the selected products
      let topPickListHTML = "";
      selectedProducts.forEach(function (topPick) {
        let images = [];

        // Collect all images from the product path
        for (let key in topPick) {
          if (key.startsWith("image")) {
            images.push(topPick[key]);
          }
        }

        // Assign a unique ID to each product card
        const uniqueId = topPick.identification;

        topPickListHTML += `
                    <div id="top-pick-${uniqueId}" class="top-prod">
                        <img class="top-img" src="${images[0]}" height="140px" width="110px"/>
                        <div class="top-picks-name">${topPick.name}</div>
                    </div>
                `;

        // Add an event listener to each product after rendering
        setTimeout(() => {
          const productElement = document.getElementById(
            `top-pick-${uniqueId}`
          );
          productElement.addEventListener("click", () => {
            openProductPage(
              images,
              topPick.name,
              topPick.sellingprice,
              topPick.costprice,
              topPick.identification,
              topPick.seller,
              topPick.productSize || "",
              topPick.color || "",
              topPick.additionalInfo || "",
              topPick.description || ""
            );
          });
        }, 0);
      });

      // Update the DOM with the generated HTML
      document.getElementById("topPickList").innerHTML = topPickListHTML;

      // Hide the loader after loading products
      let loaders = document.querySelectorAll(".top-picks-loader");
      loaders.forEach(function (loader) {
        loader.style.display = "none";
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}
topPicks();

function popular() {
  db.ref("Popular/products").on("value", function (snapshot) {
    const popularList = document.getElementById("popularList");
    popularList.innerHTML = ""; // Clear the list before adding new elements

    const products = [];

    snapshot.forEach(function (childSnapshot) {
      const images = [];
      const popular = childSnapshot.val();

      for (const key in popular) {
        if (key.startsWith("image")) {
          images.push(popular[key]);
        }
      }

      const offCp = popular.costprice;
      const offSp = popular.sellingprice;
      const discount = parseInt(((offCp - offSp) / offCp) * 100);

      const productDiv = document.createElement("div");
      productDiv.className = "popular-prod";

      productDiv.innerHTML = `
                <div class="product-info">
                    <img class="popular-img" src="${images[0]}" height="170px" width="170px"/>
                    <div class="popular-name">${popular.name}</div>
                    <div class="price-box">
                        <div class="popular-price">GHC ${popular.sellingprice}</div>
                        <div class="popular-cprice">GHC ${popular.costprice}</div>
                    </div>
                    <div class="top-picks-name">Seller: ${popular.seller}</div>
                    <div class="top-picks-id">ID: ${popular.identification}</div>
                </div>
                <button class="add-to-cart-btn" id="cart-btn-${popular.identification}">Add to Cart</button>
                <div class="off-tag">-${discount}%</div>
            `;

      // Add event listener for opening product page
      productDiv
        .querySelector(".product-info")
        .addEventListener("click", function () {
          openProductPage(
            images,
            popular.name,
            popular.sellingprice,
            popular.costprice,
            popular.identification,
            popular.seller,
            popular.productSize,
            popular.color,
            popular.additionalInfo,
            popular.description
          );
        });

      // Add event listener for adding to cart
      const cartButton = productDiv.querySelector(".add-to-cart-btn");
      cartButton.addEventListener("click", function () {
        addCart(
          images[0], // Use the first image
          popular.name,
          popular.sellingprice,
          popular.costprice,
          popular.seller,
          popular.identification,
          popular.productSize,
          popular.color,
          popular.additionalInfo,
          popular.description,
          1 // Assuming quantity to be 1
        );

        // Add the class with animation
        cartButton.classList.add("added-to-cart");
        cartButton.innerText = "Added";
        setTimeout(() => {
          cartButton.classList.remove("added-to-cart");
          cartButton.innerText = "Add to Cart";
        }, 2000); // Remove the class after 2 seconds (adjust as needed)
      });

      products.push(productDiv); // Store the product div
    });

    // Shuffle the products array
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    // Append shuffled products to the list
    products.forEach(function (productDiv) {
      popularList.appendChild(productDiv);
    });
  });
}
popular();

function brand() {
  db.ref("Brand").on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      document.querySelector(".topPick-loader").style.display = "none";
      let brand = childSnapshot.val();
      document.getElementById("brandList").innerHTML += `<div
             class="brand-prod">
            <img class="brand-img" src="${brand.image}" height="90px"
            width="100px"/>
            <div class="brand-name">${brand.name}</div>
            </div>`;
    });
  });
}
brand();

function poster() {
  db.ref("Advertisement").on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let flyer = childSnapshot.val();
      document.querySelector(
        ".adds"
      ).innerHTML += `<img class="giftcards"  src="${flyer.image}"/>`;
      autoScroll();
    });
  });
}
poster();

function newArrivals() {
  db.ref("New/products").on("value", function (snapshot) {
    const newList = document.querySelector(".new-products");
    newList.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      const images = [];
      let newProduct = childSnapshot.val();
      for (const key in newProduct) {
        if (key.startsWith("image")) {
          images.push(newProduct[key]);
        }
      }

      const newProd = document.createElement("div");
      newProd.className = "new-pd";
      newProd.innerHTML = `
                <div class="new-arrival-product">
                    <div class="new-click">
                        <img src="${newProduct.image1}" height="160px"
                        width="100%"/>
                        <div class="new-arrival-name">${newProduct.name}</div>
                        <div class="new-arrival-sp">Ghc${newProduct.sellingprice}</div>
                        <div class="new-arrival-cp">Ghc${newProduct.costprice}</div>
                        <div class="new-arrival-seller">Seller: ${newProduct.seller}</div>
                        <div class="new-arrival-id">ID: ${newProduct.identification}</div>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>`;

      newProd
        .querySelector(".new-click")
        .addEventListener("click", function () {
          openProductPage(
            images,
            newProduct.name,
            newProduct.sellingprice,
            newProduct.costprice,
            newProduct.identification,
            newProduct.seller,
            newProduct.productSize || "",
            newProduct.color || "",
            newProduct.additionalInfo || "",
            newProduct.description || ""
          );
        });

      const cartNbtn = newProd.querySelector(".add-to-cart-btn");
      cartNbtn.addEventListener("click", function () {
        addCart(
          images, // Use the array of images
          newProduct.name,
          newProduct.sellingprice,
          newProduct.costprice,
          newProduct.seller,
          newProduct.identification,
          newProduct.productSize || "",
          newProduct.color || "",
          newProduct.additionalInfo || "",
          newProduct.description || "",
          1 // Assuming quantity to be 1 for now
        );
        cartNbtn.classList.add("added-to-cart");
        cartNbtn.innerText = "Added";
        setTimeout(() => {
          cartNbtn.classList.remove("added-to-cart");
          cartNbtn.innerText = "Add to Cart";
        }, 2000);
      });
      newList.appendChild(newProd);
    });
  });
}
newArrivals();
// cart

function addCart(
  image,
  product,
  price,
  cp,
  seller,
  identification,
  productSize,
  color,
  additionalInfo,
  description,
  quantity
) {
  let user = firebase.auth().currentUser;
  if (!user) {
    console.error("User is not authenticated.");
    return;
  }

  const userId = user.uid;
  const cartRef = db.ref(`USER/CART/${userId}/${identification}`); // Use identification as the key
  const buttonId = `cart-btn-${identification}`;
  const button = document.getElementById(buttonId);

  cartRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Item already in cart, update quantity
        const currentData = snapshot.val();
        const newQuantity = (currentData.quantity || 0) + quantity;
        cartRef.update({ quantity: newQuantity });
      } else {
        // New item, set initial values
        cartRef.set({
          image1: image,
          product: product,
          price: parseFloat(price),
          costPrice: parseFloat(cp),
          seller: seller,
          id: identification,
          size: productSize,
          color: color,
          additionalInfo: additionalInfo,
          description: description,
          quantity: quantity,
        });
      }

      // Add CSS class to button
      if (button) {
        button.classList.add("added-to-cart");
      }
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
}
function like(
  image,
  product,
  price,
  costPrice,
  seller,
  identification,
  productSize,
  color,
  additionalInfo,
  description,
  quantity
) {
  const user = firebase.auth().currentUser;
  if (!user) {
    console.error("User is not authenticated.");
    return;
  }

  const userId = user.uid;
  const cartRef = db.ref(`USER/LIKE/${userId}/${product}`);
  const likeButton = document.getElementById("likeIt");

  cartRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        // If the product is already liked, remove it and toggle the class
        cartRef.remove().then(() => {
          console.log("Product removed from likes.");
          likeButton.classList.remove("liked"); // Remove CSS class when unliked
        });
      } else {
        // Add the product to the likes and toggle the class
        cartRef
          .set({
            image1: image,
            product: product,
            price: parseFloat(price),
            costPrice: parseFloat(costPrice),
            seller: seller,
            id: identification,
            size: productSize,
            color: color,
            additionalInfo: additionalInfo,
            description: description,
            quantity: quantity,
            status: "liked", // Use a string to represent the status
          })
          .then(() => {
            // alert("Product added to likes.");
            likeButton.classList.add("liked"); // Add CSS class when liked
          });
      }
    })
    .catch((error) => {
      noteBox.style.display = "block";
      notification.innerText = "Error updating likes:";
    });
}
function count() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/CART/${user}`).on("value", function (snapshot) {
    const cartCount = snapshot.numChildren();
    document.getElementById("count").innerText = cartCount;
  });
}
count();
// ADDRESS
function submitaddress() {
  let user = firebase.auth().currentUser.uid;
  const mail = firebase.auth().currentUser.email;
  let checkUser = 8283450;
  const userName = document.getElementById("adrName").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phone = document.getElementById("phone").value;
  const birthday = document.getElementById("birthday").value;
  const location = document.getElementById("location").value;
  const city = document.getElementById("city").value;
  if (
    (userName === "",
    gender === "",
    phone === "",
    birthday === "",
    location === "",
    city === "")
  ) {
    noteBox.style.display = "block";
    notification.innerText = "Invalid User Credentials";
  } else {
    db.ref(`USER/ADDRESS/${user}`).update({
      username: userName,
      contact: phone,
      birthday: birthday,
      gender: gender,
      email: mail,
      location: location,
      city: city,
      database: checkUser,
    });
    noteBox.style.display = "block";
    notification.innerText = "Address Book Created Successfully";
    document.querySelector(".adressbook-container").style.display = "none";
  }
  event.preventDefault();
}
function closeAddressInput() {
  document.querySelector(".adressbook-container").style.display = "none";
}
function getUserAddress() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/ADDRESS/${user}`).once("value", function (snapshot) {
    const imageBox = document.querySelector(".user-image-box");
    const addrVal = snapshot.val();
    let imageref = addrVal.userImage;
    document.querySelector(".address-container").innerHTML = `<div>
        <div>Name: ${addrVal?.username || "Empty"}</div>
        <div>Email: ${addrVal?.email || "Empty"}</div>
        <div>Contact: ${addrVal?.contact || "Empty"}</div>
        <div>Location: ${addrVal?.location || "Empty"}</div>
        <div>Gender: ${addrVal?.gender || "Empty"}</div>
        <div>Birthday: ${addrVal?.birthday || "Empty"}</div>
        <div>City: ${addrVal?.city || "Empty"}</div>
        </div>`;
    const image = document.createElement("img");
    image.src = imageref;
    image.classList = "user-img";
    imageBox.appendChild(image);
  });
}
//
//
function checkOut() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/ADDRESS/${user}`).on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let checkAddress = snapshot.val();
      if (checkAddress.database === 1599263) {
        document.querySelector(".adressbook-container").style.display = "flex";
      } else {
        document.querySelector(".make-order").style.display = "flex";
      }
    });
  });
}

function cart() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/CART/${user}`).on("value", (snapshot) => {
    const cartItems = document.getElementById("cartList");
    cartItems.innerHTML = "";

    if (!snapshot.hasChildren()) {
      cartItems.innerHTML = "<div class='empty-cart'>Cart is empty</div>";
      return;
    }

    snapshot.forEach((childSnapshot) => {
      const pro = childSnapshot.val();
      const li = document.createElement("div");
      const totalPrice = (pro.price * pro.quantity).toFixed(2);

      li.innerHTML = `<div class="cartItem-div">
                <img class="cart-img" src="${pro.image1}"/>
                <div class="cart-display">
                    <div class="cart-list-content">
                        <div class="cart-product-name">${pro.product}</div>
                        <div class="price-flux"> Price: Ghc <div id="price">${totalPrice}</div></div>
                        <div class="cart-quantity"> Quantity: <div class="minus"></div><text id="quant"
                        class="quantity">${pro.quantity}</text> <div
                        class="plus"></div></div>
                        <div class="cart-seller">${pro.seller}</div>
                    </div>
                </div>
            </div>`;

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-btn");
      removeButton.innerText = "Remove";
      removeButton.onclick = () => {
        db.ref(`USER/CART/${user}`).child(childSnapshot.key).remove();
        calculateSubtotal(); // Update subtotal after removal
      };

      // reduce button
      const redBtn = document.createElement("button");
      redBtn.classList.add("qtn");
      redBtn.innerText = "-";
      redBtn.onclick = () => {
        let newQuantity = pro.quantity - 1;
        if (newQuantity > 0) {
          db.ref(`USER/CART/${user}`)
            .child(childSnapshot.key)
            .update({ quantity: newQuantity })
            .then(() => {
              li.querySelector("#quant").innerText = newQuantity;
              li.querySelector("#price").innerText = (
                pro.price * newQuantity
              ).toFixed(2);
              calculateSubtotal(); // Update subtotal after quantity reduction
            });
        } else {
          db.ref(`USER/CART/${user}`)
            .child(childSnapshot.key)
            .remove()
            .then(() => {
              calculateSubtotal(); // Update subtotal after item removal
            });
        }
      };

      // increase button
      const incBtn = document.createElement("button");
      incBtn.classList.add("qtn");
      incBtn.innerText = "+";
      incBtn.onclick = () => {
        let newQuantity = pro.quantity + 1;
        db.ref(`USER/CART/${user}`)
          .child(childSnapshot.key)
          .update({ quantity: newQuantity })
          .then(() => {
            li.querySelector("#quant").innerText = newQuantity;
            li.querySelector("#price").innerText = (
              pro.price * newQuantity
            ).toFixed(2);
            calculateSubtotal(); // Update subtotal after quantity increment
          });
      };

      // Append buttons inside cart-list-content
      const cartListContent = li.querySelector(".cart-list-content");
      const minus = li.querySelector(".minus");
      const plus = li.querySelector(".plus");
      cartListContent.appendChild(removeButton);
      minus.appendChild(redBtn);
      plus.appendChild(incBtn);

      cartItems.appendChild(li);
      count();
      getProductData();
    });

    calculateSubtotal(); // Calculate subtotal when cart is first loaded
  });
}

// Function to calculate and display the subtotal
function calculateSubtotal() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/CART/${user}`).once("value", (snapshot) => {
    let subtotal = 0;

    snapshot.forEach((childSnapshot) => {
      const pro = childSnapshot.val();
      subtotal += pro.price * pro.quantity;
    });

    // Display the subtotal in the specified div
    document.getElementById(
      "subtotal"
    ).innerText = `Subtotal: Ghc ${subtotal.toFixed(2)}`;
    document.getElementById("itemPrice").innerText = `Ghc
        ${subtotal.toFixed(2)}`;
  });
}
cart();

function getProductData() {
  let user = firebase.auth().currentUser.uid;
  var database = firebase.database();
  var ref = database.ref(`USER/CART/${user}`);

  ref.on("value", function (snapshot) {
    var sellingPrices = [];

    snapshot.forEach(function (childSnapshot) {
      var sellingPrice = childSnapshot.val().price;
      sellingPrices.push(parseFloat(sellingPrice));
    });

    var sum = sellingPrices.reduce(function (a, b) {
      return a + b;
    }, 0);

    document.getElementById("subtotal").innerText = sum.toFixed(2);
    document.getElementById("itemPrice").innerText = "Ghc" + sum.toFixed(2);
  });
}

function order() {
  let user = firebase.auth().currentUser.uid;
  var cartRef = db.ref(`USER/CART/${user}`);
  const addressRef = db.ref(`USER/ADDRESS/${user}`);
  const checkPage = db.ref(`CHECKOUT/${user}`);
  const timestamp = Date.now(); // Get the current timestamp

  cartRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      // Add timestamp and status to the order data
      childData.timestamp = timestamp;
      childData.status = "active"; // Set status to "active"

      // Update the CHECKOUT database with cart data, status, and timestamp
      checkPage.child(childKey).update(childData);

      // Update with address information
      addressRef.once("value", function (snapshot) {
        var addressData = snapshot.val();

        // Add address details and timestamp to the order
        addressData.timestamp = timestamp;
        checkPage.child(childKey).update(addressData);
      });

      // Show notification and close the order page
      noteBox.style.display = "block";
      notification.innerText = "Order Made.";
      closeOrderPage();
    });
  });

  // Clear the user's cart after the order is placed
  db.ref(`USER/CART/${user}`).set("");
}
function closeOrderPage() {
  document.querySelector(".make-order").style.display = "none";
}

function closePPage() {
  const pPage = document.querySelector(".p-page");
  pPage.style.display = "none";
}

function openProductPage(
  images,
  product,
  sp,
  cp,
  id,
  seller,
  productSize,
  color,
  additionalInfo,
  description
) {
  const pPage = document.querySelector(".p-page");
  const descript = document.createElement("p");
  const descriptHead = document.createElement("h2");
  const addInfoHead = document.createElement("h4");
  const addInfo = document.createElement("p");
  const details = document.getElementById("details");
  details.innerHTML = "";
  descriptHead.innerHTML = "PRODUCT DESCRIPTION";
  addInfoHead.innerHTML = "ADDITIONAL INFORMATION";
  pPage.style.display = "flex";
  pPage.style.position = "fixed";
  pPage.scrollTop = 0;
  const pageP = document.getElementById("prodInf");

  const percentageOff = Math.round(((cp - sp) / cp) * 100);

  const imagesHTML = images
    .map(
      (img) => `
        <div class="image-item">
            <img class="product-page-image" src="${img}"/>
        </div>
    `
    )
    .join("");

  pageP.innerHTML = `
        <div class="product-page-card">
            <div class="images-container">
                ${imagesHTML}
            </div>
            <div class="product-page-name">${product}</div>
            <div class="price-card">
                <div class="product-page-sellingprice">Gh¢ ${sp}</div>
                <div class="product-page-costprice">Gh¢ ${cp}</div>
                <div class="product-page-off">${percentageOff}% off</div>
            </div>
            <div class="product-page-id">Product ID: ${id}</div>
            <div class="product-page-seller">Seller: ${seller}</div>
            <div class="product-page-size">Size: ${productSize}</div>
            <div class="product-page-cart-box">
                <button id="add-to-cart-btn" class="product-page-cart-btn">Add To Cart</button>
                <button id="like" class="product-page-call-btn"><svg id="likeIt" viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg" height="3.5em"
                width="3em"><path fill="currentColor" d="m21.95
                40.2-2.65-2.45Q13.1 32 8.55 26.775T4 15.85q0-4.5
                3.025-7.525Q10.05 5.3 14.5 5.3q2.55 0 5.05 1.225T24
                10.55q2.2-2.8 4.55-4.025Q30.9 5.3 33.5 5.3q4.45 0 7.475 3.025Q44
                11.35 44 15.85q0 5.7-4.55 10.925Q34.9 32 28.7 37.75l-2.65
                2.45q-.85.8-2.05.8-1.2 0-2.05-.8Z"/></svg></button>
            </div>
        </div>
    `;

  descript.innerHTML = `${description}`;
  addInfo.innerHTML = `${additionalInfo}`;
  details.appendChild(descriptHead);
  details.appendChild(descript);
  details.appendChild(addInfoHead);
  details.appendChild(addInfo);
  // checkLikedProducts();
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  addToCartBtn.addEventListener("click", () => {
    addCart(
      images,
      product,
      sp,
      cp,
      seller,
      id,
      productSize,
      color,
      additionalInfo,
      description,
      1 // Assuming quantity to be 1 for now
    );
    addToCartBtn.classList.add("added-to-cart2");
    addToCartBtn.innerText = "Added";
    setTimeout(() => {
      addToCartBtn.classList.remove("added-to-cart2");
      addToCartBtn.innerText = "Add to Cart";
    }, 2000);
  });
  document.getElementById("like").addEventListener("click", () => {
    like(
      images,
      product,
      sp,
      cp,
      seller,
      id,
      productSize,
      color,
      additionalInfo,
      description,
      1 // Assuming quantity to be 1 for now
    );
  });
}
function displayfeedPage() {
  const paths = [
    "Popular/products",
    "Category/grocery",
    "TopPicks/products",
    "New/products",
    "Category/computing",
    "Category/phones",
    "Category/men",
    "Category/women",
    "Category/children",
    "Category/machinary",
    "Category/electronics",
    "Category/fashion",
    "Category/sports",
    "Category/gaming",
    "Category/home&office",
    "Category/health&beauty",
    "Category/garden&outdoors",
    "Category/music",
    "Category/books&movies",
    "Category/automobile",
  ];
  let limit = 10;
  const promises = paths.map((path) =>
    db.ref(path).limitToFirst(limit).once("value")
  );

  Promise.all(promises).then((snapshots) => {
    let products = [];
    snapshots.forEach((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        products.push(childSnapshot.val());
      });
    });
    shuffleArray(products);
    displayFeedProducts(products);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayFeedProducts(products) {
  const productsDiv = document.getElementById("feedList");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "new-arrival-product";

    // Gather product images
    const images = [];
    let i = 1;
    while (product[`image${i}`]) {
      images.push(product[`image${i}`]);
      i++;
    }

    // Create HTML structure for each product
    productDiv.innerHTML = `
            <div class="product-content">
                <img class="feed-image" src="${product.image1}" height="160px" width="170px"/>
                <div class="new-arrival-name">${product.name}</div>
                <div class="new-arrival-sp">${product.sellingprice}</div>
                <div class="new-arrival-cp">${product.costprice}</div>
                <div class="new-arrival-seller">${product.seller}</div>
                <div class="new-arrival-id">${product.identification}</div>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

    // Event listener to open the product page
    const productContentDiv = productDiv.querySelector(".product-content");
    productContentDiv.addEventListener("click", () => {
      openProductPage(
        images,
        product.name,
        product.sellingprice,
        product.costprice,
        product.identification,
        product.seller,
        product.productSize || "",
        product.color || "",
        product.additionalInfo || "",
        product.description || ""
      );
    });

    // Event listener for the Add to Cart button
    const addToCartBtn = productDiv.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      addCart(
        product.image1,
        product.name,
        product.sellingprice,
        product.costprice,
        product.seller,
        product.identification,
        product.productSize || "",
        product.color || "",
        product.additionalInfo || "",
        product.description || "",
        1 // Assuming quantity to be 1
      );
      addToCartBtn.classList.add("added-to-cart");
      addToCartBtn.innerText = "Added";
      setTimeout(() => {
        addToCartBtn.classList.remove("added-to-cart");
        addToCartBtn.innerText = "Add to Cart";
      }, 2000);
    });

    productsDiv.appendChild(productDiv);
  });

  // Hide loader after products are loaded
  document.getElementById("loaderGrid").style.display = "none";
}

displayfeedPage();
// search

function openSearchPage() {
  const sbar = document.querySelector(".search-bar");
  const inputF = document.getElementById("search-product");
  sbar.classList.add("search-page");
  document.querySelector(".buttom-nav").innerText = "Search";
  inputF.classList.add("search-box");
  document.querySelector(".close-search-page").style.display = "block";
}

function closeSearchpage() {
  const sbar = document.querySelector(".search-bar");
  const inputF = document.getElementById("search-product");
  sbar.classList.remove("search-page");
  inputF.classList.remove("search-box");
  document.querySelector(".close-search-page").style.display = "none";
  document.getElementById("searchResults").style.display = "none";
  document.querySelector(".buttom-nav").innerHTML = ` <nav class="buttom-nav">
                        <span onclick="navBtn(0)" class="nav-btn nav-select"
                            ><svg
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                height="3em"
                                width="3em"
                            >
                                <path
                                    fill="currentColor"
                                    d="M11 42q-1.25 0-2.125-.875T8 39V19.5q0-.7.325-1.35.325-.65.875-1.05l13-9.75q.4-.3.85-.45.45-.15.95-.15.5 0 .95.15.45.15.85.45l13 9.75q.55.4.875 1.05.325.65.325 1.35V39q0 1.25-.875 2.125T37 42h-9V28h-8v14Z"
                                />
                            </svg>
                            Home</span
                        >
                        <span onclick="navBtn(1)" class="nav-btn">
                            <svg
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                height="3em"
                                width="3em"
                            >
                                <path
                                    fill="currentColor"
                                    d="M9 22.5q-1.25 0-2.125-.875T6 19.5V9q0-1.25.875-2.125T9 6h10.5q1.25 0 2.125.875T22.5 9v10.5q0 1.25-.875 2.125T19.5 22.5ZM9 42q-1.25 0-2.125-.875T6 39V28.5q0-1.25.875-2.125T9 25.5h10.5q1.25 0 2.125.875T22.5 28.5V39q0 1.25-.875 2.125T19.5 42Zm19.5-19.5q-1.25 0-2.125-.875T25.5 19.5V9q0-1.25.875-2.125T28.5 6H39q1.25 0 2.125.875T42 9v10.5q0 1.25-.875 2.125T39 22.5Zm0 19.5q-1.25 0-2.125-.875T25.5 39V28.5q0-1.25.875-2.125T28.5 25.5H39q1.25 0 2.125.875T42 28.5V39q0 1.25-.875 2.125T39 42Z"
                                />
                            </svg>
                            Category</span
                        >
                        <span onclick="navBtn(2)" class="nav-btn">
                            <svg
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                height="3em"
                                width="3em"
                            >
                                <path
                                    fill="currentColor"
                                    d="M13.05 36q-1.2 0-2.125-.9T10 33V15.95q0-.65.425-1.075.425-.425 1.075-.425.65 0 1.075.425Q13 15.3 13 15.95V33h21.15q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q34.8 36 34.15 36ZM19 30q-1.2 0-2.1-.9-.9-.9-.9-2.1V9q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v18q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22V12.1H19V27ZM7 42q-1.2 0-2.1-.9Q4 40.2 4 39V21.95q0-.65.425-1.075.425-.425 1.075-.425.65 0 1.075.425Q7 21.3 7 21.95V39h21.1q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q28.75 42 28.1 42Z"
                                /></svg
                            >Feed</span
                        >
                        <span onclick="navBtn(3)" class="nav-btn">
                            <svg
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                height="3em"
                                width="3em"
                            >
                                <path
                                    fill="currentColor"
                                    d="M11.1 35.25q3.15-2 6.225-3.025Q20.4 31.2 24 31.2q3.6 0 6.7 1.025t6.25 3.025q2.2-2.7 3.125-5.45Q41 27.05 41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 3.05.95 5.8t3.15 5.45ZM24 25.5q-2.9 0-4.875-1.975T17.15 18.65q0-2.9 1.975-4.875T24 11.8q2.9 0 4.875 1.975t1.975 4.875q0 2.9-1.975 4.875T24 25.5ZM24 44q-4.2 0-7.85-1.575-3.65-1.575-6.35-4.3Q7.1 35.4 5.55 31.75 4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z"
                                />
                            </svg>
                            Account</span
                        >
                        <span onclick="navBtn(4)" class="nav-btn">
                            <svg
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                height="3em"
                                width="3em"
                            >
                                <path
                                    fill="currentColor"
                                    d="M24.2 35.65q.8 0 1.35-.55t.55-1.35q0-.8-.55-1.35t-1.35-.55q-.8 0-1.35.55t-.55 1.35q0 .8.55 1.35t1.35.55ZM24.15 15q1.7 0 2.75.925t1.05 2.375q0 1-.6 1.975-.6.975-1.95 2.125-1.3 1.15-2.075 2.425-.775 1.275-.775 2.325 0 .55.425.875.425.325.975.325.6 0 1-.4t.5-1q.15-1 .675-1.775.525-.775 1.625-1.675 1.5-1.25 2.175-2.5.675-1.25.675-2.8 0-2.65-1.725-4.25t-4.575-1.6q-1.9 0-3.5.75t-2.65 2.2q-.4.55-.325 1.125.075.575.475.875.55.4 1.175.25.625-.15 1.025-.7.65-.9 1.575-1.375Q23 15 24.15 15ZM24 44q-4.2 0-7.85-1.525Q12.5 40.95 9.8 38.25q-2.7-2.7-4.25-6.35Q4 28.25 4 24q0-4.2 1.55-7.85Q7.1 12.5 9.8 9.8q2.7-2.7 6.35-4.25Q19.8 4 24 4q4.15 0 7.8 1.55 3.65 1.55 6.35 4.25 2.7 2.7 4.275 6.35Q44 19.8 44 24q0 4.25-1.575 7.9-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.225Q28.15 44 24 44Z"
                                /></svg
                            >Help</span
                        >
                    </nav>`;
  document.getElementById("activehome").style.color = "darkorange";
}

function searchProducts() {
  const searchInput = document
    .getElementById("search-product")
    .value.toLowerCase();
  if (searchInput === "") {
    return; // Do nothing if the search input is empty
  }

  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  const databasePaths = [
    "Popular/products",
    "Category/grocery",
    "New/products",
    "TopPicks/products",
  ];

  databasePaths.forEach((path) => {
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const images = [];
          const product = childSnapshot.val();
          const productName = product.name.toLowerCase();
          for (const key in product) {
            if (key.startsWith("image")) {
              images.push(product[key]);
            }
          }
          if (productName.includes(searchInput)) {
            const li = document.createElement("div");
            const imagesArray = JSON.stringify(images);
            li.innerHTML = `<div class="search-product-div">
                            <div class="search-click">
                                <img class="search-image"
                                src="${product.image1}" height="160px"
                                width="100%"/>
                                <div class="new-arrival-name">${product.name}</div>
                                <div class="new-arrival-sp">${product.sellingprice}</div>
                                <div class="new-arrival-cp">${product.costprice}</div>
                                <div class="new-arrival-seller">${product.seller}</div>
                                <div class="new-arrival-id">${product.identification}</div>
                            </div>
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>`;

            li.querySelector(".search-click").addEventListener(
              "click",
              function () {
                openProductPage(
                  images,
                  product.name,
                  product.sellingprice,
                  product.costprice,
                  product.identification,
                  product.seller,
                  product.productSize || "",
                  product.color || "",
                  product.additionalInfo || "",
                  product.description || ""
                );
              }
            );

            const cartBtn = li.querySelector(".add-to-cart-btn");
            cartBtn.addEventListener("click", function () {
              addCart(
                images, // Use the array of images
                product.name,
                product.sellingprice,
                product.costprice,
                product.seller,
                product.identification,
                product.productSize || "",
                product.color || "",
                product.additionalInfo || "",
                product.description || "",
                1 // Assuming quantity to be 1 for now
              );
              cartBtn.classList.add("added-to-cart");
              cartBtn.innerText = "Added";
              setTimeout(() => {
                cartBtn.classList.remove("added-to-cart");
                cartBtn.innerText = "Add to Cart";
              }, 2000);
            });

            searchResults.appendChild(li);
          }
        });
      });
  });
}
function openResultPage() {
  document.getElementById("searchResults").style.display = "grid";
}
// search end
// category data

function catGros(path, card) {
  db.ref(path).on("value", function (snapshot) {
    const cardElement = document.getElementById(card);
    cardElement.innerHTML = ""; // Clear previous contents

    snapshot.forEach(function (childSnapshot) {
      const groceries = childSnapshot.val();
      const images = [];
      let i = 1;
      while (groceries[`image${i}`]) {
        images.push(groceries[`image${i}`]);
        i++;
      }

      // Escape HTML characters for security
      function escapeHtml(text) {
        const map = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        };
        return text.replace(/[&<>"']/g, function (m) {
          return map[m];
        });
      }

      const name = escapeHtml(groceries.name);
      const sellingPrice = escapeHtml(groceries.sellingprice);
      const costPrice = escapeHtml(groceries.costprice);
      const identification = escapeHtml(groceries.identification);
      const seller = escapeHtml(groceries.seller);
      const productSize = groceries.productSize
        ? escapeHtml(groceries.productSize)
        : "";
      const color = groceries.color ? escapeHtml(groceries.color) : "";
      const additionalInfo = groceries.additionalInfo
        ? escapeHtml(groceries.additionalInfo)
        : "";
      const description = groceries.description
        ? escapeHtml(groceries.description)
        : "";

      // Create elements and attach event listener
      const categoryProdDiv = document.createElement("div");
      categoryProdDiv.className = "category-prods";

      const productDiv = document.createElement("div");
      productDiv.addEventListener("click", () => {
        openProductPage(
          images,
          name,
          sellingPrice,
          costPrice,
          identification,
          seller,
          productSize,
          color,
          additionalInfo,
          description
        );
      });

      const img = document.createElement("img");
      img.className = "category-item-image";
      img.src = groceries.image1;
      productDiv.appendChild(img);

      const nameDiv = document.createElement("div");
      nameDiv.className = "category-item-name";
      nameDiv.textContent = name;
      productDiv.appendChild(nameDiv);

      categoryProdDiv.appendChild(productDiv);
      cardElement.appendChild(categoryProdDiv);
    });
  });
}

// saved items
function savedItems() {
  let user = firebase.auth().currentUser.uid;
  const box = document.querySelector(".acc-page-content");
  const inbox = document.querySelector(".acc-page");
  inbox.classList.add("show-acc");
  box.innerHTML = "";

  db.ref(`USER/LIKE/${user}`).once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let liked = childSnapshot.val();
      const likedItem = document.createElement("div");
      likedItem.classList = "liked-item";
      likedItem.innerHTML = `
                <div class="savedItems">
                    <img
                        src="${liked.image1}"
                        class="liked-image">
                    <div class="liked-info-box">
                        <div class="liked-name">${liked.product}</div>
                        <div class="liked-price">Price: Ghc${liked.price}</div>
                        <div class="liked-id">ID: ${liked.id}</div>
                        <div class="liked-seller">Seller: ${liked.seller}</div>
                        <button class="liked-details">Details</button>
                       
                        <svg class="liked-delete" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="2.0em" width="2.0em"><path fill="currentColor" d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H9.5q-.65 0-1.075-.425Q8 9.65 8 9q0-.65.425-1.075Q8.85 7.5 9.5 7.5h7.9q0-.65.425-1.075Q18.25 6 18.9 6h10.2q.65 0 1.075.425.425.425.425 1.075h7.9q.65 0 1.075.425Q40 8.35 40 9q0 .65-.425 1.075-.425.425-1.075.425h-.55V39q0 1.2-.9 2.1-.9.9-2.1.9Zm5.3-8.8q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm8.3 0q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Z"/></svg>
                    </div>
                </div>`;

      box.appendChild(likedItem);

      // Get the details button and add the event listener to open product page
      likedItem
        .querySelector(".liked-details")
        .addEventListener("click", () => {
          openProductPage(
            liked.image1, // Assuming "images" is an array or a field in the liked object
            liked.product, // Product name
            liked.price, // Selling price
            liked.costPrice, // Cost price (if available)
            liked.id, // Product ID
            liked.seller, // Seller name
            liked.size, // Product size (if available)
            liked.color, // Product color (if available)
            liked.additionalInfo, // Additional info (if available)
            liked.description // Description
          );
        });
      likedItem.querySelector(".liked-delete").addEventListener("click", () => {
        // Get the unique product ID to reference it in the database
        const productId = liked.product;

        // Remove the product from the database
        db.ref(`USER/LIKE/${user}/${productId}`)
          .remove()
          .then(() => {
            // Remove the item from the DOM
            likedItem.remove();
            console.log("Product removed from liked items.");
          })
          .catch((error) => {
            console.error("Error removing product:", error);
          });
      });
      // end
    });
  });
}

function runOrder() {
  let user = firebase.auth().currentUser.uid;
  const box = document.querySelector(".acc-page-content");
  const inbox = document.querySelector(".acc-page");
  inbox.classList.add("show-acc");
  box.innerHTML = "";

  db.ref(`CHECKOUT/${user}`).once("value", function (snapshot) {
    let ordersArray = [];

    snapshot.forEach(function (childSnapshot) {
      let orderData = childSnapshot.val();
      orderData.orderKey = childSnapshot.key; // Save the key for reference
      ordersArray.push(orderData); // Add each order to an array
    });

    // Check if no orders exist
    if (ordersArray.length === 0) {
      box.innerHTML = `<p>No orders yet.</p>`;
      return;
    }

    // Sort the orders by timestamp (assuming each order has a timestamp field)
    ordersArray.sort((a, b) => b.timestamp - a.timestamp); // Newest orders first

    // Loop through the sorted orders and display them
    ordersArray.forEach(function (orders) {
      const item = document.createElement("div");
      const isCanceled = orders.status === "canceled"; // Check if the status is "canceled"
      var totalPrice = orders.price * orders.quantity;
      item.innerHTML = `<div class="order-page-prod">
                <img class="order-page-image" src="${orders.image1}">
                <div class="order-page-prod-list">
                    <div class="order-page-name">${orders.product}</div>
                    <div class="order-page-price">Price:  Ghc${totalPrice}</div>
                    <div class="order-page-quantity">Quantity: ${
                      orders.quantity
                    }</div>
                    <div class="order-page-id">ID: ${orders.id}</div>
                    <div class="order-page-description">Details: ${
                      orders.description
                    }</div>
                    <button class="cancel-order" data-product-id="${
                      orders.id
                    }" ${isCanceled ? "disabled" : ""}>
                        ${isCanceled ? "Order Canceled" : "Cancel Order"}
                    </button>
                </div>
            </div>`;

      box.append(item);
    });

    // Attach event listeners to cancel order buttons after DOM update
    const cancelButtons = document.querySelectorAll(
      ".cancel-order:not([disabled])"
    ); // Only attach to non-disabled buttons
    cancelButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id"); // Get product ID from button data attribute

        // Check each product under the user's CHECKOUT path
        db.ref(`CHECKOUT/${user}`).once("value", function (checkoutSnapshot) {
          let productFound = false;

          checkoutSnapshot.forEach(function (childSnapshot) {
            let orderData = childSnapshot.val();

            if (orderData.id === productId) {
              productFound = true;

              // Update the status to "canceled"
              db.ref(`CHECKOUT/${user}/${childSnapshot.key}`)
                .update({
                  status: "canceled",
                })
                .then(() => {
                  e.target.disabled = true; // Disable the button
                  e.target.textContent = "Order Canceled"; // Update button text
                  noteBox.style.display = "block";
                  notification.innerText = "Order has been canceled.";
                })
                .catch((error) => {
                  console.error("Error updating product status: ", error);
                });

              // Exit the loop early once the product is found and updated
              return true;
            }
          });

          if (!productFound) {
            alert("Product not found in the checkout list.");
          }
        });
      });
    });
  });
}

// Changeuser name
function changeAccName() {
  let user = firebase.auth().currentUser.uid;
  db.ref(`USER/ADDRESS/${user}`).once("value", function (snapshot) {
    let name = snapshot.val();
    document.getElementById("changeUsername").value = name.account;
    document.getElementById("userID").innerText = name.account;
  });
}
function saveName() {
  let user = firebase.auth().currentUser.uid;
  const changedName = document.getElementById("changeUsername").value;

  db.ref(`USER/ADDRESS/${user}`)
    .update({
      account: changedName,
    })
    .then(() => {
      noteBox.style.display = "block";
      notification.innerText = "Name Update Successful";
      changeAccName();
    })
    .catch((error) => {
      noteBox.style.display = "block";
      (notification.innerText = "Error updating username: "), error;
    });
}

// get profile pic
function addUserProfile() {
  let user = firebase.auth().currentUser.uid;

  if (!user) {
    console.error("No user is logged in.");
    return;
  }

  // Reference to user profile image input
  const fileInput = document.getElementById("userProfileImage");

  fileInput.addEventListener("change", function () {
    const userImage = this.files[0];

    if (userImage) {
      // Generate a unique file name using the user's UID
      const storageRef = firebase
        .storage()
        .ref(`userProfiles/${user}/${userImage.name}`);
      noteBox.style.display = "block";
      notification.innerText = "Storage read";

      // Start the upload
      const uploadTask = storageRef.put(userImage);
      noteBox.style.display = "block";
      notification.innerText = "Uploading";

      // Monitor upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          noteBox.style.display = "block";
          notification.innerText = "Upload is " + progress + "% done";
        },
        (error) => {
          noteBox.style.display = "block";
          notification.innerText = "Error during upload";
        },
        () => {
          // Get the download URL once upload is complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //
            // Update the user's profile image in Firebase Realtime Database
            firebase
              .database()
              .ref(`USER/ADDRESS/${user}`)
              .update({
                userImage: downloadURL,
              })
              .then(() => {
                noteBox.style.display = "block";
                notification.innerText =
                  "User profile image updated successfully.";

                // Update the image in the DOM
                db.ref(`USER/ADDRESS/${user}`).once(
                  "value",
                  function (snapshot) {
                    const imageBox = document.querySelector(".user-image-box");
                    const addrVal = snapshot.val();
                    let imageref = addrVal.userImage;
                    const image = document.createElement("img");
                    image.src = imageref;
                    image.classList = "user-img";
                    imageBox.innerHTML = "";
                    imageBox.appendChild(image);
                  }
                );
              });
          });
        }
      );
    }
  });
}
