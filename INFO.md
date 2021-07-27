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

  ## Bugs

  -si elegis new y trening o en un futuro el descuento se colocan uno arriba del otro, deberian verse uno abajo del otro, se arregla creando un div que se posiione absolute sobre la imagen y que dentro se vayan disponiendo de manera normal, uno abajo del otro los modificadores estos
