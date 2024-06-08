const sql = require("mssql/msnodesqlv8");

var config = {
 server: "localhost\\MSSQLSERVER02",
    database: "FECAF",
    driver: "msnodesqlv8",
    options:{
        trustedConnection:true
    }
}

sql.connect(config, function(error){
    if(error)console.log(error);
    var request = new sql.Request();
    request.query("select * from Cliente", function(err, records){
        if(err)console.log(err);
        else console.log(records);
    })
});