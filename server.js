const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const stripe = require('stripe')('sk_test_51Hgz5XIMZisd3xiHe2ulfy5dtihJfW1oCrXjIEY8OPIOxS9UeAYR2dFTT5qlNB9K7Z1FvbHCVaXqLTRQQVre240300FnRJBOkG')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
var twilio = require('twilio');

var accountSid = 'AC8f7d4515987ea4e1e1a323270673ddff'; // Your Account SID from www.twilio.com/console
var authToken = '55c17e03896437cf83ccfd2db5b13574';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);


const MongoClient = require('mongodb').MongoClient;
//const




const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, './views')));

app.get('/dl/:slug', function(req, res) {
  var lid = req.params.slug;
  dbClient = new MongoClient("mongodb+srv://Dutch:Dutch%232020@cluster0.lntaa.mongodb.net/orders?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology : true });
  dbClient.connect(err => {

  dbClient.db("orders").collection("download").find({ link: lid}).toArray(function(err, result) {
    if (err) throw err;
    if(result.length==0 || result[0].flag==0){
      console.log("Expired link");
      res.sendStatus(404);
      return;
    }else{

      var filePath = "/views/comic.pdf";

            fs.readFile(__dirname + filePath , function (err,data){
              //console.log(err);
                res.contentType("application/pdf");
                res.send(data);
            });

    }
    var myquery = { _id: result[0]._id };
  var newvalues = { $set: {flag: 0 } };
  dbClient.db("orders").collection("download").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    //db.close();
    dbClient.close();
  });


  });



});




});

app.post('/charge', (req, res) => {
  var params = {};
  try{
    stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
    }).then(customer => stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'usd',
            customer: customer.id,
            description: 'Curiositylandia Order'
        }
    )).then((sResult) => {
      console.log(sResult);
      dbClient = new MongoClient("mongodb+srv://Dutch:Dutch%232020@cluster0.lntaa.mongodb.net/orders?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology : true });
      dbClient.connect(err => {
        dbClient.db("orders").collection("order").insertOne({ name: req.body.name, email: req.body.email, stripeToken: req.body.stripeToken, oid: sResult.id },
        function(err, result) {
                if (err) throw err;
                //res.json(result);
                //console.log(result);
                //res.json({ statusCode : 200});
        });
        params = { oid: sResult.id, link:makeid(5), flag: 1};
        dbClient.db("orders").collection("download").insertOne(params,
        function(err, result) {
                if (err) throw err;
                //res.json(result);
                //console.log(result);
                dbClient.close();
                res.json({ statusCode : 200, oid: params.link });
        });
      });

    }).catch(err => {
      console.log(err);
        res.send(err);

    });


    console.log("TWILIO");
/*
    client.messages.create({
      body: 'Thank you for your purchase. Use this one-time link to download your copy of our book [LINK] Enjoy!',
      to: '+528183623411',
      from: '+12056065579'
        }, function (err, message) {
            console.log(err);
            console.log(message);
        });

        const msg = {
          to: 'luis@dutchmonaco.com',
          from: 'hello@curiositylandia.com',
          subject: 'Curiositylandia - Thank you for your purchase',
          text: 'Curiositylandia - Thank you for your purchase',
          html: 'Thank you for your purchase. Use this one-time link to download your copy of our book [LINK] Enjoy!',
        }
        */
        console.log("email: "+req.body.email);
  const msg = {
          to: req.body.email,
          from: 'hello@curiositylandia.com',
          subject: 'Curiositylandia - Thank you for your purchase',
          text: 'Curiositylandia - Thank you for your purchase',
          html: 'Thank you for your purchase. Use this one-time link to download your copy of our book <a href="#">Here</a> Enjoy!',
  }
  sgMail.send(msg).then(() => { console.log('Email sent') }).catch((error) => { console.error(error) })

} catch (err) { console.log(err); res.send(err) }
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running... v1'))


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
