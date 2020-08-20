//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const {
  conn,
  Product,
  Category,
  Colors,
  stockXColor,
  User,
  Orden,
  lineaDeOrden,
  Review
} = require("./src/models/index.js");
var Promise = require("bluebird");
//const images = require("../images");
//Products

const productos = [
  {
    name: "Pulsera Noruega",
    description:
      "Pulsera en gamuza con cristal de roca facetado, agatas y detalles de metal.",
    price: "1050",
    idCategory: "5",
    keywords: "pulseras,gamuza,agatas,metal,piedras,cristales",
    image: "urlFotoCollar",
  }, //1
  {
    name: "Collar Toledo",
    description:
      "Collar doble de metal con piedra agata y borla de metal.",
    price: "1250",
    idCategory: "1",
    keywords: "collares,cortos,agata,metal,borla",
    image: "urlFoto",
  }, //2
  {
    name: "Aro Argolla Strass",
    description: "Aro argollas de cristal facetado con strass.",
    price: "650",
    idCategory: "6",
    keywords: "strass,aros,argollas,fiesta,noche",
    image: "urlFotoAritos",
  }, //3
  {
    name: "Pulsera Medieval",
    description:
      "Pulsera diseñada con cristales de roca facetados y detalles de metal.",
    price: "990",
    idCategory: "5",
    keywords: "pulseras,metal,cristales",
    image: "urlFoto",
  }, //4
  {
    name: "Collar Rusia",
    description: "Collar de cristal de roca facetado con detalles de metal.",
    price: "1490",
    idCategory: "1",
    keywords: "collares,cortos,cristales,negro,noche,fiesta",
    image: "c-rusia-boreal2.jpg",
  },//5
  {
    name: "Pulsera Quebec",
    description:
      "Pulsera elastizada triple de cristal de roca facetado, con detalles de metal.",
    price: "850",
    idCategory: "5",
    keywords:
      "pulseras,elastizada,triple,metal,cristales,brazalete,fiesta,noche",
    image: "urlFoto",
  }, //6  
  {
    name: "Collar India",
    description:
      "Collar largo de madera, critales y hematite con borla y detalles de metal.",
    price: "870",
    idCategory: "2",
    keywords: "collares,largos,cristales,negro,blanco,madera,bohemio,hippie",
    image: "c-india_bco2.jpg",
  }, //7
  {
    name: "Choker zig-zag",
    description:
      "Choker con diseño en zig-zag y detalles de metal, confeccionado en perlas o metal color niquel.",
    price: "690",
    idCategory: "3",
    keywords: "chokers,perlas,metal,niquel,gargantillas",
    image: "urlFoto",
  },//8
  {
    name: "Pulsera Cubos",
    description: "Pulsera en gamuza con cristales cúbicos y detalles de metal.",
    price: "1150",
    idCategory: "5",
    keywords: "pulseras,gamuza,metal,cristales,cubos,cúbicos,cuadrados",
    image: "urlFotoPulsera",
  },//9
  {
    name: "Rosario de perlas",
    description:
      "Rosario chico de perlas con cruz y detalles de metal.",
    price: "750",
    idCategory: "4",
    keywords: "rosarios,perlas,cruz,metal,cruces",
    image: "urlFoto",
  }, //10
  {
    name: "Aro Borla Cristal",
    description:
      "Aro borla de metal y cristal facetado.",
    price: "720",
    idCategory: "6",
    keywords: "aro,metal,cristal,borla,cristales",
    image: "urlFoto",
  }, //11
  {
    name: "Pulsera Nepal",
    description:
      "Pulsera triple de cuero trenzado con cristales. Se adapta a distintas medidas.",
    price: "1750",
    idCategory: "5",
    keywords: "pulseras,cuero,cristales,tai,pulsera,brazalete",
    image: "urlFoto",
  }, //12
];

const stockColor = [
  // PRODUCTO UNO ---- 2 colores para un mismo producto
  {
    cantidad: "3",
    image: "p-noruega-negro.jpg",
    main: true,
    productId: "1",
    colorId: "1",
  }, // mismo producto, cambio color
  {
    cantidad: "7",
    image: "p-noruega-rojo.jpg",
    productId: "1",
    colorId: "2",
    main: false,
  }, //PRODUCTO DOS ==========================================================================
  {
    cantidad: "2",
    image: "c-toledo.jpg",
    main: true,
    productId: "2",
    colorId: "9",
  },
  //PRODUCTO TRES ==========================================================================
  {
    cantidad: "3",
    image: "a-argolla-strass-negro.jpg",
    main: true,
    productId: "3",
    colorId: "1",
  }, 
  {
    cantidad: "2",
    image: "a-argolla-strass-ambar.jpg",
    main: false,
    productId: "3",
    colorId: "4",
  },
  //PRODUCTO CUATRO =======================================================================
  {
    cantidad: "8",
    image: "p-medieval-ambar.jpg",
    productId: "4",
    colorId: "4",
    main: true,
  },
  {
    cantidad: "16",
    image: "p-medieval-humo.jpg",
    productId: "4",
    colorId: "5",
    main: false,
  }, //PRODUCTO CINCO =========================================================================
  {
    cantidad: "1",
    image: "c-rusia-negro.jpg",
    main: true,
    productId: "5",
    colorId: "1",
  }, 
  {
    cantidad: "2",
    image: "c-rusia-boreal.jpg",
    main: false,
    productId: "5",
    colorId: "10",
  }, //PRODUCTO SEIS ==========================================================================
  {
    cantidad: "8",
    image: "p-quebec-humo.jpg",
    productId: "6",
    colorId: "5",
    main: true,
  },
  {
    cantidad: "16",
    image: "p-quebec-azul.jpg",
    productId: "6",
    colorId: "6",
    main: false,
  }, //PRODUCTO SIETE =========================================================================
  {
    cantidad: "2",
    image: "c-india-negro.jpg",
    main: true,
    productId: "7",
    colorId: "1",
  },
  {
    cantidad: "3",
    image: "c-india-bco.jpg",
    main: false,
    productId: "7",
    colorId: "12",
  },  //PRODUCTO OCHO ==========================================================================
  {
    cantidad: "3",
    image: "ch-zz-niquel.jpg",
    main: true,
    productId: "8",
    colorId: "5",
  }, 
  {
    cantidad: "1",
    image: "ch-zz-perla.jpg",
    main: false,
    productId: "8",
    colorId: "11",
  },//PRODUCTO NUEVE ==========================================================================
  {
    cantidad: "5",
    image: "cubos-gamuza.jpg",
    productId: "9",
    colorId: "3",
    main: true,
  },
  // cambio de color
  {
    cantidad: "1",
    image: "cubos-gamuza2.jpg",
    productId: "9",
    colorId: "4",
    main: false,
  }, //PRODUCTO DIEZ ===========================================================================
  {
    cantidad: "4",
    image: "r-perla-chico.jpg",
    main: true,
    productId: "10",
    colorId: "11",
  },//PRODUCTO ONCE ==========================================================================
  {
    cantidad: "2",
    image: "a-borla-boreal.jpg",
    main: true,
    productId: "11",
    colorId: "10",
  },//PRODUCTO DOCE ==========================================================================
  {
    cantidad: "2",
    image: "p-nepal-boreal.jpg",
    main: false,
    productId: "12",
    colorId: "10",
  },
  {
    cantidad: "1",
    image: "p-nepal-negro.jpg",
    main: true,
    productId: "12",
    colorId: "1",
  }//======================================================================================
];

const colores = [
  { name: "Negro", hexaColor: "#000000" }, //1
  { name: "Rojo", hexaColor: "#ff3636" }, //2
  { name: "Aqua", hexaColor: "#9bcfcb" },
  { name: "Ambar", hexaColor: "#f5b277" },
  { name: "Humo", hexaColor: "#b4b0b0" },
  { name: "Azul", hexaColor: "#2329ff" },
  { name: "Uva", hexaColor: "#25173a" },          //ID  7
  { name: "Peltre", hexaColor: "#061126" },
  { name: "Niquel", hexaColor: "#c9c9c9" },
  { name: "Transparente", hexaColor: "#efefef" }, //ID  10
  { name: "Perla", hexaColor: "#f6edea" },
  { name: "Blanco", hexaColor: "#fffff" },
];
const categorias = [
  { name: "Collares cortos" }, //1
  { name: "Collares largos" }, //2
  { name: "Chokers" },
  { name: "Rosarios" },
  { name: "Pulseras" },
  { name: "Aros" },
];
const ordenes = [
  { state: "completo", fecha: "10/06/2020", userId: "2" },
  { state: "completo", fecha: "24/05/2020", userId: "1" },
  { state: "completo", fecha: "20/04/2020", userId: "3" },
  { state: "cancelado", fecha: "12/03/2020", userId: "4" },
  { state: "completo", fecha: "14/01/2020", userId: "1" },
  { state: "creado", fecha: "14/07/2020", userId: "4" },
  { state: "completo", fecha: "04/06/2020", userId: "3" },
];
const lineaOrden = [
  { cantidad: "1", price: "1050", stockXColorId: "1", ordenId: "1" },
  { cantidad: "2", price: "1150", stockXColorId: "5", ordenId: "1" },
  { cantidad: "1", price: "850", stockXColorId: "3", ordenId: "2" },
  { cantidad: "1", price: "650", stockXColorId: "8", ordenId: "2" },
  { cantidad: "1", price: "690", stockXColorId: "6", ordenId: "3" },
  { cantidad: "2", price: "1150", stockXColorId: "2", ordenId: "3" },
  { cantidad: "1", price: "750", stockXColorId: "10", ordenId: "3" },
  { cantidad: "1", price: "1250", stockXColorId: "9", ordenId: "4" },
  { cantidad: "2", price: "990", stockXColorId: "4", ordenId: "4" },
  { cantidad: "1", price: "1490", stockXColorId: "7", ordenId: "5" },
  { cantidad: "1", price: "1150", stockXColorId: "2", ordenId: "6" },
  { cantidad: "1", price: "720", stockXColorId: "11", ordenId: "7" },

];
const usuarios = [
  {
    name: "Gisella Alaniz",
    email: "gisella@gmail.com",
    password: "cualquiera",
    adress: "calle 1",
    role: "admin"
  },
  {
    name: "Leandro Arévalo",
    email: "leandro@gmail.com",
    password: "cualquiera",
    adress: "calle 2",
    role: "admin"
  },
  {
    name: "Florencia Ciccione",
    email: "florencia@gmail.com",
    password: "cualquiera",
    adress: "calle 3",
    role: "admin"
  },
  {
    name: "Juan Galarce",
    email: "juan@gmail.com",
    password: "cualquiera",
    adress: "calle 4",
    role: "admin"
  },
  {
    name: "Juana Martin",
    email: "juana@gmail.com",
    password: "cualquiera",
    adress: "calle 5",
  },
  {
    name: "María José Gonzalez",
    email: "maria@gmail.com",
    password: "cualquiera",
    adress: "calle 6",
  },
  {
    name: "Silvana Perez",
    email: "silvana@gmail.com",
    password: "cualquiera",
    adress: "calle 7",
  },
];
const reviews = [
  {
    id: "1",
    title: "Me gusto mucho!",
    review: "No me la saco desde que la compre!",
    ranking: "5",
    idUsuario:"1",
    idProduct: "4"
  },
  {
    id: "2",
    title: "Buen producto",
    review: "Me gusto mucho el color!",
    ranking: "4",
    idUsuario:"2",
    idProduct: "1"
  },
  {
    id: "3",
    title: "Muy lindo",
    review: "Siempre que lo uso me lo ponderan",
    ranking: "5",
    idUsuario:"6",
    idProduct: "8"
  },
  {
    id: "4",
    title: "Me encantaron!",
    review: "Re lindos los aros, me gustaron mucho",
    ranking: "5",
    idUsuario:"2",
    idProduct: "3"
  },
  {
    id: "5",
    title: "Muy contenta con mi compra",
    review: "Me gusto mucho el producto, mejor de lo que esperaba!",
    ranking: "5",
    idUsuario:"3",
    idProduct: "2"
  },
  {
    id: "6",
    title: "Hermoso",
    review: "Estoy encantada con el collar, muy lindo y bien terminado. Muy recomendable.",
    ranking: "4",
    idUsuario:"7",
    idProduct: "5"
  },
];

var promises = [];
var promises2 = [];
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  colores.forEach(function (col) {
    promises.push(Colors.create(col));
  });

  categorias.forEach(function (cat) {
    promises.push(Category.create(cat));
  });
  usuarios.forEach(function (user) {
    promises.push(User.create(user));
  });
  Promise.all(promises)
    .then(function () {
      productos.forEach(function (pro) {
        promises2.push(Product.create(pro));
      });
      ordenes.forEach(function (or) {
        promises2.push(Orden.create(or));
      });

      Promise.all(promises2)
        .then(function () {
          stockColor.forEach((sto) => stockXColor.create(sto));
          lineaOrden.forEach((lineor) => lineaDeOrden.create(lineor));
          reviews.forEach((rev) => Review.create(rev));
        })
        .catch(function (err) {
          console.log("Ocurrió un error al cargar productos u ordenes" + err);
        });
    })
    .catch(function (err) {
      console.log(
        "Ocurrió un error al cargar colores,categorias o usuarios" + err
      );
    });

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
