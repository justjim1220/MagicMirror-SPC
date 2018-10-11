/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("compliments", {

	// Module config defaults.
	defaults: {
		compliments: {
			anytime: [
				"*Healthy Diet and Exercise* • While the proverbial jury iKeep within 10 lbs. of your ideal weight for a healthier back.",
				"*Healthy Diet and Exercise* • The most efficient and effective way to reduce weight is by eating a sensible diet and exercising regularly.",
				"*Healthy Diet and Exercise* • Consume an Anti-Inflammatory Diet, such as: whole grains, fresh fruits and veggies, and seafood. Avoid processed products and refined sugars.",
				"*Healthy Diet and Exercise* • Drink Plenty of Water: being dehydrated, your body will take the water from the cartilage around your joints. You should aim to consume around eight to 10 glasses of water a day.",
				"*Healthy Diet and Exercise* • Get up and move! Too much time spent in any one position—sitting or standing—can trigger back pain. The more active you are, the more you stretch out your muscles and get your body accustomed to physical activity so you're the less likely to suffer pain.",
				"Thank You For Visiting Shore Pointe Chiropractic",
				"*Standing* • When standing, keep one foot slightly in front of the other, with your knees slightly bent. This position helps to take the pressure off your low back.",
				"*Standing* • Do not stand bent forward at the waist for prolonged periods of time. The muscles in your low back become deconditioned in this position, which may lead to pain.",
				"*Carrying* • When carrying objects, particularly if they are heavy, keep them as close to your body as possible.",
				"*Carrying* • Carrying two small objects—one in each hand—is often easier to handle than one large one.",
				"*Sleeping* • Sleeping on your back puts approximately 50 pounds of pressure on your spine. Other positions may be better.",
				"*Sleeping* • Lying on your side with a pillow between your knees may also reduce the pressure on your back.",
				"*Sleeping* • Never sleep in a position that causes a portion of your spine to hurt. Most often, your body will tell you what position is best.",
				"Thank You For Visiting Shore Pointe Chiropractic",
				"*Sitting* • Keep your knees slightly higher than your hips, with your head up and back straight.",
				"*Sitting* • Avoid rolling your shoulders forward (slouching).",
				"*Sitting* • Try to maintain the natural curve in your low back.",
				"Thank You For Visiting Shore Pointe Chiropractic",
				"*Lifting* • At all times, avoid twisting while lifting. Twisting is one of the most dangerous movements for your ---spine, especially while lifting.",
				"*Lifting* • If the item is too heavy to lift, pushing it is easier on your back than pulling it. Whenever possible, use your legs, not your back or upper body, to push the item.",
				"*Lifting* • If you must lift a heavy item, get someone to help you.",
				"Thank You For Visiting Shore Pointe Chiropractic",
				"*Reaching and Bending* • Do NOT bend over at the waist to pick up items from the floor or a table. Instead, kneel down on one knee, as close as possible to the item you are lifting, with the other foot flat on the floor and pick the item up.",
				"*Reaching and Bending* • Or bend at the knees, keep the item close to your body, and lift with your legs, not your back.",
				"*Reaching and Bending* • When reaching for something above shoulder level, stand on a stool. Straining to reach such objects may not only hurt your mid-back and neck, but it can also bring on shoulder problems.",
				"Thank You For Visiting Shore Pointe Chiropractic",
				"*Technology* • When texting, bring your arms up in front of your eyes so that you don’t need to look down to see the screen.",
				"*Technology* • When using a computer or mobile device, look down with your eyes, and if you wear glasses, make sure you also can scan the entire screen without moving your head.",
				"*Technology* • When standing or sitting at a computer, the screen should be at eye level to avoid holding your head down or back.",
				"*Technology* • When sitting at a device, make sure your feet are firmly flat on the floor or footrest with your knees lower than your hips. Make sure you can use the device without reaching.",
				"*Technology* • Never pinch the phone between your ear and shoulder. Use a headset to reduce shoulder strain."
			],
			morning: [
				"Good Morning, I Hope You Enjoy Your day!",
				"Good Morning, Thank You For Visiting Shore Pointe Chiropractic"
			],
			afternoon: [
				"Good Afternoon, Thank You For Visiting Shore Pointe Chiropractic"
			],
			evening: [
				"Thank You For Visiting Shore Pointe Chiropractic",
			]
		},
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 2000,
		morningStartTime: 7,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17
	},

	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	grtStyles: function() {
		return ["compliments.css"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		var self = this;
		if (this.config.remoteFile != null) {
			this.complimentFile(function(response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}

		// Schedule update timer.
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function(compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function() {
		var hour = moment().hour();
		var compliments;

		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = this.config.compliments.morning.slice(0);
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else if(this.config.compliments.hasOwnProperty("evening")) {
			compliments = this.config.compliments.evening.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		return compliments;
	},

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function(callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = this.randomIndex(compliments);

		return compliments[index];
	},

	// Override dom generator.
	getDom: function() {
		var complimentText = this.randomCompliment();

		var compliment = document.createTextNode(complimentText);
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "bold xlarge bright pre-line";
		wrapper.appendChild(compliment);

		return wrapper;
	},


	// From data currentweather set weather type
	setCurrentWeatherType: function(data) {
		var weatherIconTable = {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "night_cloudy",
			"03n": "night_cloudy",
			"04n": "night_cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		};
		this.currentWeatherType = weatherIconTable[data.weather[0].icon];
	},


	// Override notification handler.
	notificationReceived: function(notification, payload, sender) {
		if (notification == "MMM-BMW-DS_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	},

});
