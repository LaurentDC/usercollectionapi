// ITEM CONTROLLER
// ==================================
var express = require('express');
var router = express.Router();

var ItemModel = require('../models/ItemModel');

function getItems(res){
	ItemModel.find(function(err, items){
		if(err)
			res.send(err);
		res.json(items);
	});
}

router.route('/items')
	.post(function(req, res){
		var item = new ItemModel();
		item.category_id = req.body.category_id;
		item.itemId = req.body.itemId;
		item.name = req.body.name;
		item.title = req.body.title;

		item.save(function(err){
			if (err)
				res.send(err);
			console.log('Item successfully created!');
			//getItems(res);
			res.json(item);
		});
	})
	.get(function(req, res){
		getItems(res);
	});

router.route('/items/:item_id')
	.get(function(req, res){
		ItemModel.findById(req.params.item_id, function(err, item){
			if (err)
				res.send(err);
			res.json(item);
		});
	})
	.put(function(req, res){
		ItemModel.findById(req.params.item_id, function(err, item){
			if (err)
				res.send(err);
			item.category_id = req.body.category_id;
			item.itemId = req.body.itemId;
			item.name = req.body.name;
			item.title = req.body.title;
			item.save(function(err){
				if (err)
					res.send(err);
				console.log('Item successfully updated!');
				//getItems(res);
				res.json(item);
			});
		});
	})
	.delete(function(req, res){
		ItemModel.remove({
			_id: req.params.item_id
		}, function(err, item){
			if (err)
				res.send(err);
			console.log('Item successfully removed!');
			getItems(res);
		});
	});
router.use('/api', router);

module.exports = router;