window.addEventListener('load', showAtmMoney);
let atmMoney = document.getElementsByClassName('atm-total')[0];
let operationsTag = document.getElementsByClassName('operations')[0];

//el valor de la division
let div = 0;
//la cantidad de billetes
let papeles = 0;

const images = [];
let cashAvailable; // showAtmMoney result

images['100mxn'] = '100mxn.jpg';
images['50mxn'] = '50mxn.jpg';
images['20mxn'] = '20mxn.jpg';

//class money
const inputMoney = document.getElementsByClassName('money')[0];

let showCash = document.getElementsByClassName('respuesta')[0];

// el dinero que el cliente quiere retirar
//let dinero = inputMoney.value;
let moneyrequest = inputMoney.value;

//el dinero con el que cuenta el atm
const caja = [];
const atm = [];
const entregado = [];

class Billete {
    constructor(valor, cantidad)
    {
        this.valor = valor;
        this.cantidad= cantidad;
        this.image = new Image(200, 100);  
        this.image.src = images[`${this.valor}mxn`]; 
    }
    showImage(){
        document.body.appendChild(this.image);
        //console.log(this.image);
    }
    //descubrir cómo borrar, quitar la imagen que muestro
     

    restar(valor, sustraer){
        this.valor = valor;
        this.cantidad = this.cantidad - sustraer;
    }
}

//se llena la caja
atm.push(new Billete(100, 10))
atm.push(new Billete(50, 20));
atm.push(new Billete(20, 30));

function showAtmMoney(){
    let totalDisponible = getTotalMoney(atm);
    atmMoney.innerHTML = `El efectivo disponible es ${totalDisponible}`;
}


function getTotalMoney(arr){
    let totalDisponible = 0;
    arr.forEach((billete)=>{
        totalDisponible += billete.valor * billete.cantidad;
    });
    return totalDisponible;
}

function entregarDinero(){
    moneyrequest = Number(inputMoney.value);
    showCash.innerHTML = "";

    for(let bi of atm){
        if  (moneyrequest > 0) {
            //rendondear hacia abajo y dividir entre el valor
            div = Math.floor(   moneyrequest / bi.valor);
            if(div > bi.cantidad){
                papeles = bi.cantidad
            }
            else{
                papeles = div;
            }
            entregado.push( new Billete(bi.valor, papeles));
            //console.log(bi.valor, papeles);
            //comparar entregados con atm, y restar los billetes entregados.
           atm.forEach((billete)=>{
               if(billete.valor === bi.valor){
                   billete.restar(billete.valor, papeles);
                   console.log(billete.cantidad);
                }
            })
            moneyrequest =  moneyrequest - (bi.valor * papeles);
        }
    }
    if  (moneyrequest > 0){
        showCash.innerHTML = ('atm out of money');
    }
    else{
        for(let e of entregado)
        {
            if(e.cantidad > 0){
                e.showImage();
                showCash.innerHTML = showCash.innerHTML + (`\n${e.cantidad} billetes de $${e.valor} \n`);
            }
        }
        showCash.innerHTML =  showCash.innerHTML + '\nfavor de tomar el dinero';
    }
    showAtmMoney();
}

//const extractButton = document.getElementById('extraer');
const extractButton = document.getElementsByClassName('getAmount')[0];
extractButton.addEventListener('click', entregarDinero);

//TODO 
//mostrar los billetes en imágenes, crear imagenes para cada billete
//que la caja del atm se quede vacía, q guarde la cantidad que ha perdido 
    //cantidad de transacciones y $ restado
//y que se pueda visualizar cuanto dinero tiene el ATM

