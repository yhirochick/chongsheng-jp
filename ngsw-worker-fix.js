const replace = require('replace-in-file');
const options = {
  files: 'dist/chongsheng-jp/ngsw-worker.js',
  from: `onFetch(event) {`,
  to: `onFetch(event) {
            if (event.request.url.indexOf('firebasestorage.googleapis.com') !== -1) { return; }`,
};

replace(options).then(changes => {
    console.log('Modified files:', JSON.stringify(changes));
})
.catch(error => {
    console.error('Error occurred:', JSON.stringify(error));
});