const genrateBtn = document.getElementById('generate-btn');
const passwordOne = document.getElementById('password-one');
const passwordTwo = document.getElementById('password-two');
const lengthSlider = document.getElementById('length');
const lengthVal1 = document.getElementById('length-value');
const includeNumbers = document.getElementById('include-number');
const includeSymbols = document.getElementById('include-symbols');
const copyBtns = document.querySelectorAll('.copy-btn');
const strengthText = document.getElementById('strength-text');
const strengthBars = document.querySelectorAll('.strength-bar');

// character sets

const CHARSETS = {
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz', 
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    NUMBERS: '0123456789',
    SYMBOLS: '~`!@#$%^&*()_-+={[}]|:;"<,>.?/',
}

// Events 

lengthSlider.addEventListener('input', (e) => {
    lengthVal1.textContent = e.target.value;
});

genrateBtn.addEventListener('click', renderPasswords);

copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.target;
        copyToClipboard(targetId, e.currentTarget)
    });
});


// password generate function

function generatePassword() {
    let charset = CHARSETS.LOWERCASE + CHARSETS.UPPERCASE;
    if (options.numbers) charset += CHARSETS.NUMBERS;
    if (options.symbols) charset += CHARSETS.SYMBOLS;

    // if (charset.length === 0) return '';

    let password = '';
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}; 
