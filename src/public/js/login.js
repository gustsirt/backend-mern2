const answer = document.querySelector("#answer");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    answer.innerHTML = "";
  }, 3000);
});

const form = document.querySelector("#loginForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let resp = await fetch("/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector("#loginemail").value,
      password: document.querySelector("#loginpassword").value,
    }),
  })
  resp = await resp.json()
  
  if(resp.error) {
    answer.innerHTML = resp.data
    setTimeout(() => {
      answer.innerHTML = "";
    },3000)
  } else {
    localStorage.setItem("token", resp.token)
    Swal.fire(resp.data).then(
      () => {
        window.location.href = "/products"
      }
    )
  }
});

const github = document.querySelector("#logingithub");
github.addEventListener("click", (e) => {
    e.preventDefault(); // Evita la acción predeterminada del enlace
    window.location.href = "/api/sessions/github"; // Redirige a la ruta de inicio de sesión de GitHub
});

// Añade un evento para escuchar la respuesta del servidor en la ruta de devolución de llamada
window.addEventListener("message", async (event) => {
  if (event.origin === window.location.origin) { // Verifica que el mensaje provenga del mismo origen
      const resp = await event.data; // Obtiene la respuesta del servidor

      // if (resp.error) {
      //     answer.innerHTML = resp.data;
      //     setTimeout(() => {
      //         answer.innerHTML = "";
      //     }, 3000);
      // } else {
      //     localStorage.setItem("token", resp.token);
      //     Swal.fire(resp.data).then(() => {
      //         window.location.href = "/products";
      //     });
      // }
          // Verifica si el inicio de sesión fue exitoso
    if (!resp.error) {
      console.log("Inicio de sesión exitoso");
      // Almacena el token de acceso
      localStorage.setItem("token", resp.token);
      // Redirige al usuario a la página de productos
      window.location.href = "/products";
    } else {
      console.log("Inicio de sesión fallido");
    }
  }
});
