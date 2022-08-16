const handleSubmit = function(event){
    event.preventDefault();
    let email = $(".email-input").val();
    let password = $("#pwd").val()

    const $message = $('#message-2')


    let preferences = []
    $('#div_checkboxes :checked').each(function(){
        preferences.push($(this).val());
    })

    checkValidSignup(email, password, preferences).then(() => {
        $message.replaceWith('<h5 style="font-size: large; color:green; text-align:center;" id="message">Nice! You have created an account.</h5>');
        window.location.href = "index.html";
    }).catch(() => {
        $message.replaceWith('<h5 style="font-size: large; color:red; text-align:center;" id="message">Looks like a user with this email already exists. Try again!</h5>');
    })

    
}


//check Valid signup

const checkValidSignup = async function(email, password, preferences) {
    const result = await axios({
        method: 'post',
        url: 'https://secret-brook-97060.herokuapp.com/signuppage',
        data:{
            "email":email,
            "password": password,
            "preferences": preferences
        },
    })

    return result;

}





$(function() {
    $(`.signup-button`).on("click", handleSubmit)
});
