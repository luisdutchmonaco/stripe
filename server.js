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


//const MongoClient = require('mongodb').MongoClient;
//const dbClient = new MongoClient("mongodb+srv://dmuser:Dutch%232020@cluster0.p9zi9.mongodb.net/orders?retryWrites=true&w=majority", { useNewUrlParser: true });
//dbClient.connect(err => {
//  console.log(err);
//  const collection = dbClient.db("orders").collection("order");
  // perform actions on the collection object
//  dbClient.close();
//});



const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, './views')));

app.get('/dl/:slug', function(req, res) {
  var filePath = "/views/comic.pdf";

        fs.readFile(__dirname + filePath , function (err,data){
          console.log(err);
            res.contentType("application/pdf");
            res.send(data);
        });

});

app.post('/charge', (req, res) => {
    try {
        stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
        }).then(customer => stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'usd',
            customer: customer.id,
            description: 'Thank you for your generous donation.'
        }

      )).then(() => res.render('complete.html'))
            .catch(err => console.log(err))

            /*
            dbo.collection("customers").insertOne({ name: "test", email: "luis@tester.com", },
            function(err, result) {
                    if (err) throw err;
                    res.json(result);
                    db.close();
            });
              */


    console.log("TWILIO");

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
  sgMail.send(msg).then(() => { console.log('Email sent') }).catch((error) => { console.error(error) })

    } catch (err) { res.send(err) }
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running... v1'))
