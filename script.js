const homeBtn = document.getElementById('homeBtn');
const designsBtn = document.getElementById('designsBtn');
const codingBtn = document.getElementById('codingBtn');

const homeSection = document.getElementById('home');
const designsSection = document.getElementById('designs');
const codingSection = document.getElementById('coding');

const showSection = (section) => {
  homeSection.style.display = 'none';
  designsSection.style.display = 'none';
  codingSection.style.display = 'none';
  section.style.display = 'block';
};

homeBtn.addEventListener('click', () => showSection(homeSection));
designsBtn.addEventListener('click', () => showSection(designsSection));
codingBtn.addEventListener('click', () => showSection(codingSection));
