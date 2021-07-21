import Handlebars from "handlebars";

Handlebars.registerHelper("if_eq", (a, b, opts) => {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

Handlebars.registerHelper("inc", (value, _) => {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("link", (text, url, val, css) => {
  var url = Handlebars.escapeExpression(url),
    text = Handlebars.escapeExpression(text);

  if (text == val) {
    return new Handlebars.SafeString(`<a href="#" class="${css}">${text}</a>`);
  } else {
    return new Handlebars.SafeString(`<a href="${url}">${text}</a>`);
  }
});
