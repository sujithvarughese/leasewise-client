import { Input } from '@mui/material'

const SearchUnits = ({ query, setQuery }) => {

	return (
		<Input
			type="text"
			name="search"
			placeholder="SEARCH UNITS"
			value={query}
			onChange={(e)=>setQuery(e.target.value)}
		></Input>

	);
};

export default SearchUnits;