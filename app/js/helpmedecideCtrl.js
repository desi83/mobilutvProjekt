window.onload = function() {

    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
        
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);

    //shake event callback
    function shakeEventDidOccur () {
        randchoose();
        //put your own code here etc.
        alert('You shake!');
    }
};

//choses random of options to 


var choicefields = [];

function randchoose() {
    choices = []
    choices.push(document.getElementById("choice1").value);
    choices.push(document.getElementById("choice2").value);
    if(choicefields.length > 0){
        for (var j=0; j<choicefields.length;j++){
            newinputIDValue = document.getElementById(choicefields[j]).value
            choices.push(newinputIDValue);
        }    
    }
    if (choices.length == 0) return;
    document.getElementById("result").innerHTML = choices[Math.floor(Math.random() * choices.length)];
}



// SHAKE SCRIPT
  document.getElementById("add").addEventListener("click",addform);
  var i=2;
  function addform() {
    i++;
    textareaID = "choice"+i
    choicefields.push(textareaID);
    var newInput = document.createElement("INPUT");
    newInput.setAttribute('id',textareaID);
    newInput.setAttribute('placeholder','Option');
    var textnode = document.createTextNode('');
    newInput.appendChild(textnode);
    document.getElementById("newTextarea").appendChild(newInput);

}


  document.getElementById("remove").addEventListener("click",removeform)



  function removeform() {
      lastOption = choicefields[choicefields.length-1]
      if (lastOption != 'choice1' && lastOption != 'choice2'){
          remove = document.getElementById(lastOption)
          console.log("det här borde vara node: " + remove)
          document.getElementById('newTextarea').removeChild(remove);
          choicefields.splice(choicefields.length-1,1);
      }
      else {
          alert('At least two options are needed.')
      }
  }