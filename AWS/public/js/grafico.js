// let url = new URL(document.location.href);
// urln guarda lo que viene después del nombre de la URL
let urln = document.location.pathname;
//regTransform almacena el reemplazo que se hace con replace de lo que viene en urln
let regTransform = urln.replace(/\/lin\/grafico\//, '');
//nombreIndice almacena lo que viene de regTransform
const nombreIndice = regTransform;
//ctx almacena lo que viene de llamar al id chart en nuestro archivo HTML y obtiene un contexto para indicarle lo que hará el canvas
const ctx = document.querySelector('#chart').getContext('2d');
//image almacena una nueva clase llamada Image
const image = new Image();
//src lo que se le indica es la ruta de la imagen, en este caso se crea una imagen mediante código base 64
image.src = "data:image/png;base64,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";
//Esta constante se usa para indicarle a la librería chart.js que tiene que usar nuestra imagen como fondo en nuestro gráfico
const plugin = {
    //Se le asigna un id a la imagen 
    id: 'custom_canvas_background_image',
    //beforeDraw sirve para establecer lo que hará antes de dibujar la imagen
    beforeDraw: (chart) => {
        //El if hará que cuando la imagen esté totalmente cargada ejecutará lo que está dentro
        if (image.complete) {
            //Se le va a asignar a ctx lo que esté en chart en su propiedad de ctx
            const ctx = chart.ctx;
            //top, left, width, height son propiedades que vienen dentro de la propiedad chart llamada chartArea
            const {top, left, width, height} = chart.chartArea;
            //Son coordenadas para indicar el tamaño de la imagen
            const x = left + width / 2 - image.width / 2;
            const y = top + height / 2 - image.height / 2;
            //drawImage dibuja la imagen que los parámetros serían image: la imagen completa, x: el eje horizontal y y: el eje vertical
            ctx.drawImage(image, x, y);
        } else {
            //Si la imagen no está completa o está cargando volverá a ejecutar el dibujo
            image.onload = () => chart.draw();
        }
    }
};
//Se crea una función llamada totalChart que tiene dos parámetros: ctx y extraerdatos
function totalChart(ctx, extraerdatos){
    //Se creó chart con un new estableciendo que es una clase. A esa clase se le pasó un parámetro con un contexto y como segundo 
    //parámetro se le manda un objeto con diferentes propiedades. Estas propiedades son las que vienen incluidas dentro de la 
    //documentación de chart.js
    const chart = new Chart(ctx, {
        //type se usa para indicar el tipo de gráfico
        type: 'line',
        //data se usa para establecer los datos para llenar el gráfico
        data: {
            //labels son las etiquetas. En este caso se usa el parámetro que se envió a la función (extraerdatos) y se recorre
            //con map indicándole que cada ítem mediante return mande lo que está en la propiedad fecha
            labels: extraerdatos.map(item => {
                return item.fecha;
            }),
            //datasets se usa para establecer los datos que van a ser llenados 
            datasets: [{
                //label se usa para establecer el nombre del gráfico
                label: "Datos",
                //data se usa para establecer cada dato mediante map que será mostrado en el gráfico
                data: extraerdatos.map((item) => {
                    //Este if le indica a que si item.ingresos o item.ganancias es mayor que cero, mediante return lo muestre en el gráfico. Por el contrario no va a mostrarlo
                    if(item.datos > 0){
                        return item.datos;
                    }
                }),
                //borderColor establece el color del borde del gráfico y backgroundColor el color del fondo
                borderColor: extraerdatos[0].colorLinea,
                backgroundColor: extraerdatos[0].colorLinea,
            },]
        },
        //plugins se le asigna lo que estaba en la constante plugin
        plugins: [plugin],
        //options se usa para establecer las opciones sobre el gráfico
        options: {
            //layout se usa para establecer el esquema. En este caso establece un padding 0 para que no haya relleno y el gráfico se muestr completo
            layout: {
                padding: {
                    left: 0,
                    right: 0
                },
            },
            //
            interaction: {
                mode: 'index',
                intersect: false,
            },
            //responsive indica para hacer el gráfico para mobile también
            responsive: true,
            //maintainAspectRatio evita problemas de ratio al hacer el responsive
            maintainAspectRatio: false,
            //scales son las escalas del gráfico
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        /* callback: function(val, index) {
                            return index % 8 === 0 ? this.getLabelForValue(val) : '';
                        }, */
                        maxRotation: 0,
                    },
                },
                y: {
                    grid: {
                        display: false
                    },
                },
            },
            /* elements: {
                line: {
                    borderWidth: 9,
                    fill: false,
                },
                point: {
                    pointStyles: 'line'
                }
            }, */
            //Este plugins establece las configuraciones adicionales que rodean al gráfico 
            plugins: {
                title: {
                    display: false,
                    text: nombreIndice,
                    font: {
                        size: 15,
                    },
                    color: '#FFF',
                    padding: 30
                },
                //legend indica la leyenda que se mostrará sobre qué significa cada barra del gráfico
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        boxWidth: 15,
                        boxHeight: 15,
                        color: '#797b86',
                        font: {
                            family: 'system-ui',
                            size: 15
                        },
                    }
                },
                //tooltip es lo que sucede cuándo se hace hover sobre el gráfico
                tooltip: {
                    backgroundColor: '#0584f6',
                    titleFontSize: 20,
                    xPadding: 20,
                    yPadding: 20,
                    bodyFontSize: 15,
                    bodySpacing: 10,
                    mode: 'x'
                },
            }
        },
        
    });
}
//Esta función hace una llamada al servidor (por eso se utiliza async)
async function renderizarCharts() {
    //respuesta almacena mediante un await lo que viene en el servidor usando fetch para obtener los datos que necesitamos. En
    //este caso él se conecta a nuestro servidor express, se dirige a la dirección que se le indica y él nos enviará una respuesta

    const respuesta = await fetch(`/lin/graficos/grafico/` + nombreIndice).then((res) => {
        return res.json();
    }).then((json) => {
        //mediante then, que la retornamos como un JSON y luego con otro then guardamos ese JSON en nuestra variable extraerDatos
        var extraerDatos = json;
        //Con esto llamamos a la función totalChart y le mandamos los parámetros ctx y lo que se encuentra en extraerDatos que trajo
        //del server
        totalChart(ctx, extraerDatos);
    });
}
//renderizarCharts llama a la función al iniciar el programa
renderizarCharts();