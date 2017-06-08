'use strict';
const root = '../../../..';
const events = require(`${root}/lib/printer/events.js`);

describe("events.on", () => {
	describe("when new event", () => {
		it("must register handlers", (done) => {

			events.on("M1234", () => {
				expect(true).toBe(true);
			}, (data) => {
				expect(true).toBe(true);
			});

			expect(events._events).not.toBe(null);

			expect(events._events.M1234).not.toBe(null);
			expect(events._events.M1234.start).not.toBe(null);
			expect(events._events.M1234.done).not.toBe(null);
			expect(events._events.M1234.start.length).toBe(1);
			expect(events._events.M1234.done.length).toBe(1);

			events._events.M1234.start[0]();
			events._events.M1234.done[0]();
			
			done();
		});
	});
});
