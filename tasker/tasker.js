function sign() {
    var emaill = document.getElementById("email").value
    var passwordd = document.getElementById("pass").value
    var names = "abcd@gmail.com"
    var pass = "123456"
    if (emaill == names && passwordd == pass) {
        window.location.href = "g.html";
    }
    else {
        window.alert("Entered is invalid");
    }

}
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
     alert('Sign-up successful!');
});
