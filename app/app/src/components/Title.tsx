import ArrorImg from '../img/TopArrow.png';

const Title = () => {
    return (
        <div className="main">
            <p className="site-name-eng">
                KYONOGOHAN NANITABERU?
            </p>
            <div className="main-content">
                <div className="grid-container">
                    <div className="site-title">
                        <div className="title-01">
                            <h2 className="title-01">
                                きょうのごはん
                            </h2>
                        </div>
                        <div className="title-02">
                            <h1 className="title-02">
                                なにたべる？
                            </h1>
                        </div>
                    </div>
                    <div className="site-img"></div>
                </div>
                <div className="sub-title">
                    <h2>きょうのごはんはこれにしよう</h2>
                </div>
                <div className="top-arrow">
                    <img className="top-arrow-img" src={ArrorImg}  alt="きょうのごはんはこれにしよう"/>
                </div>
            </div>

        </div>
    )
}

export default Title;
