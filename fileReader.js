const { InstanceStatus } = require('@companion-module/base')
const fs = require('fs')
const readline = require('readline')
const FileParser = require('./fileParser');

module.exports = {
    openFileAlways(self){
        self.fileLastUpdated = 0;
        this.openFile(self);
    },

	openFile(self) {
		const rate = self.config.rate
		self.log("debug",'OpenFile Start')

		this.readFile(self)

		if (rate > 0) {
			if (self.config.verbose) {
				self.log('debug', 'Creating Interval. File will be read every ' + rate + ' ms.')
			}
			self.log("debug",'setInterval start\n')
			try {
				self.INTERVAL = setInterval(() => this.readFile(self), rate)
			} catch (error) {
				self.log("error",error)
			}

			self.log("debug",'setInterval done\n')
		} else {
			self.log(
				'info',
				'Retry Rate is 0. Module will open file one time and not read it again unless manually activated.'
			)
		}
		self.log("debug",'OpenFile End\n')
	},

	readFile(self) {
		self.log('debug', 'Reading File Start\n')

		let path = self.config.fileUri
		let encoding = self.config.encoding

		try {									
			const { mtime, ctime } = fs.statSync(path)

			if (mtime > self.fileLastUpdated) {
				self.log('debug', 'Reading File: ' + path)
				fs.readFile(path, encoding, (err, data) => {
					if (err) {
						self.updateStatus(InstanceStatus.BadConfig, 'Error Reading File')
						self.log('error', 'Error reading file: ' + err)
						this.stopInterval(self)
					} else {
						self.updateStatus(InstanceStatus.Ok)
						self.filecontents = data
						self.fileLastUpdated = new Date()
						FileParser(self)
					}
				})
			} else {
                self.updateStatus(InstanceStatus.Ok)
				self.log('debug', "File has not changed.")
			}
		} catch (error) {
			self.log('error', 'Error Reading File: ' + error)
		}
		self.log('debug', 'Reading File End\n')
	},

	stopInterval(self) {
		if (self.config.verbose) {
			self.log('debug', 'Stopping File Read Interval.')
		}
		clearInterval(self.INTERVAL)
		self.INTERVAL = null
	},
}
