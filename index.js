const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const prodectModel = require("./model/prodectModel");
const app = express()


app.use(cors())
app.use(express.json())
mongoose.connect(`mongodb+srv://arvind_varma:arvind_varma@cluster0.vn12nqf.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log(`DATABASE__CONNECTED`);
}).catch((err) => {
    console.log(err.message);
    process.exit(1);
})

app.post('/product', async (req, res) => {
    console.log(req.body);
    const newProduct = await prodectModel.create({
        ...req.body
    })
    res.send(newProduct)
})


app.get('/products', async (req, res) => {


    const product = await prodectModel.find({})

    res.send(product)



})

app.get('/search', async (req, res) => {
    const { q } = req.query;



    const product = await prodectModel.find({
        $or: [
            { subCategory: q },
            { category: q },
            { name: q },

        ]
    })

    res.send(product)



})


app.get('/product/category', async (req, res) => {
    const category = req.query;
    // console.log(search);
    const product = await prodectModel.find(category)

    res.send(product)
})


app.get('/product/subcategory', async (req, res) => {
    const { category, subCategory } = req.query;
    console.log(category, subCategory);

    if(subCategory=="All product"){
     const product = await prodectModel.find(
           
                { category }
          
        )
    
        res.send(product)

    }else{
        const product = await prodectModel.find({
            $and: [
                { subCategory },
                { category }
            ]
        })
    
        res.send(product)
    }
  

})





app.listen(process.env.PORT, () => {
    console.log(`server start ${process.env.PORT}`);
})