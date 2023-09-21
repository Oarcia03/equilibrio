//valores de input sec1
let cfijo = document.getElementById('cf')
let pv = document.getElementById('pv')
let cv = document.getElementById('cv')
let cantidad = document.getElementById('cantidad')
let po = document.getElementById('po')
let sec = document.getElementById('sec')
let parf = document.getElementById('parf')

//botones
let boton = document.getElementById('boton')
let boton1 = document.getElementById('boton1')
let boton2 = document.getElementById('boton2')

let page1 = document.getElementById('page-1')
let page2 = document.getElementById('page-2')


//eliminar input
let limpiar = document.getElementById('limpiar')

limpiar.addEventListener('click', limpiarInput)

function limpiarInput()
{
  cfijo.value = ''
  pv.value = ''
  cv.value = ''
}


//variables de calculo
let it = 0
let q = 0
let ct = 0
let u = 0
let interesTot = 0
let costoTot = 0
let uti = 0

function cargar()
{
  po.style.display = 'none'
  page2.style.display = 'none'
  po.style.display = 'none'
  sec.style.height = '500px'
  parf.style.marginTop = '70px'

  let uti = document.getElementById('uti')
  uti.addEventListener('click', addInput)

  let equi = document.getElementById('equi')
  equi.addEventListener('click', cargar)


  function addInput()
  {
    po.style.display = 'block'
    boton.style.marginTop = '0px'

  }

  let btn = document.getElementById('btn')
  btn.addEventListener('click', mostrarValor)

}

function calcularValor(preve, cf, costva)
{
  if(cantidad.value == 0)
  {
    let caluti = document.getElementById('caluti')
    caluti.style.display = 'none'

  }else{
    interesTot = preve * cantidad.value
    costoTot = (Number(cf) + (costva * cantidad.value))
    uti = interesTot - costoTot

    impimirGanancia(interesTot, costoTot, uti)
  }
}


//funcion de calculos
function mostrarValor() 
{
  page1.style.display = 'none'
  page2.style.display = 'block'

  let cf = cfijo.value
  let preve = pv.value
  let costva = cv.value


  q = (cf / (pv.value - cv.value))
  it = (pv.value * q)
  ct = (Number(cf) + (cv.value * q))
  u = it - ct

  imprimirValores(cf, q, it, ct, u, preve, costva)
  pintarGrafica(q, it, cf)
  calcularValor(preve, cf, costva)
} 


function pintarGrafica(q, it, cf)
{
  //canvas
  let ctx = document.getElementById('myChart').getContext('2d')


  //valores de la grafica
  const dataName = [0, q.toFixed(2), (q * 2).toFixed(2)]
  const porcentaje = [0, it, (it * 2)]//it
  let por

  if(it > 100000)
  {
    por = [cf, it, ((it * 2) - 80000)]//red ct

    console.log('entro en esta 1')

  }else if(it < 100000 && it > 20000){

    por = [cf, it, ((it * 2) - 20000)]//red ct

    console.log('entro en esta 2')

  }else if(it < 20000 && it > 5000){

    por = [cf, it, ((it * 2) - 10000)]//red ct

    console.log('entro en esta 3')

  }else if(it > 1000 && it < 5000){

    por = [cf, it, ((it * 2) - 5000)]//red ct

  }else if(it < 10000){

    por = [cf, it, ((it * 2) - 500)]//red ct
  }

  const p = [cf, cf, cf]//black cf
  const pp = [it, it]//black cf

  //tamaño del canva
  ctx.canvas.parentNode.style.height = '400px';
  ctx.canvas.parentNode.style.width = '700px';


  let dataLine1 = {
      label: "IT",
      data: porcentaje,
      lineTension: 0,
      fill: false,
      borderWidth: 1,
      pointRadius: 0,
      borderColor: 'blue'
    };

  let dataLine2 = {
      label: "CT",
      data: por,
      lineTension: 0,
      fill: false,
      borderWidth: 1,
      pointRadius: 0,
      borderColor: 'red'
    };

  let dataLine3 = {
    label: "CF",
    data: p,
    lineTension: 0,
    fill: false,
    borderWidth: 1,
    pointRadius: 0,
    borderColor: 'black'
  };

  let dataLine4 = {
    label: "E",
    data: pp,
    lineTension: 0,
    fill: false,
    borderDash:[5],
    borderWidth: 1,
    pointRadius: 4,
    borderColor: 'green'
  };

  let grafica = {
    labels: dataName,
    datasets: [dataLine1, dataLine2, dataLine3, dataLine4]
  };

  new Chart(ctx, {
      type: 'line',
      data: grafica,
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
  });
}

function imprimirValores(cf, q, it, ct, u, preve, costva)
{
  //valores ingresados
  let costoFijo = document.getElementById('costoFijo')
  costoFijo.innerHTML = cf

  let precioVenta = document.getElementById('precioVenta')
  precioVenta.innerHTML = preve

  let costoVariable = document.getElementById('costoVariable')
  costoVariable.innerHTML = costva

  //resultados
  let cantiEqui = document.getElementById('cantiEqui')
  cantiEqui.innerHTML = q.toFixed(2)

  let interesTotal = document.getElementById('interesTotal')
  interesTotal.innerHTML = it.toFixed(2)

  let costoTotal = document.getElementById('costoTotal')
  costoTotal.innerHTML = ct.toFixed(2)

  let utilidad = document.getElementById('utilidad')
  utilidad.innerHTML = u
}

function impimirGanancia(interesTot, costoTot, uti)
{
  //calculos de utilidad
  let interesT = document.getElementById('interesT')
  interesT.innerHTML = interesTot.toFixed(2)

  let costoT = document.getElementById('costoT')
  costoT.innerHTML = costoTot.toFixed(2)

  let utilid = document.getElementById('utilid')
  utilid.innerHTML = uti.toFixed(2)

  if(uti > 0)
  {
    let texto = document.getElementById('texto')
    texto.innerHTML = ' Ganancia '

  }else if(uti < 0){

    let texto = document.getElementById('texto')
    texto.innerHTML = ' Perdida '

    let box = document.getElementById('box')
    box.style.display = 'none'

    let calculos = document.getElementById('calculos')
    calculos.style.marginLeft = '290px'

    let resultados = document.getElementById('resultados')
    resultados.style.marginLeft = '90px'
  }

}

//regresar
let regreso = document.getElementById('regreso')
regreso.addEventListener('click', () => {
  window.location.reload()
})

window.addEventListener('load', cargar)