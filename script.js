const genrateBtn = document.getElementById('generate-btn');
const passwordOne = document.getElementById('password-one');
const passwordTwo = document.getElementById('password-two');
const lengthSlider = document.getElementById('length');
const lengthVal1 = document.getElementById('length-value');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const copyBtns = document.querySelectorAll('.copy-btn');
const strengthText = document.getElementById('strength-text');
const strengthBars = document.querySelectorAll('.strength-bar');

// character sets

const CHARSETS = {
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz', 
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    NUMBERS: '0123456789',
    SYMBOLS: '~!@#$%&_{[}]|<>?/',
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

function generatePassword(length, options) {
    let charset = CHARSETS.LOWERCASE + CHARSETS.UPPERCASE;
    if (options.numbers) charset += CHARSETS.NUMBERS;
    if (options.symbols) charset += CHARSETS.SYMBOLS;

    // if (charset.length === 0) return '';

    let password = '';
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // console.log(password);
    return password;
};

function renderPasswords() {
    const length = parseInt(lengthSlider.value);
    const options ={
        numbers: includeNumbers.checked,
        symbols: includeSymbols.checked
    };

    const password1 = generatePassword(length, options);
    const password2 = generatePassword(length, options);

    passwordOne.value = password1;
    passwordTwo.value = password2;

    updateStrengthIndicator(password1);
}
 
// copy to clipboard function

async function copyToClipboard(elementId, btn) {
    const input = document.getElementById(elementId);
    if (!input.value) return;        

    try {
        await navigator.clipboard.writeText(input.value);
        alert('Password copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

// strength indicator function

function updateStrengthIndicator(password) {

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    let levelText = '';
    let levelColor = '';
    let barsToShow = 0;

    if (strength <= 1) {
        levelText = 'Weak';
        levelColor = 'red';
        barsToShow = 1;

    }   else if (strength === 2) {
            levelText = 'Medium';
            levelColor = '#f59e0b';
            barsToShow = 2;
    } else if (strength === 3) {
            levelText = 'Strong';
            levelColor = '#84cc16';
            barsToShow = 3;
    } else {
        levelText = 'Very Strong';
        levelColor = 'var(--text-green)';
        barsToShow = 4;
    }

    // Update strength text

    strengthText.textContent = levelText;
    strengthBars.forEach((bar, index) => {
        if (index < barsToShow) {
            bar.style.backgroundColor = levelColor;
        } else {
            bar.style.backgroundColor = 'var(--bg-darkest)';
        }
    });
}

renderPasswords();
