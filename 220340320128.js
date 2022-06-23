const mysql = require('mysql2');
const express = require('express');
const app = express();
let dbparams={
host: 'localhost',
user: 'Tanmay',
password: 'cdac',
database: 'WPT',
port:3306
}
const connection = mysql.createConnection(dbparams);

app.use(express.static("sf")) ;


app.get('/bookinfo',(req,resp)=>{


let bookid =req.query.bookid;

let input = {bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price};
let output={status:false,bookdetail:{bookid:0, bookname:"",bookprice:0}};

connection.query('insert into book(bookid,bookname,price) values (?,?,?)',
[input.bookid,input.bookname,input.price],
(error,rows)=>{
      
        if(error)
        {
                console.log("Insertion Failed due to duplicate entry "); // primary key and due to unique constraint in bookid column
        }

        else 
        
        {if(rows.affectedRows>0)
           console.log("insert successful");
        }
}
);


connection.query("select * from book where bookid = ?", [bookid], (err, rows) => {
    if (err) {
        result = err;
        console.log("trouble "+result);
    } else {
        for(let i=0; i < rows.length; i++)
            console.log(rows[i].bookid + " " + rows[i].bookname + " " + rows[i].price);
    }

 
resp.send(output);
}
);

});
app.listen(103, function () {
    console.log("server listening at port 103...");
});
