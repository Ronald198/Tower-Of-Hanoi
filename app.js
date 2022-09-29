var base1 = document.getElementById("base1");
var base2 = document.getElementById("base2");
var base3 = document.getElementById("base3");
var body = document.getElementById("body");
var marginToAdd = -20;
var move = false;
var x;
var y;
var movesNr = 0;
var movesTxt = document.getElementById("moves");
var win = document.getElementById("win");
var disksNumberContainer = document.getElementById("disksNumberContainer");
var diskGrabbedNr;
var disksNumber = 8;
var pole1Start = ["disk1", "disk2", "disk3", "disk4", "disk5", "disk6", "disk7", "disk8"];
var pole1 = ["disk1", "disk2", "disk3", "disk4", "disk5", "disk6", "disk7", "disk8"];
var pole2 = [];
var pole3 = [];
var diskGrabbed;
var previousPole = "pole1";
var colors = ["#042704", "#054905", "#075f07", "#0d8d0d", "#0eaf0e", "#0fc90f", "#18f018", "#99ee99"];
var widths = ["160px", "140px", "120px", "100px", "80px", "60px", "40px", "30px"];
var minimum = 255;

setUp();

function setUp()
{
    marginToAdd = -20;
    for (let i = 0; i < pole1.length; i++) 
    {
        const element = document.getElementById(pole1[i]);
        element.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
        base1.appendChild(element);
        marginToAdd = marginToAdd - 20;
    }
}

function setColorANdWidth()
{
    for (let i = 0; i < pole1.length; i++) 
    {
        const element = document.getElementById(pole1[i]);
        element.style.width = widths[i + 8 - disksNumber];
        element.style.backgroundColor = colors[i + 8- disksNumber];
    }
}

function findMin()
{
    switch (disksNumber) {
        case 1:
            return 1;
        case 2:
            return 3;
        case 3:
            return 7;
        case 4:
            return 15;
        case 5:
            return 31;
        case 6:
            return 63;
        case 7:
            return 127;
        case 8:
            return 255;
    }
}

function addDisk()
{
    if(disksNumber < 8)
    {
        disksNumber++;
        document.getElementById("nrIndicator").innerHTML = "Disk's number: " + disksNumber;
        minimum = findMin();
        movesTxt.innerHTML = "Moves: " + movesNr + "| Minimum of moves required: " + minimum;
        
        const element = document.getElementById(pole1Start[pole1.length]);
        element.style.visibility = "visible";
        pole1.push(element.id);
        setUp();
        setColorANdWidth();
    }
}

function removeDisk()
{
    if(disksNumber > 1)
    {
        disksNumber--;
        document.getElementById("nrIndicator").innerHTML = "Disk's number: " + disksNumber;
        minimum = findMin();
        movesTxt.innerHTML = "Moves: " + movesNr + "| Minimum of moves required: " + minimum;
        
        document.getElementById(pole1[pole1.length - 1]).style.visibility = "hidden";
        pole1.pop();
        setUp();
        setColorANdWidth();
    }
}

function enter(diskName)
{
    diskGrabbed = document.getElementById(diskName);
    diskGrabbedNr = parseInt(diskName.replace("disk", ""));

    if(pole1[pole1.length - 1] 
        == diskName)
    {
        previousPole = "pole1";
        move = true;
    }
    else if(pole2[pole2.length - 1] == diskName)
    {
        previousPole = "pole2";
        move = true;
    }
    else if(pole3[pole3.length - 1] == diskName)
    {
        previousPole = "pole3";
        move = true;
    }
}

function leave()
{
    let successfulMove = false;
    let pole1Top;
    let pole2Top;
    let pole3Top;

    if(move)
    {
        move = false;
        diskGrabbed.style.cursor = "default";
        diskGrabbed.style.transform = "translate(" + 0 + "px, " + 0 + "px)";

        if(pole1.length != 0)
        {
            pole1Top = parseInt(pole1[pole1.length - 1].replace("disk", ""));
        }
        else
        {
            pole1Top = -1;
        }

        if(pole2.length != 0)
        {
            pole2Top = parseInt(pole2[pole2.length - 1].replace("disk", ""));
        }
        else
        {
            pole2Top = -1;
        }

        if(pole3.length != 0)
        {
            pole3Top = parseInt(pole3[pole3.length - 1].replace("disk", ""));
        }
        else
        {
            pole3Top = -1;
        }

        if(y < 475 && y > 180)
        {
            if(x >= 415 && x <= 485)
            {
                if(pole1Top < diskGrabbedNr || pole1.length == 0)
                {
                    if(previousPole == "pole2")
                    {
                        pole1.push(pole2[pole2.length - 1]);
                        pole2.pop();
                    }
                    else if(previousPole == "pole3")
                    {
                        pole1.push(pole3[pole3.length - 1]);
                        pole3.pop();
                    }
                    
                    base1.appendChild(diskGrabbed);
                    marginToAdd = -20;
    
                    for(let i = 0; i < pole1.length; i++) {
                        const element = document.getElementById(pole1[i]);
                        element.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
                        marginToAdd = marginToAdd - 20;
                    }
    
                    successfulMove = true;

                    if(movesNr == 0)
                    {
                        disksNumberContainer.style.visibility = "hidden";
                    }

                    movesNr++;
                }
            }
        
            if(x >= 615 && x <= 685)
            {
                if(pole2Top < diskGrabbedNr || pole2.length == 0)
                {
                    if(previousPole == "pole1")
                    {
                        pole2.push(pole1[pole1.length - 1]);
                        pole1.pop();
                    }
                    else if(previousPole == "pole3")
                    {
                        pole2.push(pole3[pole3.length - 1]);
                        pole3.pop();
                    }
        
                    base2.appendChild(diskGrabbed);
                    marginToAdd = -20;
    
                    for(let i = 0; i < pole2.length; i++) {
                        const element = document.getElementById(pole2[i]);
                        element.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
                        marginToAdd = marginToAdd - 20;
                    }
    
                    successfulMove = true;

                    if(movesNr == 0)
                    {
                        disksNumberContainer.style.visibility = "hidden";
                    }

                    movesNr++;
                }
            }
        
            if(x >= 785 && x <= 885)
            {
                if(pole3Top < diskGrabbedNr || pole3.length == 0)
                {
                    if(previousPole == "pole1")
                    {
                        pole3.push(pole1[pole1.length - 1]);
                        pole1.pop();
                    }
                    else if(previousPole == "pole2")
                    {
                        pole3.push(pole2[pole2.length - 1]);
                        pole2.pop();
                    }
        
                    base3.appendChild(diskGrabbed);
                    marginToAdd = -20;
    
                    for(let i = 0; i < pole3.length; i++) {
                        const element = document.getElementById(pole3[i]);
                        element.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
                        marginToAdd = marginToAdd - 20;
                    }
    
                    successfulMove = true;

                    if(movesNr == 0)
                    {
                        disksNumberContainer.style.visibility = "hidden";
                    }

                    movesNr++;
                }
            }
        }

        if(!successfulMove)
        {
            if(previousPole == "pole1")
            {
                base1.appendChild(diskGrabbed);
                marginToAdd = pole1.length * -20;
                diskGrabbed.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
            }
            else if(previousPole == "pole2")
            {
                base2.appendChild(diskGrabbed);
                marginToAdd = pole2.length * -20;
                diskGrabbed.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
            }
            else if(previousPole == "pole3")
            {
                base3.appendChild(diskGrabbed);
                marginToAdd = pole3.length * -20;
                diskGrabbed.style.transform = "translate(0%, " + marginToAdd.toString() +"px)";
            }
        }
    
        diskGrabbed = null;
        movesTxt.innerHTML = "Moves: " + movesNr + "| Minimum of moves required: " + minimum;
    }

    if(pole3.length == disksNumber)
    {
        if(disksNumber != 1)
        {
            win.style.color = "darkorange";
            win.innerHTML = "YOU WON!";
        }
        else
        {
            win.style.color = "gray";
            win.innerHTML = "U kidding... Only one?!";
        }
    }
}

document.onmouseup = function leave2() {
    leave();
}

document.onmousemove = function moveMe(event){
    let xGrab;
    let yGrab;

    x = event.clientX - 450;
    y = event.clientY - 430;
    
    if(previousPole == "pole1")
    {
        xGrab = event.clientX - 450;
        yGrab = event.clientY - 485;
    }
    else if(previousPole == "pole2")
    {
        xGrab = event.clientX - 650;
        yGrab = event.clientY - 485;
    }
    else if(previousPole == "pole3")
    {
        xGrab = event.clientX - 850;
        yGrab = event.clientY - 485;
    }

    if(move)
    {
        diskGrabbed.style.transform = "translate(" + xGrab + "px, " + yGrab + "px)";
        diskGrabbed.style.cursor = "grabbing";
    }

    x = x + 450;
    y = y + 430;
}