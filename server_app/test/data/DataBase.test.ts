import { DataBase } from "../../data/DataBase";
import * as IdGenerator from "../../data/IdGenerator";

type someTypeWithId = {
	id: string;
	name: string;
	color: string;
};

describe("DataBase test suite", () => {
	let sut: DataBase<someTypeWithId>;

	const fakeId = "1234";

	const someObject1 = {
		id: "",
		name: "someName",
		color: "blue",
	};

	const someObject2 = {
		id: "",
		name: "someName",
		color: "blue",
	};

	beforeEach(() => {
		sut = new DataBase<someTypeWithId>();
		jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
	});

	test("should return id after insert", async () => {
		// biome-ignore lint/suspicious/noExplicitAny: ok for learning purpose
		const actual = await sut.insert({ id: "" } as any);
		expect(actual).toBe(fakeId);
	});

	test("should get element after insert", async () => {
		const id = await sut.insert(someObject1);
		const result = await sut.getBy("id", id);
		expect(result).toBe(someObject1);
	});

	test("should find all elements with the same property", async () => {
		await sut.insert(someObject1);
		await sut.insert(someObject2);

		const expected = [someObject1, someObject2];

		const result = await sut.findAllBy("color", "blue");
		expect(result).toHaveLength(2);
		expect(result).toEqual(expected);
	});

	test("should change color on object", async () => {
		// await sut.update('1234', "color", "red");
		const id = await sut.insert(someObject1);

		const expectedColor = "red";
		await sut.update(id, "color", expectedColor);

		const object = await sut.getBy("id", id);
		const actualColor = object?.color;

		expect(actualColor).toBe(expectedColor);
	});
	test("should delete element", async () => {
		const id = await sut.insert(someObject1);
		await sut.delete(id);

		const result = await sut.getBy("id", id);
		expect(result).toBeUndefined();
	});
});

// generated from AI

// type TestType = {
// 	id: string;
// 	name: string;
// 	value: string;
// };

// describe("DataBase", () => {
// 	let db: DataBase<TestType>;

// 	beforeEach(() => {
// 		db = new DataBase<TestType>();
// 	});

// 	test("should insert and return id", async () => {
// 		const item = { id: "", name: "test", value: "value" };
// 		const id = await db.insert(item);
// 		expect(id).toBeDefined();
// 		expect(typeof id).toBe("string");
// 	});

// 	test("should get element by property", async () => {
// 		const item = { id: "", name: "test", value: "value" };
// 		await db.insert(item);
// 		const found = await db.getBy("name", "test");
// 		expect(found).toBeDefined();
// 		expect(found?.name).toBe("test");
// 	});

// 	test("should find all elements by property", async () => {
// 		const item1 = { id: "", name: "test", value: "value1" };
// 		const item2 = { id: "", name: "test", value: "value2" };
// 		await db.insert(item1);
// 		await db.insert(item2);
// 		const found = await db.findAllBy("name", "test");
// 		expect(found.length).toBe(2);
// 	});

// 	test("should update element", async () => {
// 		const item = { id: "", name: "test", value: "value" };
// 		const id = await db.insert(item);
// 		await db.update(id, "name", "updated");
// 		const found = await db.getBy("id", id);
// 		expect(found?.name).toBe("updated");
// 	});

// 	test("should delete element", async () => {
// 		const item = { id: "", name: "test", value: "value" };
// 		const id = await db.insert(item);
// 		await db.delete(id);
// 		const elements = await db.getAllElements();
// 		expect(elements.length).toBe(0);
// 	});

// 	test("should get all elements", async () => {
// 		const item1 = { id: "", name: "test1", value: "value1" };
// 		const item2 = { id: "", name: "test2", value: "value2" };
// 		await db.insert(item1);
// 		await db.insert(item2);
// 		const elements = await db.getAllElements();
// 		expect(elements.length).toBe(2);
// 	});
// });
