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
            { subCategory:{$regex: new RegExp(q, 'i')} },
            { q: {$regex: new RegExp(q, 'i')} },
            { name: {$regex: new RegExp(q, 'i')} },

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
   console.log(category, subCategory )
    try {
        let product;
    
        if (category !== '' && subCategory === 'All product') {
            // Get all products based on category (case-insensitive)
            product = await prodectModel.find({ category: { $regex: new RegExp(category, 'i') } });
        } else {
            // Get products based on specific category and subcategory (case-insensitive)
            product = await prodectModel.find({
                category: { $regex: new RegExp(category, 'i')  },
                subCategory: { $regex:  new RegExp(subCategory, 'i')  }
            });
        }
        
    
        console.log(product);
        res.send(product);
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).send('Server Error');
    }
});


app.delete('/del', async (req, res) => {
    const { id } = req.query;
 
   
             await prodectModel.findOneAndDelete({_id:id});
             res.send("send")

        })
app.listen(process.env.PORT, () => {
    console.log(`server start ${process.env.PORT}`);
})