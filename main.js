const inputHtmlTag = 'input'
const textareaHtmlTag = 'textarea'

const inputTags = document.querySelectorAll(`${inputHtmlTag}, ${textareaHtmlTag}`)
       
const actionTags = document.getElementsByTagName('section')

const labelTags = document.getElementsByTagName('label')

const form = document.querySelector('.form')

const arr = []
const arrAction = []
const arrLabel = []

let validForm = false

// Get input tags and push to array 
  
for ( let i = 0; i < inputTags.length; i++ ) {
    if ( inputTags[i].className ) {
        arr.push(inputTags[i])
    } else if ( !inputTags[i].className ) {
        console.log(`No className in section : ${inputTags[i].parentElement.id}`)
    }
}

// Get section tags for actions error / success

for ( let i = 0; i < actionTags.length; i++ ) {
    if ( actionTags[i].className ) {
        arrAction.push(actionTags[i])
    } else if ( !actionTags[i].className ) {
        console.log(`No className in section : ${actionTags[i].id}`)
    }
}

// Get label tags for get textContent

for ( let i = 0; i < labelTags.length; i++ ) {
    if ( labelTags[i].textContent) {
        arrLabel.push(labelTags[i].textContent)
    } else if ( !labelTags[i].textContent ) {
        console.log(`No content in section : ${labelTags[i].parentElement.id}`)
    }
}

// Create querySelectors from each input tags and addEventListener for each input

for ( let index = 0; index < arr.length; index++) {
    arr[index] = document.querySelector('.' + arr[index].className)
    arr[index].addEventListener('input', e => myFunction(e, index))
}

function myFunction(e, index) {
        
    switch ( e.target.getAttribute('data-validate-text')) {
        case 'validateTextField':
            textValidate(index)
            break;
        case 'validateEmailField':
            emailValidate(index)
            break;
        case 'validateTextareaField':
            textareaValidate(index)
            break;
        case 'validatePasswordField':
            passwordValidate(index)
            break;
    }
}
        
form.addEventListener('submit', e => validateFunction(e))

function validateFunction(e) {
    e.preventDefault()

    let arrValid = []

    for ( let index = 0; index < arr.length; index++ ) {
        if ( arr[index].getAttribute('data-validate-text') === 'validateTextField' ) {
            let textForm = textValidate(index)
            arrValid.push(textForm)
        }
        if ( arr[index].getAttribute('data-validate-text') === 'validateEmailField' ) {
            let emailForm = emailValidate(index)
            arrValid.push(emailForm)
        }
        if ( arr[index].getAttribute('data-validate-text') === 'validateTextareaField' ) {
            let textareaForm = textareaValidate(index)
            arrValid.push(textareaForm)
        }
        if ( arr[index].getAttribute('data-validate-text') === 'validatePasswordField' ) {
            let passwordForm = passwordValidate(index)
            arrValid.push(passwordForm)
        }
    }

    const isValidForm = arrValid.includes(false)  // Check if in arrValid array is false / if all array elements includes true - validate success!

    if ( !isValidForm ) {
        console.log('Success Validate!!!')

                // here connect with servar to send form validated values
    }
}

// Text validate function and parametrs

function textValidate(index) {

let validForm = false

    const validParm = {
        value: true,     // true - cannot be empty  / false - can be empty
        minLength: 3,
        maxLength: 16,
        textFormat: /^[A-Za-z]+$/   // without numbers
    }

    const { value, minLength, maxLength, textFormat } = validParm

    const valueField = arr[index].value.trim()

    if ( valueField == '' || valueField == null ) {
        if ( value === true ) {
            const message = `${arrLabel[index]} cannot be empty.`
            setError( message, index )
        }
    } else if ( valueField.length < minLength || valueField.length > maxLength ) {
        const message = `Invalid length / should be between ${minLength} - ${maxLength} characters.`
        setError( message, index )
    } else if ( !arr[index].value.match(textFormat)) {
        const message = 'only letters'
        setError( message, index )      
    } else {
        const message = `${arrLabel[index]} success.`
        setSuccess( message, index)
        validForm = true
    }
    return validForm   
} 

// Email validate function and parametrs

function emailValidate(index) {

let validForm = false

    const validParm = {
        textFormat: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    const { textFormat } = validParm

    if ( arr[index].value == '' || arr[index].value == null ) {
        const message = `${arrLabel[index]} cannot be empty.`
        setError( message, index )
    } else if ( !arr[index].value.match(textFormat)) {
        const message = 'invalid email format / should contains @ character'
        setError( message, index )      
    } else {
        const message = `${arrLabel[index]} success.`
        setSuccess( message, index )
        validForm = true
    }
    return validForm
}

// Textarea validate function and parametrs

function textareaValidate(index) {

let validForm = false

    validParm = {
        value: true   // true - cannot be empty  / false - can be empty
    }
            
    const { value } = validParm

    if ( arr[index].value == '' || arr[index].value == null ) {
        if ( value === true ) {
            const message = `${arrLabel[index]} cannot be empty.`
            setError( message, index )
        }
    } else {
        const message = `${arrLabel[index]} success.`
        setSuccess( message, index )
        validForm = true
    }
    return validForm
}

// Password validate function and parametrs

function passwordValidate(index) {

let validForm = false

    validParm = {
        value: true,   // true - cannot be empty  / false - can be empty
        minLength: 10,
        textFormat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    }

    const { value, minLength, textFormat } = validParm

    if ( arr[index].value == '' || arr[index].value == null ) {
        if ( value === true ) {
            const message = `${arrLabel[index]} cannot be empty.`
            setError( message, index )
        }
    } else if ( !arr[index].value.match(textFormat) || arr[index].value.length < 8 ) {
        const message = `${arrLabel[index]} must has at least ${minLength} characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`
        setError( message, index )      
    } else {
        const message = `${arrLabel[index]} success.`
        setSuccess( message, index )
        validForm = true
    }
    return validForm
}

function setError( message, index ) {
    arrAction[index].classList.remove('success');
    arrAction[index].classList.add('error')
    const collection = arrAction[index].children
    collection[2].innerText = message
}

function setSuccess( message, index ) {
    arrAction[index].classList.remove('error');
    arrAction[index].classList.add('success')
    const collection = arrAction[index].children
    collection[2].innerText = message      
        }