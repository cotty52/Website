const ShowPage = (pageName, btnName) => {
  //Future proofing in case more pages and buttons are added
  var pageContent, buttonLink, i;
  pageContent = document.getElementsByClassName("content");
  for (i = 0; i < pageContent.length; i++) {
    pageContent[i].style.display = "none";
  }

  // Get id of previously active button, then remove the active class
  const activeButton = document.querySelector('nav button.active');
  activeButton.classList.remove('active');

  // Get id of clicked button and add 'active' class
  const clickedButton = document.getElementById(btnName);
  clickedButton.classList.add('active');

  // Get id of the new page and show it
  const newPage = document.getElementById(pageName);
  newPage.style.display = "block";

};
// Get the element with id="defaultOpen" and click on it
//document.getElementById("homeBtn").click();
