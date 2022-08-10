# optimize-image-with-gulp
Simple Gulp tool to resize, optimize and convert your images. SVG support and webp convertion. 
Un outil Gulp simple pour redimensionner, optimiser et convertir vos images. Support le SVG et convertit en WEBP.
<br><br>
## What the script do / Ce que fait le script
The script will watch the "src" directory for new image file and thne lanch the next actions in this order:
* If it's a SVG image: it will be optimize and placed in the "minified" folder
* If it's a png or a jpg image: 
	* It will be resize and cropped like that: 
		* 1920px with if the original image is wider than 1920px then placed in the "resized" folder with suffix “-fullwidth”
		* 1100px with if the original image is wider than 1100px then placed in the "resized" folder with suffix “-1100”
		* 600pxwith if the original image is wider than 600px then placed in the "resized" folder with suffix “-600”
		* 100px X 100px (cropped) then placed in the "resized" folder with suffix “-thumb”
* all the resized images will be optimized then placed in the "minified" folder
* all the images in the "minified" will be converted in webp format (not SVG)
<br>
Cet outil va surveiller le dossier “src” et lancer les actions suivantes à chaque fois que vous déposez une image dedans :
* si l’image est un SVG : elle sera optimisée puis rangée dans le dossier "minified"
* si l’image est en jpg ou png : 
	* elle sera découpée en 3 format : 
		* 1920px de large si l’image originale est plus large que 1920px puis rangée dans le dossier "resized" avec le suffixe “-fullwidth”
		* 1100px de  large si l’image originale est plus large que 1100px puis rangée dans le dossier "resized" avec le suffixe “-1100”
		* 600px de large si l’image originale est plus large que 600px puis rangée dans le dossier "resized" avec le suffixe “-600”
		* 100px X 100px (recadrée)  puis rangée dans le dossier "resized" avec le suffixe “-thumb”
* toutes les versions redimensionnées et recadrées seront optimisées puis rangée dans le dossier "minified"
* toutes les versions sont converties en webp puis rangée dans le dossier "minified" (sauf les SVG)

## Requirements / dépendances
You need to have nodejs and imagemagik installed on your computer. If not please go to [node website](https://nodejs.org/en/). 
<br><br>
Vous devez avoir nodejs et imagemagik installé sur votre ordinateur pour utiliser cet outil. Pour instaler node, rendez-vous sur le [site officiel](https://nodejs.org/en/). 
<br><br>
To install Imagemagik:
<br>
Pour installer Imagemagik : 
<br><br>
**Ubuntu :**
```sh
apt-get install imagemagick
apt-get install graphicsmagick
```

**Mac OS X (avec Homebrew) :**
```sh
brew install imagemagick
brew install graphicsmagick
```

**Windows :**
[imagemagik website](http://www.imagemagick.org/script/binary-releases.php)
<br>
Please note that you must check the "add application directory to your system path" and "Install legacy utilities (e.g. conert)" during the install process. 
<br><br>
Pendant l’installation, cochez bien la case "add application directory to your system path" et  "Install legacy utilities (e.g. conert)".
<br><br>
## Launch script / Lancer le script
With the console or powerShell go to the folder. (cd ...) then type the commande line:
<br>
Ouvrez la console ou PowerShell et déplacez vous dans le dossier (cd ...) puis tapez la commande :
<br><br>
```sh
npm install
```
Last step, launch:
<br>
Dernière étape, lancez la ligne de commande : 
```sh
gulp default 
```
<br><br>
There is a simple task that only runs the optimise task, please use this command list instead:
<br>
Pour lancer une simple optimisation sur vos images sans passer par les phases de redimensionnement, lancez simplement la commande suivante :
```sh
gulp simple 
```