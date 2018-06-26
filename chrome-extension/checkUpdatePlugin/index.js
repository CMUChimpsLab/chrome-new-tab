function getUpdate (){
    var theUrl = "http://localhost:3333";
    console.log("send get to " + theUrl);
    $.ajax
    ({
      type: "GET",
      url: theUrl,
      data: "hello",
      success: function(res)
      {
        console.log(res);
        // var updateItems = res.split("\n");
        // console.log(updateItems);
        var os = res.os;
        var softwareList = res.softwares;
        softwareList.forEach((s)=>{
            console.log(s);
            var text = s.name + "   " + s.old_version + " -> " + s.new_version;
            var hrElement = document.createElement("hr");
            document.getElementById("updateList").appendChild(hrElement);
            var updateItemID = s.id; // no be consider
            var textnode = document.createTextNode(text);  
            var updateItemDiv = document.createElement("div");
            updateItemDiv.setAttribute("class", "updateItemDiv");
            updateItemDiv.appendChild(textnode);

            //check whether we can update this software with chrome extension
            //if yes, show an update button
            if (s.updatable === "true"){
                var updateItemButton = document.createElement("button");
                var textnodeBtn = document.createTextNode("update"); 
                updateItemButton.setAttribute("class", "updateItemButton");
                updateItemButton.updateID = updateItemID;
                updateItemButton.appendChild(textnodeBtn);
                updateItemButton.addEventListener("click", sendUpdateCommand);
                updateItemDiv.appendChild(updateItemButton);
            }
            
            document.getElementById("updateList").appendChild(updateItemDiv);   
        });
      }
    });
}
function sendUpdateCommand (evt){
    var updateItemID = evt.target.updateID;
    var theUrl = "http://localhost:3333/updateThis/";
    console.log("send update command " + updateItemID);
    $.ajax
    ({
      type: "POST",
      url: theUrl,
      dataType: 'text',
      data : {updateItemID : updateItemID},
      success: function(res)
      {
         alert(res);
      }
    });
}
getUpdate();
