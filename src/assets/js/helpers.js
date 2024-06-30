export function initPasswordToggle (){
    const toggler = document.querySelectorAll('.form-password-toggle i')
    if (typeof toggler !== 'undefined' && toggler !== null) {
      toggler.forEach(el => {
        el.addEventListener('click', e => {
          e.preventDefault()
          const formPasswordToggle = el.closest('.form-password-toggle')
          const formPasswordToggleIcon = formPasswordToggle.querySelector('i')
          const formPasswordToggleInput = formPasswordToggle.querySelector('input')

          if (formPasswordToggleInput.getAttribute('type') === 'text') {
            formPasswordToggleInput.setAttribute('type', 'password')
            formPasswordToggleIcon.classList.replace('ti-eye', 'ti-eye-off')
          } else if (formPasswordToggleInput.getAttribute('type') === 'password') {
            formPasswordToggleInput.setAttribute('type', 'text')
            formPasswordToggleIcon.classList.replace('ti-eye-off', 'ti-eye')
          }
        })
      })
    };
}