var Sqlite3=function(t){var e=openDatabase(t,"1.0.0","dbviewer",10485760);return{getDBName:function(){return t},db:e,init:function(t,e){return this.switchTable(t),e.length>0&&this.createTable(e),this},createTable:function(t){var n,r="CREATE TABLE IF NOT EXISTS "+this._table;if(t instanceof Array&&t.length>0){n=[];for(var i=0;i<t.length;i++)n.push(t[i].name+" "+t[i].type);n=n.join(", ")}else"object"==typeof t&&(n+=t.name+" "+t.type);r=r+" ("+n+")";e.transaction((function(t){t.executeSql(r)}))},switchTable:function(t){return this._table=t,this._where="",this},insertData:function(t,n,r,i){null==i&&(i=function(t,e){o.onfail(t,e)});var o=this,a="REPLACE INTO "+n;if(!(t instanceof Array&&t.length>0))return!1;var f=[],u=[];for(var s in t[0])f.push(s),u.push("?");a+=" ("+f.join(",")+") Values ("+u.join(",")+")";var h=[],c=t,l=[];for(let t=0,e=c.length;t<e;t++){var v=[];for(var p in c[t])v.push(c[t][p]);h.push(v)}var g=function(t,n){n&&l.push(n.insertId||n.rowsAffected),h.length>0?e.transaction((function(t){t.executeSql(a,h.shift(),g,(function(t,e){i(t,e)}))})):r&&r.call(this,l)};g()},_where:"",where:function(t){if(t)if("object"==typeof t){var e=this.toArray(t);this._where=e.join(" and ")}else"string"==typeof t&&(this._where=t);else this._where="";return this},updateData:function(t,e,n,r){r||(r=this._where);var i="Update "+e;i+=" Set "+(t=this.toArray(t).join(","))+" where "+r,this.doQuery(i,n)},saveData:function(t,e,n,r){var i=this;r||(r=i._where);var o="select * from "+e+" where "+r;this.doQuery(o,(function(o){o.length>0&&o[0]instanceof Object?i.updateData(t,e,n,r):i.insertData([t],e,n)}))},getData:function(t,e,n){var r=this,i="select * from "+t;r._where.length>0&&(i+=" where "+r._where),r.doQuery(i,e,n)},doQuery:function(t,n,r){null==r&&(r=function(t,e){i.onfail(t,e)});var i=this,o=[],a=function(t,e){if(e.rows.length)for(var r=0;r<e.rows.length;r++)o.push(e.rows.item(r));n&&n.call(i,o)};e.transaction((function(e){e.executeSql(t,[],a,r)}))},createIndex:function(t,e,n,r){var i="create index on "+e,o=n.length;o>0&&(i+="(");for(var a=0;a<o;a++)i+=n[a],a<o-1&&(i+=",");o>0&&(i+=")"),this.doQuery(i,r)},deleteData:function(t,e){var n=this,r="delete from "+t;n._where.length>0&&(r+=" where "+n._where),n.doQuery(r,e)},dropTable:function(t,e,n){null==e&&(e=function(){}),null==n&&(n=function(){});var r="DROP TABLE IF EXISTS "+t;this.doQuery(r,e,n)},_error:"",onfail:function(t,e){this._error=e.message},toArray:function(t){var e=[];if(t=t||{})for(var n in t)e.push(n+"='"+t[n]+"'");return e},exeSql:function(t,e,n,r){var i=t.split("?");t="";for(var o=0;o<i.length;o++)if(t+=i[o],null!=e[o]&&(e[o],1))if("string"==typeof e[o])t+=" '"+e[o]+"' ";else if(e[o]instanceof Array){t+=" (";for(var a=0;a<e[o].length;a++)"string"==typeof e[o][a]?t+="'"+e[o][a]+"'":t+=e[o][a],a<e[o].length-1&&(t+=",");t+=") "}else t+=" "+e[o]+" ";this.doQuery(t,n,r)},queryData:function(t,e,n,r){var i=this;i.where(t),i.getData(e,(function(t,e){i.where(""),n(t,e)}),(function(t,e){i.where(""),r(t,e)}))},batInsert:function(t,n,r,i){var o=this;null==i&&(i=function(t,e){o.onfail(t,e)}),e.transaction((function(e){var a=t.length,f=0;0==a&&r();let u=function(t,e){++f==a&&r(e)},s=function(t,e){i(t,e)};for(var h=0;h<a;h++){for(var c=t[h],l=o.ShowObjProperty(c),v="",p=l.split(", "),g=p.length,w=[],y=0;y<g;y++)w[y]=c[p[y]],v+="?",y!=g-1&&(v+=",");e.executeSql("replace into "+n+"("+l+") values("+v+")",w,u,s)}}))},batInsert2:function(t,n,r,i){var o=this;null==i&&(i=function(t,e){o.onfail(t,e)}),e.transaction((function(e){var a=t.length,f=0;let u=function(t,e){++f==a&&r(e)},s=function(t,e){i(t,e)};for(var h=0;h<a;h++){for(var c=t[h],l=o.ShowObjProperty(c),v="",p=l.split(", "),g=p.length,w=[],y=0;y<g;y++)w[y]=c[p[y]],v+="?",y!=g-1&&(v+=",");e.executeSql("insert into "+n+"("+l+") values("+v+")",w,u,s)}}))},ShowObjProperty:function(t,e,n){var r="";for(var i in t)null!=t[i]&&"function"!=typeof t[i]&&(r+=i+", ");return r.substr(0,r.length-2)},containes:function(t,e){return t.startsWith(t+" ")||t.startsWith(t+",")||t.indexOf(" "+t+" ")>=0||t.indexOf(","+t+" ")>=0||t.indexOf(" "+t+",")>=0||t.indexOf(","+t+",")>=0||t.endWith(","+t)||t.endWith(" "+t)},batchExecute:function(t,n,r){t&&("string"==typeof t||t instanceof Array)?("string"==typeof t&&(t=[t]),e.transaction((function(e){t.forEach((t=>{t&&""!=t.trim()&&e.executeSql(t,[])}))}),r,n)):r(null,"SQL错误")}}};