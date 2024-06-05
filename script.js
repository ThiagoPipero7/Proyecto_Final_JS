document.addEventListener('DOMContentLoaded', function() {
  cargarMonedasPopulares();

  const convertirBtn = document.getElementById('convertirBtn');

  convertirBtn.addEventListener('click', function() {
    const cantidad = document.getElementById('cantidad').value;
    const monedaOrigen = document.getElementById('de').value;
    const monedaDestino = document.getElementById('a').value;

    if (!cantidad || !monedaOrigen || !monedaDestino) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    convertirMoneda(cantidad, monedaOrigen, monedaDestino);
  });
});

async function cargarMonedasPopulares() {
  const monedasPopulares = ['USD', 'EUR', 'ARS', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NOK'];

  const deSelect = document.getElementById('de');
  const aSelect = document.getElementById('a');

  // Limpiamos las opciones existentes
  deSelect.innerHTML = '';
  aSelect.innerHTML = '';

  // Agregamos las nuevas opciones
  monedasPopulares.forEach(function(moneda) {
    const option = document.createElement('option');
    option.value = moneda;
    option.textContent = moneda;
    deSelect.appendChild(option.cloneNode(true));
    aSelect.appendChild(option);
  });
}

async function convertirMoneda(cantidad, monedaOrigen, monedaDestino) {
  try {
    const apiKey = '3a4f0f0d8fd86406e7ea110d';
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaOrigen}`);
    const data = await response.json();

    if (!data.conversion_rates || !data.conversion_rates[monedaDestino]) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo obtener la tasa de cambio.',
      });
      return;
    }

    const tasaCambio = data.conversion_rates[monedaDestino];
    const resultado = cantidad * tasaCambio;

    mostrarResultado(cantidad, monedaOrigen, monedaDestino, resultado);
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error);
    Swal.fire({
      icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error al obtener la tasa de cambio. Por favor, inténtalo de nuevo más tarde.',
    });
  }
}

function mostrarResultado(cantidad, monedaOrigen, monedaDestino, resultado) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <p>${cantidad} ${monedaOrigen} equivale a ${resultado.toFixed(2)} ${monedaDestino}</p>
  `;
}



