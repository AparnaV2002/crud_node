var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";
console.log("MongoDB");
exports.saveData = function (name, email, empid,job,branch, response) {
  MongoClient.connect(url, function (err, db) {

    if (err) throw err;
    var dbcon = db.db("WTdemo"); 
    var msg = "";
    var myobj = {
      'name': name,
      'email': email,
      'empid':empid,
      'job':job,
      'branch':branch,
    };
    dbcon.collection("customers").insertOne(myobj, function (err, res) {
      if (err) {
        console.log(err);
        msg = "Data Not inserted";
      } else {
        msg =
          "Name:" +
          name +
          "Email:" +
          email +
          "empid:"+
		      empid + 
          "job:"+
          job+
          "branch:"+
          branch+

          " ***Inserted***";
        console.log("Document inserted");
      }

      response.write(msg);
      response.end();
      db.close();
    });
  });
};
exports.showData = function (email,empid,job,branch, response) {
  MongoClient.connect(url, function (err, db) {

    if (err) throw err;
    var dbcon = db.db("WTdemo"); 
    var msg = "";
    var query = { 'email': email, 
                
              };
    console.log(query);
    dbcon
      .collection("customers")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          console.log(err);
          msg = "Error!!!";
        } else {
          console.log(result);

          var Length = result.length;
          console.log("Length:" + Length);
          msg =
            "<table border='2'><tr> <td>S.No</td> <td>Name</td> <td>email</td><td>empid</td><td>job</td><td>branch</td></tr>";
          for (var i = 0; i < Length; i++) {
            msg +=
              "<tr><td>" +
              (i + 1) +
              "</td><td>" +
              result[i].name +
              "</td><td>" +
              result[i].email +
              "</td><td>" +
              result[i].empid+
              "</td><td>"+
              result[i].job+
              "</td><td>"+
              result[i].branch+
              "</td></tr>";
          }
          msg += "</table>";
          console.log(msg);
        }
        response.write(msg);
        response.end();
        db.close();
      });
  });
};
exports.updateData = function (empid,job,branch, response) {
  MongoClient.connect(url, function (err, db) {
  
    if (err) throw err;
    var dbcon = db.db("WTdemo");
    var msg = "";
    var query = { 'empid': empid,
    };
    var newvalues={$set:{'job':job,'branch':branch}};
    dbcon.collection("customers").updateOne(query,newvalues,function (err, result) {
        if (err) {
          console.log(err);
          msg = "not updated";
        } else {
          msg="update job:"+job+"and branch:"+branch;
          console.log("Document Updated")
        }
        response.write(msg);
        response.end();
        db.close();
      });
  });
};
exports.deleteData=function (empid,response){
  MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbcon=db.db("WTdemo");
    var msg=""
    var query={'empid':empid};
    dbcon.collection("customers").deleteOne(query,function(err,res){
      if (err) {
        console.log(err);
        msg = "Not Deleted";
      } else 
      {
        msg="Deleted empid:"+empid;
        console.log("Document Deleted");              
      }
      response.write(msg);
      response.end();
      db.close();
    });
  });
};