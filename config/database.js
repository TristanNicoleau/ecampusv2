module.exports = function(mysql){
	return  mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root'
	});
};