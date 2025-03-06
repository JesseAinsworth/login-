document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("authForm")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const confirmPasswordInput = document.getElementById("confirmPassword")
  const switchFormLink = document.getElementById("switchForm")
  const formTitle = document.getElementById("formTitle")
  const formSubtitle = document.getElementById("formSubtitle")
  const submitBtn = document.getElementById("submitBtn")
  const nameGroup = document.getElementById("nameGroup")
  const confirmPasswordGroup = document.getElementById("confirmPasswordGroup")
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  let isLoginForm = false

  const nameRegex = /^[a-zA-Z\s.]+$/
  const emailRegex = /^[a-z0-9]{3,6}@[a-z0-9]+\.[a-z]{2,4}(\.[a-z]{2,3})?$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/

  function validateName() {
    const nameError = document.getElementById("nameError")
    if (!nameRegex.test(nameInput.value)) {
      nameError.textContent = "El nombre solo puede contener letras, espacios y puntos."
      return false
    } else {
      nameError.textContent = ""
      return true
    }
  }

  function validateEmail() {
    const emailError = document.getElementById("emailError")
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "El correo electrónico debe tener entre 3-6 caracteres antes del @"
      return false
    } else {
      emailError.textContent = ""
      return true
    }
  }

  function validatePassword() {
    const passwordError = document.getElementById("passwordError")
    if (!passwordRegex.test(passwordInput.value)) {
      passwordError.textContent =
        "La contraseña debe tener 8-16 caracteres, una mayúscula, un número y un carácter especial"
      return false
    } else {
      passwordError.textContent = ""
      return true
    }
  }

  function validateConfirmPassword() {
    const confirmPasswordError = document.getElementById("confirmPasswordError")
    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Las contraseñas no coinciden."
      return false
    } else {
      confirmPasswordError.textContent = ""
      return true
    }
  }

  function toggleForm() {
    isLoginForm = !isLoginForm
    if (isLoginForm) {
      formTitle.textContent = "Log In"
      formSubtitle.innerHTML = 'Don\'t have an account? <a href="#" id="switchForm">Sign Up</a>'
      submitBtn.textContent = "Log In"
      nameGroup.style.display = "none"
      confirmPasswordGroup.style.display = "none"
    } else {
      formTitle.textContent = "Sign Up"
      formSubtitle.innerHTML = 'Already have an account? <a href="#" id="switchForm">Log In</a>'
      submitBtn.textContent = "Sign Up"
      nameGroup.style.display = "block"
      confirmPasswordGroup.style.display = "block"
    }
    document.getElementById("switchForm").addEventListener("click", toggleForm)
  }

  nameInput.addEventListener("input", validateName)
  emailInput.addEventListener("input", validateEmail)
  passwordInput.addEventListener("input", validatePassword)
  confirmPasswordInput.addEventListener("input", validateConfirmPassword)
  switchFormLink.addEventListener("click", toggleForm)

  authForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    let isValid = validateEmail() && validatePassword()
    if (!isLoginForm) {
      isValid = isValid && validateName() && validateConfirmPassword()
    }

    if (!isValid) {
      return
    }

    const formData = {
      email: emailInput.value,
      password: passwordInput.value,
    }

    if (!isLoginForm) {
      formData.name = nameInput.value
    }

    try {
      const response = await fetch(isLoginForm ? "/api/login" : "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        localStorage.setItem("token", result.access_token)
        showNotification(isLoginForm ? "Inicio de sesión exitoso" : "Registro exitoso", "success")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      } else {
        const error = await response.json()
        showNotification(
          error.message || (isLoginForm ? "Error en el inicio de sesión" : "Error en el registro"),
          "error",
        )
      }
    } catch (error) {
      console.error("Error:", error)
      showNotification("Ocurrió un error durante la autenticación", "error")
    }
  })

  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  const socialButtons = document.querySelectorAll(".social-btn")
  socialButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.1)"
    })
    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)"
    })
  })

  // Responsive menu toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
  })
})

