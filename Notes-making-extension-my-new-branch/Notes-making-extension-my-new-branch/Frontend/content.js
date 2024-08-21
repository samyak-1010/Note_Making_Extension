chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      console.log("Message received in content.js:", request);
      if (request.action === "fileNameNotAdded") {
      console.log("Received fileNameNotAdded message");
      alert("Please select a file to add points");
      }
  });


var btnelement;
var pre;
      document.addEventListener("mouseup", function(event) {
      var selectedText = window.getSelection().toString().trim();
      console.log("selected text ",selectedText);
      if (selectedText && selectedText!= pre) {
      console.log("button created");
      pre=selectedText;
      createButton(selectedText, event.pageX, event.pageY);
      } else {
      console.log("button not created created");
      }
      });



function createButton(selectedText, pageX, pageY) {
      removeButton();
      console.log("btn creation funtion called from somewhere")
// create div to store two btn
var divcontainer = document.createElement("div");
divcontainer.style.display="flex";
divcontainer.style.justifyContent="center"
divcontainer.style.alignItems="center"
divcontainer.id = "divcontainer";
divcontainer.style.position = "absolute";
divcontainer.style.left = pageX + 20 + "px";
divcontainer.style.top = pageY + 20 + "px";
divcontainer.style.zIndex = "1000";
divcontainer.style.backgroundColor = "transparent";
divcontainer.style.cursor="pointer";
// creatng btn for heading:
var button1 = document.createElement("div");
button1.innerText = "✒️";
button1.style.width=50+"px";
button1.style.height=50+"px";
button1.style.borderRadius="50%"
button1.setAttribute("title", "Heading");
button1.style.fontSize="1.5rem";
button1.style.fontWeight="700";
button1.style.display="flex"
button1.style.justifyContent="center"
button1.style.alignItems="center"
button1.id = "button1";
button1.style.zIndex = "1000";
button1.style.backgroundColor = "black";
button1.style.cursor="pointer";
button1.style.transition = 'transform 0.4s, border-color 0.4s';
// create btn for bullet point
var button2 = document.createElement("div");
button2.innerText = "🖊️";
button2.style.width=40+"px";
button2.style.height=40+"px";
button2.style.borderRadius="50%";
button2.setAttribute("title", "Bullet");
button2.style.fontSize="2rem";
// button1.style.fontSize="10px";
button2.style.fontWeight="700";
button2.style.display="flex"
button2.style.justifyContent="center"
button2.style.alignItems="center"
button2.id = "button2";
button2.style.zIndex = "1000";
button2.style.backgroundColor = "black";
button2.style.cursor="pointer";
button2.style.transition = 'transform 0.4s, border-color 0.4s';
divcontainer.appendChild(button1)
divcontainer.appendChild(button2)
document.body.appendChild(divcontainer);

      let btnelement1 = document.getElementById('button1');
      let btnelement2 = document.getElementById('button2');
// code operation for heading =>btnelement 1
btnelement1.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation(); // Stop the click event from propagating
      var wikiUrl = 'https://en.wikipedia.org/wiki/' + encodeURI(selectedText);
      chrome.runtime.sendMessage({ action: "AddHeading", url: wikiUrl,selectedText:selectedText });
      setTimeout(()=>{
      console.log("time out funtion runned");
      removeButton();
      },2000);
      });



// code operation for bullet =>btnelement 2
btnelement2.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation(); // Stop the click event from propagating
      var wikiUrl = 'https://en.wikipedia.org/wiki/' + encodeURI(selectedText);
      chrome.runtime.sendMessage({ action: "AddBulletPoint", url: wikiUrl,selectedText:selectedText });
      setTimeout(()=>{
      console.log("time out funtion runned");
      removeButton();
      },2000);
      });



// ===========================


      btnelement1.addEventListener('mouseenter', function () {
            btnelement1.style.transform = 'scale(1.1)';
            btnelement1.style.borderColor = 'black';
            btnelement1.style.backgroundColor="white";
            btnelement1.style.color="black";
            btnelement1.style.transform="transition(0.4s)"
      });
      btnelement2.addEventListener('mouseenter', function () {
            btnelement2.style.transform = 'scale(1.1)';
            btnelement2.style.borderColor = 'black';
            btnelement2.style.backgroundColor="white";
            btnelement2.style.color="black";
            btnelement2.style.transform="transition(0.4s)"
      });
      btnelement1.addEventListener('mouseleave', function () {
            btnelement1.style.transform = 'scale(1)';
            btnelement1.style.borderColor = 'white';
            btnelement1.style.backgroundColor="black";
            btnelement1.style.color="white";
        });
      btnelement2.addEventListener('mouseleave', function () {
            btnelement2.style.transform = 'scale(1)';
            btnelement2.style.borderColor = 'white';
            btnelement2.style.backgroundColor="black";
            btnelement2.style.color="white";
        });
        setTimeout(()=>{
            removeButton();
        },3*1000)
}

      function removeButton() {
      // var existingButton = document.getElementById("wikitButton");
      // if (existingButton){
      // existingButton.remove();
      // }
      var divcontainer = document.getElementById("divcontainer");
      if (divcontainer){
            divcontainer.remove();
      }
      console.log("delete funtion also runned")
      }


