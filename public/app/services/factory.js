angular.module('digestoPosadas')

.factory('digesto', ['$http', 'api','localStorageService','$cookies','$location',function($http,api,localStorageService,$cookies,$scope,$location){
	var dataFactory = {};
	

	//############################################################################################
	// Factory Conceptos
	//############################################################################################

    dataFactory.getOrdinances = function(branch_id){
    			return($http({
					url: api + 'branches/'+branch_id+'/data_ordinances.json',
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
  				 }).error(function(err) {
       				 error = err;
      			})
			);
    					
    };

    dataFactory.getOrdinance = function(branch_id,id){
			return($http({
					url: api + 'branches/'+branch_id+ '/data_ordinances/' +id + ".json",
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
  				 })   
			);
    };


	dataFactory.createOrdinance = function (branch_id,title, description, type_ordinance, branch, number, previous_number, date_sanction, type_bulletin, number_bulletin, date_publication_bulletin, page, type_promulgation, decree_promulgating, date_promulgation, general_theme) {
	  	
	  	return(
    		$http.post(api + 'branches/'+ branch_id+'/data_ordinances.json', { 
	           	type : 'POST',
				title: title,
				description:description,
				type_ordinance:type_ordinance,
				branch: branch,
				number: number,
				previous_number: previous_number,
				date_sanction: date_sanction,
				type_bulletin: type_bulletin,
				number_bulletin: number_bulletin,
				date_publication_bulletin : date_publication_bulletin,
				page: page,
				type_promulgation: type_promulgation,
				decree_promulgating: decree_promulgating,
				date_promulgation: date_promulgation,
				general_theme:general_theme
	        	})
	     	);
	      };

	dataFactory.deleteOrdinance = function (branch_id,id){
		return($http({
				url: api + 'branches/'+branch_id+'/data_ordinances/' + id + '.json',
				method: "DELETE"
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return datos;
			})   
		)};
	dataFactory.updateOrdinance = function (branch_id,id,title, description, type_ordinance, branch, number, previous_number, date_sanction, type_bulletin, number_bulletin, date_publication_bulletin, page, type_promulgation, decree_promulgating, date_promulgation, general_theme){
		return($http({
				url: api + 'branches/'+branch_id+'/data_ordinances/' + id + '.json',
				method: "PUT",
				data : {title: title,
				description:description,
				type_ordinance:type_ordinance,
				branch: branch,
				number: number,
				previous_number: previous_number,
				date_sanction: date_sanction,
				type_bulletin: type_bulletin,
				number_bulletin: number_bulletin,
				date_publication_bulletin : date_publication_bulletin,
				page: page,
				type_promulgation: type_promulgation,
				decree_promulgating: decree_promulgating,
				date_promulgation: date_promulgation,
				general_theme:general_theme}
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return [];
			})
		);   
	};


    dataFactory.getBranches = function(){
			return($http({
					url: api +'branches.json',
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
  				 })   
			);
    };

    dataFactory.getBranch = function(id){
    	
			return($http({
					url: api + 'branches/' +id + ".json",
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
				 }).error(function(err) {
       				 error = err;
      			}) 
			);
    };

	dataFactory.createBranch = function (name,number) {
		return($http({
				url: api + 'branches.json',
				method: "POST",
				data : {name: name,	number: number}
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return [];
			}).error(function(err) {
       				 error = err;
      			}) 
			// .error(function(data, status, headers, config) {
			// 	$state.go('index');
			// })
		);
	};

	dataFactory.deleteBranch = function (id){
		return($http({
				url: api + 'branches/' + id + '.json',
				method: "DELETE"
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return datos;
			}).error(function(data, status, headers, config,$state) {
				console.log(data);
				return data
			})
		)};

	dataFactory.updateBranch = function (id,name,number){
		return($http({
				url: api + 'branches/' + id + '.json',
				method: "PUT",
				data : {name: name,	number: number}
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return [];
			})
		);   
	};



	dataFactory.getConsolidateStandards = function(){
			return($http({
					url: api +'consolidatestandards.json',
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
  				 })   
			);
    };


	dataFactory.createConsolidateStandard = function (name,number) {
		return($http({
				url: api + 'consolidatestandards.json',
				method: "POST",
				data : {name: name,	number: number}
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return [];
			})
		);
	};

	dataFactory.currentRulesUnconsolidateds = function(){
			return($http({
					url: api +'consolidatestandards.json',
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
  				 })   
			);
    };

	dataFactory.createCurrentRulesUnconsolidated = function (name,number) {
		return($http({
				url: api + 'consolidatestandards.json',
				method: "POST",
				data : {name: name,	number: number}
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return [];
			})
		);
	};
	

	dataFactory.createTicket = function (name,email,contact,description,state,response) {
		return($http({
				url: api + 'tickets.json',
				method: "POST",
				data : {name: name,email: email,contact: contact,description: description,state: state,response:response}
			}).success(function(data, status, headers, config) {
	        	datos  = JSON.stringify(data);
	        	return datos;
			}).error(function(err) {
       				 error = err;
      			}) 
			// .error(function(data, status, headers, config) {
			// 	$state.go('index');
			// })
		);
	};


    dataFactory.getTickets = function(){
			return($http({
					url: api +'tickets.json',
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
  				 })   
			);
    };

    dataFactory.getTicket = function(id){
    	
			return($http({
					url: api + 'tickets/' +id + ".json",
					method: "GET"
				}).success(function(data, status, headers, config) {
  		        	datos  = JSON.stringify(data);
  		        	return datos;
				 }).error(function(err) {
       				 error = err;
      			}) 
			);
    };


	return dataFactory;
}]);