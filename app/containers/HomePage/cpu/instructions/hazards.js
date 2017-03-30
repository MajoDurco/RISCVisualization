export function dataHazzardOccur(ui, ...registers){
	const is_hazzard_safe = registers.every((register) => {
		return register.lock === false
	})
	if (!is_hazzard_safe)
		console.log("hazzard OCCUR!!!!!!!!!!")
	return is_hazzard_safe
}
