﻿# B2B theme for VirtoCommerce Storefront

_B2B theme_ for VirtoCommerce Storefront used by _B2B-Store_ sample store. It is a showcase for b2b features support of VirtoCommerce.

![B2B theme UI](https://user-images.githubusercontent.com/6369252/29589685-9908c1b8-87af-11e7-9fe2-c6fb7f458e8f.png)

## Prerequisites

### Visual Studio 2015.3 and above (up to Visual Studio 2017.3 at least)

If you have Visual Studio 2015 with Update 3 and above, you don't need install any prerequisites. Latest versions of Node.js and Gulp already included in your Visual Studio installation and supported in built-in Task Runner Explorer.

### Visual Studio from 2015 up to 2015.2

Task Runner Explorer, Node.js and Gulp already included in your Visual Studio installation. However, you need update your Node.js to at least 4.0.0.
1. Update Node.js to v4.0.0 at least (we recommend [latest LTS version](https://nodejs.org/en/)). Use `C:\Program Files\nodejs` installation path (change `Program Files` to `Program Files (x86)` on 64-bit machine).
2. Add Node.js installation path to External Web Tools: ![External Web Tools](https://user-images.githubusercontent.com/6369252/29498917-038ce010-861f-11e7-9a23-3c4f9e96d6b7.png)

### Visual Studio from 2013.3 up to 2013.5

You need install:
1. [Task Runner Explorer](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.TaskRunnerExplorer) Visual Studio extension
2. Install Node.js v4.0.0 or above (we recommend [latest LTS version](https://nodejs.org/en/))
3. `npm install gulp -g`

### Visual Studio Code, Sublime and other editors

1. Install Node.js v4.0.0 or above (we recommend [latest LTS version](https://nodejs.org/en/))
2. `npm install gulp -g`

## Working with theme

**Attention:** while theme including `bundlesconfig.json` file, you *must not* use [Bundler & Minifier](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.BundlerMinifier) Visual Studio extension with theme. See `Appendix: bundling & minification process workflow` for details about why.

Tip: you may need to wait a few minutes at first time on project open, because Node.js and Gulp dependencies will automatically downloaded.


### Visual Studio 2017 and Visual Studio Code

Open theme folder as a folder. `File → Open → Folder...` in Visual Studio 2017, `File → Open Folder...` in Visual Studio Code.

### Visual Studio 2013 and 2015

Open theme folder as a website (`File → Open → Web Site...`). ASP.NET website project will be created. Never save it and just ignore.

### How to connect theme with storefront

1. Specify correct `VirtoCommerceBaseUrl` (usually `http://localhost/admin` or your admin site name) and `ContentConnectionString` (usually `PATH_TO_PLATFORM\VirtoCommerce.Platform.Web\App_Data\cms-content\` or path to CMS content folder or Azure blob storage) connection strings on storefront. Restart storefront app pool or full IIS.
2. Add `VirtoCommerce:B2B:ApiEndpoint` app setting with admin site url (like `http://localhost/admin/`). Slash must be included as last symbol.
3. For development purpose, make a link from store theme folder (`App_Data\cms-content\Themes\Electronics` for example) to cloned theme repo (`mklink /d STORE_THEME_FOLDER_PATH CLONED_REPO_PATH`).
4. In production, upload zip package of theme (use gulp `release` task to create) to needed store on admin site or manually upload theme files to CMS content folder or Azure blob.

## Bundling & minification

### Visual Studio (any version)

Bundling & minification will work automatically when you save file and on build.

Tip: if bundling & minification failed, you, probably, need to run gulp `watch` task manually after that. Go to `Task Runner Explorer` (in Visual Studio) and click `Run` on task `watch`.

### Visual Studio Code

Bundling & minification will work automatically on build. If you want to automatically bundle & minify files on save, please, install & configure [Blade Runnner](https://marketplace.visualstudio.com/items?itemName=yukidoi.blade-runner) Visual Studio Code extension.

Tip: if bundling & minification failed, you, probably, need to run gulp `watch` task manually after that. Go to `Command Palette (Ctrl+Shift+P)` and type `task watch` then press Enter.

### Other editors

Run `gulp watch` on command line if you want to bundle & minify files on save or run `gulp default` manually when you need to bundle & minify theme files.

## Appendix: List of available tasks

1. `default`: default task. Bundles and minifies theme files.
2. `clean`: removes bundled & minified files.
3. `lint`: runs `eslint` to check for warnings & errors in javascript files. Look at [eslint site](https://eslint.org/) for details.
4. `min` and `min:js`, `min:css`, `min:html`: minify all or specified types of files.
5. `snippet` and `snipped:js`, `snippet:css`: create liquid snippets to easily include bundles into liquid templates.
6. `watch`: watching to any changes on bundled & configuration files and update bundles when any change occurs.
7. `release`: creates zip package with all needed files to deploy theme on storefront.

## Appendix: Bundling & minification process workflow

We're using gulp to bundle & minify files on theme, because it support a lot of possible customizations and has a plugins for css minification and correct source maps generation. Wrong source map generation and lack of css minification is a primary reason why we do not use Bundler & Minifier extension in Visual Studio.

When you run the `default` task to bundle & minify theme, the following happens:
1. ESLint runs and output warnings and errors in javascript code.
2. Javascript minifies and source maps generates.
3. CSS processes by [Autoprefixer](https://github.com/postcss/autoprefixer) with [the following browsers support](https://virtocommerce.com/docs/vc2userguide/what-is-commerce-manager/minimum-requirements) (documentation may be sometimes outdated; browser versions specified in gulpfile then specified in docs, not vice versa).
4. CSS minifies and source maps generates.
5. Liquid snippets forms.

Bundles has two working modes: when app setting `VirtoCommerce:Storefront:OptimizeStaticContent` is on (set to true) and off. We use minified bundles and source maps in both modes, but when static content optimization is off, when they provided with timestamp, so developers is always see actual version of bundles, while in off mode they provided with theme version (i.e. `bundle.js?ver=2.0.0`) so bundles may be cached in client's browsers until next version of theme will be uploaded to storefront.

# License
Copyright (c) Virtosoftware Ltd.  All rights reserved.

Licensed under the Virto Commerce Open Software License (the "License"); you
may not use this file except in compliance with the License. You may
obtain a copy of the License at

http://virtocommerce.com/opensourcelicense

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied.
