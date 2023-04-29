
const widgetRegister_email = document.getElementById('registerAccountEmail');
const widgetRegister_username = document.getElementById('registerAccountName');
const widgetRegister_password = document.getElementById('registerAccountPassword');
const widgetRegister_submit = document.getElementById('registerAccountSubmit');
const widgetRegister_responseContainer = document.getElementById('widgetRegister_responseContainer');

// widgetRegister_email.addEventListener('keypress', function(event){
//     if(event.key === 'Enter'){
//         event.preventDefault();
//         widget_register();
//     }
// });
// widgetRegister_username.addEventListener('keypress', function(event){
//     if(event.key === 'Enter'){
//        event.preventDefault();
//        widget_register();
//     }
// });
// widgetRegister_password.addEventListener('keypress', function(event){
//     if(event.key === 'Enter'){
//         event.preventDefault();
//         widget_register();
//     }
// });

function widget_register(){
   $.post('api/auth/register.php', {
    register: true,
    email: widgetRegister_email.value,
    account: widgetRegister_username.value,
    password: widgetRegister_password.value
   },
   function(response){
    console.log(response);
    const register = JSON.parse(response);
    
        widgetRegister_responseContainer.innerHTML = register.response;
    
    
   });
}
