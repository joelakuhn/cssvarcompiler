const css = require('css');

class Compiler {
  constructor(css_text) {
    this.ast = css.parse(css_text);
    this.vars = {};
  }

  compile() {
    this.extract_vars(this.ast.stylesheet);
    this.replace_vars(this.ast.stylesheet);

    return css.stringify(this.ast);
  }

  *walk_rules(ast) {
    if (ast.rules) {
      for (var i=0; i<ast.rules.length; i++) {
        if (ast.rules[i].rules) {
          yield* this.walk_rules(ast.rules[i]);
        }
        else {
          yield ast.rules[i];
        }
      }
    }
    
  }

  extract_vars(ast) {
    if (ast.rules) {
      for (var j = 0; j < ast.rules.length; j++) {
        var rule = ast.rules[j];
        if (rule.rules) {
          this.extract_vars(rule);
        }
        else {
          if (rule.declarations) {
            for (var i=0; i<rule.declarations.length; i++) {
              if (rule.declarations[i].property) {
                if (rule.declarations[i].property.substr(0, 2) === '--') {
                  this.vars[rule.declarations[i].property] = rule.declarations[i].value;
                  rule.declarations.splice(i, 1);
                  i--;
                }
              }
            }
            if (rule.declarations.length === 0) {
              ast.rules.splice(j, 1);
              j--;
            }
          }
        }
      }
    }
  }

  replace_vars(ast) {
    for (var rule of this.walk_rules(ast)) {
      if (rule.declarations) {
        for (var i=0; i<rule.declarations.length; i++) {
          if (rule.declarations[i].value) {
            var variable = this.parse_var_value(rule.declarations[i].value);
            if (variable) {
              rule.declarations[i].value = this.vars[variable];
            }
          }
        }
      }
    }
  }

  parse_var_value(value) {
    var match = value.match(/^var\((--[^\)]+)\)$/);
    return match ? match[1] : null;
  }

}

module.exports = Compiler;
