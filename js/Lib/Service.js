var Service = function(config = {}){
	var uri_ = (config.uri == null) ? null : config.uri;
	var type_ = (config.type == null) ? 'get' : config.type;
	var data_ = (config.data == null) ? {} : config.data;
	var async_ = (config.async == null) ? true : Boolean(config.async);
	var timeout_ = (config.timeout == null) ? 3000 : config.timeout;
	var token_ = config.token;
	var loading_ = (config.loadng == null) ? true : config.loading;

	var response = null;
	var is_successful = false;
	var status = null;

	this.start = function(conf = {}, callback = function(){}){
		response = null;
		is_successful = false;
		status = null;

		var uri = (conf.uri == null) ? uri_ : conf.uri;
		var type = (conf.type == null) ? type_ : conf.type;
		var data = (conf.data == null) ? data_ : conf.data;
		var async = (conf.async == null) ? async_ : Boolean(conf.async);
		var timeout = (conf.timeout == null) ? timeout_ : conf.timeout;
		var token = (conf.token == null) ? token_ : conf.token;
		var loading = (conf.loading == null) ? loading_ : conf.loading;
		
		
		$.ajax({
	      type: type,
	      url: uri,
	      data: data,
	      dataType: "json",
	      headers: {
        	'Authorization': token,
    	  },
	      async: async,
	      timeout: timeout,
	      cache : false,
	      
          complete: function(){
          	callback();
          },

	      success: function (body, textStatus, data) {

			console.info(uri);
	      	console.info("code: " + data.status + ", status: " + data.statusText);

	      	status = data.status;
	        if((response = data.responseJSON) != null){
	          is_successful = true;
	          
	          //console.log("data: " + JSON.stringify(response.data));
	        }
	          
	      },

	      error: function (data, textStatus) {

			console.info(uri);
	        console.warn("code: " + data.status + ", status: " + data.statusText);
	        
	        status = data.status;
	        if(textStatus === 'timeout'){
	        	is_successful = false;

	          	console.warn(textStatus);
	        }
	        if((response = data.responseJSON) != null){
	          is_successful = false;
	          
	          console.warn("message: " + response.message);
	        }
	         
	      }
	    });


	}

	this.startFormData = function(conf = {}, callback = function(){}){
		response = null;
		is_successful = false;
		status = null;

		var uri = (conf.uri == null) ? uri_ : conf.uri;
		var type = (conf.type == null) ? type_ : conf.type;
		var data = (conf.data == null) ? data_ : conf.data;
		var async = (conf.async == null) ? async_ : Boolean(conf.async);
		var timeout = (conf.timeout == null) ? timeout_ : conf.timeout;
		var token = (conf.token == null) ? token_ : conf.token;
		var loading = (conf.loading == null) ? loading_ : conf.loading;

		$.ajax({
	      type: type,
	      url: uri,
	      data: data,
	      dataType: "json",
	      headers: {
        	'Authorization': token,
    	  },
	      async: async,
	      timeout: timeout,
	      cache : false,
		  processData : false,
          contentType: false,
	      
          complete: function(){
          	callback();
          },

	      success: function (body, textStatus, data) {

			console.info(uri);
	      	console.info("code: " + data.status + ", status: " + data.statusText);

	      	status = data.status;
	        if((response = data.responseJSON) != null){
	          is_successful = true;
	          
	          //console.log("data: " + JSON.stringify(response.data));
	        }
	          
	      },

	      error: function (data, textStatus) {

			console.info(uri);
	        console.warn("code: " + data.status + ", status: " + data.statusText);
	        
	        status = data.status;
	        if(textStatus === 'timeout'){
	        	is_successful = false;

	          	console.warn(textStatus);
	        }
	        if((response = data.responseJSON) != null){
	          is_successful = false;
	          
	          console.warn("message: " + response.message);
	        }
	         
	      }
	    });


	}

	this.isSuccessful = function(){
		return is_successful;
	}

	this.response = function(){
		return response;
	}

	this.status = function(){
		return status;
	}

	
};