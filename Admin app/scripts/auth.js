// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    
    db.collection('users').get().then(snapshot=>{
      setUp(snapshot.docs);
    })
    const setUp =(data)=>{

      data.forEach(doc => {
        const user1 = doc.data();
        console.log(user.email);
        //console.log(email);

        if(user1.Category==='Sales' && user1.Email===user.email ){
          db.collection('Sales').onSnapshot(snapshot => {
             setupGuides(snapshot.docs);
             setupUI(user);
          }, err => {console.log(err.message)
          })
        }
        else if(user1.Category==='HR'  && user1.Email===user.email ){
          db.collection('HR').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
          }, err => {console.log(err.message)
          })
       }
       else if(user1.Category==='Admin' && user1.Email===user.email ){
        db.collection('Admin').onSnapshot(snapshot => {
          setupGuides(snapshot.docs);
          setupUI(user);
        }, err => {console.log(err.message)
        })
        }
     else if(user1.Category==='Finance' && user1.Email===user.email ){
      db.collection('Finance').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
      }, err => {console.log(err.message)
      })
        }
 
     else if (user1.Category==='Engineering'  && user1.Email===user.email ){
          db.collection('Engineering').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
          }, err => {console.log(err.message)
          })
       }
     
      })
      console.log(user.Category);
    }




  } 
  else {
    setupUI();
    setupGuides([]);
  }
});



// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  var dict = {
    "Admin" : "Admin",
    "Finance Admin" : "Finance",
    "Sales Admin" : "Sales",
    "HR Admin" : "HR",
    "Engineer Admin" : "Engineering",
  };
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.email).set({
      Role: signupForm['signup-role'].value,
      Category: dict[signupForm['signup-role'].value],
      Email: signupForm['signup-email'].value.toLowerCase()
    });
   }).then(() => {
      // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
   }).catch(err =>{
     signupForm.querySelector('.error').innerHTML = err.message;
   });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  console.log(email);
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err =>{
    loginForm.querySelector('.error').innerHTML = err.message;
  });

  

});

