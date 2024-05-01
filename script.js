const ShowPage = (pageName) => {
  //Future proofing in case more pages and buttons are added
  var pageContent, buttonLink, i;
  pageContent = document.getElementsByClassName("pageContent");
  for (i = 0; i < pageContent.length; i++) {
    pageContent[i].style.display = "none";
  }

  // Get all elements with class="buttonLink" and remove the class "active"
  buttonLink = document.getElementsByClassName("buttonLink");
  for (i = 0; i < buttonLink.length; i++) {
    buttonLink[i].className = buttonLink[i].className.replace("active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(pageName).style.display = "block";
  currentTarget.className += "active";
};
// Get the element with id="defaultOpen" and click on it
document.getElementById("home").click();
