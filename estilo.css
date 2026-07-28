// ===============================
// SOPA DE LETRAS TECNOLOGÍA MUSICAL
// ===============================


const palabras = [

"ABLETON",
"TECNOLOGIAMUSICAL",
"COURSERA",
"FINALE",
"GARAGEBAND",
"LOGICPRO",
"MUSICGARDEN",
"SIMPLYPIANO",
"TENUTO",
"AURALIA",
"EARMASTER",
"FLSTUDIO",
"GUITARTUNA",
"MUSESCORE",
"SIBELIUS",
"SOLFA",
"YOUSICIAN"

];



let tablero=[];

let tamaño=20;

let seleccion=[];

let encontradas=[];

let puntaje=0;


let segundos=0;

let reloj;



let nombreEstudiante="";



// ===============================
// INICIAR JUEGO
// ===============================


function iniciarJuego(){


nombreEstudiante =
document.getElementById("nombre").value.trim();



if(nombreEstudiante==""){

alert("Por favor escribe tu nombre");

return;

}



crearTablero();

iniciarTiempo();


document.getElementById("resultado").innerHTML="";


}





// ===============================
// CREAR TABLERO
// ===============================


function crearTablero(){


tablero=[];


for(let i=0;i<tamaño;i++){


let fila=[];


for(let j=0;j<tamaño;j++){


fila.push("");

}


tablero.push(fila);


}




// colocar palabras


palabras.forEach(p=>{


colocarPalabra(p);


});



// completar espacios


for(let i=0;i<tamaño;i++){

for(let j=0;j<tamaño;j++){


if(tablero[i][j]==""){


tablero[i][j]=
String.fromCharCode(
65+Math.floor(Math.random()*26)
);


}


}


}




mostrarTablero();


}





// ===============================
// COLOCAR PALABRAS
// ===============================
function colocarPalabra(palabra){

let direcciones=[
[0,1],
[1,0],
[1,1],
[-1,1]
];


for(let intento=0; intento<500; intento++){


let direccion=
direcciones[
Math.floor(Math.random()*direcciones.length)
];


let fila=
Math.floor(Math.random()*tamaño);


let col=
Math.floor(Math.random()*tamaño);



let puede=true;



for(let i=0;i<palabra.length;i++){


let nuevaFila=fila+(direccion[0]*i);

let nuevaCol=col+(direccion[1]*i);



if(
nuevaFila<0 ||
nuevaFila>=tamaño ||
nuevaCol<0 ||
nuevaCol>=tamaño
){

puede=false;

break;

}



if(
tablero[nuevaFila][nuevaCol]!="" &&
tablero[nuevaFila][nuevaCol]!=palabra[i]
){

puede=false;

break;

}



}




if(puede){


for(let i=0;i<palabra.length;i++){


let nuevaFila=fila+(direccion[0]*i);

let nuevaCol=col+(direccion[1]*i);


tablero[nuevaFila][nuevaCol]=palabra[i];


}


return true;


}


}


return false;


}


// ===============================
// MOSTRAR TABLERO
// ===============================


function mostrarTablero(){


let div=document.getElementById("tablero");


div.innerHTML="";


for(let i=0;i<tamaño;i++){


for(let j=0;j<tamaño;j++){


let letra=document.createElement("div");


letra.className="letra";


letra.innerHTML=tablero[i][j];


letra.dataset.fila=i;

letra.dataset.col=j;



letra.onclick=function(){


seleccionar(letra);


};



div.appendChild(letra);


}


}



}





// ===============================
// SELECCIONAR LETRAS
// ===============================


function seleccionar(celda){


celda.classList.toggle("seleccionada");


let texto=


Array.from(
document.querySelectorAll(".seleccionada")
)
.map(x=>x.innerHTML)
.join("");



buscarPalabra(texto);



}





// ===============================
// BUSCAR PALABRA
// ===============================


function buscarPalabra(texto){


palabras.forEach(p=>{


if(texto==p && !encontradas.includes(p)){


encontradas.push(p);


puntaje+=10;



document.getElementById("puntaje")
.innerHTML=puntaje;



marcarPalabra();



actualizarLista();



verificarFinal();



}



});


}




function marcarPalabra(){


document.querySelectorAll(".seleccionada")
.forEach(x=>{


x.classList.remove("seleccionada");

x.classList.add("encontrada");


});


}




function actualizarLista(){


document.querySelectorAll("#listaPalabras li")
.forEach(li=>{


if(encontradas.includes(li.innerHTML)){

li.classList.add("correcta");

}


});


}





// ===============================
// CRONÓMETRO
// ===============================


function iniciarTiempo(){


clearInterval(reloj);


segundos=0;


reloj=setInterval(()=>{


segundos++;


let min=Math.floor(segundos/60);

let seg=segundos%60;


document.getElementById("tiempo")
.innerHTML=

String(min).padStart(2,"0")
+":"+
String(seg).padStart(2,"0");


},1000);



}





// ===============================
// FINAL DEL JUEGO
// ===============================


function verificarFinal(){



if(encontradas.length==palabras.length){


clearInterval(reloj);



let minutos=Math.floor(segundos/60);

let seg=segundos%60;



document.getElementById("resultado").innerHTML=


`
🎉 FELICIDADES ${nombreEstudiante}

<br><br>

🔎 Palabras encontradas:
${encontradas.length}/${palabras.length}

<br><br>

⭐ Puntaje final:
${puntaje} puntos

<br><br>

⏱ Tiempo:
${minutos} minutos ${seg} segundos

`;



}



}





// ===============================
// REINICIAR
// ===============================


function reiniciarJuego(){


clearInterval(reloj);


encontradas=[];

puntaje=0;

segundos=0;


document.getElementById("puntaje").innerHTML=0;

document.getElementById("tiempo").innerHTML="00:00";


document.getElementById("resultado").innerHTML="";


crearTablero();


}
