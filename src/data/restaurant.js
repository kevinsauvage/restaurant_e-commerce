const items = [
  {
    name: 'Honest green',
    address: 'Rambla de Catalunya, 3, 08007 Barcelona',
    type: 'Health food restaurant',
    image:
      'https://res.cloudinary.com/glovoapp/w_450,h_250,c_fill,f_auto,q_30/Stores/fnxwywmbkytlvpg6mk9k',
    products: [
      {
        title: 'Tostadas',
        items: [
          {
            stripe_id: 'prod_LVR3P4TU9r7YYp',
            name: 'Avocado tahini',
            description:
              'Aguacate, sal Maldon, brotes, ají deshidratado, salsa tahini y lima',
            price: '4,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ewqovcmtb571ugfm3hfx',
          },
          {
            stripe_id: 'prod_LVR59sS42EF34q',
            name: 'Honest pan tumaca',
            description:
              'Tomate cherry, salmorejo, plant based feta, albahaca, aceite de oliva virgen extra y espirulina (plant based)',
            price: '3,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/aipfnhcevomm1elv8dmf',
          },
          {
            name: 'Honest tahini',
            description: 'Hummus de la semana, salsa tahini',
            price: '3,50',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/zilsnuojhfoqh9m9s50n',
          },
          {
            stripe_id: 'prod_LVR6BatsOg5t8l',
            name: 'Huevos Florentine con Salmón',
            description:
              'Un huevo de corral escalfado, espinaca salteada, espárragos, salmón ahumado, salsa holandesa plant based y flores comestibles.',
            price: '6,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ams33r7szlvnparfrqe7',
          },
          {
            stripe_id: 'prod_LVR6BatsOg5t8l',
            name: 'Huevos Benedict con Portobello Trufado',
            description:
              'Dos huevos de corral escalfados, setas portobello salteadas, trufa natural, salsa holandesa plant based y bacon de coco.',
            price: '5,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/l0mmywqjfjjdihfqcrmz',
          },
        ],
      },
      {
        title: 'Bowls',
        items: [
          {
            name: 'Açaí bowl (solo en desayunos)',
            description:
              'Açaí bowl de plátano, bayas frescas, semillas de cáñamo, keto granola con nueces de macadamia, hecho en casa y sin azucares.',
            price: '7,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/x9sjnnorvjzluavqiprb',
          },
          {
            name: 'Plant based rose yogurt goodness',
            description:
              'Yogurt hecho en casa a base de leches vegetales, probióticos, flor de rosas, fruta fresca, keto granola con nueces de macadamia, almendra tostada y salsa de frutas del bosque.',
            price: '5,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/sj9khmloze1nan4vpgpg',
          },
          {
            name: 'Protein power overnight oats',
            description:
              'Porridge de avena y quinoa tricolor remojado durante un día en leche de coco, fruta de temporada, almendras, quinoa caramelizada y bayas de gojí (plant based, gluten free)',
            price: '5,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/vjq0ncffjzmlvynaahwh',
          },
          {
            name: 'Chia berry detox pudding',
            description:
              'Pudding chía hecho en casa con leche de coco, frutos rojos, plátano, leche de almendra, keto granola con nueces de macadamia hecha en casa y almendra tostada.',
            price: '5,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/psuq3ga65sxgjksirczq',
          },
          {
            name: 'Smoothy Azul & Rojo',
            description:
              'Smoothie de espirulina azul y rojo, fruta fresca, keto granola con nueces de macadamia hecha en casa, coco rallado, fruta de la pasión y flores comestibles.',
            price: '5,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/b6e5jimaflsr18zpeanx',
          },
        ],
      },
      {
        title: 'Snacks',
        items: [
          {
            name: 'Almond protein balls',
            description:
              'Dátiles, almendras, coco deshidratado, semillas de chia y quinoa tricolor',
            price: '2,00',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/trgrj26a4cwq128klzbq',
          },
          {
            name: 'Chia açaí detox',
            description:
              'Chia, leche de coco y almendras, frutas de bosque, açaí, almendra laminada, coco y fruta fresca',
            price: '4,50',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ndarmx3yuffaqqmkcoau',
          },
          {
            name: 'Cupcake vanilla caramel cream',
            description:
              'De vanilla caramel relleno de red velvet, nata de cacao y avellanas caramelizadas',
            price: '4,00',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/mwkroqbkxwit2hqd0nxx',
          },
          {
            name: 'Cupcake Honest red velvet',
            description:
              'De chocolate, crema de remolacha y relleno de nata de vainilla tofu',
            price: '4,00',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ljcp1whrbaosqjkhufwj',
          },
          {
            name: 'Chocolate chip cookie',
            description: 'Guilt free con sal Maldon',
            price: '4,00',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/sfbhzyttzhhn1iwe1kob',
          },
        ],
      },
      {
        title: 'Sweet',
        items: [
          {
            name: 'Raw duo de chocolate',
            description:
              'Tarta cruda de chocolate negro y blanco, frutas del bosque y nibs de cacao',
            price: '4,50',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ufdg9yysthshxrjxouee',
          },
          {
            name: 'Cauliflower mocha brownie',
            description: 'Con caramelo salado de tahini',
            price: '4,50',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/jozzwquqceknryeea4ir',
          },
          {
            name: 'Matcha love',
            description: 'Tarta de té matcha, maracuyá y aji deshidratado',
            price: '4,50',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/gujpmuka1yywps0lu9sh',
          },
          {
            name: 'Macadamia Miso Cheesecake',
            description: 'Coco, frambuesa y caramelo de miso',
            price: '4,50',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/wpykqgxhbukcvbfqhzmb',
          },
        ],
      },
      {
        title: 'Drinks',
        items: [
          {
            name: 'Yellow Kombucha (250 ml.)',
            description: 'Jengibre y limón ecológicos',
            price: '3,95',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ts4nnfzq9utelqam8ojp',
          },
          {
            name: 'Red Kombucha (250 ml.)',
            description: 'Arándanos, hibisco y fresas ecológicas',
            price: '3,95',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/v4w2cfsntyufdc2j2mwl',
          },
        ],
      },
      {
        title: 'Pancakes',
        items: [
          {
            name: 'Gluten Free Ricotta Pancake',
            description:
              'Cubierto con queso ricotta, sirope de arce, fruta fresca, bayas, almendras tostadas y granadas.',
            price: '5,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/cozsqxzot3gitoo9sfp5',
          },
          {
            name: 'Breakfast Burrito',
            description:
              'Tofu scramble, aguacate, pico de gallo, kale, maíz asado, creme fraîche plant based , bacon de coco, frijoles, cebolla morada encurtida y salsa chipotle.*Contiene gluten',
            price: '6,90',
            image:
              'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/oxwyacqy1n61t1fuo4yg',
          },
        ],
      },
    ],
  },
];
export default items;
