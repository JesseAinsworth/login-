<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión de Residuos</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <nav class="navbar">
            <div class="logo">
                <i class="fas fa-recycle"></i>
                <span>Gestion de Residuos</span>
            </div>
            <ul class="nav-links">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">Service</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">About</a></li>
            </ul>
            <div class="nav-right">
                <div class="search-box">
                    <input type="text" placeholder="Search">
                    <i class="fas fa-search"></i>
                </div>
                <div class="user-profile">
                    <i class="fas fa-user"></i>
                </div>
            </div>
            <div class="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </nav>

        <div class="auth-container">
            <div class="glass-form">
                <h2 id="formTitle">Sign Up</h2>
                <p class="subtitle" id="formSubtitle">Already a member? <a href="#" id="switchForm">Log In</a></p>
                <form id="authForm">
                    <div class="form-group" id="nameGroup">
                        <input type="text" id="name" placeholder="Full Name" required>
                        <span id="nameError" class="error"></span>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" placeholder="Email" required>
                        <span id="emailError" class="error"></span>
                    </div>
                    <div class="form-group">
                        <input type="password" id="password" placeholder="Password" required>
                        <span id="passwordError" class="error"></span>
                    </div>
                    <div class="form-group" id="confirmPasswordGroup">
                        <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
                        <span id="confirmPasswordError" class="error"></span>
                    </div>
                    <button type="submit" class="signup-btn" id="submitBtn">Sign Up</button>
                    <div class="social-signup">
                        <p>or sign up with</p>
                        <div class="social-buttons">
                            <button type="button" class="social-btn facebook">
                                <i class="fab fa-facebook-f"></i>
                            </button>
                            <button type="button" class="social-btn google">
                                <i class="fab fa-google"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="js/auth.js"></script>
</body>
</html>

