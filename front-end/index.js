const handleSubmit =  function(event){
    console.log("something");
    event.preventDefault();
    let email = $(".email-login").val();
    let password = $(".password-login").val()
    console.log(email);
    console.log(password);


    const $message = $('#message')


    checkCredentials(email,password).then(()=> {
        $message.replaceWith('<h5 style="font-size: large; color:green; text-align:center;" id="message">Success! You are now logged in.</h5>')
        var timer = setTimeout(function() {
            window.location='/homepage.html'
        }, 3000);
    }).catch(() => {
        $message.replaceWith('<h5 style="font-size: large; color:red; text-align:center;" id="message">Something went wrong and you were not logged in. Check your email and password again.</h5>');
    })

    


}


//checking the user's credentials
const checkCredentials = async function(email, password) {
    const result = await axios({
        method: 'post',
        url: 'https://secret-brook-97060.herokuapp.com/login',
        data:{
            "email":email,
            "password": password,
        },
        withCredentials: true
    })

    return result;

}

$(function() {
    $(`.login-login`).on("click", handleSubmit)
    
});