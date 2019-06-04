/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.
***/
const page = document.querySelector('.page');
const studentList = document.querySelector('.student-list');
const pageHeader = document.querySelector('.page-header');
const students = studentList.children; //HTMLfCollection
const studentsArray = [...students]; //Make it array to manipulate!!
const studentPerPage = 10;
let pageNumber = 1;

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.
***/

function hidePage() {
  for(let i=0; i< students.length; i++) {
    students[i].style.display = 'none';
  }
}

function showPage(list, currentPage) {
  // Make unvisible all student list(initializing)
  hidePage();
  //Initialize startIndex, endIndex
  const startIndex = studentPerPage * ( currentPage - 1 );
  const endIndex = studentPerPage * currentPage ;
  //Display 10 students per page
  for( let i = startIndex; i < endIndex ; i ++ ){
    if(list[i]){
      list[i].style.display = 'block';
    }

  }
}


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
  //If there is pagination button, remove it
  if(document.querySelector('.pagination')){
    document.querySelector('.pagination').remove();
  }
  //Find total page number using studentPerPage
  const totalPageNum = parseInt(list.length/studentPerPage)+1;
  //Create Container(pagination)& ul Element
  const container = document.createElement('div');
  container.className='pagination';
  const ul = document.createElement('ul');
  //Create page button using totalPageNum variable
  for(let i = 1 ; i<= totalPageNum ; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = i;
    //Give funcitionality on page buttons
    a.addEventListener('click', ()=>{
      pageNumber = a.textContent;
      container.querySelector('.active').className = 'none';
      a.className = 'active'
      showPage(list, pageNumber);
    });
    if(i===1){
      a.className = 'active';
    }
    li.appendChild(a);
    ul.appendChild(li);
  }
  container.appendChild(ul);
  page.appendChild(container);
}

function pagination(studentsArray,pageNumber){
  showPage(studentsArray, pageNumber);
  appendPageLinks(studentsArray);
}
//Initialize
pagination(students, pageNumber);


/***
   Create the `studentSearch`function to add searching functinality.
***/

function studentSearch(list) {
  //Create Search Element
  const containerDiv = document.createElement('div');
  containerDiv.className='student-search';
  const input = document.createElement('input');
  input.placeholder='Search for students...';
  const button = document.createElement('button');
  button.textContent="Search";
  //Create Search function
  function searchAction(){
    noResultContainer.style.display='none';
    const searchTerm = input.value;
    const searchedArray = [];
    for(let i=0; i <list.length; i++){
      const name = studentList.children[i].querySelector('h3').textContent;
      if(name.indexOf(searchTerm)> -1){
        searchedArray.push(list[i]);
      }
    }
    if(searchedArray.length ===0){
      hidePage();
      noResultContainer.style.display='block';
      if(document.querySelector('.pagination')){
        document.querySelector('.pagination').remove();
      }
    } else {
      pageNumber = 1;
      pagination(searchedArray, pageNumber);
    }
  }
  //Add functionality to input element
  input.addEventListener('keyup', () =>{
    searchAction();
  });

  //Add functionality to button element
  button.addEventListener('click', ()=> {
    searchAction();
  });

  containerDiv.appendChild(input);
  containerDiv.appendChild(button);
  pageHeader.appendChild(containerDiv);
}

studentSearch(studentsArray);

//for the noResult action
const noResultContainer = document.createElement('div');
noResultContainer.className = 'noResult';
const noResult = document.createElement('h2');
noResult.className = 'noResult__text';
const img = document.createElement('img');
img.className = 'noResult__img';
noResult.textContent = 'No Result';
img.src="./img/anonymous.svg";
noResultContainer.appendChild(img);
noResultContainer.appendChild(noResult);
page.appendChild(noResultContainer);
noResultContainer.style.display='none'
