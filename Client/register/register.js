document.addEventListener('DOMContentLoaded', () => {
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const teacherFields = document.getElementById('teacherFields');
    const registerForm = document.getElementById('registerForm');
    const registerButton = document.getElementById('registerButton');

    const motivationInput = document.getElementById('motivation');
    const countryInput = document.getElementById('country');
    const cityInput = document.getElementById('city');

    function toggleTeacherFields() {
        const isTeacher = document.getElementById('typeTeacher').checked;

        if (isTeacher) {
            teacherFields.classList.remove('hidden');
            motivationInput.setAttribute('required', 'required');
            countryInput.setAttribute('required', 'required');
            cityInput.setAttribute('required', 'required');
        } else {
            teacherFields.classList.add('hidden');
            motivationInput.removeAttribute('required');
            countryInput.removeAttribute('required');
            cityInput.removeAttribute('required');
        }
    }

    setTimeout(toggleTeacherFields, 50);

    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleTeacherFields);
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        registerButton.disabled = true;
        registerButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Registrando...';
        
        const userData = {
            name: document.getElementById('nombre').value,
            lastName: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            userType: document.querySelector('input[name="userType"]:checked').value,
        };

        let teacherData = {};
        if (userData.userType === 'teacher') {
            teacherData = {
                country: countryInput.value,
                city: cityInput.value,
                motivation: motivationInput.value
            };
            console.log("--- Información para Email del Administrador ---");
            console.log(teacherData);
        }

        console.log("--- Datos principales para Base de Datos ---");
        console.log(userData);

        setTimeout(() => {
            alert(`Registro exitoso como ${userData.userType === 'student' ? 'Estudiante' : 'Profesor'}! (Simulación)`);
            
            registerButton.disabled = false;
            registerButton.innerHTML = '<i class="fas fa-user-plus me-2"></i> Registrarse';
            
            registerForm.reset();
            toggleTeacherFields();
        }, 2000);
    });
});