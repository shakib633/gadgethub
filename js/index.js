function spinnerControl(remove, add) {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove(remove);
  spinner.classList.add(add);
}
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const searchText = document.getElementById("search-field");


  // Error Handling

  const errorDiv = document.getElementById("error-message");
  if (searchText.value == "") {
    errorDiv.innerText = "😝 Please write something to search";
  } else {
    errorDiv.textContent = "";

    // Spinner

    spinnerControl("d-none", "d-block");
    // Load phone APi ..........

    const loadPhones = () => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchText.value}`;
         fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhone(data.data.slice(0,20)))
        .catch((error) => displayError(error))

    };
    
     document.get'
    loadPhones();

    // Display phones.........

    const displayPhone = (data) => {
      const resultContainer = document.getElementById("result-container");
      spinnerControl("d-block", "d-none");
      const resultFromData = data
      const resultCount = document.getElementById("result-count");
      if (resultFromData.length > 1) {
        resultCount.innerHTML = `${resultFromData.length} results found for "<strong>${searchText.value}</strong>" 😃`;
      } 
      else if (resultFromData.length <1 ){
        resultCount.innerHTML = `No result Found For "<strong>${searchText.value}</strong>"`;
      }
 searchText.value = "";
    resultContainer.textContent = "";

      // Show Results ........
    

      resultFromData.forEach((phone) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("col");
        createDiv.innerHTML = `
          <div class="card shadow border-0 rounded-3 p-2">
              <img src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title"> Model: ${phone.phone_name}</h5>
                  <p class="card-title fs-4 text-info fw-semibold"> Brand: ${phone.brand}</p>
                  <button type="button" class="btn btn-success rounded-3 text-white fw-bold" data-bs-toggle="modal"" data-bs-target="#phone-details"  onclick="phoneDetail('${phone.slug}')">Full Specifications</button>
                
              </div>
          </div>
        `
        resultContainer.appendChild(createDiv);
      });
    };
  }
});

// phone Details Modal

const phoneDetail = (id) => {
  const url=`https://openapi.programming-hero.com/api/phone/${id}`
   fetch(url)
   .then((res) => res.json())
   .then((data) => phoneDetails(data.data));
}
const phoneDetails=(detail)=>{
  const parrentDiv=document.getElementById('modal-dialog-box')
  const modalContent = document.createElement("div");
  if(detail.releaseDate==''){
    modalContent.innerHTML=`
<img src="${detail.image}" alt="">

</div>
<div class="col-md-12">
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <div class="card-body text-start ">
        <h3 class="card-title text-center">${detail.name}</h3>
        <p class="area fs-4 fw-bold text-success text-center"> Release Date:<span class ="text-danger fw-semibold fs-5"> This Phone Has not Been Published Yet </p>
        <p class="area fs-4 text-center fw-bold"> Brand :<span class="text-info">${detail.brand}</span></p>
        <div>
        <h5 class="text-center fw-bold fs-3">${detail.name} Full Specifications:</h5>
        <p class="area"> <span>Storage:${detail.mainFeatures.storage}</span></p>
        <p class="area"> <span>Memory:${detail.mainFeatures.memory}</span></p>
        <p class="area"> <span>Display:${detail.mainFeatures.displaySize}</span></p>
        <p class="area"> <span>chipSet:${detail.mainFeatures.chipSet}</span></p>
        <p class="area"> <span>Sensors:${detail.mainFeatures.sensors[0]},${detail.mainFeatures.sensors[1]},${detail.mainFeatures.sensors[2]},${detail.mainFeatures.sensors[3]},${detail.mainFeatures.sensors[4]},${detail.mainFeatures.sensors[5]},</span></p>
        
        <p class="area"> <span>Wlan:${detail.others.WLAN}</span></p>
        
        <p class="area"> <span>Buletooth:${detail.others.Bluetooth}</span></p>
        <p class="area"> <span>Gps:${detail.others.GPS}</span></p>
        <p class="area"> <span>Nfc:${detail.others.NFC}</span></p>
        <p class="area"> <span>Radio:${detail.others.Radio}</span></p>
        <p class="area"> <span>Usb:${detail.others.USB}</span></p>
        
        </div>
        

      </div>
</div>

    `
    parrentDiv.textContent=''
parrentDiv.appendChild(modalContent)
  }
else{
  modalContent.innerHTML=`
<div class="col-md-12" >
<img src="${detail.image}" alt="">

</div>
<div class="col-md-12">
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <div class="card-body text-start ">
    <h3 class="card-title text-center">${detail.name}</h3>
    <p class="area fs-4 fw-bold text-success text-center"> Release Date:<span class ="text-danger fw-semibold fs-5"> ${detail.releaseDate} </p>
    <p class="area fs-4 text-center fw-bold"> Brand :<span class="text-info">${detail.brand}</span></p>
    <div>
    <h5 class="text-center fw-bold fs-3">${detail.name} Full Specifications:</h5>
    <p class="area"> <span>Storage:${detail.mainFeatures.storage}</span></p>
    <p class="area"> <span>Memory:${detail.mainFeatures.memory}</span></p>
    <p class="area"> <span>Display:${detail.mainFeatures.displaySize}</span></p>
    <p class="area"> <span>chipSet:${detail.mainFeatures.chipSet}</span></p>
    <p class="area"> <span>Sensors:${detail.mainFeatures.sensors[0]},${detail.mainFeatures.sensors[1]},${detail.mainFeatures.sensors[2]},${detail.mainFeatures.sensors[3]},${detail.mainFeatures.sensors[4]},${detail.mainFeatures.sensors[5]},</span></p>
    
    <p class="area"> <span>Wlan:${detail.others.WLAN}</span></p> 
    <p class="area"> <span>Buletooth:${detail.others.Bluetooth}</span></p>
    <p class="area"> <span>Gps:${detail.others.GPS}</span></p>
    <p class="area"> <span>Nfc:${detail.others.NFC}</span></p>
    <p class="area"> <span>Radio:${detail.others.Radio}</span></p>
    <p class="area"> <span>Usb:${detail.others.USB}</span></p>
    
    </div>
    

      </div>
</div>

`
parrentDiv.textContent=''
parrentDiv.appendChild(modalContent)
}
}
document.body.style.backgroundImage="url('bg.png')"
