class ValidForm {
  constructor() {
    this.form = document.querySelector('.form')

    this.events()
  }

  events () {
    this.form.addEventListener('submit', event => {
      this.headleSubmit(event)
    })
  }

  headleSubmit(event) {
    event.preventDefault()
    const validFields = this.isValidFields()
    const validPassword = this.validPassword()
    
    if(validFields && validPassword ) {
      alert('Form sent!!!')
      this.form.submit()
    }
  }

  validPassword() {
    let validate = true

    const password = this.form.querySelector('.password')
    const repeatPwd = this.form.querySelector('.repeat-pwd')
    
    if(password.value.length < 6 || password.value.length > 12) {
      this.createError(password, 'The password must be between 6 and 12 caracters' )
    }

    if(password.value !== repeatPwd.value) {
      this.createError(repeatPwd, 'The passwords must be equals')
      validate = false
    }
    
    return validate
  }



  isValidFields() {
    let validate = true

    for (let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove()
    }

    for(let fields of this.form.querySelectorAll('.validate')) {
      const label = fields.previousElementSibling.innerText;
      if (!fields.value) {
        this.createError(fields, `Field "${label}" can't be empty`)
        validate = false;
      }
      if (fields.classList.contains('cpf')) {
        if(!this.validCpf(fields)) validate = false
      }
      if (fields.classList.contains('user')) {
        if(!this.validUser(fields)) validate = false
      }
    }

    return validate
  }

  validCpf(field) {
    const cpf = new ValidCpf(field.value)

    if (!cpf.valid()) {
      this.createError(field, 'CPF is Invalid!')
      return false
    }
    return true;
  }

  validUser (field) {
    let validate = true
    const user = field.value
    if (user.length < 3 || user.length > 12) {
      this.createError(field, 'User must have between 3 and 12 caracters!')
      validate = false
    }
    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'User only can contain letters and/or numbers')
    }

    return validate
  }

  createError(field, menssage) {
    const div = document.createElement('div');
    div.innerHTML = menssage
    div.classList.add('error-text')
    field.insertAdjacentElement('afterend', div)
  }
}

const valid = new ValidForm() 