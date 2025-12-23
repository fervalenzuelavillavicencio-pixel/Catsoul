// Variables globales
var carrito = [];
var contador = 0;
var total = 0;

// Cargar carrito desde localStorage al iniciar
function cargarCarrito() {
    var carritoGuardado = localStorage.getItem('carritoCatsoul');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        calcularTotales();
    }
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carritoCatsoul', JSON.stringify(carrito));
}

// Calcular contador y total
function calcularTotales() {
    contador = carrito.length;
    total = 0;
    for (var i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }
}

function añadirAlCarrito(idProducto) {
    var productoNombre = "";
    var productoPrecio = 0;
    var mensajeEspecial = "";
    
    // Mapeo de productos
    if (idProducto == 1) {
        productoNombre = "Polera 'Mi Compañero Fiel'";
        productoPrecio = 15990;
        mensajeEspecial = "✨ ¡Tu peludito estará siempre contigo!";
    } else if (idProducto == 2) {
        productoNombre = "Polera 'Amor Duplicado'";
        productoPrecio = 18990;
        mensajeEspecial = "✨ ¡Doble amor, doble felicidad!";
    } else if (idProducto == 3) {
        productoNombre = "Polerón 'Abrazo Bordado'";
        productoPrecio = 22990;
        mensajeEspecial = "✨ ¡Calidez con estilo felino!";
    } else if (idProducto == 4) {
        productoNombre = "Polerón 'Comodidad Élite'";
        productoPrecio = 25990;
        mensajeEspecial = "✨ ¡Elegancia premium para ti!";
    } else if (idProducto == 5) {
        productoNombre = "Polerón 'Doble Magia'";
        productoPrecio = 28990;
        mensajeEspecial = "✨ ¡Doble bordado, impacto garantizado!";
    }
    
    var producto = {
        id: idProducto,
        nombre: productoNombre,
        precio: productoPrecio,
        mensaje: mensajeEspecial
    };
    
    // Añadir al carrito
    carrito.push(producto);
    
    // Guardar en localStorage
    guardarCarrito();
    
    // Actualizar visualmente
    actualizarCarrito();
    
    // Mostrar notificación
    mostrarNotificacion(productoNombre, productoPrecio, mensajeEspecial);
}

function mostrarNotificacion(nombre, precio, mensaje) {
    // Crear notificación flotante
    var notificacion = document.createElement('div');
    notificacion.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #000; color: #D4AF37; padding: 20px; border-radius: 10px; border: 2px solid #D4AF37; z-index: 10000; max-width: 300px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); animation: slideIn 0.3s ease-out;';
    
    notificacion.innerHTML = '<div style="font-weight:bold; font-size:18px; margin-bottom:10px;">✅ Añadido al carrito</div><div style="margin-bottom:5px;">' + nombre + '</div><div style="color:#FFD700; font-size:20px; font-weight:bold; margin:10px 0;">💰 $' + precio.toLocaleString('es-CL') + '</div><div style="font-style:italic; font-size:14px;">' + mensaje + '</div>';
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(function() {
        notificacion.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(function() {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

function actualizarCarrito() {
    // Calcular totales
    calcularTotales();
    
    // Actualizar contador en todas las páginas
    var elementosContador = document.querySelectorAll("#contador");
    elementosContador.forEach(function(elemento) {
        if (elemento) {
            elemento.textContent = contador;
        }
    });
    
    // Actualizar vista del carrito (solo en carrito.html)
    var listaCarrito = document.getElementById("carrito-items");
    var elementoTotal = document.getElementById("total-precio");
    
    if (listaCarrito && elementoTotal) {
        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<div style="text-align:center; padding:40px;"><p style="font-size:20px; color:#D4AF37;">Tu carrito está vacío</p><p style="margin-top:15px;">¡Descubre nuestras prendas bordadas con amor!</p><button onclick="seguirComprando()" style="margin-top:20px;">✨ Ver Productos</button></div>';
        } else {
            var html = "<h2 style='color:#D4AF37; text-align:center; margin-bottom:20px;'>Tus Productos Seleccionados</h2>";
            
            for (var i = 0; i < carrito.length; i++) {
                var producto = carrito[i];
                html += '<div style="border:2px solid #D4AF37; padding:20px; margin:15px 0; border-radius:12px; background-color:#fffaf0; display:flex; justify-content:space-between; align-items:center; box-shadow:0 4px 12px rgba(212,175,55,0.1);">';
                html += '<div style="flex:1;">';
                html += '<p style="font-size:18px; font-weight:bold; color:#000; margin-bottom:5px;">' + producto.nombre + '</p>';
                html += '<p style="color:#D4AF37; font-size:20px; font-weight:bold; margin-bottom:5px;">💰 $' + producto.precio.toLocaleString('es-CL') + '</p>';
                html += '<p style="color:#666; font-style:italic; font-size:14px;">' + producto.mensaje + '</p>';
                html += '</div>';
                html += '<button onclick="eliminarDelCarrito(' + i + ')" style="background:#ff4444; color:white; border:none; padding:8px 15px; border-radius:6px; cursor:pointer; font-size:14px; margin-left:15px;">🗑️ Eliminar</button>';
                html += '</div>';
            }
            
            listaCarrito.innerHTML = html;
            elementoTotal.textContent = total.toLocaleString('es-CL');
        }
    }
}

function eliminarDelCarrito(index) {
    if (confirm("¿Eliminar este producto del carrito?")) {
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
    }
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito ya está vacío");
        return;
    }
    
    var confirmar = confirm("¿Estás seguro de vaciar el carrito?\n\nSe eliminarán " + contador + " producto(s) por un total de $" + total.toLocaleString('es-CL'));
    
    if (confirmar) {
        carrito = [];
        localStorage.removeItem('carritoCatsoul');
        actualizarCarrito();
        alert("Carrito vaciado ✅");
    }
}

function seguirComprando() {
    window.location.href = "productos.html";
}

function comprar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío\n\nDescubre nuestras prendas bordadas con amor ❤️");
        return;
    }
    
    var resumen = "¡GRACIAS POR TU COMPRA EN CATSOUL! 🎉\n\n";
    resumen += "Resumen de tu pedido:\n\n";
    
    for (var i = 0; i < carrito.length; i++) {
        resumen += "• " + carrito[i].nombre + " - $" + carrito[i].precio.toLocaleString('es-CL') + "\n";
    }
    
    resumen += "\nTotal: $" + total.toLocaleString('es-CL') + "\n\n";
    resumen += "catsoul.oficial@gmail.com\n";
    resumen += "Instagram: @catsoul.oficial\n\n";
    resumen += "¡Gracias por confiar en Catsoul! Te contactaremos pronto para confirmar tu pedido.";
    
    // Mostrar  confirmación
    var modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000;';
    
    modal.innerHTML = '<div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; border: 3px solid #D4AF37;"><h2 style="color: #000; margin-bottom: 20px;">🎉 ¡Compra Exitosa!</h2><div style="text-align: left; margin-bottom: 25px;"><p>' + resumen.replace(/\n/g, '<br>') + '</p></div><button onclick="finalizarCompra()" style="background: #000; color: #D4AF37; border: 2px solid #D4AF37; padding: 12px 30px; border-radius: 8px; font-size: 16px; cursor: pointer; margin-right: 10px;">✅ Finalizar</button><button onclick="seguirComprando()" style="background: transparent; color: #000; border: 2px solid #000; padding: 12px 30px; border-radius: 8px; font-size: 16px; cursor: pointer;">🛒 Seguir comprando</button></div>';
    
    document.body.appendChild(modal);
}

// INICIALIZACIÓN DEL CARRITO AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();  // Cargar carrito desde localStorage
    actualizarCarrito();  // Actualizar visualmente
});

// Función para finalizar compra
function finalizarCompra() {
    alert('¡Gracias por tu compra! Te contactaremos pronto.');
    carrito = [];
    localStorage.removeItem('carritoCatsoul');
    actualizarCarrito();
    window.location.href = 'index.html';
}