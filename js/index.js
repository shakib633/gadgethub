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
        .catch((error) => displayError(error));
    };
    
    
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
          <div class="card shadow border-0 p-2">
              <img src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${phone.brand}</h5>
                  <button type="button" class="btn btn-success" data-bs-toggle="modal"" data-bs-target="#phone-details"  onclick="phoneDetail('${phone.slug}')">More Details</button>
                
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
modalContent.innerHTML=`
<div class="col-md-12" >
<img src="${detail.image}" alt="">

</div>
<div class="col-md-12">
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <div class="card-body text-start ">
        <h3 class="card-title text-center">${detail.model}</h3>
        <p class="area">Type: <span>${detail.slug}</span></p>
        

      </div>
</div>
`
parrentDiv.textContent=''
parrentDiv.appendChild(modalContent)
}