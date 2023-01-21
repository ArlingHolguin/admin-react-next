const autocompleteCore = (paramSearch, data, value) => {
	return data.iata
		.filter((item) => {
			if (paramSearch === "mix") {
				return (
					item.ciudad.toLowerCase().includes(value) ||
					item.pais.toLowerCase().includes(value) ||
					item.codigo.toLowerCase().includes(value)
				);
			} else if (paramSearch === "ciudad") {
				return (
					item.ciudad.toLowerCase().includes(value) ||
					item.pais.toLowerCase().includes(value)
				);
			}
			return item[paramSearch].toLowerCase().includes(value);
		})
		.sort((a, b) => {
			if (a.pais === "COLOMBIA" && b.pais === "COLOMBIA") {
				if (a.esCapital < b.esCapital) {
					return 1;
				}
				if (a.esCapital > b.esCapital) {
					return -1;
				}
				return 0;
			}
			if (a.pais !== "COLOMBIA" && b.pais !== "COLOMBIA") {
				if (a.esCapital < b.esCapital) {
					return 1;
				}
				if (a.esCapital > b.esCapital) {
					return -1;
				}
				return 0;
			}
		});
};

export default autocompleteCore;
