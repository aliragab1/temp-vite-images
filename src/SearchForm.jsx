import { useAppContext } from "./AppContext";

function SearchForm() {
  const { setSearchTerm } = useAppContext();
  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
    // console.log(e.target.elements.search.value);
    // console.log(e.target[0].value);
  }
  return (
    <section>
      <h1 className="title">Unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="cat"
          name="search"
          className="form-input search-input"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
