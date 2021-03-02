/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
!function(){var x="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");Math.uuid=function(n,r){var t,a,o=x,u=[];if(r=r||o.length,n)for(t=0;t<n;t++)u[t]=o[0|Math.random()*r];else for(u[8]=u[13]=u[18]=u[23]="-",u[14]="4",t=0;t<36;t++)u[t]||(a=0|16*Math.random(),u[t]=o[19==t?3&a|8:a]);return u.join("")},Math.uuidFast=function(){for(var n,r=x,t=new Array(36),a=0,o=0;o<36;o++)8==o||13==o||18==o||23==o?t[o]="-":14==o?t[o]="4":(a<=2&&(a=33554432+16777216*Math.random()|0),n=15&a,a>>=4,t[o]=r[19==o?3&n|8:n]);return t.join("")},Math.uuidCompact=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(x){var n=16*Math.random()|0;return("x"==x?n:3&n|8).toString(16)}))}}();