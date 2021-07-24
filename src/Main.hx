
var spieler_x = 100;
var spieler_y = 100;
var spieler_bild: kha.Image;

var spieler_x_richtung = 0;
var spieler_y_richtung = 0;
var spieler_fire = false;
var spieler_punkte = 0;

var geschwindigkeit = 10;
var schuss_geschwindigkeit = -25;

var fenster_breite = 0;
var fenster_hoehe = 0;

var breite = 0;
var hoehe = 0;

var sterne_liste: Array<Stern> = [];
var gegner_liste: Array<Gegner> = [];
var schuss_liste: Array<Schuss> = [];
var cooldown = 0;
var cooldown_max = 10;
var gameover = false;

@:structInit
class Stern {
	public var x: Float;
	public var y: Float;
	public var y_geschwindigkeit: Float;
}

@:structInit
class Gegner {
	public var bild: kha.Image;
	public var x: Float;
	public var y: Float;
	public var y_geschwindigkeit: Float;
}

@:structInit
class Schuss {
	public var bild: kha.Image;
	public var x: Float;
	public var y: Float;
	public var y_geschwindigkeit: Float;
	public var aktiv: Bool;
}

function main() {
	kha.System.start({ width: 1280, height: 720 }, function( wnd ) {
		kha.Assets.loadEverything(function() {
			kha.System.notifyOnFrames(male_alles);
			kha.input.Keyboard.get(0).notify(taste_gedrueckt, taste_losgelassen, null);

			final mouse = kha.input.Mouse.get(0);
			mouse.notify(maus_gedrueckt, maus_losgelassen, maus_bewegung, null, null);
			mouse.hideSystemCursor();

			spieler_bild = kha.Assets.images.spieler_schiff;
		});
	});
}

function male_alles( fbs: Array<kha.Framebuffer> ) {
	final fb = fbs[0];
	final g2 = fb.g2;

	fenster_breite = fb.width;
	fenster_hoehe = fb.height;

	if (sterne_liste.length == 0) {
		sterne_liste = [for (i in 0...100) {
			x: Std.random(fenster_breite),
			y: Std.random(fenster_hoehe),
			y_geschwindigkeit: 5 + Std.random(10),
		}];
	}

	if (gegner_liste.length == 0) {
		gegner_liste = [for (i in 0...10) {
			bild: kha.Assets.images.get('gegner_${1 + Std.random(3)}'),
			x: Std.random(fenster_breite),
			y: -Std.random(fenster_hoehe),
			y_geschwindigkeit: 2 + Std.random(10),
		}];
	}

	if (schuss_liste.length == 0) {
		schuss_liste = [for (i in 0...100) {
			bild: kha.Assets.images.get('bullet'),
			aktiv: false,
			x: 0,
			y: 0,
			y_geschwindigkeit: schuss_geschwindigkeit,
		}];
	}

	var spieler_schiff = kha.Assets.images.spieler_schiff;

	breite = spieler_schiff.width;
	hoehe = spieler_schiff.height;

	spieler_x = spieler_x + spieler_x_richtung;
	spieler_y = spieler_y + spieler_y_richtung;

	if (cooldown > 0) {
		cooldown -= 1;
	}

	if (spieler_fire && cooldown == 0) {
		cooldown = cooldown_max;

		for (i in 0...schuss_liste.length) {
			final schuss = schuss_liste[i];

			if (!schuss.aktiv) {
				schuss.aktiv = true;
				schuss.x = spieler_x;
				schuss.x += spieler_bild.width / 2;
				schuss.x -= schuss.bild.width / 2;

				schuss.y = spieler_y;
				break;
			}
		}
	}

	bewege_sterne();
	bewege_gegner();
	bewege_schuesse();
	berechne_schuss_gegner_collision();
	berechne_spieler_gegner_collision();

	g2.begin(true, kha.Color.Black);
		g2.color = White;

		for (i in 0...sterne_liste.length) {
			final stern = sterne_liste[i];
			g2.drawImage(kha.Assets.images.stern, stern.x, stern.y);
		}

		for (i in 0...gegner_liste.length) {
			final gegner = gegner_liste[i];
			g2.drawImage(gegner.bild, gegner.x, gegner.y);
		}

		for (i in 0...schuss_liste.length) {
			final schuss = schuss_liste[i];
			g2.drawImage(schuss.bild, schuss.x, schuss.y);
		}

		var text = 'SCORE: ${spieler_punkte}';
		var text_groesse = 48;

		if (!gameover) {
			g2.drawImage(spieler_bild, spieler_x, spieler_y);

			g2.color = Yellow;
			g2.font = kha.Assets.fonts.kenvector_future;
			g2.fontSize = text_groesse;
			g2.drawString(text, 4, 4);
		} else {
			g2.color = Red;
			g2.font = kha.Assets.fonts.kenvector_future;
			g2.fontSize = 48;
			var text_breite = kha.Assets.fonts.kenvector_future.width(48, 'GAMEOVER!');
			g2.drawString('GAMEOVER!', (fenster_breite - text_breite) / 2, (fenster_hoehe - text_groesse) / 2 - 60);
			text_breite = kha.Assets.fonts.kenvector_future.width(48, text);
			g2.drawString(text, (fenster_breite - text_breite) / 2, (fenster_hoehe - text_groesse) / 2);
		}
	g2.end();
}

function bewege_gegner() {
	for (i in 0...gegner_liste.length) {
		final a = gegner_liste[i];
		a.x += Math.sin(kha.Scheduler.realTime()) * 3;
		a.y += a.y_geschwindigkeit;

		if (a.y > fenster_hoehe + 16) {
			a.y = -Std.random(fenster_hoehe);
			a.x = Std.random(fenster_breite);
		}
	}
}

function bewege_sterne() {
	for (i in 0...sterne_liste.length) {
		final stern = sterne_liste[i];
		stern.y += stern.y_geschwindigkeit;

		if (stern.y > fenster_hoehe + 16) {
			stern.y = -16;
			stern.x = Std.random(fenster_breite);
		}
	}
}

function bewege_schuesse() {
	for (i in 0...schuss_liste.length) {
		final schuss = schuss_liste[i];
		schuss.y += schuss.y_geschwindigkeit;

		if (schuss.y < -60) {
			schuss.aktiv = false;
		}
	}
}

function berechne_schuss_gegner_collision() {
	for (i in 0...schuss_liste.length) {
		for (j in 0...gegner_liste.length) {
			final schuss = schuss_liste[i];

			if (!schuss.aktiv) {
				continue;
			}

			final gegner = gegner_liste[j];

			if (schuss.x + schuss.bild.width < gegner.x) {
				continue;
			}

			if (schuss.x > gegner.x + gegner.bild.width) {
				continue;
			}

			if (schuss.y + schuss.bild.height < gegner.y) {
				continue;
			}

			if (schuss.y > gegner.y + gegner.bild.height) {
				continue;
			}

			spieler_punkte += 1;
			gegner.y = -Std.random(fenster_hoehe);
			gegner.x = Std.random(fenster_breite);
		}
	}
}

function berechne_spieler_gegner_collision() {
	for (i in 0...gegner_liste.length) {
		final gegner = gegner_liste[i];

		if (spieler_x + spieler_bild.width < gegner.x) {
			continue;
		}

		if (spieler_x > gegner.x + gegner.bild.width) {
			continue;
		}

		if (spieler_y + spieler_bild.height < gegner.y) {
			continue;
		}

		if (spieler_y > gegner.y + gegner.bild.height) {
			continue;
		}

		gameover = true;
		spieler_fire = false;
		kha.input.Mouse.get(0).showSystemCursor();
	}
}

function maus_gedrueckt( taste, x, y ) {
	if (!gameover) {
		if (taste == 0) {
			spieler_fire = true;
		}
	}
}

function maus_losgelassen( taste, x, y ) {
	if (!gameover) {
		if (taste == 0) {
			spieler_fire = false;
		}
	}
}

function maus_bewegung( x, y, dx, dy ) {
	spieler_x = x;
	spieler_y = y;
}

function taste_gedrueckt( code: kha.input.KeyCode ) {
	switch code {
		case Left: // links
			spieler_x_richtung -= geschwindigkeit;

		case Right: // rechts
			spieler_x_richtung += geschwindigkeit;

		case Up: // oben
			spieler_y_richtung -= geschwindigkeit;

		case Down: // unten
			spieler_y_richtung += geschwindigkeit;

		default:
	}
}

function taste_losgelassen( code: kha.input.KeyCode ) {
	switch code {
		case Left: // links
			spieler_x_richtung += geschwindigkeit;

		case Right: // rechts
			spieler_x_richtung -= geschwindigkeit;

		case Up: // oben
			spieler_y_richtung += geschwindigkeit;

		case Down: // unten
			spieler_y_richtung -= geschwindigkeit;

		default:
	}
}