/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 12,
	units: "imperial",

	modules: [
		{
			disabled: false,
			module: "MMM-DigClock",
			position: "top_right",	// This can be any of the regions.
			config: {
				showDate: false,
				showWeek: false,
			}
		},

		{
			disabled: false,
			module: "MMM-BMW-DS",
			position: "top_bar",
			config: {
				apiKey: "90c9283d5c3ce4d1fa0db2ab66c586f9",   	//*****//
				tempUnits: "F",
				lat: "39.9537",
				lng: "74.1979",
				css: "1",
				maxWidth: "100%",
				animationSpeed: 3000,
				initialLoadDelay: 1500,
				retryDelay: 2000,
				updateInterval: 15 * 60 * 1000
			}
		},

		{
			disabled: false,
			header: "@shorepointechiropractic",
   			module: "MMM-fbPageCounter",
			position:"bottom_center",
			config: {
				access_token: "EAAE2ASglvOABADkkXv4DXzN0BNIGSbEpfcPk9ZBLtZAZBSgh1pgKueD0ZBbpw9jio4dzeTYpIkVkZBhwByiCe68eE9TuiSaHN1KNxiMDN5tdodeRjMyHUCTBoGwZBTBFk347mXfff3v6Xnk84uZBV9ZAjLtkqlPIFmoZD",
				page_id: "327434860275",
				refresh_interval_sec: 30,
				size:'huge'
			}
		},

		{
			disabled: true,
			module: "compliments",
			position: "lower_third"
		},

		{
			disabled: false,
			module: "calendar_monthly",
			position: "middle_center",
			config: {                                          
                fadeSpeed: 2,            
                showHeader: true,
                cssStyle: 'slate',
                updateDelay: 5,
            }		      
		},

		{
			disabled: false,
			module: "MMM-SimpleLogo",
			position: "top_left",    // This can be any of the regions.
		},

		{
			disabled: false,
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
