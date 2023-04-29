const widgetLogin_username = document.getElementById('loginAccountName');
const widgetLogin_password = document.getElementById('loginAccountPassword');
const widgetLogin_responseContainer = document.getElementById('widgetLogin_responseContainer');

widgetLogin_username.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
       event.preventDefault();
       widget_login();
    }
});
widgetLogin_password.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        widget_login();
    }
})

function widget_login(){
    $.post('api/auth/login.php', 
    {
     login: true,
     account: widgetLogin_username.value,
     password: widgetLogin_password.value   
    },
   
    function(response){
        console.log("res =" +response);
        const login = JSON.parse(response);

       widgetLogin_responseContainer.innerHTML =login.desc;
       if(login.desc =='<b>You have logged in.<\/b>'){
        //console.log('this is the success block');
        Cookies.set('auth', login.authorizationToken)
        console.log("auth bearer:" + login.authorizationToken);
        setTimeout(function(){
            location.reload();
        }, 1500);
        
       }

    });
 }