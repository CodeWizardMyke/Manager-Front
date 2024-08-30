
const FieldsFormCreateProducts = [
  {
    inputConfig:{type:'text',name:"title",txtValue:"Nome do produto"},
    cssConfig:{formGroup:"w-20"}
  },
  {
    inputConfig:{type:'text',name:"official_store_name",txtValue:"Nome da Loja Oficial"},
    cssConfig:{formGroup:"w-20"}
  },
  {
    inputConfig:{type:'text',name:"category",txtValue:"Categoria"},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'text',name:"brand",txtValue:"Marca"},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'select',name:"gender",txtValue:"Gênero",selectOptions:[
      {value:'unisex', txtValue:"Unisex"},
      {value:'female', txtValue:"Feminino"},
      {value:'male', txtValue:"Masculino"},
    ]},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'text',name:"GTIN",txtValue:"GTIN"},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'select',name:"item_condittion",txtValue:"Condição",selectOptions:[
      {value:'new', txtValue:"Novo"},
      {value:'common', txtValue:"Comum"},
    ]},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'text',name:"line",txtValue:"Linha"},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'text',name:"NET_VOLUM",txtValue:"Volume Líquido"},
    cssConfig:{formGroup:"w-15"}
  },
  {
    inputConfig:{type:'date',name:"winner_item_id",txtValue:"Data vencimento"},
    cssConfig:{formGroup:"w-15"}
  },
]
export default FieldsFormCreateProducts;
