var filename;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log("Message received in background.js:", request.action);
    if (request.action === "AddHeading") {
        console.log("actually it telling to add the heading ")
        if(!filename){
            console.log("filenamenot added")
            chrome.runtime.sendMessage({ action: "fileNameNotAdded" });
            return;
        }
        addNoteToDatabaseHeading(filename, request.selectedText);
    }
    else if (request.action === "AddBulletPoint") {
        console.log("actually it telling to add the bullet")
        if(!filename){
            // alert("file name not added ");
            console.log("filenamenot added")
            chrome.runtime.sendMessage({ action: "fileNameNotAdded" });
            return;
        }
        addNoteToDatabaseBullet(filename, request.selectedText);
    }
    else if(request.action==="addFileName"){
    console.log("addFileName case runned")
    filename=request.filename;
    }
});


async function addNoteToDatabaseHeading(filename, selectedText) {
    console.log("addNoteToDatabaseHeading")
    const newfile = {
        filename: filename,
        text: selectedText
    };

    const response = await fetch('http://localhost:3001/addheading', {
        method: "PUT",
        body: JSON.stringify(newfile),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);
}
async function addNoteToDatabaseBullet(filename, selectedText) {
    console.log("addNoteToDatabaseBullet")
    const newfile = {
        filename: filename,
        text: selectedText
    };

    const response = await fetch('http://localhost:3001/addbullet', {
        method: "PUT",
        body: JSON.stringify(newfile),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);
}
