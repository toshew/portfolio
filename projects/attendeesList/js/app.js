
let emailCheck = false;
let passwordCheck = false;
let matching = false;
const admini = [{email: 'admin@test.com', password: 'admin11@', token: 'fsd5fdh4fg'}];
const tabela = document.querySelector('#output tbody');

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
document.getElementById('filter').addEventListener('keyup', mojFilter);
tabela.addEventListener('click', izbrisiPolaznika);
tabela.addEventListener('click', izmeniPolaznika);
document.getElementById('btnLogout').addEventListener('click', logout);


ispisiPolaznike();
    
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
      $('#btnLogout, #btnDodaj, tr td:nth-child(6)').show();
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

// LOGOUT
function logout() {
  $('#btnLogin').show()
  $('#btnDodaj, #btnLogout, tr td:nth-child(6)').hide()
  
  tokenAdmin = '';
  localStorage.removeItem('tokenAdmin');
  location.assign('./index.html');
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

const sacuvajPolaznikaLS = (polaznik) => {
  let polaznici;
  if (localStorage.getItem('polaznici') === null) {
     polaznici = []; 
  } else {
      polaznici = JSON.parse(localStorage.getItem('polaznici'));
  }

  polaznici.push(polaznik);
  localStorage.setItem('polaznici', JSON.stringify(polaznici));
};

function kreirajPolaznikaTabela(pol) {
  const tr = document.createElement('tr');
  tr.className = 'table-warning';
      
  const th = document.createElement('th');
  th.appendChild(document.createTextNode(pol.id));
  tr.appendChild(th);
      
  const td1 = document.createElement('td');
  td1.appendChild(document.createTextNode(pol.ime));
  tr.appendChild(td1);
      
  const td2 = document.createElement('td');
  td2.appendChild(document.createTextNode(pol.prezime));
  tr.appendChild(td2);
      
  const td3 = document.createElement('td');
  td3.appendChild(document.createTextNode(pol.email));
  tr.appendChild(td3);
      
  const td4 = document.createElement('td');
  td4.appendChild(document.createTextNode(pol.mesto));
  tr.appendChild(td4);

  const td5 = document.createElement('td');
  td5.className = 'd-flex justify-content-around';
  
  // Kreiramo link za editovanje
  const aEdit = document.createElement('a');
  aEdit.className = 'edit-item';

  const dataAtt1 = document.createAttribute("data-toggle");
  dataAtt1.value = "modal";
  aEdit.setAttributeNode(dataAtt1);

  const hrefAtt1 = document.createAttribute("href");
  hrefAtt1.value = "#editModal";
  aEdit.setAttributeNode(hrefAtt1);

  aEdit.innerHTML = '<i class="fas fa-pen"></>';
  td5.appendChild(aEdit);
  
  
  // Kreiramo link za brisanje
  const aDelete = document.createElement('a'); 
  aDelete.className = 'delete-item';
  
  const hrefAtt2 = document.createAttribute("href");
  hrefAtt2.value = "#";
  aDelete.setAttributeNode(hrefAtt2);                
 
  aDelete.innerHTML = '<i class="fas fa-trash"></>';
  td5.appendChild(aDelete);

  tr.appendChild(td5);
  
  tabela.appendChild(tr);

  if (!tokenAdmin) {
    $(".edit-item, .delete-item").hide()
  }
}

// Ispisi polaznike
function ispisiPolaznike() {
  let polaznici;
  if (localStorage.getItem('polaznici') === null) {
     polaznici = []; 
  } else {
      polaznici = JSON.parse(localStorage.getItem('polaznici'));
  }

  polaznici.forEach(polaznik => kreirajPolaznikaTabela(polaznik));
}

// Filter / Pretraga
function mojFilter(e) {
  const trs = document.querySelectorAll('tbody > tr');
  const trsArr = [...trs];

  trsArr.forEach(tr => {
    if (tr.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
      tr.style.display = '';
    } else {
      tr.style.display = 'none';
    }
  });
}

// Izbrisi polaznika
function izbrisiPolaznika(e) {
  let tr = e.target.parentElement.parentElement.parentElement;
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Da li si siguran?')) {
      tr.remove(); 
      izbrisiIzLS(tr);
    }           
  }
}

// Izbrisi polaznika iz ls
const izbrisiIzLS = (tr) => {
  let polaznici;
  if (localStorage.getItem('polaznici') === null) {
      polaznici = []; 
  } else {
      polaznici = JSON.parse(localStorage.getItem('polaznici'));
  }

  polaznici.forEach((polaznik, index) => {
      if (tr.firstChild.textContent == polaznik.id) {
          polaznici.splice(index, 1); 
      }
  }); 

 localStorage.setItem('polaznici', JSON.stringify(polaznici));
}

// Izmeni polaznika
function izmeniPolaznika(e) {
  if (e.target.parentElement.classList.contains('edit-item')) {
    let tr = e.target.parentElement.parentElement.parentElement;
    document.getElementById('imeEdit').value = tr.childNodes[1].textContent;
    document.getElementById('prezimeEdit').value = tr.childNodes[2].textContent;
    document.getElementById('emailEdit').value = tr.childNodes[3].textContent;
    document.getElementById('mestoEdit').value = tr.childNodes[4].textContent;

    document.getElementById('btnIzmeni').addEventListener('click', sacuvajIzmene);

    let polaznici;
    if (localStorage.getItem('polaznici') === null) {
      polaznici = [];
    } else {
      polaznici = JSON.parse(localStorage.getItem('polaznici'));
    }

    let indexEdit = polaznici.findIndex(polaznik => tr.childNodes[0].textContent == polaznik.id);

    function sacuvajIzmene() {
      polaznici[indexEdit].ime = document.getElementById('imeEdit').value;
      polaznici[indexEdit].prezime = document.getElementById('prezimeEdit').value;
      polaznici[indexEdit].email = document.getElementById('emailEdit').value;
      polaznici[indexEdit].mesto = document.getElementById('mestoEdit').value;

      localStorage.setItem('polaznici', JSON.stringify(polaznici));
      
      // cisti tabelu
      while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
      }

      ispisiPolaznike();
    }
  }
}