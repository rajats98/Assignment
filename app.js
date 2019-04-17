var express 	= require("express"),
	app			= express(),
	path		= require('path');

var	locations	= require('./public/Json/locations.json'),
	jobs		= require('./public/Json/jobs.json'),
	functional_area	= require('./public/Json/functional_area.json');

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(request,response){
	
	var records_per_page = 15,
		total_records = jobs.jobs.length,
		pageCount = Math.ceil(total_records/records_per_page),
		currentPage =1 ;
	
	var jobsArray =[]; // to segregate objects on page
	
	var search =[];

	for (var i=0;i<pageCount;i++) {
		jobsArray.push(jobs.jobs.slice(i*records_per_page,(i+1)*records_per_page-1));
	}
	if(request.query.search == 'bar'){
		console.log(request.query);
	}


	if (typeof request.query.page !== 'undefined') {
		currentPage = +request.query.page;
	}


	jobList = jobsArray[currentPage-1]
	response.render("index",{
			locations:locations, 
			jobs:jobList, 
			functional_area:functional_area,
			pageCount:pageCount,
			currentPage:currentPage,
			total_records: total_records

		});
});

app.listen("3000",function() {
	console.log("Server started");
});

