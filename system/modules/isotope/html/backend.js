var Isotope={mediaManager:function(b,c,a){var l=document.id(a).getFirst("table");var f=l.getFirst("tbody");var k=document.id(b).getParent("tr");var m=f.getChildren();Backend.getScrollOffset();switch(c){case"up":k.getPrevious()?k.injectBefore(k.getPrevious()):k.injectInside(f);break;case"down":k.getNext()?k.injectAfter(k.getNext()):k.injectBefore(f.getFirst());break;case"delete":k.destroy();break}m=f.getChildren();for(var e=0;e<m.length;e++){var h=m[e].getChildren();for(var d=0;d<h.length;d++){var g=h[d].getFirst();if(g.type=="hidden"||g.type=="text"||g.type=="textarea"){g.name=g.name.replace(/\[[0-9]+\]/ig,"["+e+"]")}}}},attributeWizard:function(d,e,f){var a=document.id(f);var c=document.id(d).getParent();Backend.getScrollOffset();switch(e){case"up":if(!c.getPrevious()||c.getPrevious().hasClass("fixed")){c.injectInside(a)}else{c.injectBefore(c.getPrevious())}break;case"down":if(c.getNext()){c.injectAfter(c.getNext())}else{var b=a.getFirst();if(b.hasClass("fixed")){b=b.getNext()}c.injectBefore(b)}break}},fieldWizard:function(b,d,a){var o=document.id(a);var g=o.getFirst().getNext();var n=document.id(b).getParent("tr");var p=g.getChildren();Backend.getScrollOffset();switch(d){case"copy":var m=new Element("tr");var l=n.getChildren();for(var f=0;f<l.length;f++){var k=l[f].clone(true).injectInside(m);k.getFirst().value=l[f].getFirst().value;if(k.getFirst().type=="checkbox"){k.getFirst().checked=l[f].getFirst().checked?"checked":"";if(Browser.Engine.trident&&Browser.Engine.version<5){k.innerHTML=k.innerHTML.replace(/CHECKED/ig,'checked="checked"')}}}m.injectAfter(n);break;case"up":n.getPrevious()?n.injectBefore(n.getPrevious()):n.injectInside(g);break;case"down":n.getNext()?n.injectAfter(n.getNext()):n.injectBefore(g.getFirst());break;case"delete":(p.length>1)?n.destroy():null;break}p=g.getChildren();var c=new Array("value","label","default");for(var f=0;f<p.length;f++){var l=p[f].getChildren();for(var e=0;e<l.length;e++){var h=l[e].getFirst();if(h.type=="text"||h.type=="checkbox"||h.type=="hidden"){h.name=h.name.replace(/\[[0-9]+\]/ig,"["+f+"]")}}}},toggleCheckboxGroup:function(c,d){var b=document.id(c).className;var a=document.id(c).checked?"checked":"";if(b=="tl_checkbox"){$$("#"+d+" .tl_checkbox").each(function(e){if(!e.disabled){e.checked=a}})}else{if(b=="tl_tree_checkbox"){$$("#"+d+" .parent .tl_tree_checkbox").each(function(e){if(!e.disabled){e.checked=a}})}}Backend.getScrollOffset()},toggleProductTree:function(b,g,e,a,f){b.blur();var c=document.id(g);var d=document.id(b).getFirst();if(c){if(c.getStyle("display")=="none"){c.setStyle("display","inline");d.src=d.src.replace("folPlus.gif","folMinus.gif");document.id(b).title=CONTAO_COLLAPSE;new Request.Contao().post({action:"toggleProductTree",id:g,state:1,REQUEST_TOKEN:REQUEST_TOKEN})}else{c.setStyle("display","none");d.src=d.src.replace("folMinus.gif","folPlus.gif");document.id(b).title=CONTAO_EXPAND;new Request.Contao().post({action:"toggleProductTree",id:g,state:0,REQUEST_TOKEN:REQUEST_TOKEN})}return false}new Request.Contao({onRequest:AjaxRequest.displayBox("Loading data …"),onSuccess:function(h,j){var i=new Element("ul");i.addClass("level_"+f);i.set("html",h);c=new Element("li");c.addClass("parent");c.setProperty("id",g);c.setStyle("display","inline");i.injectInside(c);c.injectAfter(document.id(b).getParent("li"));document.id(b).title=CONTAO_COLLAPSE;d.src=d.src.replace("folPlus.gif","folMinus.gif");AjaxRequest.hideBox();window.fireEvent("ajax_change")}}).post({action:"loadProductTree",id:g,level:f,field:e,name:a,state:1,REQUEST_TOKEN:REQUEST_TOKEN});return false},addInteractiveHelp:function(){$$("a.tl_tip").each(function(a){if(a.retrieve("complete")){return}a.addEvent("mouseover",function(){a.timo=setTimeout(function(){var c=document.id("tl_helpBox");if(!c){c=new Element("div").setProperty("id","tl_helpBox").injectInside(document.id(document.body))}var b=a.getTop();c.set("html",a.get("longdesc"));c.setStyle("display","block");c.setStyle("top",(b+18)+"px")},1000)});a.addEvent("mouseout",function(){var b=document.id("tl_helpBox");if(b){b.setStyle("display","none")}clearTimeout(a.timo)});a.store("complete",true)})},inheritFields:function(a,b){var c=false;a.each(function(f,g){var j=document.id(("ctrl_"+f));if(j){var h=j.getParent("div").getFirst("h3");if(!h&&j.match(".tl_checkbox_single_container")){h=j}if(!h){c=true;return}h.addClass("inherit");var d=document.id("ctrl_inherit").getFirst(("input[value="+f+"]"));d.setStyle("float","right").inject(h);document.id("ctrl_inherit").getFirst(("label[for="+d.get("id")+"]")).setStyles({"float":"right","padding-right":"5px","font-weight":"normal"}).set("text",b).inject(h);d.addEvent("change",function(l){var i=document.id(("ctrl_"+l.target.get("value")));if(i.match(".tl_checkbox_single_container")){i.getFirst("input").disabled=l.target.checked}else{i.setStyle("display",(l.target.checked?"none":"initial"));try{i.getNext(":not(.tl_tip)").setStyle("display",(l.target.checked?"none":"initial"))}catch(m){}}});if(j.match(".tl_checkbox_single_container")){j.getFirst("input").readonly=d.checked}else{j.setStyle("display",(d.checked?"none":"initial"));try{j.getNext(":not(.tl_tip)").setStyle("display",(d.checked?"none":"initial"))}catch(k){}}}});if(!c){document.id("ctrl_inherit").getParent("div").setStyle("display","none")}},initializeToolsMenu:function(){var a=document.getElements("#tl_buttons .isotope-tools");if(a.length<1){return}a.each(function(c){c.previousSibling.nodeValue=""});document.getElement("a.header_isotope_tools").addEvent("click",function(c){document.id("isotopetoolsmenu").setStyle("display","block");return false}).setStyle("display","inline");var b=new Element("div",{id:"isotopetoolsmenu",styles:{top:($$("a.header_isotope_tools")[0].getPosition().y+22)}}).adopt(a).inject(document.id(document.body)).setStyle("left",$$("a.header_isotope_tools")[0].getPosition().x-7);document.id(document.body).addEvent("click",function(){document.id("isotopetoolsmenu").setStyle("display","none")})},initializeFilterMenu:function(){var a=document.getElements("#tl_buttons .isotope-filter");if(a.length<1){return}a.each(function(c){c.previousSibling.nodeValue=""});document.getElement("a.header_iso_filter").addEvent("click",function(c){document.id("isotopefiltermenu").setStyle("display","block");return false}).setStyle("display","inline");var b=new Element("div",{id:"isotopefiltermenu",styles:{top:($$("a.header_iso_filter")[0].getPosition().y+22)}}).adopt(a).inject(document.id(document.body)).setStyle("left",$$("a.header_iso_filter")[0].getPosition().x-7);document.id(document.body).addEvent("click",function(){document.id("isotopefiltermenu").setStyle("display","none")})},initializeToolsButton:function(){document.getElements("#tl_listing .isotope-tools, .tl_listing .isotope-tools").addClass("invisible");document.getElements("a.isotope-contextmenu").each(function(a){if(a.getNext("a.isotope-tools")){a.removeClass("invisible").addEvent("click",function(b){if($defined(document.id("isotope-contextmenu"))){document.id("isotope-contextmenu").destroy()}var c=new Element("div",{id:"isotope-contextmenu",styles:{top:(a.getPosition().y+22),display:"block"}});a.getAllNext("a.isotope-tools").each(function(e){var d=e.getFirst("img");new Element("a",{href:e.get("href"),title:e.get("title"),html:(e.get("html")+" "+d.get("alt"))}).inject(c)});c.inject(document.id(document.body));c.setStyle("left",a.getPosition().x-(c.getSize().x/2));return false})}});document.id(document.body).addEvent("click",function(a){if($defined(document.id("isotope-contextmenu"))&&!a.target.getParent("#isotope-contextmenu")){document.id("isotope-contextmenu").destroy()}})},makePageViewSortable:function(a){var b=new Sortables(a,{contstrain:true,opacity:0.6});b.active=false;b.addEvent("start",function(){b.active=true});b.addEvent("complete",function(d){if(!b.active){return}if(d.getPrevious()){var f=d.get("id").replace(/li_/,"");var c=d.getPrevious().get("id").replace(/li_/,"");var e=window.location.search.replace(/id=[0-9]*/,"id="+f)+"&act=cut&mode=1&page_id="+c;new Request({url:window.location.href,method:"get",data:e}).send()}else{if(d.getParent()){var f=d.get("id").replace(/li_/,"");var c=d.getParent().get("id").replace(/ul_/,"");var e=window.location.search.replace(/id=[0-9]*/,"id="+f)+"&act=cut&mode=2&page_id="+c;new Request({url:window.location.href,method:"get",data:e}).send()}}})}};window.addEvent("domready",function(){Isotope.addInteractiveHelp();Isotope.initializeToolsMenu();Isotope.initializeFilterMenu();Isotope.initializeToolsButton()}).addEvent("structure",function(){Isotope.initializeToolsButton()});