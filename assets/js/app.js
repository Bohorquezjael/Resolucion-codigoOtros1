const baseEndpoint = "https://api.github.com";
const usersEndpoint = `${baseEndpoint}/users`;

// Corrección en la selección de elementos por clase y variables mas descriptivas
const name = document.getElementsByClassName(".name");  
const blogName = document.getElementsByClassName(".blog");
const location = document.getElementsByClassName(".location");

//hago la funcion asincrona para que pueda usar el await
async function displayUser(username) {
  //manejo una posible excepcion a causa del fetch
  try {
    name.textContent = 'Cargando...';
    const response = await fetch(`${usersEndpoint}/${username}`);
    //si la respuesta de la peticion no es un ok(HTTP:200) lanzo excecion y la manejo con el catch
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    //una vez que me de un (HHTP:200) resuelvo el json
    const data = await response.json();
    //imprimo los objetos del json resuelto
    console.log(data);
    //mediante corto circuito extraaigo los valores del objeto o si no los tiene les asigno uno por default
    name.innerText = data.name || 'Sin nombre';
    blogName.innerText = data.blog || 'Sin blog';
    location.innerText = data.location || 'Ubicación desconocida';
  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  name.textContent = `Algo salió mal: ${err.message}`;
}

//por ultimo slolo llamo a la funcion para que colocque la informacion en los  elementos html
displayUser('stolinski');
