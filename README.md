# Shore Pointe Chiropractic MagicMirror...

rename your modules folder to modules_bak

create a new folder and name it modules

cd MagicMirror/modules
git clone https://github.com/justjim1220/shorepointechiropractic.git

install the modules...

cd calendar_monthly
npm install

cd ..

cd MMM-BMW-DS
npm install

cd ..

cd MMM-DigClock
npm install

cd ..

cd MMM-fbPageCounter
npm install

cd ..

cd MMM-SimpleLogo
npm install

skip the MMM-CalendarEXT for now... (not quite done with it, it's what is needed to show the holidays on the calendar)

move the config.js file to the MagicMirror/config folder.
(either rename or delete the current file in that folder)

rename the compliments and newsfeed folders compliments_bak & newsfeed_bak
copy and paste both of those folders to MagicMirror/modules/default

now you need to be in the main folder
cd MagicMirror

npm rebuild

reboot you system
run MM

cd MagicMirror
npm start

hopefully it will look like the example pics I've sent you

