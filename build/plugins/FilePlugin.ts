/**
 * 输出编译内容
 */
const fs = require("fs");
class FilePlugin{
	options
	constructor(options){
		this.options = options;
	}
	apply(compiler){
		compiler.hooks.emit.tapAsync("file",(compilation,cb)=>{
			let content = `##编译输出内容：\n\n`;
			for(let attr in compilation.assets) {
				content+=`#--->  [{ file  :  ${attr}  }-----{ size  :  ${(Buffer.byteLength(compilation["assets"][attr]["source"](), 'utf8')/1024)}kb }]\n\n`
			}
			var buffer = new Buffer(content);
			let ws = fs.createWriteStream(`${this.options.path||compilation.options.context}/${this.options.filename||"file-list.md"}`, {start: 0});
			ws.write(buffer, 'utf8', function (err, buffer) {
			  console.log('write success!');
			  cb()
			});
		})
	}
}

module.exports = FilePlugin;
