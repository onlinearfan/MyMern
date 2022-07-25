const Product = require('../model/productModel');

//create products -- Admin only
exports.createProducts = async (req, res) => {
   //    console.log(req.body);
   const product = await Product.create(req.body);

   res.status(200).json({
      success: true,
      product,
   });
};

//get all products
exports.getAllProducts = async (req, res) => {
   const product = await Product.find();
   res.status(200).json({ success: true, product });
};

//get single product details 
exports.getSingleProduct = async (req,res)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found",
        })
    }
    res.status(200).json({
        success:true,
        message:"single product details find",
        product
    })
}

//Update Products,
exports.updateProducts = async (req, res, next) => {
   console.log(req.params.id);
   let product = await Product.findById(req.params.id);
   console.log(product);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: 'product not found',
      });
   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });
   console.log(product);
   res.status(200).json({
      success: true,
      message: 'update successfully',
      product,
   });
};

//product delete -- Admin
exports.deleteProduct = async (req, res, next) => {
   console.log(req.params.id);
   let product = await Product.findById(req.params.id);
   console.log(product);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: 'product not found',
      });
   }

   await product.remove();
   res.status(200).json({
      success: true,
      message: 'product delete',
      product,
   });
};
