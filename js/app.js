// All Phone Fetch
const loadData = async (search = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await res.json();
  const phones = data.data;

  displayPhones(phones, isShowAll);
};

//Display Phones
const displayPhones = (phones, isShowAll = false) => {
  // All Button
  const showBtn = document.getElementById("showAll");
  phones.length > 12 && !isShowAll
    ? showBtn.classList.remove("hidden")
    : showBtn.classList.add("hidden");

  if (!isShowAll) phones = phones.slice(0, 12);

  // Displaying
  const showCase = document.getElementById("showCase");
  showCase.innerHTML = "";
  //Validation
  const noData = document.getElementById("noData");
  if (phones.length === 0) noData.classList.replace("hidden", "flex");
  else noData.classList.replace("flex", "hidden");

  //   Phone Inserting
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.className = "text-center space-y-2 p-4 rounded-xl";
    div.innerHTML = `
    <div class="bg-[#0D6EFD0D] rounded-lg flex justify-center py-4">
    <img
      class="max-w-56 object-cover"
      src="${phone.image}"
      alt=""
    />
  </div>
  <h3 class="text-2xl font-bold text-[#403F3F]">${phone.phone_name}</h3>
  <button
    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
    type="button"
  >
    Show Details
  </button>
    `;
    showCase.appendChild(div);
  });
  spinnerToggle(false);
};

//Search
function searchPhone(isShowAll) {
  // Spinner On
  spinnerToggle(true);
  //   Take Search Value
  const input = document.getElementById("search");
  const inputValue = input.value;
  if (inputValue === "") loadData((search = "iphone"), isShowAll);
  else loadData(inputValue, isShowAll);
}

// Spinner
const spinnerToggle = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  isLoading
    ? spinner.classList.replace("hidden", "flex")
    : spinner.classList.replace("flex", "hidden");
};

//showAll Button
const showAll = () => searchPhone(true);

loadData();
