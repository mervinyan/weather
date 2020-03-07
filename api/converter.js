const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const source_folder = '../photos/';
const destination_folder = '../photos/webp';
(async () => {
  const files = await imagemin([source_folder + '/*.jpeg'], {
      destination: destination_folder, 
      plugins: [
        imageminWebp({quality: 85})
      ]
    });

  console.log(files);
})();