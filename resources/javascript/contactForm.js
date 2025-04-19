document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const responseMessage = document.getElementById("responseMessage");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const services = document.getElementById('services').value;
        const message = document.getElementById('message').value;

        // const formData = new FormData(contactForm);
        const formData = {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            services: services,
            message: message,
        };

        const apiEndpoint = "https://localhost:3000/api/contact";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                responseMessage.innerHTML = `<p>${data.message}</p>`;
                responseMessage.classList.add("success", "show"); // Add 'show' class to make the message visible

                setTimeout(() => {
                    contactForm.reset();
                    responseMessage.innerHTML = "";
                    responseMessage.classList.remove("success", "show");
                }, 2000);
            })
            .catch(error => {
                console.error("Error:", error);
                responseMessage.innerHTML = `<p>Error submitting the form. Please try again later.</p>`;
                responseMessage.classList.add("error", "show"); // Add 'show' class to make the message visible

                setTimeout(() => {
                    responseMessage.innerHTML = "";
                    responseMessage.classList.remove("error", "show");
                }, 3000);
            });
    });
});