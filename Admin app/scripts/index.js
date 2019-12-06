// DOM elements
const guideList = document.querySelector('.Sales');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
document.addEventListener('DOMContentLoaded', function(){
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});
const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.email).get().then(doc =>{
      const html = `
        <div> Logged in as ${user.email}</div>
        <div class ="pink-text">Role as ${doc.data().Role}</div>
      `;
      accountDetails.innerHTML = html;

    })
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const link = doc.data();
      const li = `
        <li>
        
          <div class="collapsible-header yellow darken-2 z-depth-0"> ${link.Department} </div>
          <a href="http://google.com" class="collapsible-body grey lighten-4 z-depth-0">
          <div > ${link.Link} </div></a>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="yellow darken-2 z-depth-0 center-align">Login to view Application Link</h5>';
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

