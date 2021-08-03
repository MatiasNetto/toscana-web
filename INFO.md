#PROJECT INFO

- Design
  > https://www.figma.com/file/fowD5gEu0fzEy5upNG1EPi/Toscana?node-id=0%3A1

---

## H ORDER

- H1

  > Solamente para el nombre de la marca

- H2

  > "Accesorios" y nombres de categorias

- H3

  > Titulos en general y nombre de los productos

  ## Product propieties

  -id
  -order
  -model
  -category
  -description
  -price
  -imgsPath
  -imgsURL

  -new----------------------//indica si el producto es nuevo, en caso de ser asi coloca una etiqueta que dice "new"
  -trending-----------------//Indica si el producto esta en tendencia o no, de ser asi coloca una etiqueta que dice "en tendencia" o "lo mas vendido"
  -outOfStock---------------//Indica si esta fuera de stock o no, en caso de estarlos coloca la imagen en blanco y negro y una barra que dice fuera de stock
  -offer--------------------//indica si esta en oferta, se ingresa el precio con descuento y el programa genera el porcentaje
  -hidden-------------------//Indica si esta oculto, en caso de estarlo no se listara en los productos

  ## Add

  - en el add menu agregar una especie de preview de como seria el producto a medida que se van agregando los datos
  - funcionalidad para poner descuentos
  - en el formulario para agregar imagenes que se pueda arrastrar y soltar las imagenes desde el explorador
  - la posibilidad de elegir cual sera la imagen que se mostrara comp preview del producto
  - un buen mensaje en caso de que no se encunetre la categoria o el producto deseado con un link
  - personalizacion slider

  ## Optimizacions

  - creo que en el hook useGetProductsCollection se podran suplantar todas las peticiones con filtros por pedir una sola vez todos los elementos y despues ir ordenandolos por propiedades tal como se hace cunado se traen los productos normales pero con todos los campos, estilo new, outOfStock, etc

  - al momento de crear un nuevo producto y subirlo, que las imagenes se suban cuando se le da a agregar producto, asi no existirian problemas en el caso de elegir las imagenes y posteriormente cambiar el nombre del producto

  ## Bugs

  -en add y edit products en mobile al abrir el teclado los campos se achican, hay que cambiar los tomanos de los mismos por vw en vez de vh en su version mobile

## CORRECCIONES
