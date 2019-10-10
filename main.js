window.addEventListener('load', showAtmMoney);
let atmMoney = document.getElementsByClassName('atm-total')[0];
let operationsTag = document.getElementsByClassName('operations')[0];

//el valor de la division
let div = 0;
//la cantidad de billetes
//let papeles = 0;
let bills = 0;
//

const images = [];
//let cashAvailable; // showAtmMoney result

images['100mxn'] = '100mxn.jpg';
images['50mxn'] = '50mxn.jpg';
images['20mxn'] = '20mxn.jpg';

//class money
const inputMoney = document.getElementsByClassName('money')[0];

let showCash = document.getElementsByClassName('answer')[0];

// el dinero que el cliente quiere retirar
//let dinero = inputMoney.value;
let moneyrequest = inputMoney.value;

//el dinero con el que cuenta el atm
//const caja = [];
const atm = [];
const extractedMoney = [];
//const entregado = [];

class Bill {
    constructor( value, quantity )
    {
        this.value = value;
        this.quantity = quantity ;
        this.image = new Image(200, 100);  
        this.image.src = images[`${this.value}mxn`]; 
    }
    showImage(){
        document.body.appendChild(this.image);
        //console.log(this.image);
    }
    //TODO
    //descubrir cómo borrar, quitar la imagen que muestro
    //node.removeChild() ??? 
     eraseImage(){

     }

    restar(value, subtract){
        this.value = value;
        this.quantity  = this.quantity  - subtract;
    }
}

//se llena la caja
atm.push(new Bill(100, 10))
atm.push(new Bill(50, 20));
atm.push(new Bill(20, 30));

function showAtmMoney(){
    let totalAvailable = getTotalMoney(atm);
    atmMoney.innerHTML = `El efectivo disponible es ${totalAvailable}`;
}


function getTotalMoney(arr){
    let totalAvailable = 0;
    arr.forEach((billete)=>{
        totalAvailable += billete.value * billete.quantity;
    });
    return totalAvailable;
}

function entregarDinero(){
    moneyrequest = Number(inputMoney.value);
    showCash.innerHTML = "";

    for(let bi of atm){
        if  (moneyrequest > 0) {
            //rendondear hacia abajo y dividir entre el value
            div = Math.floor(   moneyrequest / bi.value);
            if( div > bi.quantity  ){
                bills = bi.quantity
            }
            else{
                bills = div;
            }
            extractedMoney.push( new Bill(bi.value, bills));
            //console.log(bi.value, bills);
            //comparar extractedMoneys con atm, y restar los billetes extractedMoneys.
           atm.forEach((billete)=>{
               if(billete.value === bi.value){
                   billete.restar(billete.value, bills);
                   console.log(billete.quantity);
                }
            })
            moneyrequest =  moneyrequest - (bi.value * bills);
        }
    }
    if  (moneyrequest > 0){
        showCash.innerHTML = ('atm out of money');
    }
    else{
        for(let e of extractedMoney)
        {
            if(e.quantity > 0){
                e.showImage();
                showCash.innerHTML = showCash.innerHTML + (`\n${e.quantity} billetes de $${e.value} \n`);
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

