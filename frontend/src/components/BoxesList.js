const BoxesList = ( {boxesList} ) => {
    return (
        <ul className="user-images">

            {boxesList.map((box) => (
                <ul className="user-image">
                    <p className="box" onClick={() => console.log('dziala')}>{box.name}</p>
                </ul>
            )
            )}
        </ul>
    );
};

export default BoxesList;