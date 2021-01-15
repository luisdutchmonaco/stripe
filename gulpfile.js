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

function build(cb,json) {
  var templateData = json,
  options = {
      ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      partials : {
          footer : '<footer>the end</footer>'
      },
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
  gulp.src('src/index.hbr').pipe(handlebars(templateData, options)).pipe(rename('index.html')).pipe(gulp.dest('dist'));
  gulp.src('src/wow-i-can-see-clearly-now.hbr').pipe(handlebars(templateData, options)).pipe(rename('wow-i-can-see-clearly-now.html')).pipe(gulp.dest('dist'));
  gulp.src('src/ahora-veo-todo-perfecto.hbr').pipe(handlebars(templateData, options)).pipe(rename('ahora-veo-todo-perfecto.html')).pipe(gulp.dest('dist'));
  cb();
}


function uielements(cb){
  cb();
}

function data(cb){
  var json = {};
  const airtable = new Airtable({ apiKey: 'keyh4ZnksjZg4USrF' }).base('appuoshptISMGIo0F');


  airtable.table('wow-i-can-see-clearly-now').list({maxRecords:100}).then(result => {

    var content = result.records;
    /* structure */
    var sections = {};
    var meta = {
      title : { en: _.findWhere(content, {id: "reco4WfhYUpEetkd3"}).fields.en, es: _.findWhere(content, {id: "reco4WfhYUpEetkd3"}).fields.es },
      description : { en: _.findWhere(content, {id: "recpcUy8mPO1NJ2ot"}).fields.en, es: _.findWhere(content, {id: "recpcUy8mPO1NJ2ot"}).fields.es },
      og_image : { en: _.findWhere(content, {id: "recJC2B5AfGd2vK5W"}).fields.en, es: _.findWhere(content, {id: "recJC2B5AfGd2vK5W"}).fields.es },
      og_url : { en: _.findWhere(content, {id: "recJC2B5AfGd2vK5W"}).fields.en, es: _.findWhere(content, {id: "recJC2B5AfGd2vK5W"}).fields.es },
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

    footer = { };
/*
    footer = {
      copy : { en: _.findWhere(content, {id: "recDbeDyjfn6uLT4D"}).fields.en, es: _.findWhere(content, {id: "recDbeDyjfn6uLT4D"}).fields.es },
      subscribe_btn_lbl : { en: _.findWhere(content, {id: "recN0faHaMPP1ArDv"}).fields.en, es: _.findWhere(content, {id: "recN0faHaMPP1ArDv"}).fields.es },
      subscribe_btn_pholder : { en: _.findWhere(content, {id: "recTZinn3WHv38rAS"}).fields.en, es: _.findWhere(content, {id: "recTZinn3WHv38rAS"}).fields.es },
    }
    */

    var attachments = _.findWhere(content, {id: "rec4XnNGwnCtdXWbA"}).fields.Attachments;
    var pdfs = _.findWhere(content, {id: "rec4XnNGwnCtdXWbA"}).fields.Files;
    attachments.forEach(function(item,index){
      attachments[index].pdf = pdfs[index].url;
    });


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
        carousell : attachments,
      },
      testimonials: {
        image: { en: _.findWhere(content, {id: "recqc7icWSxB5Sed3"}).fields.Attachments[0].url, es: _.findWhere(content, {id: "recwlWj0kjqGb0A9d"}).fields.Attachments[0].url },
      }
    }

    var data = { meta : meta, hero : hero, sections: sections, footer: footer, buttons: buttons };
    build(function(){},data);
  });
  cb();

}






exports.data = data;
exports.build = build;
exports.assets = assets;
exports.default = gulp.series(assets,uielements,data);
