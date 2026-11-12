const loginForm=document.getElementById('login-form');
const signupForm=document.getElementById('signup-form');
const loginTab=document.getElementById('login-tab');
const signupTab=document.getElementById('signup-tab');
const formTitle=document.getElementById('form-title');
const formSubtitle=document.getElementById('form-subtitle');

function clearMessages(){
 document.querySelectorAll('.form-message').forEach(el=>{el.textContent='';el.className='form-message';});
}
function showLogin(){
 loginForm.classList.remove('hidden');signupForm.classList.add('hidden');
 loginTab.classList.add('active');signupTab.classList.remove('active');
 formTitle.textContent='Login to your account';
 formSubtitle.textContent='Enter your details to continue to Saffron Restaurant.';
 clearMessages();
}
function showSignup(){
 signupForm.classList.remove('hidden');loginForm.classList.add('hidden');
 signupTab.classList.add('active');loginTab.classList.remove('active');
 formTitle.textContent='Create your account';
 formSubtitle.textContent='Sign up to enjoy the Saffron Restaurant experience.';
 clearMessages();
}
function message(id,text,type){
 const el=document.getElementById(id);el.textContent=text;el.className='form-message '+type;
}
loginTab.addEventListener('click',showLogin);
signupTab.addEventListener('click',showSignup);
document.getElementById('go-signup').addEventListener('click',showSignup);
document.getElementById('go-login').addEventListener('click',showLogin);

document.querySelectorAll('.show-password').forEach(button=>{
 button.addEventListener('click',()=>{
  const input=document.getElementById(button.dataset.target);
  const show=input.type==='password';input.type=show?'text':'password';
  button.innerHTML=show?'<i class="fa-regular fa-eye-slash"></i>':'<i class="fa-regular fa-eye"></i>';
 });
});

signupForm.addEventListener('submit',event=>{
 event.preventDefault();
 const name=document.getElementById('signup-name').value.trim();
 const email=document.getElementById('signup-email').value.trim().toLowerCase();
 const password=document.getElementById('signup-password').value;
 const confirm=document.getElementById('confirm-password').value;
 if(password!==confirm){message('signup-message','Passwords do not match.','error');return;}
 const users=JSON.parse(localStorage.getItem('saffronUsers')||'[]');
 if(users.some(user=>user.email===email)){message('signup-message','This email is already registered. Please login.','error');return;}
 users.push({name,email,password});
 localStorage.setItem('saffronUsers',JSON.stringify(users));
 signupForm.reset();showLogin();
 document.getElementById('login-email').value=email;
 message('login-message','Account created successfully. Please login.','success');
});

loginForm.addEventListener('submit',event=>{
 event.preventDefault();
 const email=document.getElementById('login-email').value.trim().toLowerCase();
 const password=document.getElementById('login-password').value;
 const users=JSON.parse(localStorage.getItem('saffronUsers')||'[]');
 const user=users.find(item=>item.email===email&&item.password===password);
 if(!user){message('login-message','Incorrect email or password. Please try again or sign up.','error');return;}
 localStorage.setItem('saffronLoggedIn','true');
 localStorage.setItem('saffronCurrentUser',user.name);
 window.location.href='index.html';
});
