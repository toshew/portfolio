
let emailCheck = false;
let passwordCheck = false;
let matching = false;
const admini = [{email: 'admin@test.com', password: 'admin11@', token: 'fsd5fdh4fg'}];

// token
let tokenAdmin = localStorage.getItem("tokenAdmin");

if (tokenAdmin) {
  document.getElementById('btnLogin').classList.add('d-none');
  document.getElementById('btnLogout').classList.add('d-inline-block');
  document.getElementById('btnDodaj').classList.add('d-inline-block');    
}

// id
let id = localStorage.getItem('idPolaznici');

if (!id || localStorage.getItem('polaznici') === null) {
    id = 100;
    localStorage.setItem('idPolaznici', id);
}

// Event listeneri
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('emailLog').addEventListener('blur', validateEmail);
document.getElementById('pass').addEventListener('blur', validatePass);
document.getElementById('sacuvajPolaznika').addEventListener('click', dodajPolaznika);

    
// LOGIN i VALIDACIJA UNOSA

function login() {
  if (!emailCheck || !passwordCheck) {
    return;
  } else {
    const email = document.getElementById('emailLog').value;
    const password = document.getElementById('pass').value;

    matching = checkLoginData(email, password);
    if (matching) {
      token = admini.find(admin => admin.email === email).token;
      localStorage.setItem('tokenAdmin', token);
      $('#btnLogin').hide()
      $('#btnLogout, #btnDodaj').show();
      location.assign('./index.html');
    } else {
      alert("Pogresan email ili lozinka");
      return;
    }
  }
}

// Poklapanje
const checkLoginData = (email, password) => {
  return checkEmailAdmin(email) && checkPassAdmin(password);
};

const checkEmailAdmin = (email) => {
  return (admini.find(admin => email === admin.email) ? true : false);
};

const checkPassAdmin = (password) => {
  return (admini.find(admin => password === admin.password) ? true : false)
};

// prikazi-sakrij lozinku
document.getElementById('showPass').addEventListener('change', function() {
  this.checked ? document.getElementById('pass').setAttribute('type','text')
               : document.getElementById('pass').setAttribute('type','password');
});

// Validacija
function validateEmail() {
  const email = document.getElementById('emailLog');
  re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!re.test(email.value)) {
    email.classList.add('is-invalid');
    emailCheck = false;
  } else {
    email.classList.remove('is-invalid');
    emailCheck = true;
  }
}

function validatePass() {
  const pass = document.getElementById('pass');
  re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;                                     

  if (!re.test(pass.value)) {
    pass.classList.add('is-invalid');
    passwordCheck = false;
  } else {
    pass.classList.remove('is-invalid');
    passwordCheck = true;
  }
}

// DODAVANJE POLAZNIKA

function dodajPolaznika(e) {
  const ime = document.getElementById('ime');
  const prezime = document.getElementById('prezime');
  const email = document.getElementById('email');
  const mesto = document.getElementById('mesto');
  

  if (ime.value === '' || ime.prezime === '' || ime.email === '' || ime.mesto === '') {
      alert('Popunite sva polja');
      return;
  }

  let noviPolaznik = {
    id: ++id,
    ime: ime.value,
    prezime: prezime.value,
    email: email.value,
    mesto: mesto.value
  }

  kreirajPolaznikaTabela(noviPolaznik);

  // Sacuvaj u LS polaznika i novu vrednost ID-ja
  sacuvajPolaznikaLS(noviPolaznik);
  localStorage.setItem('idPolaznici', id);

  // Ocisti inpute
  ime.value = '';
  prezime.value = '';
  email.value = '';
  mesto.value = '';

  e.preventDefault();
}