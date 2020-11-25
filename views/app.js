const stripe = Stripe('pk_test_51Hgz5XIMZisd3xiHL89fQZLuX4LtSd5O2UPvjUAuD3a2960rxZ4C7xlI53ZQnf0XeVq7RmOblsJNjAujkTRSLOxy00zNFYatKN');
const elements = stripe.elements();

var style = {
    base: {
        color: "#000",
        border:"#000 solid 1px",
        boxShadow: "0px 0px 10px rgba(0,0,0,.20)"
    }
}

const card = elements.create('card', { style });
card.mount('#card-element');
//registerElements([card], 'example1');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

const stripeTokenHandler = token => {
    const data = {
    name: $("#name").val(),
    email: $("#email").val(),
    phone: $("#phonename").val(),
    amount: $("#amount").val(),
    stripeToken: token.id
    };

    $.ajax({
  type: "POST",
  url: '/charge',
  data: data,
  success: function(r){
    if(r.statusCode!=200){
      errorEl.textContent = r.raw.message;
    }else if(r.statusCode==200){
      $("form.formStripe").fadeOut();
      $("h1.success").html("Thank you. <br/><a href='/dl/"+r.oid+"' target='_blank'>Download Here</a>");
    }
  }
  });
    //form.submit();
}

form.addEventListener('submit', e => {

    e.preventDefault();


    stripe.createToken(card).then(res => {

        if(res.error){
          errorEl.textContent = res.error.message;
          return false;
        }else {
            console.log(res)
            stripeTokenHandler(res.token);
        }
    })
})
