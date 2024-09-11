
const FieldsFormCreateProducts = [
  {
    inputConfig:{type:'text',name:"title",txtValue:"Nome do produto"},
    cssConfig:{styleDiv:"form-group w-20"}
  },
  {
    inputConfig:{type:'text',name:"official_store_name",txtValue:"Nome da Loja Oficial"},
    cssConfig:{styleDiv:"form-group w-20"}
  },
  {
    inputConfig:{type:'text',name:"category",txtValue:"Categoria"},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'text',name:"brand",txtValue:"Marca"},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'select',name:"gender",txtValue:"Gênero",selectOptions:[
      {value:'unisex', txtValue:"Unisex"},
      {value:'female', txtValue:"Feminino"},
      {value:'male', txtValue:"Masculino"},
    ]},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'text',name:"GTIN",txtValue:"GTIN"},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'select',name:"item_condittion",txtValue:"Condição",selectOptions:[
      {value:'new', txtValue:"Novo"},
      {value:'common', txtValue:"Comum"},
    ]},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'text',name:"line",txtValue:"Linha"},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'text',name:"NET_VOLUM",txtValue:"Volume Líquido"},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'date',name:"winner_item_id",txtValue:"Data vencimento"},
    cssConfig:{styleDiv:"form-group w-15"}
  },
  {
    inputConfig:{type:'select',name:"currency_id",txtValue:"Moeda",
      selectOptions:[
        {value:"BRL",txtValue:"BRL"},
        {value:"USD",txtValue:"USD"}
      ]
    },
    cssConfig:{styleDiv:"form-group"}
  },
  {
    inputConfig:{type:'number',name:"price",txtValue:"Preço"},
    cssConfig:{styleDiv:"form-group"}
  },
  {
    inputConfig:{type:'number',name:"promotions",txtValue:"Desconto"},
    cssConfig:{styleDiv:"form-group"}
  },
  {
    inputConfig:{type:'number',name:"stock",txtValue:"Estoque"},
    cssConfig:{styleDiv:"form-group "}
  },
  {
    inputConfig:{type:'checkbox',name:"use_thumbnail",txtValue:"Usar Miniatura"},
    cssConfig:{}
  },
  {
    inputConfig:{type:'checkbox',name:"catalog_listing",txtValue:"Listagem no Catálogo"},
    cssConfig:{}
  },
  {
    inputConfig:{type:'checkbox',name:"discounts",txtValue:"Autorizar descontos"},
    cssConfig:{}
  },
]
export default FieldsFormCreateProducts;
