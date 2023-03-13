
const togglePassword = document.querySelector('#toggle-password');
const password = document.querySelector('#pass-input');

togglePassword.addEventListener('click', function (e) {
    console.log('clicked')
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('animate__zoomIn');

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');

});


const toggleSignInPage = document.querySelector('#toggle-sign-in-page');
const toggleSignUpPage = document.querySelector('#toggle-sign-up-page');
const toggleForgotPasswordPage = document.querySelector('#toggle-forgot-password-page');
const toggleBackPage = document.querySelector('#toggle-back-page');

const signInContainer = document.querySelector('#sign-in-container');
const signUpContainer = document.querySelector('#sign-up-container');
const forgotPasswordContainer = document.querySelector('#forgot-password-container');

toggleSignInPage.addEventListener('click', function (e) {
    signInContainer.classList.add('animate__fadeOutLeft');
    signInContainer.classList.remove('animate__zoomIn');
    signInContainer.classList.remove('animate__bounceOut');

    setTimeout(() => {
        signInContainer.classList.toggle('remove');
        signUpContainer.classList.toggle('remove');
    }, 550);
    signUpContainer.classList.remove('animate__fadeOutRight');
    signUpContainer.classList.add('animate__fadeInRight');

    
});


toggleSignUpPage.addEventListener('click', function (e) {
    signInContainer.classList.remove('animate__fadeOutLeft');
    signInContainer.classList.add('animate__fadeInLeft');
    signUpContainer.classList.add('animate__fadeOutRight');

    setTimeout(() => {
        signInContainer.classList.toggle('remove');
        signUpContainer.classList.toggle('remove');
    }, 550);
    
});


toggleForgotPasswordPage.addEventListener('click', function (e) {
    // remove previous animations first
    signInContainer.classList.remove('animate__fadeOutLeft');
    signInContainer.classList.remove('animate__fadeInLeft');
    signInContainer.classList.remove('animate__zoomIn');

    // add new animation
    signInContainer.classList.add('animate__bounceOut');

    setTimeout(() => {
        signInContainer.classList.toggle('remove');
        forgotPasswordContainer.classList.toggle('remove');
        forgotPasswordContainer.classList.add('animate__zoomIn');

    }, 550);
    forgotPasswordContainer.classList.remove('animate__bounceOut');
    
});

toggleBackPage.addEventListener('click', function (e) {
    // remove previous animations first
    signInContainer.classList.remove('animate__bounceOut');
    signInContainer.classList.remove('animate__fadeInLeft');
    forgotPasswordContainer.classList.remove('animate__zoomIn');

    forgotPasswordContainer.classList.add('animate__bounceOut');

    setTimeout(() => {
        signInContainer.classList.toggle('remove');
        forgotPasswordContainer.classList.toggle('remove');
        signInContainer.classList.add('animate__zoomIn');

    }, 550);

});

