// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getStorage,
  ref,uploadBytesResumable, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBc1UyVrN5DqIDIQUFFPp3PjQohgpbi17Y",

  authDomain: "makeitaflag.firebaseapp.com",

  projectId: "makeitaflag",

  storageBucket: "makeitaflag.appspot.com",

  messagingSenderId: "628800317425",

  appId: "1:628800317425:web:12a38e850b98bd16618650",

  measurementId: "G-7W7MXBY3XY",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const fb_storage = getStorage(app);
console.log(fb_storage);

var fileName = "./assets/images/Flag.png";

function uploadImage() {
  //const ref = firebase.storage().ref();
  const file = document.querySelector("#fileElem").files[0];
  const name = +new Date() + "-" + file.name;
  const storageRef = ref(fb_storage, name);
  console.log(name);
  const metadata = {
    contentType: file.type,
  };
  //     const task = storageRef.child(name).put(file, metadata);task
  //     .then(snapshot => snapshot.ref.getDownloadURL())
  //     .then(url => {
  //     console.log(url);
  //     alert('image uploaded successfully');
  //     document.querySelector("#image").src = url;
  //  })
  //  .catch(console.error);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
}

let button = document.getElementById("flagifyBtn");
button.addEventListener("click", uploadImage);

export function sayHello() {
  alert("Hello");
}
