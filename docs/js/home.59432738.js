(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"35fa":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.recentArticlesTitle))]),e._l(e.articles,function(t){return n("ArticleExcerpt",{key:t.id.slug,attrs:{excerpt:t.getExcerpt()},on:{"on-action":e.navigateToArticle}})})],2)},a=[],c=(n("96cf"),n("3b8d")),i=n("d225"),o=n("b0b4"),s=n("308d"),u=n("6bb5"),l=n("4e2b"),h=n("9ab4"),p=n("60a3"),f=n("6f17"),b=n("d663"),v=n("fc59"),d=n("9788"),g=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(s["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.articles=[],e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"onLocaleChange",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].create({locale:b["a"].instance.state.locale}).execute();case 2:this.articles=e.sent;case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"navigateToArticle",value:function(e){v["a"].get("NavigateToArticle",{router:this.$router,id:e,translationService:this.translationService,locale:this.state.locale}).execute()}},{key:"recentArticlesTitle",get:function(){return this.translate("home_recentArticles")}}]),t}(p["f"]);h["a"]([Object(p["c"])()],g.prototype,"translationService",void 0),h["a"]([Object(p["c"])()],g.prototype,"state",void 0),h["a"]([Object(p["c"])()],g.prototype,"translate",void 0),h["a"]([Object(p["g"])("state.locale")],g.prototype,"onLocaleChange",null),g=h["a"]([Object(p["a"])({beforeRouteEnter:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t,n,r){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].create({locale:b["a"].instance.state.locale}).execute();case 2:a=e.sent,r(function(e){e.articles=a});case 4:case"end":return e.stop()}},e)}));function t(t,n,r){return e.apply(this,arguments)}return t}(),components:{ArticleExcerpt:f["a"]}})],g);var j=g,O=j,w=n("2877"),m=Object(w["a"])(O,r,a,!1,null,null,null);t["default"]=m.exports},fc59:function(e,t,n){"use strict";var r=n("d225"),a=n("b0b4"),c=(n("6b54"),n("96cf"),n("3b8d")),i=function(){function e(t,n,a,c){Object(r["a"])(this,e),this.router=t,this.id=n,this.translationService=a,this.locale=c}return Object(a["a"])(e,[{key:"execute",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.router.push({name:"article",params:{id:this.id.slug,locale:this.translationService.toString(this.locale)}});case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}]),e}();n.d(t,"a",function(){return o});var o=function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,null,[{key:"get",value:function(e,t){switch(e){case"NavigateToArticle":return new i(t.router,t.id,t.translationService,t.locale)}}}]),e}()}}]);
//# sourceMappingURL=home.59432738.js.map