////// Initialize Firebase
var config = {
    apiKey: "AIzaSyDm5Drp5c0bg7Zj17ynbaF5oTVIkQIh3GM",
    authDomain: "todo-51100.firebaseapp.com",
    databaseURL: "https://todo-51100.firebaseio.com",
    projectId: "todo-51100",
    storageBucket: "todo-51100.appspot.com",
    messagingSenderId: "504120046917",
    appId: "1:504120046917:web:929c560e5d58d4bfa2ba2c"
};
firebase.initializeApp(config);
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const login = document.getElementById("login_button");
const body = document.getElementById("body_id");
const image_url = document.getElementById("image");
const user_name = document.getElementById("name");
const img = document.getElementById("image_empty");

login.style.display = "none";
// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


let provider = new firebase.auth.GoogleAuthProvider();
let user_id;
let photo_url;
let username;

login.addEventListener("click", function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {

        let user = result.user;
        user_id = user.uid;
        photo_url = user.photoURL;
        image_url.src = photo_url;
        str = user.displayName;
        username = str.split(" ");
        user_name.innerHTML = username[0] + 's' + ' Todo';

        console.log(user_id);

        login.style.display = "none";
        getTodoList(user_id);

    }).catch(function (error) {
        console.log(error);
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        login.style.display = "none";

        user_id = user.uid;
        photo_url = user.photoURL;
        image_url.src = photo_url;
        str = user.displayName;
        username = str.split(" ");
        user_name.innerHTML = username[0] + '`s' + ' Todo';

        console.log(user_id);

        getTodoList(user_id);
    } else {
        img.style.display = "none";
        login.style.display = "block";
    }
});

function getTodoList(user_id) {
    let reference = firebase.database().ref(user_id).orderByChild('timestamp');

    reference.once("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val() != null) {
            snapshot.forEach(function (todos) {
                let todo = todos.val().todo;
                let date = todos.val().timestamp;
                let isCompleted = todos.val().isCompleted;
                let done = false;
                if (isCompleted == 0) {
                    done = false;
                } else {
                    done = true;
                }
                img.style.display = "none";
                addToDo(todo, date, done);
            });
        } else {
            img.style.display = "block";
        }

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}
// Show todays date
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, date, done) {

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete"></i>
                    <p class="text ${LINE}">${toDo}<br>${date}</p>
                  </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


clear.addEventListener("click", function () {
    location.reload();
});