const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		return res.render('products', { products, toThousand });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
			const product = products.find(p => p.id === +req.params.id);
	
			return res.render('detail', { product, toThousand });
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form');
	},
	
	
	// Create -  Method to store
	create: (req, res) => {
		return res.render('product-create-form');
	},
	store: (req, res) => {
		// Do the magic
		const id = products[products.length - 1].id + 1;
		let productImg = "default-image.png";
		req.file && (productImg = req.file.filename);

		const newProduct = {
			id,
			name: req.body.name.trim(),
			price: +req.body.price,
			discount: +req.body.discount,
			category: req.body.category,
			description: req.body.description.trim(),
			image: productImg
		}
		const newProducts = [...products, newProduct];

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, 3), 'utf-8');

		return res.render('products', { products: newProducts, toThousand });
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const product = products.find(p => p.id === +req.params.id);
		return res.render('product-edit-form', { product });
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const productIndex = products.findIndex((p) => p.id === +req.params.id);
		let productImg = "default-image.png";
		req.file ? productImg = req.file.filename : productImg = products[productIndex].image;

		products[productIndex] = {
			id: +req.params.id,
			name: req.body.name.trim(),
			price: +req.body.price,
			discount: +req.body.discount,
			category: req.body.category,
			description: req.body.description.trim(),
			image: productImg
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf-8');
		return res.render('products', { products, toThousand });
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const productIndex = products.findIndex((p) => p.id === +req.params.id);
        products.splice(productIndex, 1);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf-8');
		return res.render('products', { products, toThousand });
	}
};

module.exports = controller;