var customerName = document.getElementById("customerName");
var dateVisit = document.getElementById("dateVisit");
var timeVist = document.getElementById("timeVist");
var visitDescription = document.getElementById("visitDescription");
var addbtn = document.getElementById("click");
var Visit;
var visitt;
var data = document.getElementById("data");
var vists ;
if(JSON.parse(localStorage.getItem('vists')) == null){
  vists=[];
}else{
  vists=JSON.parse(localStorage.getItem('vists'));
}
displayData();
var search=document.getElementById('search');
var update=document.getElementById('update');
var currentIndex=0;
update.style.display='none';
addbtn.onclick = function (e) {
  e.preventDefault();
  addVists();
  resetInput();
  displayData();
  Swal.fire({
  position: "center",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});

};
function addVists() {
  Visit = {
    customerName: customerName.value,
    dateVisit: dateVisit.value,
    timeVist: timeVist.value,
    visitDescription: visitDescription.value,
  };
  vists.push(Visit);
  localStorage.setItem('vists',JSON.stringify(vists));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your visit added successfully",
    showConfirmButton: false,
    timer: 1500
  });
}
function resetInput() {
  customerName.value = "";
  dateVisit.value = "";
  timeVist.value = "";
  visitDescription.value = "";
}
function displayData() {
  var result = ``;
  for (let i = 0; i < vists.length; i++) {
    result += `
      <tr>
      <td>${i+1}</td>
      <td>${vists[i].customerName}</td>
      <td>${vists[i].dateVisit}</td>
      <td>${vists[i].timeVist}</td>
      <td>${vists[i].visitDescription}</td>
      <td><button class="btn btn-info" onclick="getVisit(${i})">update</button></td>
      <td><button class="btn btn-danger" onclick="deletVisit(${i})">delete</button></td>
      </tr>
        `
  }
  data.innerHTML=result;
}

document.getElementById('deleteBtn').onclick = function(){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            vists=[];
            data.innerHTML='';
            localStorage.setItem('vists',JSON.stringify(vists));

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    
      
}

function deletVisit(index){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            vists.splice(index,1);
            localStorage.setItem('vists',JSON.stringify(vists));

            displayData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}
search.onkeyup=function(){
    var result = ``;
    for (let i = 0; i < vists.length; i++) {
        if(vists[i].customerName.toLowerCase().includes(search.value.toLowerCase())){
            result += `
            <tr>
            <td>${i+1}</td>
            <td>${vists[i].customerName}</td>
            <td>${vists[i].dateVisit}</td>
            <td>${vists[i].timeVist}</td>
            <td>${vists[i].visitDescription}</td>
            <td><button class="btn btn-info" onclick="getVisit(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deletVisit(${i})">delete</button></td>
            </tr>
              `  
        }
        data.innerHTML=result;
    }
}
function getVisit(index){
    visitt = vists[index];
    currentIndex=index;
    customerName.value=visitt.customerName;
    dateVisit.value=visitt.dateVisit;
    timeVist.value=visitt.timeVist;
    visitDescription.value=visitt.visitDescription;
    update.style.display='inline';
    addbtn.style.display='none';
}
update.onclick=function(e){
    e.preventDefault();
    visitt = {
        customerName: customerName.value,
        dateVisit: dateVisit.value,
        timeVist: timeVist.value,
        visitDescription: visitDescription.value,
      };
      console.log(vists[currentIndex]);
      vists[currentIndex].customerName=visitt.customerName;
      vists[currentIndex].dateVisit=visitt.dateVisit;
      vists[currentIndex].timeVist=visitt.timeVist;
      vists[currentIndex].visitDescription=visitt.visitDescription;
      displayData();
      update.style.display='none';
      addbtn.style.display='inline';
      localStorage.setItem('vists',JSON.stringify(vists));

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your update added successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }

    
