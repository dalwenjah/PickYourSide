"use strict";

//Selections
const appContainer = document.querySelector(".inside-app-container");
const signInModal = document.querySelector(".sign-in-modal");
const signInBtn = document.querySelectorAll(".sign-in-btn");
const overlay = document.querySelector(".overlay");
const createVersusModal = document.querySelector(".add-versus-modal");
const signInAction = document.querySelector(".btn-sign-in");
const btnCloseSignIn = document.querySelector(".modal-sign-in-close");
const btnBoxCreate = document.querySelector(".add-pick-boxing");
const btnCreatorModalClose = document.querySelector(".modal-add-versus-close");
const signOutBtn = document.querySelector(".sign-out-btn");
const signInInput = document.querySelector(".sign-in-input");
const welcomeLabel = document.querySelector(".username-shown");
const sideFirstInput = document.querySelector(".input-versus1");
const sideSecondInput = document.querySelector(".input-versus2");
const errorMessageForSignInModal = document.querySelector(".error-message");
const signInOut = document
  .querySelector(".btn-header-swappers")
  .querySelector(".sign-in-btn");
const afterLogin = document.querySelector(".after-login-container");
const beforeLogin = document.querySelector(".before-login-container");
const versusCreateAction = document.querySelector(".versus-create-btn");
const errorMessageBox = document.querySelector(".error-message-box");
//
//
//
const box1 = {
  boxId: "box1",
  pickFirst: "Charlotte De Witte",
  pickSecond: "Deborah De Luca",
  answers: [0, 0],
  voteGivers: [],
};

const box2 = {
  boxId: "box2",
  pickFirst: "Ferrari",
  pickSecond: "Lamborghini",
  answers: [0, 0],
  voteGivers: [],
};
// DEFAULT ACCOUNTS - TESTING
const allBoxes = [box1, box2];
const acc1 = {
  userId: "dalwenjah",
  accountid: 1000,
};
//FAKE ACCOUNT
let currentAccount;
// COUNTER FOR ACCOUNT ID
let accountNumCreator = 3;
// COUNTER FOR BOX ID
let boxNumCreator = 3;
// ARRAY OF ACCOUNTS
const allAccounts = [acc1];
//
//
//
//
//
//
//
//Display boxes functionalty
const boxesDisplay = function (pickingsArray) {
  appContainer.innerHTML = "";
  pickingsArray.forEach((curr) => {
    const html = `
    <div class="topic-box">
    <div class="versus-container">
      <span class="result-left result">${curr.answers[0]}</span>
      <span class="result-dash">-</span>
      <span class="result-right result">${curr.answers[1]}</span>
    </div>
    <div class="btn-app-container">
      <button class="btn-left btn-app-sides" vote="0" boxnumber="${curr.boxId}">
      ${curr.pickFirst}
      </button>
      <div class="versus">vs</div>
      <button class="btn-right btn-app-sides" vote="1" boxnumber="${curr.boxId}">
      ${curr.pickSecond}
      </button>
    </div>

    <div class="icon-align">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="back-icon opac-zero"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </div>
  </div>
    `;
    appContainer.insertAdjacentHTML("beforeend", html);
  });
};
boxesDisplay(allBoxes);

//FAKE CURRENT ACCOUNT

//
//
//
//
//
//
// BOTH MODALS OPEN AND CLOSE FUNCIONALITIES
//
const closeModal = function (element) {
  element.classList.add("opac-zero-modals");
  overlay.classList.add("opac-zero-modals");
};

const openModal = function (element) {
  element.classList.remove("opac-zero-modals");
  overlay.classList.remove("opac-zero-modals");
};

// SIGN IN MODAL OPEN
signInBtn.forEach((curr) =>
  curr.addEventListener("click", function (e) {
    openModal(signInModal);
  })
);
//
// CLOSING SIGN IN
btnCloseSignIn.addEventListener("click", function (e) {
  closeModal(signInModal);
  signInInput.value = "";
});
overlay.addEventListener("click", function (e) {
  if (!signInModal.classList.contains("opac-zero-modals")) {
    closeModal(signInModal);
    signInInput.value = "";
  }
  if (!createVersusModal.classList.contains("opac-zero-modals")) {
    closeModal(createVersusModal);
    sideSecondInput.value = sideFirstInput.value = "";
  }
});
//
//
// CREATE BUTTON OPEN MODAL
btnBoxCreate.addEventListener("click", function (e) {
  openModal(createVersusModal);
});
//
// CREATOR MODAL BUTTON CLOSING
btnCreatorModalClose.addEventListener("click", function (e) {
  closeModal(createVersusModal);
  sideSecondInput.value = sideFirstInput.value = "";
});
//
//
//
//
//
//
//
//
//SIGN IN BUTTON ACTION(GET IN)
// UNACCEPTED SPECIAL CHARACTERS FOR CREATING USERNAME
const characterChecker = function (val) {
  const unAcceptedcharacters = [
    " ",
    "-",
    "*",
    "/",
    ",",
    ".",
    ":",
    "&",
    "%",
    "^",
    "!",
    "?",
    "_",
    "+",
    "=",
    "<",
    ">",
  ];
  return val
    .split("")
    .reduce(
      (acc, curr) => (unAcceptedcharacters.includes(curr) ? ++acc : acc),
      0
    );
};

const modalAndBtn = function () {
  signInOut.classList.add("display-none");
  signOutBtn.classList.remove("display-none");
  beforeLogin.classList.add("display-none");
  afterLogin.classList.remove("display-none");
  welcomeLabel.textContent = `Have fun, ${currentAccount.userId}`;
};
// BUTTON
signInAction.addEventListener("click", function (e) {
  //ACCOUNT AND SPECIAL CHARACTER CONTROL
  const username = signInInput.value;
  const chechingUsernameIsExist = allAccounts.find(
    (curr) => curr.userId === username
  );
  //Checking special characters
  const checkingSpecialChar = characterChecker(username);

  //IF THERE IS ACCOUNT EXİST THEN LOGIN TO IT
  if (chechingUsernameIsExist) {
    currentAccount = chechingUsernameIsExist;
    closeModal(signInModal);
    signInInput.value = "";
    modalAndBtn();
    !errorMessageForSignInModal.classList.contains("opac-zero") &&
      errorMessageForSignInModal.classList.add("opac-zero");
  }
  // IF DOESNT EXIST, CREATE ACC AND LOGIN
  if (!chechingUsernameIsExist && username.length >= 4) {
    //CHECKING FOR SPECIAL CHARACTERS
    if (checkingSpecialChar !== 0) {
      errorMessageForSignInModal.classList.remove("opac-zero");
    }
    // OPEN ACC AND PUSHING THE NEW ACC TO ALL ACCOUNTS OBJECT THEN LOGIN IF INPUT VALUE IS OKAY
    if (checkingSpecialChar === 0) {
      allAccounts.push({
        userId: username,
        accountid: accountNumCreator,
      });
      accountNumCreator++;
      closeModal(signInModal);
      signInInput.value = "";
      !errorMessageForSignInModal.classList.contains("opac-zero") &&
        errorMessageForSignInModal.classList.add("opac-zero");
      currentAccount = allAccounts.find((curr) => curr.userId === username);
      modalAndBtn();
    }
  }
  //Have fun label
});
//
//
//
// SIGN OUT BUTTON
signOutBtn.addEventListener("click", function (e) {
  signInOut.classList.remove("display-none");
  signOutBtn.classList.add("display-none");
  welcomeLabel.textContent = "Welcome to PickYourSide";
  beforeLogin.classList.remove("display-none");
  afterLogin.classList.add("display-none");
});

//
//
//
//
//
//
//
const checkFckingNunbers = function (val) {
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return val
    .split("")
    .reduce((acc, curr) => (nums.includes(curr) ? ++acc : acc), 0);
};

// IMPLEMENTING BOX CREATION BUTTON
versusCreateAction.addEventListener("click", function (e) {
  const valFirst = sideFirstInput.value;
  const valSecond = sideSecondInput.value;
  const checkIsNumFirst = checkFckingNunbers(valFirst);
  const checkIsNumSecond = checkFckingNunbers(valSecond);
  const checkSpeacialFirst = characterChecker(valFirst);
  const checkSpeacialSecond = characterChecker(valSecond);
  if (
    checkIsNumFirst === 0 &&
    checkIsNumSecond === 0 &&
    checkSpeacialFirst === 0 &&
    checkSpeacialSecond === 0 &&
    valFirst.length >= 4 &&
    valSecond.length >= 4 &&
    valFirst !== valSecond
  ) {
    allBoxes.push({
      boxId: `box${boxNumCreator}`,
      pickFirst: valFirst,
      pickSecond: valSecond,
      answers: [0, 0],
      voteGivers: [],
    });
    boxNumCreator++;
    boxesDisplay(allBoxes);
    closeModal(createVersusModal);
    !errorMessageBox.classList.contains("opac-zero") &&
      errorMessageBox.classList.add("opac-zero");
    sideSecondInput.value = sideFirstInput.value = "";
  } else errorMessageBox.classList.remove("opac-zero");
  //
});
//
//
//
//
//
//
//
//
// EVENT DELEGATION - GETTING RELATED OBJECT(TOPIC) AND IMPLEMENTING INCREASE, ETC

appContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-app-sides")) {
    const chosedSide = e.target.getAttribute("vote");
    const relatedObject = e.target.getAttribute("boxnumber");
    const clickedObj = allBoxes.find((curr) => curr.boxId === relatedObject);

    //Picking && Single voting Functionality
    if (!clickedObj.voteGivers.includes(currentAccount.accountid)) {
      clickedObj.answers[chosedSide]++;
      clickedObj.voteGivers.push(currentAccount.accountid);
    }
    boxesDisplay(allBoxes);

    //
  }
});
//
//
//
//
//
//
//
//
