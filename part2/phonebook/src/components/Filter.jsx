const Filter = ({handleFilter}) => {
    return (
        <div>
            filter shown with <input
            onChange={e => handleFilter(e)}/>
        </div>
    );
}

export default Filter;