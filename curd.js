//----------------------purely using localstorage-----------welcome to "reload the page"🤣-------------

let table = document.getElementById("table");
let row;
let arr1 = JSON.parse(localStorage.getItem("student"));
let submitMsg = document.getElementById("submitMsg");

if(arr1 != null)
{
    for(let i=0; i<arr1.length; i++)
    {
        let row = table.insertRow();
        row.insertCell(0).innerHTML = arr1[i].fname;
        row.insertCell(1).innerHTML = arr1[i].mname;
        row.insertCell(2).innerHTML = arr1[i].lname;
        row.insertCell(3).innerHTML = arr1[i].roll;
        row.insertCell(4).innerHTML = `<button onclick = "edit(this)" style="background-color:lightgreen">Edit</button>&nbsp;<button onclick="remove(this)" style="background-color: tomato">Delete</button>`;
    }
}

function handleSubmit()
{
    const arr = [], obj = {};
    let fname, mname, lname, roll, msg, reg;
    fname = document.forms.f.fname.value;
    mname = document.forms.f.mname.value;
    lname = document.forms.f.lname.value;
    roll = Number(document.forms.f.roll.value);
    msg = document.getElementsByTagName("span");
    reg = /(^1[0]{1,2}$)|(^[1-9][0-9]?$)/;
    obj.fname = fname;
    obj.mname = mname;
    obj.lname = lname;
    obj.roll = roll;

    if(check())
    {                   
        if(localStorage.getItem("student") == undefined){
            arr.push(obj);
            localStorage.setItem("student",JSON.stringify(arr));
        }
        else{
            if(arr1.some(obj1 => {
                if(obj.fname === obj1.fname && obj.mname === obj1.mname && obj.lname === obj1.lname && obj.roll === obj1.roll) 
                return true 
                else 
                return false 
                })){
                    document.getElementById("msg").innerHTML = "Already Present!!";
                    return false; 
            }
            else{

                if(row == null){
                    arr1.push(obj);
                    localStorage.setItem("student",JSON.stringify(arr1)); 
                    setTimeout(()=>{ submitMsg.innerHTML = ""; },1000);
                    submitMsg.innerHTML = "Data Submitted Successfully!!";
                                 
                }
                else{
                    let rowIndex = row.rowIndex;
                    arr1[rowIndex - 1].fname = fname;
                    arr1[rowIndex - 1].mname = mname;
                    arr1[rowIndex - 1].lname = lname;
                    arr1[rowIndex - 1].roll = roll;
                    localStorage.setItem("student", JSON.stringify(arr1));
                    setTimeout(()=>{ submitMsg.innerHTML = ""; },1000);
                    submitMsg.innerHTML = "Data Updated Successfully!!";
                }   
            }     
        }
    }
    else{
        return false;
    }

    function check(){
        if(fname == "" || fname == null)
        msg[0].innerHTML = "Please fill the field!!";
    
        else if(mname == "" || mname == null)
        {msg[0].innerHTML = "";
        msg[1].innerHTML = "Please fill the field!!";}
    
        else if(lname == "" || lname == null)
        {   msg[0].innerHTML = "";
            msg[1].innerHTML = "";
            msg[2].innerHTML = "Please fill the field!!";}
       
        else if(roll == "" || roll == null)
        {   msg[0].innerHTML = "";
            msg[1].innerHTML = "";
            msg[2].innerHTML = "";
            msg[3].innerHTML = "Please fill the field!!"; }
       
        else if(!reg.test(roll))
       {    msg[0].innerHTML = "";
            msg[1].innerHTML = "";
            msg[2].innerHTML = "";
            msg[3].innerHTML = "Please enter number between 1 to 100!!";}
    
        else 
            {   
                msg[0].innerHTML = "";
                msg[1].innerHTML = "";
                msg[2].innerHTML = "";
                msg[3].innerHTML = "";
                return{
                    fname : fname,
                    mname : mname,
                    lname : lname,
                    roll : roll
                }
            }
        
        return false;
    }
    return true;
}

function edit(td){
    row = td.parentElement.parentElement; 
    document.getElementById("fname").value =  row.cells[0].innerHTML;
    document.getElementById("mname").value =  row.cells[1].innerHTML;
    document.getElementById("lname").value =  row.cells[2].innerHTML;
    document.getElementById("roll").value =  row.cells[3].innerHTML;
}

function remove(td){
    let submitMsg = document.getElementById("submitMsg");
    if(confirm("Are you sure to delete this record?"))
    {  
        arr1.splice((td.parentElement.parentElement.rowIndex - 1),1);
        localStorage.setItem("student",JSON.stringify(arr1));
        setTimeout(()=>{ location.reload();submitMsg.innerHTML = "";},1000);
        submitMsg.innerHTML = "Data Deleted Successfully!!";
    }
}


