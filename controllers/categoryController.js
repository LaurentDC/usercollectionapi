// CATEGORY ROUTES
// ==================================================
var express = require('express');
var router = express.Router();

var CategoryModel = require('../models/CategoryModel');

function getCategories(res){
	CategoryModel.find(function(err, categories){
		if (err)
			res.send(err);
		res.json(categories);
	});
}

router.route('/categories')
	.post(function(req, res){
		var category = new CategoryModel();
		category.catId = req.body.catId;
		category.name = req.body.name;
		category.save(function(err){
			if (err)
				res.send(err);
			console.log('Category successfully created!');
			//getCategories(res);
			res.json(category);
		});
	})
	.get(function(req, res){
		getCategories(res);
	});
router.route('/categories/:category_id')
	.get(function(req, res){
		CategoryModel.findById(req.params.category_id, function(err, category){
			if (err)
				res.send(err);
			res.json(category);
		});
	})
	.put(function(req, res){
		CategoryModel.findById(req.params.category_id, function(err, category){
			if (err)
				res.send(err);
			category.name = req.body.name;
			category.save(function(err){
				if (err)
					res.send(err);
				console.log('Category successfully updated!');
				//getCategories(res);
				res.json(category);
			});
		});
	})
	.delete(function(req, res){
		CategoryModel.remove({
			_id: req.params.category_id
		}, function(err, category){
			if (err)
				res.send(err);
			console.log('Category successfully removed!');
			getCategories(res);
		});
	});

router.use('/api', router);
module.exports = router;