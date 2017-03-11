import {
	parse,
	isEmpty,
	verifyInstructions,
} from '../parser'

import getInstructions from '../parser'

/*
 * getInstructions
 */
test('valid instructions', () => {
	const instruction = "add 1 2 3"
	expect(() => {getInstructions(instruction)}).not.toThrow()
})

test('empty instructions', () => {
	expect(() => {getInstructions("")}).toThrow()
})

test('non valid instructions', () => {
	expect(() => {getInstructions("foo")}).toThrow()
})

/*
 * parse
 */
const parse_variants = [
	["ADD 1 2 3", "ADD", ["1", "2", "3"]],
	["XXX e 2 3", "XXX", ["e", "2", "3"]],
	["a b c", "A", ["b", "c"]],
	[`add 1 2 3${'\n'}`, "ADD", ["1", "2", "3"]],
	["       XX", "XX", []],
]

parse_variants.forEach((element) => {
	test(`test parse function with ${element[0]}`, () => {
		expect(parse(element[0])).toEqual([{instruction: element[1], params: element[2]}])
	})
})

test('test null with empty text', () => {
	expect(parse("")).toBeNull()
})

/*
 * isEmpty
 */
test("normal string", () => {
	expect(isEmpty("foo")).toBeFalsy()
})

test("empty string", () => {
	expect(isEmpty("")).toBeTruthy()
})

test("white chars", () => {
	expect(isEmpty("	         ")).toBeTruthy()
})

test("non string", () => {
	expect(() => {
		isEmpty(1)
	}).toThrow()
})

/*
 * verifyInstructions
 */
test("check with valid rules", () => {
	let valid_instruction = [
		{
			instruction: "ADD",
			params: ["x", "y", "z"]
		}
	]
	expect(verifyInstructions(valid_instruction)).toBeTruthy()

	valid_instruction[0].instruction.toLowerCase()
	expect(verifyInstructions(valid_instruction)).toBeTruthy()
})

test("check with non valid rules", () => {
	const invalid_instruction = [
		{
			instruction: "foo",
			params: ["x", "y", "z"]
		}
	]
	expect(verifyInstructions(invalid_instruction)).toBeFalsy()
})
