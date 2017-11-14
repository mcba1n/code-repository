class Reader {
    constructor() {
        this.fs = require('fs');
    }

    async searchDirectory(dir) {
        const files = await this.readDir(dir);
        const promises = [];
        let id = 0;

        // Search the directory
        for (const file of files) {
            let thisDir = `${dir}/${file}`;     // New file location
            
            // Look for new directory
            promises.push(new Promise((resolve, reject) => {
                this.fs.stat(thisDir, (err, stats) => {
                    if (err) reject(err);       // Error handling

                    // Search new directory found and record it
                    let fileObject = {
                        "id": id, 
                        "name": file, 
                        "inner_dir": null,
                        "dir": thisDir
                    };
                    if (stats.isDirectory()) {
                        this.searchDirectory(thisDir).then(val => {
                            fileObject["inner_dir"] = val;
                        });
                    }
                    resolve(fileObject);
                    id++;
                })
            }));
        }
        return Promise.all(promises);
    }

    readDir(dir){
        return new Promise((resolve, reject) => this.fs.readdir(dir, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        }));
    } 

    getExtension(filename) {
        return filename.split(".")[1];
    }

    readFile(dir) {
        return new Promise((resolve, reject) => this.fs.readFile(dir, 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents);
        }));
    }
}
module.exports = Reader;