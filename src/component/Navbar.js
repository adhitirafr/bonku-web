const Navbar = () => {
    const title = 'Bonku'
    const subtitle = 'Catat Utang jadi lebih mudah'

    return (
        <nav>
            <div>
                <div className="display-1"> {title} </div>
                <div className="lead">{subtitle}</div>
            </div>
        </nav>
    );
}

export default Navbar;