'use strict';
const root = '../../../..';
const Temperature = require(`${root}/lib/printer/temperature.js`);

describe("/lib/printer/temperature.js => new()", () => {
	describe("when contains 1 tool with no temperature", () => {
		it("must only include the 1 tool", (done) => {
			let tempData = "T:0.00 /0 @:0";
			let temp = new Temperature(tempData);
			expect(temp).not.toBe(null);
			expect(temp.bed).toBe(null || undefined);
			expect(temp.tool0).not.toBe(null || undefined);
			expect(temp.tool0.type).toBe("T");
			expect(temp.tool0.id).toBe("T0");
			expect(temp.tool0.target).toBe(0);
			expect(temp.tool0.actual).toBe(0);
			expect(temp.tool0.offset).toBe(0);
			done();
		});
	});

	describe("when contains 1 tool with temperature data", () => {
		it("must only include the 1 tool", (done) => {
			let tempData = "T:99.56 /205.0 @:0";
			let temp = new Temperature(tempData);
			expect(temp).not.toBe(null);
			expect(temp.bed).toBe(null || undefined);
			expect(temp.tool0).not.toBe(null || undefined);
			expect(temp.tool0.type).toBe("T");
			expect(temp.tool0.id).toBe("T0");
			expect(temp.tool0.target).toBe(205);
			expect(temp.tool0.actual).toBe(99.56);
			expect(temp.tool0.offset).toBe(0);
			done();
		});
	});
});
