function Page({ data }) {
	// Render data...
    console.log(data)

    
}

// This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`https://fakestoreapi.com/products?limit=5`);
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } };
}

export default Page;
