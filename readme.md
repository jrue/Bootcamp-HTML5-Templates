HTML5 Learning Templates
========

These are templates to be used in conjunction with the multimedia workshops at the UC Berkeley Graduate School of Journalism. Templates by Jeremy Rue.

Usage
-------

There are two templates, **dark-theme.html** and **sidebar-theme.html**. Both are similar, deploy responsive design concepts, and are HTML5 with support for jQuery 1.9.1, and Bootstrap 3.0.

To use, simply create as many article tags as needed to accommodate multimedia elements:

```html
  <article id="article1">
    <!-- BELOW THIS LINE, PASTE EMBED CODE OR DRAG IMAGE -->
    <img src="http://placehold.it/1000x500&amp;text=Example+Image" alt="description of image">
    <!-- ABOVE THIS LINE, PASTE EMBED CODE OR DRAG IMAGE -->
    <h2>Martians invade earth</h2>
    <h3>First vessles spoted in Berkeley, Calif.</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </article>
```

Take note of the article ID! Next, in the `<nav>` tag, add a list item linking to the article tag's id. See example:

```html
<nav>
  <div id="smartphone_menu">Menu</div>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#article1">Multimedia piece 1</a></li>
    <li><a href="#article2">Multimedia piece 2</a></li>
    <li><a href="#article3">Multimedia piece 3</a></li>
    <li><a href="#article4">Multimedia piece 4</a></li>
  </ul>
</nav>
```

**To Do**
- [x] ie8 support, Firefox, Safari
- [x] additional iOS/Android support
- [ ] Open Graph and SEO concepts

Copyright (c) 2013 The Regents of the University of California<br>
Released under the GPL Version 2 license<br>
[http://www.opensource.org/licenses/gpl-2.0.php](http://www.opensource.org/licenses/gpl-2.0.php)<br>
This program is distributed in the hope that it will be useful, but<br>
WITHOUT ANY WARRANTY; without even the implied warranty of<br>
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.<br>