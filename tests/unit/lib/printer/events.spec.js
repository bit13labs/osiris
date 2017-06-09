'use strict';
const root = '../../../..';
const events = require(`${root}/lib/printer/events.js`);

describe("/lib/printer/events.js => _fire()", () => {
	describe("when there are registered event handlers", () => {
		it("must trigger all registered event handlers", (done) => {
			let eventStart = 0;
			let eventDone = 0;

			events.on("M1234", () => {
				expect(true).toBe(true);
				eventStart++;
			}, (data) => {
				expect(true).toBe(true);
				eventDone++;
			}).then((r) => {

				expect(r).not.toBe(null || undefined);
				expect(r.M1234).not.toBe(null || undefined);

				expect(r.M1234.start).not.toBe(null || undefined);
				expect(r.M1234.done).not.toBe(null || undefined);
				expect(r.M1234.start.length).toBe(1);
				expect(r.M1234.done.length).toBe(1);

				events._fire("M1234", "start", null);
				expect(eventStart).toBe(1);
				events._fire("M1234", "done", null);
				expect(eventStart).toBe(1);
				done();
			});
		});
	});
});

describe("/lib/printer/events.js => on()", () => {
	describe("when new event", () => {
		it("must register handlers", (done) => {
			events._clear();

			events.on("M1234", () => {
				expect(true).toBe(true);
			}, (data) => {
				expect(true).toBe(true);
			}).then((r) => {
				expect(r).not.toBe(null || undefined);
				expect(r.M1234).not.toBe(null || undefined);
				expect(r.M1234.start).not.toBe(null || undefined);
				expect(r.M1234.done).not.toBe(null || undefined);
				expect(r.M1234.start.length).toBe(1);
				expect(r.M1234.done.length).toBe(1);

				r.M1234.start[0]();
				r.M1234.done[0]();
				done();
			});
		});
	});

	describe("when adding to existing event", () => {
		it("must register handlers", (done) => {
			events._clear();
			let eventName = "M1234";

			events.on(eventName, () => {
				expect(true).toBe(true);
			}, (data) => {
				expect(true).toBe(true);
			}).then((xevents) => {
				events.on(eventName, () => {
					expect(true).toBe(true);
				}, (data) => {
					expect(true).toBe(true);
				}).then((xevents) => {
					expect(xevents).not.toBe(null || undefined);
					expect(xevents[eventName]).not.toBe(null || undefined);
					expect(xevents[eventName].start).not.toBe(null || undefined);
					expect(xevents[eventName].done).not.toBe(null || undefined);
					expect(xevents[eventName].start.length).toBe(2);
					expect(xevents[eventName].done.length).toBe(2);

					xevents[eventName].start[0]();
					xevents[eventName].done[0]();
					xevents[eventName].start[1]();
					xevents[eventName].done[1]();

					done();
				});
			});
		});
	});
});
