// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, setDoc, doc, arrayUnion, updateDoc, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHeDzm8w0z6eDdvoVvipSRsfd8sK6yI54",
    authDomain: "dpg-design-portal.firebaseapp.com",
    projectId: "dpg-design-portal",
    storageBucket: "dpg-design-portal.appspot.com",
    messagingSenderId: "900767928333",
    appId: "1:900767928333:web:a24c7b6e0c6333743ec544"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init Database
const db = getFirestore();


const urlParams = location.search;
const orderRefId = urlParams.match(/(?![?refId=])\w+/g)[0];

function updatePage() {
    getDoc(doc(db, "design-jobs", orderRefId))
        .then((doc) => setOrderData(doc.data()))
        .catch((error) => console.error(error))
}

function addUrlDownloadLinks(files) {
    let downloadLink = "";
    try {
        files.forEach(url => {
            downloadLink += `<a href="${url}" download>Download File</a><br>`
        });
    } catch (error) {
        console.error(error);
    }
    return downloadLink;
}

function addPdfFrames(files) {
    let pdfFrame = "";
    try {
        files.forEach(url => {
            pdfFrame += `<iframe src="${url}" type="pdf" width="100%" height="100%"></iframe>`
        });
    } catch (error) {
        console.error(error);
    }
    return pdfFrame;
}

function setOrderData(orderObject) {
    const orderInfo = `<div class="col">
         <h1>Order Number: ${orderObject.orderNumber}</h1>
         <p><b>Status: </b>${orderObject.status}</p>
         <br>
         <p><b>CSR Name: </b>${orderObject.csrName}</p>
         <p><b>Customer Contact: </b>${orderObject.customerContact}</p>
         <p><b>Job Title: </b>${orderObject.jobTitle}</p>
         <p><b>EPMS Number: </b>${orderObject.epmsNumber}</p>
         <p><b>Pickup Job: </b>${orderObject.pickupJob}</p>
         <p><b>Due Date: </b>${orderObject.dueDate}</p>
         <p><b>Client Budget: </b>${orderObject.clientBudget}</p>
         <p><b>Description: </b>${orderObject.description}</p>
         <p><b>Requires Estimate?: </b>${orderObject.requiresEstimate}</p>
         <p><b>Is a Rush?: </b> ${orderObject.rush}</p>
         <p><b>Attached Files:</b><br>${addUrlDownloadLinks(orderObject.files)}</p>
     </div>
     <div class="col">
         ${addPdfFrames(orderObject.files)}
     </div>
     `
    document.getElementById("order-info").innerHTML = orderInfo;
}

function updateItem() {
    let refId = orderRefId;
    let refIdDoc = doc(db, 'design-jobs', refId);
    const updateCommand = document.getElementById("updateCommand").value
    setDoc(refIdDoc, { status: updateCommand }, { merge: true })
        .then(() => {
            //logUpdate(refId, updateCommand);
            updatePage();
        })
}

document.getElementById("main-update").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("EVERYTHING!!!");
    updateItem();
})

updatePage();