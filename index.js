$((function(){function e(){var e=$("#categoryUrlTree");e.empty(),DAO.db.exeSql("SELECT a.id,a.name,a.desc,null img,b.num,'1' type FROM categories a left join   (    select sup_id,count(1) num     from       (         select sup_id,1 num from categories where level = 2         union all         select cat_id,1 from urls      )     group by sup_id  ) b on a.id = b.sup_id WHERE a.level = 1 union all select id, name,addr desc,img,0,'0' type from urls where cat_id = ''",[],(t=>{t.forEach(((a,r)=>{s(a,1,e,!1,t.length,r)}))}))}function t(e,a,r){DAO.db.exeSql("SELECT id, name FROM categories WHERE sup_id = ?",[e],(e=>{r(e),e&&e.length>0&&e.forEach(((e,a)=>{t(e.id,e.name,r)}))}),(()=>{Toast.show("类别 “"+a+"” 查询失败",LEVEL.ERROR)}))}function a(){$("#caseSence").prop("checked")||!$("#hasChar").prop("checked")?($("#lowercase").prop("disabled",!0),$("#lowercase").next().addClass("disabled")):($("#lowercase").prop("disabled",!1),$("#lowercase").next().removeClass("disabled"))}function r(e,t,a){var r=$("<table></table>");r.css({width:"100%"});var n=Form.generateForm([{label:"类别名称",attr:{type:"text",id:"input-category-name"}},{label:"类别描述",attr:{type:"text",id:"input-category-description"}},{label:"上级类别",attr:{type:"button",id:"button-super-category-select",value:e}},{label:"上级类别编号",attr:{type:"hidden",id:"input-super-category-id",value:t}},{label:"上级类别级别",attr:{type:"hidden",id:"input-super-category-level",value:a}}]);r.append(n),PopWin.show("新增类别",r,[new PopBtn("取消",null,(()=>{})),new PopBtn("新增",LEVEL.SUCCESS,(()=>{const e=$("#input-category-name").val(),t=$("#input-category-description").val(),a=$("#input-super-category-id").val();let r=$("#input-super-category-level").val();return r=""==r||""==a?"0":r,r=parseInt(r)+1,DAO.db.exeSql("SELECT 1 FROM categories WHERE name = ? and sup_id = ?",[e,a],(n=>{if(null==n||n.length<=0){var l={id:Math.uuidFast(),name:e,desc:t,sup_id:a,level:r,add_time:(new Date).getTime()};DAO.db.batInsert([l],"categories",(()=>{Toast.show("类别 “"+e+"” 新增成功",LEVEL.SUCCESS),PopWin.hide();var t=""==a?$("#categoryUrlTree"):$("#cat_"+a);""!=a&&"opened"!=t.attr("status")||(l.type="1",s(l,r,t,!0)),o(t,!0)}),(()=>{Toast.show("新增类别失败",LEVEL.ERROR),PopWin.hide()}))}else Toast.show("指定上级类别下已有该类别名称",LEVEL.ERROR)}),(()=>{Toast.show("校验类别失败",LEVEL.ERROR)})),!1}))])}function s(e,t,a,r,s,o){var i=$("<div class='sub-categories'></div>"),d=$("<div class='obj-area'></div>"),c=$("<img class='identifier-img' />"),p=$("<a class='open-obj' href='javascript:;'></a>"),u=$("<div class='oper-area'></div>"),g=$("<button class='delete-category error'>删除</button>"),h=$("<button class='update-category'>修改</button>"),E="1"==e.type?"cat":"url";if(i.attr("id",E+"_"+e.id),i.attr("obj_type",E),i.attr("obj_id",e.id),i.attr("level",""+t),i.attr("status","closed"),i.data("index",o),i.data("count",s),"url"==E)c.attr("src",e.img?e.img:"assets/url.png"),i.attr("url",e.desc),u.append([h,g]);else{c.attr("src","assets/"+(e.num>0?"not_empty":"empty")+"_closed.png");var m=$("<button class='add-sub-category'>增加下级类别</button>"),b=$("<button class='add-url'>增加地址</button>");u.append([h,m,b,g])}e.desc&&(c.attr("title",e.desc),p.attr("title",e.desc)),p.text(e.name),d.append(function(e,t,a,r,s){const n=[];for(let t=0;t<e;t++){let e=$("<div class='tree-tab'></div>"),t=$("<div class='tree-tab-left'></div>"),l=$("<div class='tree-tab-up'></div>"),o=$("<div class='tree-tab-right'></div>"),i=$("<div class='tree-tab-down'></div>");e.data("obj_id",r),e.data("index",a),e.data("level",s),e.append([t,l,i,o]),n.push(e)}return n}(t,0,o,e.id,t),[c,p,u]),i.append(d),"url"!=E&&r?i.insertAfter(a.find(".sub-categories[obj_type='cat']").last()):a.append(i),function(e){e.find(".sub-categories .show-line").removeClass("show-line");var t=parseInt(e.attr("level")),a=e.find(".sub-categories[level='"+(t+1)+"']");let r=n(e);for(var s=0;s<a.length;s++)for(var o=$(a.get(s)),i=o.find(".tree-tab"),d=0;d<i.length;d++){var c=$(i.get(d)),p=c.data("index"),u=c.data("level"),g=l(o);g&&(d!=u-1&&g.find(".obj-area:first-child").find(".tree-tab:nth-child("+d+")").find(".tree-tab-down").hasClass("show-line")?c.find(".tree-tab-up").addClass("show-line"):d!=u-1||0==t&&0==p||c.find(".tree-tab-up").addClass("show-line")),d+1==u&&c.find(".tree-tab-right").addClass("show-line");var h=n(o);if(h)if(u!=parseInt(h.attr("level"))){let e=h.find(".obj-area:first-child").find(".tree-tab:nth-child("+d+")");e.length>0&&e.find(".tree-tab-up").hasClass("show-line")&&c.find(".tree-tab-down").addClass("show-line")}else if(r&&d<u-1){let e=r.find(".obj-area:first-child").find(".tree-tab:nth-child("+d+")");e.length>0&&e.find(".tree-tab-up").hasClass("show-line")&&c.find(".tree-tab-down").addClass("show-line")}else d==u-1&&c.find(".tree-tab-down").addClass("show-line")}}(a);(localStorage.getItem("opendCats")||"").indexOf(e.id)>=0&&p.trigger("click")}function n(e){var t=null;if(e)if(e.next().length>0)t=e.next();else{var a=e.parent();a.hasClass("sub-categories")&&(t=n(a))}return t}function l(e){var t=null;if(e)if(e.prev().length>0)t=e.prev();else{var a=e.parent();a.hasClass("sub-categories")&&(t=a)}return t}function o(e,t){if("categoryUrlTree"!=e.attr("id")){var a=e.find("img").first();t?a.attr("src").indexOf("not_empty")<0&&a.attr("src",a.attr("src").replace("empty","not_empty")):a.attr("src",a.attr("src").replace("not_",""))}}function i(e,t,a){var r=$("<table class='url'></table>");r.css({width:"100%"});var n=$("<img id='img-url' src='"+url_img_str+"' />&nbsp;<a href='javascript:;' id='reset-img'>默认</a><span style='color: red;'>&nbsp;长宽均不得超过100像素</span>"),l=Form.generateForm([{label:"地址说明",attr:{type:"text",id:"input-url-name"}},{label:"地址",attr:{type:"text",id:"input-url-addr",class:"url"}},{label:"图标",attr:{type:"file",id:"input-file"},replaceEl:n},{label:"所属类别",attr:{type:"button",id:"button-super-category-select",value:e}},{label:"所属类别编号",attr:{type:"hidden",id:"input-super-category-id",value:t}},{label:"所属类别级别",attr:{type:"hidden",id:"input-super-category-level",value:a}}]);r.append(l),PopWin.show("新增地址",r,[new PopBtn("取消",null,(()=>{})),new PopBtn("新增",LEVEL.SUCCESS,(()=>{const e=$("#input-url-name").val(),t=$("#input-url-addr").val(),a=$("#input-super-category-id").val(),r=$("#input-super-category-level").val(),n=$("#img-url").attr("src");return DAO.db.exeSql("SELECT 1 FROM urls WHERE cat_id = ? AND name = ?",[a,e],(l=>{if(null==l||l.length<=0){var i={id:Math.uuidFast(),name:e,addr:t,img:n,cat_id:a,add_time:(new Date).getTime()};DAO.db.batInsert([i],"urls",(()=>{if(Toast.show("地址 “"+e+"” 新增成功",LEVEL.SUCCESS),PopWin.hide(),i.type="0",i.desc=t,""==a)s(i,1,$("#categoryUrlTree"));else{var n=$("#cat_"+a);"opened"==n.attr("status")&&s(i,parseInt(r)+1,n),o(n,!0)}}),(()=>{Toast.show("新增地址失败",LEVEL.ERROR),PopWin.hide()}))}else Toast.show("已有该地址",LEVEL.ERROR)}),((e,t)=>{Toast.show("校验地址失败",LEVEL.ERROR)})),!1}))])}function d(e){let t=localStorage.getItem("opendCats")||"";t.indexOf(e)>=0&&localStorage.setItem("opendCats",t.replace(e+",",""))}$("#categoryUrlTree").on("click",".open-obj,.identifier-img",(e=>{var t=$(e.target).parent().parent(),a=t.attr("obj_type"),r=t.attr("obj_id");if("cat"==a){var n=t.attr("status"),l=t.find(".identifier-img").first();if("closed"==n){var o=parseInt(t.attr("level"))+1;DAO.db.exeSql("SELECT a.id,a.name,a.desc,null img,b.num,'1' type FROM categories a left join (   select sup_id,count(1) num   from      (       select sup_id,1 num from categories where level = ?       union all       select cat_id,1 from urls      )   group by sup_id ) b on a.id = b.sup_id WHERE a.level = ? and a.sup_id = ? union all select id, name,addr desc,img,0,'0' type from urls where cat_id = ?",[o+1,o,r,r],(e=>{e.forEach(((a,r)=>{s(a,o,t,!1,e.length,r)})),t.attr("status","opened"),l.attr("src",l.attr("src").replace("closed","opened")),function(e){let t=localStorage.getItem("opendCats")||"";t.indexOf(e)<0&&(t+=e+",",localStorage.setItem("opendCats",t))}(r)}))}else{const e=t.find(".sub-categories");for(let t=0;t<e.length;t++){const a=$(e.get(t));"opened"==a.attr("status")&&d(a.attr("obj_id"))}t.find(".sub-categories").remove(),t.attr("status","closed"),l.attr("src",l.attr("src").replace("opened","closed")),d(r)}}else{var i=t.attr("url");if(i.startsWith("file")){const e=$('<input id="input_temp" type="hidden" />');e.val(i),e.appendTo($("body")),document.execCommand("copy")}else window.open(i)}})),$("#categoryUrlTree").on("click",".delete-category",(e=>{const a=$(e.target).parent().parent().parent(),r=a.parent(),s=a.attr("obj_type"),n=a.attr("obj_id"),l=a.find("a").first().text(),i="cat"==s?"类别":"地址";PopWin.show("删除"+i,"您确认要删除"+i+" “"+l+"” 吗？",[new PopBtn("取消",null,(()=>{})),new PopBtn("删除",LEVEL.ERROR,(()=>{if("cat"==s){var e=[],a=1;e.push(n),t(n,l,(t=>{a--,t&&t.length>0&&(a+=t.length,t.forEach((t=>{e.push(t.id)}))),0==a&&DAO.db.exeSql("DELETE FROM urls WHERE cat_id in ?",[e],(()=>{DAO.db.exeSql("DELETE FROM categories WHERE id in ?",[e],(()=>{Toast.show(i+" “"+l+"” 删除成功",LEVEL.SUCCESS),$("#cat_"+n).remove(),o(r,r.find(".sub-categories").length>0)}),(()=>{Toast.show(i+" “"+l+"” 删除失败",LEVEL.ERROR)}))}),(()=>{Toast.show("类别下地址删除失败",LEVEL.ERROR)}))}))}else DAO.db.exeSql("DELETE FROM urls WHERE id = ?",[n],(()=>{Toast.show(i+" “"+l+"” 删除成功",LEVEL.SUCCESS),$("#url_"+n).remove(),o(r,r.find(".sub-categories").length>0)}),(()=>{Toast.show(i+" “"+l+"” 删除失败",LEVEL.ERROR)}))}))])})),$("#categoryUrlTree").on("click",".update-category",(e=>{const t=$(e.target).parent().parent().parent(),a=t.attr("obj_type"),r=t.attr("obj_id");"cat"==a?DAO.db.exeSql("SELECT id,name,desc,sup_id,level FROM categories WHERE id = ?",[r],(e=>{if(e&&e.length>0){var a=e[0],s=$("<table></table>");s.css({width:"100%"});let l=function(){let e="",a=t.parents(".sub-categories");for(let t=a.length-1;t>=0;t--)e+=$(a[t]).find("a").first().text(),t>0&&(e+=" >> ");return e}();var n=Form.generateForm([{label:"类别主键",attr:{type:"hidden",id:"input-category-id",value:r}},{label:"类别名称",attr:{type:"text",id:"input-category-name",value:a.name}},{label:"类别描述",attr:{type:"text",id:"input-category-description",value:a.desc}},{label:"上级类别",attr:{type:"text",readOnly:"readOnly",value:""==l?"顶级":l}}]);s.append(n),PopWin.show("修改类别",s,[new PopBtn("取消",null,(()=>{})),new PopBtn("保存",LEVEL.SUCCESS,(()=>{const e=$("#input-category-name").val(),t=$("#input-category-description").val();return DAO.db.exeSql("SELECT 1 FROM categories WHERE name = ? and sup_id = ? and id != ?",[e,a.sup_id,r],(a=>{null==a||a.length<=0?DAO.db.exeSql("UPDATE categories set name = ? , desc = ? WHERE id = ?",[e,t,r],(()=>{Toast.show("类别修改成功",LEVEL.SUCCESS),$("#cat_"+r).find("a").first().text(e),$("#cat_"+r+" .obj-area:nth(0) img,#cat_"+r+" .obj-area:nth(0) a").attr("title",t),PopWin.hide()}),(()=>{Toast.show("类别修改失败",LEVEL.ERROR)})):Toast.show("指定上级类别下已有该类别名称",LEVEL.ERROR)}),(()=>{Toast.show("校验类别失败",LEVEL.ERROR)})),!1}))])}}),(()=>{Toast.show("获取类别信息失败",LEVEL.ERROR)})):DAO.db.exeSql("SELECT id,name,addr,img,cat_id FROM urls WHERE id = ?",[r],(e=>{if(e&&e.length>0){var a=e[0],s=$("<table class='url'></table>");s.css({width:"100%"});let o=function(){let e="",a=t.parents(".sub-categories");for(let t=a.length-1;t>=0;t--)e+=$(a[t]).find("a").first().text(),t>0&&(e+=" >> ");return e}();var n=$("<img id='img-url' src='"+(a.img?a.img:url_img_str)+"' />&nbsp;<a href='javascript:;' id='reset-img'>默认</a><span style='color: red;'>&nbsp;长宽均不得超过100像素</span>"),l=Form.generateForm([{label:"地址主键",attr:{type:"hidden",id:"input-url-id",value:r}},{label:"地址说明",attr:{type:"text",id:"input-url-name",value:a.name}},{label:"地址",attr:{type:"text",id:"input-url-description",value:a.addr}},{label:"图标",attr:{type:"file",id:"input-file"},replaceEl:n},{label:"所属类别",attr:{type:"text",readOnly:"readOnly",value:""==o?"顶级":o}}]);s.append(l),PopWin.show("修改地址",s,[new PopBtn("取消",null,(()=>{})),new PopBtn("保存",LEVEL.SUCCESS,(()=>{const e=$("#input-url-name").val(),t=$("#input-url-description").val(),s=$("#img-url").attr("src");return DAO.db.exeSql("SELECT 1 FROM urls WHERE cat_id = ? AND name = ? and id != ?",[a.cat_id,e,r],(a=>{null==a||a.length<=0?DAO.db.exeSql("UPDATE urls set name = ?, addr = ?, img = ? WHERE id = ?",[e,t,s,r],(()=>{Toast.show("地址修改成功",LEVEL.SUCCESS),PopWin.hide(),$("#url_"+r).find("a").first().text(e),$("#url_"+r).find("img").attr("src",s),$("#url_"+r+" img,#url_"+r+" a").attr("url",t)}),(()=>{Toast.show("地址修改失败",LEVEL.ERROR)})):Toast.show("指定类别下已有该地址",LEVEL.ERROR)}),((e,t)=>{Toast.show("校验地址失败",LEVEL.ERROR)})),!1}))])}}),(()=>{Toast.show("获取类别信息失败",LEVEL.ERROR)}))})),$("#categoriesList").on("click",".delete-category",(e=>{const t=$(e.target).attr("cat_id"),a=$("#cat_"+t).find(".category-name").text();PopWin.show("删除类别","您确认要删除类别 “"+a+"” 吗？",[new PopBtn("取消",null,(()=>{})),new PopBtn("删除",LEVEL.ERROR,(()=>{DAO.db.exeSql("DELETE FROM categories WHERE id = ?",[t],(()=>{var e;Toast.show("类别 “"+a+"” 删除成功",LEVEL.SUCCESS),(e=$("#categoriesList")).empty(),DAO.db.exeSql("SELECT a.id,a.name,a.desc,a.sup_id,a.add_time,b.name sup_name FROM categories a LEFT JOIN categories b ON a.sup_id = b.id",[],(t=>{t.forEach(((t,a)=>{var r=$("<tr></tr>"),s=$("<td class='center'></td>"),n=$("<td class='category-name'></td>"),l=$("<td></td>"),o=$("<td></td>"),i=$("<td class='center'></td>"),d=$("<td class='center'></td>"),c=$("<button class='delete-category error'>删除</button>");r.attr("id","cat_"+t.id),s.text(a+1),n.text(t.name),l.text(t.desc),o.text(t.sup_name),i.text(new Date(t.add_time).format("yyyy-MM-dd hh:mm:ss")),c.attr("cat_id",t.id),d.append(c),r.append([s,n,l,o,i,d]),e.append(r)}))}))}),(()=>{Toast.show("类别 “"+a+"” 删除失败",LEVEL.ERROR)}))}))])})),$("#hasChar").on("change",(()=>{$("#hasChar").prop("checked")?($("#caseSence").prop("disabled",!1),$("#caseSence").next().removeClass("disabled")):($("#caseSence").prop("disabled",!0),$("#caseSence").next().addClass("disabled")),a()})),$("#caseSence").on("change",a),$("#caseSence").on("change",a),$("#generatePassword").on("click",(()=>{const e=parseInt($("#passwordLength").val()),t=$("#hasNum").prop("checked"),a=$("#hasChar").prop("checked"),r=$("#hasSymbol").prop("checked"),s=$("#caseSence").prop("checked"),n=$("#lowercase").prop("checked"),l=genEnCode(e,t,a,r,s,n);if(null==l)return void Toast.show("不能生成密码",LEVEL.ERROR);$("#password").val(l);const o=$('<input id="input_tmp" type="hidden" />');o.val(l),o.appendTo($("body")),document.execCommand("copy"),localStorage.setItem("hasNum",t?"1":"0"),localStorage.setItem("hasChar",a?"1":"0"),localStorage.setItem("hasSymbol",r?"1":"0"),localStorage.setItem("caseSence",s?"1":"0"),localStorage.setItem("lowercase",n?"1":"0"),localStorage.setItem("passwordLength",e)})),$("#openAddCategoryWindow").on("click",(()=>{r("选择上级类别","","")})),$("body").on("click","#button-super-category-select",(()=>{$(".menu-area").remove(),DAO.db.exeSql("SELECT a.id,a.name,a.desc,b.num FROM categories a left join (select sup_id,count(1) num from categories where level = 2 group by sup_id) b on a.id = b.sup_id WHERE a.level = 1",[],(e=>{if(null!=e&&e.length>0){var t=$("#button-super-category-select"),a=$("<div></div>");if(a.addClass("menu-area level-1"),a.attr("level",1),1){var r=$("<div></div>"),s=$("<div></div>"),n=$("<div></div>");s.text("无"),s.addClass("text"),n.text(""),n.addClass("right"),r.append([s,n]),r.addClass("menu"),r.attr("menu_id",""),r.attr("level",1),r.attr("path","无"),a.append(r)}e.forEach((e=>{var t=$("<div></div>"),r=$("<div></div>"),s=$("<div></div>");r.text(e.name),r.addClass("text"),s.text(e.num?">":""),s.addClass("right"),t.append([r,s]),t.addClass("menu"+(e.num?" has-next":"")),t.attr("menu_id",e.id),t.attr("level",1),t.attr("path",e.name),a.append(t)})),$("body").append(a),a.css({position:"absolute",top:t.offset().top+t.outerHeight()+"px",left:t.offset().left+"px"})}}),(()=>{Toast.show("查询类别失败",LEVEL.ERROR)}))})),$("body").on("click",".menu",(e=>{var t=$(e.target);t.hasClass("menu")||(t=t.parent()),$("#button-super-category-select").val(t.attr("path")),$("#input-super-category-id").val(t.attr("menu_id")),$("#input-super-category-level").val(t.attr("level"))})),$(document).on("click",(e=>{"button-super-category-select"!=$(e.target).attr("id")&&$(".menu-area").remove()})),$("body").on("mouseenter",".menu",(e=>{var t=$(e.target);t.hasClass("has-next")||(t=t.parent());var a=parseInt(t.attr("level"))+1;if($(".level-"+a).remove(),t.hasClass("has-next")){var r=t.attr("menu_id");DAO.db.exeSql("SELECT a.id,a.name,a.desc,b.num FROM categories a left join (select sup_id,count(1) num from categories where level = ? group by sup_id) b on a.id = b.sup_id WHERE a.sup_id = ?",[a+1,r],(e=>{if(null!=e&&e.length>0){var s=function(){for(var e="",t=1;t<=a;t++)e+=" level-"+t;return e}(),n=$("<div></div>");n.addClass("menu-area "+s),n.attr("for",r),n.attr("level",a);var l=t.attr("path");e.forEach((e=>{var t=$("<div></div>"),r=$("<div></div>"),s=$("<div></div>");r.text(e.name),r.addClass("text"),s.text(e.num?">":""),s.addClass("right"),t.append([r,s]),t.addClass("menu"+(e.num?" has-next":"")),t.attr("menu_id",e.id),t.attr("level",a),t.attr("path",l+(""==l?"":" >> ")+e.name),n.append(t)})),$("body").append(n),n.css({position:"absolute",top:t.offset().top+"px",left:t.offset().left+t.outerWidth()+"px"})}}))}})),$("#categoryUrlTree").on("click",".add-sub-category",(e=>{const t=$(e.target).parent().parent().parent(),a=t.attr("obj_id"),s=t.find("a").first().text(),n=t.attr("level");r(function(){let e="",a=t.parents(".sub-categories");for(let t=a.length-1;t>=0;t--)e+=$(a[t]).find("a").first().text(),t>0&&(e+=" >> ");return e+=(""==e?"":" >> ")+s,e}(),a,n)})),$("#categoryUrlTree").on("click",".add-url",(e=>{const t=$(e.target).parent().parent().parent(),a=t.attr("obj_id"),r=t.find("a").first().text(),s=t.attr("level");i(function(){let e="",a=t.parents(".sub-categories");for(let t=a.length-1;t>=0;t--)e+=$(a[t]).find("a").first().text(),t>0&&(e+=" >> ");return e+=(""==e?"":" >> ")+r,e}(),a,s)})),$("body").on("click","#img-url",(()=>{$("#input-file").trigger("click")})),$("body").on("click","#reset-img",(()=>{$("#img-url").attr("src",url_img_str)})),$("#openAddUrlWindow").on("click",(()=>{i("所属类别","","")})),$("#openExportDataWindow").on("click",(()=>{const e=$("<textarea id='sqlData'></textarea>");PopWin.show("导出数据",e,[new PopBtn("关闭",null,(()=>{}))],(()=>{DAO.getAllData((e=>{$("#sqlData").val($("#sqlData").val()+e+";\n")}))}))})),$("#openImportDataWindow").on("click",(()=>{const t=$("<table><tr style='color:red;'><td>注意：此操作会删除当前的全部数据。</td></tr><tr><td><textarea id='sqlData' style='width: 100%;'></textarea></td></tr></table>");PopWin.show("导入数据",t,[new PopBtn("取消",null,(()=>{})),new PopBtn("导入",LEVEL.SUCCESS,(()=>{const t=$("#sqlData").val();return DAO.db.batchExecute(["DELETE FROM categories","DELETE FROM urls"],(()=>{DAO.db.batchExecute(t.split("\n"),(()=>{Toast.show("导入成功",LEVEL.SUCCESS),PopWin.hide(),e()}),(()=>{Toast.show("导入失败",LEVEL.ERROR)}))}),(()=>{Toast.show("清除数据失败",LEVEL.ERROR)})),!1}))])})),$("body").on("change","#input-file",(e=>{if(e.target.files.length>0){const t=e.target.files[0],a=new FileReader;a.onload=function(e){const t=new Image;t.onload=function(){const e=this.width,a=this.height;e>100||a>100?Toast.show("所选图片超出范围",LEVEL.ERROR):$("#img-url").attr("src",t.src)},t.onerror=e=>{},t.src=e.target.result},a.onerror=e=>{},a.onabort=()=>{},a.onloadstart=()=>{},a.onprogress=()=>{},a.readAsDataURL(t)}})),$("#passwordLength").val(localStorage.getItem("passwordLength")||16),$("#hasNum").prop("checked","1"==localStorage.getItem("hasNum")),$("#hasChar").prop("checked","1"==localStorage.getItem("hasChar")),$("#hasSymbol").prop("checked","1"==localStorage.getItem("hasSymbol")),$("#caseSence").prop("checked","1"==localStorage.getItem("caseSence")),$("#lowercase").prop("checked","1"==localStorage.getItem("lowercase")),$("#hasChar").prop("checked")?($("#caseSence").prop("disabled",!1),$("#caseSence").next().removeClass("disabled"),$("#caseSence").prop("checked")?($("#lowercase").prop("disabled",!0),$("#lowercase").next().addClass("disabled")):($("#lowercase").prop("disabled",!1),$("#lowercase").next().removeClass("disabled"))):($("#caseSence").prop("disabled",!0),$("#caseSence").next().addClass("disabled"),$("#lowercase").prop("disabled",!0),$("#lowercase").next().addClass("disabled")),DAO.init(),e(),$("body").on("copy",(e=>{$("#input_temp").length>0&&(e.preventDefault(),e.originalEvent&&e.originalEvent.clipboardData?(e.originalEvent.clipboardData.setData("text/plain",$("#input_temp").val()),Toast.show("无法打开该地址，已复制地址至剪贴板")):PopWin.show("地址",$("#input_temp").val(),[new PopBtn("关闭")]),$("#input_temp").remove()),$("#input_tmp").length>0&&(e.preventDefault(),e.originalEvent&&e.originalEvent.clipboardData?(e.originalEvent.clipboardData.setData("text/plain",$("#input_tmp").val()),Toast.show("密码已复制地址至剪贴板")):Toast.show("密码已打印至控制台"),$("#input_tmp").remove())}))}));