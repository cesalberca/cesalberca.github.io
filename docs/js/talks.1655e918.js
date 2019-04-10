(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["talks"],{d566:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",[t._v(t._s(t.title))]),t._l(t.talks,function(e){return a("Talk",{key:e.id.value,attrs:{detail:t.talkDetail(e)}})})],2)},i=[],l=(a("96cf"),a("3b8d")),s=a("d225"),r=a("b0b4"),c=a("308d"),o=a("6bb5"),u=a("4e2b"),f=a("9ab4"),b=a("60a3"),k=a("d504"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h2",[t._v(t._s(t.translations.title)+" "+t._s(t.detail.title))]),a("p",[t._v(t._s(t.translations.abstract)+" "+t._s(t.detail.abstract))]),a("p",[t._v("\n    "+t._s(t.translations.topics)+"\n    "),t._l(t.detail.topics,function(e){return a("span",{key:e},[t._v(t._s(e))])})],2),a("p",[t._v(t._s(t.translations.length)+" "+t._s(t.detail.length))]),a("p",[t._v(t._s(t.translations.difficulty)+" "+t._s(t.translations.detailDifficulty))])])},v=[],h=function(t){function e(){return Object(s["a"])(this,e),Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),Object(r["a"])(e,[{key:"translations",get:function(){return{title:this.translationService.translate(this.state.locale,"talks_talkTitle"),abstract:this.translationService.translate(this.state.locale,"talks_talkAbstract"),topics:this.translationService.translate(this.state.locale,"talks_talkTopics"),length:this.translationService.translate(this.state.locale,"talks_talkLength"),difficulty:this.translationService.translate(this.state.locale,"talks_talkDifficulty"),detailDifficulty:this.translationService.translate(this.state.locale,this.detail.difficulty)}}}]),e}(b["f"]);f["a"]([Object(b["d"])({type:Object})],h.prototype,"detail",void 0),f["a"]([Object(b["c"])()],h.prototype,"translationService",void 0),f["a"]([Object(b["c"])()],h.prototype,"state",void 0),h=f["a"]([b["a"]],h);var d=h,_=d,y=a("2877"),j=Object(y["a"])(_,p,v,!1,null,null,null),O=j.exports,g=a("c655"),m=function(){function t(){Object(s["a"])(this,t)}return Object(r["a"])(t,[{key:"translate",value:function(t){switch(t){case g["a"].ADVANCED:return"talks_talkDifficultyAdvanced";case g["a"].INTERMEDIATE:return"talks_talkDifficultyIntermediate";case g["a"].EASY:return"talks_talkDifficultyEasy"}}}],[{key:"create",value:function(){return new t}}]),t}(),w=function(){function t(){Object(s["a"])(this,t)}return Object(r["a"])(t,null,[{key:"fromTalk",value:function(t){return{id:t.id,title:t.title,abstract:t.abstract.toHtml(),length:t.length.minutes,difficulty:m.create().translate(t.difficulty),language:t.language,topics:t.topics,references:t.references}}}]),t}(),D=function(t){function e(){var t;return Object(s["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.talks=[],t}return Object(u["a"])(e,t),Object(r["a"])(e,[{key:"talkDetail",value:function(t){return w.fromTalk(t)}},{key:"title",get:function(){return this.translationService.translate(this.state.locale,"talks_title")}}]),e}(b["f"]);f["a"]([Object(b["c"])()],D.prototype,"translationService",void 0),f["a"]([Object(b["c"])()],D.prototype,"state",void 0),D=f["a"]([Object(b["a"])({beforeRouteEnter:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(e,a,n){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k["b"].get("GetTalksGiven").execute();case 2:i=t.sent,n(function(t){t.talks=i});case 4:case"end":return t.stop()}},t)}));function e(e,a,n){return t.apply(this,arguments)}return e}(),components:{Talk:O}})],D);var S=D,E=S,T=Object(y["a"])(E,n,i,!1,null,null,null);e["default"]=T.exports}}]);
//# sourceMappingURL=talks.1655e918.js.map