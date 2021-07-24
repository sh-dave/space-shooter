(function ($hx_exports, $global) { "use strict";
$hx_exports["kha"] = $hx_exports["kha"] || {};
$hx_exports["kha"]["input"] = $hx_exports["kha"]["input"] || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Stern = function(x,y,y_geschwindigkeit) {
	this.x = x;
	this.y = y;
	this.y_geschwindigkeit = y_geschwindigkeit;
};
$hxClasses["Stern"] = Stern;
Stern.__name__ = true;
Stern.prototype = {
	x: null
	,y: null
	,y_geschwindigkeit: null
	,__class__: Stern
};
var Gegner = function(bild,x,y,y_geschwindigkeit) {
	this.bild = bild;
	this.x = x;
	this.y = y;
	this.y_geschwindigkeit = y_geschwindigkeit;
};
$hxClasses["Gegner"] = Gegner;
Gegner.__name__ = true;
Gegner.prototype = {
	bild: null
	,x: null
	,y: null
	,y_geschwindigkeit: null
	,__class__: Gegner
};
var Schuss = function(bild,x,y,y_geschwindigkeit,aktiv) {
	this.bild = bild;
	this.x = x;
	this.y = y;
	this.y_geschwindigkeit = y_geschwindigkeit;
	this.aktiv = aktiv;
};
$hxClasses["Schuss"] = Schuss;
Schuss.__name__ = true;
Schuss.prototype = {
	bild: null
	,x: null
	,y: null
	,y_geschwindigkeit: null
	,aktiv: null
	,__class__: Schuss
};
var Main_spieler_bild = null;
function Main_main() {
	kha_System.start(new kha_SystemOptions("Kha",1280,720,null,null),function(wnd) {
		kha_Assets.loadEverything(function() {
			kha_System.notifyOnFrames(Main_male_alles);
			kha_input_Keyboard.get(0).notify(Main_taste_gedrueckt,Main_taste_losgelassen,null);
			var mouse = kha_input_Mouse.get(0);
			mouse.notify(Main_maus_gedrueckt,Main_maus_losgelassen,Main_maus_bewegung,null,null);
			mouse.hideSystemCursor();
			Main_spieler_bild = kha_Assets.images.spieler_schiff;
		});
	});
}
function Main_male_alles(fbs) {
	var fb = fbs[0];
	var g2 = fb.get_g2();
	Main_fenster_breite = fb.get_width();
	Main_fenster_hoehe = fb.get_height();
	if(Main_sterne_liste.length == 0) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < 100) {
			++_g1;
			_g.push(new Stern(Std.random(Main_fenster_breite),Std.random(Main_fenster_hoehe),5 + Std.random(10)));
		}
		Main_sterne_liste = _g;
	}
	if(Main_gegner_liste.length == 0) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < 10) {
			++_g1;
			_g.push(new Gegner(kha_Assets.images.get("gegner_" + (1 + Std.random(3))),Std.random(Main_fenster_breite),-Std.random(Main_fenster_hoehe),2 + Std.random(10)));
		}
		Main_gegner_liste = _g;
	}
	if(Main_schuss_liste.length == 0) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < 100) {
			++_g1;
			_g.push(new Schuss(kha_Assets.images.get("bullet"),0,0,Main_schuss_geschwindigkeit,false));
		}
		Main_schuss_liste = _g;
	}
	var spieler_schiff = kha_Assets.images.spieler_schiff;
	Main_breite = spieler_schiff.get_width();
	Main_hoehe = spieler_schiff.get_height();
	Main_spieler_x += Main_spieler_x_richtung;
	Main_spieler_y += Main_spieler_y_richtung;
	if(Main_cooldown > 0) {
		Main_cooldown -= 1;
	}
	if(Main_spieler_fire && Main_cooldown == 0) {
		Main_cooldown = Main_cooldown_max;
		var _g = 0;
		var _g1 = Main_schuss_liste.length;
		while(_g < _g1) {
			var schuss = Main_schuss_liste[_g++];
			if(!schuss.aktiv) {
				schuss.aktiv = true;
				schuss.x = Main_spieler_x;
				schuss.x = (schuss.x += Main_spieler_bild.get_width() / 2) - schuss.bild.get_width() / 2;
				schuss.y = Main_spieler_y;
				break;
			}
		}
	}
	Main_bewege_sterne();
	Main_bewege_gegner();
	Main_bewege_schuesse();
	Main_berechne_schuss_gegner_collision();
	Main_berechne_spieler_gegner_collision();
	g2.begin(true,-16777216);
	g2.set_color(-1);
	var _g = 0;
	var _g1 = Main_sterne_liste.length;
	while(_g < _g1) {
		var stern = Main_sterne_liste[_g++];
		g2.drawImage(kha_Assets.images.stern,stern.x,stern.y);
	}
	var _g = 0;
	var _g1 = Main_gegner_liste.length;
	while(_g < _g1) {
		var gegner = Main_gegner_liste[_g++];
		g2.drawImage(gegner.bild,gegner.x,gegner.y);
	}
	var _g = 0;
	var _g1 = Main_schuss_liste.length;
	while(_g < _g1) {
		var schuss = Main_schuss_liste[_g++];
		g2.drawImage(schuss.bild,schuss.x,schuss.y);
	}
	var text = "SCORE: " + Main_spieler_punkte;
	if(!Main_gameover) {
		g2.drawImage(Main_spieler_bild,Main_spieler_x,Main_spieler_y);
		g2.set_color(-256);
		g2.set_font(kha_Assets.fonts.kenvector_future);
		g2.set_fontSize(48);
		g2.drawString(text,4,4);
	} else {
		g2.set_color(-65536);
		g2.set_font(kha_Assets.fonts.kenvector_future);
		g2.set_fontSize(48);
		var text_breite = kha_Assets.fonts.kenvector_future.width(48,"GAMEOVER!");
		g2.drawString("GAMEOVER!",(Main_fenster_breite - text_breite) / 2,(Main_fenster_hoehe - 48) / 2 - 60);
		text_breite = kha_Assets.fonts.kenvector_future.width(48,text);
		g2.drawString(text,(Main_fenster_breite - text_breite) / 2,(Main_fenster_hoehe - 48) / 2);
	}
	g2.end();
}
function Main_bewege_gegner() {
	var _g = 0;
	var _g1 = Main_gegner_liste.length;
	while(_g < _g1) {
		var a = Main_gegner_liste[_g++];
		a.x += Math.sin(kha_Scheduler.realTime()) * 3;
		if((a.y += a.y_geschwindigkeit) > Main_fenster_hoehe + 16) {
			a.y = -Std.random(Main_fenster_hoehe);
			a.x = Std.random(Main_fenster_breite);
		}
	}
}
function Main_bewege_sterne() {
	var _g = 0;
	var _g1 = Main_sterne_liste.length;
	while(_g < _g1) {
		var stern = Main_sterne_liste[_g++];
		if((stern.y += stern.y_geschwindigkeit) > Main_fenster_hoehe + 16) {
			stern.y = -16;
			stern.x = Std.random(Main_fenster_breite);
		}
	}
}
function Main_bewege_schuesse() {
	var _g = 0;
	var _g1 = Main_schuss_liste.length;
	while(_g < _g1) {
		var schuss = Main_schuss_liste[_g++];
		schuss.y += schuss.y_geschwindigkeit;
		if(schuss.y < -60) {
			schuss.aktiv = false;
		}
	}
}
function Main_berechne_schuss_gegner_collision() {
	var _g = 0;
	var _g1 = Main_schuss_liste.length;
	while(_g < _g1) {
		var i = _g++;
		var _g2 = 0;
		var _g3 = Main_gegner_liste.length;
		while(_g2 < _g3) {
			var j = _g2++;
			var schuss = Main_schuss_liste[i];
			if(!schuss.aktiv) {
				continue;
			}
			var gegner = Main_gegner_liste[j];
			if(schuss.x + schuss.bild.get_width() < gegner.x) {
				continue;
			}
			if(schuss.x > gegner.x + gegner.bild.get_width()) {
				continue;
			}
			if(schuss.y + schuss.bild.get_height() < gegner.y) {
				continue;
			}
			if(schuss.y > gegner.y + gegner.bild.get_height()) {
				continue;
			}
			Main_spieler_punkte += 1;
			gegner.y = -Std.random(Main_fenster_hoehe);
			gegner.x = Std.random(Main_fenster_breite);
		}
	}
}
function Main_berechne_spieler_gegner_collision() {
	var _g = 0;
	var _g1 = Main_gegner_liste.length;
	while(_g < _g1) {
		var gegner = Main_gegner_liste[_g++];
		if(Main_spieler_x + Main_spieler_bild.get_width() < gegner.x) {
			continue;
		}
		if(Main_spieler_x > gegner.x + gegner.bild.get_width()) {
			continue;
		}
		if(Main_spieler_y + Main_spieler_bild.get_height() < gegner.y) {
			continue;
		}
		if(Main_spieler_y > gegner.y + gegner.bild.get_height()) {
			continue;
		}
		Main_gameover = true;
		Main_spieler_fire = false;
		kha_input_Mouse.get(0).showSystemCursor();
	}
}
function Main_maus_gedrueckt(taste,x,y) {
	if(!Main_gameover) {
		if(taste == 0) {
			Main_spieler_fire = true;
		}
	}
}
function Main_maus_losgelassen(taste,x,y) {
	if(!Main_gameover) {
		if(taste == 0) {
			Main_spieler_fire = false;
		}
	}
}
function Main_maus_bewegung(x,y,dx,dy) {
	Main_spieler_x = x;
	Main_spieler_y = y;
}
function Main_taste_gedrueckt(code) {
	switch(code) {
	case 37:
		Main_spieler_x_richtung -= Main_geschwindigkeit;
		break;
	case 38:
		Main_spieler_y_richtung -= Main_geschwindigkeit;
		break;
	case 39:
		Main_spieler_x_richtung += Main_geschwindigkeit;
		break;
	case 40:
		Main_spieler_y_richtung += Main_geschwindigkeit;
		break;
	default:
	}
}
function Main_taste_losgelassen(code) {
	switch(code) {
	case 37:
		Main_spieler_x_richtung += Main_geschwindigkeit;
		break;
	case 38:
		Main_spieler_y_richtung += Main_geschwindigkeit;
		break;
	case 39:
		Main_spieler_x_richtung -= Main_geschwindigkeit;
		break;
	case 40:
		Main_spieler_y_richtung -= Main_geschwindigkeit;
		break;
	default:
	}
}
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
var UInt = {};
UInt.gt = function(a,b) {
	var aNeg = a < 0;
	if(aNeg != b < 0) {
		return aNeg;
	} else {
		return a > b;
	}
};
UInt.gte = function(a,b) {
	var aNeg = a < 0;
	if(aNeg != b < 0) {
		return aNeg;
	} else {
		return a >= b;
	}
};
UInt.toFloat = function(this1) {
	if(this1 < 0) {
		return 4294967296.0 + this1;
	} else {
		return this1 + 0.0;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = true;
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) str += ", " + Std.string(_g1[_g++]);
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe__$Unserializer_DefaultResolver = function() {
};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe__$Unserializer_DefaultResolver;
haxe__$Unserializer_DefaultResolver.__name__ = true;
haxe__$Unserializer_DefaultResolver.prototype = {
	resolveClass: function(name) {
		return $hxClasses[name];
	}
	,resolveEnum: function(name) {
		return $hxEnums[name];
	}
	,__class__: haxe__$Unserializer_DefaultResolver
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = this.buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = new haxe__$Unserializer_DefaultResolver();
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.resolver = r;
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g = 0;
	var _g1 = haxe_Unserializer.BASE64.length;
	while(_g < _g1) {
		var i = _g++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c == 45) {
				if(this.pos != fpos) {
					break;
				}
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) {
				break;
			}
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) {
			k *= -1;
		}
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c >= 43 && c < 58 || c == 101 || c == 69) {
				this.pos++;
			} else {
				break;
			}
		}
		return parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) {
				throw haxe_Exception.thrown("Invalid object");
			}
			if(this.buf.charCodeAt(this.pos) == 103) {
				break;
			}
			var k = this.unserialize();
			if(typeof(k) != "string") {
				throw haxe_Exception.thrown("Invalid object key");
			}
			o[k] = this.unserialize();
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) {
			throw haxe_Exception.thrown("Invalid enum format");
		}
		var nargs = this.readDigits();
		if(nargs == 0) {
			return Type.createEnum(edecl,tag);
		}
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 65:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			return cl;
		case 66:
			var name = this.unserialize();
			var e = this.resolver.resolveEnum(name);
			if(e == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			return e;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) {
				throw haxe_Exception.thrown("Invalid custom data");
			}
			return o;
		case 77:
			var h = new haxe_ds_ObjectMap();
			this.cache.push(h);
			while(this.buf.charCodeAt(this.pos) != 104) h.set(this.unserialize(),this.unserialize());
			this.pos++;
			return h;
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) {
				throw haxe_Exception.thrown("Invalid string reference");
			}
			return this.scache[n];
		case 97:
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else {
					a.push(this.unserialize());
				}
			}
			return a;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				var value = this.unserialize();
				h.h[s] = value;
			}
			this.pos++;
			return h;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 100:
			return this.readFloat();
		case 102:
			return false;
		case 105:
			return this.readDigits();
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			this.pos++;
			var index = this.readDigits();
			var _this = edecl.__constructs__;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = _this[i]._hx_name;
			}
			var tag = result[index];
			if(tag == null) {
				throw haxe_Exception.thrown("Unknown enum index " + name + "@" + index);
			}
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 107:
			return NaN;
		case 108:
			var l = new haxe_ds_List();
			this.cache.push(l);
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 109:
			return -Infinity;
		case 110:
			return null;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 112:
			return Infinity;
		case 113:
			var h = new haxe_ds_IntMap();
			this.cache.push(h);
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				var value = this.unserialize();
				h.h[i] = value;
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) {
				throw haxe_Exception.thrown("Invalid IntMap format");
			}
			return h;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) {
				throw haxe_Exception.thrown("Invalid reference");
			}
			return this.cache[n];
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid bytes length");
			}
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var max = i + (len - rest);
			var bytes = new haxe_io_Bytes(new ArrayBuffer((len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0)));
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c3 << 6 | c4;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 116:
			return true;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
				this.pos += 19;
			} else {
				d = new Date(this.readFloat());
			}
			this.cache.push(d);
			return d;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 120:
			throw haxe_Exception.thrown(this.unserialize());
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid string length");
			}
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 122:
			return 0;
		default:
		}
		this.pos--;
		throw haxe_Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var code1 = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = true;
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) {
			return;
		}
		var _g = from + 1;
		while(_g < to) {
			var j = _g++;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) {
					haxe_ds_ArraySort.swap(a,j - 1,j);
				} else {
					break;
				}
				--j;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	while(true) {
		var first_cut;
		var second_cut;
		var len11;
		var len22;
		if(len1 == 0 || len2 == 0) {
			return;
		}
		if(len1 + len2 == 2) {
			if(cmp(a[pivot],a[from]) < 0) {
				haxe_ds_ArraySort.swap(a,pivot,from);
			}
			return;
		}
		if(len1 > len2) {
			len11 = len1 >> 1;
			first_cut = from + len11;
			second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
			len22 = second_cut - pivot;
		} else {
			len22 = len2 >> 1;
			second_cut = pivot + len22;
			first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
			len11 = first_cut - from;
		}
		haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
		var new_mid = first_cut + len22;
		haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
		from = new_mid;
		pivot = second_cut;
		len1 -= len11;
		len2 -= len22;
	}
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	if(from == mid || mid == to) {
		return;
	}
	var n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) {
				p2 += shift;
			} else {
				p2 = from + (shift - (to - p2));
			}
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) {
			len = half;
		} else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else {
			len = half;
		}
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,__class__: haxe_ds_StringMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		this.u8.set(new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len),this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = b.length - pos;
	}
	if(pos < 0 || len < 0 || pos + len > b.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	b: null
	,pos: null
	,len: null
	,totlen: null
	,set_position: function(p) {
		if(p < 0) {
			p = 0;
		} else if(p > this.totlen) {
			p = this.totlen;
		}
		this.len = this.totlen - p;
		return this.pos = p;
	}
	,readByte: function() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.len == 0 && len > 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		if(this.len < len) {
			len = this.len;
		}
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = true;
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe_io_FPHelper.floatToI32(x));
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = true;
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	b: null
	,writeByte: function(c) {
		this.b.addByte(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
var haxe_io_UInt8Array = {};
haxe_io_UInt8Array.fromBytes = function(bytes,bytePos,length) {
	if(bytePos == null) {
		bytePos = 0;
	}
	if(length == null) {
		length = bytes.length - bytePos;
	}
	return new Uint8Array(bytes.b.bufferValue,bytePos,length);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	while(true) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		var intf = cc.__interfaces__;
		if(intf != null) {
			var _g = 0;
			var _g1 = intf.length;
			while(_g < _g1) {
				var i = intf[_g++];
				if(i == cl || js_Boot.__interfLoop(i,cl)) {
					return true;
				}
			}
		}
		cc = cc.__super__;
	}
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = true;
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var kha__$Assets_ImageList = function() {
	this.sternDescription = { name : "stern", original_height : 5, file_sizes : [135], original_width : 5, files : ["stern.png"], type : "image"};
	this.stern = null;
	this.spieler_schiffDescription = { name : "spieler_schiff", original_height : 87, file_sizes : [3304], original_width : 77, files : ["spieler-schiff.png"], type : "image"};
	this.spieler_schiff = null;
	this.gegner_3Description = { name : "gegner_3", original_height : 84, file_sizes : [2232], original_width : 72, files : ["gegner-3.png"], type : "image"};
	this.gegner_3 = null;
	this.gegner_2Description = { name : "gegner_2", original_height : 78, file_sizes : [2393], original_width : 68, files : ["gegner-2.png"], type : "image"};
	this.gegner_2 = null;
	this.gegner_1Description = { name : "gegner_1", original_height : 66, file_sizes : [1673], original_width : 50, files : ["gegner-1.png"], type : "image"};
	this.gegner_1 = null;
	this.bulletDescription = { name : "bullet", original_height : 14, file_sizes : [142], original_width : 6, files : ["bullet.png"], type : "image"};
	this.bullet = null;
};
$hxClasses["kha._Assets.ImageList"] = kha__$Assets_ImageList;
kha__$Assets_ImageList.__name__ = true;
kha__$Assets_ImageList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,bullet: null
	,bulletDescription: null
	,gegner_1: null
	,gegner_1Description: null
	,gegner_2: null
	,gegner_2Description: null
	,gegner_3: null
	,gegner_3Description: null
	,spieler_schiff: null
	,spieler_schiffDescription: null
	,stern: null
	,sternDescription: null
	,__class__: kha__$Assets_ImageList
};
var kha__$Assets_SoundList = function() {
};
$hxClasses["kha._Assets.SoundList"] = kha__$Assets_SoundList;
kha__$Assets_SoundList.__name__ = true;
kha__$Assets_SoundList.prototype = {
	__class__: kha__$Assets_SoundList
};
var kha__$Assets_BlobList = function() {
};
$hxClasses["kha._Assets.BlobList"] = kha__$Assets_BlobList;
kha__$Assets_BlobList.__name__ = true;
kha__$Assets_BlobList.prototype = {
	__class__: kha__$Assets_BlobList
};
var kha__$Assets_FontList = function() {
	this.kenvector_futureDescription = { name : "kenvector_future", file_sizes : [34136], files : ["kenvector_future.ttf"], type : "font"};
	this.kenvector_future = null;
};
$hxClasses["kha._Assets.FontList"] = kha__$Assets_FontList;
kha__$Assets_FontList.__name__ = true;
kha__$Assets_FontList.prototype = {
	kenvector_future: null
	,kenvector_futureDescription: null
	,__class__: kha__$Assets_FontList
};
var kha__$Assets_VideoList = function() {
};
$hxClasses["kha._Assets.VideoList"] = kha__$Assets_VideoList;
kha__$Assets_VideoList.__name__ = true;
kha__$Assets_VideoList.prototype = {
	__class__: kha__$Assets_VideoList
};
var kha_Assets = function() { };
$hxClasses["kha.Assets"] = kha_Assets;
kha_Assets.__name__ = true;
kha_Assets.loadEverything = function(callback,filter,uncompressSoundsFilter,failed) {
	var lists = [kha__$Assets_ImageList,kha__$Assets_SoundList,kha__$Assets_BlobList,kha__$Assets_FontList,kha__$Assets_VideoList];
	var listInstances = [kha_Assets.images,kha_Assets.sounds,kha_Assets.blobs,kha_Assets.fonts,kha_Assets.videos];
	var fileCount = 0;
	var byteCount = 0;
	var _g = 0;
	var _g1 = lists.length;
	while(_g < _g1) {
		var i = _g++;
		var _g2 = 0;
		var _g3 = Type.getInstanceFields(lists[i]);
		while(_g2 < _g3.length) {
			var file = _g3[_g2];
			++_g2;
			if(StringTools.endsWith(file,"Description")) {
				++fileCount;
			} else if(StringTools.endsWith(file,"Size")) {
				byteCount += Reflect.field(listInstances[i],file);
			}
		}
	}
	if(fileCount == 0) {
		callback();
		return;
	}
	var filesLeft = fileCount;
	var bytesLeft = byteCount;
	var onLoaded = function(bytes) {
		filesLeft -= 1;
		bytesLeft -= bytes;
		kha_Assets.progress = 1 - bytesLeft / byteCount;
		if(filesLeft == 0) {
			callback();
		}
	};
	var onError = function(err,bytes) {
		(kha_Assets.reporter(failed,{ fileName : "kha/Assets.hx", lineNumber : 116, className : "kha.Assets", methodName : "loadEverything"}))(err);
		onLoaded(bytes);
	};
	var loadFunc = function(desc,done,failure) {
		var name = desc.name;
		var size = desc.file_sizes[0];
		switch(desc.type) {
		case "blob":
			kha_Assets.loadBlob(name,function(blob) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 142, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "font":
			kha_Assets.loadFont(name,function(font) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 146, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "image":
			kha_Assets.loadImage(name,function(image) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 125, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "sound":
			kha_Assets.loadSound(name,function(sound) {
				if(uncompressSoundsFilter == null || uncompressSoundsFilter(desc)) {
					sound.uncompress(function() {
						done(size);
					});
				} else {
					done(size);
				}
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 129, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "video":
			kha_Assets.loadVideo(name,function(video) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 150, className : "kha.Assets", methodName : "loadEverything"});
			break;
		}
	};
	var _g = 0;
	var _g1 = lists.length;
	while(_g < _g1) {
		var i = _g++;
		var listInstance = listInstances[i];
		var _g2 = 0;
		var _g3 = Type.getInstanceFields(lists[i]);
		while(_g2 < _g3.length) {
			var field = _g3[_g2];
			++_g2;
			if(!StringTools.endsWith(field,"Description")) {
				continue;
			}
			var desc = Reflect.field(listInstance,field);
			if(filter == null || filter(desc)) {
				loadFunc(desc,onLoaded,onError);
			} else {
				onLoaded(desc.file_sizes[0]);
			}
		}
	}
};
kha_Assets.loadImage = function(name,done,failed,pos) {
	kha_LoaderImpl.loadImageFromDescription(Reflect.field(kha_Assets.images,name + "Description"),function(image) {
		kha_Assets.images[name] = image;
		done(image);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadBlob = function(name,done,failed,pos) {
	kha_LoaderImpl.loadBlobFromDescription(Reflect.field(kha_Assets.blobs,name + "Description"),function(blob) {
		kha_Assets.blobs[name] = blob;
		done(blob);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadSound = function(name,done,failed,pos) {
	kha_LoaderImpl.loadSoundFromDescription(Reflect.field(kha_Assets.sounds,name + "Description"),function(sound) {
		kha_Assets.sounds[name] = sound;
		done(sound);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadFont = function(name,done,failed,pos) {
	kha_LoaderImpl.loadFontFromDescription(Reflect.field(kha_Assets.fonts,name + "Description"),function(font) {
		kha_Assets.fonts[name] = font;
		done(font);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadVideo = function(name,done,failed,pos) {
	kha_LoaderImpl.loadVideoFromDescription(Reflect.field(kha_Assets.videos,name + "Description"),function(video) {
		kha_Assets.videos[name] = video;
		done(video);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.reporter = function(custom,pos) {
	if(custom != null) {
		return custom;
	} else {
		var _g = haxe_Log.trace;
		var infos = pos;
		return function(v) {
			_g(v,infos);
		};
	}
};
var kha_Canvas = function() { };
$hxClasses["kha.Canvas"] = kha_Canvas;
kha_Canvas.__name__ = true;
kha_Canvas.__isInterface__ = true;
kha_Canvas.prototype = {
	get_width: null
	,get_height: null
	,get_g4: null
	,width: null
	,height: null
	,g4: null
	,__class__: kha_Canvas
};
var kha_Resource = function() { };
$hxClasses["kha.Resource"] = kha_Resource;
kha_Resource.__name__ = true;
kha_Resource.__isInterface__ = true;
var kha_Image = function() { };
$hxClasses["kha.Image"] = kha_Image;
kha_Image.__name__ = true;
kha_Image.__interfaces__ = [kha_Resource,kha_Canvas];
kha_Image.create = function(width,height,format,usage) {
	if(format == null) {
		format = 0;
	}
	if(usage == null) {
		usage = 0;
	}
	if(kha_SystemImpl.gl == null) {
		return new kha_CanvasImage(width,height,format,false);
	} else {
		return new kha_WebGLImage(width,height,format,false,0,1);
	}
};
kha_Image.fromImage = function(image,readable) {
	if(kha_SystemImpl.gl == null) {
		var img = new kha_CanvasImage(image.width,image.height,0,false);
		img.image = image;
		img.createTexture();
		return img;
	} else {
		var img = new kha_WebGLImage(image.width,image.height,0,false,0,1);
		img.image = image;
		img.createTexture();
		return img;
	}
};
kha_Image.fromBytes = function(bytes,width,height,format,usage) {
	if(format == null) {
		format = 0;
	}
	if(usage == null) {
		usage = 0;
	}
	if(kha_SystemImpl.gl != null) {
		var img = new kha_WebGLImage(width,height,format,false,0,1);
		img.image = img.bytesToArray(bytes);
		img.createTexture();
		return img;
	}
	var img = new kha_CanvasImage(width,height,format,false);
	img.get_g2().canvas.putImageData(new ImageData(new Uint8ClampedArray(bytes.b.bufferValue),width,height),0,0);
	return img;
};
kha_Image.fromVideo = function(video) {
	if(kha_SystemImpl.gl == null) {
		var img = new kha_CanvasImage(video.element.videoWidth,video.element.videoHeight,0,false);
		img.video = video.element;
		img.createTexture();
		return img;
	} else {
		var img = new kha_WebGLImage(video.element.videoWidth,video.element.videoHeight,0,false,0,1);
		img.video = video.element;
		img.createTexture();
		return img;
	}
};
kha_Image.get_nonPow2Supported = function() {
	return kha_SystemImpl.gl != null;
};
kha_Image.renderTargetsInvertedY = function() {
	return true;
};
kha_Image.prototype = {
	lock: function(level) {
		if(level == null) {
			level = 0;
		}
		return null;
	}
	,unlock: function() {
	}
	,get_width: function() {
		return 0;
	}
	,get_height: function() {
		return 0;
	}
	,get_realWidth: function() {
		return 0;
	}
	,get_realHeight: function() {
		return 0;
	}
	,get_g4: function() {
		return null;
	}
	,__class__: kha_Image
};
var kha_CanvasImage = function(width,height,format,renderTarget) {
	this.g2canvas = null;
	this.myWidth = width;
	this.myHeight = height;
	this.myFormat = format;
	this.renderTarget = renderTarget;
	this.image = null;
	this.video = null;
	if(renderTarget) {
		this.createTexture();
	}
};
$hxClasses["kha.CanvasImage"] = kha_CanvasImage;
kha_CanvasImage.__name__ = true;
kha_CanvasImage.init = function() {
	var canvas = window.document.createElement("canvas");
	if(canvas != null) {
		kha_CanvasImage.context = canvas.getContext("2d");
		canvas.width = 2048;
		canvas.height = 2048;
		kha_CanvasImage.context.globalCompositeOperation = "copy";
	}
};
kha_CanvasImage.__super__ = kha_Image;
kha_CanvasImage.prototype = $extend(kha_Image.prototype,{
	image: null
	,video: null
	,myWidth: null
	,myHeight: null
	,myFormat: null
	,renderTarget: null
	,frameBuffer: null
	,g2canvas: null
	,get_g2: function() {
		if(this.g2canvas == null) {
			var canvas = window.document.createElement("canvas");
			this.image = canvas;
			var context = canvas.getContext("2d");
			canvas.width = this.get_width();
			canvas.height = this.get_height();
			this.g2canvas = new kha_js_CanvasGraphics(context);
		}
		return this.g2canvas;
	}
	,get_g4: function() {
		return null;
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_realWidth: function() {
		return this.myWidth;
	}
	,get_realHeight: function() {
		return this.myHeight;
	}
	,texture: null
	,createTexture: function() {
		if(kha_SystemImpl.gl == null) {
			return;
		}
		this.texture = kha_SystemImpl.gl.createTexture();
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		kha_SystemImpl.gl.texParameteri(3553,10240,9729);
		kha_SystemImpl.gl.texParameteri(3553,10241,9729);
		kha_SystemImpl.gl.texParameteri(3553,10242,33071);
		kha_SystemImpl.gl.texParameteri(3553,10243,33071);
		if(this.renderTarget) {
			this.frameBuffer = kha_SystemImpl.gl.createFramebuffer();
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
			kha_SystemImpl.gl.framebufferTexture2D(36160,36064,3553,this.texture,0);
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
		} else if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		} else {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.image);
		}
		kha_SystemImpl.gl.bindTexture(3553,null);
	}
	,bytes: null
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		this.bytes = new haxe_io_Bytes(new ArrayBuffer(this.myFormat == 0 ? 4 * this.get_width() * this.get_height() : this.get_width() * this.get_height()));
		return this.bytes;
	}
	,unlock: function() {
		if(kha_SystemImpl.gl != null) {
			this.texture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(3553,this.texture);
			kha_SystemImpl.gl.texParameteri(3553,10240,9729);
			kha_SystemImpl.gl.texParameteri(3553,10241,9729);
			kha_SystemImpl.gl.texParameteri(3553,10242,33071);
			kha_SystemImpl.gl.texParameteri(3553,10243,33071);
			kha_SystemImpl.gl.texImage2D(3553,0,6409,this.get_width(),this.get_height(),0,6409,5121,new Uint8Array(this.bytes.b.bufferValue));
			if(kha_SystemImpl.gl.getError() == 1282) {
				var rgbaBytes = new haxe_io_Bytes(new ArrayBuffer(this.get_width() * this.get_height() * 4));
				var _g = 0;
				var _g1 = this.get_height();
				while(_g < _g1) {
					var y = _g++;
					var _g2 = 0;
					var _g3 = this.get_width();
					while(_g2 < _g3) {
						var x = _g2++;
						var _this = this.bytes;
						var pos = y * this.get_width() + x;
						var value = _this.b[pos];
						var pos1 = y * this.get_width() * 4 + x * 4;
						rgbaBytes.b[pos1] = value;
						var pos2 = y * this.get_width() * 4 + x * 4 + 1;
						rgbaBytes.b[pos2] = value;
						var pos3 = y * this.get_width() * 4 + x * 4 + 2;
						rgbaBytes.b[pos3] = value;
						var pos4 = y * this.get_width() * 4 + x * 4 + 3;
						rgbaBytes.b[pos4] = 255;
					}
				}
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,new Uint8Array(rgbaBytes.b.bufferValue));
			}
			kha_SystemImpl.gl.bindTexture(3553,null);
			this.bytes = null;
		}
	}
	,__class__: kha_CanvasImage
});
var kha_Color = {};
kha_Color.fromBytes = function(r,g,b,a) {
	if(a == null) {
		a = 255;
	}
	return kha_Color._new(a << 24 | r << 16 | g << 8 | b);
};
kha_Color._new = function(value) {
	return value;
};
var kha_Display = function() {
};
$hxClasses["kha.Display"] = kha_Display;
kha_Display.__name__ = true;
kha_Display.get_primary = function() {
	return kha_Display.instance;
};
kha_Display.prototype = {
	get_frequency: function() {
		return kha_SystemImpl.estimatedRefreshRate;
	}
	,__class__: kha_Display
};
var kha_Framebuffer = function($window,g1,g2,g4) {
	this.window = $window;
	this.graphics1 = g1;
	this.graphics2 = g2;
	this.graphics4 = g4;
};
$hxClasses["kha.Framebuffer"] = kha_Framebuffer;
kha_Framebuffer.__name__ = true;
kha_Framebuffer.__interfaces__ = [kha_Canvas];
kha_Framebuffer.prototype = {
	window: null
	,graphics1: null
	,graphics2: null
	,graphics4: null
	,init: function(g1,g2,g4) {
		this.graphics1 = g1;
		this.graphics2 = g2;
		this.graphics4 = g4;
	}
	,get_g2: function() {
		return this.graphics2;
	}
	,get_g4: function() {
		return this.graphics4;
	}
	,width: null
	,get_width: function() {
		return kha_System.windowWidth(this.window);
	}
	,height: null
	,get_height: function() {
		return kha_System.windowHeight(this.window);
	}
	,__class__: kha_Framebuffer
};
var kha_FramebufferOptions = function(frequency,verticalSync,colorBufferBits,depthBufferBits,stencilBufferBits,samplesPerPixel) {
	if(samplesPerPixel == null) {
		samplesPerPixel = 1;
	}
	if(stencilBufferBits == null) {
		stencilBufferBits = 8;
	}
	if(depthBufferBits == null) {
		depthBufferBits = 16;
	}
	if(colorBufferBits == null) {
		colorBufferBits = 32;
	}
	if(verticalSync == null) {
		verticalSync = true;
	}
	if(frequency == null) {
		frequency = 60;
	}
	this.samplesPerPixel = 1;
	this.stencilBufferBits = 8;
	this.depthBufferBits = 16;
	this.colorBufferBits = 32;
	this.verticalSync = true;
	this.frequency = 60;
	this.frequency = frequency;
	this.verticalSync = verticalSync;
	this.colorBufferBits = colorBufferBits;
	this.depthBufferBits = depthBufferBits;
	this.stencilBufferBits = stencilBufferBits;
	this.samplesPerPixel = samplesPerPixel;
};
$hxClasses["kha.FramebufferOptions"] = kha_FramebufferOptions;
kha_FramebufferOptions.__name__ = true;
kha_FramebufferOptions.prototype = {
	frequency: null
	,verticalSync: null
	,colorBufferBits: null
	,depthBufferBits: null
	,stencilBufferBits: null
	,samplesPerPixel: null
	,__class__: kha_FramebufferOptions
};
var kha_AlignedQuad = function() {
};
$hxClasses["kha.AlignedQuad"] = kha_AlignedQuad;
kha_AlignedQuad.__name__ = true;
kha_AlignedQuad.prototype = {
	x0: null
	,y0: null
	,s0: null
	,t0: null
	,x1: null
	,y1: null
	,s1: null
	,t1: null
	,xadvance: null
	,__class__: kha_AlignedQuad
};
var kha_KravurImage = function(size,ascent,descent,lineGap,width,height,chars,pixels) {
	this.mySize = size;
	this.width = width;
	this.height = height;
	this.chars = chars;
	this.baseline = ascent;
	var _g = 0;
	while(_g < chars.length) chars[_g++].yoff += this.baseline;
	this.texture = kha_Image.create(width,height,1);
	var bytes = this.texture.lock();
	var pos = 0;
	var _g = 0;
	while(_g < height) {
		++_g;
		var _g1 = 0;
		while(_g1 < width) {
			++_g1;
			var v = pixels.readU8(pos);
			bytes.b[pos] = v;
			++pos;
		}
	}
	this.texture.unlock();
};
$hxClasses["kha.KravurImage"] = kha_KravurImage;
kha_KravurImage.__name__ = true;
kha_KravurImage.prototype = {
	mySize: null
	,chars: null
	,texture: null
	,width: null
	,height: null
	,baseline: null
	,getTexture: function() {
		return this.texture;
	}
	,getBakedQuad: function(q,char_index,xpos,ypos) {
		if(char_index >= this.chars.length) {
			return null;
		}
		var ipw = 1.0 / this.width;
		var iph = 1.0 / this.height;
		var b = this.chars[char_index];
		if(b == null) {
			return null;
		}
		var round_x = Math.round(xpos + b.xoff);
		var round_y = Math.round(ypos + b.yoff);
		q.x0 = round_x;
		q.y0 = round_y;
		q.x1 = round_x + b.x1 - b.x0;
		q.y1 = round_y + b.y1 - b.y0;
		q.s0 = b.x0 * ipw;
		q.t0 = b.y0 * iph;
		q.s1 = b.x1 * ipw;
		q.t1 = b.y1 * iph;
		q.xadvance = b.xadvance;
		return q;
	}
	,getCharWidth: function(charIndex) {
		if(this.chars.length == 0) {
			return 0;
		}
		var offset = kha_KravurImage.charBlocks[0];
		if(charIndex < offset) {
			return this.chars[0].xadvance;
		}
		var _g = 1;
		var _g1 = kha_KravurImage.charBlocks.length / 2 | 0;
		while(_g < _g1) {
			var i = _g++;
			var start = kha_KravurImage.charBlocks[i * 2];
			if(charIndex > start - 1) {
				offset += start - 1 - kha_KravurImage.charBlocks[i * 2 - 1];
			}
		}
		if(charIndex - offset >= this.chars.length) {
			return this.chars[0].xadvance;
		}
		return this.chars[charIndex - offset].xadvance;
	}
	,stringWidth: function(str) {
		var width = 0;
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) width += this.getCharWidth(HxOverrides.cca(str,_g++));
		return width;
	}
	,__class__: kha_KravurImage
};
var kha_Kravur = function(blob,fontIndex) {
	if(fontIndex == null) {
		fontIndex = 0;
	}
	this.images = new haxe_ds_IntMap();
	this.blob = blob;
	this.fontIndex = fontIndex;
};
$hxClasses["kha.Kravur"] = kha_Kravur;
kha_Kravur.__name__ = true;
kha_Kravur.__interfaces__ = [kha_Resource];
kha_Kravur.prototype = {
	oldGlyphs: null
	,blob: null
	,images: null
	,fontIndex: null
	,_get: function(fontSize) {
		var glyphs = kha_graphics2_Graphics.fontGlyphs;
		if(glyphs != this.oldGlyphs) {
			this.oldGlyphs = glyphs;
			kha_KravurImage.charBlocks = [glyphs[0]];
			var nextChar = kha_KravurImage.charBlocks[0] + 1;
			var _g = 1;
			var _g1 = glyphs.length;
			while(_g < _g1) {
				var i = _g++;
				if(glyphs[i] != nextChar) {
					kha_KravurImage.charBlocks.push(glyphs[i - 1]);
					kha_KravurImage.charBlocks.push(glyphs[i]);
					nextChar = glyphs[i] + 1;
				} else {
					++nextChar;
				}
			}
			kha_KravurImage.charBlocks.push(glyphs[glyphs.length - 1]);
		}
		var imageIndex = this.fontIndex * 10000000 + fontSize * 10000 + glyphs.length;
		if(!this.images.h.hasOwnProperty(imageIndex)) {
			var width = 64;
			var height = 32;
			var baked = new Array(glyphs.length);
			var _g = 0;
			var _g1 = baked.length;
			while(_g < _g1) baked[_g++] = new kha_graphics2_truetype_Stbtt_$bakedchar();
			var pixels = null;
			var offset = kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex(this.blob,this.fontIndex);
			if(offset == -1) {
				offset = kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex(this.blob,0);
			}
			var status = -1;
			while(status <= 0) {
				if(height < width) {
					height *= 2;
				} else {
					width *= 2;
				}
				pixels = kha_internal_BytesBlob.alloc(width * height);
				status = kha_graphics2_truetype_StbTruetype.stbtt_BakeFontBitmap(this.blob,offset,fontSize,pixels,width,height,glyphs,baked);
			}
			var info = new kha_graphics2_truetype_Stbtt_$fontinfo();
			kha_graphics2_truetype_StbTruetype.stbtt_InitFont(info,this.blob,offset);
			var metrics = kha_graphics2_truetype_StbTruetype.stbtt_GetFontVMetrics(info);
			var scale = kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight(info,fontSize);
			var image = new kha_KravurImage(fontSize | 0,Math.round(metrics.ascent * scale),Math.round(metrics.descent * scale),Math.round(metrics.lineGap * scale),width,height,baked,pixels);
			this.images.h[imageIndex] = image;
			return image;
		}
		return this.images.h[imageIndex];
	}
	,width: function(fontSize,str) {
		return this._get(fontSize).stringWidth(str);
	}
	,__class__: kha_Kravur
};
var kha_LoaderImpl = function() { };
$hxClasses["kha.LoaderImpl"] = kha_LoaderImpl;
kha_LoaderImpl.__name__ = true;
kha_LoaderImpl.loadImageFromDescription = function(desc,done,failed) {
	var readable = Object.prototype.hasOwnProperty.call(desc,"readable") && desc.readable;
	if(StringTools.endsWith(desc.files[0],".hdr")) {
		kha_LoaderImpl.loadBlobFromDescription(desc,function(blob) {
			var hdrImage = kha_internal_HdrFormat.parse(blob.toBytes());
			done(kha_Image.fromBytes(haxe_io_Bytes.ofData(hdrImage.data.buffer),hdrImage.width,hdrImage.height,2,readable ? 1 : 0));
		},failed);
	} else {
		var img = window.document.createElement("img");
		img.onerror = function(event) {
			failed({ url : desc.files[0], error : event});
		};
		img.onload = function(event) {
			done(kha_Image.fromImage(img,readable));
		};
		img.crossOrigin = "";
		img.src = desc.files[0];
	}
};
kha_LoaderImpl.loadSoundFromDescription = function(desc,done,failed) {
	if(kha_SystemImpl._hasWebAudio) {
		var element = window.document.createElement("audio");
		if(element.canPlayType("audio/mp4") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var file = desc.files[_g++];
				if(StringTools.endsWith(file,".mp4")) {
					new kha_js_WebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/mp3") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var file = desc.files[_g++];
				if(StringTools.endsWith(file,".mp3")) {
					new kha_js_WebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/wav") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var file = desc.files[_g++];
				if(StringTools.endsWith(file,".wav")) {
					new kha_js_WebAudioSound(file,done,failed);
					return;
				}
			}
		}
		var _g = 0;
		var _g1 = desc.files.length;
		while(_g < _g1) {
			var file = desc.files[_g++];
			if(StringTools.endsWith(file,".ogg")) {
				new kha_js_WebAudioSound(file,done,failed);
				return;
			}
		}
		failed({ url : desc.files.join(","), error : "Unable to find sound files with supported audio formats"});
	} else if(kha_SystemImpl.mobile) {
		var element = window.document.createElement("audio");
		if(element.canPlayType("audio/mp4") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var file = desc.files[_g++];
				if(StringTools.endsWith(file,".mp4")) {
					new kha_js_MobileWebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/mp3") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var file = desc.files[_g++];
				if(StringTools.endsWith(file,".mp3")) {
					new kha_js_MobileWebAudioSound(file,done,failed);
					return;
				}
			}
		}
		if(element.canPlayType("audio/wav") != "") {
			var _g = 0;
			var _g1 = desc.files.length;
			while(_g < _g1) {
				var file = desc.files[_g++];
				if(StringTools.endsWith(file,".wav")) {
					new kha_js_MobileWebAudioSound(file,done,failed);
					return;
				}
			}
		}
		var _g = 0;
		var _g1 = desc.files.length;
		while(_g < _g1) {
			var file = desc.files[_g++];
			if(StringTools.endsWith(file,".ogg")) {
				new kha_js_MobileWebAudioSound(file,done,failed);
				return;
			}
		}
		failed({ url : desc.files.join(","), error : "Unable to find sound files with supported audio formats"});
	} else {
		new kha_js_Sound(desc.files,done,failed);
	}
};
kha_LoaderImpl.loadVideoFromDescription = function(desc,done,failed) {
	kha_js_Video.fromFile(desc.files,done);
};
kha_LoaderImpl.loadRemote = function(desc,done,failed) {
	var request = new XMLHttpRequest();
	request.open("GET",desc.files[0],true);
	request.responseType = "arraybuffer";
	request.onreadystatechange = function() {
		if(request.readyState != 4) {
			return;
		}
		if(request.status >= 200 && request.status < 400 || request.status == 0 && request.statusText == "") {
			var bytes = null;
			var arrayBuffer = request.response;
			if(arrayBuffer != null) {
				var byteArray = new Uint8Array(arrayBuffer);
				bytes = haxe_io_Bytes.ofData(byteArray);
			} else if(request.responseBody != null) {
				var data = VBArray(request.responseBody).toArray();
				bytes = new haxe_io_Bytes(new ArrayBuffer(data.length));
				var _g = 0;
				var _g1 = data.length;
				while(_g < _g1) {
					var i = _g++;
					bytes.b[i] = data[i];
				}
			} else {
				failed({ url : desc.files[0]});
				return;
			}
			done(new kha_internal_BytesBlob(bytes));
		} else {
			failed({ url : desc.files[0]});
		}
	};
	request.send(null);
};
kha_LoaderImpl.loadBlobFromDescription = function(desc,done,failed) {
	kha_LoaderImpl.loadRemote(desc,done,failed);
};
kha_LoaderImpl.loadFontFromDescription = function(desc,done,failed) {
	kha_LoaderImpl.loadBlobFromDescription(desc,function(blob) {
		done(new kha_Kravur(blob));
	},failed);
};
var kha_TimeTask = function() {
};
$hxClasses["kha.TimeTask"] = kha_TimeTask;
kha_TimeTask.__name__ = true;
kha_TimeTask.prototype = {
	task: null
	,start: null
	,period: null
	,duration: null
	,next: null
	,active: null
	,paused: null
	,__class__: kha_TimeTask
};
var kha_FrameTask = function(task,priority,id) {
	this.task = task;
	this.priority = priority;
	this.id = id;
	this.active = true;
	this.paused = false;
};
$hxClasses["kha.FrameTask"] = kha_FrameTask;
kha_FrameTask.__name__ = true;
kha_FrameTask.prototype = {
	task: null
	,priority: null
	,id: null
	,active: null
	,paused: null
	,__class__: kha_FrameTask
};
var kha_Scheduler = function() { };
$hxClasses["kha.Scheduler"] = kha_Scheduler;
kha_Scheduler.__name__ = true;
kha_Scheduler.init = function() {
	kha_Scheduler.deltas = [];
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) kha_Scheduler.deltas[_g++] = 0;
	kha_Scheduler.stopped = true;
	kha_Scheduler.frame_tasks_sorted = true;
	kha_Scheduler.current = kha_Scheduler.lastTime = kha_Scheduler.lastFrameEnd = kha_Scheduler.realTime();
	kha_Scheduler.currentFrameTaskId = 0;
	kha_Scheduler.currentTimeTaskId = 0;
	kha_Scheduler.currentGroupId = 0;
	kha_Scheduler.timeTasks = [];
	kha_Scheduler.pausedTimeTasks = [];
	kha_Scheduler.outdatedTimeTasks = [];
	kha_Scheduler.timeTasksScratchpad = [];
	kha_Scheduler.frameTasks = [];
	kha_Scheduler.toDeleteFrame = [];
};
kha_Scheduler.start = function(restartTimers) {
	if(restartTimers == null) {
		restartTimers = false;
	}
	kha_Scheduler.vsync = kha_Window.get(0).get_vSynced();
	var hz = kha_Display.get_primary().get_frequency();
	if(hz >= 57 && hz <= 63) {
		hz = 60;
	}
	kha_Scheduler.onedifhz = 1.0 / hz;
	kha_Scheduler.stopped = false;
	kha_Scheduler.resetTime();
	kha_Scheduler.lastTime = kha_Scheduler.realTime() - kha_Scheduler.startTime;
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) kha_Scheduler.deltas[_g++] = 0;
	if(restartTimers) {
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasks;
		while(_g < _g1.length) _g1[_g++].paused = false;
		var _g = 0;
		var _g1 = kha_Scheduler.frameTasks;
		while(_g < _g1.length) _g1[_g++].paused = false;
	}
};
kha_Scheduler.executeFrame = function() {
	var real = kha_Scheduler.realTime();
	var now = real - kha_Scheduler.startTime;
	var delta = now - kha_Scheduler.lastTime;
	var frameEnd = kha_Scheduler.lastFrameEnd;
	if(delta >= 0) {
		if(kha_netsync_Session.the() == null) {
			if(delta > kha_Scheduler.maxframetime) {
				kha_Scheduler.startTime += delta - kha_Scheduler.maxframetime;
				now = real - kha_Scheduler.startTime;
				delta = kha_Scheduler.maxframetime;
				frameEnd += delta;
			} else if(kha_Scheduler.vsync) {
				var frames = Math.round(delta / kha_Scheduler.onedifhz);
				if(frames < 1) {
					return;
				}
				var realdif = frames * kha_Scheduler.onedifhz;
				delta = realdif;
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT - 2;
				while(_g < _g1) {
					var i = _g++;
					delta += kha_Scheduler.deltas[i];
					kha_Scheduler.deltas[i] = kha_Scheduler.deltas[i + 1];
				}
				delta += kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 2];
				delta /= kha_Scheduler.DIF_COUNT;
				kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 2] = realdif;
				frameEnd += delta;
			} else {
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT - 1;
				while(_g < _g1) {
					var i = _g++;
					kha_Scheduler.deltas[i] = kha_Scheduler.deltas[i + 1];
				}
				kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 1] = delta;
				var next = 0;
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT;
				while(_g < _g1) next += kha_Scheduler.deltas[_g++];
				next /= kha_Scheduler.DIF_COUNT;
				frameEnd += next;
			}
		} else {
			frameEnd += delta;
		}
		kha_Scheduler.lastTime = now;
		if(!kha_Scheduler.stopped) {
			kha_Scheduler.lastFrameEnd = frameEnd;
		}
		var _g = 0;
		var _g1 = kha_Scheduler.pausedTimeTasks;
		while(_g < _g1.length) _g1[_g++].next += delta;
		if(kha_Scheduler.stopped) {
			var _g = 0;
			var _g1 = kha_Scheduler.timeTasks;
			while(_g < _g1.length) _g1[_g++].next += delta;
		}
		kha_Scheduler.executeTimeTasks(frameEnd);
		var _g = 0;
		var _g1 = kha_Scheduler.outdatedTimeTasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			if(task.next < frameEnd - 10.0) {
				kha_Scheduler.timeTasksScratchpad.push(task);
			}
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) HxOverrides.remove(kha_Scheduler.outdatedTimeTasks,_g1[_g++]);
		while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	}
	kha_Scheduler.current = frameEnd;
	kha_Scheduler.sortFrameTasks();
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(!kha_Scheduler.stopped && !frameTask.paused && frameTask.active) {
			if(!frameTask.task()) {
				frameTask.active = false;
			}
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(!frameTask.active) {
			kha_Scheduler.toDeleteFrame.push(frameTask);
		}
	}
	while(kha_Scheduler.toDeleteFrame.length > 0) HxOverrides.remove(kha_Scheduler.frameTasks,kha_Scheduler.toDeleteFrame.pop());
};
kha_Scheduler.executeTimeTasks = function(until) {
	while(kha_Scheduler.timeTasks.length > 0) {
		kha_Scheduler.activeTimeTask = kha_Scheduler.timeTasks[0];
		if(kha_Scheduler.activeTimeTask.next <= until) {
			kha_Scheduler.current = kha_Scheduler.activeTimeTask.next;
			kha_Scheduler.activeTimeTask.next += kha_Scheduler.activeTimeTask.period;
			HxOverrides.remove(kha_Scheduler.timeTasks,kha_Scheduler.activeTimeTask);
			if(kha_Scheduler.activeTimeTask.active && kha_Scheduler.activeTimeTask.task()) {
				if(kha_Scheduler.activeTimeTask.period > 0 && (kha_Scheduler.activeTimeTask.duration == 0 || kha_Scheduler.activeTimeTask.duration >= kha_Scheduler.activeTimeTask.start + kha_Scheduler.activeTimeTask.next)) {
					kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,kha_Scheduler.activeTimeTask);
				}
			} else {
				kha_Scheduler.activeTimeTask.active = false;
			}
		} else {
			break;
		}
	}
	kha_Scheduler.activeTimeTask = null;
};
kha_Scheduler.realTime = function() {
	return kha_System.get_time();
};
kha_Scheduler.resetTime = function() {
	var now = kha_System.get_time();
	var dif = now - kha_Scheduler.startTime;
	kha_Scheduler.startTime = now;
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		timeTask.start -= dif;
		timeTask.next -= dif;
	}
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) kha_Scheduler.deltas[_g++] = 0;
	kha_Scheduler.current = 0;
	kha_Scheduler.lastTime = 0;
	kha_Scheduler.lastFrameEnd = 0;
};
kha_Scheduler.insertSorted = function(list,task) {
	var _g = 0;
	var _g1 = list.length;
	while(_g < _g1) {
		var i = _g++;
		if(list[i].next > task.next) {
			list.splice(i,0,task);
			return;
		}
	}
	list.push(task);
};
kha_Scheduler.sortFrameTasks = function() {
	if(kha_Scheduler.frame_tasks_sorted) {
		return;
	}
	kha_Scheduler.frameTasks.sort(function(a,b) {
		if(a.priority > b.priority) {
			return 1;
		} else if(a.priority < b.priority) {
			return -1;
		} else {
			return 0;
		}
	});
	kha_Scheduler.frame_tasks_sorted = true;
};
var kha_Shaders = function() { };
$hxClasses["kha.Shaders"] = kha_Shaders;
kha_Shaders.__name__ = true;
kha_Shaders.init = function() {
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_colored_fragData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_colored_fragData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_colored_fragData" + 2))));
	kha_Shaders.painter_colored_frag = new kha_graphics4_FragmentShader(blobs,["painter-colored.frag.essl","painter-colored-webgl2.frag.essl","painter-colored-relaxed.frag.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_colored_vertData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_colored_vertData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_colored_vertData" + 2))));
	kha_Shaders.painter_colored_vert = new kha_graphics4_VertexShader(blobs,["painter-colored.vert.essl","painter-colored-webgl2.vert.essl","painter-colored-relaxed.vert.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_image_fragData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_image_fragData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_image_fragData" + 2))));
	kha_Shaders.painter_image_frag = new kha_graphics4_FragmentShader(blobs,["painter-image.frag.essl","painter-image-webgl2.frag.essl","painter-image-relaxed.frag.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_image_vertData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_image_vertData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_image_vertData" + 2))));
	kha_Shaders.painter_image_vert = new kha_graphics4_VertexShader(blobs,["painter-image.vert.essl","painter-image-webgl2.vert.essl","painter-image-relaxed.vert.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_text_fragData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_text_fragData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_text_fragData" + 2))));
	kha_Shaders.painter_text_frag = new kha_graphics4_FragmentShader(blobs,["painter-text.frag.essl","painter-text-webgl2.frag.essl","painter-text-relaxed.frag.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_text_vertData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_text_vertData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_text_vertData" + 2))));
	kha_Shaders.painter_text_vert = new kha_graphics4_VertexShader(blobs,["painter-text.vert.essl","painter-text-webgl2.vert.essl","painter-text-relaxed.vert.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_video_fragData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_video_fragData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_video_fragData" + 2))));
	kha_Shaders.painter_video_frag = new kha_graphics4_FragmentShader(blobs,["painter-video.frag.essl","painter-video-webgl2.frag.essl","painter-video-relaxed.frag.essl"]);
	var blobs = [];
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_video_vertData" + 0))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_video_vertData" + 1))));
	blobs.push(kha_internal_BytesBlob.fromBytes(haxe_Unserializer.run(Reflect.field(kha_Shaders,"painter_video_vertData" + 2))));
	kha_Shaders.painter_video_vert = new kha_graphics4_VertexShader(blobs,["painter-video.vert.essl","painter-video-webgl2.vert.essl","painter-video-relaxed.vert.essl"]);
};
var kha_Sound = function() {
	this.sampleRate = 0;
	this.channels = 0;
	this.length = 0;
};
$hxClasses["kha.Sound"] = kha_Sound;
kha_Sound.__name__ = true;
kha_Sound.__interfaces__ = [kha_Resource];
kha_Sound.prototype = {
	compressedData: null
	,uncompressedData: null
	,length: null
	,channels: null
	,sampleRate: null
	,uncompress: function(done) {
		if(this.uncompressedData != null) {
			done();
			return;
		}
		var output = new haxe_io_BytesOutput();
		var header = kha_audio2_ogg_vorbis_Reader.readAll(this.compressedData,output,true);
		var soundBytes = output.getBytes();
		var count = soundBytes.length / 4 | 0;
		if(header.channel == 1) {
			this.length = count / kha_audio2_Audio.samplesPerSecond;
			this.uncompressedData = kha_arrays_Float32Array._new(count * 2);
			var _g = 0;
			while(_g < count) {
				var i = _g++;
				this.uncompressedData.setFloat32(i * 2 * 4,soundBytes.getFloat(i * 4),true);
				this.uncompressedData.setFloat32((i * 2 + 1) * 4,soundBytes.getFloat(i * 4),true);
			}
		} else {
			this.length = count / 2 / kha_audio2_Audio.samplesPerSecond;
			this.uncompressedData = kha_arrays_Float32Array._new(count);
			var _g = 0;
			while(_g < count) {
				var i = _g++;
				this.uncompressedData.setFloat32(i * 4,soundBytes.getFloat(i * 4),true);
			}
		}
		this.channels = header.channel;
		this.sampleRate = header.sampleRate;
		this.compressedData = null;
		done();
	}
	,__class__: kha_Sound
};
var kha_SystemOptions = function(title,width,height,$window,framebuffer) {
	if(height == null) {
		height = -1;
	}
	if(width == null) {
		width = -1;
	}
	if(title == null) {
		title = "Kha";
	}
	this.framebuffer = null;
	this.window = null;
	this.height = -1;
	this.width = -1;
	this.title = "Kha";
	this.title = title;
	this.window = $window == null ? new kha_WindowOptions(null,-1,-1,800,600,-1,true,null,0) : $window;
	if(width > 0) {
		this.window.width = width;
		this.width = width;
	} else {
		this.width = this.window.width;
	}
	if(height > 0) {
		this.window.height = height;
		this.height = height;
	} else {
		this.height = this.window.height;
	}
	if(this.window.title == null) {
		this.window.title = title;
	}
	this.framebuffer = framebuffer == null ? new kha_FramebufferOptions(60,true,32,16,8,1) : framebuffer;
};
$hxClasses["kha.SystemOptions"] = kha_SystemOptions;
kha_SystemOptions.__name__ = true;
kha_SystemOptions.prototype = {
	title: null
	,width: null
	,height: null
	,window: null
	,framebuffer: null
	,__class__: kha_SystemOptions
};
var kha_System = function() { };
$hxClasses["kha.System"] = kha_System;
kha_System.__name__ = true;
kha_System.start = function(options,callback) {
	kha_System.theTitle = options.title;
	kha_SystemImpl.init(options,callback);
};
kha_System.notifyOnFrames = function(listener) {
	kha_System.renderListeners.push(listener);
};
kha_System.render = function(framebuffers) {
	var _g = 0;
	var _g1 = kha_System.renderListeners;
	while(_g < _g1.length) _g1[_g++](framebuffers);
};
kha_System.foreground = function() {
	var _g = 0;
	var _g1 = kha_System.foregroundListeners;
	while(_g < _g1.length) _g1[_g++]();
};
kha_System.background = function() {
	var _g = 0;
	var _g1 = kha_System.backgroundListeners;
	while(_g < _g1.length) _g1[_g++]();
};
kha_System.shutdown = function() {
	var _g = 0;
	var _g1 = kha_System.shutdownListeners;
	while(_g < _g1.length) _g1[_g++]();
};
kha_System.dropFiles = function(filePath) {
	var _g = 0;
	var _g1 = kha_System.dropFilesListeners;
	while(_g < _g1.length) _g1[_g++](filePath);
};
kha_System.get_time = function() {
	return kha_SystemImpl.getTime();
};
kha_System.windowWidth = function($window) {
	if($window == null) {
		$window = 0;
	}
	return kha_Window.get($window).get_width();
};
kha_System.windowHeight = function($window) {
	if($window == null) {
		$window = 0;
	}
	return kha_Window.get_all()[$window].get_height();
};
var kha_GamepadStates = function() {
	this.axes = [];
	this.buttons = [];
};
$hxClasses["kha.GamepadStates"] = kha_GamepadStates;
kha_GamepadStates.__name__ = true;
kha_GamepadStates.prototype = {
	axes: null
	,buttons: null
	,__class__: kha_GamepadStates
};
var kha_SystemImpl = function() { };
$hxClasses["kha.SystemImpl"] = kha_SystemImpl;
kha_SystemImpl.__name__ = true;
kha_SystemImpl.init = function(options,callback) {
	kha_SystemImpl.options = options;
	kha_SystemImpl.mobile = kha_SystemImpl.isMobile();
	kha_SystemImpl.ios = kha_SystemImpl.isIOS();
	kha_SystemImpl.chrome = kha_SystemImpl.isChrome();
	kha_SystemImpl.firefox = kha_SystemImpl.isFirefox();
	kha_SystemImpl.ie = kha_SystemImpl.isIE();
	kha_SystemImpl.mobileAudioPlaying = !kha_SystemImpl.mobile && !kha_SystemImpl.chrome && !kha_SystemImpl.firefox;
	kha_SystemImpl.initSecondStep(callback);
};
kha_SystemImpl.initSecondStep = function(callback) {
	kha_SystemImpl.init2(kha_SystemImpl.options.window.width,kha_SystemImpl.options.window.height);
	kha_SystemImpl.initAnimate(callback);
};
kha_SystemImpl.isMobile = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("Android") >= 0 || agent.indexOf("webOS") >= 0 || agent.indexOf("BlackBerry") >= 0 || agent.indexOf("Windows Phone") >= 0) {
		return true;
	}
	if(kha_SystemImpl.isIOS()) {
		return true;
	}
	return false;
};
kha_SystemImpl.isIOS = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("iPhone") >= 0 || agent.indexOf("iPad") >= 0 || agent.indexOf("iPod") >= 0) {
		return true;
	}
	return false;
};
kha_SystemImpl.isChrome = function() {
	if($global.navigator.userAgent.indexOf("Chrome") >= 0) {
		return true;
	}
	return false;
};
kha_SystemImpl.isFirefox = function() {
	if($global.navigator.userAgent.indexOf("Firefox") >= 0) {
		return true;
	}
	return false;
};
kha_SystemImpl.isIE = function() {
	var agent = $global.navigator.userAgent;
	if(agent.indexOf("MSIE ") >= 0 || agent.indexOf("Trident/") >= 0) {
		return true;
	}
	return false;
};
kha_SystemImpl.setCanvas = function(canvas) {
	kha_SystemImpl.khanvas = canvas;
};
kha_SystemImpl.getTime = function() {
	return (window.performance != null ? window.performance.now() : Date.now()) / 1000;
};
kha_SystemImpl.init2 = function(defaultWidth,defaultHeight,backbufferFormat) {
	kha_SystemImpl.keyboard = new kha_input_Keyboard();
	kha_SystemImpl.mouse = new kha_input_MouseImpl();
	kha_SystemImpl.surface = new kha_input_Surface();
	kha_SystemImpl.gamepads = [];
	kha_SystemImpl.gamepadStates = [];
	kha_SystemImpl.gamepads[0] = new kha_input_Gamepad(0);
	kha_SystemImpl.gamepadStates[0] = new kha_GamepadStates();
	kha_SystemImpl.gamepads[1] = new kha_input_Gamepad(1);
	kha_SystemImpl.gamepadStates[1] = new kha_GamepadStates();
	kha_SystemImpl.gamepads[2] = new kha_input_Gamepad(2);
	kha_SystemImpl.gamepadStates[2] = new kha_GamepadStates();
	kha_SystemImpl.gamepads[3] = new kha_input_Gamepad(3);
	kha_SystemImpl.gamepadStates[3] = new kha_GamepadStates();
	window.addEventListener("gamepadconnected",function(e) {
		kha_input_Gamepad.sendConnectEvent(e.gamepad.index);
	});
	window.addEventListener("gamepaddisconnected",function(e) {
		kha_input_Gamepad.sendDisconnectEvent(e.gamepad.index);
	});
	var sysGamepads = kha_SystemImpl.getGamepads();
	if(sysGamepads != null) {
		var _g = 0;
		var _g1 = sysGamepads.length;
		while(_g < _g1) {
			var pad = sysGamepads[_g++];
			if(pad != null) {
				kha_SystemImpl.gamepads[pad.index].connected = true;
			}
		}
	}
	if(kha_SystemImpl.ie) {
		kha_SystemImpl.pressedKeys = [];
		var _g = 0;
		while(_g < 256) {
			++_g;
			kha_SystemImpl.pressedKeys.push(false);
		}
		var _g = 0;
		while(_g < 256) {
			++_g;
			kha_SystemImpl.pressedKeys.push(null);
		}
	}
	var onCopy = function(e) {
		if(kha_System.copyListener != null) {
			var data = kha_System.copyListener();
			if(data != null) {
				e.clipboardData.setData("text/plain",data);
			}
			e.preventDefault();
		}
	};
	var onCut = function(e) {
		if(kha_System.cutListener != null) {
			var data = kha_System.cutListener();
			if(data != null) {
				e.clipboardData.setData("text/plain",data);
			}
			e.preventDefault();
		}
	};
	var onPaste = function(e) {
		if(kha_System.pasteListener != null) {
			var onPaste = e.clipboardData.getData("text/plain");
			kha_System.pasteListener(onPaste);
			e.preventDefault();
		}
	};
	var document = window.document;
	document.addEventListener("copy",onCopy);
	document.addEventListener("cut",onCut);
	document.addEventListener("paste",onPaste);
	kha_CanvasImage.init();
	kha_Scheduler.init();
	kha_SystemImpl.loadFinished(defaultWidth,defaultHeight);
};
kha_SystemImpl.getMouse = function(num) {
	if(num != 0) {
		return null;
	}
	return kha_SystemImpl.mouse;
};
kha_SystemImpl.getKeyboard = function(num) {
	if(num != 0) {
		return null;
	}
	return kha_SystemImpl.keyboard;
};
kha_SystemImpl.checkGamepad = function(pad) {
	var _g = 0;
	var _g1 = pad.axes.length;
	while(_g < _g1) {
		var i = _g++;
		if(pad.axes[i] != null) {
			var axis = pad.axes[i];
			if(kha_SystemImpl.gamepadStates[pad.index].axes[i] != axis) {
				kha_SystemImpl.gamepadStates[pad.index].axes[i] = axis;
				kha_SystemImpl.gamepads[pad.index].sendAxisEvent(i,axis);
			}
		}
	}
	var _g = 0;
	var _g1 = pad.buttons.length;
	while(_g < _g1) {
		var i = _g++;
		if(pad.buttons[i] != null) {
			if(kha_SystemImpl.gamepadStates[pad.index].buttons[i] != pad.buttons[i].value) {
				kha_SystemImpl.gamepadStates[pad.index].buttons[i] = pad.buttons[i].value;
				kha_SystemImpl.gamepads[pad.index].sendButtonEvent(i,pad.buttons[i].value);
			}
		}
	}
	if(pad.axes.length <= 4 && pad.buttons.length > 7) {
		kha_SystemImpl.gamepadStates[pad.index].axes[4] = pad.buttons[6].value;
		kha_SystemImpl.gamepads[pad.index].sendAxisEvent(4,pad.buttons[6].value);
		kha_SystemImpl.gamepadStates[pad.index].axes[5] = pad.buttons[7].value;
		kha_SystemImpl.gamepads[pad.index].sendAxisEvent(5,pad.buttons[7].value);
	}
};
kha_SystemImpl.getCanvasElement = function() {
	if(kha_SystemImpl.khanvas != null) {
		return kha_SystemImpl.khanvas;
	}
	return window.document.getElementById("khanvas");
};
kha_SystemImpl.loadFinished = function(defaultWidth,defaultHeight) {
	var canvas = kha_SystemImpl.getCanvasElement();
	canvas.style.cursor = "default";
	var gl = false;
	try {
		kha_SystemImpl.gl = canvas.getContext("webgl2",{ alpha : false, antialias : kha_SystemImpl.options.framebuffer.samplesPerPixel > 1, stencil : true});
		kha_SystemImpl.gl.pixelStorei(37441,1);
		kha_SystemImpl.halfFloat = { HALF_FLOAT_OES : 5131};
		kha_SystemImpl.depthTexture = { UNSIGNED_INT_24_8_WEBGL : 34042};
		kha_SystemImpl.drawBuffers = { COLOR_ATTACHMENT0_WEBGL : 36064};
		kha_SystemImpl.elementIndexUint = true;
		kha_SystemImpl.gl.getExtension("EXT_color_buffer_float");
		kha_SystemImpl.gl.getExtension("OES_texture_float_linear");
		kha_SystemImpl.gl.getExtension("OES_texture_half_float_linear");
		kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("EXT_texture_filter_anisotropic");
		if(kha_SystemImpl.anisotropicFilter == null) {
			kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
		}
		gl = true;
		kha_SystemImpl.gl2 = true;
		kha_Shaders.init();
	} catch( _g ) {
		haxe_Log.trace("Could not initialize WebGL 2, falling back to WebGL.",{ fileName : "kha/SystemImpl.hx", lineNumber : 372, className : "kha.SystemImpl", methodName : "loadFinished"});
	}
	if(!kha_SystemImpl.gl2) {
		try {
			kha_SystemImpl.gl = canvas.getContext("experimental-webgl",{ alpha : false, antialias : kha_SystemImpl.options.framebuffer.samplesPerPixel > 1, stencil : true});
			kha_SystemImpl.gl.pixelStorei(37441,1);
			kha_SystemImpl.gl.getExtension("OES_texture_float");
			kha_SystemImpl.gl.getExtension("OES_texture_float_linear");
			kha_SystemImpl.halfFloat = kha_SystemImpl.gl.getExtension("OES_texture_half_float");
			kha_SystemImpl.gl.getExtension("OES_texture_half_float_linear");
			kha_SystemImpl.depthTexture = kha_SystemImpl.gl.getExtension("WEBGL_depth_texture");
			kha_SystemImpl.gl.getExtension("EXT_shader_texture_lod");
			kha_SystemImpl.gl.getExtension("OES_standard_derivatives");
			kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("EXT_texture_filter_anisotropic");
			if(kha_SystemImpl.anisotropicFilter == null) {
				kha_SystemImpl.anisotropicFilter = kha_SystemImpl.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
			}
			kha_SystemImpl.drawBuffers = kha_SystemImpl.gl.getExtension("WEBGL_draw_buffers");
			kha_SystemImpl.elementIndexUint = kha_SystemImpl.gl.getExtension("OES_element_index_uint");
			gl = true;
			kha_Shaders.init();
		} catch( _g ) {
			haxe_Log.trace("Could not initialize WebGL, falling back to <canvas>.",{ fileName : "kha/SystemImpl.hx", lineNumber : 400, className : "kha.SystemImpl", methodName : "loadFinished"});
		}
	}
	kha_SystemImpl.setCanvas(canvas);
	kha_SystemImpl.window = new kha_Window(0,defaultWidth,defaultHeight,canvas);
	if(gl) {
		var g4 = new kha_js_graphics4_Graphics();
		kha_SystemImpl.frame = new kha_Framebuffer(0,null,null,g4);
		kha_SystemImpl.frame.init(new kha_graphics2_Graphics1(kha_SystemImpl.frame),new kha_js_graphics4_Graphics2(kha_SystemImpl.frame),g4);
	} else {
		kha_js_Font.Kravur = kha_Kravur; kha_Kravur = kha_js_Font;
		var g2 = new kha_js_CanvasGraphics(canvas.getContext("2d"));
		kha_SystemImpl.frame = new kha_Framebuffer(0,null,g2,null);
		kha_SystemImpl.frame.init(new kha_graphics2_Graphics1(kha_SystemImpl.frame),g2,null);
	}
	if(!kha_SystemImpl.mobile && kha_audio2_Audio._init()) {
		kha_SystemImpl._hasWebAudio = true;
		kha_audio2_Audio1._init();
	} else if(kha_SystemImpl.mobile) {
		kha_SystemImpl._hasWebAudio = false;
		kha_js_MobileWebAudio._init();
		kha_audio2_Audio1 = kha_js_MobileWebAudio;
	} else {
		kha_SystemImpl._hasWebAudio = false;
		kha_audio2_Audio1 = kha_js_AudioElementAudio;
	}
	kha_vr_VrInterface.instance = new kha_js_vr_VrInterface();
	canvas.focus();
	canvas.onmousedown = kha_SystemImpl.mouseDown;
	canvas.onmousemove = kha_SystemImpl.mouseMove;
	if(kha_SystemImpl.keyboard != null) {
		canvas.onkeydown = kha_SystemImpl.keyDown;
		canvas.onkeyup = kha_SystemImpl.keyUp;
		canvas.onkeypress = kha_SystemImpl.keyPress;
	}
	canvas.onblur = kha_SystemImpl.onBlur;
	canvas.onfocus = kha_SystemImpl.onFocus;
	canvas.onmousewheel = canvas.onwheel = kha_SystemImpl.mouseWheel;
	canvas.onmouseleave = kha_SystemImpl.mouseLeave;
	canvas.addEventListener("wheel mousewheel",kha_SystemImpl.mouseWheel,false);
	canvas.addEventListener("touchstart",kha_SystemImpl.touchDown,false);
	canvas.addEventListener("touchend",kha_SystemImpl.touchUp,false);
	canvas.addEventListener("touchmove",kha_SystemImpl.touchMove,false);
	canvas.addEventListener("touchcancel",kha_SystemImpl.touchCancel,false);
	window.document.addEventListener("dragover",function(event) {
		event.preventDefault();
	});
	window.document.addEventListener("drop",function(event) {
		event.preventDefault();
		if(event.dataTransfer != null && event.dataTransfer.files != null) {
			var _g = 0;
			var _g1 = event.dataTransfer.files;
			while(_g < _g1.length) {
				var file = _g1[_g];
				++_g;
				kha_LoaderImpl.dropFiles.h[file.name] = file;
				kha_System.dropFiles("drop://" + file.name);
			}
		}
	});
	window.addEventListener("unload",function() {
		kha_System.shutdown();
	});
};
kha_SystemImpl.initAnimate = function(callback) {
	var canvas = kha_SystemImpl.getCanvasElement();
	var $window = window;
	var requestAnimationFrame = $window.requestAnimationFrame;
	if(requestAnimationFrame == null) {
		requestAnimationFrame = $window.mozRequestAnimationFrame;
	}
	if(requestAnimationFrame == null) {
		requestAnimationFrame = $window.webkitRequestAnimationFrame;
	}
	if(requestAnimationFrame == null) {
		requestAnimationFrame = $window.msRequestAnimationFrame;
	}
	var animate = null;
	animate = function(timestamp) {
		var $window = window;
		if(requestAnimationFrame == null) {
			$window.setTimeout(animate,16.666666666666668);
		} else {
			requestAnimationFrame(animate);
		}
		var sysGamepads = kha_SystemImpl.getGamepads();
		if(sysGamepads != null) {
			var _g = 0;
			var _g1 = sysGamepads.length;
			while(_g < _g1) {
				var pad = sysGamepads[_g++];
				if(pad != null) {
					kha_SystemImpl.checkGamepad(pad);
				}
			}
		}
		kha_Scheduler.executeFrame();
		if(canvas.getContext != null) {
			var displayWidth = canvas.clientWidth | 0;
			var displayHeight = canvas.clientHeight | 0;
			if(canvas.width != displayWidth || canvas.height != displayHeight) {
				canvas.width = displayWidth;
				canvas.height = displayHeight;
			}
			kha_System.render([kha_SystemImpl.frame]);
			if(kha_SystemImpl.gl != null) {
				kha_SystemImpl.gl.clearColor(1,1,1,1);
				kha_SystemImpl.gl.colorMask(false,false,false,true);
				kha_SystemImpl.gl.clear(16384);
				kha_SystemImpl.gl.colorMask(true,true,true,true);
			}
		}
	};
	var initialTimestamp = 0;
	var prevTimestamp = 0;
	var currentSamples = 0;
	var timeDiffs = [];
	var SAMPLE_COUNT = 90;
	var MEAN_TRUNCATION_CUTOFF = 0.33333333333333331;
	var roundToKnownRefreshRate = function(hz) {
		var rates = [{ low : 27, high : 33, target : 30},{ low : 57, high : 63, target : 60},{ low : 72, high : 78, target : 75},{ low : 87, high : 93, target : 90},{ low : 117, high : 123, target : 120},{ low : 141, high : 147, target : 144},{ low : 237, high : 243, target : 240},{ low : 337, high : 343, target : 340},{ low : 357, high : 363, target : 360}];
		var nearestHz = hz;
		var _g = 0;
		while(_g < rates.length) {
			var rate = rates[_g];
			++_g;
			if(hz >= rate.low && hz <= rate.high) {
				nearestHz = rate.target;
			}
		}
		return nearestHz;
	};
	var detectRefreshRate = null;
	detectRefreshRate = function(timestamp) {
		var $window = window;
		if(initialTimestamp == 0) {
			initialTimestamp = timestamp;
		}
		var timeDifferential = timestamp - prevTimestamp - initialTimestamp;
		prevTimestamp = timestamp - initialTimestamp;
		if(timeDifferential != 0) {
			timeDiffs.push(timeDifferential);
		}
		if(currentSamples < SAMPLE_COUNT) {
			currentSamples += 1;
			if(requestAnimationFrame == null) {
				$window.setTimeout(detectRefreshRate,16.666666666666668);
			} else {
				requestAnimationFrame(detectRefreshRate);
			}
		} else {
			haxe_ds_ArraySort.sort(timeDiffs,function(a,b) {
				return a - b;
			});
			var truncatedTimeDiffs = [];
			var cutoff = Math.round(timeDiffs.length * MEAN_TRUNCATION_CUTOFF);
			var _g = cutoff;
			var _g1 = timeDiffs.length - cutoff;
			while(_g < _g1) truncatedTimeDiffs.push(timeDiffs[_g++]);
			var total = 0;
			var _g = 0;
			while(_g < truncatedTimeDiffs.length) total += truncatedTimeDiffs[_g++];
			kha_SystemImpl.estimatedRefreshRate = roundToKnownRefreshRate(Math.round(1000 / (total / truncatedTimeDiffs.length)));
			kha_Scheduler.start();
			if(requestAnimationFrame == null) {
				$window.setTimeout(animate,16.666666666666668);
			} else {
				requestAnimationFrame(animate);
			}
			callback(kha_SystemImpl.window);
		}
	};
	if(requestAnimationFrame == null) {
		$window.setTimeout(detectRefreshRate,16.666666666666668);
	} else {
		requestAnimationFrame(detectRefreshRate);
	}
};
kha_SystemImpl.lockMouse = function() {
	if(($_=kha_SystemImpl.khanvas,$bind($_,$_.requestPointerLock))) {
		kha_SystemImpl.khanvas.requestPointerLock();
	} else if(kha_SystemImpl.khanvas.mozRequestPointerLock) {
		kha_SystemImpl.khanvas.mozRequestPointerLock();
	} else if(kha_SystemImpl.khanvas.webkitRequestPointerLock) {
		kha_SystemImpl.khanvas.webkitRequestPointerLock();
	}
};
kha_SystemImpl.unlockMouse = function() {
	if(document.exitPointerLock) {
		document.exitPointerLock();
	} else if(document.mozExitPointerLock) {
		document.mozExitPointerLock();
	} else if(document.webkitExitPointerLock) {
		document.webkitExitPointerLock();
	}
};
kha_SystemImpl.canLockMouse = function() {
	return 'pointerLockElement' in document ||
		'mozPointerLockElement' in document ||
		'webkitPointerLockElement' in document;
};
kha_SystemImpl.isMouseLocked = function() {
	return document.pointerLockElement === kha_SystemImpl.khanvas ||
			document.mozPointerLockElement === kha_SystemImpl.khanvas ||
			document.webkitPointerLockElement === kha_SystemImpl.khanvas;
};
kha_SystemImpl.notifyOfMouseLockChange = function(func,error) {
	window.document.addEventListener("pointerlockchange",func,false);
	window.document.addEventListener("mozpointerlockchange",func,false);
	window.document.addEventListener("webkitpointerlockchange",func,false);
	window.document.addEventListener("pointerlockerror",error,false);
	window.document.addEventListener("mozpointerlockerror",error,false);
	window.document.addEventListener("webkitpointerlockerror",error,false);
};
kha_SystemImpl.removeFromMouseLockChange = function(func,error) {
	window.document.removeEventListener("pointerlockchange",func,false);
	window.document.removeEventListener("mozpointerlockchange",func,false);
	window.document.removeEventListener("webkitpointerlockchange",func,false);
	window.document.removeEventListener("pointerlockerror",error,false);
	window.document.removeEventListener("mozpointerlockerror",error,false);
	window.document.removeEventListener("webkitpointerlockerror",error,false);
};
kha_SystemImpl.setMouseXY = function(event) {
	var rect = kha_SystemImpl.khanvas.getBoundingClientRect();
	var borderWidth = kha_SystemImpl.khanvas.clientLeft;
	var borderHeight = kha_SystemImpl.khanvas.clientTop;
	kha_SystemImpl.mouseX = (event.clientX - rect.left - borderWidth) * kha_SystemImpl.khanvas.width / (rect.width - 2 * borderWidth) | 0;
	kha_SystemImpl.mouseY = (event.clientY - rect.top - borderHeight) * kha_SystemImpl.khanvas.height / (rect.height - 2 * borderHeight) | 0;
};
kha_SystemImpl.unlockiOSSound = function() {
	if(!kha_SystemImpl.ios || kha_SystemImpl.iosSoundEnabled) {
		return;
	}
	var buffer = kha_js_MobileWebAudio._context.createBuffer(1,1,22050);
	var source = kha_js_MobileWebAudio._context.createBufferSource();
	source.buffer = buffer;
	source.connect(kha_js_MobileWebAudio._context.destination);
	source.start();
	source.stop();
	kha_SystemImpl.iosSoundEnabled = true;
};
kha_SystemImpl.unlockSound = function() {
	if(!kha_SystemImpl.soundEnabled) {
		var context = kha_audio2_Audio._context;
		if(context == null) {
			context = kha_audio2_Audio1._context;
		}
		if(context != null) {
			context.resume().then(function(c) {
				kha_SystemImpl.soundEnabled = true;
			}).catch(function(err) {
				haxe_Log.trace(err,{ fileName : "kha/SystemImpl.hx", lineNumber : 734, className : "kha.SystemImpl", methodName : "unlockSound"});
			});
		}
		kha_audio2_Audio.wakeChannels();
	}
	kha_SystemImpl.unlockiOSSound();
};
kha_SystemImpl.mouseLeave = function() {
	kha_SystemImpl.mouse.sendLeaveEvent(0);
};
kha_SystemImpl.mouseWheel = function(event) {
	kha_SystemImpl.unlockSound();
	kha_SystemImpl.insideInputEvent = true;
	var _g = kha_input_Mouse.wheelEventBlockBehavior;
	switch(_g._hx_index) {
	case 0:
		event.preventDefault();
		break;
	case 1:
		break;
	case 2:
		if(_g.func(event)) {
			event.preventDefault();
		}
		break;
	}
	if(event.deltaMode == 0) {
		if(event.deltaY < 0) {
			kha_SystemImpl.mouse.sendWheelEvent(0,-1);
		} else if(event.deltaY > 0) {
			kha_SystemImpl.mouse.sendWheelEvent(0,1);
		}
		kha_SystemImpl.insideInputEvent = false;
		return;
	}
	if(event.deltaMode == 1) {
		kha_SystemImpl.minimumScroll = Math.min(kha_SystemImpl.minimumScroll,Math.abs(event.deltaY)) | 0;
		kha_SystemImpl.mouse.sendWheelEvent(0,event.deltaY / kha_SystemImpl.minimumScroll | 0);
		kha_SystemImpl.insideInputEvent = false;
		return;
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseDown = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	kha_SystemImpl.setMouseXY(event);
	if(event.which == 1) {
		kha_SystemImpl.mouse.sendDownEvent(0,0,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		if(kha_SystemImpl.khanvas.setCapture != null) {
			kha_SystemImpl.khanvas.setCapture();
		} else {
			kha_SystemImpl.khanvas.ownerDocument.addEventListener("mousemove",kha_SystemImpl.documentMouseMove,true);
		}
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseLeftUp);
	} else if(event.which == 2) {
		kha_SystemImpl.mouse.sendDownEvent(0,2,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseMiddleUp);
	} else if(event.which == 3) {
		kha_SystemImpl.mouse.sendDownEvent(0,1,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseRightUp);
	} else if(event.which == 4) {
		kha_SystemImpl.mouse.sendDownEvent(0,3,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseBackUp);
	} else if(event.which == 5) {
		kha_SystemImpl.mouse.sendDownEvent(0,4,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
		kha_SystemImpl.khanvas.ownerDocument.addEventListener("mouseup",kha_SystemImpl.mouseForwardUp);
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseLeftUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 1) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseLeftUp);
	if(kha_SystemImpl.khanvas.releaseCapture != null) {
		kha_SystemImpl.khanvas.ownerDocument.releaseCapture();
	} else {
		kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mousemove",kha_SystemImpl.documentMouseMove,true);
	}
	kha_SystemImpl.mouse.sendUpEvent(0,0,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseMiddleUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 2) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseMiddleUp);
	kha_SystemImpl.mouse.sendUpEvent(0,2,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseRightUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 3) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseRightUp);
	kha_SystemImpl.mouse.sendUpEvent(0,1,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseBackUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 4) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseBackUp);
	kha_SystemImpl.mouse.sendUpEvent(0,3,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.mouseForwardUp = function(event) {
	kha_SystemImpl.unlockSound();
	if(event.which != 5) {
		return;
	}
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.khanvas.ownerDocument.removeEventListener("mouseup",kha_SystemImpl.mouseForwardUp);
	kha_SystemImpl.mouse.sendUpEvent(0,4,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.documentMouseMove = function(event) {
	event.stopPropagation();
	kha_SystemImpl.mouseMove(event);
};
kha_SystemImpl.mouseMove = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	var lastMouseX = kha_SystemImpl.mouseX;
	var lastMouseY = kha_SystemImpl.mouseY;
	kha_SystemImpl.setMouseXY(event);
	var movementX = event.movementX;
	var movementY = event.movementY;
	if(event.movementX == null) {
		movementX = event.mozMovementX != null ? event.mozMovementX : event.webkitMovementX != null ? event.webkitMovementX : kha_SystemImpl.mouseX - lastMouseX;
		movementY = event.mozMovementY != null ? event.mozMovementY : event.webkitMovementY != null ? event.webkitMovementY : kha_SystemImpl.mouseY - lastMouseY;
	}
	if(kha_SystemImpl.firefox) {
		movementX = movementX * window.devicePixelRatio | 0;
		movementY = movementY * window.devicePixelRatio | 0;
	}
	kha_SystemImpl.mouse.sendMoveEvent(0,kha_SystemImpl.mouseX,kha_SystemImpl.mouseY,movementX,movementY);
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.setTouchXY = function(touch) {
	var rect = kha_SystemImpl.khanvas.getBoundingClientRect();
	var borderWidth = kha_SystemImpl.khanvas.clientLeft;
	var borderHeight = kha_SystemImpl.khanvas.clientTop;
	kha_SystemImpl.touchX = (touch.clientX - rect.left - borderWidth) * kha_SystemImpl.khanvas.width / (rect.width - 2 * borderWidth) | 0;
	kha_SystemImpl.touchY = (touch.clientY - rect.top - borderHeight) * kha_SystemImpl.khanvas.height / (rect.height - 2 * borderHeight) | 0;
};
kha_SystemImpl.touchDown = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	event.stopPropagation();
	var _g = kha_input_Surface.touchDownEventBlockBehavior;
	switch(_g._hx_index) {
	case 0:
		event.preventDefault();
		break;
	case 1:
		break;
	case 2:
		if(_g.func(event)) {
			event.preventDefault();
		}
		break;
	}
	var index = 0;
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(-1);
			if(id == -1) {
				id = kha_SystemImpl.iosTouchs.length;
			}
			kha_SystemImpl.iosTouchs[id] = touch.identifier;
		}
		kha_SystemImpl.setTouchXY(touch);
		kha_SystemImpl.mouse.sendDownEvent(0,0,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		kha_SystemImpl.surface.sendTouchStartEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		if(index == 0) {
			kha_SystemImpl.lastFirstTouchX = kha_SystemImpl.touchX;
			kha_SystemImpl.lastFirstTouchY = kha_SystemImpl.touchY;
		}
		++index;
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.touchUp = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(id);
			kha_SystemImpl.iosTouchs[id] = -1;
		}
		kha_SystemImpl.setTouchXY(touch);
		kha_SystemImpl.mouse.sendUpEvent(0,0,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		kha_SystemImpl.surface.sendTouchEndEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.touchMove = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var index = 0;
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		kha_SystemImpl.setTouchXY(touch);
		if(index == 0) {
			var movementX = kha_SystemImpl.touchX - kha_SystemImpl.lastFirstTouchX;
			var movementY = kha_SystemImpl.touchY - kha_SystemImpl.lastFirstTouchY;
			kha_SystemImpl.lastFirstTouchX = kha_SystemImpl.touchX;
			kha_SystemImpl.lastFirstTouchY = kha_SystemImpl.touchY;
			kha_SystemImpl.mouse.sendMoveEvent(0,kha_SystemImpl.touchX,kha_SystemImpl.touchY,movementX,movementY);
		}
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(id);
		}
		kha_SystemImpl.surface.sendMoveEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		++index;
	}
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.touchCancel = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var _g = 0;
	var _g1 = event.changedTouches;
	while(_g < _g1.length) {
		var touch = _g1[_g];
		++_g;
		var id = touch.identifier;
		if(kha_SystemImpl.ios) {
			id = kha_SystemImpl.iosTouchs.indexOf(id);
		}
		kha_SystemImpl.setTouchXY(touch);
		kha_SystemImpl.mouse.sendUpEvent(0,0,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
		kha_SystemImpl.surface.sendTouchEndEvent(id,kha_SystemImpl.touchX,kha_SystemImpl.touchY);
	}
	kha_SystemImpl.iosTouchs = [];
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.onBlur = function() {
	kha_System.background();
};
kha_SystemImpl.onFocus = function() {
	kha_System.foreground();
};
kha_SystemImpl.keyDown = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	var _g = kha_input_Keyboard.keyBehavior;
	switch(_g._hx_index) {
	case 0:
		kha_SystemImpl.defaultKeyBlock(event);
		break;
	case 1:
		event.preventDefault();
		break;
	case 2:
		break;
	case 3:
		if(_g.func(event.keyCode)) {
			event.preventDefault();
		}
		break;
	}
	event.stopPropagation();
	if(kha_SystemImpl.ie) {
		if(kha_SystemImpl.pressedKeys[event.keyCode]) {
			event.preventDefault();
			return;
		}
		kha_SystemImpl.pressedKeys[event.keyCode] = true;
	} else if(event.repeat) {
		event.preventDefault();
		return;
	}
	kha_SystemImpl.keyboard.sendDownEvent(kha_SystemImpl.fixedKeyCode(event));
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.fixedKeyCode = function(event) {
	switch(event.keyCode) {
	case 91:case 93:
		return 224;
	case 186:
		return 59;
	case 187:
		return 61;
	case 189:
		return 173;
	default:
		return event.keyCode;
	}
};
kha_SystemImpl.defaultKeyBlock = function(e) {
	if(e.ctrlKey || e.metaKey) {
		if(e.keyCode == 67 || e.keyCode == 88 || e.keyCode == 86) {
			return;
		}
		if(e.metaKey && e.keyCode == 81) {
			return;
		}
		e.preventDefault();
		return;
	}
	if(e.keyCode >= 112 && e.keyCode <= 123) {
		return;
	}
	if(e.key == null || e.key.length == 1) {
		return;
	}
	e.preventDefault();
};
kha_SystemImpl.keyUp = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	event.preventDefault();
	event.stopPropagation();
	if(kha_SystemImpl.ie) {
		kha_SystemImpl.pressedKeys[event.keyCode] = false;
	}
	kha_SystemImpl.keyboard.sendUpEvent(kha_SystemImpl.fixedKeyCode(event));
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.keyPress = function(event) {
	kha_SystemImpl.insideInputEvent = true;
	kha_SystemImpl.unlockSound();
	if(event.which == 0) {
		return;
	}
	event.preventDefault();
	event.stopPropagation();
	var code = event.which;
	kha_SystemImpl.keyboard.sendPressEvent(String.fromCodePoint(code));
	kha_SystemImpl.insideInputEvent = false;
};
kha_SystemImpl.getGamepadId = function(index) {
	var sysGamepads = kha_SystemImpl.getGamepads();
	if(sysGamepads != null && sysGamepads[index]) {
		return sysGamepads[index].id;
	}
	return "unknown";
};
kha_SystemImpl.getGamepadVendor = function(index) {
	return "unknown";
};
kha_SystemImpl.getGamepads = function() {
	if(kha_SystemImpl.chrome && kha_vr_VrInterface.instance != null && kha_vr_VrInterface.instance.IsVrEnabled()) {
		return null;
	}
	if(navigator.getGamepads) {
		return $global.navigator.getGamepads();
	} else {
		return null;
	}
};
var kha_Video = function() {
};
$hxClasses["kha.Video"] = kha_Video;
kha_Video.__name__ = true;
kha_Video.__interfaces__ = [kha_Resource];
kha_Video.prototype = {
	__class__: kha_Video
};
var kha_WebGLImage = function(width,height,format,renderTarget,depthStencilFormat,samples) {
	this.MSAAFrameBuffer = null;
	this.depthTexture = null;
	this.texture = null;
	this.renderBuffer = null;
	this.frameBuffer = null;
	this.myWidth = width;
	this.myHeight = height;
	this.myFormat = format;
	this.renderTarget = renderTarget;
	this.samples = samples;
	this.image = null;
	this.video = null;
	this.depthStencilFormat = depthStencilFormat;
	kha_WebGLImage.init();
	if(renderTarget) {
		this.createTexture();
	}
};
$hxClasses["kha.WebGLImage"] = kha_WebGLImage;
kha_WebGLImage.__name__ = true;
kha_WebGLImage.init = function() {
	if(kha_WebGLImage.context == null) {
		kha_WebGLImage.canvas = window.document.createElement("canvas");
		if(kha_WebGLImage.canvas != null) {
			kha_WebGLImage.context = kha_WebGLImage.canvas.getContext("2d");
			kha_WebGLImage.canvas.width = 4096;
			kha_WebGLImage.canvas.height = 4096;
			kha_WebGLImage.context.globalCompositeOperation = "copy";
		}
	}
};
kha_WebGLImage.formatByteSize = function(format) {
	switch(format) {
	case 0:
		return 4;
	case 1:
		return 1;
	case 2:
		return 16;
	case 3:
		return 2;
	case 4:
		return 8;
	case 5:
		return 4;
	case 6:
		return 2;
	default:
		return 4;
	}
};
kha_WebGLImage.__super__ = kha_Image;
kha_WebGLImage.prototype = $extend(kha_Image.prototype,{
	image: null
	,video: null
	,myWidth: null
	,myHeight: null
	,myFormat: null
	,renderTarget: null
	,samples: null
	,frameBuffer: null
	,renderBuffer: null
	,texture: null
	,depthTexture: null
	,MSAAFrameBuffer: null
	,MSAAColorBuffer: null
	,MSAADepthBuffer: null
	,graphics4: null
	,depthStencilFormat: null
	,get_g4: function() {
		if(this.graphics4 == null) {
			this.graphics4 = new kha_js_graphics4_Graphics(this);
		}
		return this.graphics4;
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_realWidth: function() {
		return this.myWidth;
	}
	,get_realHeight: function() {
		return this.myHeight;
	}
	,createTexture: function() {
		if(kha_SystemImpl.gl == null) {
			return;
		}
		this.texture = kha_SystemImpl.gl.createTexture();
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		kha_SystemImpl.gl.texParameteri(3553,10240,9729);
		kha_SystemImpl.gl.texParameteri(3553,10241,9729);
		kha_SystemImpl.gl.texParameteri(3553,10242,33071);
		kha_SystemImpl.gl.texParameteri(3553,10243,33071);
		if(this.renderTarget) {
			this.frameBuffer = kha_SystemImpl.gl.createFramebuffer();
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			switch(this.myFormat) {
			case 0:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.get_realWidth(),this.get_realHeight(),0,6408,5126,null);
				break;
			case 3:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.get_realWidth(),this.get_realHeight(),0,6402,5123,null);
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.get_realWidth(),this.get_realHeight(),0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.get_realWidth(),this.get_realHeight(),0,kha_SystemImpl.gl2 ? 6403 : 6406,5126,null);
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.get_realWidth(),this.get_realHeight(),0,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			default:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
			}
			if(this.myFormat == 3) {
				kha_SystemImpl.gl.texParameteri(3553,10240,9728);
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				kha_SystemImpl.gl.framebufferTexture2D(36160,36096,3553,this.texture,0);
				if(!kha_SystemImpl.gl2) {
					var colortex = kha_SystemImpl.gl.createTexture();
					kha_SystemImpl.gl.bindTexture(3553,colortex);
					kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_realWidth(),this.get_realHeight(),0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,3553,colortex,0);
					kha_SystemImpl.gl.bindTexture(3553,this.texture);
				}
			} else {
				if(this.samples > 1 && kha_SystemImpl.gl2) {
					this.MSAAFrameBuffer = kha_SystemImpl.gl.createFramebuffer();
					this.MSAAColorBuffer = kha_SystemImpl.gl.createRenderbuffer();
					kha_SystemImpl.gl.bindRenderbuffer(36161,this.MSAAColorBuffer);
					var MSAAFormat;
					switch(this.myFormat) {
					case 0:
						MSAAFormat = kha_SystemImpl.gl.RGBA8;
						break;
					case 2:
						MSAAFormat = kha_SystemImpl.gl.RGBA32F;
						break;
					case 4:
						MSAAFormat = kha_SystemImpl.gl.RGBA16F;
						break;
					case 5:
						MSAAFormat = 33326;
						break;
					case 6:
						MSAAFormat = 33325;
						break;
					default:
						MSAAFormat = kha_SystemImpl.gl.RGBA8;
					}
					kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,MSAAFormat,this.get_realWidth(),this.get_realHeight());
					kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
					kha_SystemImpl.gl.framebufferRenderbuffer(36160,36064,36161,this.MSAAColorBuffer);
					kha_SystemImpl.gl.bindFramebuffer(36160,this.MSAAFrameBuffer);
				}
				kha_SystemImpl.gl.framebufferTexture2D(36160,36064,3553,this.texture,0);
				kha_SystemImpl.gl.bindFramebuffer(36160,null);
			}
			this.initDepthStencilBuffer(this.depthStencilFormat);
			var e = kha_SystemImpl.gl.checkFramebufferStatus(36160);
			if(e != 36053) {
				haxe_Log.trace("checkframebufferStatus error " + e,{ fileName : "kha/WebGLImage.hx", lineNumber : 270, className : "kha.WebGLImage", methodName : "createTexture"});
			}
			kha_SystemImpl.gl.bindRenderbuffer(36161,null);
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
		} else if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		} else {
			switch(this.myFormat) {
			case 0:
				if(((this.image) instanceof Uint8Array)) {
					kha_SystemImpl.gl.texImage2D(3553,0,6408,this.myWidth,this.myHeight,0,6408,5121,this.image);
				} else {
					kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.image);
				}
				break;
			case 1:
				kha_SystemImpl.gl.texImage2D(3553,0,6409,this.myWidth,this.myHeight,0,6409,5121,this.image);
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,this.image);
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.image);
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,kha_SystemImpl.gl2 ? 6403 : 6406,5126,this.image);
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.image);
				break;
			default:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.image);
			}
		}
		kha_SystemImpl.gl.bindTexture(3553,null);
	}
	,initDepthStencilBuffer: function(depthStencilFormat) {
		switch(depthStencilFormat) {
		case 0:
			break;
		case 1:case 5:
			if(kha_SystemImpl.depthTexture == null) {
				this.renderBuffer = kha_SystemImpl.gl.createRenderbuffer();
				kha_SystemImpl.gl.bindRenderbuffer(36161,this.renderBuffer);
				kha_SystemImpl.gl.renderbufferStorage(36161,33189,this.get_realWidth(),this.get_realHeight());
				kha_SystemImpl.gl.framebufferRenderbuffer(36160,36096,36161,this.renderBuffer);
			} else {
				this.depthTexture = kha_SystemImpl.gl.createTexture();
				kha_SystemImpl.gl.bindTexture(3553,this.depthTexture);
				if(depthStencilFormat == 1) {
					kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33190 : 6402,this.get_realWidth(),this.get_realHeight(),0,6402,5125,null);
				} else {
					kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.get_realWidth(),this.get_realHeight(),0,6402,5123,null);
				}
				kha_SystemImpl.gl.texParameteri(3553,10240,9728);
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				kha_SystemImpl.gl.texParameteri(3553,10242,33071);
				kha_SystemImpl.gl.texParameteri(3553,10243,33071);
				kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
				if(this.samples > 1 && kha_SystemImpl.gl2) {
					this.MSAADepthBuffer = kha_SystemImpl.gl.createRenderbuffer();
					kha_SystemImpl.gl.bindRenderbuffer(36161,this.MSAADepthBuffer);
					if(depthStencilFormat == 1) {
						kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,33190,this.get_realWidth(),this.get_realHeight());
					} else {
						kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,33189,this.get_realWidth(),this.get_realHeight());
					}
					kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
					kha_SystemImpl.gl.framebufferRenderbuffer(36160,36096,36161,this.MSAADepthBuffer);
					kha_SystemImpl.gl.bindFramebuffer(36160,this.MSAAFrameBuffer);
				}
				kha_SystemImpl.gl.framebufferTexture2D(36160,36096,3553,this.depthTexture,0);
				kha_SystemImpl.gl.bindFramebuffer(36160,null);
			}
			break;
		case 2:case 3:case 4:
			if(kha_SystemImpl.depthTexture == null) {
				this.renderBuffer = kha_SystemImpl.gl.createRenderbuffer();
				kha_SystemImpl.gl.bindRenderbuffer(36161,this.renderBuffer);
				kha_SystemImpl.gl.renderbufferStorage(36161,34041,this.get_realWidth(),this.get_realHeight());
				kha_SystemImpl.gl.framebufferRenderbuffer(36160,33306,36161,this.renderBuffer);
			} else {
				this.depthTexture = kha_SystemImpl.gl.createTexture();
				kha_SystemImpl.gl.bindTexture(3553,this.depthTexture);
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 35056 : 34041,this.get_realWidth(),this.get_realHeight(),0,34041,kha_SystemImpl.depthTexture.UNSIGNED_INT_24_8_WEBGL,null);
				kha_SystemImpl.gl.texParameteri(3553,10240,9728);
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				kha_SystemImpl.gl.texParameteri(3553,10242,33071);
				kha_SystemImpl.gl.texParameteri(3553,10243,33071);
				kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
				if(this.samples > 1 && kha_SystemImpl.gl2) {
					this.MSAADepthBuffer = kha_SystemImpl.gl.createRenderbuffer();
					kha_SystemImpl.gl.bindRenderbuffer(36161,this.MSAADepthBuffer);
					kha_SystemImpl.gl.renderbufferStorageMultisample(36161,this.samples,35056,this.get_realWidth(),this.get_realHeight());
					kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
					kha_SystemImpl.gl.framebufferRenderbuffer(36160,33306,36161,this.MSAADepthBuffer);
					kha_SystemImpl.gl.bindFramebuffer(36160,this.MSAAFrameBuffer);
				}
				kha_SystemImpl.gl.framebufferTexture2D(36160,33306,3553,this.depthTexture,0);
			}
			break;
		}
	}
	,set: function(stage) {
		kha_SystemImpl.gl.activeTexture(33984 + stage);
		kha_SystemImpl.gl.bindTexture(3553,this.texture);
		if(this.video != null) {
			kha_SystemImpl.gl.texImage2D(3553,0,6408,6408,5121,this.video);
		}
	}
	,bytesToArray: function(bytes) {
		switch(this.myFormat) {
		case 0:case 1:
			return new Uint8Array(bytes.b.bufferValue);
		case 2:case 4:case 5:case 6:
			return new Float32Array(bytes.b.bufferValue);
		default:
			return new Uint8Array(bytes.b.bufferValue);
		}
	}
	,bytes: null
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		this.bytes = new haxe_io_Bytes(new ArrayBuffer(kha_WebGLImage.formatByteSize(this.myFormat) * this.get_width() * this.get_height()));
		return this.bytes;
	}
	,unlock: function() {
		if(kha_SystemImpl.gl != null) {
			this.texture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(3553,this.texture);
			kha_SystemImpl.gl.texParameteri(3553,10240,9729);
			kha_SystemImpl.gl.texParameteri(3553,10241,9729);
			kha_SystemImpl.gl.texParameteri(3553,10242,33071);
			kha_SystemImpl.gl.texParameteri(3553,10243,33071);
			switch(this.myFormat) {
			case 0:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,this.bytesToArray(this.bytes));
				break;
			case 1:
				kha_SystemImpl.gl.texImage2D(3553,0,6409,this.get_width(),this.get_height(),0,6409,5121,this.bytesToArray(this.bytes));
				if(kha_SystemImpl.gl.getError() == 1282) {
					var rgbaBytes = new haxe_io_Bytes(new ArrayBuffer(this.get_width() * this.get_height() * 4));
					var _g = 0;
					var _g1 = this.get_height();
					while(_g < _g1) {
						var y = _g++;
						var _g2 = 0;
						var _g3 = this.get_width();
						while(_g2 < _g3) {
							var x = _g2++;
							var _this = this.bytes;
							var pos = y * this.get_width() + x;
							var value = _this.b[pos];
							var pos1 = y * this.get_width() * 4 + x * 4;
							rgbaBytes.b[pos1] = value;
							var pos2 = y * this.get_width() * 4 + x * 4 + 1;
							rgbaBytes.b[pos2] = value;
							var pos3 = y * this.get_width() * 4 + x * 4 + 2;
							rgbaBytes.b[pos3] = value;
							var pos4 = y * this.get_width() * 4 + x * 4 + 3;
							rgbaBytes.b[pos4] = 255;
						}
					}
					kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,this.bytesToArray(rgbaBytes));
				}
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.get_width(),this.get_height(),0,6408,5126,this.bytesToArray(this.bytes));
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.get_width(),this.get_height(),0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.bytesToArray(this.bytes));
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.get_width(),this.get_height(),0,kha_SystemImpl.gl2 ? 6403 : 6406,5126,this.bytesToArray(this.bytes));
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(3553,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.get_width(),this.get_height(),0,kha_SystemImpl.gl2 ? 6403 : 6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,this.bytesToArray(this.bytes));
				break;
			default:
				kha_SystemImpl.gl.texImage2D(3553,0,6408,this.get_width(),this.get_height(),0,6408,5121,this.bytesToArray(this.bytes));
			}
			kha_SystemImpl.gl.bindTexture(3553,null);
			this.bytes = null;
		}
	}
	,__class__: kha_WebGLImage
});
var kha_Window = function(num,defaultWidth,defaultHeight,canvas) {
	var _gthis = this;
	this.num = num;
	this.canvas = canvas;
	this.defaultWidth = defaultWidth;
	this.defaultHeight = defaultHeight;
	kha_Window.windows.push(this);
	kha_Window.resizeCallbacks[num] = [];
	kha_Window.windows.push(this);
	new MutationObserver(function(mutations,observer) {
		var isResize = false;
		var _g = 0;
		while(_g < mutations.length) {
			var mutation = mutations[_g];
			++_g;
			if(mutation.attributeName == "width" || mutation.attributeName == "height") {
				isResize = true;
				break;
			}
		}
		if(isResize) {
			_gthis.resize(canvas.clientWidth,canvas.clientHeight);
		}
	}).observe(canvas,{ attributes : true});
};
$hxClasses["kha.Window"] = kha_Window;
kha_Window.__name__ = true;
kha_Window.get = function(index) {
	return kha_Window.windows[index];
};
kha_Window.get_all = function() {
	return kha_Window.windows;
};
kha_Window.prototype = {
	num: null
	,canvas: null
	,defaultWidth: null
	,defaultHeight: null
	,resize: function(width,height) {
		var _g = 0;
		var _g1 = kha_Window.resizeCallbacks[this.num];
		while(_g < _g1.length) _g1[_g++](width,height);
	}
	,get_width: function() {
		if(this.canvas.width == 0) {
			return this.defaultWidth;
		} else {
			return this.canvas.width;
		}
	}
	,get_height: function() {
		if(this.canvas.height == 0) {
			return this.defaultHeight;
		} else {
			return this.canvas.height;
		}
	}
	,get_vSynced: function() {
		return true;
	}
	,__class__: kha_Window
};
var kha_WindowOptions = function(title,x,y,width,height,display,visible,windowFeatures,mode) {
	if(mode == null) {
		mode = 0;
	}
	if(visible == null) {
		visible = true;
	}
	if(display == null) {
		display = -1;
	}
	if(height == null) {
		height = 600;
	}
	if(width == null) {
		width = 800;
	}
	if(y == null) {
		y = -1;
	}
	if(x == null) {
		x = -1;
	}
	this.mode = 0;
	this.windowFeatures = 1 | 4 | 2;
	this.visible = true;
	this.display = -1;
	this.height = 600;
	this.width = 800;
	this.y = -1;
	this.x = -1;
	this.title = null;
	this.title = title;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.display = display;
	this.visible = visible;
	this.windowFeatures = windowFeatures == null ? 1 | 4 | 2 : windowFeatures;
	this.mode = mode;
};
$hxClasses["kha.WindowOptions"] = kha_WindowOptions;
kha_WindowOptions.__name__ = true;
kha_WindowOptions.prototype = {
	title: null
	,x: null
	,y: null
	,width: null
	,height: null
	,display: null
	,visible: null
	,windowFeatures: null
	,mode: null
	,__class__: kha_WindowOptions
};
var kha_arrays_ByteArray = {};
kha_arrays_ByteArray._new = function(buffer,byteOffset,byteLength) {
	return new DataView(buffer,byteOffset,byteLength);
};
kha_arrays_ByteArray.make = function(byteLength) {
	return kha_arrays_ByteArray._new(kha_arrays_ByteBuffer._new(byteLength));
};
var kha_arrays_ByteBuffer = {};
kha_arrays_ByteBuffer._new = function(length) {
	return new ArrayBuffer(length);
};
var kha_arrays_Float32Array = {};
kha_arrays_Float32Array._new = function(elements) {
	return kha_arrays_ByteArray.make(elements * 4);
};
var kha_arrays_Uint32Array = {};
kha_arrays_Uint32Array._new = function(elements) {
	return kha_arrays_ByteArray.make(elements * 4);
};
var kha_audio1_AudioChannel = function() { };
$hxClasses["kha.audio1.AudioChannel"] = kha_audio1_AudioChannel;
kha_audio1_AudioChannel.__name__ = true;
kha_audio1_AudioChannel.__isInterface__ = true;
var kha_internal_IntBox = function(value) {
	this.value = value;
};
$hxClasses["kha.internal.IntBox"] = kha_internal_IntBox;
kha_internal_IntBox.__name__ = true;
kha_internal_IntBox.prototype = {
	value: null
	,__class__: kha_internal_IntBox
};
var kha_audio2_Audio = function() { };
$hxClasses["kha.audio2.Audio"] = kha_audio2_Audio;
kha_audio2_Audio.__name__ = true;
kha_audio2_Audio.initContext = function() {
	try {
		kha_audio2_Audio._context = new AudioContext();
		return;
	} catch( _g ) {
	}
	try {
		this._context = new webkitAudioContext();
		return;
	} catch( _g ) {
	}
};
kha_audio2_Audio._init = function() {
	kha_audio2_Audio.initContext();
	if(kha_audio2_Audio._context == null) {
		return false;
	}
	kha_audio2_Audio.samplesPerSecond = Math.round(kha_audio2_Audio._context.sampleRate);
	kha_audio2_Audio.buffer = new kha_audio2_Buffer(8192,2,kha_audio2_Audio._context.sampleRate | 0);
	kha_audio2_Audio.processingNode = kha_audio2_Audio._context.createScriptProcessor(2048,0,2);
	kha_audio2_Audio.processingNode.onaudioprocess = function(e) {
		var output1 = e.outputBuffer.getChannelData(0);
		var output2 = e.outputBuffer.getChannelData(1);
		if(kha_audio2_Audio.audioCallback != null) {
			kha_audio2_Audio.intBox.value = e.outputBuffer.length * 2;
			kha_audio2_Audio.audioCallback(kha_audio2_Audio.intBox,kha_audio2_Audio.buffer);
			var _g = 0;
			var _g1 = e.outputBuffer.length;
			while(_g < _g1) {
				var i = _g++;
				output1[i] = kha_audio2_Audio.buffer.data.getFloat32(kha_audio2_Audio.buffer.readLocation * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				kha_audio2_Audio.buffer.readLocation += 1;
				output2[i] = kha_audio2_Audio.buffer.data.getFloat32(kha_audio2_Audio.buffer.readLocation * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				kha_audio2_Audio.buffer.readLocation += 1;
				if(kha_audio2_Audio.buffer.readLocation >= kha_audio2_Audio.buffer.size) {
					kha_audio2_Audio.buffer.readLocation = 0;
				}
			}
		} else {
			var _g = 0;
			var _g1 = e.outputBuffer.length;
			while(_g < _g1) {
				var i = _g++;
				output1[i] = 0;
				output2[i] = 0;
			}
		}
	};
	kha_audio2_Audio.processingNode.connect(kha_audio2_Audio._context.destination);
	return true;
};
kha_audio2_Audio.wakeChannels = function() {
	kha_SystemImpl.mobileAudioPlaying = true;
	var _g = 0;
	var _g1 = kha_audio2_Audio.virtualChannels;
	while(_g < _g1.length) _g1[_g++].wake();
};
var kha_audio2_Audio1 = function() { };
$hxClasses["kha.audio2.Audio1"] = kha_audio2_Audio1;
kha_audio2_Audio1.__name__ = true;
kha_audio2_Audio1._init = function() {
	kha_audio2_Audio1.soundChannels = new Array(32);
	kha_audio2_Audio1.streamChannels = new Array(32);
	kha_audio2_Audio1.internalSoundChannels = new Array(32);
	kha_audio2_Audio1.internalStreamChannels = new Array(32);
	kha_audio2_Audio1.sampleCache1 = kha_arrays_Float32Array._new(512);
	kha_audio2_Audio1.sampleCache2 = kha_arrays_Float32Array._new(512);
	kha_audio2_Audio1.lastAllocationCount = 0;
	kha_audio2_Audio.audioCallback = kha_audio2_Audio1.mix;
};
kha_audio2_Audio1.mix = function(samplesBox,buffer) {
	var samples = samplesBox.value;
	if(kha_audio2_Audio1.sampleCache1.byteLength >> 2 < samples) {
		if(kha_audio2_Audio.disableGcInteractions) {
			haxe_Log.trace("Unexpected allocation request in audio thread.",{ fileName : "kha/audio2/Audio1.hx", lineNumber : 50, className : "kha.audio2.Audio1", methodName : "mix"});
			var _g = 0;
			while(_g < samples) {
				++_g;
				buffer.data.setFloat32(buffer.writeLocation * 4,0,true);
				buffer.writeLocation += 1;
				if(buffer.writeLocation >= buffer.size) {
					buffer.writeLocation = 0;
				}
			}
			kha_audio2_Audio1.lastAllocationCount = 0;
			kha_audio2_Audio.disableGcInteractions = false;
			return;
		}
		kha_audio2_Audio1.sampleCache1 = kha_arrays_Float32Array._new(samples * 2);
		kha_audio2_Audio1.sampleCache2 = kha_arrays_Float32Array._new(samples * 2);
		kha_audio2_Audio1.lastAllocationCount = 0;
	} else if(kha_audio2_Audio1.lastAllocationCount > 100) {
		kha_audio2_Audio.disableGcInteractions = true;
	} else {
		kha_audio2_Audio1.lastAllocationCount += 1;
	}
	var _g = 0;
	while(_g < samples) kha_audio2_Audio1.sampleCache2.setFloat32(_g++ * 4,0,true);
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		kha_audio2_Audio1.internalSoundChannels[i] = kha_audio2_Audio1.soundChannels[i];
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		kha_audio2_Audio1.internalStreamChannels[i] = kha_audio2_Audio1.streamChannels[i];
	}
	var _g = 0;
	var _g1 = kha_audio2_Audio1.internalSoundChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		if(channel == null || channel.get_finished()) {
			continue;
		}
		channel.nextSamples(kha_audio2_Audio1.sampleCache1,samples,buffer.samplesPerSecond);
		var _g2 = 0;
		while(_g2 < samples) {
			var i = _g2++;
			var _g3 = kha_audio2_Audio1.sampleCache2;
			_g3.setFloat32(i * 4,_g3.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) + kha_audio2_Audio1.sampleCache1.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) * channel.get_volume(),true);
		}
	}
	var _g = 0;
	var _g1 = kha_audio2_Audio1.internalStreamChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		if(channel == null || channel.get_finished()) {
			continue;
		}
		channel.nextSamples(kha_audio2_Audio1.sampleCache1,samples,buffer.samplesPerSecond);
		var _g2 = 0;
		while(_g2 < samples) {
			var i = _g2++;
			var _g3 = kha_audio2_Audio1.sampleCache2;
			_g3.setFloat32(i * 4,_g3.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) + kha_audio2_Audio1.sampleCache1.getFloat32(i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN) * channel.get_volume(),true);
		}
	}
	var _g = 0;
	while(_g < samples) {
		var a = kha_audio2_Audio1.sampleCache2.getFloat32(_g++ * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
		var a1 = a < 1.0 ? a : 1.0;
		buffer.data.setFloat32(buffer.writeLocation * 4,a1 > -1.0 ? a1 : -1.0,true);
		buffer.writeLocation += 1;
		if(buffer.writeLocation >= buffer.size) {
			buffer.writeLocation = 0;
		}
	}
};
var kha_audio2_AudioChannel = function(looping) {
	this.looping = false;
	this.stopped = false;
	this.paused = false;
	this.myPosition = 0;
	this.myVolume = 1;
	this.data = null;
	this.looping = looping;
};
$hxClasses["kha.audio2.AudioChannel"] = kha_audio2_AudioChannel;
kha_audio2_AudioChannel.__name__ = true;
kha_audio2_AudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_AudioChannel.prototype = {
	data: null
	,myVolume: null
	,myPosition: null
	,paused: null
	,stopped: null
	,looping: null
	,nextSamples: function(requestedSamples,requestedLength,sampleRate) {
		if(this.paused || this.stopped) {
			var _g = 0;
			while(_g < requestedLength) requestedSamples.setFloat32(_g++ * 4,0,true);
			return;
		}
		var requestedSamplesIndex = 0;
		while(requestedSamplesIndex < requestedLength) {
			var _g = 0;
			var a = (this.data.byteLength >> 2) - this.myPosition;
			var b = requestedLength - requestedSamplesIndex;
			var _g1 = a < b ? a : b;
			while(_g < _g1) {
				++_g;
				requestedSamples.setFloat32(requestedSamplesIndex++ * 4,this.data.getFloat32(this.myPosition++ * 4,kha_arrays_ByteArray.LITTLE_ENDIAN),true);
			}
			if(this.myPosition >= this.data.byteLength >> 2) {
				this.myPosition = 0;
				if(!this.looping) {
					this.stopped = true;
					break;
				}
			}
		}
		while(requestedSamplesIndex < requestedLength) requestedSamples.setFloat32(requestedSamplesIndex++ * 4,0,true);
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,finished: null
	,get_finished: function() {
		return this.stopped;
	}
	,__class__: kha_audio2_AudioChannel
};
var kha_audio2_Buffer = function(size,channels,samplesPerSecond) {
	this.size = size;
	this.data = kha_arrays_Float32Array._new(size);
	this.channels = channels;
	this.samplesPerSecond = samplesPerSecond;
	this.readLocation = 0;
	this.writeLocation = 0;
};
$hxClasses["kha.audio2.Buffer"] = kha_audio2_Buffer;
kha_audio2_Buffer.__name__ = true;
kha_audio2_Buffer.prototype = {
	channels: null
	,samplesPerSecond: null
	,data: null
	,size: null
	,readLocation: null
	,writeLocation: null
	,__class__: kha_audio2_Buffer
};
var kha_audio2_StreamChannel = function(data,loop) {
	this.paused = false;
	this.atend = false;
	this.myVolume = 1;
	this.loop = loop;
	this.reader = kha_audio2_ogg_vorbis_Reader.openFromBytes(data);
};
$hxClasses["kha.audio2.StreamChannel"] = kha_audio2_StreamChannel;
kha_audio2_StreamChannel.__name__ = true;
kha_audio2_StreamChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_StreamChannel.prototype = {
	reader: null
	,atend: null
	,loop: null
	,myVolume: null
	,paused: null
	,nextSamples: function(samples,length,sampleRate) {
		if(this.paused) {
			var _g = 0;
			while(_g < length) samples.setFloat32(_g++ * 4,0,true);
			return;
		}
		var count = this.reader.read(samples,length / 2 | 0,2,sampleRate,true) * 2;
		if(count < length) {
			if(this.loop) {
				this.reader.set_currentMillisecond(0);
			} else {
				this.atend = true;
			}
			var _g = count;
			while(_g < length) samples.setFloat32(_g++ * 4,0,true);
		}
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,finished: null
	,get_finished: function() {
		return this.atend;
	}
	,__class__: kha_audio2_StreamChannel
};
var kha_audio2_VirtualStreamChannel = function(aeChannel,looping) {
	this.mode = 2;
	this.aeChannel = aeChannel;
	this.looping = looping;
	this.lastTickTime = kha_Scheduler.realTime();
	this.lastPosition = 0;
};
$hxClasses["kha.audio2.VirtualStreamChannel"] = kha_audio2_VirtualStreamChannel;
kha_audio2_VirtualStreamChannel.__name__ = true;
kha_audio2_VirtualStreamChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_VirtualStreamChannel.prototype = {
	aeChannel: null
	,mode: null
	,lastTickTime: null
	,lastPosition: null
	,looping: null
	,wake: function() {
		this.updatePosition();
		this.aeChannel.set_position(this.lastPosition);
		this.aeChannel.play();
	}
	,updatePosition: function() {
		var now = kha_Scheduler.realTime();
		switch(this.mode) {
		case 0:
			this.lastPosition = 0;
			break;
		case 1:
			break;
		case 2:
			this.lastPosition += now - this.lastTickTime;
			while(this.lastPosition > this.get_length()) this.lastPosition -= this.get_length();
			break;
		}
		this.lastTickTime = now;
	}
	,get_length: function() {
		return this.aeChannel.get_length();
	}
	,__class__: kha_audio2_VirtualStreamChannel
};
var kha_audio2_ogg_tools_Crc32 = function() { };
$hxClasses["kha.audio2.ogg.tools.Crc32"] = kha_audio2_ogg_tools_Crc32;
kha_audio2_ogg_tools_Crc32.__name__ = true;
kha_audio2_ogg_tools_Crc32.init = function() {
	if(kha_audio2_ogg_tools_Crc32.table != null) {
		return;
	}
	kha_audio2_ogg_tools_Crc32.table = new Array(256);
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		var s = i << 24;
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		kha_audio2_ogg_tools_Crc32.table[i] = s;
	}
};
var kha_audio2_ogg_vorbis_Reader = function(input,seekFunc,inputLength) {
	this.seekFunc = seekFunc;
	this.inputLength = inputLength;
	this.decoder = kha_audio2_ogg_vorbis_VorbisDecoder.start(input);
	this.decoder.setupSampleNumber(seekFunc,inputLength);
	this.loopStart = this.get_header().comment.get_loopStart();
	this.loopLength = this.get_header().comment.get_loopLength();
};
$hxClasses["kha.audio2.ogg.vorbis.Reader"] = kha_audio2_ogg_vorbis_Reader;
kha_audio2_ogg_vorbis_Reader.__name__ = true;
kha_audio2_ogg_vorbis_Reader.openFromBytes = function(bytes) {
	var input = new haxe_io_BytesInput(bytes);
	var bytes1 = input;
	return new kha_audio2_ogg_vorbis_Reader(input,function(pos) {
		kha_audio2_ogg_vorbis_Reader.seekBytes(bytes1,pos);
	},bytes.length);
};
kha_audio2_ogg_vorbis_Reader.seekBytes = function(bytes,pos) {
	bytes.set_position(pos);
};
kha_audio2_ogg_vorbis_Reader.readAll = function(bytes,output,useFloat) {
	if(useFloat == null) {
		useFloat = false;
	}
	var input = new haxe_io_BytesInput(bytes);
	var decoder = kha_audio2_ogg_vorbis_VorbisDecoder.start(input);
	var bytes1 = input;
	decoder.setupSampleNumber(function(pos) {
		kha_audio2_ogg_vorbis_Reader.seekBytes(bytes1,pos);
	},bytes.length);
	var header = decoder.header;
	var buffer = kha_arrays_Float32Array._new(4096 * header.channel);
	while(true) {
		var n = decoder.read(buffer,4096,header.channel,header.sampleRate,useFloat);
		var _g = 0;
		var _g1 = n * header.channel;
		while(_g < _g1) output.writeFloat(buffer.getFloat32(_g++ * 4,kha_arrays_ByteArray.LITTLE_ENDIAN));
		if(n == 0) {
			break;
		}
	}
	return decoder.header;
};
kha_audio2_ogg_vorbis_Reader.prototype = {
	decoder: null
	,get_header: function() {
		return this.decoder.header;
	}
	,get_currentSample: function() {
		return this.decoder.currentSample;
	}
	,set_currentSample: function(value) {
		this.decoder.seek(this.seekFunc,this.inputLength,value);
		return this.decoder.currentSample;
	}
	,get_currentMillisecond: function() {
		var samples = this.get_currentSample();
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,set_currentMillisecond: function(value) {
		this.set_currentSample(Math.floor(UInt.toFloat(this.get_header().sampleRate) * (value / 1000)));
		return this.get_currentMillisecond();
	}
	,loopStart: null
	,loopLength: null
	,seekFunc: null
	,inputLength: null
	,read: function(output,samples,channels,sampleRate,useFloat) {
		if(useFloat == null) {
			useFloat = false;
		}
		this.decoder.ensurePosition(this.seekFunc);
		if(samples == null) {
			samples = this.decoder.totalSample;
		}
		if(channels == null) {
			channels = this.get_header().channel;
		}
		if(sampleRate == null) {
			sampleRate = this.get_header().sampleRate;
		}
		return this.decoder.read(output,samples,channels,sampleRate,useFloat);
	}
	,__class__: kha_audio2_ogg_vorbis_Reader
};
var kha_audio2_ogg_vorbis_VorbisDecodeState = function(input) {
	this.nextSeg = 0;
	this.firstDecode = false;
	this.bytesInSeg = 0;
	this.validBits = 0;
	this.input = input;
	this.inputPosition = 0;
	this.page = new kha_audio2_ogg_vorbis_data_Page();
	kha_audio2_ogg_tools_Crc32.init();
};
$hxClasses["kha.audio2.ogg.vorbis.VorbisDecodeState"] = kha_audio2_ogg_vorbis_VorbisDecodeState;
kha_audio2_ogg_vorbis_VorbisDecodeState.__name__ = true;
kha_audio2_ogg_vorbis_VorbisDecodeState.prototype = {
	page: null
	,eof: null
	,pFirst: null
	,pLast: null
	,validBits: null
	,inputPosition: null
	,input: null
	,discardSamplesDeferred: null
	,segments: null
	,bytesInSeg: null
	,firstDecode: null
	,nextSeg: null
	,acc: null
	,lastSeg: null
	,lastSegWhich: null
	,endSegWithKnownLoc: null
	,knownLocForPacket: null
	,error: null
	,currentLoc: null
	,currentLocValid: null
	,firstAudioPageOffset: null
	,setup: function(loc0,loc1) {
		this.inputPosition += 1;
		var segmentCount = this.input.readByte();
		this.inputPosition += segmentCount;
		var vec = new Array(segmentCount);
		var _g = 0;
		while(_g < segmentCount) vec[_g++] = this.input.readByte();
		this.segments = vec;
		this.endSegWithKnownLoc = -2;
		if(loc0 != -1 || loc1 != -1) {
			var i = segmentCount - 1;
			while(i >= 0) {
				if(this.segments[i] < 255) {
					break;
				}
				if(i >= 0) {
					this.endSegWithKnownLoc = i;
					this.knownLocForPacket = loc0;
				}
				--i;
			}
		}
		if(this.firstDecode) {
			var len = 0;
			var p = new kha_audio2_ogg_vorbis_data_ProbedPage();
			var _g = 0;
			while(_g < segmentCount) len += this.segments[_g++];
			len += 27 + segmentCount;
			p.pageStart = this.firstAudioPageOffset;
			p.pageEnd = p.pageStart + len;
			p.firstDecodedSample = 0;
			p.lastDecodedSample = loc0;
			this.pFirst = p;
		}
		this.nextSeg = 0;
	}
	,clone: function(seekFunc) {
		var state = Object.create(kha_audio2_ogg_vorbis_VorbisDecodeState.prototype);
		seekFunc(this.inputPosition);
		state.input = this.input;
		state.eof = this.eof;
		state.validBits = this.validBits;
		state.discardSamplesDeferred = this.discardSamplesDeferred;
		state.firstDecode = this.firstDecode;
		state.nextSeg = this.nextSeg;
		state.bytesInSeg = this.bytesInSeg;
		state.acc = state.acc;
		state.lastSeg = this.lastSeg;
		state.lastSegWhich = this.lastSegWhich;
		state.currentLoc = this.currentLoc;
		state.currentLocValid = this.currentLocValid;
		state.inputPosition = this.inputPosition;
		state.firstAudioPageOffset = this.firstAudioPageOffset;
		state.error = this.error;
		state.segments = this.segments;
		state.pFirst = this.pFirst;
		state.pLast = this.pLast;
		state.page = this.page.clone();
		return state;
	}
	,next: function() {
		if(this.lastSeg) {
			return 0;
		}
		if(this.nextSeg == -1) {
			this.lastSegWhich = this.segments.length - 1;
			try {
				this.page.start(this);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(((_g1) instanceof kha_audio2_ogg_vorbis_data_ReaderError)) {
					this.lastSeg = true;
					this.error = _g1;
					return 0;
				} else {
					throw _g;
				}
			}
			if((this.page.flag & 1) == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CONTINUED_PACKET_FLAG_INVALID,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 171, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "next"}));
			}
		}
		var len = this.segments[this.nextSeg++];
		if(len < 255) {
			this.lastSeg = true;
			this.lastSegWhich = this.nextSeg - 1;
		}
		if(this.nextSeg >= this.segments.length) {
			this.nextSeg = -1;
		}
		this.bytesInSeg = len;
		return len;
	}
	,startPacket: function() {
		while(this.nextSeg == -1) {
			this.page.start(this);
			if((this.page.flag & 1) != 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 193, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "startPacket"}));
			}
		}
		this.lastSeg = false;
		this.validBits = 0;
		this.bytesInSeg = 0;
	}
	,maybeStartPacket: function() {
		if(this.nextSeg == -1) {
			var eof = false;
			var x;
			try {
				this.inputPosition += 1;
				x = this.input.readByte();
			} catch( _g ) {
				if(((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
					eof = true;
					x = 0;
				} else {
					throw _g;
				}
			}
			if(eof) {
				return false;
			}
			var tmp;
			var tmp1;
			var tmp2;
			if(x == 79) {
				this.inputPosition += 1;
				tmp2 = this.input.readByte() != 103;
			} else {
				tmp2 = true;
			}
			if(!tmp2) {
				this.inputPosition += 1;
				tmp1 = this.input.readByte() != 103;
			} else {
				tmp1 = true;
			}
			if(!tmp1) {
				this.inputPosition += 1;
				tmp = this.input.readByte() != 83;
			} else {
				tmp = true;
			}
			if(tmp) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 218, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "maybeStartPacket"}));
			}
			this.page.startWithoutCapturePattern(this);
		}
		this.startPacket();
		return true;
	}
	,readBits: function(n) {
		if(this.validBits < 0) {
			return 0;
		} else if(this.validBits < n) {
			if(n > 24) {
				return this.readBits(24) + (this.readBits(n - 24) << 24);
			} else {
				if(this.validBits == 0) {
					this.acc = 0;
				}
				while(true) {
					if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
						this.validBits = -1;
						break;
					} else {
						this.bytesInSeg--;
						this.inputPosition += 1;
						this.acc = this.acc + (this.input.readByte() << this.validBits);
						this.validBits += 8;
					}
					if(!(this.validBits < n)) {
						break;
					}
				}
				if(this.validBits < 0) {
					return 0;
				} else {
					var z = this.acc & (1 << n) - 1;
					this.acc = this.acc >>> n;
					this.validBits -= n;
					return z;
				}
			}
		} else {
			var z = this.acc & (1 << n) - 1;
			this.acc = this.acc >>> n;
			this.validBits -= n;
			return z;
		}
	}
	,firstPageValidate: function() {
		if(this.segments.length != 1) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"segmentCount",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 308, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "firstPageValidate"}));
		}
		if(this.segments[0] != 30) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"decodeState head",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 311, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "firstPageValidate"}));
		}
	}
	,startFirstDecode: function() {
		this.firstAudioPageOffset = this.inputPosition;
		this.firstDecode = true;
	}
	,prepHuffman: function() {
		if(this.validBits <= 24) {
			if(this.validBits == 0) {
				this.acc = 0;
			}
			while(true) {
				if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
					return;
				} else {
					this.bytesInSeg--;
					this.inputPosition += 1;
					this.acc = this.acc + (this.input.readByte() << this.validBits);
					this.validBits += 8;
				}
				if(!(this.validBits <= 24)) {
					break;
				}
			}
		}
	}
	,finishDecodePacket: function(previousLength,n,r) {
		var left = r.left.start;
		var currentLocValid = false;
		var n2 = n >> 1;
		if(this.firstDecode) {
			this.currentLoc = -n2;
			this.discardSamplesDeferred = n - r.right.end;
			currentLocValid = true;
			this.firstDecode = false;
		} else if(this.discardSamplesDeferred != 0) {
			r.left.start += this.discardSamplesDeferred;
			left = r.left.start;
			this.discardSamplesDeferred = 0;
		}
		if(this.lastSegWhich == this.endSegWithKnownLoc) {
			if(currentLocValid && (this.page.flag & 4) != 0) {
				var currentEnd = this.knownLocForPacket - (n - r.right.end);
				if(currentEnd < this.currentLoc + r.right.end) {
					var len = currentEnd < this.currentLoc ? 0 : currentEnd - this.currentLoc;
					len += r.left.start;
					this.currentLoc += len;
					return { len : len, left : left, right : r.right.start};
				}
			}
			this.currentLoc = this.knownLocForPacket - (n2 - r.left.start);
			currentLocValid = true;
		}
		if(currentLocValid) {
			this.currentLoc += r.right.start - r.left.start;
		}
		return { len : r.right.end, left : left, right : r.right.start};
	}
	,getSampleNumber: function(seekFunc,inputLength) {
		var restoreOffset = this.inputPosition;
		var previousSafe = UInt.gte(inputLength,65536) && UInt.gte(inputLength - 65536,this.firstAudioPageOffset) ? inputLength - 65536 : this.firstAudioPageOffset;
		seekFunc(this.inputPosition = previousSafe);
		var end = 0;
		var last = false;
		var _g = this.findPage(seekFunc,inputLength);
		switch(_g._hx_index) {
		case 0:
			end = _g.end;
			last = _g.last;
			break;
		case 1:
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 519, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "getSampleNumber"}));
		}
		var lastPageLoc = this.inputPosition;
		_hx_loop1: while(!last) {
			seekFunc(this.inputPosition = end);
			var _g = this.findPage(seekFunc,inputLength);
			switch(_g._hx_index) {
			case 0:
				end = _g.end;
				last = _g.last;
				break;
			case 1:
				break _hx_loop1;
			}
			previousSafe = lastPageLoc + 1;
			lastPageLoc = this.inputPosition;
		}
		seekFunc(this.inputPosition = lastPageLoc);
		this.inputPosition += 6;
		var vec = new Array(6);
		var _g = 0;
		while(_g < 6) vec[_g++] = this.input.readByte();
		this.inputPosition += 4;
		var lo = this.input.readInt32();
		this.inputPosition += 4;
		var hi = this.input.readInt32();
		if(lo == -1 && hi == -1 || hi > 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 553, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "getSampleNumber"}));
		}
		this.pLast = new kha_audio2_ogg_vorbis_data_ProbedPage();
		this.pLast.pageStart = lastPageLoc;
		this.pLast.pageEnd = end;
		this.pLast.lastDecodedSample = lo;
		this.pLast.firstDecodedSample = null;
		this.pLast.afterPreviousPageStart = previousSafe;
		seekFunc(this.inputPosition = restoreOffset);
		return lo;
	}
	,findPage: function(seekFunc,inputLength) {
		try {
			while(true) {
				this.inputPosition += 1;
				if(this.input.readByte() == 79) {
					var retryLoc = this.inputPosition;
					if(retryLoc - 25 > inputLength) {
						return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
					}
					var tmp;
					var tmp1;
					this.inputPosition += 1;
					if(this.input.readByte() == 103) {
						this.inputPosition += 1;
						tmp1 = this.input.readByte() != 103;
					} else {
						tmp1 = true;
					}
					if(!tmp1) {
						this.inputPosition += 1;
						tmp = this.input.readByte() != 83;
					} else {
						tmp = true;
					}
					if(tmp) {
						continue;
					}
					var header = new Array(27);
					header[0] = 79;
					header[1] = 103;
					header[2] = 103;
					header[3] = 83;
					this.inputPosition += 1;
					header[4] = this.input.readByte();
					this.inputPosition += 1;
					header[5] = this.input.readByte();
					this.inputPosition += 1;
					header[6] = this.input.readByte();
					this.inputPosition += 1;
					header[7] = this.input.readByte();
					this.inputPosition += 1;
					header[8] = this.input.readByte();
					this.inputPosition += 1;
					header[9] = this.input.readByte();
					this.inputPosition += 1;
					header[10] = this.input.readByte();
					this.inputPosition += 1;
					header[11] = this.input.readByte();
					this.inputPosition += 1;
					header[12] = this.input.readByte();
					this.inputPosition += 1;
					header[13] = this.input.readByte();
					this.inputPosition += 1;
					header[14] = this.input.readByte();
					this.inputPosition += 1;
					header[15] = this.input.readByte();
					this.inputPosition += 1;
					header[16] = this.input.readByte();
					this.inputPosition += 1;
					header[17] = this.input.readByte();
					this.inputPosition += 1;
					header[18] = this.input.readByte();
					this.inputPosition += 1;
					header[19] = this.input.readByte();
					this.inputPosition += 1;
					header[20] = this.input.readByte();
					this.inputPosition += 1;
					header[21] = this.input.readByte();
					this.inputPosition += 1;
					header[22] = this.input.readByte();
					this.inputPosition += 1;
					header[23] = this.input.readByte();
					this.inputPosition += 1;
					header[24] = this.input.readByte();
					this.inputPosition += 1;
					header[25] = this.input.readByte();
					this.inputPosition += 1;
					header[26] = this.input.readByte();
					if(header[4] != 0) {
						seekFunc(this.inputPosition = retryLoc);
						continue;
					}
					var goal = header[22] + (header[23] << 8) + (header[24] << 16) + (header[25] << 24);
					header[22] = 0;
					header[23] = 0;
					header[24] = 0;
					header[25] = 0;
					var crc = 0;
					var _g = 0;
					while(_g < 27) crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[header[_g++] ^ crc >>> 24];
					var len = 0;
					try {
						var _g1 = 0;
						var _g2 = header[26];
						while(_g1 < _g2) {
							++_g1;
							this.inputPosition += 1;
							var s = this.input.readByte();
							crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[s ^ crc >>> 24];
							len += s;
						}
						var _g3 = 0;
						var _g4 = len;
						while(_g3 < _g4) {
							++_g3;
							this.inputPosition += 1;
							var byte = this.input.readByte();
							crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[byte ^ crc >>> 24];
						}
					} catch( _g5 ) {
						if(((haxe_Exception.caught(_g5).unwrap()) instanceof haxe_io_Eof)) {
							return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
						} else {
							throw _g5;
						}
					}
					if(crc == goal) {
						var end = this.inputPosition;
						seekFunc(this.inputPosition = retryLoc - 1);
						return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.Found(end,(header[5] & 4) != 0);
					}
				}
			}
		} catch( _g ) {
			if(((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
			} else {
				throw _g;
			}
		}
	}
	,analyzePage: function(seekFunc,h) {
		var z = new kha_audio2_ogg_vorbis_data_ProbedPage();
		var packetType = new Array(255);
		z.pageStart = this.inputPosition;
		this.inputPosition += 27;
		var vec = new Array(27);
		var _g = 0;
		while(_g < 27) vec[_g++] = this.input.readByte();
		var n = vec[26];
		this.inputPosition += n;
		var vec1 = new Array(n);
		var _g = 0;
		while(_g < n) vec1[_g++] = this.input.readByte();
		var len = 0;
		var _g = 0;
		var _g1 = vec[26];
		while(_g < _g1) len += vec1[_g++];
		z.pageEnd = z.pageStart + 27 + vec[26] + len;
		z.lastDecodedSample = vec[6] + (vec[7] << 8) + (vec[8] << 16) + (vec[9] << 16);
		if((vec[5] & 4) != 0) {
			z.firstDecodedSample = null;
			seekFunc(this.inputPosition = z.pageStart);
			return z;
		}
		var numPacket = 0;
		var packetStart = (vec[5] & 1) == 0;
		var modeCount = h.modes.length;
		var _g = 0;
		var _g1 = vec[26];
		while(_g < _g1) {
			var i = _g++;
			if(packetStart) {
				if(vec1[i] == 0) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				this.inputPosition += 1;
				var n = this.input.readByte();
				if((n & 1) != 0) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				n >>= 1;
				var n1 = modeCount - 1;
				var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
				n &= (1 << (n1 < 16384 ? n1 < 16 ? log2_4[n1] : n1 < 512 ? 5 + log2_4[n1 >> 5] : 10 + log2_4[n1 >> 10] : n1 < 16777216 ? n1 < 524288 ? 15 + log2_4[n1 >> 15] : 20 + log2_4[n1 >> 20] : n1 < 536870912 ? 25 + log2_4[n1 >> 25] : n1 < -2147483648 ? 30 + log2_4[n1 >> 30] : 0)) - 1;
				if(n >= modeCount) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				packetType[numPacket++] = h.modes[n].blockflag;
				var len = vec1[i] - 1;
				this.inputPosition += len;
				var vec = new Array(len);
				var _g2 = 0;
				while(_g2 < len) vec[_g2++] = this.input.readByte();
			} else {
				var len1 = vec1[i];
				this.inputPosition += len1;
				var vec2 = new Array(len1);
				var _g3 = 0;
				while(_g3 < len1) vec2[_g3++] = this.input.readByte();
			}
			packetStart = vec1[i] < 255;
		}
		var samples = 0;
		if(numPacket > 1) {
			samples = packetType[numPacket - 1] ? h.blocksize1 : h.blocksize0;
		}
		var i = numPacket - 2;
		while(i >= 1) {
			--i;
			if(packetType[i]) {
				if(packetType[i + 1]) {
					samples += h.blocksize1 >> 1;
				} else {
					samples += (h.blocksize1 - h.blocksize0 >> 2) + (h.blocksize0 >> 1);
				}
			} else {
				samples += h.blocksize0 >> 1;
			}
			--i;
		}
		z.firstDecodedSample = z.lastDecodedSample - samples;
		seekFunc(this.inputPosition = z.pageStart);
		return z;
	}
	,decodeScalarRaw: function(c) {
		this.prepHuffman();
		var codewordLengths = c.codewordLengths;
		var codewords = c.codewords;
		var sortedCodewords = c.sortedCodewords;
		if(c.entries > 8 ? sortedCodewords != null : codewords != null) {
			var n = this.acc;
			n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
			n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
			n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
			n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
			var code = n >>> 16 | n << 16;
			var x = 0;
			var n = c.sortedEntries;
			while(n > 1) {
				var m = x + (n >> 1);
				if(UInt.gte(code,sortedCodewords[m])) {
					x = m;
					n -= n >> 1;
				} else {
					n >>= 1;
				}
			}
			if(!c.sparse) {
				x = c.sortedValues[x];
			}
			var len = codewordLengths[x];
			if(this.validBits >= len) {
				this.acc = this.acc >>> len;
				this.validBits -= len;
				return x;
			}
			this.validBits = 0;
			return -1;
		}
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var i = _g++;
			var cl = codewordLengths[i];
			if(cl == 255) {
				continue;
			}
			if(codewords[i] == (this.acc & (1 << cl) - 1)) {
				if(this.validBits >= cl) {
					this.acc = this.acc >>> cl;
					this.validBits -= cl;
					return i;
				}
				this.validBits = 0;
				return -1;
			}
		}
		this.error = new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 847, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "decodeScalarRaw"});
		this.validBits = 0;
		return -1;
	}
	,__class__: kha_audio2_ogg_vorbis_VorbisDecodeState
};
var kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult = $hxEnums["kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult"] = { __ename__:true,__constructs__:null
	,Found: ($_=function(end,last) { return {_hx_index:0,end:end,last:last,__enum__:"kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult",toString:$estr}; },$_._hx_name="Found",$_.__params__ = ["end","last"],$_)
	,NotFound: {_hx_name:"NotFound",_hx_index:1,__enum__:"kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult",toString:$estr}
};
kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.__constructs__ = [kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.Found,kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound];
var kha_audio2_ogg_vorbis_VorbisDecoder = function(header,decodeState) {
	this.header = header;
	this.decodeState = decodeState;
	this.totalSample = null;
	this.currentSample = 0;
	this.previousLength = 0;
	this.channelBuffers = new Array(header.channel);
	this.previousWindow = new Array(header.channel);
	this.finalY = new Array(header.channel);
	var _g = 0;
	var _g1 = header.channel;
	while(_g < _g1) {
		var i = _g++;
		this.channelBuffers[i] = new Array(header.blocksize1);
		this.previousWindow[i] = new Array(header.blocksize1 / 2 | 0);
		this.finalY[i] = [];
	}
	this.a = new Array(2);
	this.b = new Array(2);
	this.c = new Array(2);
	this.window = new Array(2);
	this.bitReverseData = new Array(2);
	this.initBlocksize(0,header.blocksize0);
	this.initBlocksize(1,header.blocksize1);
};
$hxClasses["kha.audio2.ogg.vorbis.VorbisDecoder"] = kha_audio2_ogg_vorbis_VorbisDecoder;
kha_audio2_ogg_vorbis_VorbisDecoder.__name__ = true;
kha_audio2_ogg_vorbis_VorbisDecoder.start = function(input) {
	var decodeState = new kha_audio2_ogg_vorbis_VorbisDecodeState(input);
	var decoder = new kha_audio2_ogg_vorbis_VorbisDecoder(kha_audio2_ogg_vorbis_data_Header.read(decodeState),decodeState);
	decodeState.startFirstDecode();
	decoder.pumpFirstFrame();
	return decoder;
};
kha_audio2_ogg_vorbis_VorbisDecoder.prototype = {
	previousWindow: null
	,previousLength: null
	,finalY: null
	,a: null
	,b: null
	,c: null
	,window: null
	,bitReverseData: null
	,channelBuffers: null
	,channelBufferStart: null
	,channelBufferEnd: null
	,header: null
	,currentSample: null
	,totalSample: null
	,decodeState: null
	,read: function(output,samples,channels,sampleRate,useFloat) {
		if((UInt.toFloat(sampleRate) % UInt.toFloat(this.header.sampleRate) | 0) != 0) {
			throw haxe_Exception.thrown("Unsupported sampleRate : can't convert " + (this.header.sampleRate == null ? "null" : Std.string(UInt.toFloat(this.header.sampleRate))) + " to " + sampleRate);
		}
		if(channels % this.header.channel != 0) {
			throw haxe_Exception.thrown("Unsupported channels : can't convert " + this.header.channel + " to " + channels);
		}
		var sampleRepeat = UInt.toFloat(sampleRate) / UInt.toFloat(this.header.sampleRate) | 0;
		var channelRepeat = channels / this.header.channel | 0;
		var n = 0;
		var len = Math.floor(samples / sampleRepeat);
		if(this.totalSample != null && len > this.totalSample - this.currentSample) {
			len = this.totalSample - this.currentSample;
		}
		var index = 0;
		while(n < len) {
			var k = this.channelBufferEnd - this.channelBufferStart;
			if(k >= len - n) {
				k = len - n;
			}
			var _g = this.channelBufferStart;
			var _g1 = this.channelBufferStart + k;
			while(_g < _g1) {
				var j = _g++;
				var _g2 = 0;
				while(_g2 < sampleRepeat) {
					++_g2;
					var _g3 = 0;
					var _g4 = this.header.channel;
					while(_g3 < _g4) {
						var i = _g3++;
						var _g5 = 0;
						while(_g5 < channelRepeat) {
							++_g5;
							var value = this.channelBuffers[i][j];
							if(value > 1) {
								value = 1;
							} else if(value < -1) {
								value = -1;
							}
							if(useFloat) {
								output.setFloat32(index * 4,value,true);
								++index;
							}
						}
					}
				}
			}
			n += k;
			this.channelBufferStart += k;
			if(n == len || this.getFrameFloat() == 0) {
				break;
			}
		}
		var _g = n;
		var _g1 = len;
		while(_g < _g1) {
			++_g;
			var _g2 = 0;
			while(_g2 < sampleRepeat) {
				++_g2;
				var _g3 = 0;
				var _g4 = this.header.channel;
				while(_g3 < _g4) {
					++_g3;
					var _g5 = 0;
					while(_g5 < channelRepeat) {
						++_g5;
						if(useFloat) {
							output.setFloat32(index * 4,0,true);
							++index;
						}
					}
				}
			}
		}
		this.currentSample += len;
		return len * sampleRepeat;
	}
	,skipSamples: function(len) {
		var n = 0;
		if(this.totalSample != null && len > this.totalSample - this.currentSample) {
			len = this.totalSample - this.currentSample;
		}
		while(n < len) {
			var k = this.channelBufferEnd - this.channelBufferStart;
			if(k >= len - n) {
				k = len - n;
			}
			n += k;
			this.channelBufferStart += k;
			if(n == len || this.getFrameFloat() == 0) {
				break;
			}
		}
		this.currentSample += len;
		return len;
	}
	,setupSampleNumber: function(seekFunc,inputLength) {
		if(this.totalSample == null) {
			this.totalSample = this.decodeState.getSampleNumber(seekFunc,inputLength);
		}
	}
	,seek: function(seekFunc,inputLength,sampleNumber) {
		if(this.currentSample == sampleNumber) {
			return;
		}
		if(this.totalSample == null) {
			this.setupSampleNumber(seekFunc,inputLength);
			if(this.totalSample == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 187, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
			}
		}
		if(sampleNumber < 0) {
			sampleNumber = 0;
		}
		var p0 = this.decodeState.pFirst;
		var p1 = this.decodeState.pLast;
		if(sampleNumber >= p1.lastDecodedSample) {
			sampleNumber = p1.lastDecodedSample - 1;
		}
		if(sampleNumber < p0.lastDecodedSample) {
			this.seekFrameFromPage(seekFunc,p0.pageStart,0,sampleNumber);
		} else {
			var attempts = 0;
			while(p0.pageEnd < p1.pageStart) {
				var startOffset = p0.pageEnd;
				var endOffset = p1.afterPreviousPageStart;
				var startSample = p0.lastDecodedSample;
				var endSample = p1.lastDecodedSample;
				if(startSample == null || endSample == null) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 219, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				if(UInt.gt(endOffset,startOffset + 4000)) {
					endOffset = endOffset - 4000;
				}
				var probe = startOffset + Math.floor(UInt.toFloat(endOffset - startOffset) / UInt.toFloat(endSample - startSample) * (sampleNumber - startSample));
				if(attempts >= 4) {
					var probe2 = startOffset + (endOffset - startOffset >>> 1);
					probe = attempts >= 8 ? probe2 : UInt.gt(probe2,probe) ? probe + (probe2 - probe >>> 1) : probe2 + (probe - probe2 >>> 1);
				}
				++attempts;
				seekFunc(this.decodeState.inputPosition = probe);
				switch(this.decodeState.findPage(seekFunc,inputLength)._hx_index) {
				case 0:
					break;
				case 1:
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 249, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				var q = this.decodeState.analyzePage(seekFunc,this.header);
				if(q == null) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 255, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				q.afterPreviousPageStart = probe;
				if(q.pageStart == p1.pageStart) {
					p1 = q;
					continue;
				}
				if(sampleNumber < q.lastDecodedSample) {
					p1 = q;
				} else {
					p0 = q;
				}
			}
			if(p0.lastDecodedSample <= sampleNumber && sampleNumber < p1.lastDecodedSample) {
				this.seekFrameFromPage(seekFunc,p1.pageStart,p0.lastDecodedSample,sampleNumber);
			} else {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 275, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
			}
		}
	}
	,seekFrameFromPage: function(seekFunc,pageStart,firstSample,targetSample) {
		var frame = 0;
		var frameStart = firstSample;
		seekFunc(this.decodeState.inputPosition = pageStart);
		this.decodeState.nextSeg = -1;
		var leftEnd = 0;
		var leftStart = 0;
		var prevState = null;
		var lastState = null;
		while(true) {
			prevState = lastState;
			lastState = this.decodeState.clone(seekFunc);
			var initialResult = this.decodeInitial();
			if(initialResult == null) {
				lastState = prevState;
				break;
			}
			leftStart = initialResult.left.start;
			leftEnd = initialResult.left.end;
			var start = frame == 0 ? leftEnd : leftStart;
			if(targetSample < frameStart + initialResult.right.start - start) {
				break;
			}
			var _this = this.decodeState;
			while(_this.bytesInSeg != 0 || !_this.lastSeg && _this.next() != 0) {
				_this.bytesInSeg--;
				_this.inputPosition += 1;
				_this.input.readByte();
			}
			frameStart += initialResult.right.start - start;
			++frame;
		}
		this.decodeState = lastState;
		seekFunc(this.decodeState.inputPosition);
		this.previousLength = 0;
		this.pumpFirstFrame();
		this.currentSample = frameStart;
		this.skipSamples(targetSample - frameStart);
	}
	,ensurePosition: function(seekFunc) {
		seekFunc(this.decodeState.inputPosition);
	}
	,getFrameFloat: function() {
		var result = this.decodePacket();
		if(result == null) {
			this.channelBufferStart = this.channelBufferEnd = 0;
			return 0;
		}
		var len = this.finishFrame(result);
		this.channelBufferStart = result.left;
		this.channelBufferEnd = result.left + len;
		return len;
	}
	,pumpFirstFrame: function() {
		this.finishFrame(this.decodePacket());
	}
	,finishFrame: function(r) {
		var len = r.len;
		var right = r.right;
		var left = r.left;
		if(this.previousLength != 0) {
			var n = this.previousLength;
			var w = this.getWindow(n);
			var _g = 0;
			var _g1 = this.header.channel;
			while(_g < _g1) {
				var i = _g++;
				var cb = this.channelBuffers[i];
				var pw = this.previousWindow[i];
				var _g2 = 0;
				while(_g2 < n) {
					var j = _g2++;
					cb[left + j] = cb[left + j] * w[j] + pw[j] * w[n - 1 - j];
				}
			}
		}
		var prev = this.previousLength;
		this.previousLength = len - right;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			var pw = this.previousWindow[i];
			var cb = this.channelBuffers[i];
			var _g2 = 0;
			var _g3 = len - right;
			while(_g2 < _g3) {
				var j = _g2++;
				pw[j] = cb[right + j];
			}
		}
		if(prev == 0) {
			return 0;
		}
		if(len < right) {
			right = len;
		}
		return right - left;
	}
	,getWindow: function(len) {
		len <<= 1;
		if(len == this.header.blocksize0) {
			return this.window[0];
		} else if(len == this.header.blocksize1) {
			return this.window[1];
		} else {
			return null;
		}
	}
	,initBlocksize: function(bs,n) {
		var n2 = n >> 1;
		this.a[bs] = new Array(n2);
		this.b[bs] = new Array(n2);
		this.c[bs] = new Array(n >> 2);
		this.window[bs] = new Array(n2);
		this.bitReverseData[bs] = new Array(n >> 3);
		kha_audio2_ogg_vorbis_VorbisTools.computeTwiddleFactors(n,this.a[bs],this.b[bs],this.c[bs]);
		kha_audio2_ogg_vorbis_VorbisTools.computeWindow(n,this.window[bs]);
		kha_audio2_ogg_vorbis_VorbisTools.computeBitReverse(n,this.bitReverseData[bs]);
	}
	,inverseMdct: function(buffer,n,blocktype) {
		var bt = blocktype ? 1 : 0;
		var a = this.a[bt];
		var b = this.b[bt];
		var c = this.c[bt];
		var bitReverse = this.bitReverseData[bt];
		var n2 = n >> 1;
		var n4 = n >> 2;
		var n8 = n >> 3;
		var buf2 = new Array(n2);
		var dOffset = n2 - 2;
		var aaOffset = 0;
		var eOffset = 0;
		while(eOffset != n2) {
			buf2[dOffset + 1] = buffer[eOffset] * a[aaOffset] - buffer[eOffset + 2] * a[aaOffset + 1];
			buf2[dOffset] = buffer[eOffset] * a[aaOffset + 1] + buffer[eOffset + 2] * a[aaOffset];
			dOffset -= 2;
			aaOffset += 2;
			eOffset += 4;
		}
		eOffset = n2 - 3;
		while(dOffset >= 0) {
			buf2[dOffset + 1] = -buffer[eOffset + 2] * a[aaOffset] - -buffer[eOffset] * a[aaOffset + 1];
			buf2[dOffset] = -buffer[eOffset + 2] * a[aaOffset + 1] + -buffer[eOffset] * a[aaOffset];
			dOffset -= 2;
			aaOffset += 2;
			eOffset -= 4;
		}
		var aaOffset = n2 - 8;
		var eOffset0 = n4;
		var eOffset1 = 0;
		var dOffset0 = n4;
		var dOffset1 = 0;
		while(aaOffset >= 0) {
			var v41_21 = buf2[eOffset0 + 1] - buf2[eOffset1 + 1];
			var v40_20 = buf2[eOffset0] - buf2[eOffset1];
			buffer[dOffset0 + 1] = buf2[eOffset0 + 1] + buf2[eOffset1 + 1];
			buffer[dOffset0] = buf2[eOffset0] + buf2[eOffset1];
			buffer[dOffset1 + 1] = v41_21 * a[aaOffset + 4] - v40_20 * a[aaOffset + 5];
			buffer[dOffset1] = v40_20 * a[aaOffset + 4] + v41_21 * a[aaOffset + 5];
			v41_21 = buf2[eOffset0 + 3] - buf2[eOffset1 + 3];
			v40_20 = buf2[eOffset0 + 2] - buf2[eOffset1 + 2];
			buffer[dOffset0 + 3] = buf2[eOffset0 + 3] + buf2[eOffset1 + 3];
			buffer[dOffset0 + 2] = buf2[eOffset0 + 2] + buf2[eOffset1 + 2];
			buffer[dOffset1 + 3] = v41_21 * a[aaOffset] - v40_20 * a[aaOffset + 1];
			buffer[dOffset1 + 2] = v40_20 * a[aaOffset] + v41_21 * a[aaOffset + 1];
			aaOffset -= 8;
			dOffset0 += 4;
			dOffset1 += 4;
			eOffset0 += 4;
			eOffset1 += 4;
		}
		var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
		var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
		var i_off = n2 - 1 - n4 * 0;
		var eeOffset0 = i_off;
		var eeOffset2 = i_off + -(n >> 3);
		var aOffset = 0;
		var i = (n >> 4 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = buffer[eeOffset0] - buffer[eeOffset2];
			var k01_21 = buffer[eeOffset0 + (-1)] - buffer[eeOffset2 + (-1)];
			buffer[eeOffset0] += buffer[eeOffset2];
			buffer[eeOffset0 + (-1)] += buffer[eeOffset2 + (-1)];
			buffer[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = buffer[eeOffset0 + (-2)] - buffer[eeOffset2 + (-2)];
			k01_21 = buffer[eeOffset0 + (-3)] - buffer[eeOffset2 + (-3)];
			buffer[eeOffset0 + (-2)] += buffer[eeOffset2 + (-2)];
			buffer[eeOffset0 + (-3)] += buffer[eeOffset2 + (-3)];
			buffer[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = buffer[eeOffset0 + (-4)] - buffer[eeOffset2 + (-4)];
			k01_21 = buffer[eeOffset0 + (-5)] - buffer[eeOffset2 + (-5)];
			buffer[eeOffset0 + (-4)] += buffer[eeOffset2 + (-4)];
			buffer[eeOffset0 + (-5)] += buffer[eeOffset2 + (-5)];
			buffer[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = buffer[eeOffset0 + (-6)] - buffer[eeOffset2 + (-6)];
			k01_21 = buffer[eeOffset0 + (-7)] - buffer[eeOffset2 + (-7)];
			buffer[eeOffset0 + (-6)] += buffer[eeOffset2 + (-6)];
			buffer[eeOffset0 + (-7)] += buffer[eeOffset2 + (-7)];
			buffer[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			eeOffset0 -= 8;
			eeOffset2 -= 8;
		}
		var i_off = n2 - 1 - n4;
		var eeOffset0 = i_off;
		var eeOffset2 = i_off + -(n >> 3);
		var aOffset = 0;
		var i = (n >> 4 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = buffer[eeOffset0] - buffer[eeOffset2];
			var k01_21 = buffer[eeOffset0 + (-1)] - buffer[eeOffset2 + (-1)];
			buffer[eeOffset0] += buffer[eeOffset2];
			buffer[eeOffset0 + (-1)] += buffer[eeOffset2 + (-1)];
			buffer[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = buffer[eeOffset0 + (-2)] - buffer[eeOffset2 + (-2)];
			k01_21 = buffer[eeOffset0 + (-3)] - buffer[eeOffset2 + (-3)];
			buffer[eeOffset0 + (-2)] += buffer[eeOffset2 + (-2)];
			buffer[eeOffset0 + (-3)] += buffer[eeOffset2 + (-3)];
			buffer[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = buffer[eeOffset0 + (-4)] - buffer[eeOffset2 + (-4)];
			k01_21 = buffer[eeOffset0 + (-5)] - buffer[eeOffset2 + (-5)];
			buffer[eeOffset0 + (-4)] += buffer[eeOffset2 + (-4)];
			buffer[eeOffset0 + (-5)] += buffer[eeOffset2 + (-5)];
			buffer[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = buffer[eeOffset0 + (-6)] - buffer[eeOffset2 + (-6)];
			k01_21 = buffer[eeOffset0 + (-7)] - buffer[eeOffset2 + (-7)];
			buffer[eeOffset0 + (-6)] += buffer[eeOffset2 + (-6)];
			buffer[eeOffset0 + (-7)] += buffer[eeOffset2 + (-7)];
			buffer[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			eeOffset0 -= 8;
			eeOffset2 -= 8;
		}
		var d0 = n2 - 1 - n8 * 0;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = buffer[eOffset0] - buffer[eOffset2];
			var k01_21 = buffer[eOffset0 + (-1)] - buffer[eOffset2 + (-1)];
			buffer[eOffset0] += buffer[eOffset2];
			buffer[eOffset0 + (-1)] += buffer[eOffset2 + (-1)];
			buffer[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-2)] - buffer[eOffset2 + (-2)];
			k01_21 = buffer[eOffset0 + (-3)] - buffer[eOffset2 + (-3)];
			buffer[eOffset0 + (-2)] += buffer[eOffset2 + (-2)];
			buffer[eOffset0 + (-3)] += buffer[eOffset2 + (-3)];
			buffer[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-4)] - buffer[eOffset2 + (-4)];
			k01_21 = buffer[eOffset0 + (-5)] - buffer[eOffset2 + (-5)];
			buffer[eOffset0 + (-4)] += buffer[eOffset2 + (-4)];
			buffer[eOffset0 + (-5)] += buffer[eOffset2 + (-5)];
			buffer[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-6)] - buffer[eOffset2 + (-6)];
			k01_21 = buffer[eOffset0 + (-7)] - buffer[eOffset2 + (-7)];
			buffer[eOffset0 + (-6)] += buffer[eOffset2 + (-6)];
			buffer[eOffset0 + (-7)] += buffer[eOffset2 + (-7)];
			buffer[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = buffer[eOffset0] - buffer[eOffset2];
			var k01_21 = buffer[eOffset0 + (-1)] - buffer[eOffset2 + (-1)];
			buffer[eOffset0] += buffer[eOffset2];
			buffer[eOffset0 + (-1)] += buffer[eOffset2 + (-1)];
			buffer[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-2)] - buffer[eOffset2 + (-2)];
			k01_21 = buffer[eOffset0 + (-3)] - buffer[eOffset2 + (-3)];
			buffer[eOffset0 + (-2)] += buffer[eOffset2 + (-2)];
			buffer[eOffset0 + (-3)] += buffer[eOffset2 + (-3)];
			buffer[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-4)] - buffer[eOffset2 + (-4)];
			k01_21 = buffer[eOffset0 + (-5)] - buffer[eOffset2 + (-5)];
			buffer[eOffset0 + (-4)] += buffer[eOffset2 + (-4)];
			buffer[eOffset0 + (-5)] += buffer[eOffset2 + (-5)];
			buffer[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-6)] - buffer[eOffset2 + (-6)];
			k01_21 = buffer[eOffset0 + (-7)] - buffer[eOffset2 + (-7)];
			buffer[eOffset0 + (-6)] += buffer[eOffset2 + (-6)];
			buffer[eOffset0 + (-7)] += buffer[eOffset2 + (-7)];
			buffer[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8 * 2;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = buffer[eOffset0] - buffer[eOffset2];
			var k01_21 = buffer[eOffset0 + (-1)] - buffer[eOffset2 + (-1)];
			buffer[eOffset0] += buffer[eOffset2];
			buffer[eOffset0 + (-1)] += buffer[eOffset2 + (-1)];
			buffer[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-2)] - buffer[eOffset2 + (-2)];
			k01_21 = buffer[eOffset0 + (-3)] - buffer[eOffset2 + (-3)];
			buffer[eOffset0 + (-2)] += buffer[eOffset2 + (-2)];
			buffer[eOffset0 + (-3)] += buffer[eOffset2 + (-3)];
			buffer[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-4)] - buffer[eOffset2 + (-4)];
			k01_21 = buffer[eOffset0 + (-5)] - buffer[eOffset2 + (-5)];
			buffer[eOffset0 + (-4)] += buffer[eOffset2 + (-4)];
			buffer[eOffset0 + (-5)] += buffer[eOffset2 + (-5)];
			buffer[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-6)] - buffer[eOffset2 + (-6)];
			k01_21 = buffer[eOffset0 + (-7)] - buffer[eOffset2 + (-7)];
			buffer[eOffset0 + (-6)] += buffer[eOffset2 + (-6)];
			buffer[eOffset0 + (-7)] += buffer[eOffset2 + (-7)];
			buffer[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8 * 3;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = buffer[eOffset0] - buffer[eOffset2];
			var k01_21 = buffer[eOffset0 + (-1)] - buffer[eOffset2 + (-1)];
			buffer[eOffset0] += buffer[eOffset2];
			buffer[eOffset0 + (-1)] += buffer[eOffset2 + (-1)];
			buffer[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-2)] - buffer[eOffset2 + (-2)];
			k01_21 = buffer[eOffset0 + (-3)] - buffer[eOffset2 + (-3)];
			buffer[eOffset0 + (-2)] += buffer[eOffset2 + (-2)];
			buffer[eOffset0 + (-3)] += buffer[eOffset2 + (-3)];
			buffer[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-4)] - buffer[eOffset2 + (-4)];
			k01_21 = buffer[eOffset0 + (-5)] - buffer[eOffset2 + (-5)];
			buffer[eOffset0 + (-4)] += buffer[eOffset2 + (-4)];
			buffer[eOffset0 + (-5)] += buffer[eOffset2 + (-5)];
			buffer[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = buffer[eOffset0 + (-6)] - buffer[eOffset2 + (-6)];
			k01_21 = buffer[eOffset0 + (-7)] - buffer[eOffset2 + (-7)];
			buffer[eOffset0 + (-6)] += buffer[eOffset2 + (-6)];
			buffer[eOffset0 + (-7)] += buffer[eOffset2 + (-7)];
			buffer[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			buffer[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var _g = 2;
		var _g1 = ld - 3 >> 1;
		while(_g < _g1) {
			var l = _g++;
			var k0 = n >> l + 2;
			var k0_2 = k0 >> 1;
			var lim = 1 << l + 1;
			var _g2 = 0;
			while(_g2 < lim) {
				var d0 = n2 - 1 - k0 * _g2++;
				var k1 = 1 << l + 3;
				var aOffset = 0;
				var eOffset0 = d0;
				var eOffset2 = d0 + -k0_2;
				var i = (n >> l + 4 >> 2) + 1;
				while(--i > 0) {
					var k00_20 = buffer[eOffset0] - buffer[eOffset2];
					var k01_21 = buffer[eOffset0 + (-1)] - buffer[eOffset2 + (-1)];
					buffer[eOffset0] += buffer[eOffset2];
					buffer[eOffset0 + (-1)] += buffer[eOffset2 + (-1)];
					buffer[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					buffer[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = buffer[eOffset0 + (-2)] - buffer[eOffset2 + (-2)];
					k01_21 = buffer[eOffset0 + (-3)] - buffer[eOffset2 + (-3)];
					buffer[eOffset0 + (-2)] += buffer[eOffset2 + (-2)];
					buffer[eOffset0 + (-3)] += buffer[eOffset2 + (-3)];
					buffer[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					buffer[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = buffer[eOffset0 + (-4)] - buffer[eOffset2 + (-4)];
					k01_21 = buffer[eOffset0 + (-5)] - buffer[eOffset2 + (-5)];
					buffer[eOffset0 + (-4)] += buffer[eOffset2 + (-4)];
					buffer[eOffset0 + (-5)] += buffer[eOffset2 + (-5)];
					buffer[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					buffer[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = buffer[eOffset0 + (-6)] - buffer[eOffset2 + (-6)];
					k01_21 = buffer[eOffset0 + (-7)] - buffer[eOffset2 + (-7)];
					buffer[eOffset0 + (-6)] += buffer[eOffset2 + (-6)];
					buffer[eOffset0 + (-7)] += buffer[eOffset2 + (-7)];
					buffer[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					buffer[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					eOffset0 -= 8;
					eOffset2 -= 8;
					aOffset += k1;
				}
			}
		}
		var _g = ld - 3 >> 1;
		var _g1 = ld - 6;
		while(_g < _g1) {
			var l = _g++;
			var k0 = n >> l + 2;
			var k1 = 1 << l + 3;
			var k0_2 = k0 >> 1;
			var lim = 1 << l + 1;
			var aOffset = 0;
			var i_off = n2 - 1;
			var r = (n >> l + 6) + 1;
			while(--r > 0) {
				var A0 = a[aOffset];
				var A1 = a[aOffset + 1];
				var A2 = a[aOffset + k1];
				var A3 = a[aOffset + k1 + 1];
				var A4 = a[aOffset + k1 * 2];
				var A5 = a[aOffset + k1 * 2 + 1];
				var A6 = a[aOffset + k1 * 3];
				var A7 = a[aOffset + k1 * 3 + 1];
				var eeOffset0 = i_off;
				var eeOffset2 = i_off + -k0_2;
				var i = lim + 1;
				while(--i > 0) {
					var k00 = buffer[eeOffset0] - buffer[eeOffset2];
					var k11 = buffer[eeOffset0 + (-1)] - buffer[eeOffset2 + (-1)];
					buffer[eeOffset0] += buffer[eeOffset2];
					buffer[eeOffset0 + (-1)] += buffer[eeOffset2 + (-1)];
					buffer[eeOffset2] = k00 * A0 - k11 * A1;
					buffer[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
					k00 = buffer[eeOffset0 + (-2)] - buffer[eeOffset2 + (-2)];
					k11 = buffer[eeOffset0 + (-3)] - buffer[eeOffset2 + (-3)];
					buffer[eeOffset0 + (-2)] += buffer[eeOffset2 + (-2)];
					buffer[eeOffset0 + (-3)] += buffer[eeOffset2 + (-3)];
					buffer[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
					buffer[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
					k00 = buffer[eeOffset0 + (-4)] - buffer[eeOffset2 + (-4)];
					k11 = buffer[eeOffset0 + (-5)] - buffer[eeOffset2 + (-5)];
					buffer[eeOffset0 + (-4)] += buffer[eeOffset2 + (-4)];
					buffer[eeOffset0 + (-5)] += buffer[eeOffset2 + (-5)];
					buffer[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
					buffer[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
					k00 = buffer[eeOffset0 + (-6)] - buffer[eeOffset2 + (-6)];
					k11 = buffer[eeOffset0 + (-7)] - buffer[eeOffset2 + (-7)];
					buffer[eeOffset0 + (-6)] += buffer[eeOffset2 + (-6)];
					buffer[eeOffset0 + (-7)] += buffer[eeOffset2 + (-7)];
					buffer[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
					buffer[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
					eeOffset0 -= k0;
					eeOffset2 -= k0;
				}
				aOffset += k1 * 4;
				i_off -= 8;
			}
		}
		var i_off = n2 - 1;
		var A2 = a[n >> 3];
		var zOffset = i_off;
		var baseOffset = i_off - 16 * (n >> 5);
		while(zOffset > baseOffset) {
			var t0 = buffer[zOffset];
			var t1 = buffer[zOffset + (-8)];
			buffer[zOffset + (-8)] = t0 - t1;
			buffer[zOffset] = t0 + t1;
			t0 = buffer[zOffset + (-1)];
			t1 = buffer[zOffset + (-9)];
			buffer[zOffset + (-9)] = t0 - t1;
			buffer[zOffset + (-1)] = t0 + t1;
			t0 = buffer[zOffset + (-2)];
			t1 = buffer[zOffset + (-10)];
			var k00 = t0 - t1;
			buffer[zOffset + (-2)] = t0 + t1;
			t0 = buffer[zOffset + (-3)];
			t1 = buffer[zOffset + (-11)];
			var k11 = t0 - t1;
			buffer[zOffset + (-3)] = t0 + t1;
			buffer[zOffset + (-10)] = (k00 + k11) * A2;
			buffer[zOffset + (-11)] = (k11 - k00) * A2;
			t0 = buffer[zOffset + (-4)];
			t1 = buffer[zOffset + (-12)];
			k00 = t1 - t0;
			buffer[zOffset + (-4)] = t0 + t1;
			t0 = buffer[zOffset + (-5)];
			t1 = buffer[zOffset + (-13)];
			k11 = t0 - t1;
			buffer[zOffset + (-5)] = t0 + t1;
			buffer[zOffset + (-12)] = k11;
			buffer[zOffset + (-13)] = k00;
			t0 = buffer[zOffset + (-6)];
			t1 = buffer[zOffset + (-14)];
			k00 = t1 - t0;
			buffer[zOffset + (-6)] = t0 + t1;
			t0 = buffer[zOffset + (-7)];
			t1 = buffer[zOffset + (-15)];
			k11 = t0 - t1;
			buffer[zOffset + (-7)] = t0 + t1;
			buffer[zOffset + (-14)] = (k00 + k11) * A2;
			buffer[zOffset + (-15)] = (k00 - k11) * A2;
			var t01 = buffer[zOffset];
			var t11 = buffer[zOffset + (-4)];
			var k001 = t01 - t11;
			var y0 = t01 + t11;
			t01 = buffer[zOffset + (-2)];
			t11 = buffer[zOffset + (-6)];
			var y2 = t01 + t11;
			var k22 = t01 - t11;
			buffer[zOffset] = y0 + y2;
			buffer[zOffset + (-2)] = y0 - y2;
			var k33 = buffer[zOffset + (-3)] - buffer[zOffset + (-7)];
			buffer[zOffset + (-4)] = k001 + k33;
			buffer[zOffset + (-6)] = k001 - k33;
			t01 = buffer[zOffset + (-1)];
			t11 = buffer[zOffset + (-5)];
			var k111 = t01 - t11;
			var y1 = t01 + t11;
			var y3 = buffer[zOffset + (-3)] + buffer[zOffset + (-7)];
			buffer[zOffset + (-1)] = y1 + y3;
			buffer[zOffset + (-3)] = y1 - y3;
			buffer[zOffset + (-5)] = k111 - k22;
			buffer[zOffset + (-7)] = k111 + k22;
			var zOffset1 = zOffset - 8;
			var t02 = buffer[zOffset1];
			var t12 = buffer[zOffset1 + (-4)];
			var k002 = t02 - t12;
			var y01 = t02 + t12;
			t02 = buffer[zOffset1 + (-2)];
			t12 = buffer[zOffset1 + (-6)];
			var y21 = t02 + t12;
			var k221 = t02 - t12;
			buffer[zOffset1] = y01 + y21;
			buffer[zOffset1 + (-2)] = y01 - y21;
			var k331 = buffer[zOffset1 + (-3)] - buffer[zOffset1 + (-7)];
			buffer[zOffset1 + (-4)] = k002 + k331;
			buffer[zOffset1 + (-6)] = k002 - k331;
			t02 = buffer[zOffset1 + (-1)];
			t12 = buffer[zOffset1 + (-5)];
			var k112 = t02 - t12;
			var y11 = t02 + t12;
			var y31 = buffer[zOffset1 + (-3)] + buffer[zOffset1 + (-7)];
			buffer[zOffset1 + (-1)] = y11 + y31;
			buffer[zOffset1 + (-3)] = y11 - y31;
			buffer[zOffset1 + (-5)] = k112 - k221;
			buffer[zOffset1 + (-7)] = k112 + k221;
			zOffset -= 16;
		}
		var brOffset = 0;
		var dOffset0 = n4 - 4;
		var dOffset1 = n2 - 4;
		while(dOffset0 >= 0) {
			var k4 = bitReverse[brOffset];
			buf2[dOffset1 + 3] = buffer[k4];
			buf2[dOffset1 + 2] = buffer[k4 + 1];
			buf2[dOffset0 + 3] = buffer[k4 + 2];
			buf2[dOffset0 + 2] = buffer[k4 + 3];
			k4 = bitReverse[brOffset + 1];
			buf2[dOffset1 + 1] = buffer[k4];
			buf2[dOffset1] = buffer[k4 + 1];
			buf2[dOffset0 + 1] = buffer[k4 + 2];
			buf2[dOffset0] = buffer[k4 + 3];
			dOffset0 -= 4;
			dOffset1 -= 4;
			brOffset += 2;
		}
		var cOffset = 0;
		var dOffset = 0;
		var eOffset = n2 - 4;
		while(dOffset < eOffset) {
			var a02 = buf2[dOffset] - buf2[eOffset + 2];
			var a11 = buf2[dOffset + 1] + buf2[eOffset + 3];
			var b0 = c[cOffset + 1] * a02 + c[cOffset] * a11;
			var b1 = c[cOffset + 1] * a11 - c[cOffset] * a02;
			var b2 = buf2[dOffset] + buf2[eOffset + 2];
			var b3 = buf2[dOffset + 1] - buf2[eOffset + 3];
			buf2[dOffset] = b2 + b0;
			buf2[dOffset + 1] = b3 + b1;
			buf2[eOffset + 2] = b2 - b0;
			buf2[eOffset + 3] = b1 - b3;
			a02 = buf2[dOffset + 2] - buf2[eOffset];
			a11 = buf2[dOffset + 3] + buf2[eOffset + 1];
			b0 = c[cOffset + 3] * a02 + c[cOffset + 2] * a11;
			b1 = c[cOffset + 3] * a11 - c[cOffset + 2] * a02;
			b2 = buf2[dOffset + 2] + buf2[eOffset];
			b3 = buf2[dOffset + 3] - buf2[eOffset + 1];
			buf2[dOffset + 2] = b2 + b0;
			buf2[dOffset + 3] = b3 + b1;
			buf2[eOffset] = b2 - b0;
			buf2[eOffset + 1] = b1 - b3;
			cOffset += 4;
			dOffset += 4;
			eOffset -= 4;
		}
		var bOffset = n2 - 8;
		var eOffset = n2 - 8;
		var dOffset0 = 0;
		var dOffset1 = n2 - 4;
		var dOffset2 = n2;
		var dOffset3 = n - 4;
		while(eOffset >= 0) {
			var p3 = buf2[eOffset + 6] * b[bOffset + 7] - buf2[eOffset + 7] * b[bOffset + 6];
			var p2 = -buf2[eOffset + 6] * b[bOffset + 6] - buf2[eOffset + 7] * b[bOffset + 7];
			buffer[dOffset0] = p3;
			buffer[dOffset1 + 3] = -p3;
			buffer[dOffset2] = p2;
			buffer[dOffset3 + 3] = p2;
			var p1 = buf2[eOffset + 4] * b[bOffset + 5] - buf2[eOffset + 5] * b[bOffset + 4];
			var p0 = -buf2[eOffset + 4] * b[bOffset + 4] - buf2[eOffset + 5] * b[bOffset + 5];
			buffer[dOffset0 + 1] = p1;
			buffer[dOffset1 + 2] = -p1;
			buffer[dOffset2 + 1] = p0;
			buffer[dOffset3 + 2] = p0;
			p3 = buf2[eOffset + 2] * b[bOffset + 3] - buf2[eOffset + 3] * b[bOffset + 2];
			p2 = -buf2[eOffset + 2] * b[bOffset + 2] - buf2[eOffset + 3] * b[bOffset + 3];
			buffer[dOffset0 + 2] = p3;
			buffer[dOffset1 + 1] = -p3;
			buffer[dOffset2 + 2] = p2;
			buffer[dOffset3 + 1] = p2;
			p1 = buf2[eOffset] * b[bOffset + 1] - buf2[eOffset + 1] * b[bOffset];
			p0 = -buf2[eOffset] * b[bOffset] - buf2[eOffset + 1] * b[bOffset + 1];
			buffer[dOffset0 + 3] = p1;
			buffer[dOffset1] = -p1;
			buffer[dOffset2 + 3] = p0;
			buffer[dOffset3] = p0;
			bOffset -= 8;
			eOffset -= 8;
			dOffset0 += 4;
			dOffset2 += 4;
			dOffset1 -= 4;
			dOffset3 -= 4;
		}
	}
	,decodePacket: function() {
		var result = this.decodeInitial();
		if(result == null) {
			return null;
		}
		return this.decodePacketRest(result);
	}
	,decodeInitial: function() {
		this.channelBufferStart = this.channelBufferEnd = 0;
		while(true) {
			if(!this.decodeState.maybeStartPacket()) {
				return null;
			}
			if(this.decodeState.readBits(1) != 0) {
				while(true) {
					var _this = this.decodeState;
					var x;
					if(_this.bytesInSeg == 0 && (_this.lastSeg || _this.next() == 0)) {
						x = -1;
					} else {
						_this.bytesInSeg--;
						_this.inputPosition += 1;
						x = _this.input.readByte();
					}
					_this.validBits = 0;
					if(!(-1 != x)) {
						break;
					}
				}
				continue;
			}
			break;
		}
		var n = this.header.modes.length - 1;
		var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
		var i = this.decodeState.readBits(n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0);
		if(i == -1 || i >= this.header.modes.length) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 519, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "decodeInitial"}));
		}
		var m = this.header.modes[i];
		var n;
		var prev;
		var next;
		if(m.blockflag) {
			n = this.header.blocksize1;
			prev = this.decodeState.readBits(1);
			next = this.decodeState.readBits(1);
		} else {
			next = 0;
			prev = 0;
			n = this.header.blocksize0;
		}
		var windowCenter = n >> 1;
		return { mode : i, left : m.blockflag && prev == 0 ? { start : n - this.header.blocksize0 >> 2, end : n + this.header.blocksize0 >> 2} : { start : 0, end : windowCenter}, right : m.blockflag && next == 0 ? { start : n * 3 - this.header.blocksize0 >> 2, end : n * 3 + this.header.blocksize0 >> 2} : { start : windowCenter, end : n}};
	}
	,decodePacketRest: function(r) {
		var m = this.header.modes[r.mode];
		var zeroChannel = new Array(256);
		var reallyZeroChannel = new Array(256);
		var n = m.blockflag ? this.header.blocksize1 : this.header.blocksize0;
		var map = this.header.mapping[m.mapping];
		var n2 = n >> 1;
		var rangeList = [256,128,86,64];
		var codebooks = this.header.codebooks;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			var s = map.chan[i].mux;
			zeroChannel[i] = false;
			var floor = this.header.floorConfig[map.submapFloor[s]];
			if(floor.type == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 581, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "decodePacketRest"}));
			} else {
				var g = floor.floor1;
				if(this.decodeState.readBits(1) != 0) {
					var fy = [];
					var step2Flag = new Array(256);
					var range = rangeList[g.floor1Multiplier - 1];
					var offset = 2;
					fy = this.finalY[i];
					var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
					fy[0] = this.decodeState.readBits((range < 16384 ? range < 16 ? log2_4[range] : range < 512 ? 5 + log2_4[range >> 5] : 10 + log2_4[range >> 10] : range < 16777216 ? range < 524288 ? 15 + log2_4[range >> 15] : 20 + log2_4[range >> 20] : range < 536870912 ? 25 + log2_4[range >> 25] : range < -2147483648 ? 30 + log2_4[range >> 30] : 0) - 1);
					var log2_41 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
					fy[1] = this.decodeState.readBits((range < 16384 ? range < 16 ? log2_41[range] : range < 512 ? 5 + log2_41[range >> 5] : 10 + log2_41[range >> 10] : range < 16777216 ? range < 524288 ? 15 + log2_41[range >> 15] : 20 + log2_41[range >> 20] : range < 536870912 ? 25 + log2_41[range >> 25] : range < -2147483648 ? 30 + log2_41[range >> 30] : 0) - 1);
					var _g2 = 0;
					var _g3 = g.partitions;
					while(_g2 < _g3) {
						var pclass = g.partitionClassList[_g2++];
						var cdim = g.classDimensions[pclass];
						var cbits = g.classSubclasses[pclass];
						var csub = (1 << cbits) - 1;
						var cval = 0;
						if(cbits != 0) {
							var c = codebooks[g.classMasterbooks[pclass]];
							var _this = this.decodeState;
							if(_this.validBits < 10) {
								_this.prepHuffman();
							}
							var i1 = c.fastHuffman[_this.acc & 1023];
							var val;
							if(i1 >= 0) {
								var l = c.codewordLengths[i1];
								_this.acc = _this.acc >>> l;
								_this.validBits -= l;
								if(_this.validBits < 0) {
									_this.validBits = 0;
									val = -1;
								} else {
									val = i1;
								}
							} else {
								val = _this.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							cval = val;
						}
						var books = g.subclassBooks[pclass];
						var _g4 = 0;
						while(_g4 < cdim) {
							++_g4;
							var book = books[cval & csub];
							cval >>= cbits;
							var tmp = offset++;
							var tmp1;
							if(book >= 0) {
								var _this1 = this.decodeState;
								var c1 = codebooks[book];
								if(_this1.validBits < 10) {
									_this1.prepHuffman();
								}
								var i2 = c1.fastHuffman[_this1.acc & 1023];
								var val1;
								if(i2 >= 0) {
									var l1 = c1.codewordLengths[i2];
									_this1.acc = _this1.acc >>> l1;
									_this1.validBits -= l1;
									if(_this1.validBits < 0) {
										_this1.validBits = 0;
										val1 = -1;
									} else {
										val1 = i2;
									}
								} else {
									val1 = _this1.decodeScalarRaw(c1);
								}
								if(c1.sparse) {
									val1 = c1.sortedValues[val1];
								}
								tmp1 = val1;
							} else {
								tmp1 = 0;
							}
							fy[tmp] = tmp1;
						}
					}
					if(this.decodeState.validBits == -1) {
						zeroChannel[i] = true;
						continue;
					}
					step2Flag[1] = true;
					step2Flag[0] = true;
					var naighbors = g.neighbors;
					var xlist = g.xlist;
					var _g5 = 2;
					var _g6 = g.values;
					while(_g5 < _g6) {
						var j = _g5++;
						var low = naighbors[j][0];
						var high = naighbors[j][1];
						var x0 = xlist[low];
						var y0 = fy[low];
						var dy = fy[high] - y0;
						var off = Math.abs(dy) * (xlist[j] - x0) / (xlist[high] - x0) | 0;
						var lowroom = dy < 0 ? y0 - off : y0 + off;
						var val2 = fy[j];
						var highroom = range - lowroom;
						if(val2 != 0) {
							step2Flag[high] = true;
							step2Flag[low] = true;
							step2Flag[j] = true;
							if(val2 >= (highroom < lowroom ? highroom * 2 : lowroom * 2)) {
								if(highroom > lowroom) {
									fy[j] = val2 - lowroom + lowroom;
								} else {
									fy[j] = lowroom - val2 + highroom - 1;
								}
							} else if((val2 & 1) != 0) {
								fy[j] = lowroom - (val2 + 1 >> 1);
							} else {
								fy[j] = lowroom + (val2 >> 1);
							}
						} else {
							step2Flag[j] = false;
							fy[j] = lowroom;
						}
					}
					var _g7 = 0;
					var _g8 = g.values;
					while(_g7 < _g8) {
						var j1 = _g7++;
						if(!step2Flag[j1]) {
							fy[j1] = -1;
						}
					}
				} else {
					zeroChannel[i] = true;
				}
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			reallyZeroChannel[i] = zeroChannel[i];
		}
		var _g = 0;
		var _g1 = map.couplingSteps;
		while(_g < _g1) {
			var i = _g++;
			if(!zeroChannel[map.chan[i].magnitude] || !zeroChannel[map.chan[i].angle]) {
				var index = map.chan[i].magnitude;
				zeroChannel[map.chan[i].angle] = false;
				zeroChannel[index] = false;
			}
		}
		var _g = 0;
		var _g1 = map.submaps;
		while(_g < _g1) {
			var i = _g++;
			var residueBuffers = new Array(this.header.channel);
			var doNotDecode = new Array(256);
			var ch = 0;
			var _g2 = 0;
			var _g3 = this.header.channel;
			while(_g2 < _g3) {
				var j = _g2++;
				if(map.chan[j].mux == i) {
					if(zeroChannel[j]) {
						doNotDecode[ch] = true;
						residueBuffers[ch] = null;
					} else {
						doNotDecode[ch] = false;
						residueBuffers[ch] = this.channelBuffers[j];
					}
					++ch;
				}
			}
			this.header.residueConfig[map.submapResidue[i]].decode(this.decodeState,this.header,residueBuffers,ch,n2,doNotDecode,this.channelBuffers);
		}
		var i = map.couplingSteps;
		var n2 = n >> 1;
		while(--i >= 0) {
			var m1 = this.channelBuffers[map.chan[i].magnitude];
			var a = this.channelBuffers[map.chan[i].angle];
			var _g = 0;
			while(_g < n2) {
				var j = _g++;
				var a2;
				var m2;
				if(m1[j] > 0) {
					if(a[j] > 0) {
						m2 = m1[j];
						a2 = m1[j] - a[j];
					} else {
						a2 = m1[j];
						m2 = m1[j] + a[j];
					}
				} else if(a[j] > 0) {
					m2 = m1[j];
					a2 = m1[j] + a[j];
				} else {
					a2 = m1[j];
					m2 = m1[j] - a[j];
				}
				m1[j] = m2;
				a[j] = a2;
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			if(reallyZeroChannel[i]) {
				var _g2 = 0;
				while(_g2 < n2) this.channelBuffers[i][_g2++] = 0;
			} else {
				map.doFloor(this.header.floorConfig,i,n,this.channelBuffers[i],this.finalY[i],null);
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) this.inverseMdct(this.channelBuffers[_g++],n,m.blockflag);
		var _this = this.decodeState;
		while(_this.bytesInSeg != 0 || !_this.lastSeg && _this.next() != 0) {
			_this.bytesInSeg--;
			_this.inputPosition += 1;
			_this.input.readByte();
		}
		return this.decodeState.finishDecodePacket(this.previousLength,n,r);
	}
	,__class__: kha_audio2_ogg_vorbis_VorbisDecoder
};
var kha_audio2_ogg_vorbis_VorbisTools = function() { };
$hxClasses["kha.audio2.ogg.vorbis.VorbisTools"] = kha_audio2_ogg_vorbis_VorbisTools;
kha_audio2_ogg_vorbis_VorbisTools.__name__ = true;
kha_audio2_ogg_vorbis_VorbisTools.pointCompare = function(a,b) {
	if(a.x < b.x) {
		return -1;
	} else if(a.x > b.x) {
		return 1;
	} else {
		return 0;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.uintAsc = function(a,b) {
	if(UInt.gt(b,a)) {
		return -1;
	} else if(a == b) {
		return 0;
	} else {
		return 1;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.lookup1Values = function(entries,dim) {
	var r = Math.exp(Math.log(entries) / dim) | 0;
	if((Math.pow(r + 1,dim) | 0) <= entries) {
		++r;
	}
	return r;
};
kha_audio2_ogg_vorbis_VorbisTools.computeWindow = function(n,$window) {
	var n2 = n >> 1;
	var _g = 0;
	while(_g < n2) {
		var i = _g++;
		$window[i] = Math.sin(1.5707963267948966 * kha_audio2_ogg_vorbis_VorbisTools.square(Math.sin((i + 0.5) / n2 * 0.5 * 3.14159265358979323846264)));
	}
};
kha_audio2_ogg_vorbis_VorbisTools.square = function(f) {
	return f * f;
};
kha_audio2_ogg_vorbis_VorbisTools.computeBitReverse = function(n,rev) {
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
	var n8 = n >> 3;
	var _g = 0;
	while(_g < n8) {
		var i = _g++;
		var n = i;
		n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
		n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
		n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
		n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
		rev[i] = (n >>> 16 | n << 16) >>> 32 - ld + 3 << 2;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.computeTwiddleFactors = function(n,af,bf,cf) {
	var n4 = n >> 2;
	var n8 = n >> 3;
	var k2 = 0;
	var _g = 0;
	while(_g < n4) {
		var k = _g++;
		af[k2] = Math.cos(4 * k * 3.14159265358979323846264 / n);
		af[k2 + 1] = -Math.sin(4 * k * 3.14159265358979323846264 / n);
		bf[k2] = Math.cos((k2 + 1) * 3.14159265358979323846264 / n / 2) * 0.5;
		bf[k2 + 1] = Math.sin((k2 + 1) * 3.14159265358979323846264 / n / 2) * 0.5;
		k2 += 2;
	}
	var k2 = 0;
	var _g = 0;
	while(_g < n8) {
		++_g;
		cf[k2] = Math.cos(2 * (k2 + 1) * 3.14159265358979323846264 / n);
		cf[k2 + 1] = -Math.sin(2 * (k2 + 1) * 3.14159265358979323846264 / n);
		k2 += 2;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.drawLine = function(output,x0,y0,x1,y1,n) {
	if(kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable == null) {
		kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable = new Array(32);
		var _g = 0;
		while(_g < 32) {
			var i = _g++;
			kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[i] = new Array(64);
			var _g1 = 1;
			while(_g1 < 64) {
				var j = _g1++;
				kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[i][j] = i / j | 0;
			}
		}
	}
	var dy = y1 - y0;
	var adx = x1 - x0;
	var ady = dy < 0 ? -dy : dy;
	var base;
	var y = y0;
	var err = 0;
	var sy;
	if(adx < 64 && ady < 32) {
		if(dy < 0) {
			base = -kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[ady][adx];
			sy = base - 1;
		} else {
			base = kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[ady][adx];
			sy = base + 1;
		}
	} else {
		base = dy / adx | 0;
		sy = dy < 0 ? base - 1 : base + 1;
	}
	ady -= (base < 0 ? -base : base) * adx;
	if(x1 > n) {
		x1 = n;
	}
	output[x0] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[y0];
	var _g = x0 + 1;
	var _g1 = x1;
	while(_g < _g1) {
		var i = _g++;
		err += ady;
		if(err >= adx) {
			err -= adx;
			y += sy;
		} else {
			y += base;
		}
		output[i] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[y];
	}
};
var kha_audio2_ogg_vorbis_data_Codebook = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Codebook"] = kha_audio2_ogg_vorbis_data_Codebook;
kha_audio2_ogg_vorbis_data_Codebook.__name__ = true;
kha_audio2_ogg_vorbis_data_Codebook.read = function(decodeState) {
	var c = new kha_audio2_ogg_vorbis_data_Codebook();
	if(decodeState.readBits(8) != 66 || decodeState.readBits(8) != 67 || decodeState.readBits(8) != 86) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 40, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	var x = decodeState.readBits(8);
	c.dimensions = (decodeState.readBits(8) << 8) + x;
	var x = decodeState.readBits(8);
	var y = decodeState.readBits(8);
	c.entries = (decodeState.readBits(8) << 16) + (y << 8) + x;
	var ordered = decodeState.readBits(1);
	c.sparse = ordered != 0 ? false : decodeState.readBits(1) != 0;
	var lengths = new Array(c.entries);
	if(!c.sparse) {
		c.codewordLengths = lengths;
	}
	var total = 0;
	if(ordered != 0) {
		var currentEntry = 0;
		var currentLength = decodeState.readBits(5) + 1;
		while(currentEntry < c.entries) {
			var limit = c.entries - currentEntry;
			var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			var n = decodeState.readBits(limit < 16384 ? limit < 16 ? log2_4[limit] : limit < 512 ? 5 + log2_4[limit >> 5] : 10 + log2_4[limit >> 10] : limit < 16777216 ? limit < 524288 ? 15 + log2_4[limit >> 15] : 20 + log2_4[limit >> 20] : limit < 536870912 ? 25 + log2_4[limit >> 25] : limit < -2147483648 ? 30 + log2_4[limit >> 30] : 0);
			if(currentEntry + n > c.entries) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"codebook entrys",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 67, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
			}
			var _g = 0;
			while(_g < n) lengths[currentEntry + _g++] = currentLength;
			currentEntry += n;
			++currentLength;
		}
	} else {
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var j = _g++;
			if((c.sparse ? decodeState.readBits(1) : 1) != 0) {
				lengths[j] = decodeState.readBits(5) + 1;
				++total;
			} else {
				lengths[j] = 255;
			}
		}
	}
	if(c.sparse && total >= c.entries >> 2) {
		c.codewordLengths = lengths;
		c.sparse = false;
	}
	var tmp;
	if(c.sparse) {
		tmp = total;
	} else {
		var sortedCount = 0;
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var l = lengths[_g++];
			if(l > 10 && l != 255) {
				++sortedCount;
			}
		}
		tmp = sortedCount;
	}
	c.sortedEntries = tmp;
	var values = null;
	if(!c.sparse) {
		c.codewords = new Array(c.entries);
	} else if(c.sortedEntries != 0) {
		c.codewordLengths = new Array(c.sortedEntries);
		c.codewords = new Array(c.entries);
		values = new Array(c.entries);
	}
	if(!c.computeCodewords(lengths,c.entries,values)) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"compute codewords",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 120, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	if(c.sortedEntries != 0) {
		c.sortedCodewords = [];
		c.sortedValues = new Array(c.sortedEntries);
		c.computeSortedHuffman(lengths,values);
	}
	if(c.sparse) {
		c.codewords = null;
		lengths = null;
	}
	c.computeAcceleratedHuffman();
	c.lookupType = decodeState.readBits(4);
	if(c.lookupType > 2) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"codebook lookup type",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 143, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	if(c.lookupType > 0) {
		var x = decodeState.readBits(32);
		var mantissa = UInt.toFloat(x & 2097151);
		c.minimumValue = ((x & -2147483648) != 0 ? -mantissa : mantissa) * Math.pow(2,((x & 2145386496) >>> 21) - 788);
		var x = decodeState.readBits(32);
		var mantissa = UInt.toFloat(x & 2097151);
		c.deltaValue = ((x & -2147483648) != 0 ? -mantissa : mantissa) * Math.pow(2,((x & 2145386496) >>> 21) - 788);
		c.valueBits = decodeState.readBits(4) + 1;
		c.sequenceP = decodeState.readBits(1) != 0;
		if(c.lookupType == 1) {
			c.lookupValues = kha_audio2_ogg_vorbis_VorbisTools.lookup1Values(c.entries,c.dimensions);
		} else {
			c.lookupValues = c.entries * c.dimensions;
		}
		var mults = new Array(c.lookupValues);
		var _g = 0;
		var _g1 = c.lookupValues;
		while(_g < _g1) {
			var j = _g++;
			var q = decodeState.readBits(c.valueBits);
			if(q == -1) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"fail lookup",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 161, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
			}
			mults[j] = q;
		}
		c.multiplicands = new Array(c.lookupValues);
		var _g = 0;
		var _g1 = c.lookupValues;
		while(_g < _g1) {
			var j = _g++;
			c.multiplicands[j] = mults[j] * c.deltaValue + c.minimumValue;
		}
		if(c.lookupType == 2 && c.sequenceP) {
			var _g = 1;
			var _g1 = c.lookupValues;
			while(_g < _g1) {
				var j = _g++;
				c.multiplicands[j] = c.multiplicands[j - 1];
			}
			c.sequenceP = false;
		}
	}
	return c;
};
kha_audio2_ogg_vorbis_data_Codebook.prototype = {
	dimensions: null
	,entries: null
	,codewordLengths: null
	,minimumValue: null
	,deltaValue: null
	,valueBits: null
	,lookupType: null
	,sequenceP: null
	,sparse: null
	,lookupValues: null
	,multiplicands: null
	,codewords: null
	,fastHuffman: null
	,sortedCodewords: null
	,sortedValues: null
	,sortedEntries: null
	,computeCodewords: function(len,n,values) {
		var available = new Array(32);
		available[0] = 0;
		available[1] = 0;
		available[2] = 0;
		available[3] = 0;
		available[4] = 0;
		available[5] = 0;
		available[6] = 0;
		available[7] = 0;
		available[8] = 0;
		available[9] = 0;
		available[10] = 0;
		available[11] = 0;
		available[12] = 0;
		available[13] = 0;
		available[14] = 0;
		available[15] = 0;
		available[16] = 0;
		available[17] = 0;
		available[18] = 0;
		available[19] = 0;
		available[20] = 0;
		available[21] = 0;
		available[22] = 0;
		available[23] = 0;
		available[24] = 0;
		available[25] = 0;
		available[26] = 0;
		available[27] = 0;
		available[28] = 0;
		available[29] = 0;
		available[30] = 0;
		available[31] = 0;
		var k = 0;
		while(k < n) {
			if(len[k] < 255) {
				break;
			}
			++k;
		}
		if(k == n) {
			return true;
		}
		var m = 0;
		m = 1;
		if(!this.sparse) {
			this.codewords[k] = 0;
		} else {
			this.codewords[0] = 0;
			this.codewordLengths[0] = len[k];
			values[0] = k;
		}
		var i = 0;
		while(++i <= len[k]) available[i] = 1 << 32 - i;
		i = k;
		while(++i < n) {
			var z = len[i];
			if(z == 255) {
				continue;
			}
			while(z > 0 && available[z] == 0) --z;
			if(z == 0) {
				return false;
			}
			var res = available[z];
			available[z] = 0;
			var n1 = res;
			n1 = (res & -1431655766) >>> 1 | (res & 1431655765) << 1;
			n1 = (n1 & -858993460) >>> 2 | (n1 & 858993459) << 2;
			n1 = (n1 & -252645136) >>> 4 | (n1 & 252645135) << 4;
			n1 = (n1 & -16711936) >>> 8 | (n1 & 16711935) << 8;
			var huffCode = n1 >>> 16 | n1 << 16;
			var count = m++;
			if(!this.sparse) {
				this.codewords[i] = huffCode;
			} else {
				this.codewords[count] = huffCode;
				this.codewordLengths[count] = len[i];
				values[count] = i;
			}
			if(z != len[i]) {
				var y = len[i];
				while(y > z) {
					available[y] = res + (1 << 32 - y);
					--y;
				}
			}
		}
		return true;
	}
	,computeSortedHuffman: function(lengths,values) {
		if(!this.sparse) {
			var k = 0;
			var _g = 0;
			var _g1 = this.entries;
			while(_g < _g1) {
				var i = _g++;
				var len = lengths[i];
				if(this.sparse ? true : len == 255 ? false : len > 10) {
					var n = this.codewords[i];
					n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
					n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
					n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
					n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
					this.sortedCodewords[k++] = n >>> 16 | n << 16;
				}
			}
		} else {
			var _g = 0;
			var _g1 = this.sortedEntries;
			while(_g < _g1) {
				var i = _g++;
				var n = this.codewords[i];
				n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
				n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
				n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
				n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
				this.sortedCodewords[i] = n >>> 16 | n << 16;
			}
		}
		this.sortedCodewords[this.sortedEntries] = -1;
		this.sortedCodewords.sort(kha_audio2_ogg_vorbis_VorbisTools.uintAsc);
		var _g = 0;
		var _g1 = this.sparse ? this.sortedEntries : this.entries;
		while(_g < _g1) {
			var i = _g++;
			var huffLen = this.sparse ? lengths[values[i]] : lengths[i];
			if(this.sparse ? true : huffLen == 255 ? false : huffLen > 10) {
				var n = this.codewords[i];
				n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
				n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
				n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
				n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
				var code = n >>> 16 | n << 16;
				var x = 0;
				var n1 = this.sortedEntries;
				while(n1 > 1) {
					var m = x + (n1 >> 1);
					if(UInt.gte(code,this.sortedCodewords[m])) {
						x = m;
						n1 -= n1 >> 1;
					} else {
						n1 >>= 1;
					}
				}
				if(this.sparse) {
					this.sortedValues[x] = values[i];
					this.codewordLengths[x] = huffLen;
				} else {
					this.sortedValues[x] = i;
				}
			}
		}
	}
	,computeAcceleratedHuffman: function() {
		this.fastHuffman = new Array(1024);
		this.fastHuffman[0] = -1;
		var _g = 0;
		while(_g < 1024) this.fastHuffman[_g++] = -1;
		var _g = 0;
		var _g1 = this.sparse ? this.sortedEntries : this.entries;
		while(_g < _g1) {
			var i = _g++;
			if(this.codewordLengths[i] <= 10) {
				var z;
				if(this.sparse) {
					var n = this.sortedCodewords[i];
					n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
					n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
					n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
					n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
					z = n >>> 16 | n << 16;
				} else {
					z = this.codewords[i];
				}
				while(z < 1024) {
					this.fastHuffman[z] = i;
					z += 1 << this.codewordLengths[i];
				}
			}
		}
	}
	,codebookDecode: function(decodeState,output,offset,len) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		var z = val;
		var lookupValues = this.lookupValues;
		var sequenceP = this.sequenceP;
		var multiplicands = this.multiplicands;
		var minimumValue = this.minimumValue;
		if(z < 0) {
			return false;
		}
		if(len > this.dimensions) {
			len = this.dimensions;
		}
		if(this.lookupType == 1) {
			var div = 1;
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var val = multiplicands[UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0] + last;
				output[offset + _g++] += val;
				if(sequenceP) {
					last = val + minimumValue;
				}
				div = div * lookupValues;
			}
			return true;
		}
		z *= this.dimensions;
		if(sequenceP) {
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var val = multiplicands[z + i] + last;
				output[offset + i] += val;
				last = val + minimumValue;
			}
		} else {
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				output[offset + i] += multiplicands[z + i];
			}
		}
		return true;
	}
	,codebookDecodeStep: function(decodeState,output,offset,len,step) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		var z = val;
		var last = 0.0;
		if(z < 0) {
			return false;
		}
		if(len > this.dimensions) {
			len = this.dimensions;
		}
		var lookupValues = this.lookupValues;
		var sequenceP = this.sequenceP;
		var multiplicands = this.multiplicands;
		if(this.lookupType == 1) {
			var div = 1;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var val = multiplicands[UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0] + last;
				output[offset + _g++ * step] += val;
				if(sequenceP) {
					last = val;
				}
				div = div * lookupValues;
			}
			return true;
		}
		z *= this.dimensions;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			var val = multiplicands[z + i] + last;
			output[offset + i * step] += val;
			if(sequenceP) {
				last = val;
			}
		}
		return true;
	}
	,decodeDeinterleaveRepeat: function(decodeState,residueBuffers,ch,cInter,pInter,len,totalDecode) {
		var effective = this.dimensions;
		if(this.lookupType == 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 488, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "decodeDeinterleaveRepeat"}));
		}
		var multiplicands = this.multiplicands;
		var sequenceP = this.sequenceP;
		var lookupValues = this.lookupValues;
		while(totalDecode > 0) {
			var last = 0.0;
			if(decodeState.validBits < 10) {
				decodeState.prepHuffman();
			}
			var i = this.fastHuffman[decodeState.acc & 1023];
			var val;
			if(i >= 0) {
				var l = this.codewordLengths[i];
				decodeState.acc = decodeState.acc >>> l;
				decodeState.validBits -= l;
				if(decodeState.validBits < 0) {
					decodeState.validBits = 0;
					val = -1;
				} else {
					val = i;
				}
			} else {
				val = decodeState.decodeScalarRaw(this);
			}
			if(this.sparse) {
				val = this.sortedValues[val];
			}
			var z = val;
			if(z < 0) {
				if(decodeState.bytesInSeg == 0 && decodeState.lastSeg) {
					return null;
				}
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 503, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "decodeDeinterleaveRepeat"}));
			}
			if(cInter + pInter * ch + effective > len * ch) {
				effective = len * ch - (pInter * ch - cInter);
			}
			if(this.lookupType == 1) {
				var div = 1;
				if(sequenceP) {
					var _g = 0;
					var _g1 = effective;
					while(_g < _g1) {
						++_g;
						var val1 = multiplicands[UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0] + last;
						residueBuffers[cInter][pInter] += val1;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						last = val1;
						div = div * lookupValues;
					}
				} else {
					var _g2 = 0;
					var _g3 = effective;
					while(_g2 < _g3) {
						++_g2;
						residueBuffers[cInter][pInter] += multiplicands[UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0];
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						div = div * lookupValues;
					}
				}
			} else {
				z *= this.dimensions;
				if(sequenceP) {
					var _g4 = 0;
					var _g5 = effective;
					while(_g4 < _g5) {
						var val2 = multiplicands[z + _g4++] + last;
						residueBuffers[cInter][pInter] += val2;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						last = val2;
					}
				} else {
					var _g6 = 0;
					var _g7 = effective;
					while(_g6 < _g7) {
						residueBuffers[cInter][pInter] += multiplicands[z + _g6++];
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
					}
				}
			}
			totalDecode -= effective;
		}
		return { cInter : cInter, pInter : pInter};
	}
	,residueDecode: function(decodeState,target,offset,n,rtype) {
		if(rtype == 0) {
			var step = n / this.dimensions | 0;
			var _g = 0;
			while(_g < step) {
				var k = _g++;
				if(!this.codebookDecodeStep(decodeState,target,offset + k,n - offset - k,step)) {
					return false;
				}
			}
		} else {
			var k = 0;
			while(k < n) {
				if(!this.codebookDecode(decodeState,target,offset,n - k)) {
					return false;
				}
				k += this.dimensions;
				offset += this.dimensions;
			}
		}
		return true;
	}
	,__class__: kha_audio2_ogg_vorbis_data_Codebook
};
var kha_audio2_ogg_vorbis_data_Comment = function() {
	this.data = new haxe_ds_StringMap();
};
$hxClasses["kha.audio2.ogg.vorbis.data.Comment"] = kha_audio2_ogg_vorbis_data_Comment;
kha_audio2_ogg_vorbis_data_Comment.__name__ = true;
kha_audio2_ogg_vorbis_data_Comment.prototype = {
	data: null
	,get_loopStart: function() {
		return Std.parseInt(this.getString("loopstart"));
	}
	,get_loopLength: function() {
		return Std.parseInt(this.getString("looplength"));
	}
	,add: function(key,value) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			this.data.h[key].push(value);
		} else {
			this.data.h[key] = [value];
		}
	}
	,getString: function(key) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			return this.data.h[key][0];
		} else {
			return null;
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Comment
};
var kha_audio2_ogg_vorbis_data_Floor = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor"] = kha_audio2_ogg_vorbis_data_Floor;
kha_audio2_ogg_vorbis_data_Floor.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor.read = function(decodeState,codebooks) {
	var floor = new kha_audio2_ogg_vorbis_data_Floor();
	floor.type = decodeState.readBits(16);
	if(floor.type > 1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 28, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
	}
	if(floor.type == 0) {
		var g = floor.floor0 = new kha_audio2_ogg_vorbis_data_Floor0();
		g.order = decodeState.readBits(8);
		g.rate = decodeState.readBits(16);
		g.barkMapSize = decodeState.readBits(16);
		g.amplitudeBits = decodeState.readBits(6);
		g.amplitudeOffset = decodeState.readBits(8);
		g.numberOfBooks = decodeState.readBits(4) + 1;
		var _g = 0;
		var _g1 = g.numberOfBooks;
		while(_g < _g1) g.bookList[_g++] = decodeState.readBits(8);
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.FEATURE_NOT_SUPPORTED,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 41, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
	} else {
		var p = [];
		var g = floor.floor1 = new kha_audio2_ogg_vorbis_data_Floor1();
		var maxClass = -1;
		g.partitions = decodeState.readBits(5);
		g.partitionClassList = new Array(g.partitions);
		var _g = 0;
		var _g1 = g.partitions;
		while(_g < _g1) {
			var j = _g++;
			g.partitionClassList[j] = decodeState.readBits(4);
			if(g.partitionClassList[j] > maxClass) {
				maxClass = g.partitionClassList[j];
			}
		}
		g.classDimensions = new Array(maxClass + 1);
		g.classMasterbooks = new Array(maxClass + 1);
		g.classSubclasses = new Array(maxClass + 1);
		g.subclassBooks = new Array(maxClass + 1);
		var _g = 0;
		var _g1 = maxClass + 1;
		while(_g < _g1) {
			var j = _g++;
			g.classDimensions[j] = decodeState.readBits(3) + 1;
			g.classSubclasses[j] = decodeState.readBits(2);
			if(g.classSubclasses[j] != 0) {
				g.classMasterbooks[j] = decodeState.readBits(8);
				if(g.classMasterbooks[j] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 64, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
				}
			}
			var kl = 1 << g.classSubclasses[j];
			g.subclassBooks[j] = new Array(kl);
			var _g2 = 0;
			while(_g2 < kl) {
				var k = _g2++;
				g.subclassBooks[j][k] = decodeState.readBits(8) - 1;
				if(g.subclassBooks[j][k] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 73, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
				}
			}
		}
		g.floor1Multiplier = decodeState.readBits(2) + 1;
		g.rangebits = decodeState.readBits(4);
		g.xlist = new Array(250);
		g.xlist[0] = 0;
		g.xlist[1] = 1 << g.rangebits;
		g.values = 2;
		var _g = 0;
		var _g1 = g.partitions;
		while(_g < _g1) {
			var _g2 = 0;
			var _g3 = g.classDimensions[g.partitionClassList[_g++]];
			while(_g2 < _g3) {
				++_g2;
				g.xlist[g.values] = decodeState.readBits(g.rangebits);
				g.values++;
			}
		}
		var _g = 0;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			p.push(new kha_audio2_ogg_vorbis_data_IntPoint());
			p[j].x = g.xlist[j];
			p[j].y = j;
		}
		p.sort(kha_audio2_ogg_vorbis_VorbisTools.pointCompare);
		g.sortedOrder = new Array(g.values);
		var _g = 0;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			g.sortedOrder[j] = p[j].y;
		}
		g.neighbors = new Array(g.values);
		var _g = 2;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			var x = g.xlist;
			var low = -1;
			var high = 65536;
			var plow = 0;
			var phigh = 0;
			var _g2 = 0;
			while(_g2 < j) {
				var i = _g2++;
				if(x[i] > low && x[i] < x[j]) {
					plow = i;
					low = x[i];
				}
				if(x[i] < high && x[i] > x[j]) {
					phigh = i;
					high = x[i];
				}
			}
			g.neighbors[j] = new Array(g.values);
			g.neighbors[j][0] = plow;
			g.neighbors[j][1] = phigh;
		}
	}
	return floor;
};
kha_audio2_ogg_vorbis_data_Floor.prototype = {
	floor0: null
	,floor1: null
	,type: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor
};
var kha_audio2_ogg_vorbis_data_Floor0 = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor0"] = kha_audio2_ogg_vorbis_data_Floor0;
kha_audio2_ogg_vorbis_data_Floor0.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor0.prototype = {
	order: null
	,rate: null
	,barkMapSize: null
	,amplitudeBits: null
	,amplitudeOffset: null
	,numberOfBooks: null
	,bookList: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor0
};
var kha_audio2_ogg_vorbis_data_Floor1 = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor1"] = kha_audio2_ogg_vorbis_data_Floor1;
kha_audio2_ogg_vorbis_data_Floor1.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor1.prototype = {
	partitions: null
	,partitionClassList: null
	,classDimensions: null
	,classSubclasses: null
	,classMasterbooks: null
	,subclassBooks: null
	,xlist: null
	,sortedOrder: null
	,neighbors: null
	,floor1Multiplier: null
	,rangebits: null
	,values: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor1
};
var kha_audio2_ogg_vorbis_data_Header = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Header"] = kha_audio2_ogg_vorbis_data_Header;
kha_audio2_ogg_vorbis_data_Header.__name__ = true;
kha_audio2_ogg_vorbis_data_Header.read = function(decodeState) {
	var page = decodeState.page;
	page.start(decodeState);
	if((page.flag & 2) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"not firstPage",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 46, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if((page.flag & 4) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"lastPage",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 49, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if((page.flag & 1) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"continuedPacket",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 52, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.firstPageValidate();
	decodeState.inputPosition += 1;
	if(decodeState.input.readByte() != 1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"decodeState head",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 57, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header = new haxe_io_Bytes(new ArrayBuffer(6));
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[0] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[1] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[2] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[3] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[4] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[5] = x;
	if(header.toString() != "vorbis") {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
	}
	decodeState.inputPosition += 4;
	var version = decodeState.input.readInt32();
	if(version != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"vorbis version : " + version,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 66, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header = new kha_audio2_ogg_vorbis_data_Header();
	decodeState.inputPosition += 1;
	header.channel = decodeState.input.readByte();
	if(header.channel == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"no channel",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 73, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	} else if(header.channel > 16) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.TOO_MANY_CHANNELS,"too many channels",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 75, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 4;
	header.sampleRate = decodeState.input.readInt32();
	if(header.sampleRate == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"no sampling rate",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 80, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 4;
	header.maximumBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 4;
	header.nominalBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 4;
	header.minimumBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 1;
	var x = decodeState.input.readByte();
	var log0 = x & 15;
	var log1 = x >> 4;
	header.blocksize0 = 1 << log0;
	header.blocksize1 = 1 << log1;
	if(log0 < 6 || log0 > 13) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 93, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if(log1 < 6 || log1 > 13) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 96, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if(log0 > log1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 99, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 1;
	var x = decodeState.input.readByte();
	if((x & 1) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 105, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.page.start(decodeState);
	decodeState.startPacket();
	var len = 0;
	var output = new haxe_io_BytesOutput();
	while(true) {
		len = decodeState.next();
		if(!(len != 0)) {
			break;
		}
		decodeState.inputPosition += len;
		output.write(decodeState.input.read(len));
		decodeState.bytesInSeg = 0;
	}
	var packetInput = new haxe_io_BytesInput(output.getBytes());
	packetInput.readByte();
	packetInput.read(6);
	header.vendor = packetInput.readString(packetInput.readInt32());
	header.comment = new kha_audio2_ogg_vorbis_data_Comment();
	var commentCount = packetInput.readInt32();
	var _g = 0;
	while(_g < commentCount) {
		++_g;
		var str = packetInput.readString(packetInput.readInt32());
		var splitter = str.indexOf("=");
		if(splitter != -1) {
			header.comment.add(str.substring(0,splitter),str.substring(splitter + 1));
		}
	}
	if((packetInput.readByte() & 1) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 141, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.startPacket();
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	if(x1 != 5) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"setup packet",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 149, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header1 = new haxe_io_Bytes(new ArrayBuffer(6));
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[0] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[1] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[2] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[3] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[4] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[5] = x1;
	if(header1.toString() != "vorbis") {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
	}
	var codebookCount = decodeState.readBits(8) + 1;
	header.codebooks = new Array(codebookCount);
	var _g = 0;
	while(_g < codebookCount) header.codebooks[_g++] = kha_audio2_ogg_vorbis_data_Codebook.read(decodeState);
	x = decodeState.readBits(6) + 1;
	var _g = 0;
	var _g1 = x;
	while(_g < _g1) {
		++_g;
		if(decodeState.readBits(16) != 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 165, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
		}
	}
	var floorCount = decodeState.readBits(6) + 1;
	header.floorConfig = new Array(floorCount);
	var _g = 0;
	while(_g < floorCount) header.floorConfig[_g++] = kha_audio2_ogg_vorbis_data_Floor.read(decodeState,header.codebooks);
	var residueCount = decodeState.readBits(6) + 1;
	header.residueConfig = new Array(residueCount);
	var _g = 0;
	while(_g < residueCount) header.residueConfig[_g++] = kha_audio2_ogg_vorbis_data_Residue.read(decodeState,header.codebooks);
	var mappingCount = decodeState.readBits(6) + 1;
	header.mapping = new Array(mappingCount);
	var _g = 0;
	while(_g < mappingCount) {
		var map = kha_audio2_ogg_vorbis_data_Mapping.read(decodeState,header.channel);
		header.mapping[_g++] = map;
		var _g1 = 0;
		var _g2 = map.submaps;
		while(_g1 < _g2) {
			var j = _g1++;
			if(map.submapFloor[j] >= header.floorConfig.length) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 191, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
			}
			if(map.submapResidue[j] >= header.residueConfig.length) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 194, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
			}
		}
	}
	var modeCount = decodeState.readBits(6) + 1;
	header.modes = new Array(modeCount);
	var _g = 0;
	while(_g < modeCount) {
		var mode = kha_audio2_ogg_vorbis_data_Mode.read(decodeState);
		header.modes[_g++] = mode;
		if(mode.mapping >= header.mapping.length) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 205, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
		}
	}
	while(decodeState.bytesInSeg != 0 || !decodeState.lastSeg && decodeState.next() != 0) {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		decodeState.input.readByte();
	}
	return header;
};
kha_audio2_ogg_vorbis_data_Header.prototype = {
	maximumBitRate: null
	,nominalBitRate: null
	,minimumBitRate: null
	,sampleRate: null
	,channel: null
	,blocksize0: null
	,blocksize1: null
	,codebooks: null
	,floorConfig: null
	,residueConfig: null
	,mapping: null
	,modes: null
	,comment: null
	,vendor: null
	,__class__: kha_audio2_ogg_vorbis_data_Header
};
var kha_audio2_ogg_vorbis_data_IntPoint = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.IntPoint"] = kha_audio2_ogg_vorbis_data_IntPoint;
kha_audio2_ogg_vorbis_data_IntPoint.__name__ = true;
kha_audio2_ogg_vorbis_data_IntPoint.prototype = {
	x: null
	,y: null
	,__class__: kha_audio2_ogg_vorbis_data_IntPoint
};
var kha_audio2_ogg_vorbis_data_Mapping = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Mapping"] = kha_audio2_ogg_vorbis_data_Mapping;
kha_audio2_ogg_vorbis_data_Mapping.__name__ = true;
kha_audio2_ogg_vorbis_data_Mapping.read = function(decodeState,channels) {
	var m = new kha_audio2_ogg_vorbis_data_Mapping();
	var mappingType = decodeState.readBits(16);
	if(mappingType != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"mapping type " + mappingType,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 22, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
	}
	m.chan = new Array(channels);
	var _g = 0;
	while(_g < channels) m.chan[_g++] = new kha_audio2_ogg_vorbis_data_MappingChannel();
	if(decodeState.readBits(1) != 0) {
		m.submaps = decodeState.readBits(4) + 1;
	} else {
		m.submaps = 1;
	}
	if(decodeState.readBits(1) != 0) {
		m.couplingSteps = decodeState.readBits(8) + 1;
		var _g = 0;
		var _g1 = m.couplingSteps;
		while(_g < _g1) {
			var k = _g++;
			var n = channels - 1;
			var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			m.chan[k].magnitude = decodeState.readBits(n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0);
			var n1 = channels - 1;
			var log2_41 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			m.chan[k].angle = decodeState.readBits(n1 < 16384 ? n1 < 16 ? log2_41[n1] : n1 < 512 ? 5 + log2_41[n1 >> 5] : 10 + log2_41[n1 >> 10] : n1 < 16777216 ? n1 < 524288 ? 15 + log2_41[n1 >> 15] : 20 + log2_41[n1 >> 20] : n1 < 536870912 ? 25 + log2_41[n1 >> 25] : n1 < -2147483648 ? 30 + log2_41[n1 >> 30] : 0);
			if(m.chan[k].magnitude >= channels) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 46, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
			if(m.chan[k].angle >= channels) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 49, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
			if(m.chan[k].magnitude == m.chan[k].angle) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 52, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
		}
	} else {
		m.couplingSteps = 0;
	}
	if(decodeState.readBits(2) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 61, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
	}
	if(m.submaps > 1) {
		var _g = 0;
		while(_g < channels) {
			var j = _g++;
			m.chan[j].mux = decodeState.readBits(4);
			if(m.chan[j].mux >= m.submaps) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 67, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
		}
	} else {
		var _g = 0;
		while(_g < channels) m.chan[_g++].mux = 0;
	}
	m.submapFloor = new Array(m.submaps);
	m.submapResidue = new Array(m.submaps);
	var _g = 0;
	var _g1 = m.submaps;
	while(_g < _g1) {
		var j = _g++;
		decodeState.readBits(8);
		m.submapFloor[j] = decodeState.readBits(8);
		m.submapResidue[j] = decodeState.readBits(8);
	}
	return m;
};
kha_audio2_ogg_vorbis_data_Mapping.prototype = {
	couplingSteps: null
	,chan: null
	,submaps: null
	,submapFloor: null
	,submapResidue: null
	,doFloor: function(floors,i,n,target,finalY,step2Flag) {
		var n2 = n >> 1;
		var floor = floors[this.submapFloor[this.chan[i].mux]];
		if(floor.type == 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 94, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "doFloor"}));
		} else {
			var g = floor.floor1;
			var lx = 0;
			var ly = finalY[0] * g.floor1Multiplier;
			var _g = 1;
			var _g1 = g.values;
			while(_g < _g1) {
				var j = g.sortedOrder[_g++];
				if(finalY[j] >= 0) {
					var hy = finalY[j] * g.floor1Multiplier;
					var hx = g.xlist[j];
					kha_audio2_ogg_vorbis_VorbisTools.drawLine(target,lx,ly,hx,hy,n2);
					lx = hx;
					ly = hy;
				}
			}
			if(lx < n2) {
				var _g = lx;
				while(_g < n2) target[_g++] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[ly];
			}
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Mapping
};
var kha_audio2_ogg_vorbis_data_MappingChannel = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.MappingChannel"] = kha_audio2_ogg_vorbis_data_MappingChannel;
kha_audio2_ogg_vorbis_data_MappingChannel.__name__ = true;
kha_audio2_ogg_vorbis_data_MappingChannel.prototype = {
	magnitude: null
	,angle: null
	,mux: null
	,__class__: kha_audio2_ogg_vorbis_data_MappingChannel
};
var kha_audio2_ogg_vorbis_data_Mode = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Mode"] = kha_audio2_ogg_vorbis_data_Mode;
kha_audio2_ogg_vorbis_data_Mode.__name__ = true;
kha_audio2_ogg_vorbis_data_Mode.read = function(decodeState) {
	var m = new kha_audio2_ogg_vorbis_data_Mode();
	m.blockflag = decodeState.readBits(1) != 0;
	m.windowtype = decodeState.readBits(16);
	m.transformtype = decodeState.readBits(16);
	m.mapping = decodeState.readBits(8);
	if(m.windowtype != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mode.hx", lineNumber : 22, className : "kha.audio2.ogg.vorbis.data.Mode", methodName : "read"}));
	}
	if(m.transformtype != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mode.hx", lineNumber : 25, className : "kha.audio2.ogg.vorbis.data.Mode", methodName : "read"}));
	}
	return m;
};
kha_audio2_ogg_vorbis_data_Mode.prototype = {
	blockflag: null
	,mapping: null
	,windowtype: null
	,transformtype: null
	,__class__: kha_audio2_ogg_vorbis_data_Mode
};
var kha_audio2_ogg_vorbis_data_Page = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Page"] = kha_audio2_ogg_vorbis_data_Page;
kha_audio2_ogg_vorbis_data_Page.__name__ = true;
kha_audio2_ogg_vorbis_data_Page.prototype = {
	flag: null
	,clone: function() {
		var page = new kha_audio2_ogg_vorbis_data_Page();
		page.flag = this.flag;
		return page;
	}
	,start: function(decodeState) {
		var tmp;
		var tmp1;
		var tmp2;
		decodeState.inputPosition += 1;
		if(decodeState.input.readByte() == 79) {
			decodeState.inputPosition += 1;
			tmp2 = decodeState.input.readByte() != 103;
		} else {
			tmp2 = true;
		}
		if(!tmp2) {
			decodeState.inputPosition += 1;
			tmp1 = decodeState.input.readByte() != 103;
		} else {
			tmp1 = true;
		}
		if(!tmp1) {
			decodeState.inputPosition += 1;
			tmp = decodeState.input.readByte() != 83;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 324, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "capturePattern"}));
		}
		this.startWithoutCapturePattern(decodeState);
	}
	,startWithoutCapturePattern: function(decodeState) {
		decodeState.inputPosition += 1;
		var version = decodeState.input.readByte();
		if(version != 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM_STRUCTURE_VERSION,"" + version,{ fileName : "kha/audio2/ogg/vorbis/data/Page.hx", lineNumber : 34, className : "kha.audio2.ogg.vorbis.data.Page", methodName : "startWithoutCapturePattern"}));
		}
		decodeState.inputPosition += 1;
		this.flag = decodeState.input.readByte();
		decodeState.inputPosition += 4;
		var loc0 = decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		var loc1 = decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.setup(loc0,loc1);
	}
	,__class__: kha_audio2_ogg_vorbis_data_Page
};
var kha_audio2_ogg_vorbis_data_ProbedPage = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.ProbedPage"] = kha_audio2_ogg_vorbis_data_ProbedPage;
kha_audio2_ogg_vorbis_data_ProbedPage.__name__ = true;
kha_audio2_ogg_vorbis_data_ProbedPage.prototype = {
	pageStart: null
	,pageEnd: null
	,afterPreviousPageStart: null
	,firstDecodedSample: null
	,lastDecodedSample: null
	,__class__: kha_audio2_ogg_vorbis_data_ProbedPage
};
var kha_audio2_ogg_vorbis_data_ReaderError = function(type,message,posInfos) {
	if(message == null) {
		message = "";
	}
	this.type = type;
	this.message = message;
	this.posInfos = posInfos;
};
$hxClasses["kha.audio2.ogg.vorbis.data.ReaderError"] = kha_audio2_ogg_vorbis_data_ReaderError;
kha_audio2_ogg_vorbis_data_ReaderError.__name__ = true;
kha_audio2_ogg_vorbis_data_ReaderError.prototype = {
	type: null
	,message: null
	,posInfos: null
	,__class__: kha_audio2_ogg_vorbis_data_ReaderError
};
var kha_audio2_ogg_vorbis_data_ReaderErrorType = $hxEnums["kha.audio2.ogg.vorbis.data.ReaderErrorType"] = { __ename__:true,__constructs__:null
	,NEED_MORE_DATA: {_hx_name:"NEED_MORE_DATA",_hx_index:0,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_API_MIXING: {_hx_name:"INVALID_API_MIXING",_hx_index:1,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,OUTOFMEM: {_hx_name:"OUTOFMEM",_hx_index:2,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,FEATURE_NOT_SUPPORTED: {_hx_name:"FEATURE_NOT_SUPPORTED",_hx_index:3,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,TOO_MANY_CHANNELS: {_hx_name:"TOO_MANY_CHANNELS",_hx_index:4,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,FILE_OPEN_FAILURE: {_hx_name:"FILE_OPEN_FAILURE",_hx_index:5,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_WITHOUT_LENGTH: {_hx_name:"SEEK_WITHOUT_LENGTH",_hx_index:6,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,UNEXPECTED_EOF: {_hx_name:"UNEXPECTED_EOF",_hx_index:7,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_INVALID: {_hx_name:"SEEK_INVALID",_hx_index:8,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_SETUP: {_hx_name:"INVALID_SETUP",_hx_index:9,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_STREAM: {_hx_name:"INVALID_STREAM",_hx_index:10,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,MISSING_CAPTURE_PATTERN: {_hx_name:"MISSING_CAPTURE_PATTERN",_hx_index:11,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_STREAM_STRUCTURE_VERSION: {_hx_name:"INVALID_STREAM_STRUCTURE_VERSION",_hx_index:12,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,CONTINUED_PACKET_FLAG_INVALID: {_hx_name:"CONTINUED_PACKET_FLAG_INVALID",_hx_index:13,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INCORRECT_STREAM_SERIAL_NUMBER: {_hx_name:"INCORRECT_STREAM_SERIAL_NUMBER",_hx_index:14,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_FIRST_PAGE: {_hx_name:"INVALID_FIRST_PAGE",_hx_index:15,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,BAD_PACKET_TYPE: {_hx_name:"BAD_PACKET_TYPE",_hx_index:16,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,CANT_FIND_LAST_PAGE: {_hx_name:"CANT_FIND_LAST_PAGE",_hx_index:17,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_FAILED: {_hx_name:"SEEK_FAILED",_hx_index:18,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,OTHER: {_hx_name:"OTHER",_hx_index:19,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
};
kha_audio2_ogg_vorbis_data_ReaderErrorType.__constructs__ = [kha_audio2_ogg_vorbis_data_ReaderErrorType.NEED_MORE_DATA,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_API_MIXING,kha_audio2_ogg_vorbis_data_ReaderErrorType.OUTOFMEM,kha_audio2_ogg_vorbis_data_ReaderErrorType.FEATURE_NOT_SUPPORTED,kha_audio2_ogg_vorbis_data_ReaderErrorType.TOO_MANY_CHANNELS,kha_audio2_ogg_vorbis_data_ReaderErrorType.FILE_OPEN_FAILURE,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_WITHOUT_LENGTH,kha_audio2_ogg_vorbis_data_ReaderErrorType.UNEXPECTED_EOF,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_INVALID,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM_STRUCTURE_VERSION,kha_audio2_ogg_vorbis_data_ReaderErrorType.CONTINUED_PACKET_FLAG_INVALID,kha_audio2_ogg_vorbis_data_ReaderErrorType.INCORRECT_STREAM_SERIAL_NUMBER,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,kha_audio2_ogg_vorbis_data_ReaderErrorType.BAD_PACKET_TYPE,kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,kha_audio2_ogg_vorbis_data_ReaderErrorType.OTHER];
var kha_audio2_ogg_vorbis_data_Residue = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Residue"] = kha_audio2_ogg_vorbis_data_Residue;
kha_audio2_ogg_vorbis_data_Residue.__name__ = true;
kha_audio2_ogg_vorbis_data_Residue.read = function(decodeState,codebooks) {
	var r = new kha_audio2_ogg_vorbis_data_Residue();
	r.type = decodeState.readBits(16);
	if(r.type > 2) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Residue.hx", lineNumber : 29, className : "kha.audio2.ogg.vorbis.data.Residue", methodName : "read"}));
	}
	var residueCascade = new Array(64);
	r.begin = decodeState.readBits(24);
	r.end = decodeState.readBits(24);
	r.partSize = decodeState.readBits(24) + 1;
	var classifications = r.classifications = decodeState.readBits(6) + 1;
	r.classbook = decodeState.readBits(8);
	var _g = 0;
	var _g1 = r.classifications;
	while(_g < _g1) {
		var j = _g++;
		var highBits = 0;
		var lowBits = decodeState.readBits(3);
		if(decodeState.readBits(1) != 0) {
			highBits = decodeState.readBits(5);
		}
		residueCascade[j] = highBits * 8 + lowBits;
	}
	r.residueBooks = new Array(r.classifications);
	var _g = 0;
	var _g1 = r.classifications;
	while(_g < _g1) {
		var j = _g++;
		r.residueBooks[j] = new Array(8);
		var _g2 = 0;
		while(_g2 < 8) {
			var k = _g2++;
			if((residueCascade[j] & 1 << k) != 0) {
				r.residueBooks[j][k] = decodeState.readBits(8);
				if(r.residueBooks[j][k] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Residue.hx", lineNumber : 55, className : "kha.audio2.ogg.vorbis.data.Residue", methodName : "read"}));
				}
			} else {
				r.residueBooks[j][k] = -1;
			}
		}
	}
	var el = codebooks[r.classbook].entries;
	var classwords = codebooks[r.classbook].dimensions;
	r.classdata = new Array(el);
	var _g = 0;
	while(_g < el) {
		var j = _g++;
		var temp = j;
		var k = classwords;
		var cd = r.classdata[j] = new Array(classwords);
		while(--k >= 0) {
			cd[k] = temp % classifications;
			temp = temp / classifications | 0;
		}
	}
	return r;
};
kha_audio2_ogg_vorbis_data_Residue.prototype = {
	begin: null
	,end: null
	,partSize: null
	,classifications: null
	,classbook: null
	,classdata: null
	,residueBooks: null
	,type: null
	,decode: function(decodeState,header,residueBuffers,ch,n,doNotDecode,channelBuffers) {
		var codebooks = header.codebooks;
		var classwords = codebooks[this.classbook].dimensions;
		var partSize = this.partSize;
		var partRead = UInt.toFloat(this.end - this.begin) / UInt.toFloat(partSize) | 0;
		var classifications = new Array(header.channel * partRead + 1);
		var _g = 0;
		while(_g < ch) {
			var i = _g++;
			if(!doNotDecode[i]) {
				var buffer = residueBuffers[i];
				var _g1 = 0;
				var _g2 = buffer.length;
				while(_g1 < _g2) buffer[_g1++] = 0;
			}
		}
		if(this.type == 2 && ch != 1) {
			var _g = 0;
			while(_g < ch) {
				var j = _g++;
				if(!doNotDecode[j]) {
					break;
				} else if(j == ch - 1) {
					return;
				}
			}
			var _g = 0;
			while(_g < 8) {
				var pass = _g++;
				var pcount = 0;
				if(ch == 2) {
					while(pcount < partRead) {
						var z = this.begin + pcount * partSize;
						var cInter = z & 1;
						var pInter = z >>> 1;
						if(pass == 0) {
							var c = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i = c.fastHuffman[decodeState.acc & 1023];
							var val;
							if(i >= 0) {
								var l = c.codewordLengths[i];
								decodeState.acc = decodeState.acc >>> l;
								decodeState.validBits -= l;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val = -1;
								} else {
									val = i;
								}
							} else {
								val = decodeState.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							var q = val;
							if(q == -1) {
								return;
							}
							var i1 = classwords;
							while(--i1 >= 0) {
								classifications[i1 + pcount] = q % this.classifications;
								q = q / this.classifications | 0;
							}
						}
						var _g1 = 0;
						while(_g1 < classwords) {
							++_g1;
							if(pcount >= partRead) {
								break;
							}
							var z1 = this.begin + pcount * partSize;
							var b = this.residueBooks[classifications[pcount]][pass];
							if(b >= 0) {
								var result = codebooks[b].decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter,pInter,n,partSize);
								if(result == null) {
									return;
								} else {
									cInter = result.cInter;
									pInter = result.pInter;
								}
							} else {
								z1 = z1 + partSize;
								cInter = z1 & 1;
								pInter = z1 >>> 1;
							}
							++pcount;
						}
					}
				} else if(ch == 1) {
					while(pcount < partRead) {
						var cInter1 = 0;
						var pInter1 = this.begin + pcount * partSize;
						if(pass == 0) {
							var c1 = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i2 = c1.fastHuffman[decodeState.acc & 1023];
							var val1;
							if(i2 >= 0) {
								var l1 = c1.codewordLengths[i2];
								decodeState.acc = decodeState.acc >>> l1;
								decodeState.validBits -= l1;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val1 = -1;
								} else {
									val1 = i2;
								}
							} else {
								val1 = decodeState.decodeScalarRaw(c1);
							}
							if(c1.sparse) {
								val1 = c1.sortedValues[val1];
							}
							var q1 = val1;
							if(q1 == -1) {
								return;
							}
							var i3 = classwords;
							while(--i3 >= 0) {
								classifications[i3 + pcount] = q1 % this.classifications;
								q1 = q1 / this.classifications | 0;
							}
						}
						var _g2 = 0;
						while(_g2 < classwords) {
							++_g2;
							if(pcount >= partRead) {
								break;
							}
							var z2 = this.begin + pcount * partSize;
							var b1 = this.residueBooks[classifications[pcount]][pass];
							if(b1 >= 0) {
								var result1 = codebooks[b1].decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter1,pInter1,n,partSize);
								if(result1 == null) {
									return;
								} else {
									cInter1 = result1.cInter;
									pInter1 = result1.pInter;
								}
							} else {
								z2 = z2 + partSize;
								cInter1 = 0;
								pInter1 = z2;
							}
							++pcount;
						}
					}
				} else {
					while(pcount < partRead) {
						var z3 = this.begin + pcount * partSize;
						var cInter2 = UInt.toFloat(z3) % UInt.toFloat(ch) | 0;
						var pInter2 = UInt.toFloat(z3) / UInt.toFloat(ch) | 0;
						if(pass == 0) {
							var c2 = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i4 = c2.fastHuffman[decodeState.acc & 1023];
							var val2;
							if(i4 >= 0) {
								var l2 = c2.codewordLengths[i4];
								decodeState.acc = decodeState.acc >>> l2;
								decodeState.validBits -= l2;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val2 = -1;
								} else {
									val2 = i4;
								}
							} else {
								val2 = decodeState.decodeScalarRaw(c2);
							}
							if(c2.sparse) {
								val2 = c2.sortedValues[val2];
							}
							var q2 = val2;
							if(q2 == -1) {
								return;
							}
							var i5 = classwords;
							while(--i5 >= 0) {
								classifications[i5 + pcount] = q2 % this.classifications;
								q2 = q2 / this.classifications | 0;
							}
						}
						var _g3 = 0;
						while(_g3 < classwords) {
							++_g3;
							if(pcount >= partRead) {
								break;
							}
							var z4 = this.begin + pcount * partSize;
							var b2 = this.residueBooks[classifications[pcount]][pass];
							if(b2 >= 0) {
								var result2 = codebooks[b2].decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter2,pInter2,n,partSize);
								if(result2 == null) {
									return;
								} else {
									cInter2 = result2.cInter;
									pInter2 = result2.pInter;
								}
							} else {
								z4 = z4 + partSize;
								cInter2 = UInt.toFloat(z4) % UInt.toFloat(ch) | 0;
								pInter2 = UInt.toFloat(z4) / UInt.toFloat(ch) | 0;
							}
							++pcount;
						}
					}
				}
			}
			return;
		}
		var _g = 0;
		while(_g < 8) {
			var pass = _g++;
			var pcount = 0;
			while(pcount < partRead) {
				if(pass == 0) {
					var _g1 = 0;
					while(_g1 < ch) {
						var j = _g1++;
						if(!doNotDecode[j]) {
							var c = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i = c.fastHuffman[decodeState.acc & 1023];
							var val;
							if(i >= 0) {
								var l = c.codewordLengths[i];
								decodeState.acc = decodeState.acc >>> l;
								decodeState.validBits -= l;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val = -1;
								} else {
									val = i;
								}
							} else {
								val = decodeState.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							var temp = val;
							if(temp == -1) {
								return;
							}
							var i1 = classwords;
							while(--i1 >= 0) {
								classifications[j * partRead + i1 + pcount] = temp % this.classifications;
								temp = temp / this.classifications | 0;
							}
						}
					}
				}
				var _g2 = 0;
				while(_g2 < classwords) {
					++_g2;
					if(pcount >= partRead) {
						break;
					}
					var _g3 = 0;
					while(_g3 < ch) {
						var j1 = _g3++;
						if(!doNotDecode[j1]) {
							var b = this.residueBooks[classifications[j1 * partRead + pcount]][pass];
							if(b >= 0) {
								if(!codebooks[b].residueDecode(decodeState,residueBuffers[j1],this.begin + pcount * partSize,partSize,this.type)) {
									return;
								}
							}
						}
					}
					++pcount;
				}
			}
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Residue
};
var kha_graphics1_Graphics = function() { };
$hxClasses["kha.graphics1.Graphics"] = kha_graphics1_Graphics;
kha_graphics1_Graphics.__name__ = true;
kha_graphics1_Graphics.__isInterface__ = true;
var kha_graphics2_Graphics = function() {
	this.transformations = [new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1)];
	this.transformationIndex = 0;
	this.opacities = [1];
	this.myFontSize = 12;
	this.pipe = null;
};
$hxClasses["kha.graphics2.Graphics"] = kha_graphics2_Graphics;
kha_graphics2_Graphics.__name__ = true;
kha_graphics2_Graphics.prototype = {
	begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
	}
	,end: function() {
	}
	,drawImage: function(img,x,y) {
		this.drawSubImage(img,x,y,0,0,img.get_width(),img.get_height());
	}
	,drawSubImage: function(img,x,y,sx,sy,sw,sh) {
		this.drawScaledSubImage(img,sx,sy,sw,sh,x,y,sw,sh);
	}
	,drawScaledSubImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
	}
	,drawString: function(text,x,y) {
	}
	,set_color: function(color) {
		return -16777216;
	}
	,set_font: function(font) {
		return null;
	}
	,get_fontSize: function() {
		return this.myFontSize;
	}
	,set_fontSize: function(value) {
		return this.myFontSize = value;
	}
	,get_opacity: function() {
		return this.opacities[this.opacities.length - 1];
	}
	,pipe: null
	,transformations: null
	,transformationIndex: null
	,opacities: null
	,myFontSize: null
	,__class__: kha_graphics2_Graphics
};
var kha_graphics2_Graphics1 = function(canvas) {
	this.canvas = canvas;
};
$hxClasses["kha.graphics2.Graphics1"] = kha_graphics2_Graphics1;
kha_graphics2_Graphics1.__name__ = true;
kha_graphics2_Graphics1.__interfaces__ = [kha_graphics1_Graphics];
kha_graphics2_Graphics1.prototype = {
	canvas: null
	,__class__: kha_graphics2_Graphics1
};
var kha_graphics2_truetype_VectorOfIntPointer = function() {
};
$hxClasses["kha.graphics2.truetype.VectorOfIntPointer"] = kha_graphics2_truetype_VectorOfIntPointer;
kha_graphics2_truetype_VectorOfIntPointer.__name__ = true;
kha_graphics2_truetype_VectorOfIntPointer.prototype = {
	value: null
	,__class__: kha_graphics2_truetype_VectorOfIntPointer
};
var kha_graphics2_truetype_Stbtt_$temp_$rect = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_rect"] = kha_graphics2_truetype_Stbtt_$temp_$rect;
kha_graphics2_truetype_Stbtt_$temp_$rect.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$rect.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$rect
};
var kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_glyph_h_metrics"] = kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics;
kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics.prototype = {
	advanceWidth: null
	,leftSideBearing: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics
};
var kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_font_v_metrics"] = kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics;
kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics.prototype = {
	ascent: null
	,descent: null
	,lineGap: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics
};
var kha_graphics2_truetype_Stbtt_$_$buf = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__buf"] = kha_graphics2_truetype_Stbtt_$_$buf;
kha_graphics2_truetype_Stbtt_$_$buf.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$buf.prototype = {
	data: null
	,cursor: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$buf
};
var kha_graphics2_truetype_Stbtt_$bakedchar = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_bakedchar"] = kha_graphics2_truetype_Stbtt_$bakedchar;
kha_graphics2_truetype_Stbtt_$bakedchar.__name__ = true;
kha_graphics2_truetype_Stbtt_$bakedchar.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,xoff: null
	,yoff: null
	,xadvance: null
	,__class__: kha_graphics2_truetype_Stbtt_$bakedchar
};
var kha_graphics2_truetype_Stbtt_$fontinfo = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_fontinfo"] = kha_graphics2_truetype_Stbtt_$fontinfo;
kha_graphics2_truetype_Stbtt_$fontinfo.__name__ = true;
kha_graphics2_truetype_Stbtt_$fontinfo.prototype = {
	data: null
	,fontstart: null
	,numGlyphs: null
	,loca: null
	,head: null
	,glyf: null
	,hhea: null
	,hmtx: null
	,kern: null
	,gpos: null
	,index_map: null
	,indexToLocFormat: null
	,cff: null
	,charstrings: null
	,gsubrs: null
	,subrs: null
	,fontdicts: null
	,fdselect: null
	,__class__: kha_graphics2_truetype_Stbtt_$fontinfo
};
var kha_graphics2_truetype_Stbtt_$vertex = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_vertex"] = kha_graphics2_truetype_Stbtt_$vertex;
kha_graphics2_truetype_Stbtt_$vertex.__name__ = true;
kha_graphics2_truetype_Stbtt_$vertex.prototype = {
	x: null
	,y: null
	,cx: null
	,cy: null
	,cx1: null
	,cy1: null
	,type: null
	,__class__: kha_graphics2_truetype_Stbtt_$vertex
};
var kha_graphics2_truetype_Stbtt_$_$bitmap = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__bitmap"] = kha_graphics2_truetype_Stbtt_$_$bitmap;
kha_graphics2_truetype_Stbtt_$_$bitmap.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$bitmap.prototype = {
	w: null
	,h: null
	,stride: null
	,pixels: null
	,pixels_offset: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$bitmap
};
var kha_graphics2_truetype_Stbtt_$_$edge = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__edge"] = kha_graphics2_truetype_Stbtt_$_$edge;
kha_graphics2_truetype_Stbtt_$_$edge.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$edge.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,invert: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$edge
};
var kha_graphics2_truetype_Stbtt_$_$active_$edge = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__active_edge"] = kha_graphics2_truetype_Stbtt_$_$active_$edge;
kha_graphics2_truetype_Stbtt_$_$active_$edge.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$active_$edge.prototype = {
	next: null
	,fx: null
	,fdx: null
	,fdy: null
	,direction: null
	,sy: null
	,ey: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$active_$edge
};
var kha_graphics2_truetype_Stbtt_$_$point = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__point"] = kha_graphics2_truetype_Stbtt_$_$point;
kha_graphics2_truetype_Stbtt_$_$point.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$point.prototype = {
	x: null
	,y: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$point
};
var kha_graphics2_truetype_Stbtt_$_$csctx = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__csctx"] = kha_graphics2_truetype_Stbtt_$_$csctx;
kha_graphics2_truetype_Stbtt_$_$csctx.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$csctx.prototype = {
	bounds: null
	,started: null
	,first_x: null
	,first_y: null
	,x: null
	,y: null
	,min_x: null
	,min_y: null
	,max_x: null
	,max_y: null
	,pvertices: null
	,num_vertices: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$csctx
};
var kha_graphics2_truetype_StbTruetype = function() { };
$hxClasses["kha.graphics2.truetype.StbTruetype"] = kha_graphics2_truetype_StbTruetype;
kha_graphics2_truetype_StbTruetype.__name__ = true;
kha_graphics2_truetype_StbTruetype.stbtt__isfont = function(font) {
	var c0 = HxOverrides.cca("1",0);
	if(font.readU8(0) == c0 && font.readU8(1) == 0 && font.readU8(2) == 0 && font.readU8(3) == 0) {
		return true;
	}
	var c0 = HxOverrides.cca("typ1",0);
	var c1 = HxOverrides.cca("typ1",1);
	var c2 = HxOverrides.cca("typ1",2);
	var c3 = HxOverrides.cca("typ1",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	var c0 = HxOverrides.cca("OTTO",0);
	var c1 = HxOverrides.cca("OTTO",1);
	var c2 = HxOverrides.cca("OTTO",2);
	var c3 = HxOverrides.cca("OTTO",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	if(font.readU8(0) == 0 && font.readU8(1) == 1 && font.readU8(2) == 0 && font.readU8(3) == 0) {
		return true;
	}
	var c0 = HxOverrides.cca("true",0);
	var c1 = HxOverrides.cca("true",1);
	var c2 = HxOverrides.cca("true",2);
	var c3 = HxOverrides.cca("true",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__find_table = function(data,fontstart,tag) {
	var pos = fontstart + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var num_tables = data.readU8(pos + 1) | ch1 << 8;
	var tabledir = fontstart + 12;
	var _g = 0;
	while(_g < num_tables) {
		var loc = tabledir + 16 * _g++;
		var c0 = HxOverrides.cca(tag,0);
		var c1 = HxOverrides.cca(tag,1);
		var c2 = HxOverrides.cca(tag,2);
		var c3 = HxOverrides.cca(tag,3);
		if(data.readU8(loc) == c0 && data.readU8(loc + 1) == c1 && data.readU8(loc + 2) == c2 && data.readU8(loc + 3) == c3) {
			var pos = loc + 8;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = data.readU8(pos1);
			var ch2 = data.readU8(pos1 + 1);
			var ch3 = data.readU8(pos1 + 2);
			return data.readU8(pos1 + 3) | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex = function(font_collection,index) {
	if(kha_graphics2_truetype_StbTruetype.stbtt__isfont(font_collection)) {
		if(index == 0) {
			return 0;
		} else {
			return -1;
		}
	}
	var c0 = HxOverrides.cca("ttcf",0);
	var c1 = HxOverrides.cca("ttcf",1);
	var c2 = HxOverrides.cca("ttcf",2);
	var c3 = HxOverrides.cca("ttcf",3);
	if(font_collection.readU8(0) == c0 && font_collection.readU8(1) == c1 && font_collection.readU8(2) == c2 && font_collection.readU8(3) == c3) {
		var tmp;
		var ch1 = font_collection.readU8(4);
		var ch2 = font_collection.readU8(5);
		var ch3 = font_collection.readU8(6);
		if((font_collection.readU8(7) | ch3 << 8 | ch2 << 16 | ch1 << 24) != 65536) {
			var ch1 = font_collection.readU8(4);
			var ch2 = font_collection.readU8(5);
			var ch3 = font_collection.readU8(6);
			tmp = (font_collection.readU8(7) | ch3 << 8 | ch2 << 16 | ch1 << 24) == 131072;
		} else {
			tmp = true;
		}
		if(tmp) {
			var ch1 = font_collection.readU8(8);
			var ch2 = font_collection.readU8(9);
			var ch3 = font_collection.readU8(10);
			if(index >= (font_collection.readU8(11) | ch3 << 8 | ch2 << 16 | ch1 << 24)) {
				return -1;
			}
			var pos = 12 + index * 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			return font_collection.readU8(pos1 + 3) | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return -1;
};
kha_graphics2_truetype_StbTruetype.stbtt_InitFont = function(info,data,fontstart) {
	info.data = data;
	info.fontstart = fontstart;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	info.cff = r;
	var cmap = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"cmap");
	info.loca = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"loca");
	info.head = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"head");
	info.glyf = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"glyf");
	info.hhea = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"hhea");
	info.hmtx = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"hmtx");
	info.kern = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"kern");
	info.gpos = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"GPOS");
	if(cmap == 0 || info.head == 0 || info.hhea == 0 || info.hmtx == 0) {
		return false;
	}
	if(info.glyf != 0) {
		if(info.loca == 0) {
			return false;
		}
	} else {
		var topdict;
		var topdictidx;
		var cstype = [2];
		var charstrings = [0];
		var fdarrayoff = [0];
		var fdselectoff = [0];
		var cff = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"CFF ");
		if(cff == 0) {
			return false;
		}
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		info.fontdicts = r;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		info.fdselect = r;
		var cff_data = data.sub(cff,data.get_length() - cff);
		var size = cff_data.get_length();
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		if(size >= 1073741824) {
			throw haxe_Exception.thrown("Error");
		}
		r.data = cff_data;
		r.cursor = 0;
		info.cff = r;
		var b = info.cff;
		var o = b.cursor + 2;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var o;
		if(b.cursor >= b.data.get_length()) {
			o = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			o = b.data.readU8(pos);
		}
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		while(_g < 2) {
			++_g;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				++_g;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(!(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start)) {
				r.data = b.data.sub(start,s);
			}
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		while(_g < 2) {
			++_g;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				++_g;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				topdictidx = r;
			} else {
				r.data = b.data.sub(start,s);
				topdictidx = r;
			}
		} else {
			topdictidx = b;
		}
		if(0 > topdictidx.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdictidx.cursor = 0 > topdictidx.data.get_length() ? topdictidx.data.get_length() : 0;
		var v = 0;
		var _g = 0;
		while(_g < 2) {
			++_g;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var offsize;
		if(topdictidx.cursor >= topdictidx.data.get_length()) {
			offsize = 0;
		} else {
			var pos = topdictidx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = topdictidx.data.readU8(pos);
		}
		if(0 >= count) {
			throw haxe_Exception.thrown("Error");
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = topdictidx.cursor + 0 * offsize;
		if(o > topdictidx.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		topdictidx.cursor = o > topdictidx.data.get_length() || o < 0 ? topdictidx.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			++_g;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var start = v;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			++_g;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var o = 2 + (count + 1) * offsize + start;
		var s = v - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		if(o < 0 || s < 0 || o > topdictidx.data.get_length() || s > topdictidx.data.get_length() - o) {
			topdict = r;
		} else {
			r.data = topdictidx.data.sub(o,s);
			topdict = r;
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		while(_g < 2) {
			++_g;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				++_g;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(!(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start)) {
				r.data = b.data.sub(start,s);
			}
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		while(_g < 2) {
			++_g;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var tmp;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				++_g;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				tmp = r;
			} else {
				r.data = b.data.sub(start,s);
				tmp = r;
			}
		} else {
			tmp = b;
		}
		info.gsubrs = tmp;
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var _g = 0;
							while(_g < 2) {
								++_g;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									topdict.data.readU8(pos6);
								}
							}
						} else if(b01 == 29) {
							var _g1 = 0;
							while(_g1 < 4) {
								++_g1;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									topdict.data.readU8(pos7);
								}
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 17) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r;
				} else {
					r.data = topdict.data.sub(start,s);
					ret = r;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r;
			} else {
				r.data = topdict.data.sub(0,0);
				operands = r;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				while(_g < 2) {
					++_g;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g1 = 0;
				while(_g1 < 4) {
					++_g1;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			charstrings[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var _g = 0;
							while(_g < 2) {
								++_g;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									topdict.data.readU8(pos6);
								}
							}
						} else if(b01 == 29) {
							var _g1 = 0;
							while(_g1 < 4) {
								++_g1;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									topdict.data.readU8(pos7);
								}
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 262) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r;
				} else {
					r.data = topdict.data.sub(start,s);
					ret = r;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r;
			} else {
				r.data = topdict.data.sub(0,0);
				operands = r;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				while(_g < 2) {
					++_g;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g1 = 0;
				while(_g1 < 4) {
					++_g1;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			cstype[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var _g = 0;
							while(_g < 2) {
								++_g;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									topdict.data.readU8(pos6);
								}
							}
						} else if(b01 == 29) {
							var _g1 = 0;
							while(_g1 < 4) {
								++_g1;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									topdict.data.readU8(pos7);
								}
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 292) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r;
				} else {
					r.data = topdict.data.sub(start,s);
					ret = r;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r;
			} else {
				r.data = topdict.data.sub(0,0);
				operands = r;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				while(_g < 2) {
					++_g;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g1 = 0;
				while(_g1 < 4) {
					++_g1;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			fdarrayoff[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var _g = 0;
							while(_g < 2) {
								++_g;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									topdict.data.readU8(pos6);
								}
							}
						} else if(b01 == 29) {
							var _g1 = 0;
							while(_g1 < 4) {
								++_g1;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									topdict.data.readU8(pos7);
								}
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 293) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r;
				} else {
					r.data = topdict.data.sub(start,s);
					ret = r;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r;
			} else {
				r.data = topdict.data.sub(0,0);
				operands = r;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				while(_g < 2) {
					++_g;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g1 = 0;
				while(_g1 < 4) {
					++_g1;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			fdselectoff[i] = tmp;
			++i;
		}
		var subrsoff = [0];
		var private_loc = [0,0];
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var _g = 0;
							while(_g < 2) {
								++_g;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									topdict.data.readU8(pos6);
								}
							}
						} else if(b01 == 29) {
							var _g1 = 0;
							while(_g1 < 4) {
								++_g1;
								if(topdict.cursor < topdict.data.get_length()) {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									topdict.data.readU8(pos7);
								}
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 18) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r;
				} else {
					r.data = topdict.data.sub(start,s);
					ret = r;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r;
			} else {
				r.data = topdict.data.sub(0,0);
				operands = r;
			}
		}
		while(i < 2 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				while(_g < 2) {
					++_g;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g1 = 0;
				while(_g1 < 4) {
					++_g1;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			private_loc[i] = tmp;
			++i;
		}
		var tmp;
		if(private_loc[1] == 0 || private_loc[0] == 0) {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			tmp = r;
		} else {
			var o = private_loc[1];
			var s = private_loc[0];
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var pdict;
			if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
				pdict = r;
			} else {
				r.data = b.data.sub(o,s);
				pdict = r;
			}
			var i = 0;
			if(0 > pdict.data.get_length()) {
				throw haxe_Exception.thrown("Error");
			}
			pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
			var ret = null;
			while(pdict.cursor < pdict.data.get_length()) {
				var start = pdict.cursor;
				var op;
				while(true) {
					var tmp1;
					if(pdict.cursor >= pdict.data.get_length()) {
						tmp1 = 0;
					} else {
						var pos = pdict.cursor;
						if(pos == null) {
							pos = 0;
						}
						tmp1 = pdict.data.readU8(pos);
					}
					if(!(tmp1 >= 28)) {
						break;
					}
					var v;
					var b0;
					if(pdict.cursor >= pdict.data.get_length()) {
						b0 = 0;
					} else {
						var pos1 = pdict.cursor;
						if(pos1 == null) {
							pos1 = 0;
						}
						b0 = pdict.data.readU8(pos1);
					}
					if(b0 < 28) {
						throw haxe_Exception.thrown("Error");
					}
					if(b0 == 30) {
						var o = pdict.cursor + 1;
						if(o > pdict.data.get_length() || o < 0) {
							throw haxe_Exception.thrown("Error");
						}
						pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
						while(pdict.cursor < pdict.data.get_length()) {
							if(pdict.cursor >= pdict.data.get_length()) {
								v = 0;
							} else {
								var pos2 = pdict.cursor++;
								if(pos2 == null) {
									pos2 = 0;
								}
								v = pdict.data.readU8(pos2);
							}
							if((v & 15) == 15 || v >> 4 == 15) {
								break;
							}
						}
					} else {
						var b01;
						if(pdict.cursor >= pdict.data.get_length()) {
							b01 = 0;
						} else {
							var pos3 = pdict.cursor++;
							if(pos3 == null) {
								pos3 = 0;
							}
							b01 = pdict.data.readU8(pos3);
						}
						if(!(b01 >= 32 && b01 <= 246)) {
							if(b01 >= 247 && b01 <= 250) {
								if(pdict.cursor < pdict.data.get_length()) {
									var pos4 = pdict.cursor++;
									if(pos4 == null) {
										pos4 = 0;
									}
									pdict.data.readU8(pos4);
								}
							} else if(b01 >= 251 && b01 <= 254) {
								if(pdict.cursor < pdict.data.get_length()) {
									var pos5 = pdict.cursor++;
									if(pos5 == null) {
										pos5 = 0;
									}
									pdict.data.readU8(pos5);
								}
							} else if(b01 == 28) {
								var _g = 0;
								while(_g < 2) {
									++_g;
									if(pdict.cursor < pdict.data.get_length()) {
										var pos6 = pdict.cursor++;
										if(pos6 == null) {
											pos6 = 0;
										}
										pdict.data.readU8(pos6);
									}
								}
							} else if(b01 == 29) {
								var _g1 = 0;
								while(_g1 < 4) {
									++_g1;
									if(pdict.cursor < pdict.data.get_length()) {
										var pos7 = pdict.cursor++;
										if(pos7 == null) {
											pos7 = 0;
										}
										pdict.data.readU8(pos7);
									}
								}
							} else {
								throw haxe_Exception.thrown("Error");
							}
						}
					}
				}
				var end = pdict.cursor;
				if(pdict.cursor >= pdict.data.get_length()) {
					op = 0;
				} else {
					var pos8 = pdict.cursor++;
					if(pos8 == null) {
						pos8 = 0;
					}
					op = pdict.data.readU8(pos8);
				}
				if(op == 12) {
					var op1;
					if(pdict.cursor >= pdict.data.get_length()) {
						op1 = 0;
					} else {
						var pos9 = pdict.cursor++;
						if(pos9 == null) {
							pos9 = 0;
						}
						op1 = pdict.data.readU8(pos9);
					}
					op = op1 | 256;
				}
				if(op == 19) {
					var s = end - start;
					var r = new kha_graphics2_truetype_Stbtt_$_$buf();
					r.data = null;
					r.cursor = 0;
					if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
						ret = r;
					} else {
						r.data = pdict.data.sub(start,s);
						ret = r;
					}
					break;
				}
			}
			var operands;
			if(ret != null) {
				operands = ret;
			} else {
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
					operands = r;
				} else {
					r.data = pdict.data.sub(0,0);
					operands = r;
				}
			}
			while(i < 1 && operands.cursor < operands.data.get_length()) {
				var b0;
				if(operands.cursor >= operands.data.get_length()) {
					b0 = 0;
				} else {
					var pos = operands.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b0 = operands.data.readU8(pos);
				}
				var tmp1;
				if(b0 >= 32 && b0 <= 246) {
					tmp1 = b0 - 139;
				} else if(b0 >= 247 && b0 <= 250) {
					var tmp2;
					if(operands.cursor >= operands.data.get_length()) {
						tmp2 = 0;
					} else {
						var pos1 = operands.cursor++;
						if(pos1 == null) {
							pos1 = 0;
						}
						tmp2 = operands.data.readU8(pos1);
					}
					tmp1 = (b0 - 247) * 256 + tmp2 + 108;
				} else if(b0 >= 251 && b0 <= 254) {
					var tmp3;
					if(operands.cursor >= operands.data.get_length()) {
						tmp3 = 0;
					} else {
						var pos2 = operands.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						tmp3 = operands.data.readU8(pos2);
					}
					tmp1 = -(b0 - 251) * 256 - tmp3 - 108;
				} else if(b0 == 28) {
					var v = 0;
					var _g = 0;
					while(_g < 2) {
						++_g;
						var v1;
						if(operands.cursor >= operands.data.get_length()) {
							v1 = 0;
						} else {
							var pos3 = operands.cursor++;
							if(pos3 == null) {
								pos3 = 0;
							}
							v1 = operands.data.readU8(pos3);
						}
						v = v << 8 | v1;
					}
					tmp1 = v;
				} else if(b0 == 29) {
					var v2 = 0;
					var _g1 = 0;
					while(_g1 < 4) {
						++_g1;
						var v3;
						if(operands.cursor >= operands.data.get_length()) {
							v3 = 0;
						} else {
							var pos4 = operands.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							v3 = operands.data.readU8(pos4);
						}
						v2 = v2 << 8 | v3;
					}
					tmp1 = v2;
				} else {
					throw haxe_Exception.thrown("Error");
				}
				subrsoff[i] = tmp1;
				++i;
			}
			if(subrsoff[0] == 0) {
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				tmp = r;
			} else {
				var o = private_loc[1] + subrsoff[0];
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var start = b.cursor;
				var v = 0;
				var _g = 0;
				while(_g < 2) {
					++_g;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var count = v;
				if(count > 0) {
					var offsize;
					if(b.cursor >= b.data.get_length()) {
						offsize = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						offsize = b.data.readU8(pos);
					}
					if(!(offsize >= 1 && offsize <= 4)) {
						throw haxe_Exception.thrown("Error");
					}
					var o = b.cursor + offsize * count;
					if(o > b.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
					var v = 0;
					if(!(offsize >= 1 && offsize <= 4)) {
						throw haxe_Exception.thrown("Error");
					}
					var _g = 0;
					var _g1 = offsize;
					while(_g < _g1) {
						++_g;
						var v1;
						if(b.cursor >= b.data.get_length()) {
							v1 = 0;
						} else {
							var pos = b.cursor++;
							if(pos == null) {
								pos = 0;
							}
							v1 = b.data.readU8(pos);
						}
						v = v << 8 | v1;
					}
					var o = b.cursor + (v - 1);
					if(o > b.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
					var s = b.cursor - start;
					var r = new kha_graphics2_truetype_Stbtt_$_$buf();
					r.data = null;
					r.cursor = 0;
					if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
						tmp = r;
					} else {
						r.data = b.data.sub(start,s);
						tmp = r;
					}
				} else {
					tmp = b;
				}
			}
		}
		info.subrs = tmp;
		if(cstype[0] != 2) {
			return false;
		}
		if(charstrings[0] == 0) {
			return false;
		}
		if(fdarrayoff[0] != 0) {
			if(fdselectoff[0] == 0) {
				return false;
			}
			var o = fdarrayoff[0];
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var start = b.cursor;
			var v = 0;
			var _g = 0;
			while(_g < 2) {
				++_g;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var count = v;
			var tmp;
			if(count > 0) {
				var offsize;
				if(b.cursor >= b.data.get_length()) {
					offsize = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					offsize = b.data.readU8(pos);
				}
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o = b.cursor + offsize * count;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var v = 0;
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g = 0;
				var _g1 = offsize;
				while(_g < _g1) {
					++_g;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var o = b.cursor + (v - 1);
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var s = b.cursor - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
					tmp = r;
				} else {
					r.data = b.data.sub(start,s);
					tmp = r;
				}
			} else {
				tmp = b;
			}
			info.fontdicts = tmp;
			var o = fdselectoff[0];
			var s = b.data.get_length() - fdselectoff[0];
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var tmp;
			if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
				tmp = r;
			} else {
				r.data = b.data.sub(o,s);
				tmp = r;
			}
			info.fdselect = tmp;
		}
		var o = charstrings[0];
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		while(_g < 2) {
			++_g;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var tmp;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				++_g;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				tmp = r;
			} else {
				r.data = b.data.sub(start,s);
				tmp = r;
			}
		} else {
			tmp = b;
		}
		info.charstrings = tmp;
	}
	var t = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"maxp");
	if(t != 0) {
		var pos = t + 4;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		info.numGlyphs = data.readU8(pos + 1) | ch1 << 8;
	} else {
		info.numGlyphs = 65535;
	}
	var pos = cmap + 2;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var numTables = data.readU8(pos + 1) | ch1 << 8;
	info.index_map = 0;
	var _g = 0;
	while(_g < numTables) {
		var encoding_record = cmap + 4 + 8 * _g++;
		var pos = encoding_record;
		if(encoding_record == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		switch(data.readU8(pos + 1) | ch1 << 8) {
		case 0:
			var pos1 = encoding_record + 4;
			if(pos1 == null) {
				pos1 = 0;
			}
			var pos2 = pos1;
			if(pos2 == null) {
				pos2 = 0;
			}
			var ch11 = data.readU8(pos2);
			var ch2 = data.readU8(pos2 + 1);
			var ch3 = data.readU8(pos2 + 2);
			info.index_map = cmap + (data.readU8(pos2 + 3) | ch3 << 8 | ch2 << 16 | ch11 << 24);
			break;
		case 3:
			var pos3 = encoding_record + 2;
			if(pos3 == null) {
				pos3 = 0;
			}
			var ch12 = data.readU8(pos3);
			switch(data.readU8(pos3 + 1) | ch12 << 8) {
			case 1:case 10:
				var pos4 = encoding_record + 4;
				if(pos4 == null) {
					pos4 = 0;
				}
				var pos5 = pos4;
				if(pos5 == null) {
					pos5 = 0;
				}
				var ch13 = data.readU8(pos5);
				var ch21 = data.readU8(pos5 + 1);
				var ch31 = data.readU8(pos5 + 2);
				info.index_map = cmap + (data.readU8(pos5 + 3) | ch31 << 8 | ch21 << 16 | ch13 << 24);
				break;
			}
			break;
		}
	}
	if(info.index_map == 0) {
		return false;
	}
	var pos = info.head + 50;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	info.indexToLocFormat = data.readU8(pos + 1) | ch1 << 8;
	return true;
};
kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex = function(info,unicode_codepoint) {
	var data = info.data;
	var index_map = info.index_map;
	var pos = index_map;
	if(index_map == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var format = data.readU8(pos + 1) | ch1 << 8;
	if(format == 0) {
		var pos = index_map + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		if(unicode_codepoint < (data.readU8(pos + 1) | ch1 << 8) - 6) {
			var pos = index_map + 6 + unicode_codepoint;
			if(pos == null) {
				pos = 0;
			}
			return data.readU8(pos);
		}
		return 0;
	} else if(format == 6) {
		var pos = index_map + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var first = data.readU8(pos + 1) | ch1 << 8;
		var pos = index_map + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var count = data.readU8(pos + 1) | ch1 << 8;
		if(unicode_codepoint >= first && unicode_codepoint < first + count) {
			var pos = index_map + 10 + (unicode_codepoint - first) * 2;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			return data.readU8(pos + 1) | ch1 << 8;
		}
		return 0;
	} else if(format == 2) {
		throw haxe_Exception.thrown("Error");
	} else if(format == 4) {
		var pos = index_map + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var segcount = (data.readU8(pos + 1) | ch1 << 8) >> 1;
		var pos = index_map + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var searchRange = (data.readU8(pos + 1) | ch1 << 8) >> 1;
		var pos = index_map + 10;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var entrySelector = data.readU8(pos + 1) | ch1 << 8;
		var pos = index_map + 12;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var rangeShift = (data.readU8(pos + 1) | ch1 << 8) >> 1;
		var endCount = index_map + 14;
		var search = endCount;
		if(unicode_codepoint > 65535) {
			return 0;
		}
		var pos = endCount + rangeShift * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		if(unicode_codepoint >= (data.readU8(pos + 1) | ch1 << 8)) {
			search = endCount + rangeShift * 2;
		}
		search -= 2;
		while(entrySelector != 0) {
			searchRange >>= 1;
			var pos = search + searchRange * 2;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			if(unicode_codepoint > (data.readU8(pos + 1) | ch1 << 8)) {
				search += searchRange * 2;
			}
			--entrySelector;
		}
		search += 2;
		var item = search - endCount >> 1 & 65535;
		var pos = endCount + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		if(unicode_codepoint > (data.readU8(pos + 1) | ch1 << 8)) {
			throw haxe_Exception.thrown("Error");
		}
		var pos = index_map + 14 + segcount * 2 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var start = data.readU8(pos + 1) | ch1 << 8;
		if(unicode_codepoint < start) {
			return 0;
		}
		var pos = index_map + 14 + segcount * 6 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var offset = data.readU8(pos + 1) | ch1 << 8;
		if(offset == 0) {
			var pos = index_map + 14 + segcount * 4 + 2 + 2 * item;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var n = data.readU8(pos + 1) | ch1 << 8;
			return unicode_codepoint + ((n & 32768) != 0 ? n - 65536 : n) & 65535;
		}
		var pos = offset + (unicode_codepoint - start) * 2 + index_map + 14 + segcount * 6 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		return data.readU8(pos + 1) | ch1 << 8;
	} else if(format == 12 || format == 13) {
		var pos = index_map + 12;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = data.readU8(pos1);
		var ch2 = data.readU8(pos1 + 1);
		var ch3 = data.readU8(pos1 + 2);
		var low = 0;
		var high = data.readU8(pos1 + 3) | ch3 << 8 | ch2 << 16 | ch1 << 24;
		while(low < high) {
			var mid = low + (high - low >> 1);
			var pos = index_map + 16 + mid * 12;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = data.readU8(pos1);
			var ch2 = data.readU8(pos1 + 1);
			var ch3 = data.readU8(pos1 + 2);
			var start_char = data.readU8(pos1 + 3) | ch3 << 8 | ch2 << 16 | ch1 << 24;
			var pos2 = index_map + 16 + mid * 12 + 4;
			if(pos2 == null) {
				pos2 = 0;
			}
			var pos3 = pos2;
			if(pos3 == null) {
				pos3 = 0;
			}
			var ch11 = data.readU8(pos3);
			var ch21 = data.readU8(pos3 + 1);
			var ch31 = data.readU8(pos3 + 2);
			var end_char = data.readU8(pos3 + 3) | ch31 << 8 | ch21 << 16 | ch11 << 24;
			if(unicode_codepoint < start_char) {
				high = mid;
			} else if(unicode_codepoint > end_char) {
				low = mid + 1;
			} else {
				var pos4 = index_map + 16 + mid * 12 + 8;
				if(pos4 == null) {
					pos4 = 0;
				}
				var pos5 = pos4;
				if(pos5 == null) {
					pos5 = 0;
				}
				var ch12 = data.readU8(pos5);
				var ch22 = data.readU8(pos5 + 1);
				var ch32 = data.readU8(pos5 + 2);
				var start_glyph = data.readU8(pos5 + 3) | ch32 << 8 | ch22 << 16 | ch12 << 24;
				if(format == 12) {
					return start_glyph + unicode_codepoint - start_char;
				} else {
					return start_glyph;
				}
			}
		}
		return 0;
	}
	throw haxe_Exception.thrown("Error");
};
kha_graphics2_truetype_StbTruetype.stbtt_setvertex = function(v,type,x,y,cx,cy) {
	v.type = type;
	v.x = x;
	v.y = y;
	v.cx = cx;
	v.cy = cy;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset = function(info,glyph_index) {
	var g1;
	var g2;
	if(!(info.cff.data == null || info.cff.data.get_length() == 0)) {
		throw haxe_Exception.thrown("Error");
	}
	if(glyph_index >= info.numGlyphs) {
		return -1;
	}
	if(info.indexToLocFormat >= 2) {
		return -1;
	}
	if(info.indexToLocFormat == 0) {
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		g1 = info1 + (p.readU8(pos + 1) | ch1 << 8) * 2;
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 2 + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		g2 = info1 + (p.readU8(pos + 1) | ch1 << 8) * 2;
	} else {
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = p.readU8(pos1);
		var ch2 = p.readU8(pos1 + 1);
		var ch3 = p.readU8(pos1 + 2);
		g1 = info1 + (p.readU8(pos1 + 3) | ch3 << 8 | ch2 << 16 | ch1 << 24);
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 4 + 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = p.readU8(pos1);
		var ch2 = p.readU8(pos1 + 1);
		var ch3 = p.readU8(pos1 + 2);
		g2 = info1 + (p.readU8(pos1 + 3) | ch3 << 8 | ch2 << 16 | ch1 << 24);
	}
	if(g1 == g2) {
		return -1;
	} else {
		return g1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox = function(info,glyph_index,rect) {
	if(info.cff.data != null && info.cff.data.get_length() > 0) {
		kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2(info,glyph_index,rect);
	} else {
		var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
		if(g < 0) {
			return false;
		}
		var p = info.data;
		var pos = g + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		rect.x0 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 4;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		rect.y0 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		rect.x1 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		rect.y1 = (n & 32768) != 0 ? n - 65536 : n;
	}
	return true;
};
kha_graphics2_truetype_StbTruetype.stbtt__close_shape = function(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy) {
	if(start_off) {
		if(was_off) {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,cx + scx >> 1,cy + scy >> 1,cx,cy);
		}
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,sx,sy,scx,scy);
	} else if(was_off) {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,sx,sy,cx,cy);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],2,sx,sy,0,0);
	}
	return num_vertices;
};
kha_graphics2_truetype_StbTruetype.copyVertices = function(from,to,offset,count) {
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		to[offset + i] = from[i];
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeTT = function(info,glyph_index) {
	var data = info.data;
	var vertices = null;
	var num_vertices = 0;
	var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
	if(g < 0) {
		return null;
	}
	var pos = g;
	if(g == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var n = data.readU8(pos + 1) | ch1 << 8;
	var numberOfContours = (n & 32768) != 0 ? n - 65536 : n;
	if(numberOfContours > 0) {
		var flags = 0;
		var j = 0;
		var next_move = 0;
		var off = 0;
		var was_off = false;
		var start_off = false;
		var endPtsOfContoursOffset = g + 10;
		var pos = endPtsOfContoursOffset + numberOfContours * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var pointsIndex = endPtsOfContoursOffset + numberOfContours * 2 + 2 + (data.readU8(pos + 1) | ch1 << 8);
		var pos = endPtsOfContoursOffset + numberOfContours * 2 - 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var n = 1 + (data.readU8(pos + 1) | ch1 << 8);
		var m = n + 2 * numberOfContours;
		vertices = new Array(m);
		if(vertices == null) {
			return null;
		} else {
			var _g = 0;
			var _g1 = vertices.length;
			while(_g < _g1) vertices[_g++] = new kha_graphics2_truetype_Stbtt_$vertex();
		}
		next_move = 0;
		var flagcount = 0;
		off = m - n;
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			if(flagcount == 0) {
				flags = data.readU8(pointsIndex++);
				if((flags & 8) != 0) {
					flagcount = data.readU8(pointsIndex++);
				}
			} else {
				--flagcount;
			}
			vertices[off + i].type = flags;
		}
		var x = 0;
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			flags = vertices[off + i].type;
			if((flags & 2) != 0) {
				var dx = data.readU8(pointsIndex++);
				x += (flags & 16) != 0 ? dx : -dx;
			} else if((flags & 16) == 0) {
				var value;
				var ch1 = data.readU8(pointsIndex);
				var n1 = data.readU8(pointsIndex + 1) | ch1 << 8;
				if((n1 & 32768) != 0) {
					value = n1 - 65536;
				} else {
					value = n1;
				}
				x += value;
				pointsIndex += 2;
			}
			vertices[off + i].x = x;
		}
		var y = 0;
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			flags = vertices[off + i].type;
			if((flags & 4) != 0) {
				var dy = data.readU8(pointsIndex++);
				y += (flags & 32) != 0 ? dy : -dy;
			} else if((flags & 32) == 0) {
				var value;
				var ch1 = data.readU8(pointsIndex);
				var n1 = data.readU8(pointsIndex + 1) | ch1 << 8;
				if((n1 & 32768) != 0) {
					value = n1 - 65536;
				} else {
					value = n1;
				}
				y += value;
				pointsIndex += 2;
			}
			vertices[off + i].y = y;
		}
		num_vertices = 0;
		var scy = 0;
		var scx = 0;
		var cy = 0;
		var cx = 0;
		var sy = 0;
		var sx = 0;
		var i = 0;
		while(i < n) {
			flags = vertices[off + i].type;
			x = vertices[off + i].x;
			y = vertices[off + i].y;
			if(next_move == i) {
				if(i != 0) {
					num_vertices = kha_graphics2_truetype_StbTruetype.stbtt__close_shape(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy);
				}
				start_off = (flags & 1) == 0;
				if(start_off) {
					scx = x;
					scy = y;
					if((vertices[off + i + 1].type & 1) == 0) {
						sx = x + vertices[off + i + 1].x >> 1;
						sy = y + vertices[off + i + 1].y >> 1;
					} else {
						sx = vertices[off + i + 1].x;
						sy = vertices[off + i + 1].y;
						++i;
					}
				} else {
					sx = x;
					sy = y;
				}
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],1,sx,sy,0,0);
				was_off = false;
				var pos = endPtsOfContoursOffset + j * 2;
				if(pos == null) {
					pos = 0;
				}
				var ch1 = data.readU8(pos);
				next_move = 1 + (data.readU8(pos + 1) | ch1 << 8);
				++j;
			} else if((flags & 1) == 0) {
				if(was_off) {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,cx + x >> 1,cy + y >> 1,cx,cy);
				}
				cx = x;
				cy = y;
				was_off = true;
			} else {
				if(was_off) {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,x,y,cx,cy);
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],2,x,y,0,0);
				}
				was_off = false;
			}
			++i;
		}
		num_vertices = kha_graphics2_truetype_StbTruetype.stbtt__close_shape(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy);
	} else if(numberOfContours < 0) {
		var more = 1;
		var compIndex = g + 10;
		num_vertices = 0;
		vertices = null;
		while(more != 0) {
			var comp_num_verts = 0;
			var comp_verts = null;
			var tmp = null;
			var mtx0 = 1;
			var mtx1 = 0;
			var mtx2 = 0;
			var mtx3 = 1;
			var mtx4 = 0;
			var mtx5 = 0;
			var pos = compIndex;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var n = data.readU8(pos + 1) | ch1 << 8;
			var flags = (n & 32768) != 0 ? n - 65536 : n;
			var pos1 = compIndex += 2;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch11 = data.readU8(pos1);
			var n1 = data.readU8(pos1 + 1) | ch11 << 8;
			compIndex += 2;
			if((flags & 2) != 0) {
				if((flags & 1) != 0) {
					var pos2 = compIndex;
					if(pos2 == null) {
						pos2 = 0;
					}
					var ch12 = data.readU8(pos2);
					var n2 = data.readU8(pos2 + 1) | ch12 << 8;
					mtx4 = (n2 & 32768) != 0 ? n2 - 65536 : n2;
					var pos3 = compIndex += 2;
					if(pos3 == null) {
						pos3 = 0;
					}
					var ch13 = data.readU8(pos3);
					var n3 = data.readU8(pos3 + 1) | ch13 << 8;
					mtx5 = (n3 & 32768) != 0 ? n3 - 65536 : n3;
					compIndex += 2;
				} else {
					var pos4 = compIndex;
					if(pos4 == null) {
						pos4 = 0;
					}
					var n4 = data.readU8(pos4);
					mtx4 = n4 >= 128 ? n4 - 256 : n4;
					var pos5 = ++compIndex;
					if(pos5 == null) {
						pos5 = 0;
					}
					var n5 = data.readU8(pos5);
					mtx5 = n5 >= 128 ? n5 - 256 : n5;
					++compIndex;
				}
			} else {
				throw haxe_Exception.thrown("Error");
			}
			if((flags & 8) != 0) {
				var pos6 = compIndex;
				if(pos6 == null) {
					pos6 = 0;
				}
				var ch14 = data.readU8(pos6);
				var n6 = data.readU8(pos6 + 1) | ch14 << 8;
				mtx3 = ((n6 & 32768) != 0 ? n6 - 65536 : n6) / 16384.0;
				mtx0 = mtx3;
				compIndex += 2;
				mtx2 = 0;
				mtx1 = mtx2;
			} else if((flags & 64) != 0) {
				var pos7 = compIndex;
				if(pos7 == null) {
					pos7 = 0;
				}
				var ch15 = data.readU8(pos7);
				var n7 = data.readU8(pos7 + 1) | ch15 << 8;
				mtx0 = ((n7 & 32768) != 0 ? n7 - 65536 : n7) / 16384.0;
				compIndex += 2;
				mtx2 = 0;
				mtx1 = mtx2;
				var pos8 = compIndex;
				if(pos8 == null) {
					pos8 = 0;
				}
				var ch16 = data.readU8(pos8);
				var n8 = data.readU8(pos8 + 1) | ch16 << 8;
				mtx3 = ((n8 & 32768) != 0 ? n8 - 65536 : n8) / 16384.0;
				compIndex += 2;
			} else if((flags & 128) != 0) {
				var pos9 = compIndex;
				if(pos9 == null) {
					pos9 = 0;
				}
				var ch17 = data.readU8(pos9);
				var n9 = data.readU8(pos9 + 1) | ch17 << 8;
				mtx0 = ((n9 & 32768) != 0 ? n9 - 65536 : n9) / 16384.0;
				var pos10 = compIndex += 2;
				if(pos10 == null) {
					pos10 = 0;
				}
				var ch18 = data.readU8(pos10);
				var n10 = data.readU8(pos10 + 1) | ch18 << 8;
				mtx1 = ((n10 & 32768) != 0 ? n10 - 65536 : n10) / 16384.0;
				var pos11 = compIndex += 2;
				if(pos11 == null) {
					pos11 = 0;
				}
				var ch19 = data.readU8(pos11);
				var n11 = data.readU8(pos11 + 1) | ch19 << 8;
				mtx2 = ((n11 & 32768) != 0 ? n11 - 65536 : n11) / 16384.0;
				var pos12 = compIndex += 2;
				if(pos12 == null) {
					pos12 = 0;
				}
				var ch110 = data.readU8(pos12);
				var n12 = data.readU8(pos12 + 1) | ch110 << 8;
				mtx3 = ((n12 & 32768) != 0 ? n12 - 65536 : n12) / 16384.0;
				compIndex += 2;
			}
			var m = Math.sqrt(mtx0 * mtx0 + mtx1 * mtx1);
			var n13 = Math.sqrt(mtx2 * mtx2 + mtx3 * mtx3);
			comp_verts = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,(n1 & 32768) != 0 ? n1 - 65536 : n1);
			comp_num_verts = comp_verts == null ? 0 : comp_verts.length;
			if(comp_num_verts > 0) {
				var _g = 0;
				var _g1 = comp_num_verts;
				while(_g < _g1) {
					var v = comp_verts[_g++];
					var x = v.x;
					var y = v.y;
					v.x = m * (mtx0 * x + mtx2 * y + mtx4) | 0;
					v.y = n13 * (mtx1 * x + mtx3 * y + mtx5) | 0;
					x = v.cx;
					y = v.cy;
					v.cx = m * (mtx0 * x + mtx2 * y + mtx4) | 0;
					v.cy = n13 * (mtx1 * x + mtx3 * y + mtx5) | 0;
				}
				tmp = new Array(num_vertices + comp_num_verts);
				if(tmp == null) {
					return null;
				}
				if(num_vertices > 0) {
					kha_graphics2_truetype_StbTruetype.copyVertices(vertices,tmp,0,num_vertices);
				}
				kha_graphics2_truetype_StbTruetype.copyVertices(comp_verts,tmp,num_vertices,comp_num_verts);
				vertices = tmp;
				num_vertices += comp_num_verts;
			}
			more = flags & 32;
		}
	}
	if(vertices == null) {
		return null;
	}
	if(vertices.length < num_vertices) {
		throw haxe_Exception.thrown("Error");
	}
	if(num_vertices < vertices.length) {
		var tmp = new Array(num_vertices);
		kha_graphics2_truetype_StbTruetype.copyVertices(vertices,tmp,0,num_vertices);
		return tmp;
	} else {
		return vertices;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__run_charstring = function(info,glyph_index,c) {
	var in_header = true;
	var maskbits = 0;
	var subr_stack_height = 0;
	var sp = 0;
	var v;
	var i;
	var b0;
	var has_subrs = false;
	var clear_stack;
	var _g = [];
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	var _g1 = [];
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g1.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	var subrs = info.subrs;
	var b;
	var f;
	var b1 = info.charstrings;
	if(0 > b1.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b1.cursor = 0 > b1.data.get_length() ? b1.data.get_length() : 0;
	var v1 = 0;
	var _g2 = 0;
	while(_g2 < 2) {
		++_g2;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var count = v1;
	var offsize;
	if(b1.cursor >= b1.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b1.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b1.data.readU8(pos);
	}
	if(!(glyph_index >= 0 && glyph_index < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b1.cursor + glyph_index * offsize;
	if(o > b1.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b1.cursor = o > b1.data.get_length() || o < 0 ? b1.data.get_length() : o;
	var v1 = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g2 = 0;
	var _g3 = offsize;
	while(_g2 < _g3) {
		++_g2;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var start = v1;
	var v1 = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g2 = 0;
	var _g3 = offsize;
	while(_g2 < _g3) {
		++_g2;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var o = 2 + (count + 1) * offsize + start;
	var s = v1 - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	if(o < 0 || s < 0 || o > b1.data.get_length() || s > b1.data.get_length() - o) {
		b = r;
	} else {
		r.data = b1.data.sub(o,s);
		b = r;
	}
	while(b.cursor < b.data.get_length()) {
		i = 0;
		clear_stack = true;
		if(b.cursor >= b.data.get_length()) {
			b0 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = b.data.readU8(pos);
		}
		switch(b0) {
		case 1:case 3:case 18:case 23:
			maskbits += sp / 2 | 0;
			break;
		case 4:
			in_header = false;
			if(sp < 1) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x = c.first_x | 0;
				var y = c.first_y | 0;
				if(c.bounds) {
					if(x > c.max_x || !c.started) {
						c.max_x = x;
					}
					if(y > c.max_y || !c.started) {
						c.max_y = y;
					}
					if(x < c.min_x || !c.started) {
						c.min_x = x;
					}
					if(y < c.min_y || !c.started) {
						c.min_y = y;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x,y,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x;
			c.first_y = c.y = c.y + _g[sp - 1];
			var x1 = c.x | 0;
			var y1 = c.y | 0;
			if(c.bounds) {
				if(x1 > c.max_x || !c.started) {
					c.max_x = x1;
				}
				if(y1 > c.max_y || !c.started) {
					c.max_y = y1;
				}
				if(x1 < c.min_x || !c.started) {
					c.min_x = x1;
				}
				if(y1 < c.min_y || !c.started) {
					c.min_y = y1;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x1,y1,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 5:
			if(sp < 2) {
				return false;
			}
			while(i + 1 < sp) {
				c.x += _g[i];
				c.y += _g[i + 1];
				var x2 = c.x | 0;
				var y2 = c.y | 0;
				if(c.bounds) {
					if(x2 > c.max_x || !c.started) {
						c.max_x = x2;
					}
					if(y2 > c.max_y || !c.started) {
						c.max_y = y2;
					}
					if(x2 < c.min_x || !c.started) {
						c.min_x = x2;
					}
					if(y2 < c.min_y || !c.started) {
						c.min_y = y2;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x2,y2,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				i += 2;
			}
			break;
		case 6:
			if(sp < 1) {
				return false;
			}
			while(i < sp) {
				c.x += _g[i];
				c.y += 0;
				var x3 = c.x | 0;
				var y3 = c.y | 0;
				if(c.bounds) {
					if(x3 > c.max_x || !c.started) {
						c.max_x = x3;
					}
					if(y3 > c.max_y || !c.started) {
						c.max_y = y3;
					}
					if(x3 < c.min_x || !c.started) {
						c.min_x = x3;
					}
					if(y3 < c.min_y || !c.started) {
						c.min_y = y3;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x3,y3,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
				if(i >= sp) {
					break;
				}
				c.x += 0;
				c.y += _g[i];
				var x4 = c.x | 0;
				var y4 = c.y | 0;
				if(c.bounds) {
					if(x4 > c.max_x || !c.started) {
						c.max_x = x4;
					}
					if(y4 > c.max_y || !c.started) {
						c.max_y = y4;
					}
					if(x4 < c.min_x || !c.started) {
						c.min_x = x4;
					}
					if(y4 < c.min_y || !c.started) {
						c.min_y = y4;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x4,y4,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
			}
			break;
		case 7:
			if(sp < 1) {
				return false;
			}
			while(i < sp) {
				c.x += 0;
				c.y += _g[i];
				var x5 = c.x | 0;
				var y5 = c.y | 0;
				if(c.bounds) {
					if(x5 > c.max_x || !c.started) {
						c.max_x = x5;
					}
					if(y5 > c.max_y || !c.started) {
						c.max_y = y5;
					}
					if(x5 < c.min_x || !c.started) {
						c.min_x = x5;
					}
					if(y5 < c.min_y || !c.started) {
						c.min_y = y5;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x5,y5,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
				if(i >= sp) {
					break;
				}
				c.x += _g[i];
				c.y += 0;
				var x6 = c.x | 0;
				var y6 = c.y | 0;
				if(c.bounds) {
					if(x6 > c.max_x || !c.started) {
						c.max_x = x6;
					}
					if(y6 > c.max_y || !c.started) {
						c.max_y = y6;
					}
					if(x6 < c.min_x || !c.started) {
						c.min_x = x6;
					}
					if(y6 < c.min_y || !c.started) {
						c.min_y = y6;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x6,y6,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
			}
			break;
		case 8:
			if(sp < 6) {
				return false;
			}
			while(i + 5 < sp) {
				var cx1 = c.x + _g[i];
				var cy1 = c.y + _g[i + 1];
				var cx2 = cx1 + _g[i + 2];
				var cy2 = cy1 + _g[i + 3];
				c.x = cx2 + _g[i + 4];
				c.y = cy2 + _g[i + 5];
				var x7 = c.x | 0;
				var y7 = c.y | 0;
				var cx = cx1 | 0;
				var cy = cy1 | 0;
				var cx11 = cx2 | 0;
				var cy11 = cy2 | 0;
				if(c.bounds) {
					if(x7 > c.max_x || !c.started) {
						c.max_x = x7;
					}
					if(y7 > c.max_y || !c.started) {
						c.max_y = y7;
					}
					if(x7 < c.min_x || !c.started) {
						c.min_x = x7;
					}
					if(y7 < c.min_y || !c.started) {
						c.min_y = y7;
					}
					c.started = true;
					if(cx > c.max_x || !c.started) {
						c.max_x = cx;
					}
					if(cy > c.max_y || !c.started) {
						c.max_y = cy;
					}
					if(cx < c.min_x || !c.started) {
						c.min_x = cx;
					}
					if(cy < c.min_y || !c.started) {
						c.min_y = cy;
					}
					c.started = true;
					if(cx11 > c.max_x || !c.started) {
						c.max_x = cx11;
					}
					if(cy11 > c.max_y || !c.started) {
						c.max_y = cy11;
					}
					if(cx11 < c.min_x || !c.started) {
						c.min_x = cx11;
					}
					if(cy11 < c.min_y || !c.started) {
						c.min_y = cy11;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x7,y7,cx,cy);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx11 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy11 , Int);
				}
				c.num_vertices++;
				i += 6;
			}
			break;
		case 11:
			if(subr_stack_height <= 0) {
				return false;
			}
			b = _g1[--subr_stack_height];
			clear_stack = false;
			break;
		case 12:
			var dx1;
			var dx2;
			var dx3;
			var dx4;
			var dx5;
			var dx6;
			var dy1;
			var dy2;
			var dy3;
			var dy4;
			var dy5;
			var dy6;
			var dx;
			var dy;
			var b1;
			if(b.cursor >= b.data.get_length()) {
				b1 = 0;
			} else {
				var pos1 = b.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				b1 = b.data.readU8(pos1);
			}
			switch(b1) {
			case 34:
				if(sp < 7) {
					return false;
				}
				dx1 = _g[0];
				dx2 = _g[1];
				dy2 = _g[2];
				dx3 = _g[3];
				dx4 = _g[4];
				dx5 = _g[5];
				dx6 = _g[6];
				var cx12 = c.x + dx1;
				var cy12 = c.y;
				var cx21 = cx12 + dx2;
				var cy21 = cy12 + dy2;
				c.x = cx21 + dx3;
				c.y = cy21;
				var x8 = c.x | 0;
				var y8 = c.y | 0;
				var cx3 = cx12 | 0;
				var cy3 = cy12 | 0;
				var cx13 = cx21 | 0;
				var cy13 = cy21 | 0;
				if(c.bounds) {
					if(x8 > c.max_x || !c.started) {
						c.max_x = x8;
					}
					if(y8 > c.max_y || !c.started) {
						c.max_y = y8;
					}
					if(x8 < c.min_x || !c.started) {
						c.min_x = x8;
					}
					if(y8 < c.min_y || !c.started) {
						c.min_y = y8;
					}
					c.started = true;
					if(cx3 > c.max_x || !c.started) {
						c.max_x = cx3;
					}
					if(cy3 > c.max_y || !c.started) {
						c.max_y = cy3;
					}
					if(cx3 < c.min_x || !c.started) {
						c.min_x = cx3;
					}
					if(cy3 < c.min_y || !c.started) {
						c.min_y = cy3;
					}
					c.started = true;
					if(cx13 > c.max_x || !c.started) {
						c.max_x = cx13;
					}
					if(cy13 > c.max_y || !c.started) {
						c.max_y = cy13;
					}
					if(cx13 < c.min_x || !c.started) {
						c.min_x = cx13;
					}
					if(cy13 < c.min_y || !c.started) {
						c.min_y = cy13;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x8,y8,cx3,cy3);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx13 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy13 , Int);
				}
				c.num_vertices++;
				var cx14 = c.x + dx4;
				var cy14 = c.y;
				var cx22 = cx14 + dx5;
				var cy22 = cy14 + -dy2;
				c.x = cx22 + dx6;
				c.y = cy22;
				var x9 = c.x | 0;
				var y9 = c.y | 0;
				var cx4 = cx14 | 0;
				var cy4 = cy14 | 0;
				var cx15 = cx22 | 0;
				var cy15 = cy22 | 0;
				if(c.bounds) {
					if(x9 > c.max_x || !c.started) {
						c.max_x = x9;
					}
					if(y9 > c.max_y || !c.started) {
						c.max_y = y9;
					}
					if(x9 < c.min_x || !c.started) {
						c.min_x = x9;
					}
					if(y9 < c.min_y || !c.started) {
						c.min_y = y9;
					}
					c.started = true;
					if(cx4 > c.max_x || !c.started) {
						c.max_x = cx4;
					}
					if(cy4 > c.max_y || !c.started) {
						c.max_y = cy4;
					}
					if(cx4 < c.min_x || !c.started) {
						c.min_x = cx4;
					}
					if(cy4 < c.min_y || !c.started) {
						c.min_y = cy4;
					}
					c.started = true;
					if(cx15 > c.max_x || !c.started) {
						c.max_x = cx15;
					}
					if(cy15 > c.max_y || !c.started) {
						c.max_y = cy15;
					}
					if(cx15 < c.min_x || !c.started) {
						c.min_x = cx15;
					}
					if(cy15 < c.min_y || !c.started) {
						c.min_y = cy15;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x9,y9,cx4,cy4);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx15 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy15 , Int);
				}
				c.num_vertices++;
				break;
			case 35:
				if(sp < 13) {
					return false;
				}
				dx1 = _g[0];
				dy1 = _g[1];
				dx2 = _g[2];
				dy2 = _g[3];
				dx3 = _g[4];
				dy3 = _g[5];
				dx4 = _g[6];
				dy4 = _g[7];
				dx5 = _g[8];
				dy5 = _g[9];
				dx6 = _g[10];
				dy6 = _g[11];
				var cx16 = c.x + dx1;
				var cy16 = c.y + dy1;
				var cx23 = cx16 + dx2;
				var cy23 = cy16 + dy2;
				c.x = cx23 + dx3;
				c.y = cy23 + dy3;
				var x10 = c.x | 0;
				var y10 = c.y | 0;
				var cx5 = cx16 | 0;
				var cy5 = cy16 | 0;
				var cx17 = cx23 | 0;
				var cy17 = cy23 | 0;
				if(c.bounds) {
					if(x10 > c.max_x || !c.started) {
						c.max_x = x10;
					}
					if(y10 > c.max_y || !c.started) {
						c.max_y = y10;
					}
					if(x10 < c.min_x || !c.started) {
						c.min_x = x10;
					}
					if(y10 < c.min_y || !c.started) {
						c.min_y = y10;
					}
					c.started = true;
					if(cx5 > c.max_x || !c.started) {
						c.max_x = cx5;
					}
					if(cy5 > c.max_y || !c.started) {
						c.max_y = cy5;
					}
					if(cx5 < c.min_x || !c.started) {
						c.min_x = cx5;
					}
					if(cy5 < c.min_y || !c.started) {
						c.min_y = cy5;
					}
					c.started = true;
					if(cx17 > c.max_x || !c.started) {
						c.max_x = cx17;
					}
					if(cy17 > c.max_y || !c.started) {
						c.max_y = cy17;
					}
					if(cx17 < c.min_x || !c.started) {
						c.min_x = cx17;
					}
					if(cy17 < c.min_y || !c.started) {
						c.min_y = cy17;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x10,y10,cx5,cy5);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx17 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy17 , Int);
				}
				c.num_vertices++;
				var cx18 = c.x + dx4;
				var cy18 = c.y + dy4;
				var cx24 = cx18 + dx5;
				var cy24 = cy18 + dy5;
				c.x = cx24 + dx6;
				c.y = cy24 + dy6;
				var x11 = c.x | 0;
				var y11 = c.y | 0;
				var cx6 = cx18 | 0;
				var cy6 = cy18 | 0;
				var cx19 = cx24 | 0;
				var cy19 = cy24 | 0;
				if(c.bounds) {
					if(x11 > c.max_x || !c.started) {
						c.max_x = x11;
					}
					if(y11 > c.max_y || !c.started) {
						c.max_y = y11;
					}
					if(x11 < c.min_x || !c.started) {
						c.min_x = x11;
					}
					if(y11 < c.min_y || !c.started) {
						c.min_y = y11;
					}
					c.started = true;
					if(cx6 > c.max_x || !c.started) {
						c.max_x = cx6;
					}
					if(cy6 > c.max_y || !c.started) {
						c.max_y = cy6;
					}
					if(cx6 < c.min_x || !c.started) {
						c.min_x = cx6;
					}
					if(cy6 < c.min_y || !c.started) {
						c.min_y = cy6;
					}
					c.started = true;
					if(cx19 > c.max_x || !c.started) {
						c.max_x = cx19;
					}
					if(cy19 > c.max_y || !c.started) {
						c.max_y = cy19;
					}
					if(cx19 < c.min_x || !c.started) {
						c.min_x = cx19;
					}
					if(cy19 < c.min_y || !c.started) {
						c.min_y = cy19;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x11,y11,cx6,cy6);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx19 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy19 , Int);
				}
				c.num_vertices++;
				break;
			case 36:
				if(sp < 9) {
					return false;
				}
				dx1 = _g[0];
				dy1 = _g[1];
				dx2 = _g[2];
				dy2 = _g[3];
				dx3 = _g[4];
				dx4 = _g[5];
				dx5 = _g[6];
				dy5 = _g[7];
				dx6 = _g[8];
				var cx110 = c.x + dx1;
				var cy110 = c.y + dy1;
				var cx25 = cx110 + dx2;
				var cy25 = cy110 + dy2;
				c.x = cx25 + dx3;
				c.y = cy25;
				var x12 = c.x | 0;
				var y12 = c.y | 0;
				var cx7 = cx110 | 0;
				var cy7 = cy110 | 0;
				var cx111 = cx25 | 0;
				var cy111 = cy25 | 0;
				if(c.bounds) {
					if(x12 > c.max_x || !c.started) {
						c.max_x = x12;
					}
					if(y12 > c.max_y || !c.started) {
						c.max_y = y12;
					}
					if(x12 < c.min_x || !c.started) {
						c.min_x = x12;
					}
					if(y12 < c.min_y || !c.started) {
						c.min_y = y12;
					}
					c.started = true;
					if(cx7 > c.max_x || !c.started) {
						c.max_x = cx7;
					}
					if(cy7 > c.max_y || !c.started) {
						c.max_y = cy7;
					}
					if(cx7 < c.min_x || !c.started) {
						c.min_x = cx7;
					}
					if(cy7 < c.min_y || !c.started) {
						c.min_y = cy7;
					}
					c.started = true;
					if(cx111 > c.max_x || !c.started) {
						c.max_x = cx111;
					}
					if(cy111 > c.max_y || !c.started) {
						c.max_y = cy111;
					}
					if(cx111 < c.min_x || !c.started) {
						c.min_x = cx111;
					}
					if(cy111 < c.min_y || !c.started) {
						c.min_y = cy111;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x12,y12,cx7,cy7);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx111 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy111 , Int);
				}
				c.num_vertices++;
				var cx112 = c.x + dx4;
				var cy112 = c.y;
				var cx26 = cx112 + dx5;
				var cy26 = cy112 + dy5;
				c.x = cx26 + dx6;
				c.y = cy26 + -(dy1 + dy2 + dy5);
				var x13 = c.x | 0;
				var y13 = c.y | 0;
				var cx8 = cx112 | 0;
				var cy8 = cy112 | 0;
				var cx113 = cx26 | 0;
				var cy113 = cy26 | 0;
				if(c.bounds) {
					if(x13 > c.max_x || !c.started) {
						c.max_x = x13;
					}
					if(y13 > c.max_y || !c.started) {
						c.max_y = y13;
					}
					if(x13 < c.min_x || !c.started) {
						c.min_x = x13;
					}
					if(y13 < c.min_y || !c.started) {
						c.min_y = y13;
					}
					c.started = true;
					if(cx8 > c.max_x || !c.started) {
						c.max_x = cx8;
					}
					if(cy8 > c.max_y || !c.started) {
						c.max_y = cy8;
					}
					if(cx8 < c.min_x || !c.started) {
						c.min_x = cx8;
					}
					if(cy8 < c.min_y || !c.started) {
						c.min_y = cy8;
					}
					c.started = true;
					if(cx113 > c.max_x || !c.started) {
						c.max_x = cx113;
					}
					if(cy113 > c.max_y || !c.started) {
						c.max_y = cy113;
					}
					if(cx113 < c.min_x || !c.started) {
						c.min_x = cx113;
					}
					if(cy113 < c.min_y || !c.started) {
						c.min_y = cy113;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x13,y13,cx8,cy8);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx113 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy113 , Int);
				}
				c.num_vertices++;
				break;
			case 37:
				if(sp < 11) {
					return false;
				}
				dx1 = _g[0];
				dy1 = _g[1];
				dx2 = _g[2];
				dy2 = _g[3];
				dx3 = _g[4];
				dy3 = _g[5];
				dx4 = _g[6];
				dy4 = _g[7];
				dx5 = _g[8];
				dy5 = _g[9];
				dy6 = _g[10];
				dx6 = dy6;
				dx = dx1 + dx2 + dx3 + dx4 + dx5;
				dy = dy1 + dy2 + dy3 + dy4 + dy5;
				if(Math.abs(dx) > Math.abs(dy)) {
					dy6 = -dy;
				} else {
					dx6 = -dx;
				}
				var cx114 = c.x + dx1;
				var cy114 = c.y + dy1;
				var cx27 = cx114 + dx2;
				var cy27 = cy114 + dy2;
				c.x = cx27 + dx3;
				c.y = cy27 + dy3;
				var x14 = c.x | 0;
				var y14 = c.y | 0;
				var cx9 = cx114 | 0;
				var cy9 = cy114 | 0;
				var cx115 = cx27 | 0;
				var cy115 = cy27 | 0;
				if(c.bounds) {
					if(x14 > c.max_x || !c.started) {
						c.max_x = x14;
					}
					if(y14 > c.max_y || !c.started) {
						c.max_y = y14;
					}
					if(x14 < c.min_x || !c.started) {
						c.min_x = x14;
					}
					if(y14 < c.min_y || !c.started) {
						c.min_y = y14;
					}
					c.started = true;
					if(cx9 > c.max_x || !c.started) {
						c.max_x = cx9;
					}
					if(cy9 > c.max_y || !c.started) {
						c.max_y = cy9;
					}
					if(cx9 < c.min_x || !c.started) {
						c.min_x = cx9;
					}
					if(cy9 < c.min_y || !c.started) {
						c.min_y = cy9;
					}
					c.started = true;
					if(cx115 > c.max_x || !c.started) {
						c.max_x = cx115;
					}
					if(cy115 > c.max_y || !c.started) {
						c.max_y = cy115;
					}
					if(cx115 < c.min_x || !c.started) {
						c.min_x = cx115;
					}
					if(cy115 < c.min_y || !c.started) {
						c.min_y = cy115;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x14,y14,cx9,cy9);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx115 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy115 , Int);
				}
				c.num_vertices++;
				var cx116 = c.x + dx4;
				var cy116 = c.y + dy4;
				var cx28 = cx116 + dx5;
				var cy28 = cy116 + dy5;
				c.x = cx28 + dx6;
				c.y = cy28 + dy6;
				var x15 = c.x | 0;
				var y15 = c.y | 0;
				var cx10 = cx116 | 0;
				var cy10 = cy116 | 0;
				var cx117 = cx28 | 0;
				var cy117 = cy28 | 0;
				if(c.bounds) {
					if(x15 > c.max_x || !c.started) {
						c.max_x = x15;
					}
					if(y15 > c.max_y || !c.started) {
						c.max_y = y15;
					}
					if(x15 < c.min_x || !c.started) {
						c.min_x = x15;
					}
					if(y15 < c.min_y || !c.started) {
						c.min_y = y15;
					}
					c.started = true;
					if(cx10 > c.max_x || !c.started) {
						c.max_x = cx10;
					}
					if(cy10 > c.max_y || !c.started) {
						c.max_y = cy10;
					}
					if(cx10 < c.min_x || !c.started) {
						c.min_x = cx10;
					}
					if(cy10 < c.min_y || !c.started) {
						c.min_y = cy10;
					}
					c.started = true;
					if(cx117 > c.max_x || !c.started) {
						c.max_x = cx117;
					}
					if(cy117 > c.max_y || !c.started) {
						c.max_y = cy117;
					}
					if(cx117 < c.min_x || !c.started) {
						c.min_x = cx117;
					}
					if(cy117 < c.min_y || !c.started) {
						c.min_y = cy117;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x15,y15,cx10,cy10);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx117 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy117 , Int);
				}
				c.num_vertices++;
				break;
			default:
				return false;
			}
			break;
		case 14:
			if(c.first_x != c.x || c.first_y != c.y) {
				var x16 = c.first_x | 0;
				var y16 = c.first_y | 0;
				if(c.bounds) {
					if(x16 > c.max_x || !c.started) {
						c.max_x = x16;
					}
					if(y16 > c.max_y || !c.started) {
						c.max_y = y16;
					}
					if(x16 < c.min_x || !c.started) {
						c.min_x = x16;
					}
					if(y16 < c.min_y || !c.started) {
						c.min_y = y16;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x16,y16,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			return true;
		case 19:case 20:
			if(in_header) {
				maskbits += sp / 2 | 0;
			}
			in_header = false;
			var o = b.cursor + ((maskbits + 7) / 8 | 0);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			break;
		case 21:
			in_header = false;
			if(sp < 2) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x17 = c.first_x | 0;
				var y17 = c.first_y | 0;
				if(c.bounds) {
					if(x17 > c.max_x || !c.started) {
						c.max_x = x17;
					}
					if(y17 > c.max_y || !c.started) {
						c.max_y = y17;
					}
					if(x17 < c.min_x || !c.started) {
						c.min_x = x17;
					}
					if(y17 < c.min_y || !c.started) {
						c.min_y = y17;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x17,y17,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x + _g[sp - 2];
			c.first_y = c.y = c.y + _g[sp - 1];
			var x18 = c.x | 0;
			var y18 = c.y | 0;
			if(c.bounds) {
				if(x18 > c.max_x || !c.started) {
					c.max_x = x18;
				}
				if(y18 > c.max_y || !c.started) {
					c.max_y = y18;
				}
				if(x18 < c.min_x || !c.started) {
					c.min_x = x18;
				}
				if(y18 < c.min_y || !c.started) {
					c.min_y = y18;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x18,y18,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 22:
			in_header = false;
			if(sp < 1) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x19 = c.first_x | 0;
				var y19 = c.first_y | 0;
				if(c.bounds) {
					if(x19 > c.max_x || !c.started) {
						c.max_x = x19;
					}
					if(y19 > c.max_y || !c.started) {
						c.max_y = y19;
					}
					if(x19 < c.min_x || !c.started) {
						c.min_x = x19;
					}
					if(y19 < c.min_y || !c.started) {
						c.min_y = y19;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x19,y19,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x + _g[sp - 1];
			c.first_y = c.y = c.y;
			var x20 = c.x | 0;
			var y20 = c.y | 0;
			if(c.bounds) {
				if(x20 > c.max_x || !c.started) {
					c.max_x = x20;
				}
				if(y20 > c.max_y || !c.started) {
					c.max_y = y20;
				}
				if(x20 < c.min_x || !c.started) {
					c.min_x = x20;
				}
				if(y20 < c.min_y || !c.started) {
					c.min_y = y20;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x20,y20,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 24:
			if(sp < 8) {
				return false;
			}
			while(i + 5 < sp - 2) {
				var cx118 = c.x + _g[i];
				var cy118 = c.y + _g[i + 1];
				var cx29 = cx118 + _g[i + 2];
				var cy29 = cy118 + _g[i + 3];
				c.x = cx29 + _g[i + 4];
				c.y = cy29 + _g[i + 5];
				var x21 = c.x | 0;
				var y21 = c.y | 0;
				var cx20 = cx118 | 0;
				var cy20 = cy118 | 0;
				var cx119 = cx29 | 0;
				var cy119 = cy29 | 0;
				if(c.bounds) {
					if(x21 > c.max_x || !c.started) {
						c.max_x = x21;
					}
					if(y21 > c.max_y || !c.started) {
						c.max_y = y21;
					}
					if(x21 < c.min_x || !c.started) {
						c.min_x = x21;
					}
					if(y21 < c.min_y || !c.started) {
						c.min_y = y21;
					}
					c.started = true;
					if(cx20 > c.max_x || !c.started) {
						c.max_x = cx20;
					}
					if(cy20 > c.max_y || !c.started) {
						c.max_y = cy20;
					}
					if(cx20 < c.min_x || !c.started) {
						c.min_x = cx20;
					}
					if(cy20 < c.min_y || !c.started) {
						c.min_y = cy20;
					}
					c.started = true;
					if(cx119 > c.max_x || !c.started) {
						c.max_x = cx119;
					}
					if(cy119 > c.max_y || !c.started) {
						c.max_y = cy119;
					}
					if(cx119 < c.min_x || !c.started) {
						c.min_x = cx119;
					}
					if(cy119 < c.min_y || !c.started) {
						c.min_y = cy119;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x21,y21,cx20,cy20);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx119 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy119 , Int);
				}
				c.num_vertices++;
				i += 6;
			}
			if(i + 1 >= sp) {
				return false;
			}
			c.x += _g[i];
			c.y += _g[i + 1];
			var x22 = c.x | 0;
			var y22 = c.y | 0;
			if(c.bounds) {
				if(x22 > c.max_x || !c.started) {
					c.max_x = x22;
				}
				if(y22 > c.max_y || !c.started) {
					c.max_y = y22;
				}
				if(x22 < c.min_x || !c.started) {
					c.min_x = x22;
				}
				if(y22 < c.min_y || !c.started) {
					c.min_y = y22;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x22,y22,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 25:
			if(sp < 8) {
				return false;
			}
			while(i + 1 < sp - 6) {
				c.x += _g[i];
				c.y += _g[i + 1];
				var x23 = c.x | 0;
				var y23 = c.y | 0;
				if(c.bounds) {
					if(x23 > c.max_x || !c.started) {
						c.max_x = x23;
					}
					if(y23 > c.max_y || !c.started) {
						c.max_y = y23;
					}
					if(x23 < c.min_x || !c.started) {
						c.min_x = x23;
					}
					if(y23 < c.min_y || !c.started) {
						c.min_y = y23;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x23,y23,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				i += 2;
			}
			if(i + 5 >= sp) {
				return false;
			}
			var cx120 = c.x + _g[i];
			var cy120 = c.y + _g[i + 1];
			var cx210 = cx120 + _g[i + 2];
			var cy210 = cy120 + _g[i + 3];
			c.x = cx210 + _g[i + 4];
			c.y = cy210 + _g[i + 5];
			var x24 = c.x | 0;
			var y24 = c.y | 0;
			var cx30 = cx120 | 0;
			var cy30 = cy120 | 0;
			var cx121 = cx210 | 0;
			var cy121 = cy210 | 0;
			if(c.bounds) {
				if(x24 > c.max_x || !c.started) {
					c.max_x = x24;
				}
				if(y24 > c.max_y || !c.started) {
					c.max_y = y24;
				}
				if(x24 < c.min_x || !c.started) {
					c.min_x = x24;
				}
				if(y24 < c.min_y || !c.started) {
					c.min_y = y24;
				}
				c.started = true;
				if(cx30 > c.max_x || !c.started) {
					c.max_x = cx30;
				}
				if(cy30 > c.max_y || !c.started) {
					c.max_y = cy30;
				}
				if(cx30 < c.min_x || !c.started) {
					c.min_x = cx30;
				}
				if(cy30 < c.min_y || !c.started) {
					c.min_y = cy30;
				}
				c.started = true;
				if(cx121 > c.max_x || !c.started) {
					c.max_x = cx121;
				}
				if(cy121 > c.max_y || !c.started) {
					c.max_y = cy121;
				}
				if(cx121 < c.min_x || !c.started) {
					c.min_x = cx121;
				}
				if(cy121 < c.min_y || !c.started) {
					c.min_y = cy121;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x24,y24,cx30,cy30);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx121 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy121 , Int);
			}
			c.num_vertices++;
			break;
		case 26:case 27:
			if(sp < 4) {
				return false;
			}
			f = 0.0;
			if((sp & 1) != 0) {
				f = _g[0];
				i = 1;
			}
			while(i + 3 < sp) {
				if(b0 == 27) {
					var cx122 = c.x + _g[i];
					var cy122 = c.y + f;
					var cx211 = cx122 + _g[i + 1];
					var cy211 = cy122 + _g[i + 2];
					c.x = cx211 + _g[i + 3];
					c.y = cy211;
					var x25 = c.x | 0;
					var y25 = c.y | 0;
					var cx31 = cx122 | 0;
					var cy31 = cy122 | 0;
					var cx123 = cx211 | 0;
					var cy123 = cy211 | 0;
					if(c.bounds) {
						if(x25 > c.max_x || !c.started) {
							c.max_x = x25;
						}
						if(y25 > c.max_y || !c.started) {
							c.max_y = y25;
						}
						if(x25 < c.min_x || !c.started) {
							c.min_x = x25;
						}
						if(y25 < c.min_y || !c.started) {
							c.min_y = y25;
						}
						c.started = true;
						if(cx31 > c.max_x || !c.started) {
							c.max_x = cx31;
						}
						if(cy31 > c.max_y || !c.started) {
							c.max_y = cy31;
						}
						if(cx31 < c.min_x || !c.started) {
							c.min_x = cx31;
						}
						if(cy31 < c.min_y || !c.started) {
							c.min_y = cy31;
						}
						c.started = true;
						if(cx123 > c.max_x || !c.started) {
							c.max_x = cx123;
						}
						if(cy123 > c.max_y || !c.started) {
							c.max_y = cy123;
						}
						if(cx123 < c.min_x || !c.started) {
							c.min_x = cx123;
						}
						if(cy123 < c.min_y || !c.started) {
							c.min_y = cy123;
						}
						c.started = true;
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x25,y25,cx31,cy31);
						c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx123 , Int);
						c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy123 , Int);
					}
					c.num_vertices++;
				} else {
					var cx124 = c.x + f;
					var cy124 = c.y + _g[i];
					var cx212 = cx124 + _g[i + 1];
					var cy212 = cy124 + _g[i + 2];
					c.x = cx212;
					c.y = cy212 + _g[i + 3];
					var x26 = c.x | 0;
					var y26 = c.y | 0;
					var cx32 = cx124 | 0;
					var cy32 = cy124 | 0;
					var cx125 = cx212 | 0;
					var cy125 = cy212 | 0;
					if(c.bounds) {
						if(x26 > c.max_x || !c.started) {
							c.max_x = x26;
						}
						if(y26 > c.max_y || !c.started) {
							c.max_y = y26;
						}
						if(x26 < c.min_x || !c.started) {
							c.min_x = x26;
						}
						if(y26 < c.min_y || !c.started) {
							c.min_y = y26;
						}
						c.started = true;
						if(cx32 > c.max_x || !c.started) {
							c.max_x = cx32;
						}
						if(cy32 > c.max_y || !c.started) {
							c.max_y = cy32;
						}
						if(cx32 < c.min_x || !c.started) {
							c.min_x = cx32;
						}
						if(cy32 < c.min_y || !c.started) {
							c.min_y = cy32;
						}
						c.started = true;
						if(cx125 > c.max_x || !c.started) {
							c.max_x = cx125;
						}
						if(cy125 > c.max_y || !c.started) {
							c.max_y = cy125;
						}
						if(cx125 < c.min_x || !c.started) {
							c.min_x = cx125;
						}
						if(cy125 < c.min_y || !c.started) {
							c.min_y = cy125;
						}
						c.started = true;
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x26,y26,cx32,cy32);
						c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx125 , Int);
						c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy125 , Int);
					}
					c.num_vertices++;
				}
				f = 0.0;
				i += 4;
			}
			break;
		case 10:case 29:
			if(b0 == 10) {
				if(!has_subrs) {
					if(info.fdselect.data.get_length() != 0) {
						var fdselect = info.fdselect;
						var nranges;
						var start;
						var end;
						var v1;
						var fmt;
						var fdselector = -1;
						if(0 > fdselect.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						fdselect.cursor = 0 > fdselect.data.get_length() ? fdselect.data.get_length() : 0;
						if(fdselect.cursor >= fdselect.data.get_length()) {
							fmt = 0;
						} else {
							var pos2 = fdselect.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							fmt = fdselect.data.readU8(pos2);
						}
						if(fmt == 0) {
							var o1 = fdselect.cursor + glyph_index;
							if(o1 > fdselect.data.get_length() || o1 < 0) {
								throw haxe_Exception.thrown("Error");
							}
							fdselect.cursor = o1 > fdselect.data.get_length() || o1 < 0 ? fdselect.data.get_length() : o1;
							if(fdselect.cursor >= fdselect.data.get_length()) {
								fdselector = 0;
							} else {
								var pos3 = fdselect.cursor++;
								if(pos3 == null) {
									pos3 = 0;
								}
								fdselector = fdselect.data.readU8(pos3);
							}
						} else if(fmt == 3) {
							var v2 = 0;
							var _g2 = 0;
							while(_g2 < 2) {
								++_g2;
								var v3;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v3 = 0;
								} else {
									var pos4 = fdselect.cursor++;
									if(pos4 == null) {
										pos4 = 0;
									}
									v3 = fdselect.data.readU8(pos4);
								}
								v2 = v2 << 8 | v3;
							}
							nranges = v2;
							var v4 = 0;
							var _g3 = 0;
							while(_g3 < 2) {
								++_g3;
								var v5;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v5 = 0;
								} else {
									var pos5 = fdselect.cursor++;
									if(pos5 == null) {
										pos5 = 0;
									}
									v5 = fdselect.data.readU8(pos5);
								}
								v4 = v4 << 8 | v5;
							}
							start = v4;
							var _g4 = 0;
							while(_g4 < nranges) {
								++_g4;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v1 = 0;
								} else {
									var pos6 = fdselect.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v1 = fdselect.data.readU8(pos6);
								}
								var v6 = 0;
								var _g5 = 0;
								while(_g5 < 2) {
									++_g5;
									var v7;
									if(fdselect.cursor >= fdselect.data.get_length()) {
										v7 = 0;
									} else {
										var pos7 = fdselect.cursor++;
										if(pos7 == null) {
											pos7 = 0;
										}
										v7 = fdselect.data.readU8(pos7);
									}
									v6 = v6 << 8 | v7;
								}
								end = v6;
								if(glyph_index >= start && glyph_index < end) {
									fdselector = v1;
									break;
								}
								start = end;
							}
						}
						if(fdselector == -1) {
							var r = new kha_graphics2_truetype_Stbtt_$_$buf();
							r.data = null;
							r.cursor = 0;
						}
						var cff = info.cff;
						var b2 = info.fontdicts;
						if(0 > b2.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						b2.cursor = 0 > b2.data.get_length() ? b2.data.get_length() : 0;
						var v8 = 0;
						var _g6 = 0;
						while(_g6 < 2) {
							++_g6;
							var v9;
							if(b2.cursor >= b2.data.get_length()) {
								v9 = 0;
							} else {
								var pos8 = b2.cursor++;
								if(pos8 == null) {
									pos8 = 0;
								}
								v9 = b2.data.readU8(pos8);
							}
							v8 = v8 << 8 | v9;
						}
						var count = v8;
						var offsize;
						if(b2.cursor >= b2.data.get_length()) {
							offsize = 0;
						} else {
							var pos9 = b2.cursor++;
							if(pos9 == null) {
								pos9 = 0;
							}
							offsize = b2.data.readU8(pos9);
						}
						if(!(fdselector >= 0 && fdselector < count)) {
							throw haxe_Exception.thrown("Error");
						}
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var o2 = b2.cursor + fdselector * offsize;
						if(o2 > b2.data.get_length() || o2 < 0) {
							throw haxe_Exception.thrown("Error");
						}
						b2.cursor = o2 > b2.data.get_length() || o2 < 0 ? b2.data.get_length() : o2;
						var v10 = 0;
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var _g7 = 0;
						var _g8 = offsize;
						while(_g7 < _g8) {
							++_g7;
							var v11;
							if(b2.cursor >= b2.data.get_length()) {
								v11 = 0;
							} else {
								var pos10 = b2.cursor++;
								if(pos10 == null) {
									pos10 = 0;
								}
								v11 = b2.data.readU8(pos10);
							}
							v10 = v10 << 8 | v11;
						}
						var start1 = v10;
						var v12 = 0;
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var _g9 = 0;
						var _g10 = offsize;
						while(_g9 < _g10) {
							++_g9;
							var v13;
							if(b2.cursor >= b2.data.get_length()) {
								v13 = 0;
							} else {
								var pos11 = b2.cursor++;
								if(pos11 == null) {
									pos11 = 0;
								}
								v13 = b2.data.readU8(pos11);
							}
							v12 = v12 << 8 | v13;
						}
						var o3 = 2 + (count + 1) * offsize + start1;
						var s = v12 - start1;
						var r1 = new kha_graphics2_truetype_Stbtt_$_$buf();
						r1.data = null;
						r1.cursor = 0;
						var fontdict;
						if(o3 < 0 || s < 0 || o3 > b2.data.get_length() || s > b2.data.get_length() - o3) {
							fontdict = r1;
						} else {
							r1.data = b2.data.sub(o3,s);
							fontdict = r1;
						}
						var subrsoff = [0];
						var private_loc = [0,0];
						var i1 = 0;
						if(0 > fontdict.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
						var ret = null;
						while(fontdict.cursor < fontdict.data.get_length()) {
							var start2 = fontdict.cursor;
							var op;
							while(true) {
								var subrs1;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									subrs1 = 0;
								} else {
									var pos12 = fontdict.cursor;
									if(pos12 == null) {
										pos12 = 0;
									}
									subrs1 = fontdict.data.readU8(pos12);
								}
								if(!(subrs1 >= 28)) {
									break;
								}
								var v14;
								var b01;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									b01 = 0;
								} else {
									var pos13 = fontdict.cursor;
									if(pos13 == null) {
										pos13 = 0;
									}
									b01 = fontdict.data.readU8(pos13);
								}
								if(b01 < 28) {
									throw haxe_Exception.thrown("Error");
								}
								if(b01 == 30) {
									var o4 = fontdict.cursor + 1;
									if(o4 > fontdict.data.get_length() || o4 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									fontdict.cursor = o4 > fontdict.data.get_length() || o4 < 0 ? fontdict.data.get_length() : o4;
									while(fontdict.cursor < fontdict.data.get_length()) {
										if(fontdict.cursor >= fontdict.data.get_length()) {
											v14 = 0;
										} else {
											var pos14 = fontdict.cursor++;
											if(pos14 == null) {
												pos14 = 0;
											}
											v14 = fontdict.data.readU8(pos14);
										}
										if((v14 & 15) == 15 || v14 >> 4 == 15) {
											break;
										}
									}
								} else {
									var b02;
									if(fontdict.cursor >= fontdict.data.get_length()) {
										b02 = 0;
									} else {
										var pos15 = fontdict.cursor++;
										if(pos15 == null) {
											pos15 = 0;
										}
										b02 = fontdict.data.readU8(pos15);
									}
									if(!(b02 >= 32 && b02 <= 246)) {
										if(b02 >= 247 && b02 <= 250) {
											if(fontdict.cursor < fontdict.data.get_length()) {
												var pos16 = fontdict.cursor++;
												if(pos16 == null) {
													pos16 = 0;
												}
												fontdict.data.readU8(pos16);
											}
										} else if(b02 >= 251 && b02 <= 254) {
											if(fontdict.cursor < fontdict.data.get_length()) {
												var pos17 = fontdict.cursor++;
												if(pos17 == null) {
													pos17 = 0;
												}
												fontdict.data.readU8(pos17);
											}
										} else if(b02 == 28) {
											var _g11 = 0;
											while(_g11 < 2) {
												++_g11;
												if(fontdict.cursor < fontdict.data.get_length()) {
													var pos18 = fontdict.cursor++;
													if(pos18 == null) {
														pos18 = 0;
													}
													fontdict.data.readU8(pos18);
												}
											}
										} else if(b02 == 29) {
											var _g12 = 0;
											while(_g12 < 4) {
												++_g12;
												if(fontdict.cursor < fontdict.data.get_length()) {
													var pos19 = fontdict.cursor++;
													if(pos19 == null) {
														pos19 = 0;
													}
													fontdict.data.readU8(pos19);
												}
											}
										} else {
											throw haxe_Exception.thrown("Error");
										}
									}
								}
							}
							var end1 = fontdict.cursor;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								op = 0;
							} else {
								var pos20 = fontdict.cursor++;
								if(pos20 == null) {
									pos20 = 0;
								}
								op = fontdict.data.readU8(pos20);
							}
							if(op == 12) {
								var op1;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									op1 = 0;
								} else {
									var pos21 = fontdict.cursor++;
									if(pos21 == null) {
										pos21 = 0;
									}
									op1 = fontdict.data.readU8(pos21);
								}
								op = op1 | 256;
							}
							if(op == 18) {
								var s1 = end1 - start2;
								var r2 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r2.data = null;
								r2.cursor = 0;
								if(start2 < 0 || s1 < 0 || start2 > fontdict.data.get_length() || s1 > fontdict.data.get_length() - start2) {
									ret = r2;
								} else {
									r2.data = fontdict.data.sub(start2,s1);
									ret = r2;
								}
								break;
							}
						}
						var operands;
						if(ret != null) {
							operands = ret;
						} else {
							var r3 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r3.data = null;
							r3.cursor = 0;
							if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
								operands = r3;
							} else {
								r3.data = fontdict.data.sub(0,0);
								operands = r3;
							}
						}
						while(i1 < 2 && operands.cursor < operands.data.get_length()) {
							var b03;
							if(operands.cursor >= operands.data.get_length()) {
								b03 = 0;
							} else {
								var pos22 = operands.cursor++;
								if(pos22 == null) {
									pos22 = 0;
								}
								b03 = operands.data.readU8(pos22);
							}
							var subrs2;
							if(b03 >= 32 && b03 <= 246) {
								subrs2 = b03 - 139;
							} else if(b03 >= 247 && b03 <= 250) {
								var subrs3;
								if(operands.cursor >= operands.data.get_length()) {
									subrs3 = 0;
								} else {
									var pos23 = operands.cursor++;
									if(pos23 == null) {
										pos23 = 0;
									}
									subrs3 = operands.data.readU8(pos23);
								}
								subrs2 = (b03 - 247) * 256 + subrs3 + 108;
							} else if(b03 >= 251 && b03 <= 254) {
								var subrs4;
								if(operands.cursor >= operands.data.get_length()) {
									subrs4 = 0;
								} else {
									var pos24 = operands.cursor++;
									if(pos24 == null) {
										pos24 = 0;
									}
									subrs4 = operands.data.readU8(pos24);
								}
								subrs2 = -(b03 - 251) * 256 - subrs4 - 108;
							} else if(b03 == 28) {
								var v15 = 0;
								var _g13 = 0;
								while(_g13 < 2) {
									++_g13;
									var v16;
									if(operands.cursor >= operands.data.get_length()) {
										v16 = 0;
									} else {
										var pos25 = operands.cursor++;
										if(pos25 == null) {
											pos25 = 0;
										}
										v16 = operands.data.readU8(pos25);
									}
									v15 = v15 << 8 | v16;
								}
								subrs2 = v15;
							} else if(b03 == 29) {
								var v17 = 0;
								var _g14 = 0;
								while(_g14 < 4) {
									++_g14;
									var v18;
									if(operands.cursor >= operands.data.get_length()) {
										v18 = 0;
									} else {
										var pos26 = operands.cursor++;
										if(pos26 == null) {
											pos26 = 0;
										}
										v18 = operands.data.readU8(pos26);
									}
									v17 = v17 << 8 | v18;
								}
								subrs2 = v17;
							} else {
								throw haxe_Exception.thrown("Error");
							}
							private_loc[i1] = subrs2;
							++i1;
						}
						if(private_loc[1] == 0 || private_loc[0] == 0) {
							var r4 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r4.data = null;
							r4.cursor = 0;
							subrs = r4;
						} else {
							var o5 = private_loc[1];
							var s2 = private_loc[0];
							var r5 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r5.data = null;
							r5.cursor = 0;
							var pdict;
							if(o5 < 0 || s2 < 0 || o5 > cff.data.get_length() || s2 > cff.data.get_length() - o5) {
								pdict = r5;
							} else {
								r5.data = cff.data.sub(o5,s2);
								pdict = r5;
							}
							var i2 = 0;
							if(0 > pdict.data.get_length()) {
								throw haxe_Exception.thrown("Error");
							}
							pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
							var ret1 = null;
							while(pdict.cursor < pdict.data.get_length()) {
								var start3 = pdict.cursor;
								var op2;
								while(true) {
									var subrs5;
									if(pdict.cursor >= pdict.data.get_length()) {
										subrs5 = 0;
									} else {
										var pos27 = pdict.cursor;
										if(pos27 == null) {
											pos27 = 0;
										}
										subrs5 = pdict.data.readU8(pos27);
									}
									if(!(subrs5 >= 28)) {
										break;
									}
									var v19;
									var b04;
									if(pdict.cursor >= pdict.data.get_length()) {
										b04 = 0;
									} else {
										var pos28 = pdict.cursor;
										if(pos28 == null) {
											pos28 = 0;
										}
										b04 = pdict.data.readU8(pos28);
									}
									if(b04 < 28) {
										throw haxe_Exception.thrown("Error");
									}
									if(b04 == 30) {
										var o6 = pdict.cursor + 1;
										if(o6 > pdict.data.get_length() || o6 < 0) {
											throw haxe_Exception.thrown("Error");
										}
										pdict.cursor = o6 > pdict.data.get_length() || o6 < 0 ? pdict.data.get_length() : o6;
										while(pdict.cursor < pdict.data.get_length()) {
											if(pdict.cursor >= pdict.data.get_length()) {
												v19 = 0;
											} else {
												var pos29 = pdict.cursor++;
												if(pos29 == null) {
													pos29 = 0;
												}
												v19 = pdict.data.readU8(pos29);
											}
											if((v19 & 15) == 15 || v19 >> 4 == 15) {
												break;
											}
										}
									} else {
										var b05;
										if(pdict.cursor >= pdict.data.get_length()) {
											b05 = 0;
										} else {
											var pos30 = pdict.cursor++;
											if(pos30 == null) {
												pos30 = 0;
											}
											b05 = pdict.data.readU8(pos30);
										}
										if(!(b05 >= 32 && b05 <= 246)) {
											if(b05 >= 247 && b05 <= 250) {
												if(pdict.cursor < pdict.data.get_length()) {
													var pos31 = pdict.cursor++;
													if(pos31 == null) {
														pos31 = 0;
													}
													pdict.data.readU8(pos31);
												}
											} else if(b05 >= 251 && b05 <= 254) {
												if(pdict.cursor < pdict.data.get_length()) {
													var pos32 = pdict.cursor++;
													if(pos32 == null) {
														pos32 = 0;
													}
													pdict.data.readU8(pos32);
												}
											} else if(b05 == 28) {
												var _g15 = 0;
												while(_g15 < 2) {
													++_g15;
													if(pdict.cursor < pdict.data.get_length()) {
														var pos33 = pdict.cursor++;
														if(pos33 == null) {
															pos33 = 0;
														}
														pdict.data.readU8(pos33);
													}
												}
											} else if(b05 == 29) {
												var _g16 = 0;
												while(_g16 < 4) {
													++_g16;
													if(pdict.cursor < pdict.data.get_length()) {
														var pos34 = pdict.cursor++;
														if(pos34 == null) {
															pos34 = 0;
														}
														pdict.data.readU8(pos34);
													}
												}
											} else {
												throw haxe_Exception.thrown("Error");
											}
										}
									}
								}
								var end2 = pdict.cursor;
								if(pdict.cursor >= pdict.data.get_length()) {
									op2 = 0;
								} else {
									var pos35 = pdict.cursor++;
									if(pos35 == null) {
										pos35 = 0;
									}
									op2 = pdict.data.readU8(pos35);
								}
								if(op2 == 12) {
									var op3;
									if(pdict.cursor >= pdict.data.get_length()) {
										op3 = 0;
									} else {
										var pos36 = pdict.cursor++;
										if(pos36 == null) {
											pos36 = 0;
										}
										op3 = pdict.data.readU8(pos36);
									}
									op2 = op3 | 256;
								}
								if(op2 == 19) {
									var s3 = end2 - start3;
									var r6 = new kha_graphics2_truetype_Stbtt_$_$buf();
									r6.data = null;
									r6.cursor = 0;
									if(start3 < 0 || s3 < 0 || start3 > pdict.data.get_length() || s3 > pdict.data.get_length() - start3) {
										ret1 = r6;
									} else {
										r6.data = pdict.data.sub(start3,s3);
										ret1 = r6;
									}
									break;
								}
							}
							var operands1;
							if(ret1 != null) {
								operands1 = ret1;
							} else {
								var r7 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r7.data = null;
								r7.cursor = 0;
								if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
									operands1 = r7;
								} else {
									r7.data = pdict.data.sub(0,0);
									operands1 = r7;
								}
							}
							while(i2 < 1 && operands1.cursor < operands1.data.get_length()) {
								var b06;
								if(operands1.cursor >= operands1.data.get_length()) {
									b06 = 0;
								} else {
									var pos37 = operands1.cursor++;
									if(pos37 == null) {
										pos37 = 0;
									}
									b06 = operands1.data.readU8(pos37);
								}
								var subrs6;
								if(b06 >= 32 && b06 <= 246) {
									subrs6 = b06 - 139;
								} else if(b06 >= 247 && b06 <= 250) {
									var subrs7;
									if(operands1.cursor >= operands1.data.get_length()) {
										subrs7 = 0;
									} else {
										var pos38 = operands1.cursor++;
										if(pos38 == null) {
											pos38 = 0;
										}
										subrs7 = operands1.data.readU8(pos38);
									}
									subrs6 = (b06 - 247) * 256 + subrs7 + 108;
								} else if(b06 >= 251 && b06 <= 254) {
									var subrs8;
									if(operands1.cursor >= operands1.data.get_length()) {
										subrs8 = 0;
									} else {
										var pos39 = operands1.cursor++;
										if(pos39 == null) {
											pos39 = 0;
										}
										subrs8 = operands1.data.readU8(pos39);
									}
									subrs6 = -(b06 - 251) * 256 - subrs8 - 108;
								} else if(b06 == 28) {
									var v20 = 0;
									var _g17 = 0;
									while(_g17 < 2) {
										++_g17;
										var v21;
										if(operands1.cursor >= operands1.data.get_length()) {
											v21 = 0;
										} else {
											var pos40 = operands1.cursor++;
											if(pos40 == null) {
												pos40 = 0;
											}
											v21 = operands1.data.readU8(pos40);
										}
										v20 = v20 << 8 | v21;
									}
									subrs6 = v20;
								} else if(b06 == 29) {
									var v22 = 0;
									var _g18 = 0;
									while(_g18 < 4) {
										++_g18;
										var v23;
										if(operands1.cursor >= operands1.data.get_length()) {
											v23 = 0;
										} else {
											var pos41 = operands1.cursor++;
											if(pos41 == null) {
												pos41 = 0;
											}
											v23 = operands1.data.readU8(pos41);
										}
										v22 = v22 << 8 | v23;
									}
									subrs6 = v22;
								} else {
									throw haxe_Exception.thrown("Error");
								}
								subrsoff[i2] = subrs6;
								++i2;
							}
							if(subrsoff[0] == 0) {
								var r8 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r8.data = null;
								r8.cursor = 0;
								subrs = r8;
							} else {
								var o7 = private_loc[1] + subrsoff[0];
								if(o7 > cff.data.get_length() || o7 < 0) {
									throw haxe_Exception.thrown("Error");
								}
								cff.cursor = o7 > cff.data.get_length() || o7 < 0 ? cff.data.get_length() : o7;
								var start4 = cff.cursor;
								var v24 = 0;
								var _g19 = 0;
								while(_g19 < 2) {
									++_g19;
									var v25;
									if(cff.cursor >= cff.data.get_length()) {
										v25 = 0;
									} else {
										var pos42 = cff.cursor++;
										if(pos42 == null) {
											pos42 = 0;
										}
										v25 = cff.data.readU8(pos42);
									}
									v24 = v24 << 8 | v25;
								}
								var count1 = v24;
								if(count1 > 0) {
									var offsize1;
									if(cff.cursor >= cff.data.get_length()) {
										offsize1 = 0;
									} else {
										var pos43 = cff.cursor++;
										if(pos43 == null) {
											pos43 = 0;
										}
										offsize1 = cff.data.readU8(pos43);
									}
									if(!(offsize1 >= 1 && offsize1 <= 4)) {
										throw haxe_Exception.thrown("Error");
									}
									var o8 = cff.cursor + offsize1 * count1;
									if(o8 > cff.data.get_length() || o8 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									cff.cursor = o8 > cff.data.get_length() || o8 < 0 ? cff.data.get_length() : o8;
									var v26 = 0;
									if(!(offsize1 >= 1 && offsize1 <= 4)) {
										throw haxe_Exception.thrown("Error");
									}
									var _g20 = 0;
									var _g21 = offsize1;
									while(_g20 < _g21) {
										++_g20;
										var v27;
										if(cff.cursor >= cff.data.get_length()) {
											v27 = 0;
										} else {
											var pos44 = cff.cursor++;
											if(pos44 == null) {
												pos44 = 0;
											}
											v27 = cff.data.readU8(pos44);
										}
										v26 = v26 << 8 | v27;
									}
									var o9 = cff.cursor + (v26 - 1);
									if(o9 > cff.data.get_length() || o9 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									cff.cursor = o9 > cff.data.get_length() || o9 < 0 ? cff.data.get_length() : o9;
									var s4 = cff.cursor - start4;
									var r9 = new kha_graphics2_truetype_Stbtt_$_$buf();
									r9.data = null;
									r9.cursor = 0;
									if(start4 < 0 || s4 < 0 || start4 > cff.data.get_length() || s4 > cff.data.get_length() - start4) {
										subrs = r9;
									} else {
										r9.data = cff.data.sub(start4,s4);
										subrs = r9;
									}
								} else {
									subrs = cff;
								}
							}
						}
					}
					has_subrs = true;
				}
			}
			if(sp < 1) {
				return false;
			}
			v = _g[--sp] | 0;
			if(subr_stack_height >= 10) {
				return false;
			}
			_g1[subr_stack_height++] = b;
			var idx = b0 == 10 ? subrs : info.gsubrs;
			var n = v;
			if(0 > idx.data.get_length()) {
				throw haxe_Exception.thrown("Error");
			}
			idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
			var v28 = 0;
			var _g22 = 0;
			while(_g22 < 2) {
				++_g22;
				var v29;
				if(idx.cursor >= idx.data.get_length()) {
					v29 = 0;
				} else {
					var pos45 = idx.cursor++;
					if(pos45 == null) {
						pos45 = 0;
					}
					v29 = idx.data.readU8(pos45);
				}
				v28 = v28 << 8 | v29;
			}
			var count2 = v28;
			var bias = 107;
			if(count2 >= 33900) {
				bias = 32768;
			} else if(count2 >= 1240) {
				bias = 1131;
			}
			n = v + bias;
			if(n < 0 || n >= count2) {
				var r10 = new kha_graphics2_truetype_Stbtt_$_$buf();
				r10.data = null;
				r10.cursor = 0;
				b = r10;
			} else {
				if(0 > idx.data.get_length()) {
					throw haxe_Exception.thrown("Error");
				}
				idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
				var v30 = 0;
				var _g23 = 0;
				while(_g23 < 2) {
					++_g23;
					var v31;
					if(idx.cursor >= idx.data.get_length()) {
						v31 = 0;
					} else {
						var pos46 = idx.cursor++;
						if(pos46 == null) {
							pos46 = 0;
						}
						v31 = idx.data.readU8(pos46);
					}
					v30 = v30 << 8 | v31;
				}
				var count3 = v30;
				var offsize2;
				if(idx.cursor >= idx.data.get_length()) {
					offsize2 = 0;
				} else {
					var pos47 = idx.cursor++;
					if(pos47 == null) {
						pos47 = 0;
					}
					offsize2 = idx.data.readU8(pos47);
				}
				if(!(n >= 0 && n < count3)) {
					throw haxe_Exception.thrown("Error");
				}
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o10 = idx.cursor + n * offsize2;
				if(o10 > idx.data.get_length() || o10 < 0) {
					throw haxe_Exception.thrown("Error");
				}
				idx.cursor = o10 > idx.data.get_length() || o10 < 0 ? idx.data.get_length() : o10;
				var v32 = 0;
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g24 = 0;
				var _g25 = offsize2;
				while(_g24 < _g25) {
					++_g24;
					var v33;
					if(idx.cursor >= idx.data.get_length()) {
						v33 = 0;
					} else {
						var pos48 = idx.cursor++;
						if(pos48 == null) {
							pos48 = 0;
						}
						v33 = idx.data.readU8(pos48);
					}
					v32 = v32 << 8 | v33;
				}
				var start5 = v32;
				var v34 = 0;
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g26 = 0;
				var _g27 = offsize2;
				while(_g26 < _g27) {
					++_g26;
					var v35;
					if(idx.cursor >= idx.data.get_length()) {
						v35 = 0;
					} else {
						var pos49 = idx.cursor++;
						if(pos49 == null) {
							pos49 = 0;
						}
						v35 = idx.data.readU8(pos49);
					}
					v34 = v34 << 8 | v35;
				}
				var o11 = 2 + (count3 + 1) * offsize2 + start5;
				var s5 = v34 - start5;
				var r11 = new kha_graphics2_truetype_Stbtt_$_$buf();
				r11.data = null;
				r11.cursor = 0;
				if(o11 < 0 || s5 < 0 || o11 > idx.data.get_length() || s5 > idx.data.get_length() - o11) {
					b = r11;
				} else {
					r11.data = idx.data.sub(o11,s5);
					b = r11;
				}
			}
			if(b.data.get_length() == 0) {
				return false;
			}
			b.cursor = 0;
			clear_stack = false;
			break;
		case 30:
			if(sp < 4) {
				return false;
			}
			while(i + 3 < sp) {
				var cx126 = c.x;
				var cy126 = c.y + _g[i];
				var cx213 = cx126 + _g[i + 1];
				var cy213 = cy126 + _g[i + 2];
				c.x = cx213 + _g[i + 3];
				c.y = cy213 + (sp - i == 5 ? _g[i + 4] : 0);
				var x27 = c.x | 0;
				var y27 = c.y | 0;
				var cx33 = cx126 | 0;
				var cy33 = cy126 | 0;
				var cx127 = cx213 | 0;
				var cy127 = cy213 | 0;
				if(c.bounds) {
					if(x27 > c.max_x || !c.started) {
						c.max_x = x27;
					}
					if(y27 > c.max_y || !c.started) {
						c.max_y = y27;
					}
					if(x27 < c.min_x || !c.started) {
						c.min_x = x27;
					}
					if(y27 < c.min_y || !c.started) {
						c.min_y = y27;
					}
					c.started = true;
					if(cx33 > c.max_x || !c.started) {
						c.max_x = cx33;
					}
					if(cy33 > c.max_y || !c.started) {
						c.max_y = cy33;
					}
					if(cx33 < c.min_x || !c.started) {
						c.min_x = cx33;
					}
					if(cy33 < c.min_y || !c.started) {
						c.min_y = cy33;
					}
					c.started = true;
					if(cx127 > c.max_x || !c.started) {
						c.max_x = cx127;
					}
					if(cy127 > c.max_y || !c.started) {
						c.max_y = cy127;
					}
					if(cx127 < c.min_x || !c.started) {
						c.min_x = cx127;
					}
					if(cy127 < c.min_y || !c.started) {
						c.min_y = cy127;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x27,y27,cx33,cy33);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx127 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy127 , Int);
				}
				c.num_vertices++;
				i += 4;
				if(i + 3 >= sp) {
					break;
				}
				var cx128 = c.x + _g[i];
				var cy128 = c.y;
				var cx214 = cx128 + _g[i + 1];
				var cy214 = cy128 + _g[i + 2];
				c.x = cx214 + (sp - i == 5 ? _g[i + 4] : 0);
				c.y = cy214 + _g[i + 3];
				var x28 = c.x | 0;
				var y28 = c.y | 0;
				var cx34 = cx128 | 0;
				var cy34 = cy128 | 0;
				var cx129 = cx214 | 0;
				var cy129 = cy214 | 0;
				if(c.bounds) {
					if(x28 > c.max_x || !c.started) {
						c.max_x = x28;
					}
					if(y28 > c.max_y || !c.started) {
						c.max_y = y28;
					}
					if(x28 < c.min_x || !c.started) {
						c.min_x = x28;
					}
					if(y28 < c.min_y || !c.started) {
						c.min_y = y28;
					}
					c.started = true;
					if(cx34 > c.max_x || !c.started) {
						c.max_x = cx34;
					}
					if(cy34 > c.max_y || !c.started) {
						c.max_y = cy34;
					}
					if(cx34 < c.min_x || !c.started) {
						c.min_x = cx34;
					}
					if(cy34 < c.min_y || !c.started) {
						c.min_y = cy34;
					}
					c.started = true;
					if(cx129 > c.max_x || !c.started) {
						c.max_x = cx129;
					}
					if(cy129 > c.max_y || !c.started) {
						c.max_y = cy129;
					}
					if(cx129 < c.min_x || !c.started) {
						c.min_x = cx129;
					}
					if(cy129 < c.min_y || !c.started) {
						c.min_y = cy129;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x28,y28,cx34,cy34);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx129 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy129 , Int);
				}
				c.num_vertices++;
				i += 4;
			}
			break;
		case 31:
			if(sp < 4) {
				return false;
			}
			while(i + 3 < sp) {
				var cx130 = c.x + _g[i];
				var cy130 = c.y;
				var cx215 = cx130 + _g[i + 1];
				var cy215 = cy130 + _g[i + 2];
				c.x = cx215 + (sp - i == 5 ? _g[i + 4] : 0);
				c.y = cy215 + _g[i + 3];
				var x29 = c.x | 0;
				var y29 = c.y | 0;
				var cx35 = cx130 | 0;
				var cy35 = cy130 | 0;
				var cx131 = cx215 | 0;
				var cy131 = cy215 | 0;
				if(c.bounds) {
					if(x29 > c.max_x || !c.started) {
						c.max_x = x29;
					}
					if(y29 > c.max_y || !c.started) {
						c.max_y = y29;
					}
					if(x29 < c.min_x || !c.started) {
						c.min_x = x29;
					}
					if(y29 < c.min_y || !c.started) {
						c.min_y = y29;
					}
					c.started = true;
					if(cx35 > c.max_x || !c.started) {
						c.max_x = cx35;
					}
					if(cy35 > c.max_y || !c.started) {
						c.max_y = cy35;
					}
					if(cx35 < c.min_x || !c.started) {
						c.min_x = cx35;
					}
					if(cy35 < c.min_y || !c.started) {
						c.min_y = cy35;
					}
					c.started = true;
					if(cx131 > c.max_x || !c.started) {
						c.max_x = cx131;
					}
					if(cy131 > c.max_y || !c.started) {
						c.max_y = cy131;
					}
					if(cx131 < c.min_x || !c.started) {
						c.min_x = cx131;
					}
					if(cy131 < c.min_y || !c.started) {
						c.min_y = cy131;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x29,y29,cx35,cy35);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx131 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy131 , Int);
				}
				c.num_vertices++;
				i += 4;
				if(i + 3 >= sp) {
					break;
				}
				var cx132 = c.x;
				var cy132 = c.y + _g[i];
				var cx216 = cx132 + _g[i + 1];
				var cy216 = cy132 + _g[i + 2];
				c.x = cx216 + _g[i + 3];
				c.y = cy216 + (sp - i == 5 ? _g[i + 4] : 0);
				var x30 = c.x | 0;
				var y30 = c.y | 0;
				var cx36 = cx132 | 0;
				var cy36 = cy132 | 0;
				var cx133 = cx216 | 0;
				var cy133 = cy216 | 0;
				if(c.bounds) {
					if(x30 > c.max_x || !c.started) {
						c.max_x = x30;
					}
					if(y30 > c.max_y || !c.started) {
						c.max_y = y30;
					}
					if(x30 < c.min_x || !c.started) {
						c.min_x = x30;
					}
					if(y30 < c.min_y || !c.started) {
						c.min_y = y30;
					}
					c.started = true;
					if(cx36 > c.max_x || !c.started) {
						c.max_x = cx36;
					}
					if(cy36 > c.max_y || !c.started) {
						c.max_y = cy36;
					}
					if(cx36 < c.min_x || !c.started) {
						c.min_x = cx36;
					}
					if(cy36 < c.min_y || !c.started) {
						c.min_y = cy36;
					}
					c.started = true;
					if(cx133 > c.max_x || !c.started) {
						c.max_x = cx133;
					}
					if(cy133 > c.max_y || !c.started) {
						c.max_y = cy133;
					}
					if(cx133 < c.min_x || !c.started) {
						c.min_x = cx133;
					}
					if(cy133 < c.min_y || !c.started) {
						c.min_y = cy133;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x30,y30,cx36,cy36);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx133 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy133 , Int);
				}
				c.num_vertices++;
				i += 4;
			}
			break;
		default:
			if(b0 != 255 && b0 != 28 && (b0 < 32 || b0 > 254)) {
				return false;
			}
			if(b0 == 255) {
				var v36 = 0;
				var _g28 = 0;
				while(_g28 < 4) {
					++_g28;
					var v37;
					if(b.cursor >= b.data.get_length()) {
						v37 = 0;
					} else {
						var pos50 = b.cursor++;
						if(pos50 == null) {
							pos50 = 0;
						}
						v37 = b.data.readU8(pos50);
					}
					v36 = v36 << 8 | v37;
				}
				f = v36 / 65536;
			} else {
				var o12 = b.cursor + (-1);
				if(o12 > b.data.get_length() || o12 < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o12 > b.data.get_length() || o12 < 0 ? b.data.get_length() : o12;
				var b07;
				if(b.cursor >= b.data.get_length()) {
					b07 = 0;
				} else {
					var pos51 = b.cursor++;
					if(pos51 == null) {
						pos51 = 0;
					}
					b07 = b.data.readU8(pos51);
				}
				if(b07 >= 32 && b07 <= 246) {
					f = b07 - 139;
				} else if(b07 >= 247 && b07 <= 250) {
					var f1;
					if(b.cursor >= b.data.get_length()) {
						f1 = 0;
					} else {
						var pos52 = b.cursor++;
						if(pos52 == null) {
							pos52 = 0;
						}
						f1 = b.data.readU8(pos52);
					}
					f = (b07 - 247) * 256 + f1 + 108;
				} else if(b07 >= 251 && b07 <= 254) {
					var f2;
					if(b.cursor >= b.data.get_length()) {
						f2 = 0;
					} else {
						var pos53 = b.cursor++;
						if(pos53 == null) {
							pos53 = 0;
						}
						f2 = b.data.readU8(pos53);
					}
					f = -(b07 - 251) * 256 - f2 - 108;
				} else if(b07 == 28) {
					var v38 = 0;
					var _g29 = 0;
					while(_g29 < 2) {
						++_g29;
						var v39;
						if(b.cursor >= b.data.get_length()) {
							v39 = 0;
						} else {
							var pos54 = b.cursor++;
							if(pos54 == null) {
								pos54 = 0;
							}
							v39 = b.data.readU8(pos54);
						}
						v38 = v38 << 8 | v39;
					}
					f = v38;
				} else if(b07 == 29) {
					var v40 = 0;
					var _g30 = 0;
					while(_g30 < 4) {
						++_g30;
						var v41;
						if(b.cursor >= b.data.get_length()) {
							v41 = 0;
						} else {
							var pos55 = b.cursor++;
							if(pos55 == null) {
								pos55 = 0;
							}
							v41 = b.data.readU8(pos55);
						}
						v40 = v40 << 8 | v41;
					}
					f = v40;
				} else {
					throw haxe_Exception.thrown("Error");
				}
			}
			if(sp >= 48) {
				return false;
			}
			_g[sp++] = f;
			clear_stack = false;
		}
		if(clear_stack) {
			sp = 0;
		}
	}
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeT2 = function(info,glyph_index) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = true;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var tmp1 = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp1.bounds = false;
	tmp1.started = false;
	tmp1.first_x = 0;
	tmp1.first_y = 0;
	tmp1.x = 0;
	tmp1.y = 0;
	tmp1.min_x = 0;
	tmp1.min_y = 0;
	tmp1.max_x = 0;
	tmp1.max_y = 0;
	tmp1.pvertices = null;
	tmp1.num_vertices = 0;
	if(kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,tmp)) {
		tmp1.pvertices = new Array(tmp.num_vertices);
		var _g = 0;
		var _g1 = tmp.num_vertices;
		while(_g < _g1) tmp1.pvertices[_g++] = new kha_graphics2_truetype_Stbtt_$vertex();
		if(kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,tmp1)) {
			if(tmp1.num_vertices != tmp.num_vertices) {
				throw haxe_Exception.thrown("Error");
			}
			return tmp1.pvertices;
		}
	}
	return null;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2 = function(info,glyph_index,rect) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = true;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var r = kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,tmp);
	if(rect != null) {
		rect.x0 = r ? tmp.min_x : 0;
		rect.y0 = r ? tmp.min_y : 0;
		rect.x1 = r ? tmp.max_x : 0;
		rect.y1 = r ? tmp.max_y : 0;
	}
	if(r) {
		return tmp.num_vertices;
	} else {
		return 0;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape = function(info,glyph_index) {
	if(info.cff.data == null || info.cff.data.get_length() == 0) {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeTT(info,glyph_index);
	} else {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeT2(info,glyph_index);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics = function(info,glyph_index) {
	var p = info.data;
	var pos = info.hhea + 34;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var numOfLongHorMetrics = p.readU8(pos + 1) | ch1 << 8;
	var metrics = new kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics();
	if(glyph_index < numOfLongHorMetrics) {
		var p = info.data;
		var pos = info.hmtx + 4 * glyph_index;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		metrics.advanceWidth = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = info.hmtx + 4 * glyph_index + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		metrics.leftSideBearing = (n & 32768) != 0 ? n - 65536 : n;
	} else {
		var p = info.data;
		var pos = info.hmtx + 4 * (numOfLongHorMetrics - 1);
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		metrics.advanceWidth = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = info.hmtx + 4 * numOfLongHorMetrics + 2 * (glyph_index - numOfLongHorMetrics);
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var n = p.readU8(pos + 1) | ch1 << 8;
		metrics.leftSideBearing = (n & 32768) != 0 ? n - 65536 : n;
	}
	return metrics;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontVMetrics = function(info) {
	var metrics = new kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics();
	var p = info.data;
	var pos = info.hhea + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var n = p.readU8(pos + 1) | ch1 << 8;
	metrics.ascent = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.hhea + 6;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var n = p.readU8(pos + 1) | ch1 << 8;
	metrics.descent = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.hhea + 8;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var n = p.readU8(pos + 1) | ch1 << 8;
	metrics.lineGap = (n & 32768) != 0 ? n - 65536 : n;
	return metrics;
};
kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight = function(info,height) {
	var p = info.data;
	var pos = info.hhea + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var n = p.readU8(pos + 1) | ch1 << 8;
	var p = info.data;
	var pos = info.hhea + 6;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var n1 = p.readU8(pos + 1) | ch1 << 8;
	return height / (((n & 32768) != 0 ? n - 65536 : n) - ((n1 & 32768) != 0 ? n1 - 65536 : n1));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel = function(font,glyph,scale_x,scale_y,shift_x,shift_y) {
	var rect = new kha_graphics2_truetype_Stbtt_$temp_$rect();
	if(!kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox(font,glyph,rect)) {
		rect.x0 = 0;
		rect.y0 = 0;
		rect.x1 = 0;
		rect.y1 = 0;
	} else {
		var y0 = rect.y0;
		rect.x0 = Math.floor(rect.x0 * scale_x + shift_x);
		rect.y0 = Math.floor(-rect.y1 * scale_y + shift_y);
		rect.x1 = Math.ceil(rect.x1 * scale_x + shift_x);
		rect.y1 = Math.ceil(-y0 * scale_y + shift_y);
	}
	return rect;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBox = function(font,glyph,scale_x,scale_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(font,glyph,scale_x,scale_y,0.0,0.0);
};
kha_graphics2_truetype_StbTruetype.stbtt__new_active = function(e,eIndex,off_x,start_point) {
	var z = new kha_graphics2_truetype_Stbtt_$_$active_$edge();
	var dxdy = (e[eIndex].x1 - e[eIndex].x0) / (e[eIndex].y1 - e[eIndex].y0);
	if(z == null) {
		throw haxe_Exception.thrown("Error");
	}
	if(z == null) {
		return z;
	}
	z.fdx = dxdy;
	z.fdy = dxdy != 0.0 ? 1.0 / dxdy : 0.0;
	z.fx = e[eIndex].x0 + dxdy * (start_point - e[eIndex].y0);
	z.fx -= off_x;
	z.direction = e[eIndex].invert ? 1.0 : -1.0;
	z.sy = e[eIndex].y0;
	z.ey = e[eIndex].y1;
	z.next = null;
	return z;
};
kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge = function(scanline,scanlineIndex,x,e,x0,y0,x1,y1) {
	if(y0 == y1) {
		return;
	}
	if(!(y0 < y1)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(e.sy <= e.ey)) {
		throw haxe_Exception.thrown("Error");
	}
	if(y0 > e.ey) {
		return;
	}
	if(y1 < e.sy) {
		return;
	}
	if(y0 < e.sy) {
		x0 += (x1 - x0) * (e.sy - y0) / (y1 - y0);
		y0 = e.sy;
	}
	if(y1 > e.ey) {
		x1 += (x1 - x0) * (e.ey - y1) / (y1 - y0);
		y1 = e.ey;
	}
	if(x0 == x) {
		if(!(x1 <= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 == x + 1) {
		if(!(x1 >= x)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 <= x) {
		if(!(x1 <= x)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 >= x + 1) {
		if(!(x1 >= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(!(x1 >= x && x1 <= x + 1)) {
		throw haxe_Exception.thrown("Error");
	}
	if(x0 <= x && x1 <= x) {
		scanline[scanlineIndex + x] += e.direction * (y1 - y0);
	} else if(!(x0 >= x + 1 && x1 >= x + 1)) {
		if(!(x0 >= x && x0 <= x + 1 && x1 >= x && x1 <= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
		scanline[scanlineIndex + x] += e.direction * (y1 - y0) * (1 - (x0 - x + (x1 - x)) / 2);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__fill_active_edges_new = function(scanline,scanline_fill,scanline_fillIndex,len,e,y_top) {
	var y_bottom = y_top + 1;
	while(e != null) {
		if(!(e.ey >= y_top)) {
			throw haxe_Exception.thrown("Error");
		}
		if(e.fdx == 0) {
			var x0 = e.fx;
			if(x0 < len) {
				if(x0 >= 0) {
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x0 | 0,e,x0,y_top,x0,y_bottom);
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline_fill,scanline_fillIndex - 1,x0 + 1 | 0,e,x0,y_top,x0,y_bottom);
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline_fill,scanline_fillIndex - 1,0,e,x0,y_top,x0,y_bottom);
				}
			}
		} else {
			var x01 = e.fx;
			var dx = e.fdx;
			var xb = x01 + dx;
			var x_top;
			var x_bottom;
			var sy0;
			var sy1;
			var dy = e.fdy;
			if(!(e.sy <= y_bottom && e.ey >= y_top)) {
				throw haxe_Exception.thrown("Error");
			}
			if(e.sy > y_top) {
				x_top = x01 + dx * (e.sy - y_top);
				sy0 = e.sy;
			} else {
				x_top = x01;
				sy0 = y_top;
			}
			if(e.ey < y_bottom) {
				x_bottom = x01 + dx * (e.ey - y_top);
				sy1 = e.ey;
			} else {
				x_bottom = xb;
				sy1 = y_bottom;
			}
			if(x_top >= 0 && x_bottom >= 0 && x_top < len && x_bottom < len) {
				if((x_top | 0) == (x_bottom | 0)) {
					var x = x_top | 0;
					var height = sy1 - sy0;
					if(!(x >= 0 && x < len)) {
						throw haxe_Exception.thrown("Error");
					}
					scanline[x] += e.direction * (1 - (x_top - x + (x_bottom - x)) / 2) * height;
					scanline_fill[scanline_fillIndex + x] += e.direction * height;
				} else {
					if(x_top > x_bottom) {
						sy0 = y_bottom - (sy0 - y_top);
						sy1 = y_bottom - (sy1 - y_top);
						var t = sy0;
						sy0 = sy1;
						sy1 = t;
						t = x_bottom;
						x_bottom = x_top;
						x_top = t;
						dx = -dx;
						dy = -dy;
						t = x01;
						x01 = xb;
						xb = t;
					}
					var x1 = x_top | 0;
					var x2 = x_bottom | 0;
					var y_crossing = (x1 + 1 - x01) * dy + y_top;
					var sign = e.direction;
					var area = sign * (y_crossing - sy0);
					scanline[x1] += area * (1 - (x_top - x1 + (x1 + 1 - x1)) / 2);
					var step = sign * dy;
					var _g = x1 + 1;
					while(_g < x2) {
						scanline[_g++] += area + step / 2;
						area += step;
					}
					y_crossing += dy * (x2 - (x1 + 1));
					if(!(Math.abs(area) <= 1.01)) {
						throw haxe_Exception.thrown("Error");
					}
					scanline[x2] += area + sign * (1 - (x2 - x2 + (x_bottom - x2)) / 2) * (sy1 - y_crossing);
					scanline_fill[scanline_fillIndex + x2] += sign * (sy1 - sy0);
				}
			} else {
				var _g1 = 0;
				while(_g1 < len) {
					var x3 = _g1++;
					var x11 = x3;
					var x21 = x3 + 1;
					var x31 = xb;
					var y1 = (x3 - x01) / dx + y_top;
					var y2 = (x3 + 1 - x01) / dx + y_top;
					if(x01 < x11 && x31 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x11,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x11,y1,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x21,y2,x31,y_bottom);
					} else if(x31 < x11 && x01 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x21,y2,x11,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x11,y1,x31,y_bottom);
					} else if(x01 < x11 && x31 > x11) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x11,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x11,y1,x31,y_bottom);
					} else if(x31 < x11 && x01 > x11) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x11,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x11,y1,x31,y_bottom);
					} else if(x01 < x21 && x31 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x21,y2,x31,y_bottom);
					} else if(x31 < x21 && x01 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x21,y2,x31,y_bottom);
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x3,e,x01,y_top,x31,y_bottom);
					}
				}
			}
		}
		e = e.next;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__rasterize_sorted_edges = function(result,e,n,vsubsample,off_x,off_y) {
	var active = null;
	var j = 0;
	var scanline;
	var scanline2Index = 0;
	var eIndex = 0;
	if(result.w > 64) {
		scanline = new Array(result.w * 2 + 1);
	} else {
		scanline = new Array(129);
	}
	var scanline2 = scanline;
	scanline2Index = result.w;
	var y = off_y;
	e[n].y0 = off_y + result.h + 1;
	while(j < result.h) {
		var scan_y_top = y + 0.0;
		var scan_y_bottom = y + 1.0;
		var step_value = active;
		var step_parent = null;
		var _g = 0;
		var _g1 = result.w;
		while(_g < _g1) scanline[_g++] = 0;
		var _g2 = 0;
		var _g3 = result.w + 1;
		while(_g2 < _g3) scanline2[scanline2Index + _g2++] = 0;
		while(step_value != null) {
			var z = step_value;
			if(z.ey <= scan_y_top) {
				if(step_parent == null) {
					active = z.next;
					step_value = z.next;
				} else {
					step_parent.next = z.next;
					step_value = z.next;
				}
				if(z.direction == 0) {
					throw haxe_Exception.thrown("Error");
				}
				z.direction = 0;
			} else {
				step_parent = step_value;
				step_value = step_value.next;
			}
		}
		while(e[eIndex].y0 <= scan_y_bottom) {
			if(e[eIndex].y0 != e[eIndex].y1) {
				var z1 = kha_graphics2_truetype_StbTruetype.stbtt__new_active(e,eIndex,off_x,scan_y_top);
				if(!(z1.ey >= scan_y_top)) {
					throw haxe_Exception.thrown("Error");
				}
				if(z1 != null) {
					if(j == 0 && off_y != 0) {
						if(z1.ey < scan_y_top) {
							z1.ey = scan_y_top;
						}
					}
					if(!(z1.ey >= scan_y_top)) {
						throw haxe_Exception.thrown("Error");
					}
				}
				z1.next = active;
				active = z1;
			}
			++eIndex;
		}
		if(active != null) {
			kha_graphics2_truetype_StbTruetype.stbtt__fill_active_edges_new(scanline,scanline2,scanline2Index + 1,result.w,active,scan_y_top);
		}
		var sum = 0;
		var _g4 = 0;
		var _g5 = result.w;
		while(_g4 < _g5) {
			var i = _g4++;
			sum += scanline2[scanline2Index + i];
			var k = scanline[i] + sum;
			k = Math.abs(k) * 255.0 + 0.5;
			var m = k | 0;
			if(m > 255) {
				m = 255;
			}
			result.pixels.writeU8(result.pixels_offset + j * result.stride + i,m);
		}
		step_parent = null;
		step_value = active;
		while(step_value != null) {
			var z2 = step_value;
			z2.fx += z2.fdx;
			step_parent = step_value;
			step_value = step_value.next;
		}
		++y;
		++j;
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__COMPARE = function(a,b) {
	return a.y0 < b.y0;
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_ins_sort = function(p,n) {
	var j;
	var _g = 1;
	while(_g < n) {
		var i = _g++;
		var t = p[i];
		j = i;
		while(j > 0) {
			if(!kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(t,p[j - 1])) {
				break;
			}
			p[j] = p[j - 1];
			--j;
		}
		if(i != j) {
			p[j] = t;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort = function(p,pIndex,n) {
	while(n > 12) {
		var t;
		var c;
		var m = n >> 1;
		var c12 = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex + m],p[pIndex + n - 1]);
		if(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + m]) != c12) {
			c = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + n - 1]);
			var z = c == c12 ? 0 : n - 1;
			t = p[pIndex + z];
			p[pIndex + z] = p[pIndex + m];
			p[pIndex + m] = t;
		}
		t = p[pIndex];
		p[pIndex] = p[pIndex + m];
		p[pIndex + m] = t;
		var i = 1;
		var j = n - 1;
		while(true) {
			while(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex + i],p[pIndex])) ++i;
			while(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + j])) --j;
			if(i >= j) {
				break;
			}
			t = p[pIndex + i];
			p[pIndex + i] = p[pIndex + j];
			p[pIndex + j] = t;
			++i;
			--j;
		}
		if(j < n - i) {
			kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,pIndex,j);
			pIndex += i;
			n -= i;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,pIndex + i,n - i);
			n = j;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges = function(p,n) {
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,0,n);
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_ins_sort(p,n);
};
kha_graphics2_truetype_StbTruetype.stbtt__rasterize = function(result,pts,wcount,windings,scale_x,scale_y,shift_x,shift_y,off_x,off_y,invert) {
	var y_scale_inv = invert ? -scale_y : scale_y;
	var j;
	var n = 0;
	var _g = 0;
	while(_g < windings) n += wcount[_g++];
	var e = new Array(n + 1);
	if(e == null) {
		return;
	} else {
		var _g = 0;
		var _g1 = e.length;
		while(_g < _g1) e[_g++] = new kha_graphics2_truetype_Stbtt_$_$edge();
	}
	n = 0;
	var m = 0;
	var _g = 0;
	while(_g < windings) {
		var i = _g++;
		var pIndex = m;
		m += wcount[i];
		j = wcount[i] - 1;
		var _g1 = 0;
		var _g2 = wcount[i];
		while(_g1 < _g2) {
			var k = _g1++;
			var a = k;
			var b = j;
			if(pts[pIndex + j].y == pts[pIndex + k].y) {
				j = k;
				continue;
			}
			e[n].invert = false;
			if(invert ? pts[pIndex + j].y > pts[pIndex + k].y : pts[pIndex + j].y < pts[pIndex + k].y) {
				e[n].invert = true;
				a = j;
				b = k;
			}
			e[n].x0 = pts[pIndex + a].x * scale_x + shift_x;
			e[n].y0 = pts[pIndex + a].y * y_scale_inv + shift_y;
			e[n].x1 = pts[pIndex + b].x * scale_x + shift_x;
			e[n].y1 = pts[pIndex + b].y * y_scale_inv + shift_y;
			++n;
			j = k;
		}
	}
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges(e,n);
	kha_graphics2_truetype_StbTruetype.stbtt__rasterize_sorted_edges(result,e,n,1,off_x,off_y);
};
kha_graphics2_truetype_StbTruetype.stbtt__add_point = function(points,n,x,y) {
	if(points == null) {
		return;
	}
	points[n].x = x;
	points[n].y = y;
};
kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve = function(points,num_points,x0,y0,x1,y1,x2,y2,objspace_flatness_squared,n) {
	var mx = (x0 + 2 * x1 + x2) / 4;
	var my = (y0 + 2 * y1 + y2) / 4;
	var dx = (x0 + x2) / 2 - mx;
	var dy = (y0 + y2) / 2 - my;
	if(n > 16) {
		return 1;
	}
	if(dx * dx + dy * dy > objspace_flatness_squared) {
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points,x0,y0,(x0 + x1) / 2.0,(y0 + y1) / 2.0,mx,my,objspace_flatness_squared,n + 1);
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points,mx,my,(x1 + x2) / 2.0,(y1 + y2) / 2.0,x2,y2,objspace_flatness_squared,n + 1);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points.value,x2,y2);
		num_points.value += 1;
	}
	return 1;
};
kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic = function(points,num_points,x0,y0,x1,y1,x2,y2,x3,y3,objspace_flatness_squared,n) {
	while(true) {
		var dx0 = x1 - x0;
		var dy0 = y1 - y0;
		var dx1 = x2 - x1;
		var dy1 = y2 - y1;
		var dx2 = x3 - x2;
		var dy2 = y3 - y2;
		var dx = x3 - x0;
		var dy = y3 - y0;
		var longlen = Math.sqrt(dx0 * dx0 + dy0 * dy0) + Math.sqrt(dx1 * dx1 + dy1 * dy1) + Math.sqrt(dx2 * dx2 + dy2 * dy2);
		var shortlen = Math.sqrt(dx * dx + dy * dy);
		if(n > 16) {
			return;
		}
		if(longlen * longlen - shortlen * shortlen > objspace_flatness_squared) {
			var x01 = (x0 + x1) / 2;
			var y01 = (y0 + y1) / 2;
			var x12 = (x1 + x2) / 2;
			var y12 = (y1 + y2) / 2;
			var x23 = (x2 + x3) / 2;
			var y23 = (y2 + y3) / 2;
			var xa = (x01 + x12) / 2;
			var ya = (y01 + y12) / 2;
			var xb = (x12 + x23) / 2;
			var yb = (y12 + y23) / 2;
			var mx = (xa + xb) / 2;
			var my = (ya + yb) / 2;
			kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points,x0,y0,x01,y01,xa,ya,mx,my,objspace_flatness_squared,n + 1);
			x0 = mx;
			y0 = my;
			x1 = xb;
			y1 = yb;
			x2 = x23;
			y2 = y23;
			n += 1;
			continue;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points.value,x3,y3);
			num_points.value += 1;
		}
		return;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_FlattenCurves = function(vertices,num_verts,objspace_flatness,contour_lengths,num_contours) {
	var points = null;
	var num_points = 0;
	var objspace_flatness_squared = objspace_flatness * objspace_flatness;
	var n = 0;
	var start = 0;
	var _g = 0;
	while(_g < num_verts) if(vertices[_g++].type == 1) {
		++n;
	}
	num_contours.value = n;
	if(n == 0) {
		return null;
	}
	contour_lengths.value = new Array(n);
	if(contour_lengths.value == null) {
		num_contours.value = 0;
		return null;
	}
	var _g = 0;
	while(_g < 2) {
		var x = 0;
		var y = 0;
		if(_g++ == 1) {
			points = new Array(num_points);
			if(points == null) {
				contour_lengths.value = null;
				num_contours.value = 0;
				return null;
			} else {
				var _g1 = 0;
				var _g2 = points.length;
				while(_g1 < _g2) points[_g1++] = new kha_graphics2_truetype_Stbtt_$_$point();
			}
		}
		num_points = 0;
		n = -1;
		var _g3 = 0;
		while(_g3 < num_verts) {
			var i = _g3++;
			switch(vertices[i].type) {
			case 1:
				if(n >= 0) {
					contour_lengths.value[n] = num_points - start;
				}
				++n;
				start = num_points;
				x = vertices[i].x;
				y = vertices[i].y;
				kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points++,x,y);
				break;
			case 2:
				x = vertices[i].x;
				y = vertices[i].y;
				kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points++,x,y);
				break;
			case 3:
				var num_points_reference = { value : num_points};
				kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points_reference,x,y,vertices[i].cx,vertices[i].cy,vertices[i].x,vertices[i].y,objspace_flatness_squared,0);
				num_points = num_points_reference.value;
				x = vertices[i].x;
				y = vertices[i].y;
				break;
			case 4:
				var num_points_reference1 = { value : num_points};
				kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points_reference1,x,y,vertices[i].cx,vertices[i].cy,vertices[i].cx1,vertices[i].cy1,vertices[i].x,vertices[i].y,objspace_flatness_squared,0);
				num_points = num_points_reference1.value;
				x = vertices[i].x;
				y = vertices[i].y;
				break;
			}
		}
		contour_lengths.value[n] = num_points - start;
	}
	return points;
};
kha_graphics2_truetype_StbTruetype.stbtt_Rasterize = function(result,flatness_in_pixels,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,x_off,y_off,invert) {
	var winding_count = 0;
	var winding_lengths = null;
	var winding_count_reference = { value : 0};
	var winding_lengths_reference = new kha_graphics2_truetype_VectorOfIntPointer();
	var windings = kha_graphics2_truetype_StbTruetype.stbtt_FlattenCurves(vertices,num_verts,flatness_in_pixels / (scale_x > scale_y ? scale_y : scale_x),winding_lengths_reference,winding_count_reference);
	winding_count = winding_count_reference.value;
	winding_lengths = winding_lengths_reference.value;
	if(windings != null) {
		kha_graphics2_truetype_StbTruetype.stbtt__rasterize(result,windings,winding_lengths,winding_count,scale_x,scale_y,shift_x,shift_y,x_off,y_off,invert);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,glyph) {
	var ix0 = 0;
	var iy0 = 0;
	var vertices = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,glyph);
	var num_verts = vertices == null ? 0 : vertices.length;
	var gbm = new kha_graphics2_truetype_Stbtt_$_$bitmap();
	var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(info,glyph,scale_x,scale_y,shift_x,shift_y);
	ix0 = rect.x0;
	iy0 = rect.y0;
	gbm.pixels = output;
	gbm.pixels_offset = output_offset;
	gbm.w = out_w;
	gbm.h = out_h;
	gbm.stride = out_stride;
	if(gbm.w != 0 && gbm.h != 0) {
		kha_graphics2_truetype_StbTruetype.stbtt_Rasterize(gbm,0.35,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,ix0,iy0,true);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmap = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,glyph) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,0.0,0.0,glyph);
};
kha_graphics2_truetype_StbTruetype.stbtt_BakeFontBitmap = function(data,offset,pixel_height,pixels,pw,ph,chars,chardata) {
	var f = new kha_graphics2_truetype_Stbtt_$fontinfo();
	if(!kha_graphics2_truetype_StbTruetype.stbtt_InitFont(f,data,offset)) {
		return -1;
	}
	var y = 1;
	var x = 1;
	var bottom_y = 1;
	var scale = kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight(f,pixel_height);
	var i = 0;
	var _g = 0;
	while(_g < chars.length) {
		var g = kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(f,chars[_g++]);
		var advance = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics(f,g).advanceWidth;
		var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBox(f,g,scale,scale);
		var x0 = rect.x0;
		var y0 = rect.y0;
		var gw = rect.x1 - x0;
		var gh = rect.y1 - y0;
		if(x + gw + 1 >= pw) {
			y = bottom_y;
			x = 1;
		}
		if(y + gh + 1 >= ph) {
			return -i;
		}
		if(x + gw >= pw) {
			throw haxe_Exception.thrown("Error");
		}
		if(y + gh >= ph) {
			throw haxe_Exception.thrown("Error");
		}
		chardata[i].x0 = x;
		chardata[i].y0 = y;
		chardata[i].x1 = x + gw;
		chardata[i].y1 = y + gh;
		chardata[i].xadvance = scale * advance;
		chardata[i].xoff = x0;
		chardata[i].yoff = y0;
		x = x + gw + 1;
		if(y + gh + 1 > bottom_y) {
			bottom_y = y + gh + 1;
		}
		++i;
	}
	var _g = 0;
	var _g1 = pw * ph;
	while(_g < _g1) pixels.writeU8(_g++,0);
	i = 0;
	var ch;
	var _g = 0;
	while(_g < chars.length) {
		var g = kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(f,chars[_g++]);
		ch = chardata[i];
		kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmap(f,pixels,ch.x0 + ch.y0 * pw,ch.x1 - ch.x0,ch.y1 - ch.y0,pw,scale,scale,g);
		++i;
	}
	return bottom_y;
};
var kha_graphics4_ConstantLocation = function() { };
$hxClasses["kha.graphics4.ConstantLocation"] = kha_graphics4_ConstantLocation;
kha_graphics4_ConstantLocation.__name__ = true;
kha_graphics4_ConstantLocation.__isInterface__ = true;
var kha_graphics4_CubeMap = function(size,format,renderTarget,depthStencilFormat) {
	this.isDepthAttachment = false;
	this.depthTexture = null;
	this.texture = null;
	this.frameBuffer = null;
	this.myWidth = size;
	this.myHeight = size;
	this.format = format;
	this.renderTarget = renderTarget;
	this.depthStencilFormat = depthStencilFormat;
	if(renderTarget) {
		this.createTexture();
	}
};
$hxClasses["kha.graphics4.CubeMap"] = kha_graphics4_CubeMap;
kha_graphics4_CubeMap.__name__ = true;
kha_graphics4_CubeMap.__interfaces__ = [kha_Resource,kha_Canvas];
kha_graphics4_CubeMap.prototype = {
	myWidth: null
	,myHeight: null
	,format: null
	,renderTarget: null
	,depthStencilFormat: null
	,graphics4: null
	,frameBuffer: null
	,texture: null
	,depthTexture: null
	,isDepthAttachment: null
	,createTexture: function() {
		if(kha_SystemImpl.gl == null) {
			return;
		}
		this.texture = kha_SystemImpl.gl.createTexture();
		kha_SystemImpl.gl.bindTexture(34067,this.texture);
		kha_SystemImpl.gl.texParameteri(34067,10240,9729);
		kha_SystemImpl.gl.texParameteri(34067,10241,9729);
		kha_SystemImpl.gl.texParameteri(34067,10242,33071);
		kha_SystemImpl.gl.texParameteri(34067,10243,33071);
		if(this.renderTarget) {
			this.frameBuffer = kha_SystemImpl.gl.createFramebuffer();
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			switch(this.format) {
			case 0:
				kha_SystemImpl.gl.texImage2D(34069,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34070,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34071,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34072,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34073,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34074,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				break;
			case 2:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 34836 : 6408,this.myWidth,this.myHeight,0,6408,5126,null);
				break;
			case 3:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
				break;
			case 4:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 34842 : 6408,this.myWidth,this.myHeight,0,6408,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			case 5:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 33326 : 6406,this.myWidth,this.myHeight,0,6406,5126,null);
				break;
			case 6:
				kha_SystemImpl.gl.texImage2D(34069,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34070,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34071,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34072,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34073,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				kha_SystemImpl.gl.texImage2D(34074,0,kha_SystemImpl.gl2 ? 33325 : 6406,this.myWidth,this.myHeight,0,6406,kha_SystemImpl.halfFloat.HALF_FLOAT_OES,null);
				break;
			default:
				kha_SystemImpl.gl.texImage2D(34069,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34070,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34071,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34072,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34073,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
				kha_SystemImpl.gl.texImage2D(34074,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
			}
			if(this.format == 3) {
				kha_SystemImpl.gl.texParameteri(34067,10240,9728);
				kha_SystemImpl.gl.texParameteri(34067,10241,9728);
				this.isDepthAttachment = true;
				if(!kha_SystemImpl.gl2) {
					var colortex = kha_SystemImpl.gl.createTexture();
					kha_SystemImpl.gl.bindTexture(34067,colortex);
					kha_SystemImpl.gl.texImage2D(34069,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34069,colortex,0);
					kha_SystemImpl.gl.texImage2D(34070,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34070,colortex,0);
					kha_SystemImpl.gl.texImage2D(34071,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34071,colortex,0);
					kha_SystemImpl.gl.texImage2D(34072,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34072,colortex,0);
					kha_SystemImpl.gl.texImage2D(34073,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34073,colortex,0);
					kha_SystemImpl.gl.texImage2D(34074,0,6408,this.myWidth,this.myHeight,0,6408,5121,null);
					kha_SystemImpl.gl.framebufferTexture2D(36160,36064,34074,colortex,0);
					kha_SystemImpl.gl.bindTexture(34067,this.texture);
				}
			}
			this.initDepthStencilBuffer(this.depthStencilFormat);
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
		}
		kha_SystemImpl.gl.bindTexture(34067,null);
	}
	,initDepthStencilBuffer: function(depthStencilFormat) {
		switch(depthStencilFormat) {
		case 0:
			break;
		case 1:case 5:
			this.depthTexture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(34067,this.depthTexture);
			if(depthStencilFormat == 1) {
				kha_SystemImpl.gl.texImage2D(34067,0,kha_SystemImpl.gl2 ? 33190 : 6402,this.myWidth,this.myHeight,0,6402,5125,null);
			} else {
				kha_SystemImpl.gl.texImage2D(34067,0,kha_SystemImpl.gl2 ? 33189 : 6402,this.myWidth,this.myHeight,0,6402,5123,null);
			}
			kha_SystemImpl.gl.texParameteri(34067,10240,9728);
			kha_SystemImpl.gl.texParameteri(34067,10241,9728);
			kha_SystemImpl.gl.texParameteri(34067,10242,33071);
			kha_SystemImpl.gl.texParameteri(34067,10243,33071);
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			kha_SystemImpl.gl.framebufferTexture2D(36160,36096,34067,this.depthTexture,0);
			break;
		case 2:case 3:case 4:
			this.depthTexture = kha_SystemImpl.gl.createTexture();
			kha_SystemImpl.gl.bindTexture(34067,this.depthTexture);
			kha_SystemImpl.gl.texImage2D(34067,0,kha_SystemImpl.gl2 ? 35056 : 34041,this.myWidth,this.myHeight,0,34041,kha_SystemImpl.depthTexture.UNSIGNED_INT_24_8_WEBGL,null);
			kha_SystemImpl.gl.texParameteri(34067,10240,9728);
			kha_SystemImpl.gl.texParameteri(34067,10241,9728);
			kha_SystemImpl.gl.texParameteri(34067,10242,33071);
			kha_SystemImpl.gl.texParameteri(34067,10243,33071);
			kha_SystemImpl.gl.bindFramebuffer(36160,this.frameBuffer);
			kha_SystemImpl.gl.framebufferTexture2D(36160,33306,34067,this.depthTexture,0);
			break;
		}
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_g4: function() {
		if(this.graphics4 == null) {
			this.graphics4 = new kha_js_graphics4_Graphics(this);
		}
		return this.graphics4;
	}
	,__class__: kha_graphics4_CubeMap
};
var kha_graphics4_FragmentShader = function(sources,files) {
	this.sources = [];
	var _g = 0;
	while(_g < sources.length) this.sources.push(sources[_g++].toString());
	this.type = 35632;
	this.shader = null;
	this.files = files;
};
$hxClasses["kha.graphics4.FragmentShader"] = kha_graphics4_FragmentShader;
kha_graphics4_FragmentShader.__name__ = true;
kha_graphics4_FragmentShader.prototype = {
	sources: null
	,type: null
	,shader: null
	,files: null
	,__class__: kha_graphics4_FragmentShader
};
var kha_graphics4_GeometryShader = function() { };
$hxClasses["kha.graphics4.GeometryShader"] = kha_graphics4_GeometryShader;
kha_graphics4_GeometryShader.__name__ = true;
var kha_graphics4_Graphics = function() { };
$hxClasses["kha.graphics4.Graphics"] = kha_graphics4_Graphics;
kha_graphics4_Graphics.__name__ = true;
kha_graphics4_Graphics.__isInterface__ = true;
kha_graphics4_Graphics.prototype = {
	begin: null
	,end: null
	,clear: null
	,setVertexBuffer: null
	,setIndexBuffer: null
	,setTexture: null
	,setTextureParameters: null
	,setPipeline: null
	,setMatrix: null
	,drawIndexedVertices: null
	,__class__: kha_graphics4_Graphics
};
var kha_graphics4_InternalPipeline = function(pipeline,projectionLocation,textureLocation) {
	this.pipeline = pipeline;
	this.projectionLocation = projectionLocation;
	this.textureLocation = textureLocation;
};
$hxClasses["kha.graphics4.InternalPipeline"] = kha_graphics4_InternalPipeline;
kha_graphics4_InternalPipeline.__name__ = true;
kha_graphics4_InternalPipeline.prototype = {
	pipeline: null
	,projectionLocation: null
	,textureLocation: null
	,__class__: kha_graphics4_InternalPipeline
};
var kha_graphics4_PipelineCache = function() { };
$hxClasses["kha.graphics4.PipelineCache"] = kha_graphics4_PipelineCache;
kha_graphics4_PipelineCache.__name__ = true;
kha_graphics4_PipelineCache.__isInterface__ = true;
kha_graphics4_PipelineCache.prototype = {
	get: null
	,__class__: kha_graphics4_PipelineCache
};
var kha_graphics4_PerFramebufferPipelineCache = function(pipeline,texture) {
	this.pipelines = [];
	pipeline.compile();
	var projectionLocation = null;
	try {
		projectionLocation = pipeline.getConstantLocation("projectionMatrix");
	} catch( _g ) {
		haxe_Log.trace(haxe_Exception.caught(_g).unwrap(),{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 89, className : "kha.graphics4.PerFramebufferPipelineCache", methodName : "new"});
	}
	var textureLocation = null;
	if(texture) {
		try {
			textureLocation = pipeline.getTextureUnit("tex");
		} catch( _g ) {
			haxe_Log.trace(haxe_Exception.caught(_g).unwrap(),{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 98, className : "kha.graphics4.PerFramebufferPipelineCache", methodName : "new"});
		}
	}
	this.pipelines.push(new kha_graphics4_InternalPipeline(pipeline,projectionLocation,textureLocation));
};
$hxClasses["kha.graphics4.PerFramebufferPipelineCache"] = kha_graphics4_PerFramebufferPipelineCache;
kha_graphics4_PerFramebufferPipelineCache.__name__ = true;
kha_graphics4_PerFramebufferPipelineCache.__interfaces__ = [kha_graphics4_PipelineCache];
kha_graphics4_PerFramebufferPipelineCache.prototype = {
	pipelines: null
	,get: function(colorFormats,depthStencilFormat) {
		return this.pipelines[this.hash(colorFormats,depthStencilFormat)];
	}
	,hash: function(colorFormats,depthStencilFormat) {
		return 0;
	}
	,__class__: kha_graphics4_PerFramebufferPipelineCache
};
var kha_graphics4_ImageShaderPainter = function(g4) {
	this.myPipeline = null;
	this.bilinearMipmaps = false;
	this.bilinear = false;
	this.g = g4;
	kha_graphics4_ImageShaderPainter.bufferStart = 0;
	kha_graphics4_ImageShaderPainter.bufferIndex = 0;
	kha_graphics4_ImageShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_ImageShaderPainter.standardImagePipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.ImageShaderPainter"] = kha_graphics4_ImageShaderPainter;
kha_graphics4_ImageShaderPainter.__name__ = true;
kha_graphics4_ImageShaderPainter.initShaders = function() {
	if(kha_graphics4_ImageShaderPainter.structure == null) {
		kha_graphics4_ImageShaderPainter.structure = kha_graphics4_Graphics2.createImageVertexStructure();
	}
	if(kha_graphics4_ImageShaderPainter.standardImagePipeline == null) {
		kha_graphics4_ImageShaderPainter.standardImagePipeline = new kha_graphics4_PerFramebufferPipelineCache(kha_graphics4_Graphics2.createImagePipeline(kha_graphics4_ImageShaderPainter.structure),true);
	}
};
kha_graphics4_ImageShaderPainter.prototype = {
	projectionMatrix: null
	,bilinear: null
	,bilinearMipmaps: null
	,g: null
	,myPipeline: null
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_ImageShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_ImageShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(6000,kha_graphics4_ImageShaderPainter.structure,1);
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_ImageShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(9000,0);
			var indices = kha_graphics4_ImageShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1500) {
				var i = _g++;
				indices.setUint32(i * 3 * 2 * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 1) * 4,i * 4 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 2) * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 3) * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 4) * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 5) * 4,i * 4 + 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
			}
			kha_graphics4_ImageShaderPainter.indexBuffer.unlock();
		}
	}
	,drawBuffer: function(end) {
		if(kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart == 0) {
			return;
		}
		kha_graphics4_ImageShaderPainter.rectVertexBuffer.unlock((kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ImageShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ImageShaderPainter.indexBuffer);
		this.g.setTexture(pipeline.textureLocation,kha_graphics4_ImageShaderPainter.lastTexture);
		this.g.setTextureParameters(pipeline.textureLocation,2,2,this.bilinear ? 1 : 0,this.bilinear ? 1 : 0,this.bilinearMipmaps ? 2 : 0);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(kha_graphics4_ImageShaderPainter.bufferStart * 2 * 3,(kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 2 * 3);
		this.g.setTexture(pipeline.textureLocation,null);
		if(end || (kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1) * 4 >= 1500) {
			kha_graphics4_ImageShaderPainter.bufferStart = 0;
			kha_graphics4_ImageShaderPainter.bufferIndex = 0;
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock(0);
		} else {
			kha_graphics4_ImageShaderPainter.bufferStart = kha_graphics4_ImageShaderPainter.bufferIndex;
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock(kha_graphics4_ImageShaderPainter.bufferStart * 4);
		}
	}
	,end: function() {
		if(kha_graphics4_ImageShaderPainter.bufferIndex > 0) {
			this.drawBuffer(true);
		}
		kha_graphics4_ImageShaderPainter.lastTexture = null;
	}
	,__class__: kha_graphics4_ImageShaderPainter
};
var kha_graphics4_ColoredShaderPainter = function(g4) {
	this.myPipeline = null;
	this.g = g4;
	kha_graphics4_ColoredShaderPainter.bufferIndex = 0;
	kha_graphics4_ColoredShaderPainter.triangleBufferIndex = 0;
	kha_graphics4_ColoredShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_ColoredShaderPainter.standardColorPipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.ColoredShaderPainter"] = kha_graphics4_ColoredShaderPainter;
kha_graphics4_ColoredShaderPainter.__name__ = true;
kha_graphics4_ColoredShaderPainter.initShaders = function() {
	if(kha_graphics4_ColoredShaderPainter.structure == null) {
		kha_graphics4_ColoredShaderPainter.structure = kha_graphics4_Graphics2.createColoredVertexStructure();
	}
	if(kha_graphics4_ColoredShaderPainter.standardColorPipeline == null) {
		kha_graphics4_ColoredShaderPainter.standardColorPipeline = new kha_graphics4_PerFramebufferPipelineCache(kha_graphics4_Graphics2.createColoredPipeline(kha_graphics4_ColoredShaderPainter.structure),false);
	}
};
kha_graphics4_ColoredShaderPainter.prototype = {
	projectionMatrix: null
	,g: null
	,myPipeline: null
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_ColoredShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_ColoredShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(4000,kha_graphics4_ColoredShaderPainter.structure,1);
			kha_graphics4_ColoredShaderPainter.rectVertices = kha_graphics4_ColoredShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_ColoredShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(6000,0);
			var indices = kha_graphics4_ColoredShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				indices.setUint32(i * 3 * 2 * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 1) * 4,i * 4 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 2) * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 3) * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 4) * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 5) * 4,i * 4 + 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
			}
			kha_graphics4_ColoredShaderPainter.indexBuffer.unlock();
			kha_graphics4_ColoredShaderPainter.triangleVertexBuffer = new kha_graphics4_VertexBuffer(3000,kha_graphics4_ColoredShaderPainter.structure,1);
			kha_graphics4_ColoredShaderPainter.triangleVertices = kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.lock();
			kha_graphics4_ColoredShaderPainter.triangleIndexBuffer = new kha_graphics4_IndexBuffer(3000,0);
			var triIndices = kha_graphics4_ColoredShaderPainter.triangleIndexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				triIndices.setUint32(i * 3 * 4,i * 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
				triIndices.setUint32((i * 3 + 1) * 4,i * 3 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				triIndices.setUint32((i * 3 + 2) * 4,i * 3 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
			}
			kha_graphics4_ColoredShaderPainter.triangleIndexBuffer.unlock();
		}
	}
	,drawBuffer: function(trisDone) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex == 0) {
			return;
		}
		if(!trisDone) {
			if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
				this.drawTriBuffer(true);
			}
		}
		kha_graphics4_ColoredShaderPainter.rectVertexBuffer.unlock(kha_graphics4_ColoredShaderPainter.bufferIndex * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ColoredShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ColoredShaderPainter.indexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(0,kha_graphics4_ColoredShaderPainter.bufferIndex * 2 * 3);
		kha_graphics4_ColoredShaderPainter.bufferIndex = 0;
		kha_graphics4_ColoredShaderPainter.rectVertices = kha_graphics4_ColoredShaderPainter.rectVertexBuffer.lock();
	}
	,drawTriBuffer: function(rectsDone) {
		if(!rectsDone) {
			if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
				this.drawBuffer(true);
			}
		}
		kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.unlock(kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 3);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ColoredShaderPainter.triangleVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ColoredShaderPainter.triangleIndexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(0,kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 3);
		kha_graphics4_ColoredShaderPainter.triangleBufferIndex = 0;
		kha_graphics4_ColoredShaderPainter.triangleVertices = kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.lock();
	}
	,__class__: kha_graphics4_ColoredShaderPainter
};
var kha_graphics4_TextShaderPainter = function(g4) {
	this.bakedQuadCache = new kha_AlignedQuad();
	this.bilinear = false;
	this.myPipeline = null;
	this.g = g4;
	kha_graphics4_TextShaderPainter.bufferIndex = 0;
	kha_graphics4_TextShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_TextShaderPainter.standardTextPipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.TextShaderPainter"] = kha_graphics4_TextShaderPainter;
kha_graphics4_TextShaderPainter.__name__ = true;
kha_graphics4_TextShaderPainter.initShaders = function() {
	if(kha_graphics4_TextShaderPainter.structure == null) {
		kha_graphics4_TextShaderPainter.structure = kha_graphics4_Graphics2.createTextVertexStructure();
	}
	if(kha_graphics4_TextShaderPainter.standardTextPipeline == null) {
		kha_graphics4_TextShaderPainter.standardTextPipeline = new kha_graphics4_PerFramebufferPipelineCache(kha_graphics4_Graphics2.createTextPipeline(kha_graphics4_TextShaderPainter.structure),true);
	}
};
kha_graphics4_TextShaderPainter.findIndex = function(charCode) {
	var blocks = kha_KravurImage.charBlocks;
	var offset = 0;
	var _g = 0;
	var _g1 = blocks.length / 2 | 0;
	while(_g < _g1) {
		var i = _g++;
		var start = blocks[i * 2];
		var end = blocks[i * 2 + 1];
		if(charCode >= start && charCode <= end) {
			return offset + charCode - start;
		}
		offset += end - start + 1;
	}
	return 0;
};
kha_graphics4_TextShaderPainter.prototype = {
	projectionMatrix: null
	,font: null
	,g: null
	,myPipeline: null
	,fontSize: null
	,bilinear: null
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_TextShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_TextShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(4000,kha_graphics4_TextShaderPainter.structure,1);
			kha_graphics4_TextShaderPainter.rectVertices = kha_graphics4_TextShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_TextShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(6000,0);
			var indices = kha_graphics4_TextShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				indices.setUint32(i * 3 * 2 * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 1) * 4,i * 4 + 1,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 2) * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 3) * 4,i * 4,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 4) * 4,i * 4 + 2,kha_arrays_ByteArray.LITTLE_ENDIAN);
				indices.setUint32((i * 3 * 2 + 5) * 4,i * 4 + 3,kha_arrays_ByteArray.LITTLE_ENDIAN);
			}
			kha_graphics4_TextShaderPainter.indexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32(baseIndex * 4,bottomleftx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 1) * 4,bottomlefty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 2) * 4,-5.0,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 9) * 4,topleftx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 10) * 4,toplefty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 11) * 4,-5.0,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 18) * 4,toprightx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 19) * 4,toprighty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 20) * 4,-5.0,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 27) * 4,bottomrightx,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 28) * 4,bottomrighty,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 29) * 4,-5.0,true);
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 3) * 4,left,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 4) * 4,bottom,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 12) * 4,left,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 13) * 4,top,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 21) * 4,right,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 22) * 4,top,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 30) * 4,right,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 31) * 4,bottom,true);
	}
	,setRectColors: function(opacity,color) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 5) * 4,((color & 16711680) >>> 16) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 6) * 4,((color & 65280) >>> 8) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 7) * 4,(color & 255) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 8) * 4,a,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 14) * 4,((color & 16711680) >>> 16) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 15) * 4,((color & 65280) >>> 8) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 16) * 4,(color & 255) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 17) * 4,a,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 23) * 4,((color & 16711680) >>> 16) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 24) * 4,((color & 65280) >>> 8) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 25) * 4,(color & 255) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 26) * 4,a,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 32) * 4,((color & 16711680) >>> 16) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 33) * 4,((color & 65280) >>> 8) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 34) * 4,(color & 255) * 0.00392156862745098,true);
		kha_graphics4_TextShaderPainter.rectVertices.setFloat32((baseIndex + 35) * 4,a,true);
	}
	,drawBuffer: function() {
		if(kha_graphics4_TextShaderPainter.bufferIndex == 0) {
			return;
		}
		kha_graphics4_TextShaderPainter.rectVertexBuffer.unlock(kha_graphics4_TextShaderPainter.bufferIndex * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_TextShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_TextShaderPainter.indexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.setTexture(pipeline.textureLocation,kha_graphics4_TextShaderPainter.lastTexture);
		this.g.setTextureParameters(pipeline.textureLocation,2,2,this.bilinear ? 1 : 0,this.bilinear ? 1 : 0,0);
		this.g.drawIndexedVertices(0,kha_graphics4_TextShaderPainter.bufferIndex * 2 * 3);
		this.g.setTexture(pipeline.textureLocation,null);
		kha_graphics4_TextShaderPainter.bufferIndex = 0;
		kha_graphics4_TextShaderPainter.rectVertices = kha_graphics4_TextShaderPainter.rectVertexBuffer.lock();
	}
	,setFont: function(font) {
		this.font = js_Boot.__cast(font , kha_Kravur);
	}
	,bakedQuadCache: null
	,drawString: function(text,opacity,color,x,y,transformation) {
		var font = this.font._get(this.fontSize);
		var tex = font.getTexture();
		if(kha_graphics4_TextShaderPainter.lastTexture != null && tex != kha_graphics4_TextShaderPainter.lastTexture) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = tex;
		var xpos = x;
		var _g = 0;
		var _g1 = text.length;
		while(_g < _g1) {
			var charCode = text.charCodeAt(_g++);
			var q = font.getBakedQuad(this.bakedQuadCache,kha_graphics4_TextShaderPainter.findIndex(charCode),xpos,y);
			if(q != null) {
				if(kha_graphics4_TextShaderPainter.bufferIndex + 1 >= 1000) {
					this.drawBuffer();
				}
				this.setRectColors(opacity,color);
				this.setRectTexCoords(q.s0 * tex.get_width() / tex.get_realWidth(),q.t0 * tex.get_height() / tex.get_realHeight(),q.s1 * tex.get_width() / tex.get_realWidth(),q.t1 * tex.get_height() / tex.get_realHeight());
				var x = q.x0;
				var y1 = q.y1;
				if(y1 == null) {
					y1 = 0;
				}
				if(x == null) {
					x = 0;
				}
				var value_x = x;
				var value_y = y1;
				var w = transformation._02 * value_x + transformation._12 * value_y + transformation._22;
				var x1 = (transformation._00 * value_x + transformation._10 * value_y + transformation._20) / w;
				var y2 = (transformation._01 * value_x + transformation._11 * value_y + transformation._21) / w;
				var x2 = x1;
				var y3 = y2;
				if(y2 == null) {
					y3 = 0;
				}
				if(x1 == null) {
					x2 = 0;
				}
				var x3 = q.x0;
				var y4 = q.y0;
				if(y4 == null) {
					y4 = 0;
				}
				if(x3 == null) {
					x3 = 0;
				}
				var value_x1 = x3;
				var value_y1 = y4;
				var w1 = transformation._02 * value_x1 + transformation._12 * value_y1 + transformation._22;
				var x4 = (transformation._00 * value_x1 + transformation._10 * value_y1 + transformation._20) / w1;
				var y5 = (transformation._01 * value_x1 + transformation._11 * value_y1 + transformation._21) / w1;
				var x5 = x4;
				var y6 = y5;
				if(y5 == null) {
					y6 = 0;
				}
				if(x4 == null) {
					x5 = 0;
				}
				var x6 = q.x1;
				var y7 = q.y0;
				if(y7 == null) {
					y7 = 0;
				}
				if(x6 == null) {
					x6 = 0;
				}
				var value_x2 = x6;
				var value_y2 = y7;
				var w2 = transformation._02 * value_x2 + transformation._12 * value_y2 + transformation._22;
				var x7 = (transformation._00 * value_x2 + transformation._10 * value_y2 + transformation._20) / w2;
				var y8 = (transformation._01 * value_x2 + transformation._11 * value_y2 + transformation._21) / w2;
				var x8 = x7;
				var y9 = y8;
				if(y8 == null) {
					y9 = 0;
				}
				if(x7 == null) {
					x8 = 0;
				}
				var x9 = q.x1;
				var y10 = q.y1;
				if(y10 == null) {
					y10 = 0;
				}
				if(x9 == null) {
					x9 = 0;
				}
				var value_x3 = x9;
				var value_y3 = y10;
				var w3 = transformation._02 * value_x3 + transformation._12 * value_y3 + transformation._22;
				var x10 = (transformation._00 * value_x3 + transformation._10 * value_y3 + transformation._20) / w3;
				var y11 = (transformation._01 * value_x3 + transformation._11 * value_y3 + transformation._21) / w3;
				var x11 = x10;
				var y12 = y11;
				if(y11 == null) {
					y12 = 0;
				}
				if(x10 == null) {
					x11 = 0;
				}
				this.setRectVertices(x2,y3,x5,y6,x8,y9,x11,y12);
				xpos += q.xadvance;
				++kha_graphics4_TextShaderPainter.bufferIndex;
			}
		}
	}
	,end: function() {
		if(kha_graphics4_TextShaderPainter.bufferIndex > 0) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = null;
	}
	,__class__: kha_graphics4_TextShaderPainter
};
var kha_graphics4_Graphics2 = function(canvas) {
	kha_graphics2_Graphics.call(this);
	this.set_color(-1);
	this.canvas = canvas;
	this.g = canvas.get_g4();
	this.imagePainter = new kha_graphics4_ImageShaderPainter(this.g);
	this.coloredPainter = new kha_graphics4_ColoredShaderPainter(this.g);
	this.textPainter = new kha_graphics4_TextShaderPainter(this.g);
	this.textPainter.fontSize = this.get_fontSize();
	this.projectionMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.setProjection();
	if(kha_graphics4_Graphics2.videoPipeline == null) {
		kha_graphics4_Graphics2.videoPipeline = kha_graphics4_Graphics2.createImagePipeline(kha_graphics4_Graphics2.createImageVertexStructure());
		kha_graphics4_Graphics2.videoPipeline.fragmentShader = kha_Shaders.painter_video_frag;
		kha_graphics4_Graphics2.videoPipeline.vertexShader = kha_Shaders.painter_video_vert;
		kha_graphics4_Graphics2.videoPipeline.compile();
	}
};
$hxClasses["kha.graphics4.Graphics2"] = kha_graphics4_Graphics2;
kha_graphics4_Graphics2.__name__ = true;
kha_graphics4_Graphics2.upperPowerOfTwo = function(v) {
	--v;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	return ++v;
};
kha_graphics4_Graphics2.createImageVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("texPosition",1);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createImagePipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_image_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_image_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 1;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 1;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.createColoredVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createColoredPipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_colored_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_colored_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 1;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 1;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.createTextVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("texPosition",1);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createTextPipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_text_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_text_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 3;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 3;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.__super__ = kha_graphics2_Graphics;
kha_graphics4_Graphics2.prototype = $extend(kha_graphics2_Graphics.prototype,{
	myColor: null
	,myFont: null
	,projectionMatrix: null
	,imagePainter: null
	,coloredPainter: null
	,textPainter: null
	,canvas: null
	,g: null
	,setProjection: function() {
		var width = this.canvas.get_width();
		var height = this.canvas.get_height();
		if(((this.canvas) instanceof kha_Framebuffer)) {
			var _this = this.projectionMatrix;
			_this._00 = 2 / width;
			_this._10 = 0;
			_this._20 = 0;
			_this._30 = -width / width;
			_this._01 = 0;
			_this._11 = 2.0 / (0 - height);
			_this._21 = 0;
			_this._31 = -height / (0 - height);
			_this._02 = 0;
			_this._12 = 0;
			_this._22 = -0.002000200020002;
			_this._32 = -1.0002000200020003;
			_this._03 = 0;
			_this._13 = 0;
			_this._23 = 0;
			_this._33 = 1;
		} else {
			if(!kha_Image.get_nonPow2Supported()) {
				width = kha_graphics4_Graphics2.upperPowerOfTwo(width);
				height = kha_graphics4_Graphics2.upperPowerOfTwo(height);
			}
			if(kha_Image.renderTargetsInvertedY()) {
				var _this = this.projectionMatrix;
				_this._00 = 2 / width;
				_this._10 = 0;
				_this._20 = 0;
				_this._30 = -width / width;
				_this._01 = 0;
				_this._11 = 2.0 / height;
				_this._21 = 0;
				_this._31 = -height / height;
				_this._02 = 0;
				_this._12 = 0;
				_this._22 = -0.002000200020002;
				_this._32 = -1.0002000200020003;
				_this._03 = 0;
				_this._13 = 0;
				_this._23 = 0;
				_this._33 = 1;
			} else {
				var _this = this.projectionMatrix;
				_this._00 = 2 / width;
				_this._10 = 0;
				_this._20 = 0;
				_this._30 = -width / width;
				_this._01 = 0;
				_this._11 = 2.0 / (0 - height);
				_this._21 = 0;
				_this._31 = -height / (0 - height);
				_this._02 = 0;
				_this._12 = 0;
				_this._22 = -0.002000200020002;
				_this._32 = -1.0002000200020003;
				_this._03 = 0;
				_this._13 = 0;
				_this._23 = 0;
				_this._33 = 1;
			}
		}
		this.imagePainter.setProjection(this.projectionMatrix);
		this.coloredPainter.setProjection(this.projectionMatrix);
		this.textPainter.setProjection(this.projectionMatrix);
	}
	,drawImage: function(img,x,y) {
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.end();
		var xw = x + img.get_width();
		var yh = y + img.get_height();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = yh;
		if(yh == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y1 == null) {
			y2 = 0;
		}
		if(x1 == null) {
			x2 = 0;
		}
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y;
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y3 = y1;
		if(y1 == null) {
			y3 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		var _this = this.transformations[this.transformationIndex];
		var x = xw;
		var y1 = y;
		if(y == null) {
			y1 = 0;
		}
		if(xw == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x3 = x;
		var y1 = y;
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x3 = 0;
		}
		var _this = this.transformations[this.transformationIndex];
		var x = xw;
		var y = yh;
		if(yh == null) {
			y = 0;
		}
		if(xw == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x4 = x;
		var y4 = y;
		if(y == null) {
			y4 = 0;
		}
		if(x == null) {
			x4 = 0;
		}
		var _this = this.imagePainter;
		var opacity = this.get_opacity();
		var color = this.get_color();
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && img != kha_graphics4_ImageShaderPainter.lastTexture) {
			_this.drawBuffer(false);
		}
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 5) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 6) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 7) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 8) * 4,a,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 14) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 15) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 16) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 17) * 4,a,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 23) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 24) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 25) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 26) * 4,a,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 32) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 33) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 34) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 35) * 4,a,true);
		var right = img.get_width() / img.get_realWidth();
		var bottom = img.get_height() / img.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 3) * 4,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 4) * 4,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 12) * 4,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 13) * 4,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 21) * 4,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 22) * 4,0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 30) * 4,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 31) * 4,bottom,true);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex * 4,x2,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 1) * 4,y2,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 2) * 4,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 9) * 4,x1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 10) * 4,y3,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 11) * 4,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 18) * 4,x3,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 19) * 4,y1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 20) * 4,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 27) * 4,x4,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 28) * 4,y4,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 29) * 4,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = img;
	}
	,drawScaledSubImage: function(img,sx,sy,sw,sh,dx,dy,dw,dh) {
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x = dx;
		var y = dy + dh;
		if(y == null) {
			y = 0;
		}
		if(dx == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		var _this = this.transformations[this.transformationIndex];
		var x = dx;
		var y = dy;
		if(dy == null) {
			y = 0;
		}
		if(dx == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x;
		var y2 = y;
		if(y == null) {
			y2 = 0;
		}
		if(x == null) {
			x2 = 0;
		}
		var _this = this.transformations[this.transformationIndex];
		var x = dx + dw;
		var y = dy;
		if(dy == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x3 = x;
		var y3 = y;
		if(y == null) {
			y3 = 0;
		}
		if(x == null) {
			x3 = 0;
		}
		var _this = this.transformations[this.transformationIndex];
		var x = dx + dw;
		var y = dy + dh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x4 = x;
		var y4 = y;
		if(y == null) {
			y4 = 0;
		}
		if(x == null) {
			x4 = 0;
		}
		var _this = this.imagePainter;
		var opacity = this.get_opacity();
		var color = this.get_color();
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && img != kha_graphics4_ImageShaderPainter.lastTexture) {
			_this.drawBuffer(false);
		}
		var left = sx / img.get_realWidth();
		var top = sy / img.get_realHeight();
		var right = (sx + sw) / img.get_realWidth();
		var bottom = (sy + sh) / img.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 3) * 4,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 4) * 4,bottom,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 12) * 4,left,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 13) * 4,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 21) * 4,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 22) * 4,top,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 30) * 4,right,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 31) * 4,bottom,true);
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 5) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 6) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 7) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 8) * 4,a,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 14) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 15) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 16) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 17) * 4,a,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 23) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 24) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 25) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 26) * 4,a,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 32) * 4,r,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 33) * 4,g,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 34) * 4,b,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 35) * 4,a,true);
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32(baseIndex * 4,x1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 1) * 4,y1,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 2) * 4,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 9) * 4,x2,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 10) * 4,y2,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 11) * 4,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 18) * 4,x3,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 19) * 4,y3,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 20) * 4,-5.0,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 27) * 4,x4,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 28) * 4,y4,true);
		kha_graphics4_ImageShaderPainter.rectVertices.setFloat32((baseIndex + 29) * 4,-5.0,true);
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = img;
	}
	,get_color: function() {
		return this.myColor;
	}
	,set_color: function(color) {
		return this.myColor = color;
	}
	,drawString: function(text,x,y) {
		this.imagePainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.drawString(text,this.get_opacity(),this.get_color(),x,y,this.transformations[this.transformationIndex]);
	}
	,set_font: function(font) {
		this.textPainter.setFont(font);
		return this.myFont = font;
	}
	,set_fontSize: function(value) {
		return kha_graphics2_Graphics.prototype.set_fontSize.call(this,this.textPainter.fontSize = value);
	}
	,begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		if(kha_graphics4_Graphics2.current == null) {
			kha_graphics4_Graphics2.current = this;
		} else {
			throw haxe_Exception.thrown("End before you begin");
		}
		this.g.begin();
		if(clear) {
			this.clear(clearColor);
		}
		this.setProjection();
	}
	,clear: function(color) {
		this.flush();
		this.g.clear(color == null ? -16777216 : color);
	}
	,flush: function() {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
	}
	,end: function() {
		this.flush();
		this.g.end();
		if(kha_graphics4_Graphics2.current == this) {
			kha_graphics4_Graphics2.current = null;
		} else {
			throw haxe_Exception.thrown("Begin before you end");
		}
	}
	,__class__: kha_graphics4_Graphics2
});
var kha_graphics4_IndexBuffer = function(indexCount,usage,canRead) {
	if(canRead == null) {
		canRead = false;
	}
	this.lockEnd = 0;
	this.lockStart = 0;
	this.usage = usage;
	this.mySize = indexCount;
	this.buffer = kha_SystemImpl.gl.createBuffer();
	this._data = kha_arrays_Uint32Array._new(indexCount);
};
$hxClasses["kha.graphics4.IndexBuffer"] = kha_graphics4_IndexBuffer;
kha_graphics4_IndexBuffer.__name__ = true;
kha_graphics4_IndexBuffer.prototype = {
	_data: null
	,buffer: null
	,mySize: null
	,usage: null
	,lockStart: null
	,lockEnd: null
	,lock: function(start,count) {
		this.lockStart = start != null ? start : 0;
		this.lockEnd = count != null ? start + count : this.mySize;
		var end = this.lockEnd;
		var start = this.lockStart * 4;
		var end1 = end != null ? end * 4 : null;
		return kha_arrays_ByteArray._new(this._data.buffer,start,end1 != null ? end1 - start : null);
	}
	,unlock: function(count) {
		if(count != null) {
			this.lockEnd = this.lockStart + count;
		}
		kha_SystemImpl.gl.bindBuffer(34963,this.buffer);
		var end = this.lockEnd;
		var start = this.lockStart * 4;
		var end1 = end != null ? end * 4 : null;
		var data = kha_arrays_ByteArray._new(this._data.buffer,start,end1 != null ? end1 - start : null);
		kha_SystemImpl.gl.bufferData(34963,kha_SystemImpl.elementIndexUint == null ? new Uint16Array(data.buffer) : data,this.usage == 1 ? 35048 : 35044);
	}
	,set: function() {
		kha_SystemImpl.gl.bindBuffer(34963,this.buffer);
	}
	,count: function() {
		return this.mySize;
	}
	,__class__: kha_graphics4_IndexBuffer
};
var kha_graphics4_PipelineStateBase = function() {
	this.inputLayout = null;
	this.vertexShader = null;
	this.fragmentShader = null;
	this.geometryShader = null;
	this.tessellationControlShader = null;
	this.tessellationEvaluationShader = null;
	this.cullMode = 2;
	this.depthWrite = false;
	this.depthMode = 0;
	this.stencilMode = 0;
	this.stencilBothPass = 0;
	this.stencilDepthFail = 0;
	this.stencilFail = 0;
	this.stencilReferenceValue = kha_graphics4_StencilValue.Static(0);
	this.stencilReadMask = 255;
	this.stencilWriteMask = 255;
	this.blendSource = 1;
	this.blendDestination = 2;
	this.blendOperation = 0;
	this.alphaBlendSource = 1;
	this.alphaBlendDestination = 2;
	this.alphaBlendOperation = 0;
	this.colorWriteMasksRed = [];
	this.colorWriteMasksGreen = [];
	this.colorWriteMasksBlue = [];
	this.colorWriteMasksAlpha = [];
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorAttachmentCount = 1;
	this.colorAttachments = [];
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.depthStencilAttachment = 0;
	this.conservativeRasterization = false;
};
$hxClasses["kha.graphics4.PipelineStateBase"] = kha_graphics4_PipelineStateBase;
kha_graphics4_PipelineStateBase.__name__ = true;
kha_graphics4_PipelineStateBase.prototype = {
	inputLayout: null
	,vertexShader: null
	,fragmentShader: null
	,geometryShader: null
	,tessellationControlShader: null
	,tessellationEvaluationShader: null
	,cullMode: null
	,depthWrite: null
	,depthMode: null
	,stencilMode: null
	,stencilBothPass: null
	,stencilDepthFail: null
	,stencilFail: null
	,stencilReferenceValue: null
	,stencilReadMask: null
	,stencilWriteMask: null
	,blendSource: null
	,blendDestination: null
	,blendOperation: null
	,alphaBlendSource: null
	,alphaBlendDestination: null
	,alphaBlendOperation: null
	,colorWriteMasksRed: null
	,colorWriteMasksGreen: null
	,colorWriteMasksBlue: null
	,colorWriteMasksAlpha: null
	,colorAttachmentCount: null
	,colorAttachments: null
	,depthStencilAttachment: null
	,conservativeRasterization: null
	,__class__: kha_graphics4_PipelineStateBase
};
var kha_graphics4_PipelineState = function() {
	this.program = null;
	kha_graphics4_PipelineStateBase.call(this);
	this.textures = [];
	this.textureValues = [];
};
$hxClasses["kha.graphics4.PipelineState"] = kha_graphics4_PipelineState;
kha_graphics4_PipelineState.__name__ = true;
kha_graphics4_PipelineState.__super__ = kha_graphics4_PipelineStateBase;
kha_graphics4_PipelineState.prototype = $extend(kha_graphics4_PipelineStateBase.prototype,{
	program: null
	,textures: null
	,textureValues: null
	,compile: function() {
		if(this.program != null) {
			kha_SystemImpl.gl.deleteProgram(this.program);
		}
		this.program = kha_SystemImpl.gl.createProgram();
		this.compileShader(this.vertexShader);
		this.compileShader(this.fragmentShader);
		kha_SystemImpl.gl.attachShader(this.program,this.vertexShader.shader);
		kha_SystemImpl.gl.attachShader(this.program,this.fragmentShader.shader);
		var index = 0;
		var _g = 0;
		var _g1 = this.inputLayout;
		while(_g < _g1.length) {
			var _g2 = 0;
			var _g3 = _g1[_g++].elements;
			while(_g2 < _g3.length) {
				var element = _g3[_g2];
				++_g2;
				kha_SystemImpl.gl.bindAttribLocation(this.program,index,element.name);
				if(element.data == 4) {
					index += 4;
				} else {
					++index;
				}
			}
		}
		kha_SystemImpl.gl.linkProgram(this.program);
		if(!kha_SystemImpl.gl.getProgramParameter(this.program,35714)) {
			var message = "Could not link the shader program:\n" + kha_SystemImpl.gl.getProgramInfoLog(this.program);
			haxe_Log.trace("Error: " + message,{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 49, className : "kha.graphics4.PipelineState", methodName : "compile"});
			throw haxe_Exception.thrown(message);
		}
	}
	,set: function() {
		kha_SystemImpl.gl.useProgram(this.program);
		var _g = 0;
		var _g1 = this.textureValues.length;
		while(_g < _g1) {
			var index = _g++;
			kha_SystemImpl.gl.uniform1i(this.textureValues[index],index);
		}
		kha_SystemImpl.gl.colorMask(this.colorWriteMasksRed[0],this.colorWriteMasksGreen[0],this.colorWriteMasksBlue[0],this.colorWriteMasksAlpha[0]);
	}
	,compileShader: function(shader) {
		if(shader.shader != null) {
			return;
		}
		var s = kha_SystemImpl.gl.createShader(shader.type);
		var highpSupported = kha_SystemImpl.gl.getShaderPrecisionFormat(35632,36338).precision != 0;
		var files = shader.files;
		var _g = 0;
		var _g1 = files.length;
		while(_g < _g1) {
			var i = _g++;
			if(kha_SystemImpl.gl2) {
				if(files[i].indexOf("-webgl2") >= 0 || files[i].indexOf("runtime-string") >= 0) {
					kha_SystemImpl.gl.shaderSource(s,shader.sources[i]);
					break;
				}
			} else {
				if(!highpSupported && (files[i].indexOf("-relaxed") >= 0 || files[i].indexOf("runtime-string") >= 0)) {
					kha_SystemImpl.gl.shaderSource(s,shader.sources[i]);
					break;
				}
				if(highpSupported && (files[i].indexOf("-relaxed") < 0 || files[i].indexOf("runtime-string") >= 0)) {
					kha_SystemImpl.gl.shaderSource(s,shader.sources[i]);
					break;
				}
			}
		}
		kha_SystemImpl.gl.compileShader(s);
		if(!kha_SystemImpl.gl.getShaderParameter(s,35713)) {
			var message = "Could not compile shader:\n" + kha_SystemImpl.gl.getShaderInfoLog(s);
			haxe_Log.trace("Error: " + message,{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 89, className : "kha.graphics4.PipelineState", methodName : "compileShader"});
			throw haxe_Exception.thrown(message);
		}
		shader.shader = s;
	}
	,getConstantLocation: function(name) {
		var location = kha_SystemImpl.gl.getUniformLocation(this.program,name);
		if(location == null) {
			haxe_Log.trace("Warning: Uniform " + name + " not found.",{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 98, className : "kha.graphics4.PipelineState", methodName : "getConstantLocation"});
		}
		var type = 5126;
		var count = kha_SystemImpl.gl.getProgramParameter(this.program,35718);
		var _g = 0;
		while(_g < count) {
			var info = kha_SystemImpl.gl.getActiveUniform(this.program,_g++);
			if(info.name == name || info.name == name + "[0]") {
				type = info.type;
				break;
			}
		}
		return new kha_js_graphics4_ConstantLocation(location,type);
	}
	,getTextureUnit: function(name) {
		var index = this.findTexture(name);
		if(index < 0) {
			var location = kha_SystemImpl.gl.getUniformLocation(this.program,name);
			if(location == null) {
				haxe_Log.trace("Warning: Sampler " + name + " not found.",{ fileName : "kha/graphics4/PipelineState.hx", lineNumber : 117, className : "kha.graphics4.PipelineState", methodName : "getTextureUnit"});
			}
			index = this.textures.length;
			this.textureValues.push(location);
			this.textures.push(name);
		}
		return new kha_js_graphics4_TextureUnit(index);
	}
	,findTexture: function(name) {
		var _g = 0;
		var _g1 = this.textures.length;
		while(_g < _g1) {
			var index = _g++;
			if(this.textures[index] == name) {
				return index;
			}
		}
		return -1;
	}
	,__class__: kha_graphics4_PipelineState
});
var kha_graphics4_StencilValue = $hxEnums["kha.graphics4.StencilValue"] = { __ename__:true,__constructs__:null
	,Dynamic: {_hx_name:"Dynamic",_hx_index:0,__enum__:"kha.graphics4.StencilValue",toString:$estr}
	,Static: ($_=function(value) { return {_hx_index:1,value:value,__enum__:"kha.graphics4.StencilValue",toString:$estr}; },$_._hx_name="Static",$_.__params__ = ["value"],$_)
};
kha_graphics4_StencilValue.__constructs__ = [kha_graphics4_StencilValue.Dynamic,kha_graphics4_StencilValue.Static];
var kha_graphics4_TessellationControlShader = function() { };
$hxClasses["kha.graphics4.TessellationControlShader"] = kha_graphics4_TessellationControlShader;
kha_graphics4_TessellationControlShader.__name__ = true;
var kha_graphics4_TessellationEvaluationShader = function() { };
$hxClasses["kha.graphics4.TessellationEvaluationShader"] = kha_graphics4_TessellationEvaluationShader;
kha_graphics4_TessellationEvaluationShader.__name__ = true;
var kha_graphics4_TextureUnit = function() { };
$hxClasses["kha.graphics4.TextureUnit"] = kha_graphics4_TextureUnit;
kha_graphics4_TextureUnit.__name__ = true;
kha_graphics4_TextureUnit.__isInterface__ = true;
var kha_graphics4_VertexBuffer = function(vertexCount,structure,usage,instanceDataStepRate,canRead) {
	if(canRead == null) {
		canRead = false;
	}
	if(instanceDataStepRate == null) {
		instanceDataStepRate = 0;
	}
	this.lockEnd = 0;
	this.lockStart = 0;
	this.instanceDataStepRate = instanceDataStepRate;
	this.mySize = vertexCount;
	this.myStride = 0;
	var _g = 0;
	var _g1 = structure.elements;
	while(_g < _g1.length) switch(_g1[_g++].data) {
	case 0:
		this.myStride += 4;
		break;
	case 1:
		this.myStride += 8;
		break;
	case 2:
		this.myStride += 12;
		break;
	case 3:
		this.myStride += 16;
		break;
	case 4:
		this.myStride += 64;
		break;
	case 5:
		this.myStride += 4;
		break;
	case 6:
		this.myStride += 8;
		break;
	}
	this.buffer = kha_SystemImpl.gl.createBuffer();
	this._data = kha_arrays_ByteArray.make(vertexCount * this.myStride);
	this.sizes = [];
	this.offsets = [];
	this.types = [];
	this.sizes[structure.elements.length - 1] = 0;
	this.offsets[structure.elements.length - 1] = 0;
	this.types[structure.elements.length - 1] = 0;
	var offset = 0;
	var index = 0;
	var _g = 0;
	var _g1 = structure.elements;
	while(_g < _g1.length) {
		var element = _g1[_g];
		++_g;
		var size;
		var type;
		switch(element.data) {
		case 0:
			size = 1;
			type = 5126;
			break;
		case 1:
			size = 2;
			type = 5126;
			break;
		case 2:
			size = 3;
			type = 5126;
			break;
		case 3:
			size = 4;
			type = 5126;
			break;
		case 4:
			size = 16;
			type = 5126;
			break;
		case 5:
			size = 2;
			type = 5122;
			break;
		case 6:
			size = 4;
			type = 5122;
			break;
		}
		this.sizes[index] = size;
		this.offsets[index] = offset;
		this.types[index] = type;
		switch(element.data) {
		case 0:
			offset += 4;
			break;
		case 1:
			offset += 8;
			break;
		case 2:
			offset += 12;
			break;
		case 3:
			offset += 16;
			break;
		case 4:
			offset += 64;
			break;
		case 5:
			offset += 4;
			break;
		case 6:
			offset += 8;
			break;
		}
		++index;
	}
	kha_SystemImpl.gl.bindBuffer(34962,this.buffer);
	var tmp = kha_SystemImpl.gl;
	var this1 = this._data;
	var start = 0 * this.stride();
	var end = this.mySize * this.stride();
	tmp.bufferData(34962,kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null),usage == 1 ? 35048 : 35044);
};
$hxClasses["kha.graphics4.VertexBuffer"] = kha_graphics4_VertexBuffer;
kha_graphics4_VertexBuffer.__name__ = true;
kha_graphics4_VertexBuffer.prototype = {
	_data: null
	,buffer: null
	,mySize: null
	,myStride: null
	,sizes: null
	,offsets: null
	,types: null
	,instanceDataStepRate: null
	,lockStart: null
	,lockEnd: null
	,lock: function(start,count) {
		this.lockStart = start != null ? start : 0;
		this.lockEnd = count != null ? start + count : this.mySize;
		var this1 = this._data;
		var start = this.lockStart * this.stride();
		var end = this.lockEnd * this.stride();
		return kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null);
	}
	,unlock: function(count) {
		if(count != null) {
			this.lockEnd = this.lockStart + count;
		}
		kha_SystemImpl.gl.bindBuffer(34962,this.buffer);
		var tmp = kha_SystemImpl.gl;
		var tmp1 = this.lockStart * this.stride();
		var this1 = this._data;
		var start = this.lockStart * this.stride();
		var end = this.lockEnd * this.stride();
		tmp.bufferSubData(34962,tmp1,kha_arrays_ByteArray._new(this1.buffer,start,end != null ? end - start : null));
	}
	,stride: function() {
		return this.myStride;
	}
	,set: function(offset) {
		var ext = kha_SystemImpl.gl2 ? true : kha_SystemImpl.gl.getExtension("ANGLE_instanced_arrays");
		kha_SystemImpl.gl.bindBuffer(34962,this.buffer);
		var attributesOffset = 0;
		var _g = 0;
		var _g1 = this.sizes.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.sizes[i] > 4) {
				var size = this.sizes[i];
				var addonOffset = 0;
				while(size > 0) {
					kha_SystemImpl.gl.enableVertexAttribArray(offset + attributesOffset);
					kha_SystemImpl.gl.vertexAttribPointer(offset + attributesOffset,4,5126,false,this.myStride,this.offsets[i] + addonOffset);
					if(ext) {
						if(kha_SystemImpl.gl2) {
							kha_SystemImpl.gl.vertexAttribDivisor(offset + attributesOffset,this.instanceDataStepRate);
						} else {
							ext.vertexAttribDivisorANGLE(offset + attributesOffset,this.instanceDataStepRate);
						}
					}
					size -= 4;
					addonOffset += 16;
					++attributesOffset;
				}
			} else {
				var normalized = this.types[i] == 5126 ? false : true;
				kha_SystemImpl.gl.enableVertexAttribArray(offset + attributesOffset);
				kha_SystemImpl.gl.vertexAttribPointer(offset + attributesOffset,this.sizes[i],this.types[i],normalized,this.myStride,this.offsets[i]);
				if(ext) {
					if(kha_SystemImpl.gl2) {
						kha_SystemImpl.gl.vertexAttribDivisor(offset + attributesOffset,this.instanceDataStepRate);
					} else {
						ext.vertexAttribDivisorANGLE(offset + attributesOffset,this.instanceDataStepRate);
					}
				}
				++attributesOffset;
			}
		}
		return attributesOffset;
	}
	,__class__: kha_graphics4_VertexBuffer
};
var kha_graphics4_VertexElement = function(name,data) {
	this.name = name;
	this.data = data;
};
$hxClasses["kha.graphics4.VertexElement"] = kha_graphics4_VertexElement;
kha_graphics4_VertexElement.__name__ = true;
kha_graphics4_VertexElement.prototype = {
	name: null
	,data: null
	,__class__: kha_graphics4_VertexElement
};
var kha_graphics4_VertexShader = function(sources,files) {
	this.sources = [];
	var _g = 0;
	while(_g < sources.length) this.sources.push(sources[_g++].toString());
	this.type = 35633;
	this.shader = null;
	this.files = files;
};
$hxClasses["kha.graphics4.VertexShader"] = kha_graphics4_VertexShader;
kha_graphics4_VertexShader.__name__ = true;
kha_graphics4_VertexShader.prototype = {
	sources: null
	,type: null
	,shader: null
	,files: null
	,__class__: kha_graphics4_VertexShader
};
var kha_graphics4_VertexStructure = function() {
	this.elements = [];
	this.instanced = false;
};
$hxClasses["kha.graphics4.VertexStructure"] = kha_graphics4_VertexStructure;
kha_graphics4_VertexStructure.__name__ = true;
kha_graphics4_VertexStructure.prototype = {
	elements: null
	,instanced: null
	,add: function(name,data) {
		this.elements.push(new kha_graphics4_VertexElement(name,data));
	}
	,size: function() {
		return this.elements.length;
	}
	,get: function(index) {
		return this.elements[index];
	}
	,__class__: kha_graphics4_VertexStructure
};
var kha_input_Gamepad = $hx_exports["kha"]["input"]["Gamepad"] = function(index,id) {
	if(id == null) {
		id = "unknown";
	}
	if(index == null) {
		index = 0;
	}
	this.connected = false;
	this.index = index;
	this.axisListeners = [];
	this.buttonListeners = [];
	kha_input_Gamepad.instances[index] = this;
};
$hxClasses["kha.input.Gamepad"] = kha_input_Gamepad;
kha_input_Gamepad.__name__ = true;
kha_input_Gamepad.get = function(index) {
	if(index == null) {
		index = 0;
	}
	if(index >= kha_input_Gamepad.instances.length) {
		return null;
	}
	return kha_input_Gamepad.instances[index];
};
kha_input_Gamepad.notifyOnConnect = function(connectListener,disconnectListener) {
	if(connectListener != null) {
		kha_input_Gamepad.connectListeners.push(connectListener);
	}
	if(disconnectListener != null) {
		kha_input_Gamepad.disconnectListeners.push(disconnectListener);
	}
};
kha_input_Gamepad.removeConnect = function(connectListener,disconnectListener) {
	if(connectListener != null) {
		HxOverrides.remove(kha_input_Gamepad.connectListeners,connectListener);
	}
	if(disconnectListener != null) {
		HxOverrides.remove(kha_input_Gamepad.disconnectListeners,disconnectListener);
	}
};
kha_input_Gamepad.sendConnectEvent = function(index) {
	kha_input_Gamepad.instances[index].connected = true;
	var _g = 0;
	var _g1 = kha_input_Gamepad.connectListeners;
	while(_g < _g1.length) _g1[_g++](index);
};
kha_input_Gamepad.sendDisconnectEvent = function(index) {
	kha_input_Gamepad.instances[index].connected = false;
	var _g = 0;
	var _g1 = kha_input_Gamepad.disconnectListeners;
	while(_g < _g1.length) _g1[_g++](index);
};
kha_input_Gamepad.prototype = {
	index: null
	,notify: function(axisListener,buttonListener) {
		if(axisListener != null) {
			this.axisListeners.push(axisListener);
		}
		if(buttonListener != null) {
			this.buttonListeners.push(buttonListener);
		}
	}
	,remove: function(axisListener,buttonListener) {
		if(axisListener != null) {
			HxOverrides.remove(this.axisListeners,axisListener);
		}
		if(buttonListener != null) {
			HxOverrides.remove(this.buttonListeners,buttonListener);
		}
	}
	,axisListeners: null
	,buttonListeners: null
	,id: null
	,vendor: null
	,connected: null
	,rumble: function(leftAmount,rightAmount) {
	}
	,get_id: function() {
		return kha_SystemImpl.getGamepadId(this.index);
	}
	,get_vendor: function() {
		return kha_SystemImpl.getGamepadVendor(this.index);
	}
	,sendAxisEvent: function(axis,value) {
		var _g = 0;
		var _g1 = this.axisListeners;
		while(_g < _g1.length) _g1[_g++](axis,value);
	}
	,sendButtonEvent: function(button,value) {
		var _g = 0;
		var _g1 = this.buttonListeners;
		while(_g < _g1.length) _g1[_g++](button,value);
	}
	,__class__: kha_input_Gamepad
};
var kha_input_BlockInterventions = $hxEnums["kha.input.BlockInterventions"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,Full: {_hx_name:"Full",_hx_index:1,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,None: {_hx_name:"None",_hx_index:2,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:3,func:func,__enum__:"kha.input.BlockInterventions",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_BlockInterventions.__constructs__ = [kha_input_BlockInterventions.Default,kha_input_BlockInterventions.Full,kha_input_BlockInterventions.None,kha_input_BlockInterventions.Custom];
var kha_netsync_Controller = function() {
	this.__id = kha_netsync_ControllerBuilder.nextId++;
	this._inputBuffer = new haxe_io_Bytes(new ArrayBuffer(1));
};
$hxClasses["kha.netsync.Controller"] = kha_netsync_Controller;
kha_netsync_Controller.__name__ = true;
kha_netsync_Controller.prototype = {
	__id: null
	,_inputBufferIndex: null
	,_inputBuffer: null
	,_id: function() {
		return this.__id;
	}
	,__class__: kha_netsync_Controller
};
var kha_input_Keyboard = $hx_exports["kha"]["input"]["Keyboard"] = function() {
	kha_netsync_Controller.call(this);
	this.downListeners = [];
	this.upListeners = [];
	this.pressListeners = [];
	kha_input_Keyboard.instance = this;
};
$hxClasses["kha.input.Keyboard"] = kha_input_Keyboard;
kha_input_Keyboard.__name__ = true;
kha_input_Keyboard.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getKeyboard(num);
};
kha_input_Keyboard.disableSystemInterventions = function(behavior) {
	kha_input_Keyboard.keyBehavior = behavior;
};
kha_input_Keyboard.__super__ = kha_netsync_Controller;
kha_input_Keyboard.prototype = $extend(kha_netsync_Controller.prototype,{
	notify: function(downListener,upListener,pressListener) {
		if(downListener != null) {
			this.downListeners.push(downListener);
		}
		if(upListener != null) {
			this.upListeners.push(upListener);
		}
		if(pressListener != null) {
			this.pressListeners.push(pressListener);
		}
	}
	,remove: function(downListener,upListener,pressListener) {
		if(downListener != null) {
			HxOverrides.remove(this.downListeners,downListener);
		}
		if(upListener != null) {
			HxOverrides.remove(this.upListeners,upListener);
		}
		if(pressListener != null) {
			HxOverrides.remove(this.pressListeners,pressListener);
		}
	}
	,show: function() {
	}
	,hide: function() {
	}
	,downListeners: null
	,upListeners: null
	,pressListeners: null
	,sendDownEvent: function(code) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
			bytes.setInt32(0,0);
			bytes.b[4] = code;
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		var _g = 0;
		var _g1 = this.downListeners;
		while(_g < _g1.length) _g1[_g++](code);
	}
	,sendUpEvent: function(code) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
			bytes.setInt32(0,1);
			bytes.b[4] = code;
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		var _g = 0;
		var _g1 = this.upListeners;
		while(_g < _g1.length) _g1[_g++](code);
	}
	,sendPressEvent: function(char) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
			bytes.setInt32(0,2);
			bytes.b[4] = HxOverrides.cca(char,0);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		var _g = 0;
		var _g1 = this.pressListeners;
		while(_g < _g1.length) _g1[_g++](char);
	}
	,_receive: function(bytes) {
		var funcindex = bytes.getInt32(0);
		if(funcindex == 0) {
			this.sendDownEvent(bytes.b[4]);
			return;
		}
		if(funcindex == 1) {
			this.sendUpEvent(bytes.b[4]);
			return;
		}
		if(funcindex == 2) {
			var code = bytes.b[4];
			this.sendPressEvent(String.fromCodePoint(code));
			return;
		}
	}
	,__class__: kha_input_Keyboard
});
var kha_input_MouseEventBlockBehavior = $hxEnums["kha.input.MouseEventBlockBehavior"] = { __ename__:true,__constructs__:null
	,Full: {_hx_name:"Full",_hx_index:0,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}
	,None: {_hx_name:"None",_hx_index:1,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:2,func:func,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_MouseEventBlockBehavior.__constructs__ = [kha_input_MouseEventBlockBehavior.Full,kha_input_MouseEventBlockBehavior.None,kha_input_MouseEventBlockBehavior.Custom];
var kha_input_MouseCursor = $hxEnums["kha.input.MouseCursor"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Pointer: {_hx_name:"Pointer",_hx_index:1,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Text: {_hx_name:"Text",_hx_index:2,__enum__:"kha.input.MouseCursor",toString:$estr}
	,EastWestResize: {_hx_name:"EastWestResize",_hx_index:3,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthSouthResize: {_hx_name:"NorthSouthResize",_hx_index:4,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthEastResize: {_hx_name:"NorthEastResize",_hx_index:5,__enum__:"kha.input.MouseCursor",toString:$estr}
	,SouthEastResize: {_hx_name:"SouthEastResize",_hx_index:6,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthWestResize: {_hx_name:"NorthWestResize",_hx_index:7,__enum__:"kha.input.MouseCursor",toString:$estr}
	,SouthWestResize: {_hx_name:"SouthWestResize",_hx_index:8,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Grab: {_hx_name:"Grab",_hx_index:9,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Grabbing: {_hx_name:"Grabbing",_hx_index:10,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NotAllowed: {_hx_name:"NotAllowed",_hx_index:11,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Wait: {_hx_name:"Wait",_hx_index:12,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Crosshair: {_hx_name:"Crosshair",_hx_index:13,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Custom: ($_=function(image) { return {_hx_index:14,image:image,__enum__:"kha.input.MouseCursor",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["image"],$_)
};
kha_input_MouseCursor.__constructs__ = [kha_input_MouseCursor.Default,kha_input_MouseCursor.Pointer,kha_input_MouseCursor.Text,kha_input_MouseCursor.EastWestResize,kha_input_MouseCursor.NorthSouthResize,kha_input_MouseCursor.NorthEastResize,kha_input_MouseCursor.SouthEastResize,kha_input_MouseCursor.NorthWestResize,kha_input_MouseCursor.SouthWestResize,kha_input_MouseCursor.Grab,kha_input_MouseCursor.Grabbing,kha_input_MouseCursor.NotAllowed,kha_input_MouseCursor.Wait,kha_input_MouseCursor.Crosshair,kha_input_MouseCursor.Custom];
var kha_input_Mouse = $hx_exports["kha"]["input"]["Mouse"] = function() {
	kha_netsync_Controller.call(this);
	kha_input_Mouse.instance = this;
};
$hxClasses["kha.input.Mouse"] = kha_input_Mouse;
kha_input_Mouse.__name__ = true;
kha_input_Mouse.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getMouse(num);
};
kha_input_Mouse.setWheelEventBlockBehavior = function(behavior) {
	kha_input_Mouse.wheelEventBlockBehavior = behavior;
};
kha_input_Mouse.__super__ = kha_netsync_Controller;
kha_input_Mouse.prototype = $extend(kha_netsync_Controller.prototype,{
	notify: function(downListener,upListener,moveListener,wheelListener,leaveListener) {
		this.notifyWindowed(0,downListener,upListener,moveListener,wheelListener,leaveListener);
	}
	,remove: function(downListener,upListener,moveListener,wheelListener,leaveListener) {
		this.removeWindowed(0,downListener,upListener,moveListener,wheelListener,leaveListener);
	}
	,notifyWindowed: function(windowId,downListener,upListener,moveListener,wheelListener,leaveListener) {
		if(downListener != null) {
			if(this.windowDownListeners == null) {
				this.windowDownListeners = [];
			}
			while(this.windowDownListeners.length <= windowId) this.windowDownListeners.push([]);
			this.windowDownListeners[windowId].push(downListener);
		}
		if(upListener != null) {
			if(this.windowUpListeners == null) {
				this.windowUpListeners = [];
			}
			while(this.windowUpListeners.length <= windowId) this.windowUpListeners.push([]);
			this.windowUpListeners[windowId].push(upListener);
		}
		if(moveListener != null) {
			if(this.windowMoveListeners == null) {
				this.windowMoveListeners = [];
			}
			while(this.windowMoveListeners.length <= windowId) this.windowMoveListeners.push([]);
			this.windowMoveListeners[windowId].push(moveListener);
		}
		if(wheelListener != null) {
			if(this.windowWheelListeners == null) {
				this.windowWheelListeners = [];
			}
			while(this.windowWheelListeners.length <= windowId) this.windowWheelListeners.push([]);
			this.windowWheelListeners[windowId].push(wheelListener);
		}
		if(leaveListener != null) {
			if(this.windowLeaveListeners == null) {
				this.windowLeaveListeners = [];
			}
			while(this.windowLeaveListeners.length <= windowId) this.windowLeaveListeners.push([]);
			this.windowLeaveListeners[windowId].push(leaveListener);
		}
	}
	,removeWindowed: function(windowId,downListener,upListener,moveListener,wheelListener,leaveListener) {
		if(downListener != null) {
			if(this.windowDownListeners != null) {
				if(windowId < this.windowDownListeners.length) {
					HxOverrides.remove(this.windowDownListeners[windowId],downListener);
				} else {
					haxe_Log.trace("no downListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 152, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no downListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 156, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(upListener != null) {
			if(this.windowUpListeners != null) {
				if(windowId < this.windowUpListeners.length) {
					HxOverrides.remove(this.windowUpListeners[windowId],upListener);
				} else {
					haxe_Log.trace("no upListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 166, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no upListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 170, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(moveListener != null) {
			if(this.windowMoveListeners != null) {
				if(windowId < this.windowMoveListeners.length) {
					HxOverrides.remove(this.windowMoveListeners[windowId],moveListener);
				} else {
					haxe_Log.trace("no moveListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 180, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no moveListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 184, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(wheelListener != null) {
			if(this.windowWheelListeners != null) {
				if(windowId < this.windowWheelListeners.length) {
					HxOverrides.remove(this.windowWheelListeners[windowId],wheelListener);
				} else {
					haxe_Log.trace("no wheelListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 194, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no wheelListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 198, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(leaveListener != null) {
			if(this.windowLeaveListeners != null) {
				if(windowId < this.windowLeaveListeners.length) {
					HxOverrides.remove(this.windowLeaveListeners[windowId],leaveListener);
				} else {
					haxe_Log.trace("no leaveListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 208, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no leaveListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 212, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
	}
	,lock: function() {
	}
	,unlock: function() {
	}
	,canLock: function() {
		return false;
	}
	,isLocked: function() {
		return false;
	}
	,notifyOnLockChange: function(change,error) {
	}
	,removeFromLockChange: function(change,error) {
	}
	,hideSystemCursor: function() {
	}
	,showSystemCursor: function() {
	}
	,setSystemCursor: function(cursor) {
	}
	,windowDownListeners: null
	,windowUpListeners: null
	,windowMoveListeners: null
	,windowWheelListeners: null
	,windowLeaveListeners: null
	,sendLeaveEvent: function(windowId) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(8));
			bytes.setInt32(0,0);
			bytes.setInt32(4,windowId);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowLeaveListeners != null) {
			var _g = 0;
			var _g1 = this.windowLeaveListeners[windowId];
			while(_g < _g1.length) _g1[_g++]();
		}
	}
	,sendDownEvent: function(windowId,button,x,y) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(20));
			bytes.setInt32(0,1);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,button);
			bytes.setInt32(12,x);
			bytes.setInt32(16,y);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowDownListeners[windowId];
			while(_g < _g1.length) _g1[_g++](button,x,y);
		}
	}
	,sendUpEvent: function(windowId,button,x,y) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(20));
			bytes.setInt32(0,2);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,button);
			bytes.setInt32(12,x);
			bytes.setInt32(16,y);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowUpListeners[windowId];
			while(_g < _g1.length) _g1[_g++](button,x,y);
		}
	}
	,sendMoveEvent: function(windowId,x,y,movementX,movementY) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(24));
			bytes.setInt32(0,3);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,x);
			bytes.setInt32(12,y);
			bytes.setInt32(16,movementX);
			bytes.setInt32(20,movementY);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowMoveListeners[windowId];
			while(_g < _g1.length) _g1[_g++](x,y,movementX,movementY);
		}
	}
	,sendWheelEvent: function(windowId,delta) {
		if(kha_netsync_Session.the() != null) {
			var bytes = new haxe_io_Bytes(new ArrayBuffer(12));
			bytes.setInt32(0,4);
			bytes.setInt32(4,windowId);
			bytes.setInt32(8,delta);
			kha_netsync_Session.the().sendControllerUpdate(this._id(),bytes);
		}
		if(this.windowWheelListeners != null) {
			var _g = 0;
			var _g1 = this.windowWheelListeners[windowId];
			while(_g < _g1.length) _g1[_g++](delta);
		}
	}
	,_receive: function(bytes) {
		var funcindex = bytes.getInt32(0);
		if(funcindex == 0) {
			this.sendLeaveEvent(bytes.getInt32(4));
			return;
		}
		if(funcindex == 1) {
			this.sendDownEvent(bytes.getInt32(4),bytes.getInt32(8),bytes.getInt32(12),bytes.getInt32(16));
			return;
		}
		if(funcindex == 2) {
			this.sendUpEvent(bytes.getInt32(4),bytes.getInt32(8),bytes.getInt32(12),bytes.getInt32(16));
			return;
		}
		if(funcindex == 3) {
			this.sendMoveEvent(bytes.getInt32(4),bytes.getInt32(8),bytes.getInt32(12),bytes.getInt32(16),bytes.getInt32(20));
			return;
		}
		if(funcindex == 4) {
			this.sendWheelEvent(bytes.getInt32(4),bytes.getInt32(8));
			return;
		}
	}
	,__class__: kha_input_Mouse
});
var kha_input_MouseImpl = function() {
	kha_input_Mouse.call(this);
};
$hxClasses["kha.input.MouseImpl"] = kha_input_MouseImpl;
kha_input_MouseImpl.__name__ = true;
kha_input_MouseImpl.__super__ = kha_input_Mouse;
kha_input_MouseImpl.prototype = $extend(kha_input_Mouse.prototype,{
	lock: function() {
		kha_SystemImpl.lockMouse();
	}
	,unlock: function() {
		kha_SystemImpl.unlockMouse();
	}
	,canLock: function() {
		return kha_SystemImpl.canLockMouse();
	}
	,isLocked: function() {
		return kha_SystemImpl.isMouseLocked();
	}
	,notifyOnLockChange: function(func,error) {
		kha_SystemImpl.notifyOfMouseLockChange(func,error);
	}
	,removeFromLockChange: function(func,error) {
		kha_SystemImpl.removeFromMouseLockChange(func,error);
	}
	,hideSystemCursor: function() {
		kha_SystemImpl.khanvas.style.cursor = "none";
	}
	,showSystemCursor: function() {
		kha_SystemImpl.khanvas.style.cursor = "default";
	}
	,setSystemCursor: function(cursor) {
		var tmp;
		switch(cursor._hx_index) {
		case 0:
			tmp = "default";
			break;
		case 1:
			tmp = "pointer";
			break;
		case 2:
			tmp = "text";
			break;
		case 3:
			tmp = "ew-resize";
			break;
		case 4:
			tmp = "ns-resize";
			break;
		case 5:
			tmp = "ne-resize";
			break;
		case 6:
			tmp = "se-resize";
			break;
		case 7:
			tmp = "nw-resize";
			break;
		case 8:
			tmp = "sw-resize";
			break;
		case 9:
			tmp = "grab";
			break;
		case 10:
			tmp = "grabbing";
			break;
		case 11:
			tmp = "not-allowed";
			break;
		case 12:
			tmp = "wait";
			break;
		case 13:
			tmp = "crosshair";
			break;
		case 14:
			var _g = cursor.image;
			var canvas = window.document.createElement("canvas");
			canvas.width = _g.get_width();
			canvas.height = _g.get_height();
			if(((_g) instanceof kha_WebGLImage)) {
				canvas.getContext("2d",null).drawImage((js_Boot.__cast(_g , kha_WebGLImage)).image,0,0);
			} else {
				canvas.getContext("2d",null).drawImage((js_Boot.__cast(_g , kha_CanvasImage)).image,0,0);
			}
			var dataURL = canvas.toDataURL("image/png");
			dataURL = StringTools.replace(dataURL,"/^data:image\\/(png|jpg);base64,/","");
			tmp = "url('" + dataURL + "'),auto";
			break;
		}
		kha_SystemImpl.khanvas.style.cursor = tmp;
	}
	,_receive: function(bytes) {
		bytes.getInt32(0);
	}
	,__class__: kha_input_MouseImpl
});
var kha_input_TouchDownEventBlockBehavior = $hxEnums["kha.input.TouchDownEventBlockBehavior"] = { __ename__:true,__constructs__:null
	,Full: {_hx_name:"Full",_hx_index:0,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}
	,None: {_hx_name:"None",_hx_index:1,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:2,func:func,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_TouchDownEventBlockBehavior.__constructs__ = [kha_input_TouchDownEventBlockBehavior.Full,kha_input_TouchDownEventBlockBehavior.None,kha_input_TouchDownEventBlockBehavior.Custom];
var kha_input_Surface = $hx_exports["kha"]["input"]["Surface"] = function() {
	this.touchStartListeners = [];
	this.touchEndListeners = [];
	this.moveListeners = [];
	kha_input_Surface.instance = this;
};
$hxClasses["kha.input.Surface"] = kha_input_Surface;
kha_input_Surface.__name__ = true;
kha_input_Surface.get = function(num) {
	if(num == null) {
		num = 0;
	}
	if(num != 0) {
		return null;
	}
	return kha_input_Surface.instance;
};
kha_input_Surface.setTouchDownEventBlockBehavior = function(behavior) {
	kha_input_Surface.touchDownEventBlockBehavior = behavior;
};
kha_input_Surface.prototype = {
	notify: function(touchStartListener,touchEndListener,moveListener) {
		if(touchStartListener != null) {
			this.touchStartListeners.push(touchStartListener);
		}
		if(touchEndListener != null) {
			this.touchEndListeners.push(touchEndListener);
		}
		if(moveListener != null) {
			this.moveListeners.push(moveListener);
		}
	}
	,remove: function(touchStartListener,touchEndListener,moveListener) {
		if(touchStartListener != null) {
			HxOverrides.remove(this.touchStartListeners,touchStartListener);
		}
		if(touchEndListener != null) {
			HxOverrides.remove(this.touchEndListeners,touchEndListener);
		}
		if(moveListener != null) {
			HxOverrides.remove(this.moveListeners,moveListener);
		}
	}
	,touchStartListeners: null
	,touchEndListeners: null
	,moveListeners: null
	,sendTouchStartEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.touchStartListeners;
		while(_g < _g1.length) _g1[_g++](index,x,y);
	}
	,sendTouchEndEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.touchEndListeners;
		while(_g < _g1.length) _g1[_g++](index,x,y);
	}
	,sendMoveEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.moveListeners;
		while(_g < _g1.length) _g1[_g++](index,x,y);
	}
	,__class__: kha_input_Surface
};
var kha_internal_BytesBlob = function(bytes) {
	this.bytes = bytes;
};
$hxClasses["kha.internal.BytesBlob"] = kha_internal_BytesBlob;
kha_internal_BytesBlob.__name__ = true;
kha_internal_BytesBlob.__interfaces__ = [kha_Resource];
kha_internal_BytesBlob.fromBytes = function(bytes) {
	return new kha_internal_BytesBlob(bytes);
};
kha_internal_BytesBlob.alloc = function(size) {
	return new kha_internal_BytesBlob(new haxe_io_Bytes(new ArrayBuffer(size)));
};
kha_internal_BytesBlob.prototype = {
	bytes: null
	,sub: function(start,length) {
		return new kha_internal_BytesBlob(this.bytes.sub(start,length));
	}
	,length: null
	,get_length: function() {
		return this.bytes.length;
	}
	,writeU8: function(position,value) {
		this.bytes.b[position] = value;
	}
	,readU8: function(position) {
		return this.bytes.b[position++];
	}
	,toString: function() {
		return this.bytes.toString();
	}
	,toBytes: function() {
		return this.bytes;
	}
	,__class__: kha_internal_BytesBlob
};
var kha_internal_HdrFormat = function() { };
$hxClasses["kha.internal.HdrFormat"] = kha_internal_HdrFormat;
kha_internal_HdrFormat.__name__ = true;
kha_internal_HdrFormat.readBuf = function(buf) {
	var bytesRead = 0;
	while(true) {
		buf[bytesRead++] = kha_internal_HdrFormat.buffer[kha_internal_HdrFormat.fileOffset];
		if(!(++kha_internal_HdrFormat.fileOffset < kha_internal_HdrFormat.bufferLength && bytesRead < buf.length)) {
			break;
		}
	}
	return bytesRead;
};
kha_internal_HdrFormat.readBufOffset = function(buf,offset,length) {
	var bytesRead = 0;
	while(true) {
		buf[offset + bytesRead++] = kha_internal_HdrFormat.buffer[kha_internal_HdrFormat.fileOffset];
		if(!(++kha_internal_HdrFormat.fileOffset < kha_internal_HdrFormat.bufferLength && bytesRead < length)) {
			break;
		}
	}
	return bytesRead;
};
kha_internal_HdrFormat.readPixelsRaw = function(buffer,data,offset,numpixels) {
	var numExpected = 4 * numpixels;
	var numRead = kha_internal_HdrFormat.readBufOffset(data,offset,numExpected);
	if(numRead < numExpected) {
		haxe_Log.trace("Error reading raw pixels: got " + numRead + " bytes, expected " + numExpected,{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 39, className : "kha.internal.HdrFormat", methodName : "readPixelsRaw"});
		return;
	}
};
kha_internal_HdrFormat.readPixelsRawRLE = function(buffer,data,offset,scanline_width,num_scanlines) {
	var rgbe = new Uint8Array(4);
	var scanline_buffer = null;
	var ptr;
	var ptr_end;
	var count;
	var buf = new Uint8Array(2);
	while(num_scanlines > 0) {
		if(kha_internal_HdrFormat.readBuf(rgbe) < rgbe.length) {
			haxe_Log.trace("Error reading bytes: expected " + rgbe.length,{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 55, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
			return;
		}
		if(rgbe[0] != 2 || rgbe[1] != 2 || (rgbe[2] & 128) != 0) {
			data[offset++] = rgbe[0];
			data[offset++] = rgbe[1];
			data[offset++] = rgbe[2];
			data[offset++] = rgbe[3];
			kha_internal_HdrFormat.readPixelsRaw(buffer,data,offset,scanline_width * num_scanlines - 1);
			return;
		}
		if(((rgbe[2] & 255) << 8 | rgbe[3] & 255) != scanline_width) {
			haxe_Log.trace("Wrong scanline width " + ((rgbe[2] & 255) << 8 | rgbe[3] & 255) + ", expected " + scanline_width,{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 70, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
			return;
		}
		if(scanline_buffer == null) {
			scanline_buffer = new Uint8Array(4 * scanline_width);
		}
		ptr = 0;
		var _g = 0;
		while(_g < 4) {
			ptr_end = (_g++ + 1) * scanline_width;
			while(ptr < ptr_end) {
				if(kha_internal_HdrFormat.readBuf(buf) < buf.length) {
					haxe_Log.trace("Error reading 2-byte buffer",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 84, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
					return;
				}
				if((buf[0] & 255) > 128) {
					count = (buf[0] & 255) - 128;
					if(count == 0 || count > ptr_end - ptr) {
						haxe_Log.trace("Bad scanline data",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 91, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
						return;
					}
					while(count-- > 0) scanline_buffer[ptr++] = buf[1];
				} else {
					count = buf[0] & 255;
					if(count == 0 || count > ptr_end - ptr) {
						haxe_Log.trace("Bad scanline data",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 102, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
						return;
					}
					scanline_buffer[ptr++] = buf[1];
					if(--count > 0) {
						if(kha_internal_HdrFormat.readBufOffset(scanline_buffer,ptr,count) < count) {
							haxe_Log.trace("Error reading non-run data",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 108, className : "kha.internal.HdrFormat", methodName : "readPixelsRawRLE"});
							return;
						}
						ptr += count;
					}
				}
			}
		}
		var _g1 = 0;
		while(_g1 < scanline_width) {
			var i = _g1++;
			data[offset] = scanline_buffer[i];
			data[offset + 1] = scanline_buffer[i + scanline_width];
			data[offset + 2] = scanline_buffer[i + 2 * scanline_width];
			data[offset + 3] = scanline_buffer[i + 3 * scanline_width];
			offset += 4;
		}
		--num_scanlines;
	}
};
kha_internal_HdrFormat.readLine = function() {
	var buf = "";
	while(true) {
		var b = kha_internal_HdrFormat.buffer[kha_internal_HdrFormat.fileOffset];
		if(b == 10) {
			++kha_internal_HdrFormat.fileOffset;
			break;
		}
		buf += String.fromCodePoint(b);
		if(!(++kha_internal_HdrFormat.fileOffset < kha_internal_HdrFormat.bufferLength)) {
			break;
		}
	}
	return buf;
};
kha_internal_HdrFormat.parse = function(bytes) {
	kha_internal_HdrFormat.buffer = haxe_io_UInt8Array.fromBytes(bytes);
	kha_internal_HdrFormat.bufferLength = kha_internal_HdrFormat.buffer.length;
	kha_internal_HdrFormat.fileOffset = 0;
	var width = 0;
	var height = 0;
	var rle = false;
	var _g = 0;
	while(_g < 20) {
		++_g;
		var line = kha_internal_HdrFormat.readLine();
		if(kha_internal_HdrFormat.formatPattern.match(line)) {
			rle = true;
		} else if(kha_internal_HdrFormat.exposurePattern.match(line)) {
			parseFloat(kha_internal_HdrFormat.exposurePattern.matched(1));
		} else if(kha_internal_HdrFormat.widthHeightPattern.match(line)) {
			height = Std.parseInt(kha_internal_HdrFormat.widthHeightPattern.matched(1));
			width = Std.parseInt(kha_internal_HdrFormat.widthHeightPattern.matched(2));
			break;
		}
	}
	if(!rle) {
		haxe_Log.trace("File is not run length encoded!",{ fileName : "kha/internal/HdrFormat.hx", lineNumber : 171, className : "kha.internal.HdrFormat", methodName : "parse"});
		return null;
	}
	var data = new Uint8Array(width * height * 4);
	kha_internal_HdrFormat.readPixelsRawRLE(kha_internal_HdrFormat.buffer,data,0,width,height);
	var floatData = new Float32Array(width * height * 4);
	var offset = 0;
	while(offset < data.length) {
		var r = data[offset] / 255;
		var g = data[offset + 1] / 255;
		var b = data[offset + 2] / 255;
		var f = Math.pow(2.0,data[offset + 3] - 128.0);
		r *= f;
		g *= f;
		b *= f;
		floatData[offset] = r;
		floatData[offset + 1] = g;
		floatData[offset + 2] = b;
		floatData[offset + 3] = 1.0;
		offset += 4;
	}
	return { width : width, height : height, data : floatData};
};
var kha_js_AEAudioChannel = function(element,looping) {
	this.stopped = false;
	this.element = element;
	this.looping = looping;
};
$hxClasses["kha.js.AEAudioChannel"] = kha_js_AEAudioChannel;
kha_js_AEAudioChannel.__name__ = true;
kha_js_AEAudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_js_AEAudioChannel.prototype = {
	element: null
	,stopped: null
	,looping: null
	,play: function() {
		this.stopped = false;
		this.element.play();
	}
	,get_length: function() {
		var f = this.element.duration;
		if(isFinite(f)) {
			return this.element.duration;
		} else {
			return Infinity;
		}
	}
	,set_position: function(value) {
		return this.element.currentTime = value;
	}
	,__class__: kha_js_AEAudioChannel
};
var kha_js_AudioElementAudio = function() { };
$hxClasses["kha.js.AudioElementAudio"] = kha_js_AudioElementAudio;
kha_js_AudioElementAudio.__name__ = true;
kha_js_AudioElementAudio.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	return kha_js_AudioElementAudio.stream(sound,loop);
};
kha_js_AudioElementAudio.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	sound.element.loop = loop;
	var channel = new kha_js_AEAudioChannel(sound.element,loop);
	channel.play();
	return channel;
};
var kha_js_CanvasGraphics = function(canvas) {
	this.bakedQuadCache = new kha_AlignedQuad();
	kha_graphics2_Graphics.call(this);
	this.canvas = canvas;
	kha_js_CanvasGraphics.instance = this;
	this.myColor = kha_Color.fromBytes(0,0,0);
};
$hxClasses["kha.js.CanvasGraphics"] = kha_js_CanvasGraphics;
kha_js_CanvasGraphics.__name__ = true;
kha_js_CanvasGraphics.__super__ = kha_graphics2_Graphics;
kha_js_CanvasGraphics.prototype = $extend(kha_graphics2_Graphics.prototype,{
	canvas: null
	,webfont: null
	,myColor: null
	,begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		if(clear) {
			this.clear(clearColor);
		}
	}
	,clear: function(color) {
		if(color == null) {
			color = 0;
		}
		this.canvas.strokeStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		this.canvas.fillStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		if((color >>> 24) * 0.00392156862745098 == 0) {
			this.canvas.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
		} else {
			this.canvas.fillRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
		}
		this.set_color(this.myColor);
	}
	,end: function() {
	}
	,drawImage: function(img,x,y) {
		this.canvas.globalAlpha = this.get_opacity();
		this.canvas.drawImage((js_Boot.__cast(img , kha_CanvasImage)).image,x,y);
		this.canvas.globalAlpha = 1;
	}
	,drawScaledSubImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
		this.canvas.globalAlpha = this.get_opacity();
		try {
			if(dw < 0 || dh < 0) {
				this.canvas.save();
				this.canvas.translate(dx,dy);
				var x = 0.0;
				var y = 0.0;
				if(dw < 0) {
					this.canvas.scale(-1,1);
					x = -dw;
				}
				if(dh < 0) {
					this.canvas.scale(1,-1);
					y = -dh;
				}
				this.canvas.drawImage((js_Boot.__cast(image , kha_CanvasImage)).image,sx,sy,sw,sh,x,y,dw,dh);
				this.canvas.restore();
			} else {
				this.canvas.drawImage((js_Boot.__cast(image , kha_CanvasImage)).image,sx,sy,sw,sh,dx,dy,dw,dh);
			}
		} catch( _g ) {
		}
		this.canvas.globalAlpha = 1;
	}
	,set_color: function(color) {
		this.myColor = color;
		this.canvas.strokeStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		this.canvas.fillStyle = "rgba(" + ((color & 16711680) >>> 16) + "," + ((color & 65280) >>> 8) + "," + (color & 255) + "," + (color >>> 24) * 0.00392156862745098 + ")";
		return color;
	}
	,bakedQuadCache: null
	,drawString: function(text,x,y) {
		var image = this.webfont.getImage(this.get_fontSize(),this.myColor);
		if(image.width > 0) {
			var xpos = x;
			var _g = 0;
			var _g1 = text.length;
			while(_g < _g1) {
				var q = this.webfont.kravur._get(this.get_fontSize()).getBakedQuad(this.bakedQuadCache,kha_graphics2_Graphics.fontGlyphs.indexOf(HxOverrides.cca(text,_g++)),xpos,y);
				if(q != null) {
					if(q.s1 - q.s0 > 0 && q.t1 - q.t0 > 0 && q.x1 - q.x0 > 0 && q.y1 - q.y0 > 0) {
						this.canvas.drawImage(image,q.s0 * image.width,q.t0 * image.height,(q.s1 - q.s0) * image.width,(q.t1 - q.t0) * image.height,q.x0,q.y0,q.x1 - q.x0,q.y1 - q.y0);
					}
					xpos += q.xadvance;
				}
			}
		}
	}
	,set_font: function(font) {
		this.webfont = js_Boot.__cast(font , kha_js_Font);
		return this.webfont;
	}
	,__class__: kha_js_CanvasGraphics
});
var kha_js_Font = function(blob) {
	this.images = new haxe_ds_IntMap();
	this.kravur = new kha_js_Font.Kravur(blob);
};
$hxClasses["kha.js.Font"] = kha_js_Font;
kha_js_Font.__name__ = true;
kha_js_Font.__interfaces__ = [kha_Resource];
kha_js_Font.prototype = {
	kravur: null
	,images: null
	,getImage: function(fontSize,color) {
		var imageIndex = fontSize * 10000 + kha_graphics2_Graphics.fontGlyphs.length;
		if(!this.images.h.hasOwnProperty(imageIndex)) {
			this.images.h[imageIndex] = new haxe_ds_IntMap();
		}
		if(!this.images.h[imageIndex].h.hasOwnProperty(color)) {
			var kravur = this.kravur._get(fontSize);
			var canvas = window.document.createElement("canvas");
			canvas.width = kravur.width;
			canvas.height = kravur.height;
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,kravur.width,kravur.height);
			var imageData = ctx.getImageData(0,0,kravur.width,kravur.height);
			var bytes = (js_Boot.__cast(kravur.getTexture() , kha_CanvasImage)).bytes;
			var _g = 0;
			var _g1 = bytes.length;
			while(_g < _g1) {
				var i = _g++;
				imageData.data[i * 4] = (color & 16711680) >>> 16;
				imageData.data[i * 4 + 1] = (color & 65280) >>> 8;
				imageData.data[i * 4 + 2] = color & 255;
				imageData.data[i * 4 + 3] = bytes.b[i];
			}
			ctx.putImageData(imageData,0,0);
			var img = window.document.createElement("img");
			img.src = canvas.toDataURL("image/png");
			this.images.h[imageIndex].h[color] = img;
			return img;
		}
		return this.images.h[imageIndex].h[color];
	}
	,__class__: kha_js_Font
};
var kha_js_MobileWebAudio = function() { };
$hxClasses["kha.js.MobileWebAudio"] = kha_js_MobileWebAudio;
kha_js_MobileWebAudio.__name__ = true;
kha_js_MobileWebAudio._init = function() {
	try {
		kha_js_MobileWebAudio._context = new AudioContext();
		return;
	} catch( _g ) {
	}
	try {
		this._context = new webkitAudioContext();
		return;
	} catch( _g ) {
	}
};
kha_js_MobileWebAudio.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var channel = new kha_js_MobileWebAudioChannel(sound,loop);
	channel.play();
	return channel;
};
kha_js_MobileWebAudio.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	return kha_js_MobileWebAudio.play(sound,loop);
};
var kha_js_MobileWebAudioChannel = function(sound,loop) {
	this.stopped = false;
	this.paused = false;
	this.buffer = sound._buffer;
	this.loop = loop;
	this.createSource();
};
$hxClasses["kha.js.MobileWebAudioChannel"] = kha_js_MobileWebAudioChannel;
kha_js_MobileWebAudioChannel.__name__ = true;
kha_js_MobileWebAudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_js_MobileWebAudioChannel.prototype = {
	buffer: null
	,loop: null
	,source: null
	,gain: null
	,startTime: null
	,pauseTime: null
	,paused: null
	,stopped: null
	,createSource: function() {
		var _gthis = this;
		this.source = kha_js_MobileWebAudio._context.createBufferSource();
		this.source.loop = this.loop;
		this.source.buffer = this.buffer;
		this.source.onended = function() {
			_gthis.stopped = true;
		};
		this.gain = kha_js_MobileWebAudio._context.createGain();
		this.source.connect(this.gain);
		this.gain.connect(kha_js_MobileWebAudio._context.destination);
	}
	,play: function() {
		if(this.paused || this.stopped) {
			this.createSource();
		}
		this.stopped = false;
		if(this.paused) {
			this.paused = false;
			this.startTime = kha_js_MobileWebAudio._context.currentTime - this.pauseTime;
			this.source.start(0,this.pauseTime);
		} else {
			this.startTime = kha_js_MobileWebAudio._context.currentTime;
			this.source.start();
		}
	}
	,__class__: kha_js_MobileWebAudioChannel
};
var kha_js_MobileWebAudioSound = function(filename,done,failed) {
	var _gthis = this;
	kha_Sound.call(this);
	var request = new XMLHttpRequest();
	request.open("GET",filename,true);
	request.responseType = "arraybuffer";
	request.onerror = function() {
		failed({ url : filename});
	};
	request.onload = function() {
		_gthis.compressedData = haxe_io_Bytes.ofData(request.response);
		_gthis.uncompressedData = null;
		kha_js_MobileWebAudio._context.decodeAudioData(_gthis.compressedData.b.bufferValue,function(buffer) {
			_gthis.length = buffer.duration;
			_gthis.channels = buffer.numberOfChannels;
			_gthis._buffer = buffer;
			done(_gthis);
		},function() {
			failed({ url : filename, error : "Audio format not supported"});
		});
	};
	request.send(null);
};
$hxClasses["kha.js.MobileWebAudioSound"] = kha_js_MobileWebAudioSound;
kha_js_MobileWebAudioSound.__name__ = true;
kha_js_MobileWebAudioSound.__super__ = kha_Sound;
kha_js_MobileWebAudioSound.prototype = $extend(kha_Sound.prototype,{
	_buffer: null
	,uncompress: function(done) {
		done();
	}
	,__class__: kha_js_MobileWebAudioSound
});
var kha_js_Sound = function(filenames,done,failed) {
	kha_Sound.call(this);
	this.done = done;
	this.failed = failed;
	kha_js_Sound.loading.push(this);
	this.element = window.document.createElement("audio");
	this.filenames = [];
	var _g = 0;
	while(_g < filenames.length) {
		var filename = filenames[_g];
		++_g;
		if(this.element.canPlayType("audio/ogg") != "" && StringTools.endsWith(filename,".ogg")) {
			this.filenames.push(filename);
		}
		if(this.element.canPlayType("audio/mp4") != "" && StringTools.endsWith(filename,".mp4")) {
			this.filenames.push(filename);
		}
		if(this.element.canPlayType("audio/wav") != "" && StringTools.endsWith(filename,".wav")) {
			this.filenames.push(filename);
		}
	}
	this.element.addEventListener("error",$bind(this,this.errorListener),false);
	this.element.addEventListener("canplay",$bind(this,this.canPlayThroughListener),false);
	this.element.src = this.filenames[0];
	this.element.preload = "auto";
	this.element.load();
};
$hxClasses["kha.js.Sound"] = kha_js_Sound;
kha_js_Sound.__name__ = true;
kha_js_Sound.__super__ = kha_Sound;
kha_js_Sound.prototype = $extend(kha_Sound.prototype,{
	filenames: null
	,done: null
	,failed: null
	,element: null
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g = 0;
			var _g1 = this.filenames.length - 1;
			while(_g < _g1) {
				var i = _g++;
				if(this.element.src == this.filenames[i]) {
					this.element.src = this.filenames[i + 1];
					return;
				}
			}
		}
		this.failed({ url : this.element.src});
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		this.done(this);
		HxOverrides.remove(kha_js_Sound.loading,this);
	}
	,uncompress: function(done) {
		done();
	}
	,__class__: kha_js_Sound
});
var kha_js_Video = function() {
	kha_Video.call(this);
};
$hxClasses["kha.js.Video"] = kha_js_Video;
kha_js_Video.__name__ = true;
kha_js_Video.fromFile = function(filenames,done) {
	var video = new kha_js_Video();
	video.done = done;
	video.element = window.document.createElement("video");
	video.filenames = [];
	var _g = 0;
	while(_g < filenames.length) {
		var filename = filenames[_g];
		++_g;
		if(video.element.canPlayType("video/webm") != "" && StringTools.endsWith(filename,".webm")) {
			video.filenames.push(filename);
		}
		if(video.element.canPlayType("video/mp4") != "" && StringTools.endsWith(filename,".mp4")) {
			video.filenames.push(filename);
		}
	}
	video.element.addEventListener("error",$bind(video,video.errorListener),false);
	video.element.addEventListener("canplaythrough",$bind(video,video.canPlayThroughListener),false);
	video.element.preload = "auto";
	video.element.src = video.filenames[0];
};
kha_js_Video.__super__ = kha_Video;
kha_js_Video.prototype = $extend(kha_Video.prototype,{
	element: null
	,texture: null
	,filenames: null
	,done: null
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g = 0;
			var _g1 = this.filenames.length - 1;
			while(_g < _g1) {
				var i = _g++;
				if(this.element.src == this.filenames[i]) {
					this.element.src = this.filenames[i + 1];
					return;
				}
			}
		}
		haxe_Log.trace("Error loading " + this.element.src,{ fileName : "kha/js/Video.hx", lineNumber : 132, className : "kha.js.Video", methodName : "errorListener"});
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		if(kha_SystemImpl.gl != null) {
			this.texture = kha_Image.fromVideo(this);
		}
		this.done(this);
	}
	,__class__: kha_js_Video
});
var kha_js_WebAudioSound = function(filename,done,failed) {
	var _gthis = this;
	kha_Sound.call(this);
	var request = new XMLHttpRequest();
	request.open("GET",filename,true);
	request.responseType = "arraybuffer";
	request.onerror = function() {
		failed({ url : filename});
	};
	request.onload = function() {
		_gthis.compressedData = haxe_io_Bytes.ofData(request.response);
		_gthis.uncompressedData = null;
		done(_gthis);
	};
	request.send(null);
};
$hxClasses["kha.js.WebAudioSound"] = kha_js_WebAudioSound;
kha_js_WebAudioSound.__name__ = true;
kha_js_WebAudioSound.__super__ = kha_Sound;
kha_js_WebAudioSound.prototype = $extend(kha_Sound.prototype,{
	superUncompress: function(done) {
		kha_Sound.prototype.uncompress.call(this,done);
	}
	,uncompress: function(done) {
		var _gthis = this;
		kha_audio2_Audio._context.decodeAudioData(this.compressedData.b.bufferValue,function(buffer) {
			var ch0 = buffer.getChannelData(0);
			var ch1 = buffer.numberOfChannels == 1 ? ch0 : buffer.getChannelData(1);
			var len = ch0.length;
			_gthis.uncompressedData = kha_arrays_Float32Array._new(len * 2);
			_gthis.length = buffer.duration;
			_gthis.channels = buffer.numberOfChannels;
			_gthis.sampleRate = Math.round(buffer.sampleRate);
			var idx = 0;
			var i = 0;
			var lidx = len * 2;
			var uncompressInner = null;
			uncompressInner = function() {
				var chk_len = idx + 11025;
				var next_chk = chk_len > lidx ? lidx : chk_len;
				while(idx < next_chk) {
					_gthis.uncompressedData.setFloat32(idx * 4,ch0[i],true);
					_gthis.uncompressedData.setFloat32((idx + 1) * 4,ch1[i],true);
					idx += 2;
					i += 1;
				}
				if(idx < lidx) {
					window.setTimeout(uncompressInner,0);
				} else {
					_gthis.compressedData = null;
					done();
				}
			};
			uncompressInner();
		},function() {
			_gthis.superUncompress(done);
		});
	}
	,__class__: kha_js_WebAudioSound
});
var kha_js_graphics4_ConstantLocation = function(value,type) {
	this.value = value;
	this.type = type;
};
$hxClasses["kha.js.graphics4.ConstantLocation"] = kha_js_graphics4_ConstantLocation;
kha_js_graphics4_ConstantLocation.__name__ = true;
kha_js_graphics4_ConstantLocation.__interfaces__ = [kha_graphics4_ConstantLocation];
kha_js_graphics4_ConstantLocation.prototype = {
	value: null
	,type: null
	,__class__: kha_js_graphics4_ConstantLocation
};
var kha_js_graphics4_Graphics = function(renderTarget) {
	this.matrixCache = kha_arrays_Float32Array._new(16);
	this.useVertexAttributes = 0;
	this.isDepthAttachment = false;
	this.isCubeMap = false;
	this.colorMaskAlpha = true;
	this.colorMaskBlue = true;
	this.colorMaskGreen = true;
	this.colorMaskRed = true;
	this.depthMask = false;
	this.depthTest = false;
	this.currentPipeline = null;
	this.renderTarget = renderTarget;
	this.init();
	if(kha_SystemImpl.gl2) {
		this.instancedExtension = true;
	} else {
		this.instancedExtension = kha_SystemImpl.gl.getExtension("ANGLE_instanced_arrays");
		this.blendMinMaxExtension = kha_SystemImpl.gl.getExtension("EXT_blend_minmax");
	}
};
$hxClasses["kha.js.graphics4.Graphics"] = kha_js_graphics4_Graphics;
kha_js_graphics4_Graphics.__name__ = true;
kha_js_graphics4_Graphics.__interfaces__ = [kha_graphics4_Graphics];
kha_js_graphics4_Graphics.getBlendFunc = function(factor) {
	switch(factor) {
	case 1:
		return 1;
	case 0:case 2:
		return 0;
	case 3:
		return 770;
	case 4:
		return 772;
	case 5:
		return 771;
	case 6:
		return 773;
	case 7:
		return 768;
	case 8:
		return 774;
	case 9:
		return 769;
	case 10:
		return 775;
	}
};
kha_js_graphics4_Graphics.getBlendOp = function(op) {
	switch(op) {
	case 0:
		return 32774;
	case 1:
		return 32778;
	case 2:
		return 32779;
	case 3:
		return 32775;
	case 4:
		return 32776;
	}
};
kha_js_graphics4_Graphics.prototype = {
	currentPipeline: null
	,depthTest: null
	,depthMask: null
	,colorMaskRed: null
	,colorMaskGreen: null
	,colorMaskBlue: null
	,colorMaskAlpha: null
	,indicesCount: null
	,renderTarget: null
	,renderTargetFrameBuffer: null
	,renderTargetMSAA: null
	,renderTargetTexture: null
	,isCubeMap: null
	,isDepthAttachment: null
	,instancedExtension: null
	,blendMinMaxExtension: null
	,useVertexAttributes: null
	,init: function() {
		if(this.renderTarget == null) {
			return;
		}
		this.isCubeMap = ((this.renderTarget) instanceof kha_graphics4_CubeMap);
		if(this.isCubeMap) {
			var cubeMap = js_Boot.__cast(this.renderTarget , kha_graphics4_CubeMap);
			this.renderTargetFrameBuffer = cubeMap.frameBuffer;
			this.renderTargetTexture = cubeMap.texture;
			this.isDepthAttachment = cubeMap.isDepthAttachment;
		} else {
			var image = js_Boot.__cast(this.renderTarget , kha_WebGLImage);
			this.renderTargetFrameBuffer = image.frameBuffer;
			this.renderTargetMSAA = image.MSAAFrameBuffer;
			this.renderTargetTexture = image.texture;
		}
	}
	,begin: function(additionalRenderTargets) {
		kha_SystemImpl.gl.enable(3042);
		kha_SystemImpl.gl.blendFunc(770,771);
		if(this.renderTarget == null) {
			kha_SystemImpl.gl.bindFramebuffer(36160,null);
			kha_SystemImpl.gl.viewport(0,0,kha_System.windowWidth(),kha_System.windowHeight());
		} else {
			kha_SystemImpl.gl.bindFramebuffer(36160,this.renderTargetFrameBuffer);
			kha_SystemImpl.gl.viewport(0,0,this.renderTarget.get_width(),this.renderTarget.get_height());
			if(additionalRenderTargets != null) {
				kha_SystemImpl.gl.framebufferTexture2D(36160,kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL,3553,this.renderTargetTexture,0);
				var _g = 0;
				var _g1 = additionalRenderTargets.length;
				while(_g < _g1) {
					var i = _g++;
					kha_SystemImpl.gl.framebufferTexture2D(36160,kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL + i + 1,3553,(js_Boot.__cast(additionalRenderTargets[i] , kha_WebGLImage)).texture,0);
				}
				var attachments = [kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL];
				var _g = 0;
				var _g1 = additionalRenderTargets.length;
				while(_g < _g1) {
					var i = _g++;
					attachments.push(kha_SystemImpl.drawBuffers.COLOR_ATTACHMENT0_WEBGL + i + 1);
				}
				if(kha_SystemImpl.gl2) {
					kha_SystemImpl.gl.drawBuffers(attachments);
				} else {
					kha_SystemImpl.drawBuffers.drawBuffersWEBGL(attachments);
				}
			}
		}
	}
	,end: function() {
		if(this.renderTargetMSAA != null) {
			kha_SystemImpl.gl.bindFramebuffer(kha_SystemImpl.gl.READ_FRAMEBUFFER,this.renderTargetFrameBuffer);
			kha_SystemImpl.gl.bindFramebuffer(kha_SystemImpl.gl.DRAW_FRAMEBUFFER,this.renderTargetMSAA);
			kha_SystemImpl.gl.blitFramebuffer(0,0,this.renderTarget.get_width(),this.renderTarget.get_height(),0,0,this.renderTarget.get_width(),this.renderTarget.get_height(),16384,9728);
		}
	}
	,clear: function(color,depth,stencil) {
		var clearMask = 0;
		if(color != null) {
			clearMask = 16384;
			kha_SystemImpl.gl.colorMask(true,true,true,true);
			kha_SystemImpl.gl.clearColor(((color & 16711680) >>> 16) * 0.00392156862745098,((color & 65280) >>> 8) * 0.00392156862745098,(color & 255) * 0.00392156862745098,(color >>> 24) * 0.00392156862745098);
		}
		if(depth != null) {
			clearMask |= 256;
			kha_SystemImpl.gl.enable(2929);
			kha_SystemImpl.gl.depthMask(true);
			kha_SystemImpl.gl.clearDepth(depth);
		}
		if(stencil != null) {
			clearMask |= 1024;
			kha_SystemImpl.gl.enable(2960);
			kha_SystemImpl.gl.stencilMask(255);
			kha_SystemImpl.gl.clearStencil(stencil);
		}
		kha_SystemImpl.gl.clear(clearMask);
		kha_SystemImpl.gl.colorMask(this.colorMaskRed,this.colorMaskGreen,this.colorMaskBlue,this.colorMaskAlpha);
		if(this.depthTest) {
			kha_SystemImpl.gl.enable(2929);
		} else {
			kha_SystemImpl.gl.disable(2929);
		}
		kha_SystemImpl.gl.depthMask(this.depthMask);
	}
	,setDepthMode: function(write,mode) {
		switch(mode) {
		case 0:
			if(write) {
				kha_SystemImpl.gl.enable(2929);
			} else {
				kha_SystemImpl.gl.disable(2929);
			}
			this.depthTest = write;
			kha_SystemImpl.gl.depthFunc(519);
			break;
		case 1:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(512);
			break;
		case 2:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(514);
			break;
		case 3:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(517);
			break;
		case 4:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(513);
			break;
		case 5:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(515);
			break;
		case 6:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(516);
			break;
		case 7:
			kha_SystemImpl.gl.enable(2929);
			this.depthTest = true;
			kha_SystemImpl.gl.depthFunc(518);
			break;
		}
		kha_SystemImpl.gl.depthMask(write);
		this.depthMask = write;
	}
	,setBlendingMode: function(source,destination,operation,alphaSource,alphaDestination,alphaOperation) {
		if(source == 1 && destination == 2) {
			kha_SystemImpl.gl.disable(3042);
		} else {
			kha_SystemImpl.gl.enable(3042);
			kha_SystemImpl.gl.blendFuncSeparate(kha_js_graphics4_Graphics.getBlendFunc(source),kha_js_graphics4_Graphics.getBlendFunc(destination),kha_js_graphics4_Graphics.getBlendFunc(alphaSource),kha_js_graphics4_Graphics.getBlendFunc(alphaDestination));
			kha_SystemImpl.gl.blendEquationSeparate(kha_js_graphics4_Graphics.getBlendOp(operation),kha_js_graphics4_Graphics.getBlendOp(alphaOperation));
		}
	}
	,setVertexBuffer: function(vertexBuffer) {
		var _g = 0;
		var _g1 = this.useVertexAttributes;
		while(_g < _g1) kha_SystemImpl.gl.disableVertexAttribArray(_g++);
		this.useVertexAttributes = (js_Boot.__cast(vertexBuffer , kha_graphics4_VertexBuffer)).set(0);
	}
	,setIndexBuffer: function(indexBuffer) {
		this.indicesCount = indexBuffer.count();
		(js_Boot.__cast(indexBuffer , kha_graphics4_IndexBuffer)).set();
	}
	,setTexture: function(stage,texture) {
		if(texture == null) {
			kha_SystemImpl.gl.activeTexture(33984 + (js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
			kha_SystemImpl.gl.bindTexture(3553,null);
		} else {
			(js_Boot.__cast(texture , kha_WebGLImage)).set((js_Boot.__cast(stage , kha_js_graphics4_TextureUnit)).value);
		}
	}
	,setTextureParameters: function(texunit,uAddressing,vAddressing,minificationFilter,magnificationFilter,mipmapFilter) {
		kha_SystemImpl.gl.activeTexture(33984 + (js_Boot.__cast(texunit , kha_js_graphics4_TextureUnit)).value);
		switch(uAddressing) {
		case 0:
			kha_SystemImpl.gl.texParameteri(3553,10242,10497);
			break;
		case 1:
			kha_SystemImpl.gl.texParameteri(3553,10242,33648);
			break;
		case 2:
			kha_SystemImpl.gl.texParameteri(3553,10242,33071);
			break;
		}
		switch(vAddressing) {
		case 0:
			kha_SystemImpl.gl.texParameteri(3553,10243,10497);
			break;
		case 1:
			kha_SystemImpl.gl.texParameteri(3553,10243,33648);
			break;
		case 2:
			kha_SystemImpl.gl.texParameteri(3553,10243,33071);
			break;
		}
		switch(minificationFilter) {
		case 0:
			switch(mipmapFilter) {
			case 0:
				kha_SystemImpl.gl.texParameteri(3553,10241,9728);
				break;
			case 1:
				kha_SystemImpl.gl.texParameteri(3553,10241,9984);
				break;
			case 2:
				kha_SystemImpl.gl.texParameteri(3553,10241,9986);
				break;
			}
			break;
		case 1:case 2:
			switch(mipmapFilter) {
			case 0:
				kha_SystemImpl.gl.texParameteri(3553,10241,9729);
				break;
			case 1:
				kha_SystemImpl.gl.texParameteri(3553,10241,9985);
				break;
			case 2:
				kha_SystemImpl.gl.texParameteri(3553,10241,9987);
				break;
			}
			if(minificationFilter == 2) {
				kha_SystemImpl.gl.texParameteri(3553,kha_SystemImpl.anisotropicFilter.TEXTURE_MAX_ANISOTROPY_EXT,4);
			}
			break;
		}
		switch(magnificationFilter) {
		case 0:
			kha_SystemImpl.gl.texParameteri(3553,10240,9728);
			break;
		case 1:case 2:
			kha_SystemImpl.gl.texParameteri(3553,10240,9729);
			break;
		}
	}
	,setCullMode: function(mode) {
		switch(mode) {
		case 0:
			kha_SystemImpl.gl.enable(2884);
			kha_SystemImpl.gl.cullFace(1029);
			break;
		case 1:
			kha_SystemImpl.gl.enable(2884);
			kha_SystemImpl.gl.cullFace(1028);
			break;
		case 2:
			kha_SystemImpl.gl.disable(2884);
			break;
		}
	}
	,setPipeline: function(pipe) {
		this.setCullMode(pipe.cullMode);
		this.setDepthMode(pipe.depthWrite,pipe.depthMode);
		this.setStencilParameters(pipe.stencilMode,pipe.stencilBothPass,pipe.stencilDepthFail,pipe.stencilFail,pipe.stencilReferenceValue,pipe.stencilReadMask,pipe.stencilWriteMask);
		this.setBlendingMode(pipe.blendSource,pipe.blendDestination,pipe.blendOperation,pipe.alphaBlendSource,pipe.alphaBlendDestination,pipe.alphaBlendOperation);
		this.currentPipeline = pipe;
		pipe.set();
		this.colorMaskRed = pipe.colorWriteMasksRed[0];
		this.colorMaskGreen = pipe.colorWriteMasksGreen[0];
		this.colorMaskBlue = pipe.colorWriteMasksBlue[0];
		this.colorMaskAlpha = pipe.colorWriteMasksAlpha[0];
	}
	,matrixCache: null
	,setMatrix: function(location,matrix) {
		this.matrixCache.setFloat32(0,matrix._00,true);
		this.matrixCache.setFloat32(4,matrix._01,true);
		this.matrixCache.setFloat32(8,matrix._02,true);
		this.matrixCache.setFloat32(12,matrix._03,true);
		this.matrixCache.setFloat32(16,matrix._10,true);
		this.matrixCache.setFloat32(20,matrix._11,true);
		this.matrixCache.setFloat32(24,matrix._12,true);
		this.matrixCache.setFloat32(28,matrix._13,true);
		this.matrixCache.setFloat32(32,matrix._20,true);
		this.matrixCache.setFloat32(36,matrix._21,true);
		this.matrixCache.setFloat32(40,matrix._22,true);
		this.matrixCache.setFloat32(44,matrix._23,true);
		this.matrixCache.setFloat32(48,matrix._30,true);
		this.matrixCache.setFloat32(52,matrix._31,true);
		this.matrixCache.setFloat32(56,matrix._32,true);
		this.matrixCache.setFloat32(60,matrix._33,true);
		kha_SystemImpl.gl.uniformMatrix4fv((js_Boot.__cast(location , kha_js_graphics4_ConstantLocation)).value,false,new Float32Array(this.matrixCache.buffer,this.matrixCache.byteOffset,this.matrixCache.byteLength >> 2));
	}
	,drawIndexedVertices: function(start,count) {
		if(count == null) {
			count = -1;
		}
		if(start == null) {
			start = 0;
		}
		var type = kha_SystemImpl.elementIndexUint == null ? 5123 : 5125;
		kha_SystemImpl.gl.drawElements(4,count == -1 ? this.indicesCount : count,type,start * (type == 5123 ? 2 : 4));
	}
	,convertStencilAction: function(action) {
		switch(action) {
		case 0:
			return 7680;
		case 1:
			return 0;
		case 2:
			return 7681;
		case 3:
			return 7682;
		case 4:
			return 34055;
		case 5:
			return 7683;
		case 6:
			return 34056;
		case 7:
			return 5386;
		}
	}
	,convertCompareMode: function(compareMode) {
		switch(compareMode) {
		case 0:
			return 519;
		case 1:
			return 512;
		case 2:
			return 514;
		case 3:
			return 517;
		case 4:
			return 513;
		case 5:
			return 515;
		case 6:
			return 516;
		case 7:
			return 518;
		}
	}
	,setStencilParameters: function(compareMode,bothPass,depthFail,stencilFail,referenceValue,readMask,writeMask) {
		if(writeMask == null) {
			writeMask = 255;
		}
		if(readMask == null) {
			readMask = 255;
		}
		if(compareMode == 0 && bothPass == 0 && depthFail == 0 && stencilFail == 0) {
			kha_SystemImpl.gl.disable(2960);
		} else {
			kha_SystemImpl.gl.enable(2960);
			var stencilFunc = this.convertCompareMode(compareMode);
			kha_SystemImpl.gl.stencilMask(writeMask);
			kha_SystemImpl.gl.stencilOp(this.convertStencilAction(stencilFail),this.convertStencilAction(depthFail),this.convertStencilAction(bothPass));
			switch(referenceValue._hx_index) {
			case 0:
				kha_SystemImpl.gl.stencilFunc(stencilFunc,0,readMask);
				break;
			case 1:
				kha_SystemImpl.gl.stencilFunc(stencilFunc,referenceValue.value,readMask);
				break;
			}
		}
	}
	,__class__: kha_js_graphics4_Graphics
};
var kha_js_graphics4_Graphics2 = function(canvas) {
	kha_graphics4_Graphics2.call(this,canvas);
};
$hxClasses["kha.js.graphics4.Graphics2"] = kha_js_graphics4_Graphics2;
kha_js_graphics4_Graphics2.__name__ = true;
kha_js_graphics4_Graphics2.__super__ = kha_graphics4_Graphics2;
kha_js_graphics4_Graphics2.prototype = $extend(kha_graphics4_Graphics2.prototype,{
	begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		kha_SystemImpl.gl.colorMask(true,true,true,true);
		kha_SystemImpl.gl.disable(2929);
		kha_SystemImpl.gl.depthFunc(519);
		kha_graphics4_Graphics2.prototype.begin.call(this,clear,clearColor);
	}
	,__class__: kha_js_graphics4_Graphics2
});
var kha_js_graphics4_TextureUnit = function(value) {
	this.value = value;
};
$hxClasses["kha.js.graphics4.TextureUnit"] = kha_js_graphics4_TextureUnit;
kha_js_graphics4_TextureUnit.__name__ = true;
kha_js_graphics4_TextureUnit.__interfaces__ = [kha_graphics4_TextureUnit];
kha_js_graphics4_TextureUnit.prototype = {
	value: null
	,__class__: kha_js_graphics4_TextureUnit
};
var kha_vr_VrInterface = function() {
};
$hxClasses["kha.vr.VrInterface"] = kha_vr_VrInterface;
kha_vr_VrInterface.__name__ = true;
kha_vr_VrInterface.prototype = {
	IsVrEnabled: function() {
		return false;
	}
	,__class__: kha_vr_VrInterface
};
var kha_js_vr_VrInterface = function() {
	this.vrEnabled = false;
	kha_vr_VrInterface.call(this);
};
$hxClasses["kha.js.vr.VrInterface"] = kha_js_vr_VrInterface;
kha_js_vr_VrInterface.__name__ = true;
kha_js_vr_VrInterface.__super__ = kha_vr_VrInterface;
kha_js_vr_VrInterface.prototype = $extend(kha_vr_VrInterface.prototype,{
	vrEnabled: null
	,IsVrEnabled: function() {
		return this.vrEnabled;
	}
	,__class__: kha_js_vr_VrInterface
});
var kha_math_FastMatrix3 = function(_00,_10,_20,_01,_11,_21,_02,_12,_22) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
};
$hxClasses["kha.math.FastMatrix3"] = kha_math_FastMatrix3;
kha_math_FastMatrix3.__name__ = true;
kha_math_FastMatrix3.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_01: null
	,_11: null
	,_21: null
	,_02: null
	,_12: null
	,_22: null
	,__class__: kha_math_FastMatrix3
};
var kha_math_FastMatrix4 = function(_00,_10,_20,_30,_01,_11,_21,_31,_02,_12,_22,_32,_03,_13,_23,_33) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._30 = _30;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._31 = _31;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
	this._32 = _32;
	this._03 = _03;
	this._13 = _13;
	this._23 = _23;
	this._33 = _33;
};
$hxClasses["kha.math.FastMatrix4"] = kha_math_FastMatrix4;
kha_math_FastMatrix4.__name__ = true;
kha_math_FastMatrix4.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_30: null
	,_01: null
	,_11: null
	,_21: null
	,_31: null
	,_02: null
	,_12: null
	,_22: null
	,_32: null
	,_03: null
	,_13: null
	,_23: null
	,_33: null
	,__class__: kha_math_FastMatrix4
};
var kha_netsync_ControllerBuilder = function() { };
$hxClasses["kha.netsync.ControllerBuilder"] = kha_netsync_ControllerBuilder;
kha_netsync_ControllerBuilder.__name__ = true;
var kha_netsync_Session = function(maxPlayers,address,port) {
	this.controllers = new haxe_ds_IntMap();
	kha_netsync_Session.instance = this;
	this.maxPlayers = maxPlayers;
	this.address = address;
	this.port = port;
};
$hxClasses["kha.netsync.Session"] = kha_netsync_Session;
kha_netsync_Session.__name__ = true;
kha_netsync_Session.the = function() {
	return kha_netsync_Session.instance;
};
kha_netsync_Session.prototype = {
	controllers: null
	,maxPlayers: null
	,address: null
	,port: null
	,sendControllerUpdate: function(id,bytes) {
		if(this.controllers.h.hasOwnProperty(id)) {
			if(this.controllers.h[id]._inputBuffer.length < this.controllers.h[id]._inputBufferIndex + 4 + bytes.length) {
				var newBuffer = new haxe_io_Bytes(new ArrayBuffer(this.controllers.h[id]._inputBufferIndex + 4 + bytes.length));
				newBuffer.blit(0,this.controllers.h[id]._inputBuffer,0,this.controllers.h[id]._inputBufferIndex);
				this.controllers.h[id]._inputBuffer = newBuffer;
			}
			this.controllers.h[id]._inputBuffer.setInt32(this.controllers.h[id]._inputBufferIndex,bytes.length);
			this.controllers.h[id]._inputBuffer.blit(this.controllers.h[id]._inputBufferIndex + 4,bytes,0,bytes.length);
			this.controllers.h[id]._inputBufferIndex += 4 + bytes.length;
		}
	}
	,__class__: kha_netsync_Session
};
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = true;
$hxClasses["Array"] = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
var Main_spieler_x = 100;
var Main_spieler_y = 100;
var Main_spieler_x_richtung = 0;
var Main_spieler_y_richtung = 0;
var Main_spieler_fire = false;
var Main_spieler_punkte = 0;
var Main_geschwindigkeit = 10;
var Main_schuss_geschwindigkeit = -25;
var Main_fenster_breite = 0;
var Main_fenster_hoehe = 0;
var Main_breite = 0;
var Main_hoehe = 0;
var Main_sterne_liste = [];
var Main_gegner_liste = [];
var Main_schuss_liste = [];
var Main_cooldown = 0;
var Main_cooldown_max = 10;
var Main_gameover = false;
haxe_Unserializer.DEFAULT_RESOLVER = new haxe__$Unserializer_DefaultResolver();
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
kha_Assets.images = new kha__$Assets_ImageList();
kha_Assets.sounds = new kha__$Assets_SoundList();
kha_Assets.blobs = new kha__$Assets_BlobList();
kha_Assets.fonts = new kha__$Assets_FontList();
kha_Assets.videos = new kha__$Assets_VideoList();
kha_Display.instance = new kha_Display();
kha_LoaderImpl.dropFiles = new haxe_ds_StringMap();
kha_Scheduler.DIF_COUNT = 3;
kha_Scheduler.maxframetime = 0.5;
kha_Scheduler.startTime = 0;
kha_Shaders.painter_colored_fragData0 = "s198:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdmFyeWluZyBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9GcmFnRGF0YVswXSA9IGZyYWdtZW50Q29sb3I7Cn0KCg";
kha_Shaders.painter_colored_fragData1 = "s223:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwppbiBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBGcmFnQ29sb3IgPSBmcmFnbWVudENvbG9yOwp9Cgo";
kha_Shaders.painter_colored_fragData2 = "s192:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp2YXJ5aW5nIHZlYzQgZnJhZ21lbnRDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX0ZyYWdEYXRhWzBdID0gZnJhZ21lbnRDb2xvcjsKfQoK";
kha_Shaders.painter_colored_vertData0 = "s331:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzQgZnJhZ21lbnRDb2xvcjsKYXR0cmlidXRlIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgZnJhZ21lbnRDb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_colored_vertData1 = "s311:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWM0IGZyYWdtZW50Q29sb3I7CmluIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgZnJhZ21lbnRDb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_colored_vertData2 = "s374:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzQgZnJhZ21lbnRDb2xvcjsKYXR0cmlidXRlIG1lZGl1bXAgdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICBmcmFnbWVudENvbG9yID0gdmVydGV4Q29sb3I7Cn0KCg";
kha_Shaders.painter_image_fragData0 = "s471:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKdmFyeWluZyBoaWdocCB2ZWMyIHRleENvb3JkOwp2YXJ5aW5nIGhpZ2hwIHZlYzQgY29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBoaWdocCB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZTJEKHRleCwgdGV4Q29vcmQpICogY29sb3I7CiAgICBoaWdocCB2ZWMzIF8zMiA9IHRleGNvbG9yLnh5eiAqIGNvbG9yLnc7CiAgICB0ZXhjb2xvciA9IHZlYzQoXzMyLngsIF8zMi55LCBfMzIueiwgdGV4Y29sb3Iudyk7CiAgICBnbF9GcmFnRGF0YVswXSA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_image_fragData1 = "s487:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKaW4gaGlnaHAgdmVjMiB0ZXhDb29yZDsKaW4gaGlnaHAgdmVjNCBjb2xvcjsKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwoKdm9pZCBtYWluKCkKewogICAgaGlnaHAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUodGV4LCB0ZXhDb29yZCkgKiBjb2xvcjsKICAgIGhpZ2hwIHZlYzMgXzMyID0gdGV4Y29sb3IueHl6ICogY29sb3IudzsKICAgIHRleGNvbG9yID0gdmVjNChfMzIueCwgXzMyLnksIF8zMi56LCB0ZXhjb2xvci53KTsKICAgIEZyYWdDb2xvciA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_image_fragData2 = "s444:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp1bmlmb3JtIG1lZGl1bXAgc2FtcGxlcjJEIHRleDsKCnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKdmFyeWluZyB2ZWM0IGNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKSAqIGNvbG9yOwogICAgdmVjMyBfMzIgPSB0ZXhjb2xvci54eXogKiBjb2xvci53OwogICAgdGV4Y29sb3IgPSB2ZWM0KF8zMi54LCBfMzIueSwgXzMyLnosIHRleGNvbG9yLncpOwogICAgZ2xfRnJhZ0RhdGFbMF0gPSB0ZXhjb2xvcjsKfQoK";
kha_Shaders.painter_image_vertData0 = "s415:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSB2ZWMyIHRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzQgY29sb3I7CmF0dHJpYnV0ZSB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdGV4UG9zaXRpb247CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_image_vertData1 = "s380:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHRleFBvc2l0aW9uOwpvdXQgdmVjNCBjb2xvcjsKaW4gdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICB0ZXhDb29yZCA9IHRleFBvc2l0aW9uOwogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_image_vertData2 = "s479:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgdGV4UG9zaXRpb247CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IGNvbG9yOwphdHRyaWJ1dGUgbWVkaXVtcCB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdGV4UG9zaXRpb247CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_text_fragData0 = "s351:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKdmFyeWluZyBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7CnZhcnlpbmcgaGlnaHAgdmVjMiB0ZXhDb29yZDsKCnZvaWQgbWFpbigpCnsKICAgIGdsX0ZyYWdEYXRhWzBdID0gdmVjNChmcmFnbWVudENvbG9yLnh5eiwgdGV4dHVyZTJEKHRleCwgdGV4Q29vcmQpLnggKiBmcmFnbWVudENvbG9yLncpOwp9Cgo";
kha_Shaders.painter_text_fragData1 = "s367:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwppbiBoaWdocCB2ZWM0IGZyYWdtZW50Q29sb3I7CmluIGhpZ2hwIHZlYzIgdGV4Q29vcmQ7Cgp2b2lkIG1haW4oKQp7CiAgICBGcmFnQ29sb3IgPSB2ZWM0KGZyYWdtZW50Q29sb3IueHl6LCB0ZXh0dXJlKHRleCwgdGV4Q29vcmQpLnggKiBmcmFnbWVudENvbG9yLncpOwp9Cgo";
kha_Shaders.painter_text_fragData2 = "s340:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp1bmlmb3JtIG1lZGl1bXAgc2FtcGxlcjJEIHRleDsKCnZhcnlpbmcgdmVjNCBmcmFnbWVudENvbG9yOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9GcmFnRGF0YVswXSA9IHZlYzQoZnJhZ21lbnRDb2xvci54eXosIHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKS54ICogZnJhZ21lbnRDb2xvci53KTsKfQoK";
kha_Shaders.painter_text_vertData0 = "s436:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSB2ZWMyIHRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzQgZnJhZ21lbnRDb2xvcjsKYXR0cmlidXRlIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgdGV4Q29vcmQgPSB0ZXhQb3NpdGlvbjsKICAgIGZyYWdtZW50Q29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_text_vertData1 = "s402:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHRleFBvc2l0aW9uOwpvdXQgdmVjNCBmcmFnbWVudENvbG9yOwppbiB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdGV4UG9zaXRpb247CiAgICBmcmFnbWVudENvbG9yID0gdmVydGV4Q29sb3I7Cn0KCg";
kha_Shaders.painter_text_vertData2 = "s500:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgdGV4UG9zaXRpb247CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IGZyYWdtZW50Q29sb3I7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgdGV4Q29vcmQgPSB0ZXhQb3NpdGlvbjsKICAgIGZyYWdtZW50Q29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_video_fragData0 = "s471:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKdmFyeWluZyBoaWdocCB2ZWMyIHRleENvb3JkOwp2YXJ5aW5nIGhpZ2hwIHZlYzQgY29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBoaWdocCB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZTJEKHRleCwgdGV4Q29vcmQpICogY29sb3I7CiAgICBoaWdocCB2ZWMzIF8zMiA9IHRleGNvbG9yLnh5eiAqIGNvbG9yLnc7CiAgICB0ZXhjb2xvciA9IHZlYzQoXzMyLngsIF8zMi55LCBfMzIueiwgdGV4Y29sb3Iudyk7CiAgICBnbF9GcmFnRGF0YVswXSA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_video_fragData1 = "s487:I3ZlcnNpb24gMzAwIGVzCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gaGlnaHAgaW50OwoKdW5pZm9ybSBoaWdocCBzYW1wbGVyMkQgdGV4OwoKaW4gaGlnaHAgdmVjMiB0ZXhDb29yZDsKaW4gaGlnaHAgdmVjNCBjb2xvcjsKb3V0IGhpZ2hwIHZlYzQgRnJhZ0NvbG9yOwoKdm9pZCBtYWluKCkKewogICAgaGlnaHAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUodGV4LCB0ZXhDb29yZCkgKiBjb2xvcjsKICAgIGhpZ2hwIHZlYzMgXzMyID0gdGV4Y29sb3IueHl6ICogY29sb3IudzsKICAgIHRleGNvbG9yID0gdmVjNChfMzIueCwgXzMyLnksIF8zMi56LCB0ZXhjb2xvci53KTsKICAgIEZyYWdDb2xvciA9IHRleGNvbG9yOwp9Cgo";
kha_Shaders.painter_video_fragData2 = "s444:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OwpwcmVjaXNpb24gbWVkaXVtcCBpbnQ7Cgp1bmlmb3JtIG1lZGl1bXAgc2FtcGxlcjJEIHRleDsKCnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKdmFyeWluZyB2ZWM0IGNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgdmVjNCB0ZXhjb2xvciA9IHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKSAqIGNvbG9yOwogICAgdmVjMyBfMzIgPSB0ZXhjb2xvci54eXogKiBjb2xvci53OwogICAgdGV4Y29sb3IgPSB2ZWM0KF8zMi54LCBfMzIueSwgXzMyLnosIHRleGNvbG9yLncpOwogICAgZ2xfRnJhZ0RhdGFbMF0gPSB0ZXhjb2xvcjsKfQoK";
kha_Shaders.painter_video_vertData0 = "s415:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmF0dHJpYnV0ZSB2ZWMzIHZlcnRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSB2ZWMyIHRleFBvc2l0aW9uOwp2YXJ5aW5nIHZlYzQgY29sb3I7CmF0dHJpYnV0ZSB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdGV4UG9zaXRpb247CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_video_vertData1 = "s380:I3ZlcnNpb24gMzAwIGVzCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHRleFBvc2l0aW9uOwpvdXQgdmVjNCBjb2xvcjsKaW4gdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICB0ZXhDb29yZCA9IHRleFBvc2l0aW9uOwogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_video_vertData2 = "s479:I3ZlcnNpb24gMTAwCgp1bmlmb3JtIG1lZGl1bXAgbWF0NCBwcm9qZWN0aW9uTWF0cml4OwoKYXR0cmlidXRlIG1lZGl1bXAgdmVjMyB2ZXJ0ZXhQb3NpdGlvbjsKdmFyeWluZyBtZWRpdW1wIHZlYzIgdGV4Q29vcmQ7CmF0dHJpYnV0ZSBtZWRpdW1wIHZlYzIgdGV4UG9zaXRpb247CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IGNvbG9yOwphdHRyaWJ1dGUgbWVkaXVtcCB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdGV4UG9zaXRpb247CiAgICBjb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_System.renderListeners = [];
kha_System.foregroundListeners = [];
kha_System.backgroundListeners = [];
kha_System.shutdownListeners = [];
kha_System.dropFilesListeners = [];
kha_SystemImpl.mobile = false;
kha_SystemImpl.ios = false;
kha_SystemImpl.mobileAudioPlaying = false;
kha_SystemImpl.chrome = false;
kha_SystemImpl.firefox = false;
kha_SystemImpl.ie = false;
kha_SystemImpl.insideInputEvent = false;
kha_SystemImpl.estimatedRefreshRate = 60;
kha_SystemImpl.minimumScroll = 999;
kha_SystemImpl.lastFirstTouchX = 0;
kha_SystemImpl.lastFirstTouchY = 0;
kha_SystemImpl.iosSoundEnabled = false;
kha_SystemImpl.soundEnabled = false;
kha_SystemImpl.iosTouchs = [];
kha_Window.windows = [];
kha_Window.resizeCallbacks = [];
kha_arrays_ByteArray.LITTLE_ENDIAN = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
kha_audio2_Audio.disableGcInteractions = false;
kha_audio2_Audio.intBox = new kha_internal_IntBox(0);
kha_audio2_Audio.virtualChannels = [];
kha_audio2_Audio1.lastAllocationCount = 0;
kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE = [1.0649863e-07,1.1341951e-07,1.2079015e-07,1.2863978e-07,1.3699951e-07,1.4590251e-07,1.5538408e-07,1.6548181e-07,1.7623575e-07,1.8768855e-07,1.9988561e-07,2.1287530e-07,2.2670913e-07,2.4144197e-07,2.5713223e-07,2.7384213e-07,2.9163793e-07,3.1059021e-07,3.3077411e-07,3.5226968e-07,3.7516214e-07,3.9954229e-07,4.2550680e-07,4.5315863e-07,4.8260743e-07,5.1396998e-07,5.4737065e-07,5.8294187e-07,6.2082472e-07,6.6116941e-07,7.0413592e-07,7.4989464e-07,7.9862701e-07,8.5052630e-07,9.0579828e-07,9.6466216e-07,1.0273513e-06,1.0941144e-06,1.1652161e-06,1.2409384e-06,1.3215816e-06,1.4074654e-06,1.4989305e-06,1.5963394e-06,1.7000785e-06,1.8105592e-06,1.9282195e-06,2.0535261e-06,2.1869758e-06,2.3290978e-06,2.4804557e-06,2.6416497e-06,2.8133190e-06,2.9961443e-06,3.1908506e-06,3.3982101e-06,3.6190449e-06,3.8542308e-06,4.1047004e-06,4.3714470e-06,4.6555282e-06,4.9580707e-06,5.2802740e-06,5.6234160e-06,5.9888572e-06,6.3780469e-06,6.7925283e-06,7.2339451e-06,7.7040476e-06,8.2047000e-06,8.7378876e-06,9.3057248e-06,9.9104632e-06,1.0554501e-05,1.1240392e-05,1.1970856e-05,1.2748789e-05,1.3577278e-05,1.4459606e-05,1.5399272e-05,1.6400004e-05,1.7465768e-05,1.8600792e-05,1.9809576e-05,2.1096914e-05,2.2467911e-05,2.3928002e-05,2.5482978e-05,2.7139006e-05,2.8902651e-05,3.0780908e-05,3.2781225e-05,3.4911534e-05,3.7180282e-05,3.9596466e-05,4.2169667e-05,4.4910090e-05,4.7828601e-05,5.0936773e-05,5.4246931e-05,5.7772202e-05,6.1526565e-05,6.5524908e-05,6.9783085e-05,7.4317983e-05,7.9147585e-05,8.4291040e-05,8.9768747e-05,9.5602426e-05,0.00010181521,0.00010843174,0.00011547824,0.00012298267,0.00013097477,0.00013948625,0.00014855085,0.00015820453,0.00016848555,0.00017943469,0.00019109536,0.00020351382,0.00021673929,0.00023082423,0.00024582449,0.00026179955,0.00027881276,0.00029693158,0.00031622787,0.00033677814,0.00035866388,0.00038197188,0.00040679456,0.00043323036,0.00046138411,0.00049136745,0.00052329927,0.00055730621,0.00059352311,0.00063209358,0.00067317058,0.00071691700,0.00076350630,0.00081312324,0.00086596457,0.00092223983,0.00098217216,0.0010459992,0.0011139742,0.0011863665,0.0012634633,0.0013455702,0.0014330129,0.0015261382,0.0016253153,0.0017309374,0.0018434235,0.0019632195,0.0020908006,0.0022266726,0.0023713743,0.0025254795,0.0026895994,0.0028643847,0.0030505286,0.0032487691,0.0034598925,0.0036847358,0.0039241906,0.0041792066,0.0044507950,0.0047400328,0.0050480668,0.0053761186,0.0057254891,0.0060975636,0.0064938176,0.0069158225,0.0073652516,0.0078438871,0.0083536271,0.0088964928,0.009474637,0.010090352,0.010746080,0.011444421,0.012188144,0.012980198,0.013823725,0.014722068,0.015678791,0.016697687,0.017782797,0.018938423,0.020169149,0.021479854,0.022875735,0.024362330,0.025945531,0.027631618,0.029427276,0.031339626,0.033376252,0.035545228,0.037855157,0.040315199,0.042935108,0.045725273,0.048696758,0.051861348,0.055231591,0.058820850,0.062643361,0.066714279,0.071049749,0.075666962,0.080584227,0.085821044,0.091398179,0.097337747,0.10366330,0.11039993,0.11757434,0.12521498,0.13335215,0.14201813,0.15124727,0.16107617,0.17154380,0.18269168,0.19456402,0.20720788,0.22067342,0.23501402,0.25028656,0.26655159,0.28387361,0.30232132,0.32196786,0.34289114,0.36517414,0.38890521,0.41417847,0.44109412,0.46975890,0.50028648,0.53279791,0.56742212,0.60429640,0.64356699,0.68538959,0.72993007,0.77736504,0.82788260,0.88168307,0.9389798,1.0];
kha_graphics2_Graphics.fontGlyphs = (function($this) {
	var $r;
	var _g = [];
	{
		var _g1 = 32;
		while(_g1 < 256) _g.push(_g1++);
	}
	$r = _g;
	return $r;
}(this));
kha_input_Gamepad.__meta__ = { statics : { sendConnectEvent : { input : null}, sendDisconnectEvent : { input : null}}, fields : { sendAxisEvent : { input : null}, sendButtonEvent : { input : null}}};
kha_input_Gamepad.instances = [];
kha_input_Gamepad.connectListeners = [];
kha_input_Gamepad.disconnectListeners = [];
kha_input_Keyboard.__meta__ = { fields : { sendDownEvent : { input : null}, sendUpEvent : { input : null}, sendPressEvent : { input : null}}};
kha_input_Keyboard.keyBehavior = kha_input_BlockInterventions.Default;
kha_input_Mouse.__meta__ = { fields : { sendLeaveEvent : { input : null}, sendDownEvent : { input : null}, sendUpEvent : { input : null}, sendMoveEvent : { input : null}, sendWheelEvent : { input : null}}};
kha_input_Mouse.wheelEventBlockBehavior = kha_input_MouseEventBlockBehavior.Full;
kha_input_Surface.touchDownEventBlockBehavior = kha_input_TouchDownEventBlockBehavior.Full;
kha_internal_HdrFormat.exposurePattern = new EReg("EXPOSURE=\\s*([0-9]*[.][0-9]*)","i");
kha_internal_HdrFormat.formatPattern = new EReg("FORMAT=32-bit_rle_rgbe","i");
kha_internal_HdrFormat.widthHeightPattern = new EReg("-Y ([0-9]+) \\+X ([0-9]+)","i");
kha_js_Sound.loading = [];
kha_netsync_ControllerBuilder.nextId = 0;
Main_main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
