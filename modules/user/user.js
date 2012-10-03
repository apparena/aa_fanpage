/**
 * 
 * @param scope Access rights asked from the user
 */
function auth( scope, callback, params ) {
	FB.login( function( response ) {	
		if ( response.authResponse ) {
			FB.api('/me', function(response) {
				if ( typeof( response.id ) != 'undefined' ) {
					//$.jStorage.set( 'fb_user_id', response.id );
					//$.jStorage.set( 'fb_user_name', response.name );
					//$.jStorage.set( 'fb_user_email', response.email );
					fb_user_id = response.id;
					fb_user_name = response.name;
					fb_user_email = response.email;
				}
				
				callback( params );
			});	
		} else {
			//noAuth( response );
			aa_tmpl_load("no_auth.phtml");
		}
    }, { scope: scope });
	
}

function is_user_registered( callback ) {
	$.ajax({
		type : 'POST',
		async : false,
		url : 'modules/user/ajax/is_user_registered.php?aa_inst_id=' + aa_inst_id,
		data : ({
			//fb_user_id : $.jStorage.get( 'fb_user_id')
			fb_user_id : fb_user_id
		}),
		success : function(data) {			
			callback( data );
		} 
	}); 
}

/**
 * Save the user to the db after authorizing.
 */
function save_user() {
	
	$.ajax({
		type : 'POST',
		async : true,
		url : 'modules/user/ajax/save_user.php?aa_inst_id=' + aa_inst_id,
		data : ({
			/*fb_user_id : $.jStorage.get( 'fb_user_id'),
			fb_user_name : $.jStorage.get( 'fb_user_name'),
			fb_user_email : $.jStorage.get( 'fb_user_email')*/
			fb_user_id : fb_user_id,
			fb_user_name : fb_user_name,
			fb_user_email : fb_user_email
		}),
		success : function(data) {			
			if (data.length > 0) {				
				if ( data.indexOf( 'email not saved' ) >= 0 ) {
										
				} // end if return data contains 'email not saved'				
			} // end if data
		} // end success function
	}); // end ajax call save_user.php
}


/*//json2.js for stupid IE
var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
/* jStorage.min 
(function(){function x(a,b){function f(){if("session"==a)try{j=m.parse(window.name||"{}")}catch(b){j={}}}var h=!1,e=0,g,d,j={};Math.random();if(b||"undefined"==typeof window[a+"Storage"])if("local"==a&&window.globalStorage)localStorage=window.globalStorage[window.location.hostname];else if("userDataBehavior"==l){b&&(window[a+"Storage"]&&window[a+"Storage"].parentNode)&&window[a+"Storage"].parentNode.removeChild(window[a+"Storage"]);d=document.createElement("button");document.getElementsByTagName("head")[0].appendChild(d);
"local"==a?j=c:"session"==a&&f();for(g in j)j.hasOwnProperty(g)&&("__jstorage_meta"!=g&&"length"!=g&&"undefined"!=typeof j[g])&&(g in d||e++,d[g]=j[g]);d.length=e;d.key=function(a){var b=0,c;f();for(c in j)if(j.hasOwnProperty(c)&&"__jstorage_meta"!=c&&"length"!=c&&"undefined"!=typeof j[c]){if(b==a)return c;b++}};d.getItem=function(b){f();return"session"==a?j[b]:o.jStorage.get(b)};d.setItem=function(a,b){"undefined"!=typeof b&&(d[a]=(b||"").toString())};d.removeItem=function(b){if("local"==a)return o.jStorage.deleteKey(b);
d[b]=void 0;h=!0;b in d&&d.removeAttribute(b);h=!1};d.clear=function(){"session"==a?(window.name="",x("session",!0)):o.jStorage.flush()};"local"==a&&(z=function(a,b){"length"!=a&&(h=!0,"undefined"==typeof b?a in d&&(e--,d.removeAttribute(a)):(a in d||e++,d[a]=(b||"").toString()),d.length=e,h=!1)});d.attachEvent("onpropertychange",function(b){if("length"!=b.propertyName&&!(h||"length"==b.propertyName)){if("local"==a)!(b.propertyName in j)&&"undefined"!=typeof d[b.propertyName]&&e++;else if("session"==
a){f();"undefined"!=typeof d[b.propertyName]&&!(b.propertyName in j)?(j[b.propertyName]=d[b.propertyName],e++):"undefined"==typeof d[b.propertyName]&&b.propertyName in j?(delete j[b.propertyName],e--):j[b.propertyName]=d[b.propertyName];"session"==a&&(window.name=m.stringify(j));d.length=e;return}o.jStorage.set(b.propertyName,d[b.propertyName]);d.length=e}});window[a+"Storage"]=d}}function D(){var a="{}";if("userDataBehavior"==l){i.load("jStorage");try{a=i.getAttribute("jStorage")}catch(b){}try{q=
i.getAttribute("jStorage_update")}catch(c){}k.jStorage=a}E();y();F()}function t(){var a;clearTimeout(G);G=setTimeout(function(){if("localStorage"==l||"globalStorage"==l)a=k.jStorage_update;else if("userDataBehavior"==l){i.load("jStorage");try{a=i.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=q){q=a;var f=m.parse(m.stringify(c.__jstorage_meta.CRC32)),h;D();h=m.parse(m.stringify(c.__jstorage_meta.CRC32));var e,g=[],d=[];for(e in f)f.hasOwnProperty(e)&&(h[e]?f[e]!=h[e]&&g.push(e):d.push(e));for(e in h)h.hasOwnProperty(e)&&
(f[e]||g.push(e));r(g,"updated");r(d,"deleted")}},25)}function r(a,b){a=[].concat(a||[]);if("flushed"==b){var a=[],c;for(c in n)n.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var h=a.length;c<h;c++)if(n[a[c]])for(var e=0,g=n[a[c]].length;e<g;e++)n[a[c]][e](a[c],b)}function u(){var a=(+new Date).toString();"localStorage"==l||"globalStorage"==l?k.jStorage_update=a:"userDataBehavior"==l&&(i.setAttribute("jStorage_update",a),i.save("jStorage"));t()}function E(){if(k.jStorage)try{c=m.parse(String(k.jStorage))}catch(a){k.jStorage=
"{}"}else k.jStorage="{}";A=k.jStorage?String(k.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function v(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,f=c.__jstorage_meta.PubSub.length;b<f;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{k.jStorage=m.stringify(c),i&&(i.setAttribute("jStorage",
k.jStorage),i.save("jStorage")),A=k.jStorage?String(k.jStorage).length:0}catch(h){}}function p(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");return!0}function y(){var a,b,f,h,e=Infinity,g=!1,d=[];clearTimeout(H);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;f=c.__jstorage_meta.TTL;h=c.__jstorage_meta.CRC32;for(b in f)f.hasOwnProperty(b)&&(f[b]<=
a?(delete f[b],delete h[b],delete c[b],g=!0,d.push(b)):f[b]<e&&(e=f[b]));Infinity!=e&&(H=setTimeout(y,e-a));g&&(v(),u(),r(d,"deleted"))}}function F(){if(c.__jstorage_meta.PubSub){for(var a,b=B,f=len=c.__jstorage_meta.PubSub.length-1;0<=f;f--)if(a=c.__jstorage_meta.PubSub[f],a[0]>B){var b=a[0],h=a[1];a=a[2];if(s[h])for(var e=0,g=s[h].length;e<g;e++)s[h][e](h,m.parse(m.stringify(a)))}B=b}}var o=window.jQuery||window.$||(window.$={}),m={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&
function(a){return String(a).evalJSON()}||o.parseJSON||o.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||o.toJSON};if(!m.parse||!m.stringify)throw Error("No JSON support found, include https://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");var c={},k={jStorage:"{}"},i=null,A=0,l=!1,n={},G=!1,q=0,s={},B=+new Date,H,C={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;
try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}},z=function(){};o.jStorage={version:"0.3.0",set:function(a,b,f){p(a);f=f||{};if("undefined"==typeof b)return this.deleteKey(a),
b;if(C.isXML(b))b={_is_xml:!0,xml:C.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=m.parse(m.stringify(b)))}c[a]=b;var h=c.__jstorage_meta.CRC32,e=m.stringify(b),g,d=0,d=0;g=-1;for(var j=0,i=e.length;j<i;j++)d=(g^e.charCodeAt(j))&255,d="0x"+"00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substr(9*
d,8),g=g>>>8^d;h[a]=g^-1;this.setTTL(a,f.TTL||0);z(a,b);r(a,"updated");return b},get:function(a,b){p(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml&&c[a]._is_xml?C.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){p(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],z(a,void 0),v(),u(),r(a,"deleted"),!0):!1},setTTL:function(a,b){var f=+new Date;p(a);
b=Number(b)||0;return a in c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=f+b:delete c.__jstorage_meta.TTL[a],v(),y(),u(),!0):!1},getTTL:function(a){var b=+new Date;p(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};x("local",!0);v();u();r(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&
"__jstorage_meta"!=b&&a.push(b);return a},storageSize:function(){return A},currentBackend:function(){return l},storageAvailable:function(){return!!l},listenKeyChange:function(a,b){p(a);n[a]||(n[a]=[]);n[a].push(b)},stopListening:function(a,b){p(a);if(n[a])if(b)for(var c=n[a].length-1;0<=c;c--)n[a][c]==b&&n[a].splice(c,1);else delete n[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");s[a]||(s[a]=[]);s[a].push(b)},publish:function(a,b){a=(a||"").toString();
if(!a)throw new TypeError("Channel not defined");c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);v();u()},reInit:function(){D()}};a:{var w=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),w=!0,window.localStorage.removeItem("_tmptest")}catch(I){}if(w)try{window.localStorage&&(k=window.localStorage,l="localStorage",q=k.jStorage_update)}catch(J){}else if("globalStorage"in
window)try{window.globalStorage&&(k=window.globalStorage[window.location.hostname],l="globalStorage",q=k.jStorage_update)}catch(K){}else if(i=document.createElement("link"),i.addBehavior){i.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(i);try{i.load("jStorage")}catch(L){i.setAttribute("jStorage","{}"),i.save("jStorage"),i.load("jStorage")}w="{}";try{w=i.getAttribute("jStorage")}catch(M){}try{q=i.getAttribute("jStorage_update")}catch(N){}k.jStorage=w;
l="userDataBehavior"}else{i=null;break a}E();y();x("local");x("session");"localStorage"==l||"globalStorage"==l?"addEventListener"in window?window.addEventListener("storage",t,!1):document.attachEvent("onstorage",t):"userDataBehavior"==l&&setInterval(t,1E3);F();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&t()},!1)}})();
/* end jStorage.min */