const filesection = document.getElementsByClassName('filesection')[0];
const addbtn=document.getElementById('addnewfile');
const input=document.getElementById('filename');
const activebtn=document.getElementById('activebtn');


async function fetchFile() {
    filesection.innerHTML = "";
    const response = await fetch('http://localhost:3001/');
    const allfile = await response.json();
    const newdata = allfile.allfile;
    newdata.forEach(element => {
    console.log("file", element);
    const node = `<div class="card">${element}</div>`;
    filesection.insertAdjacentHTML('beforeend', node);
    });
    addEventListener(); 
}

var filename="";






addbtn.addEventListener('click',async ()=>{
      const input=document.getElementById('filename');
      console.log(input.value);
      if(!input.value){
        alert("add file name");
        return;
      }
      const newfile={
            filename:input.value
      }
      input.value="";
      const allcards=document.getElementsByClassName('card');
      for(let i=0;i<allcards.length;i++)
      {
        filename=allcards[i].innerText;

        if(filename==input.value+".txt")
        {
            alert("same file name already exist,\n can not be created again");
            return;
        }
      }
      const response=await fetch('http://localhost:3001/createfile',{
            method:"POST",
            body:JSON.stringify(newfile),
            headers: {
                  'Content-Type': 'application/json'
                  
              }
      })
      const message=await response.json(newfile);
      console.log(message);
      fetchFile();

})
// =========================
function addEventListener() {
      const cards = document.getElementsByClassName('card');
      for (let i = 0; i < cards.length; i++) {
          cards[i].addEventListener('click', () => {
              filename = cards[i].innerText;
              console.log(filename);
              const previousactive = document.getElementsByClassName('active')[0];
              if (previousactive) { previousactive.classList.remove('active'); }
              cards[i].classList.add('active');
              const currentelement = document.getElementsByClassName('active')[0];
              filename = currentelement.innerText;
              console.log("me going to send");
              chrome.runtime.sendMessage({
                  action: "addFileName",
                  filename: filename
              });
              console.log("me had sent message");
          });
      }
  }
fetchFile();
// =========================









