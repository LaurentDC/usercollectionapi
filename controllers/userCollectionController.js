var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var UserCollectionModel = require('../models/UserCollection');

function getCollection(res){
	UserCollectionModel.find(function(err, collection){
		if(err)
			res.send(err);
		res.json(collection);
	});
}

router.route('/usercollection/user/:userId')
	.get(function(req, res){
		UserCollectionModel.findOne({userId : req.params.userId}, function(err, userCollection){
			if(err)
				res.send(err);
			res.json(userCollection);
		});
	});

router.route('/usercollection')
	.post(function(req, res){
		var collection = new UserCollectionModel();
		collection.name = req.body.name;
		collection.userId = mongoose.Types.ObjectId(req.body.userId);

		req.body.userCategories.forEach(function(cat){
			collection.userCategories.push(mongoose.Types.ObjectId(cat));
		});
		req.body.userItems.forEach(function(item){
			collection.userItems.push(mongoose.Types.ObjectId(item));
		});

		collection.save(function(err){
			if (err)
				res.send(err);
			console.log('Collection successfully created!');
			getCollection(res);
		});
	});
router.route('/usercollection/:collection_id')
	.get(function(req, res){
		UserCollectionModel.findById(req.params.collection_id, function(err, collection){
			if (err)
				res.send(err);
			res.json(collection);
		});
	})
	.put(function(req, res){
		UserCollectionModel.findById(req.params.collection_id, function(err, collection){
			while(collection.userCategories.length > 0) {
				collection.userCategories.pop();
			};
			while(collection.userItems.length > 0) {
				collection.userItems.pop();
			};
			if (err)
				res.send(err);
			collection.name = req.body.name;
			collection.userId = mongoose.Types.ObjectId(req.body.userId);

			req.body.userCategories.forEach(function(cat){
				collection.userCategories.push(mongoose.Types.ObjectId(cat));
			});
			req.body.userItems.forEach(function(item){
				collection.userItems.push(mongoose.Types.ObjectId(item));
			});
			collection.save(function(err){
				if (err)
					res.send(err);
				console.log('Collection successfully updated!');
				getCollection(res);
			});
		});
	})
	.delete(function(req, res){
		UserCollectionModel.remove({
			_id: req.params.collection_id
		}, function(err, item){
			if (err)
				res.send(err);
			console.log('Collection successfully removed!');
			getCollection(res);
		});
	});

router.use('/api', router);

module.exports = router;