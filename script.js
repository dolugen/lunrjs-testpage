console.log("hi");

const load_index = () => {
  let index_url = document.querySelector("#index_url").value;
  console.log("Loading index from " + index_url);

  fetch(index_url)
    .then(r => r.text())
    .then(t => {
      index_documents(JSON.parse(t));
      search('');
    });
};

const index_documents = documents => {
  window.idx = lunr(function() {
    this.ref("name");
    this.field("text");

    documents.forEach(function(doc) {
      this.add(doc);
    }, this);

    console.log("Indexed " + documents.length + " docs");
  });
};

const updateResult = items => {
  let resultList = document.querySelector("#result");
  let resultCount = document.querySelector("#result-count");
  resultList.innerHTML = "";

  let itemElements = items.map(item => {
    let li = document.createElement("li");
    li.textContent = item.ref;
    return li;
  });

  resultList.append(...itemElements);
  resultCount.textContent = itemElements.length;
};

const search = term => {
  console.log('Search term was: ' + term);
  let result = window.idx.search(term);
  console.log(result);
  updateResult(result);
};

const searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", e => {
  let searchTerm = document.querySelector("#search-term").value;
  search(searchTerm);
});

const loadIndexButton = document.querySelector("#load-index-btn");
loadIndexButton.addEventListener("click", e => {
  load_index();
});

load_index();
