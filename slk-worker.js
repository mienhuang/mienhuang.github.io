
'use strict';

self.onmessage = (e) => {
  console.log(e, 'message from mien\'s custom worker service...')
}
importScripts('./ngsw-worker.js');