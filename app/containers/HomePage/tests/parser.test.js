import getInstructions, * as parser from '../parser'

describe("GetInstructions function", () => {

  it('Shoudn\'t take empty instructions', () => {
    expect(getInstructions("")).toHaveProperty('valid', false)
  })

  it('non valid instructions', () => {
    expect(getInstructions("foo")).toHaveProperty('valid', false)
  })

  it('Only comments is not valid', () => {
    expect(getInstructions("#foo")).toHaveProperty('valid', false)
  })

  it('Multiple comments is not valid', () => {
    expect(getInstructions(`#foo
    
    #heheheh`)).toHaveProperty('valid', false)
  })

  it('Validate correct instructions', () => {
    const instruction = `add R1 R2 R3`
    const lines = instruction.split('\n').length + 1 // plus empty zero line
    const parsed = getInstructions(instruction)
    expect(parsed).toHaveLength(lines)
  })

  it('Validate correct instructions with empty lines', () => {
    const instruction = `add R1 R2 R3
    
    NOP`
    const lines = instruction.split('\n').length + 1 // plus empty zero line
    const parsed = getInstructions(instruction)
    expect(parsed).toHaveLength(lines)
  })
})

describe("parse function", () => {
  const parse_variants = [
    ["ADD 1 2 3", "ADD", ["1", "2", "3"]],
    ["XXX e 2 3", "XXX", ["e", "2", "3"]],
    ["a b c", "A", ["b", "c"]],
    [`add 1 2 3
    `, "ADD", ["1", "2", "3"]], ["       XX", "XX", []],
  ]

  parse_variants.forEach((element) => {
    it(`test parse function with ${element[0]}`, () => {
      expect(parser.parse(element[0])).toEqual([{instruction: element[1], params: element[2]}])
    })
  })

  it('test null with empty text', () => {
    expect(parser.parse("")).toBeNull()
  })
})

describe("verifyInstructions function", () => {
  const three_reg = ["R1", "R2", "R3"]
  const three_reg_instructions = ["ADD", "AND", "BEQ", "BGT", "BLT", "BNE", "NOR", "OR", "SHIFTL", "SHIFTR", "SUB", "XOR"]

  it("check with 3reg instruction valid rules", () => {
    const result = three_reg_instructions.reduce((rest, instruction_name) => {
      return [...rest, ...[{
          instruction: instruction_name,
          params: three_reg
        }]
      ]
    }, [])
    expect(parser.verifyInstructions(result)).toHaveProperty('valid', true)
  })

  it('Should be valid also with lowercase 3reg instructions', () => {
    const lower_instructions = three_reg_instructions.map(instruction_name => instruction_name.toLowerCase())
    const result = lower_instructions.reduce((rest, instruction_name) => {
      return [...rest, ...[{
          instruction: instruction_name,
          params: three_reg
        }]
      ]
    }, [])
    expect(parser.verifyInstructions(result)).toHaveProperty('valid', true)
  })

  it("Should be not valid with wrong instructions ", () => {
    const invalid_instruction = [
      {
        instruction: "foo",
        params: three_reg
      }
    ]
    expect(parser.verifyInstructions(invalid_instruction)).toHaveProperty('valid', false)
  })
})
 
describe("isEmpty function", () => {
  it("normal string", () => {
    expect(parser.isEmpty("foo")).toBeFalsy()
  })

  it("empty string", () => {
    expect(parser.isEmpty("")).toBeTruthy()
  })

  it("white chars", () => {
    expect(parser.isEmpty("	         ")).toBeTruthy()
  })

  it("non string", () => {
    expect(() => parser.isEmpty(1)).toThrow()
  })
})

describe("removeComments", () => {
  it("Should replace new line comments with empty lines", () => {
    const comment_line = `# this is comment`
    expect(parser.removeComments(comment_line)).toBe('')
  })

  it("Shouldn't replace nothing", () => {
    const comment_line = `ADD R1 R2 R3`
    expect(parser.removeComments(comment_line)).toBe(comment_line)
  })

  it("Should remove comment from end of the line", () => {
    const comment = `#comment`
    const command = `ADD R1 R2 R3`
    expect(parser.removeComments(command + comment)).toBe(command)
  })

  it("Test multiple comments on one line", () => {
    const comment = `#comment`
    const command = `ADD R1 R2 R3 `
    expect(parser.removeComments(command + comment + comment)).toBe(command)
    expect(parser.removeComments(`${comment} foo boo ${comment}`)).toBe('')
  })
})
