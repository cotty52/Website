

// Whenever the site is loaded, this function is called
SiteLoad = () => {
  // When site is loaded, press that button. Could also call ShowPage
  document.getElementById("designsBtn").click();
}

const ShowPage = (pageName, btnName) => {
  //Future proofing in case more pages and buttons are added
  var pageContent, i;
  pageContent = document.getElementsByClassName("content");
  for (i = 0; i < pageContent.length; i++) {
    pageContent[i].style.display = "none";
  }

  // Get id of previously active button, then remove the active class
  const activeButton = document.querySelector(".button.active");
  activeButton.classList.remove("active");

  // Get id of clicked button and add 'active' class
  const clickedButton = document.getElementById(btnName);
  clickedButton.classList.add("active");

  // Get id of the new page and show it
  const newPage = document.getElementById(pageName);
  newPage.style.display = "flex";

  // Construct the new URL
  const newUrl = window.location.origin + "/#" + pageName;

  // Update the URL without triggering a page reload
  window.history.pushState({ path: newUrl }, "", newUrl);
};



// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.getElementById("navbar").style.padding = "30px 10px";
//     document.getElementById("logo").style.fontSize = "25px";
//   } else {
//     document.getElementById("navbar").style.padding = "80px 10px";
//     document.getElementById("logo").style.fontSize = "35px";
//   }
// }