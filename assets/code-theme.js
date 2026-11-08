/* Extend the existing escaped tokenizer; never interpret learner code as HTML. */
RB_TN.javascript={flags:'gm',regeln:[
  ['c',/\/\/[^\n]*|\/\*[\s\S]*?\*\//],['s',/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/],
  ['k',/\b(?:async|await|const|let|var|function|return|if|else|for|of|in|while|class|extends|new|throw|try|catch|finally|import|export|from|default|interface|type|readonly|public|private|static|implements|yield|typeof|instanceof)\b/],
  ['const',/\b(?:true|false|null|undefined)\b/],['t',/\b(?:string|number|boolean|unknown|never|void|any)\b/],['n',/\b\d+(?:\.\d+)?\b/],['f',/\b[A-Za-z_$][\w$]*(?=\s*\()/],['o',/=>|===|!==|\?\.|\?\?|&&|\|\||[=+*/<>!?:%-]/]
]};
RB_TN.java={flags:'gm',regeln:RB_TN.javascript.regeln};
RB_TN.html={flags:'gm',regeln:[['c',/<!--[\s\S]*?-->/],['s',/"[^"]*"|'[^']*'/],['tag',/<\/?[A-Za-z][\w:-]*|<!doctype[^>]*>|\/?>/i],['a',/\b[\w:@.-]+(?=\s*=)/],['o',/[={}]/]]};
RB_TN.css={flags:'gm',regeln:[['c',/\/\*[\s\S]*?\*\//],['s',/"[^"]*"|'[^']*'/],['k',/@[\w-]+|![ ]*important/],['p',/[\w-]+(?=\s*:)/],['n',/#[\da-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|ch)?/],['f',/[\w-]+(?=\()/],['o',/[{}:;>,]/]]};
RB_TN.abap={flags:'gmi',regeln:[['c',/"[^\n]*|^\*[^\n]*/],['s',/'(?:''|[^'])*'|`[^`]*`/],['k',/\b(?:DATA|TYPE|VALUE|SELECT|FROM|FIELDS|WHERE|INTO|TABLE|READ|IF|ELSE|ENDIF|LOOP|AT|ENDLOOP|METHOD|ENDMETHOD|CLASS|ENDCLASS|PUBLIC|PRIVATE|SECTION|INTERFACE|ENDINTERFACE|TRY|CATCH|ENDTRY|RETURN|APPEND|TO|MOD|AND|OR|NOT)\b/],['n',/\b\d+\b/],['f',/\b\w+(?=\s*\()/],['o',/->|=>|<=|>=|<>|[=@<>+*/-]/]]};
RB_TN.vue={flags:'gm',regeln:RB_TN.html.regeln.concat(RB_TN.javascript.regeln)};
var rpOriginalLanguage=rbSprache;
rbSprache=function(lang){var value=String(lang||'').toLowerCase();if(/vue|sfc/.test(value))return'vue';if(/typescript|javascript|node|\bjs\b|\bts\b/.test(value))return'javascript';if(/abap|cds/.test(value))return'abap';if(/^java\b/.test(value))return'java';if(/html|xml/.test(value)&&!/blade|php/.test(value))return'html';if(/css|scss/.test(value))return'css';return rpOriginalLanguage(lang);};
function rpColorCode(root){
  root.querySelectorAll('pre').forEach(function(pre){
    if(pre.matches('.gp-feedback,.qfeedback')||pre.querySelector('input,textarea,button')||pre.closest('.trace-code'))return;
    var text=pre.textContent;if(pre.dataset.tokyoText===text)return;
    var label=pre.closest('.code-block')?.querySelector('.code-lang')?.textContent||pre.dataset.language||'';
    if(!label){if(/^\s*</.test(text))label='html';else if(/<\?php/.test(text))label='php';else if(/\b(const|let|import|function)\b/.test(text))label='javascript';}
    pre.innerHTML=rbTokyo(text,rbSprache(label));pre.dataset.tokyoText=text;pre.classList.add('rp-tokyo');
  });
}
(function(){var base=renderContent;renderContent=function(){base.apply(this,arguments);rpColorCode(document.getElementById('content'));};renderContent();})();
