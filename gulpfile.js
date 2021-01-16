var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
const Airtable = require('airtable-node');
var _ = require('underscore')._


function assets(cb) {
  gulp.src('src/css/*.css').pipe(cleanCSS()).pipe(rename({suffix: '.min'})).pipe(gulp.dest("dist/css"));
  gulp.src('src/js/**/*').pipe(gulp.dest("dist/js"));
  gulp.src('src/fonts/**/*').pipe(gulp.dest("dist/fonts"));
  gulp.src('src/**/*.{png,jpg,jpeg,svg,ico}').pipe(gulp.dest('dist/'));
  cb();
}

function build(slug,json) {
  var templateData = json,
  options = {
      ignorePartials: true,
      batch : ['./src/partials'],
      helpers : {
          debug : function(optionalValue){
            console.log("Current Context");
            console.log("====================");
            console.log(this);

            if (optionalValue) {
              console.log("Value");
              console.log("====================");
              console.log(optionalValue);
            }
          }
      }
  }
  /* PAGE */
  switch(slug){
    case "index":
      gulp.src('src/index.hbs').pipe(handlebars(templateData, options)).pipe(rename('index.html')).pipe(gulp.dest('dist'));
    break;
    case "wow-i-can-see-clearly-now":
    case "ya-veo-todo-perfecto.hbs":
      gulp.src('src/wow-i-can-see-clearly-now.hbs').pipe(handlebars(templateData, options)).pipe(rename('wow-i-can-see-clearly-now.html')).pipe(gulp.dest('dist'));
      gulp.src('src/ya-veo-todo-perfecto.hbs').pipe(handlebars(templateData, options)).pipe(rename('ya-veo-todo-perfecto.html')).pipe(gulp.dest('dist'));
    break;
  }
  //cb();
}


async function data(cb){
  airtable = new Airtable({ apiKey: 'keyh4ZnksjZg4USrF' }).base('appuoshptISMGIo0F');
  /* Global Data */
  const elements = airtable.table('UI Elements').list({maxRecords:100}).then(result => {
    var content = result.records;
    var footer = {
      copy : { en: _.findWhere(content, {id: "recBKcdZwWLE9X32B"}).fields.en, es: _.findWhere(content, {id: "recBKcdZwWLE9X32B"}).fields.es },
      ebcopy : { en: _.findWhere(content, {id: "recfODyniv2R89Ewa"}).fields.en, es: _.findWhere(content, {id: "recfODyniv2R89Ewa"}).fields.es },
      input_ph : { en: _.findWhere(content, {id: "recktzWmoVPg9c2w4"}).fields.en, es: _.findWhere(content, {id: "recktzWmoVPg9c2w4"}).fields.es },
      input_ok : { en: _.findWhere(content, {id: "recbBwm8YcriFPELE"}).fields.en, es: _.findWhere(content, {id: "recbBwm8YcriFPELE"}).fields.es },
      input_btn : { en: _.findWhere(content, {id: "recwmP0oAmk7CB8VB"}).fields.en, es: _.findWhere(content, {id: "recwmP0oAmk7CB8VB"}).fields.es },
    }
    var modal = {
      dd_title : { en: _.findWhere(content, {id: "recNctbfNoCrpOiZv"}).fields.en, es: _.findWhere(content, {id: "recNctbfNoCrpOiZv"}).fields.es },
      dd_btncopy : { en: _.findWhere(content, {id: "recbcKCZlEKMu2Vf1"}).fields.en, es: _.findWhere(content, {id: "recbcKCZlEKMu2Vf1"}).fields.es },
    }
    var data = { footer: footer, modal: modal };
    return data;
  });
  /* Page */
  const page_wicscn = airtable.table('wow-i-can-see-clearly-now').list({maxRecords:100}).then(result => {
    var content = result.records;
    var sections = {};
    var meta = {
      title : { en: _.findWhere(content, {id: "reco4WfhYUpEetkd3"}).fields.en, es: _.findWhere(content, {id: "reco4WfhYUpEetkd3"}).fields.es },
      description : { en: _.findWhere(content, {id: "recpcUy8mPO1NJ2ot"}).fields.en, es: _.findWhere(content, {id: "recpcUy8mPO1NJ2ot"}).fields.es },
      og_image : { en: _.findWhere(content, {id: "recRcbpnssWLmrxlj"}).fields.Attachments[0].url, es: _.findWhere(content, {id: "recsxu9eWoR8ucCNz"}).fields.Attachments[0].url },
      og_url : { en: _.findWhere(content, {id: "recJC2B5AfGd2vK5W"}).fields.en, es: _.findWhere(content, {id: "recJC2B5AfGd2vK5W"}).fields.es },
      shopifylink: { en: _.findWhere(content, {id: "reczCCpYmolJvjxdz"}).fields.en, es: _.findWhere(content, {id: "reczCCpYmolJvjxdz"}).fields.es },
      shopifybtnlbl: { en: _.findWhere(content, {id: "recTnwj7lZF9SmSeT"}).fields.en, es: _.findWhere(content, {id: "recTnwj7lZF9SmSeT"}).fields.es },

    }

    buttons = {
      buy_lbl: { en: _.findWhere(content, {id: "recXfzZxZWTArj7Ao"}).fields.en, es: _.findWhere(content, {id: "recXfzZxZWTArj7Ao"}).fields.es },
      buy_copy: { en: _.findWhere(content, {id: "recSyJMcT3qCJuyBo"}).fields.en, es: _.findWhere(content, {id: "recSyJMcT3qCJuyBo"}).fields.es },
      download_lbl: { en: _.findWhere(content, {id: "recUh5htV5qDEEi4F"}).fields.en, es: _.findWhere(content, {id: "recUh5htV5qDEEi4F"}).fields.es },
      download_copy: { en: _.findWhere(content, {id: "rec0BwBe6AxRiuTNF"}).fields.en, es: _.findWhere(content, {id: "rec0BwBe6AxRiuTNF"}).fields.es },
    }
    hero = {
      left_svg : { en: _.findWhere(content, {id: "recwAydKD7VKhbndV"}).fields.Attachments[0].url, es: _.findWhere(content, {id: "recLpa5sWVeZqCY94"}).fields.Attachments[0].url },
      right_copy : { en: _.findWhere(content, {id: "recRleIrQz0I7zasn"}).fields.en, es: _.findWhere(content, {id: "recRleIrQz0I7zasn"}).fields.es },
      right_image : { en: _.findWhere(content, {id: "rec7lbElFvCqbjgZB"}).fields.Attachments[0].url, es: _.findWhere(content, {id: "rec1ETfDY5pykSH3c"}).fields.Attachments[0].url },
      badge_top : { en: _.findWhere(content, {id: "recscGm1kdAo0HWk9"}).fields.en, es: _.findWhere(content, {id: "recscGm1kdAo0HWk9"}).fields.es },
      badge_bottom : { en: _.findWhere(content, {id: "rec2cMcusHXXRqSwQ"}).fields.en, es: _.findWhere(content, {id: "rec2cMcusHXXRqSwQ"}).fields.es },
    }

    var attachments_en = _.findWhere(content, {id: "rec4XnNGwnCtdXWbA"}).fields.Attachments;
    var pdfs_en = _.findWhere(content, {id: "rec4XnNGwnCtdXWbA"}).fields.Files;
    attachments_en.forEach(function(item,index){ attachments_en[index].pdf = pdfs_en[index].url; });

    var attachments_es = _.findWhere(content, {id: "rectfPdUVoBW6gkRF"}).fields.Attachments;
    var pdfs_es = _.findWhere(content, {id: "rectfPdUVoBW6gkRF"}).fields.Files;
    attachments_es.forEach(function(item,index){ attachments_es[index].pdf = pdfs_es[index].url; });

    quotes = _.findWhere(content, {id: "recANDPD7pQ5wbmwA"}).fields.en.split("+");
    quotes_en = [];
    for(var i=0;i<quotes.length;i++){
      var temp = quotes[i].split("|");
      quotes_en.push({title : temp[0].trim(), copy: temp[1], author: temp[2] });
    }
    quotes = null;
    quotes = _.findWhere(content, {id: "recANDPD7pQ5wbmwA"}).fields.es.split("+");
    quotes_es = [];
    for(var i=0;i<quotes.length;i++){
      var temp = quotes[i].split("|");
      quotes_es.push({title : temp[0].trim(), copy: temp[1], author: temp[2] });
    }


    sections = {
      ourbook : {
        title : { en: _.findWhere(content, {id: "rec3Ls2OZURA3LPZY"}).fields.en, es: _.findWhere(content, {id: "rec3Ls2OZURA3LPZY"}).fields.es },
        copy: { en: _.findWhere(content, {id: "recmmeXCeBkDxnxko"}).fields.en, es: _.findWhere(content, {id: "recmmeXCeBkDxnxko"}).fields.es },
        image: { en: _.findWhere(content, {id: "recb6KyaHfYaN7YqH"}).fields.Attachments[0].url, es: _.findWhere(content, {id: "recjAZY0NSzfWRjQu"}).fields.Attachments[0].url },
      },
      preview: {
        title : { en: _.findWhere(content, {id: "reckNooQMq6wkuJSi"}).fields.en, es: _.findWhere(content, {id: "reckNooQMq6wkuJSi"}).fields.es },
        carousell_en : _.findWhere(content, {id: "recisDHSTRhjUSaf3"}).fields.Attachments,
        carousell_es : _.findWhere(content, {id: "recWzmZ7yU6DvJ6SP"}).fields.Attachments,
      },
      coloring: {
        title : { en: _.findWhere(content, {id: "rec54kqRXproX1n4A"}).fields.en, es: _.findWhere(content, {id: "rec54kqRXproX1n4A"}).fields.es },
        carousell_en : attachments_en,
        carousell_es : attachments_es,
      },
      testimonials: {
        image: { en: _.findWhere(content, {id: "recqc7icWSxB5Sed3"}).fields.Attachments[0].url, es: _.findWhere(content, {id: "recwlWj0kjqGb0A9d"}).fields.Attachments[0].url },
        quotes_en : quotes_en,
        quotes_es : quotes_es,
      }
    }

    footer = {
      amazon: { en: _.findWhere(content, {id: "recyI7E4wI93zhr7a"}).fields.en, es: _.findWhere(content, {id: "recyI7E4wI93zhr7a"}).fields.es },
      barnesandnoble: { en: _.findWhere(content, {id: "recQD3zDWa9T6NsWZ"}).fields.en, es: _.findWhere(content, {id: "recQD3zDWa9T6NsWZ"}).fields.es },
      googleplay: { en: _.findWhere(content, {id: "recz3Mm1vkIjZxqrF"}).fields.en, es: _.findWhere(content, {id: "recz3Mm1vkIjZxqrF"}).fields.es },
      applebooks: { en: _.findWhere(content, {id: "rec3Az6u7LqwxFLEc"}).fields.en, es: _.findWhere(content, {id: "rec3Az6u7LqwxFLEc"}).fields.es },

    }
    var data = { meta : meta, hero : hero, sections: sections, buttons: buttons, footer: footer };
    return data;

  })

  /* Index */
  const page_index = airtable.table('index').list({maxRecords:100}).then(result => {
    var content = result.records;
    var meta = {
      title : { en: _.findWhere(content, {id: "recWFh4T9Cn3MWZ0a"}).fields.en, es: _.findWhere(content, {id: "recWFh4T9Cn3MWZ0a"}).fields.es },
      description : { en: _.findWhere(content, {id: "recXNfnKxxMqlcHbA"}).fields.en, es: _.findWhere(content, {id: "recXNfnKxxMqlcHbA"}).fields.es },
      og_image : { en: _.findWhere(content, {id: "rec08PYQ76Px2FhAG"}).fields.en, es: _.findWhere(content, {id: "rec08PYQ76Px2FhAG"}).fields.es },
      og_url : { en: _.findWhere(content, {id: "rechdnqHLXECAYpS3"}).fields.en, es: _.findWhere(content, {id: "rechdnqHLXECAYpS3"}).fields.es },
    }
    var data = { meta : meta};
    return data;
  });


  const promiseFn = await Promise.all([elements, page_wicscn,page_index]);


  const data = { global : promiseFn[0], wicscn : promiseFn[1],index : promiseFn[2] };
  data.wicscn.global = promiseFn[0];
  build('wow-i-can-see-clearly-now',data.wicscn);
  build('index',promiseFn[2]);

  cb();

}






exports.data = data;
exports.build = build;
exports.assets = assets;
exports.default = gulp.series(assets,data);
