
# netscape-bookmark-file-converter
 Converts Netscape Bookmark Format files used by popular web browsers to an array of objects containing individual bookmarks URI's and their respective folder tags.

## Features
* Easily converts Netscape Bookmarks Format files to an array of objects
* Bookmark folders are converted to tags which can be used to maintain and manage categorization

## Compatability
* Google Chrome Bookmarks
* Microsoft Edge Favorites
* Mozilla Firefox
* Apple Safari
* Opera Browser

## Installation
```sh
npm install netscape-bookmark-export-converter
```

## Usage
```ts
import netscapeBookmarkExportConverter from 'netscape-bookmark-export-converter';
import {join} from 'path';

interface Bookmark {
    url: string;
    tags: [string];
}

const bookmarks: Array<Bookmark> = await netscapeBookmarkExportConverter(join(__dirname, '/bookmarks.html'));
```

## Testing


 Testing, refactor and usage